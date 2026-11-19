import { useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock3, ExternalLink, RefreshCw, TrendingUp } from 'lucide-react'
import { LangContext } from '../LangContext'
import Contact from '../components/Contact'

const filters = [
  { key: 'all', labelId: 'Semua', labelEn: 'All' },
  { key: 'techcrunch', labelId: 'Tech News', labelEn: 'Tech News' },
  { key: 'devto', labelId: 'DEV Community', labelEn: 'DEV Community' },
]

function timeAgo(dateStr, isEn) {
  if (!dateStr) return isEn ? 'recently' : 'baru saja'
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.round(diff / 60000)
  if (mins < 1) return isEn ? 'just now' : 'baru saja'
  if (mins < 60) return isEn ? `${mins}m ago` : `${mins} menit lalu`
  const hours = Math.round(mins / 60)
  if (hours < 24) return isEn ? `${hours}h ago` : `${hours} jam lalu`
  const days = Math.round(hours / 24)
  if (days < 30) return isEn ? `${days}d ago` : `${days} hari lalu`
  return new Date(dateStr).toLocaleDateString(isEn ? 'en-GB' : 'id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function NewsPage() {
  const { lang } = useContext(LangContext)
  const isEn = lang === 'en'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [fetchedAt, setFetchedAt] = useState(null)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/news')
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !Array.isArray(data.items)) {
        throw new Error(data.error || (isEn ? 'Failed to load news.' : 'Gagal memuat berita.'))
      }
      setItems(data.items)
      setFetchedAt(data.fetchedAt)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps react(set-state-in-effect)

  const visible = useMemo(
    () => (filter === 'all' ? items : items.filter((item) => item.source === filter)),
    [items, filter],
  )

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="page-crumb" aria-label="Breadcrumb">
            <Link to="/">{isEn ? 'Home' : 'Beranda'}</Link>
            <span>/</span>
            <span aria-current="page">{isEn ? 'Tech News' : 'Berita Teknologi'}</span>
          </nav>
          <span className="section-label">{isEn ? 'Live Feed' : 'Umpan Langsung'}</span>
          <h1>{isEn ? 'What Is Happening in Technology' : 'Apa yang Sedang Terjadi di Teknologi'}</h1>
          <p>{isEn
            ? 'Curated headlines from public technology APIs, TechCrunch and DEV Community, refreshed automatically.'
            : 'Kurasi berita teknologi dari API publik TechCrunch dan DEV Community, diperbarui otomatis.'}</p>
          <div className="page-hero-actions">
            <button type="button" className="btn btn-primary" onClick={load} disabled={loading}>
              <RefreshCw size={16} className={loading ? 'spin' : undefined} /> {loading ? (isEn ? 'Loading...' : 'Memuat...') : (isEn ? 'Refresh' : 'Muat Ulang')}
            </button>
          </div>
        </div>
      </section>

      <section className="section news-section">
        <div className="container">
          <div className="news-toolbar">
            <div className="news-filters" role="tablist" aria-label={isEn ? 'News sources' : 'Sumber berita'}>
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={filter === f.key}
                  className={`news-filter ${filter === f.key ? 'active' : ''}`}
                  onClick={() => setFilter(f.key)}
                >
                  {isEn ? f.labelEn : f.labelId}
                </button>
              ))}
            </div>
            <span className="news-meta">
              {fetchedAt && !loading
                ? (isEn ? `Updated ${timeAgo(fetchedAt, isEn)}` : `Diperbarui ${timeAgo(fetchedAt, isEn)}`)
                : (isEn ? 'Fetching public APIs...' : 'Mengambil data API publik...')}
            </span>
          </div>

          {error && (
            <div className="news-error">
              <p>{error}</p>
              <button type="button" className="btn btn-primary" onClick={load}>{isEn ? 'Try again' : 'Coba lagi'}</button>
            </div>
          )}

          {!error && loading && (
            <div className="news-list">
              {Array.from({ length: 8 }).map((_, i) => (
                <div className="news-row news-skeleton" key={i}>
                  <div className="sk-line sk-sm" style={{ width: '18%' }} />
                  <div className="sk-line sk-lg" />
                </div>
              ))}
            </div>
          )}

          {!error && !loading && (
            <div className="news-list">
              {visible.map((item, idx) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-row"
                >
                  <span className="news-index">{String(idx + 1).padStart(2, '0')}</span>
                  <div className="news-row-body">
                    <div className="news-row-head">
                      <h3>
                        {item.title} <ExternalLink size={13} />
                      </h3>
                      <span className={`news-source source-${item.source}`}>{item.sourceLabel}</span>
                    </div>
                    {item.summary && <p>{item.summary}</p>}
                    <div className="news-tags">
                      {item.tags?.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                  <div className="news-row-meta">
                    {item.points > 0 && <span className="news-stat"><TrendingUp size={14} /> {item.points}</span>}
                    {item.comments > 0 && <span className="news-stat">{item.comments}</span>}
                    <span className="news-time"><Clock3 size={13} /> {timeAgo(item.publishedAt, isEn)}</span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {!error && !loading && !visible.length && (
            <p className="news-empty">{isEn ? 'No headlines from this source right now.' : 'Belum ada berita dari sumber ini saat ini.'}</p>
          )}

          <p className="news-credit">
            {isEn ? 'Data from public APIs: ' : 'Data dari API publik: '}
            <a href="https://techcrunch.com/wp-json/wp/v2/" target="_blank" rel="noopener noreferrer">TechCrunch (REST API)</a>
            {' · '}
            <a href="https://developers.forem.com/api" target="_blank" rel="noopener noreferrer">DEV Community</a>
            {' · '}
            <a href="/proyek">{isEn ? 'See our work' : 'Lihat proyek kami'} <ExternalLink size={12} /></a>
          </p>
        </div>
      </section>

      <Contact />
    </>
  )
}
