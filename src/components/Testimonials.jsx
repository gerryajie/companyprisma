import { useState, useEffect, useCallback, useContext } from 'react'
import { LangContext } from '../LangContext'
import { content } from '../lang-data'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    text: 'Prisma membantu kami membangun sistem ERP internal yang mengurangi waktu pelaporan dari tiga hari menjadi satu jam. Tim mereka responsif dan sangat memahami konteks industri logistik.',
    author: 'Ahmad Fauzi',
    role: 'CTO',
    company: 'PT Logisti Prima',
    initials: 'AF',
  },
  {
    text: 'Migrasi infrastruktur kami ke cloud berjalan tanpa gangguan berarti berkat perencanaan matang dari Prisma. Sekarang biaya operasional IT turun 40% sementara performa meningkat.',
    author: 'Sari Handayani',
    role: 'Direktur Operasional',
    company: 'Bank Sentosa',
    initials: 'SH',
  },
  {
    text: 'Aplikasi mobile untuk pasien kami dirancang dengan prinsip mengutamakan aksesibilitas. Umpan balik dokter dan perawat sangat positif — antarmuka yang sederhana namun andal.',
    author: 'Dr. Rudi Hartono',
    role: 'Kepala IT',
    company: 'RS Harapan Sehat',
    initials: 'RH',
  },
  {
    text: 'Konsultasi transformasi digital dari Prisma memberikan peta jalan yang jelas selama dua tahun ke depan. Keputusan investasi teknologi kami jadi lebih terarah dan berbasis data.',
    author: 'Bambang Sutrisno',
    role: 'VP Technology',
    company: 'Maju Bersama Group',
    initials: 'BS',
  },
]

export default function Testimonials() {
  const { lang } = useContext(LangContext)
  const t = content[lang]
  const [current, setCurrent] = useState(0)
  const total = testimonials.length

  const go = useCallback((dir) => {
    setCurrent((c) => (c + dir + total) % total)
  }, [total])

  useEffect(() => {
    const timer = setInterval(() => go(1), 7000)
    return () => clearInterval(timer)
  }, [go])

  return (
    <section id="testimoni" className="section">
      <div className="container">
        <div className="section-head" style={{ maxWidth: 560 }}>
          <span className="section-label">{t.testimonials_label}</span>
          <h2>{t.testimonials_h2}</h2>
          <p>{t.testimonials_lead}</p>
        </div>

        <div className="testi-carousel">
          <div className="testi-slide">
            <div className="testi-quote-mark" aria-hidden="true">&ldquo;</div>
            <p className="testi-text">{testimonials[current].text}</p>
            <div className="testi-author">
              <div className="testi-avatar">{testimonials[current].initials}</div>
              <div className="testi-info">
                <strong>{testimonials[current].author}</strong>
                <small>{testimonials[current].role}, {testimonials[current].company}</small>
              </div>
            </div>
          </div>

          <div className="testi-nav">
            <button className="testi-btn" onClick={() => go(-1)} aria-label={t.testi_prev}>
              <ChevronLeft size={20} />
            </button>
            <div className="testi-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testi-dot ${i === current ? 'active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Testimoni ${i + 1}`}
                  aria-current={i === current ? 'true' : undefined}
                />
              ))}
            </div>
            <button className="testi-btn" onClick={() => go(1)} aria-label={t.testi_next}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
