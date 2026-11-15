// Agregator berita teknologi dari API publik tanpa API key.
// Sumber: Hacker News (Algolia API) + DEV Community (dev.to API)

const CACHE_TTL = 10 * 60 * 1000 // 10 menit
let cache = { at: 0, payload: null }

async function getJson(url, timeout = 8000) {
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

function normalizeHn(hits = []) {
  return hits
    .filter((hit) => hit.title)
    .map((hit) => ({
      id: `hn-${hit.objectID}`,
      title: hit.title,
      url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
      discussion: `https://news.ycombinator.com/item?id=${hit.objectID}`,
      source: 'hackernews',
      sourceLabel: 'Hacker News',
      author: hit.author,
      points: hit.points || 0,
      comments: hit.num_comments || 0,
      publishedAt: hit.created_at || null,
      summary: null,
      image: null,
      tags: ['Tech'],
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
    getJson('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=24'),
    getJson('https://dev.to/api/articles?per_page=15&top=7'),
  ])

  const hn = results[0].status === 'fulfilled' ? normalizeHn(results[0].value?.hits) : []
  const devto = results[1].status === 'fulfilled' ? normalizeDevTo(results[1].value) : []

  const items = [...hn, ...devto]
    .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
    .slice(0, 30)

  if (!items.length) {
    return res.status(502).json({ error: 'Sumber berita sedang tidak dapat diakses.' })
  }

  const payload = {
    items,
    fetchedAt: new Date().toISOString(),
    sources: ['Hacker News', 'DEV Community'],
  }
  cache = { at: now, payload }

  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200')
  return res.status(200).json({ ...payload, cached: false })
}
