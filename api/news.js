// Agregator berita teknologi public open API — tanpa API key berbayar.
// Sumber: TechCrunch (WP REST API, fallback RSS) + DEV Community (tag news).

const CACHE_TTL = 10 * 60 * 1000 // 10 menit
let cache = { at: 0, payload: null }

async function getText(url, timeout = 12000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PrismaCentra-NewsBot/1.0)',
        Accept: 'application/json, application/rss+xml, text/xml;q=0.9, */*;q=0.8',
      },
    })
    if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`)
    return await res.text()
  } finally {
    clearTimeout(timer)
  }
}

async function getJson(url, timeout = 12000) {
  const text = await getText(url, timeout)
  return JSON.parse(text)
}

function stripHtml(html = '') {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&#39;|&#8217;|&rsquo;/g, "'")
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function firstTag(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'))
  if (!m) return ''
  return m[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim()
}

function normalizeTechCrunch(posts = []) {
  return posts
    .filter((p) => p.title?.rendered && p.link)
    .map((p) => ({
      id: `tc-${p.id}`,
      title: stripHtml(p.title.rendered),
      url: p.link,
      discussion: p.link,
      source: 'techcrunch',
      sourceLabel: 'Tech News',
      author: '',
      points: 0,
      comments: 0,
      publishedAt: p.date,
      summary: p.excerpt?.rendered ? stripHtml(p.excerpt.rendered).slice(0, 220) : null,
      image: p.jetpack_featured_media_url || p._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      tags: (p._embedded?.['wp:term'] || []).flat().map((t) => t.name).slice(0, 3),
    }))
}

// Fallback bila WP REST diblokir: parse RSS TechCrunch.
function parseRss(xml) {
  const blocks = xml.split(/<item[\s>]/i).slice(1)
  return blocks
    .map((block, i) => {
      const title = stripHtml(firstTag(block, 'title'))
      const url = firstTag(block, 'link')
      if (!title || !url) return null
      const desc = stripHtml(firstTag(block, 'description')).slice(0, 220)
      const media = block.match(/<media:content[^>]+url="([^"]+)"/i)?.[1] || null
      const rawDate = firstTag(block, 'pubDate')
      let publishedAt = null
      if (rawDate) {
        try {
          publishedAt = new Date(rawDate).toISOString()
        } catch {
          // skip malformed date
        }
      }
      return {
        id: `tc-rss-${i}-${url.slice(-24)}`,
        title,
        url,
        discussion: url,
        source: 'techcrunch',
        sourceLabel: 'Tech News',
        author: stripHtml(firstTag(block, 'dc:creator')),
        points: 0,
        comments: 0,
        publishedAt,
        summary: desc || null,
        image: media,
        tags: [],
      }
    })
    .filter(Boolean)
}

function normalizeDevTo(articles = []) {
  return articles.map((article) => ({
    id: `devto-${article.id}`,
    title: article.title,
    url: article.url,
    discussion: article.url,
    source: 'devto',
    sourceLabel: 'DEV Community',
    author: article.user?.name || article.user?.username || 'DEV',
    points: article.positive_reactions_count || 0,
    comments: article.comments_count || 0,
    publishedAt: article.published_timestamp || article.published_at || null,
    summary: article.description || null,
    image: article.cover_image || article.social_image || null,
    tags: (article.tag_list || []).slice(0, 3),
  }))
}

async function loadTechCrunch() {
  try {
    const posts = await getJson('https://techcrunch.com/wp-json/wp/v2/posts?per_page=10&_fields=id,date,link,title,excerpt,jetpack_featured_media_url')
    const items = normalizeTechCrunch(posts)
    if (items.length) return items
  } catch {
    // lanjut ke RSS
  }
  try {
    const xml = await getText('https://techcrunch.com/feed/')
    return parseRss(xml).slice(0, 10)
  } catch {
    return []
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const now = Date.now()
  if (cache.payload && now - cache.at < CACHE_TTL) {
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200')
    return res.status(200).json({ ...cache.payload, cached: true })
  }

  const [tc, devto] = await Promise.all([
    loadTechCrunch(),
    getJson('https://dev.to/api/articles?tag=news&per_page=15&top=7')
      .then(normalizeDevTo)
      .catch(() => []),
  ])

  const items = [...tc, ...devto]
    .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
    .slice(0, 30)

  if (!items.length) {
    if (cache.payload) {
      res.setHeader('Cache-Control', 'public, s-maxage=60')
      return res.status(200).json({ ...cache.payload, stale: true })
    }
    return res.status(502).json({ error: 'Sumber berita sedang tidak dapat diakses.' })
  }

  const payload = {
    items,
    fetchedAt: new Date().toISOString(),
    sources: ['Tech News', 'DEV Community'],
    perSource: { techcrunch: tc.length, devto: devto.length },
  }
  cache = { at: now, payload }

  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200')
  return res.status(200).json({ ...payload, cached: false })
}
