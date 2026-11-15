import { useState, useEffect, useCallback, useContext } from 'react'
import { LangContext } from '../LangContext'
import { content } from '../lang-data'
import { clientCompanies } from '../client-companies'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  { text: 'Prisma membantu kami membangun sistem ERP internal yang mengurangi waktu pelaporan dari tiga hari menjadi satu jam.', author: 'Ahmad Fauzi', role: 'CTO', company: 'Nusantara Logistik' },
  { text: 'Migrasi infrastruktur kami ke cloud berjalan tanpa gangguan berarti. Biaya operasional IT turun sementara performa meningkat.', author: 'Sari Handayani', role: 'Direktur Operasional', company: 'Bank Sentosa' },
  { text: 'Aplikasi digital kami dirancang sederhana, mudah digunakan, dan andal untuk mendukung kebutuhan operasional harian.', author: 'Dr. Rudi Hartono', role: 'Kepala IT', company: 'RS Harapan Sehat' },
  { text: 'Konsultasi transformasi digital dari Prisma memberikan peta jalan yang jelas dan keputusan investasi yang lebih terarah.', author: 'Bambang Sutrisno', role: 'VP Technology', company: 'Maju Bersama Group' },
]

export default function Testimonials() {
  const { lang } = useContext(LangContext)
  const t = content[lang]
  const [current, setCurrent] = useState(0)
  const go = useCallback((dir) => setCurrent((n) => (n + dir + testimonials.length) % testimonials.length), [])

  useEffect(() => {
    const timer = setInterval(() => go(1), 7000)
    return () => clearInterval(timer)
  }, [go])

  const item = testimonials[current]

  return (
    <section id="testimoni" className="section testimonials-section">
      <div className="container">
        <div className="section-head testimonials-head">
          <span className="section-label">{t.testimonials_label}</span>
          <h2>{t.testimonials_h2}</h2>
          <p>{t.testimonials_lead}</p>
        </div>
        <div className="testimonials-layout">
          <div className="testi-carousel">
            <div className="testi-slide">
              <div className="testi-quote-mark" aria-hidden="true">&ldquo;</div>
              <p className="testi-text">{item.text}</p>
              <div className="testi-author">
                <div className="testi-avatar">{item.author.split(' ').map((x) => x[0]).join('').slice(0, 2)}</div>
                <div className="testi-info"><strong>{item.author}</strong><small>{item.role}, {item.company}</small></div>
              </div>
            </div>
            <div className="testi-nav">
              <button className="testi-btn" onClick={() => go(-1)} aria-label={t.testi_prev}><ChevronLeft size={20} /></button>
              <div className="testi-dots">{testimonials.map((_, i) => <button key={i} className={`testi-dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} aria-label={`Testimoni ${i + 1}`} />)}</div>
              <button className="testi-btn" onClick={() => go(1)} aria-label={t.testi_next}><ChevronRight size={20} /></button>
            </div>
          </div>
          <div className="testimonials-logos" aria-label={lang === 'id' ? 'Logo perusahaan klien' : 'Client company logos'}>
            {clientCompanies.map((company) => <div className="testimonials-logo" key={company.name}><img src={company.src} alt={company.name} loading="lazy" /></div>)}
          </div>
        </div>
      </div>
    </section>
  )
}
