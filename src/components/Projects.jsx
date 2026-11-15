import { useContext } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { LangContext } from '../LangContext'

const projects = [
  {
    image: '/img/projects/pama-energy-dashboard.webp',
    tag: 'Energy Intelligence',
    title: 'Real-time Energy Monitoring',
    desc: 'Visibilitas konsumsi listrik, estimasi biaya, dan performa perangkat dalam satu dashboard operasional.',
  },
  {
    image: '/img/projects/pama-air-quality.webp',
    tag: 'IoT & Environment',
    title: 'Air Quality Intelligence',
    desc: 'Dashboard kualitas udara real-time dengan indikator kondisi, parameter gas, dan tren historis untuk pemantauan lingkungan.',
  },
  {
    image: '/img/projects/pama-lobby-signage.webp',
    tag: 'Digital Experience',
    title: 'Public Display Monitoring',
    desc: 'Monitoring tampilan publik kiosk digital yang menghadirkan status sensor penting di lobi operasional secara jelas.',
  },
  {
    image: '/img/projects/elink-pama-airos.webp',
    tag: 'Industrial Dashboard',
    title: 'ELINK-PAMA AIROS',
    desc: 'Antarmuka monitoring yang menggabungkan data kualitas udara, gauge, grafik, dan status kesehatan lingkungan dalam satu view operasional.',
  },
  {
    image: '/img/projects/hydraulic-test-bench.webp',
    tag: 'Automation & Control',
    title: 'Hydraulic Test Bench',
    desc: 'Sistem kontrol dan monitoring pengujian tekanan industrial dengan layar SCADA yang menyajikan parameter uji secara realtime.',
  },
  {
    image: '/img/projects/bt-scada-dashboard.webp',
    tag: 'SCADA & Telemetry',
    title: 'BT SCADA Dashboard',
    desc: 'Pemantauan suhu, kelembapan, tekanan, alarm, dan buzzer dari berbagai unit dalam satu layar.',
  },
]

export default function Projects() {
  const { lang } = useContext(LangContext)
  const isEn = lang === 'en'

  return (
    <section id="proyek" className="section projects-section">
      <div className="container">
        <div className="section-head projects-head">
          <span className="section-label">{isEn ? 'Selected Work' : 'Proyek Pilihan'}</span>
          <h2>{isEn ? 'Technology Built for Real Operations' : 'Teknologi yang Bekerja di Lapangan'}</h2>
          <p>{isEn ? 'A selection of monitoring, industrial control, and digital experience systems delivered by our team.' : 'Pilihan sistem monitoring, kontrol industri, dan pengalaman digital yang kami hadirkan untuk kebutuhan operasional nyata.'}</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article className={`project-card project-card-${index + 1}`} key={project.title}>
              <div className="project-image-wrap">
                <img src={project.image} alt={project.title} loading={index > 1 ? 'lazy' : 'eager'} />
                <span className="project-index">0{index + 1}</span>
              </div>
              <div className="project-card-body">
                <span className="project-tag">{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <span className="project-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
