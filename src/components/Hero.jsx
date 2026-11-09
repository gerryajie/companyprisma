import { useContext } from 'react'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { LangContext } from '../LangContext'
import { content } from '../lang-data'

export default function Hero() {
  const { lang } = useContext(LangContext)
  const t = content[lang]

  return (
    <section id="beranda" className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <span className="hero-tag"><span className="dot" /> {t.hero_tag}</span>
            <h1>{t.hero_h1_p1}<br /><em>{t.hero_h1_p2}</em></h1>
            <p className="lead">{t.hero_lead}</p>
            <div className="hero-ctas">
              <a href="#kontak" className="btn btn-primary">
                {t.hero_cta1} <ArrowRight size={17} />
              </a>
              <a href="#layanan" className="btn btn-outline-white">
                {t.hero_cta2}
              </a>
            </div>
            <div className="hero-trust">
              <ShieldCheck size={15} style={{ color: '#4ADE80' }} />
              {t.hero_trust}
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-logo"><img src="/logo.png" alt="" /></div>
            <div className="panel-stats">
              <div className="panel-stat"><strong>5+</strong><span>{lang === 'id' ? 'Tahun Pengalaman' : 'Years Experience'}</span></div>
              <div className="panel-stat"><strong>15+</strong><span>{lang === 'id' ? 'Proyek Selesai' : 'Projects Delivered'}</span></div>
              <div className="panel-stat"><strong>99.9%</strong><span>{lang === 'id' ? 'Target Ketersediaan' : 'Uptime Target'}</span></div>
              <div className="panel-stat"><strong>10+</strong><span>{lang === 'id' ? 'Klien Aktif' : 'Active Clients'}</span></div>
            </div>
            <div className="panel-caption">{t.hero_panel_caption}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
