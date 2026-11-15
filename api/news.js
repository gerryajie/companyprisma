// Agregator berita teknologi public open API — tanpa API key berbayar.
// Sumber: TechCrunch (WordPress REST API) + DEV Community (tag news).

const CACHE_TTL = 10 * 60 * 1000 // 10 menit
let cache = { at: 0, payload: null }

async function getJson(url, timeout = 15000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'PrismaCentra-NewsBot/1.0' },
    })
    if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`)
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeTechCrunch(posts = []) {
  return posts
    .filter((p) => p.title?.rendered && p.link)
    .map((p) => ({
      id: `tc-${p.id}`,
      title: p.title.rendered.trim(),
      url: p.link,
      discussion: p.link,
      source: 'techcrunch',
      sourceLabel: 'Tech News',
      author: '',
      points: 0,
      comments: 0,
      publishedAt: p.date,
      summary: p.excerpt?.rendered ? stripHtml(p.excerpt.rendered) : null,
      image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      tags: (p._embedded?.['wp:term'] || []).flat().map((t) => t.name).slice(0, 3),
    }))
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

  const results = await Promise.allSettled([
    getJson('https://techcrunch.com/wp-json/wp/v2/posts?per_page=10'),
    getJson('https://dev.to/api/articles?tag=news&per_page=15&top=7'),
  ])

  const tc = results[0].status === 'fulfilled' ? normalizeTechCrunch(results[0].value) : []
  const devto = results[1].status === 'fulfilled' ? normalizeDevTo(results[1].value) : []

  const items = [...tc, ...devto]
    .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
    .slice(0, 30)

  if (!items.length) {
    return res.status(502).json({ error: 'Sumber berita sedang tidak dapat diakses.' })
  }

  const payload = {
    items,
    fetchedAt: new Date().toISOString(),
    sources: ['Tech News', 'DEV Community'],
  }
  cache = { at: now, payload }

  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200')
  return res.status(200).json({ ...payload, cached: false })
}
