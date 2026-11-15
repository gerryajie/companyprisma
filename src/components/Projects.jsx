import { useContext } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { LangContext } from '../LangContext'

const projects = [
  {
    image: '/img/projects/pama-energy-dashboard.webp',
    tag: 'Energy Intelligence',
    title: 'Real-time Energy Monitoring',
    descId: 'Visibilitas konsumsi listrik, estimasi biaya, dan performa perangkat dalam satu dashboard operasional.',
    descEn: 'Visibility into electricity consumption, cost estimation, and device performance in one operational dashboard.',
  },
  {
    image: '/img/projects/pama-air-quality.webp',
    tag: 'IoT & Environment',
    title: 'Air Quality Intelligence',
    descId: 'Dashboard kualitas udara real-time dengan indikator kondisi, parameter gas, dan tren historis untuk pemantauan lingkungan.',
    descEn: 'Real-time air quality dashboard with condition indicators, gas parameters, and historical trends for environmental monitoring.',
  },
  {
    image: '/img/projects/pama-lobby-signage.webp',
    tag: 'Digital Experience',
    title: 'Public Display Monitoring',
    descId: 'Monitoring tampilan publik kiosk digital yang menghadirkan status sensor penting di lobi operasional secara jelas.',
    descEn: 'Digital kiosk display presenting key sensor status clearly in operational lobby areas.',
  },
  {
    image: '/img/projects/elink-pama-airos.webp',
    tag: 'Industrial Dashboard',
    title: 'ELINK-PAMA AIROS',
    descId: 'Antarmuka monitoring yang menggabungkan data kualitas udara, gauge, grafik, dan status kesehatan lingkungan dalam satu view operasional.',
    descEn: 'A monitoring interface combining air quality data, gauges, charts, and environmental health status in one operational view.',
  },
  {
    image: '/img/projects/hydraulic-test-bench.webp',
    tag: 'Automation & Control',
    title: 'Hydraulic Test Bench',
    descId: 'Sistem kontrol dan monitoring pengujian tekanan industrial dengan layar SCADA yang menyajikan parameter uji secara realtime.',
    descEn: 'Industrial pressure testing control and monitoring system with a SCADA screen presenting live test parameters.',
  },
  {
    image: '/img/projects/bt-scada-dashboard.webp',
    tag: 'SCADA & Telemetry',
    title: 'BT SCADA Dashboard',
    descId: 'Pemantauan suhu, kelembapan, tekanan, alarm, dan buzzer dari berbagai unit dalam satu layar.',
    descEn: 'Temperature, humidity, pressure, alarm, and buzzer monitoring across units on a single screen.',
  },
]

export default function Projects() {
  const { lang } = useContext(LangContext)
  const isEn = lang === 'en'

  return (
    <section id="proyek" className="section projects-section">
      <div className="container">
        <div className="projects-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className="project-image-wrap">
                <img src={project.image} alt={project.title} loading={index > 2 ? 'lazy' : 'eager'} />
                <span className="project-index">0{index + 1}</span>
              </div>
              <div className="project-card-body">
                <span className="project-tag">{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{isEn ? project.descEn : project.descId}</p>
                <span className="project-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
