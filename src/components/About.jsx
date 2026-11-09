import { useContext } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { LangContext } from '../LangContext'
import { content } from '../lang-data'

export default function About() {
  const { lang } = useContext(LangContext)
  const t = content[lang]

  const stats = [
    { num: '5+', label: lang === 'id' ? 'Tahun Pengalaman Tim' : 'Team Experience' },
    { num: '15+', label: lang === 'id' ? 'Proyek Selesai' : 'Projects Delivered' },
    { num: '99.9%', label: lang === 'id' ? 'Target Ketersediaan Sistem' : 'System Uptime Target' },
    { num: '24/7', label: lang === 'id' ? 'Dukungan Teknis' : 'Technical Support' },
  ]
  const certs = [
    'AWS Partner', 'Microsoft Gold Partner', 'Google Cloud Certified',
    'VMware Certified', 'Oracle Partner Network', 'ISO 27001',
  ]
  const highlights = lang === 'id' ? [
    'Tim yang bersertifikat',
    'Pendekatan agile dengan tonggak capaian yang transparan',
    'Siklus pengembangan dengan prioritas keamanan',
    'Dukungan pasca-peluncuran berkelanjutan',
  ] : [
    'Certified team',
    'Agile approach with transparent milestones',
    'Security-first development lifecycle',
    'Sustainable post-launch support',
  ]

  return (
    <section id="tentang" className="section">
      <div className="container">
        <div className="about-split">
          <div className="about-text">
            <span className="section-label">{t.nav_about}</span>
            <h2>{t.about_h2}</h2>
            <p>{t.about_p}</p>
            <p>{lang === 'id' ? 'Kami hadir dengan semangat startup yang gesit, namun dibekali keahlian senior yang telah terbukti menangani proyek enterprise-grade. Filosofi kami: teknologi harus melayani bisnis — bukan sebaliknya.' : 'We bring agile startup spirit, backed by senior expertise proven in enterprise-grade projects. Our philosophy: technology should serve business — not the other way around.'}</p>
            <ul style={{ listStyle: 'none', marginTop: 28 }}>
              {highlights.map((h) => (
                <li key={h} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, fontSize: '.9rem', color: 'var(--ink-soft)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />{h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="cred-table">
              {stats.map(({ num, label }) => (
                <div key={label} className="cred-row">
                  <div className="cred-num">{num}</div>
                  <div className="cred-label">{label}</div>
                </div>
              ))}
            </div>
            <div className="cert-list">
              {certs.map((c) => (
                <span key={c} className="cert-badge">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
