import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { LangContext } from '../LangContext'
import Careers from '../components/Careers'
import Contact from '../components/Contact'

export default function CareersPage() {
  const { lang } = useContext(LangContext)
  const isEn = lang === 'en'

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="page-crumb" aria-label="Breadcrumb">
            <Link to="/">{isEn ? 'Home' : 'Beranda'}</Link>
            <span>/</span>
            <span aria-current="page">{isEn ? 'Careers' : 'Karier'}</span>
          </nav>
          <span className="section-label">{isEn ? 'Careers' : 'Karier'}</span>
          <h1>{isEn ? 'Build Meaningful Systems With Us' : 'Bangun Sistem yang Berdampak Bersama Kami'}</h1>
          <p>{isEn
            ? 'We are looking for thoughtful people who care about craft, collaboration, and technology that solves real operational challenges.'
            : 'Kami mencari talenta yang peduli pada kualitas kerja, kolaborasi, dan teknologi yang menyelesaikan tantangan operasional nyata.'}</p>
          <div className="page-hero-actions">
            <a href="#posisi" className="btn btn-primary">
              {isEn ? 'See Open Roles' : 'Lihat Posisi Terbuka'} <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <Careers />
      <Contact />
    </>
  )
}
