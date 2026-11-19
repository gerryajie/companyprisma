import { useContext } from 'react'
import { LangContext } from '../LangContext'
import { content } from '../lang-data'

const stepsData = {
  id: [
    { title: 'Analisis', desc: 'Pahami bisnis: proses, kendala, tujuan jangka panjang.' },
    { title: 'Perencanaan', desc: 'Rumuskan arsitektur dan tonggak capaian yang jelas bersama tim.' },
    { title: 'Pengembangan', desc: 'Eksekusi dengan praktik terbaik, code review, dan demo berkala.' },
    { title: 'Peluncuran', desc: 'Produksi, pemantauan, dan dukungan pasca-luncurkan.' },
  ],
  en: [
    { title: 'Discovery', desc: 'Understand your business: processes, key challenges, long-term goals.' },
    { title: 'Planning', desc: 'Define architecture and milestones with your team.' },
    { title: 'Development', desc: 'Execute with best practices, code reviews, and regular demos.' },
    { title: 'Launch', desc: 'Deploy to production, monitoring, and post-launch support.' },
  ],
}


export default function Process() {
  const { lang } = useContext(LangContext)
  const t = content[lang]
  const steps = stepsData[lang]

  return (
    <section id="keunggulan" className="section section--alt">
      <div className="container">
        <div className="section-head" style={{ maxWidth: 560 }}>
          <span className="section-label">{t.process_label}</span>
          <h2>{t.process_h2}</h2>
          <p>{t.process_lead}</p>
        </div>

        <div className="process-timeline">
          {steps.map((s, i) => (
            <div key={s.title} className="process-step">
              <div className="step-num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
