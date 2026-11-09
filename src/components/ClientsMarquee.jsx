import { useContext } from 'react'
import { LangContext } from '../LangContext'
import { content } from '../lang-data'
import { clientLogos } from '../client-logos-data.js'

export default function ClientsMarquee() {
  const { lang } = useContext(LangContext)
  const t = content[lang]

  return (
    <section className="partners-section">
      <div className="container">
        <p className="partners-label">{t.marquee_label}</p>
      <div className="marquee-wrap">
        <div className="marquee-track">
          {/* Double logos for seamless loop */}
          {[...clientLogos, ...clientLogos].map((item, i) => (
            <div key={`${item.name}-${i}`} className="marquee-item">
              <img src={item.src} alt={item.label} width={item.width || 120} height={item.height || 32} />
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}
