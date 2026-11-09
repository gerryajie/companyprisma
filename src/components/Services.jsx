import { useContext } from 'react'
import { LangContext } from '../LangContext'
import { content } from '../lang-data'
import {
  Code2, Smartphone, Cloud, Layout, Server, ShieldCheck,
} from 'lucide-react'


export default function Services() {
  const { lang } = useContext(LangContext)
  const t = content[lang]

  const servicesData = {
    id: [
      {
        icon: Code2,
        title: 'Custom Software Development',
        desc: 'Aplikasi web dan desktop yang dirancang khusus sesuai proses bisnis Anda — skalabel, aman, dan terpelihara dalam jangka panjang.',
      },
      {
        icon: Smartphone,
        title: 'Mobile Application',
        desc: 'Platform iOS & Android dengan pengalaman pengguna yang matang. Native atau lintas platform, siap menjangkau pengguna Anda.',
      },
      {
        icon: Cloud,
        title: 'Cloud & DevOps',
        desc: 'Migrasi infrastruktur ke cloud, pipeline CI/CD, kontainerisasi, dan arsitektur serverless untuk kecepatan rilis.',
      },
      {
        icon: Layout,
        title: 'UI/UX Design',
        desc: 'Riset pengguna, wireframing, prototyping, hingga design system yang konsisten untuk produk digital yang intuitif.',
      },
      {
        icon: Server,
        title: 'Managed Hosting & Infrastructure',
        desc: 'Infrastruktur terkelola dengan pemantauan 24/7, cadangan otomatis, dan SLA keandalan tinggi — Anda fokus pada bisnis.',
      },
      {
        icon: ShieldCheck,
        title: 'IT Consulting & Strategy',
        desc: 'Audit teknologi, peta jalan transformasi digital, dan rekomendasi arsitektur yang sejalan dengan tujuan organisasi.',
      },
    ],
    en: [
      {
        icon: Code2,
        title: 'Custom Software Development',
        desc: 'Web and desktop applications custom-designed to match your business processes — scalable, secure, and maintainable for the long term.',
      },
      {
        icon: Smartphone,
        title: 'Mobile Application',
        desc: 'iOS & Android platforms with mature user experience. Native or cross-platform, ready to reach your users.',
      },
      {
        icon: Cloud,
        title: 'Cloud & DevOps',
        desc: 'Cloud infrastructure migration, CI/CD pipelines, containerization, and serverless architecture for faster releases.',
      },
      {
        icon: Layout,
        title: 'UI/UX Design',
        desc: 'User research, wireframing, prototyping, and consistent design systems for intuitive digital products.',
      },
      {
        icon: Server,
        title: 'Managed Hosting & Infrastructure',
        desc: 'Managed infrastructure with 24/7 monitoring, automatic backups, and high-reliability SLA — you focus on business.',
      },
      {
        icon: ShieldCheck,
        title: 'IT Consulting & Strategy',
        desc: 'Technology audits, digital transformation roadmaps, and architecture recommendations aligned with your organizational goals.',
      },
    ]
  }

  const services = servicesData[lang]

  return (
    <section id="layanan" className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 16 }}>
          <div className="section-head" style={{ margin: 0, maxWidth: 520 }}>
            <span className="section-label">{t.services_label}</span>
            <h2>{t.services_h2}</h2>
            <p>{t.services_lead}</p>
          </div>
          <a href="#kontak" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
            {t.services_cta} <Code2 size={17} />
          </a>
        </div>

        <div className="services-grid">
          {services.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="service-card">
              <div className="service-icon"><Icon size={22} /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
