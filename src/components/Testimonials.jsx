import { useState, useEffect, useCallback, useContext } from 'react'
import { LangContext } from '../LangContext'
import { content } from '../lang-data'
import { clientCompanies } from '../client-companies'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  { text: 'Dapat memonitor penggunaan konsumsi listrik secara real time dan mengkonversinya dalam rupiah.', product: 'Dashboard Monitoring Konsumsi Listrik', company: 'PT PAMA' },
  { text: 'Memonitor kandungan udara dan kelayakan udara secara realtime.', product: 'Dashboard Monitoring Kelayakan Kualitas Udara', company: 'PT PAMA' },
  { text: 'Memonitor kondisi unit, suhu, dan konsumsi daya dari perangkat mesin HVAC yang terpasang.', product: 'Dashboard Monitoring Mesin HVAC', company: 'PT Alam Teknik Utama' },
  { text: 'Monitor pressure pada setiap titik di field dan memonitornya dari ruang central.', product: 'Dashboard Monitoring Gas', company: 'PT Lemigas' },
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

  const companyInitials = (c) => c.replace(/^PT /, '').slice(0, 2).toUpperCase()
  const logoSrc = clientCompanies.find((co) => co.name === item.company)?.src || null

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
                {logoSrc ? (
                  <img className="testi-logo" src={logoSrc} alt={item.company} />
                ) : (
                  <div className="testi-avatar">{companyInitials(item.company)}</div>
                )}
                <div className="testi-info"><strong>{item.product}</strong><small>{item.company}</small></div>
              </div>
            </div>
            <div className="testi-nav">
              <button className="testi-btn" onClick={() => go(-1)} aria-label={t.testi_prev}><ChevronLeft size={20} /></button>
              <div className="testi-dots">{testimonials.map((_, i) => <button key={i} className={`testi-dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} aria-label={`Testimoni ${i + 1}`} />)}</div>
              <button className="testi-btn" onClick={() => go(1)} aria-label={t.testi_next}><ChevronRight size={20} /></button>
            </div>
          </div>
          <div className="testimonials-logos" aria-label={lang === 'id' ? 'Logo perusahaan klien' : 'Client company logos'}>
            {clientCompanies.map((company) => <div className="testimonials-logo" key={company.name}><img src={company.src} alt={company.name} /></div>)}
          </div>
        </div>
      </div>
    </section>
  )
}
