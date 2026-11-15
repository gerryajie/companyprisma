import { useState, useEffect, useContext } from 'react'
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react'
import { LangContext } from '../LangContext'
import { ThemeContext } from '../ThemeContext'
import { content } from '../lang-data'

const links = [
  { href: '#layanan', id: 'services' },
  { href: '#industri', id: 'industri' },
  { href: '#keunggulan', id: 'proses' },
  { href: '#tentang', id: 'tentang' },
  { href: '#testimoni', id: 'testimoni' },
]

const linkKeys = {
  services: 'nav_services',
  industri: 'nav_industries',
  proses: 'nav_process',
  tentang: 'nav_about',
  testimoni: 'nav_testimonials',
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { lang, setLang } = useContext(LangContext)
  const { theme, setTheme } = useContext(ThemeContext)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const t = content[lang]

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#beranda" className="nav-logo" onClick={() => setOpen(false)}>
        <img src="/logo.png" alt="Logo Prisma Centra Nusantara" />
        <div className="nav-logo-text">
          <strong>PRISMA</strong>
          <small>Centra Nusantara</small>
        </div>
      </a>

      <button className="nav-toggle" aria-label={t.nav_toggle_aria} onClick={() => setOpen((v) => !v)}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {t[linkKeys[l.id]]}
              </a>
            </li>
          ))}
          <li className="nav-lang-toggle">
            <button
              className="lang-btn"
              onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
              title={lang === 'id' ? 'Switch to English' : 'Beralih ke Bahasa Indonesia'}
            >
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
          </li>
          <li className="nav-theme-toggle">
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
            <button
              className="btn-nav"
              onClick={() => {
                setOpen(false)
                window.location.hash = '#kontak'
              }}
            >
              {t.nav_cta}
              <ArrowRight size={15} strokeWidth={2.2} />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
