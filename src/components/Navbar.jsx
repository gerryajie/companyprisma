import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react'
import { LangContext } from '../LangContext'
import { ThemeContext } from '../ThemeContext'
import { content } from '../lang-data'

const links = [
  { to: '/#layanan', id: 'services' },
  { to: '/#industri', id: 'industri' },
  { to: '/#keunggulan', id: 'proses' },
  { to: '/#tentang', id: 'tentang' },
  { to: '/#testimoni', id: 'testimoni' },
  { to: '/proyek', id: 'proyek' },
  { to: '/karir', id: 'karir' },
]

const linkKeys = {
  services: 'nav_services',
  industri: 'nav_industries',
  proses: 'nav_process',
  tentang: 'nav_about',
  testimoni: 'nav_testimonials',
  proyek: 'nav_projects',
  karir: 'nav_careers',
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { lang, setLang } = useContext(LangContext)
  const { theme, setTheme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => { setOpen(false) }, [location.pathname, location.hash])

  const t = content[lang]
  const isActive = (to) => {
    if (to.startsWith('/#')) {
      return location.pathname === '/' && location.hash === to.slice(1)
    }
    return location.pathname === to
  }

  const goContact = () => {
    setOpen(false)
    if (location.pathname === '/') {
      document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', '/#kontak')
      return
    }
    navigate('/#kontak')
  }

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link
        to="/"
        className="nav-logo"
        onClick={() => {
          setOpen(false)
          if (location.pathname === '/' && !location.hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
      >
        <img src="/logo.png" alt="Logo Prisma Centra Nusantara" />
        <div className="nav-logo-text">
          <strong>PRISMA</strong>
          <small>Centra Nusantara</small>
        </div>
      </Link>

      <button className="nav-toggle" aria-label={t.nav_toggle_aria} onClick={() => setOpen((v) => !v)}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={isActive(l.to) ? 'active' : undefined}
                onClick={() => setOpen(false)}
              >
                {t[linkKeys[l.id]]}
              </Link>
            </li>
          ))}
          <li className="nav-controls">
            <button
              className="lang-btn"
              onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
              title={lang === 'id' ? 'Switch to English' : 'Beralih ke Bahasa Indonesia'}
            >
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
            <button
              className="theme-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </li>
          <li>
            <button className="btn-nav" onClick={goContact}>
              {t.nav_cta}
              <ArrowRight size={15} strokeWidth={2.2} />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
