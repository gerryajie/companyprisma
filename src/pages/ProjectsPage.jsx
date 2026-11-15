import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { LangContext } from '../LangContext'
import Projects from '../components/Projects'
import Contact from '../components/Contact'

export default function ProjectsPage() {
  const { lang } = useContext(LangContext)
  const isEn = lang === 'en'

  useEffect(() => {
    document.title = isEn
      ? 'Projects | Prisma Centra Nusantara'
      : 'Proyek | Prisma Centra Nusantara'
  }, [isEn])

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="page-crumb" aria-label="Breadcrumb">
            <Link to="/">{isEn ? 'Home' : 'Beranda'}</Link>
            <span>/</span>
            <span aria-current="page">{isEn ? 'Projects' : 'Proyek'}</span>
          </nav>
          <span className="section-label">{isEn ? 'Selected Work' : 'Proyek Pilihan'}</span>
          <h1>{isEn ? 'Technology Built for Real Operations' : 'Teknologi yang Bekerja di Lapangan'}</h1>
          <p>{isEn
            ? 'A selection of monitoring, industrial control, and digital experience systems delivered by our team for real operational needs.'
            : 'Pilihan sistem monitoring, kontrol industri, dan pengalaman digital yang kami hadirkan untuk kebutuhan operasional nyata.'}</p>
          <div className="page-hero-actions">
            <Link to="/#kontak" className="btn btn-primary">
              {isEn ? 'Discuss a Similar Project' : 'Diskusikan Proyek Serupa'} <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <Projects />
      <Contact />
    </>
  )
}
