import { useContext } from 'react'
import { LangContext } from '../LangContext'
import { content } from '../lang-data'
import { clientCompanies } from '../client-companies'

export default function Clients() {
  const { lang } = useContext(LangContext)
  const t = content[lang]

  return (
    <section id="klien" className="section clients-section">
      <div className="container">
        <div className="section-head">
          <span className="section-label">{t.clients_label}</span>
          <h2>{t.clients_h2}</h2>
          <p>{t.clients_lead}</p>
        </div>

        <div className="clients-grid">
          {clientCompanies.map((c) => (
            <div className="client-card" key={c.name}>
              <img src={c.src} alt={c.name} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
