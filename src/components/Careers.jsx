import { useContext } from 'react'
import { ArrowUpRight, BriefcaseBusiness, Clock3, MapPin } from 'lucide-react'
import { LangContext } from '../LangContext'
import { emailHref } from '../contact-data.js'

const roles = [
  { title: 'Fullstack Developer', en: 'Fullstack Developer', tags: ['React', 'Node.js', 'API'], desc: 'Bangun aplikasi web end-to-end yang cepat, aman, dan siap berkembang bersama kebutuhan bisnis.' },
  { title: 'Business Analyst', en: 'Business Analyst', tags: ['Discovery', 'Process', 'BRD'], desc: 'Terjemahkan kebutuhan operasional menjadi requirement, alur kerja, dan solusi digital yang tepat sasaran.' },
  { title: 'Quality Assurance', en: 'Quality Assurance', tags: ['Testing', 'UAT', 'Quality'], desc: 'Jaga kualitas rilis melalui skenario uji yang tajam, dokumentasi jelas, dan perhatian pada detail.' },
  { title: 'DevOps Engineer', en: 'DevOps Engineer', tags: ['Cloud', 'CI/CD', 'Monitoring'], desc: 'Rancang pipeline, infrastruktur, dan observability agar sistem tetap andal dari deploy sampai produksi.' },
]

export default function Careers() {
  const { lang } = useContext(LangContext)
  const isEn = lang === 'en'

  return (
    <section id="karir" className="section careers-section">
      <div className="container">
        <div className="careers-intro">
          <div className="careers-note">
            <BriefcaseBusiness size={22} />
            <div>
              <strong>{isEn ? 'Open opportunities' : 'Peluang terbuka'}</strong>
              <span>{isEn ? 'Remote-friendly · Indonesia' : 'Remote-friendly · Indonesia'}</span>
            </div>
            <span className="careers-count">4 {isEn ? 'open roles' : 'posisi terbuka'}</span>
          </div>
        </div>

        <div className="careers-grid" id="posisi">
          {roles.map((role) => (
            <article className="career-card" key={role.title}>
              <div className="career-card-top">
                <span className="career-type"><Clock3 size={14} /> {isEn ? 'Full-time / Contract' : 'Full-time / Kontrak'}</span>
                <ArrowUpRight className="career-arrow" size={19} />
              </div>
              <h3>{isEn ? role.en : role.title}</h3>
              <p>{role.desc}</p>
              <div className="career-meta"><MapPin size={14} /> {isEn ? 'Indonesia · Remote-friendly' : 'Indonesia · Remote-friendly'}</div>
              <div className="career-tags">{role.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <a href={`${emailHref}?subject=${encodeURIComponent(`Lamaran ${role.title} — Website Prisma Centra`)}`} className="career-link">
                {isEn ? 'Apply for this role' : 'Lamar posisi ini'} <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
