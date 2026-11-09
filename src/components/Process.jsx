import { useContext } from 'react'
import { LangContext } from '../LangContext'
import { content } from '../lang-data'

const stepsData = {
  id: [
  { title: 'Eksplorasi Kebutuhan', desc: 'Pahami bisnis Anda secara mendalam — proses, kendala utama, dan tujuan jangka panjang.' },
  { title: 'Perencanaan', desc: 'Rumuskan arsitektur, lini waktu, dan tonggak capaian yang transparan bersama tim Anda.' },
  { title: 'Pengembangan', desc: 'Eksekusi dengan praktik rekayasa perangkat lunak terbaik, tinjauan kode, dan demo berkala.' },
  { title: 'Peluncuran & Dukungan', desc: 'Peluncuran ke lingkungan produksi, pemantauan aktif, dan dukungan pemeliharaan pasca-peluncuran.' },
  ],
  en: [
    { title: 'Discovery', desc: 'Deeply understand your business — processes, key challenges, and long-term goals.' },
    { title: 'Planning', desc: 'Formulate architecture, timeline, and transparent milestones with your team.' },
    { title: 'Development', desc: 'Execute with best software engineering practices, code reviews, and regular demos.' },
    { title: 'Launch & Support', desc: 'Deploy to production, active monitoring, and post-launch maintenance support.' },
  ]
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
