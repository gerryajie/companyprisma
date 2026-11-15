import { useEffect } from 'react'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { LangContext } from '../LangContext'

const baseUrl = 'https://companyprisma.vercel.app'

const metadata = {
  '/': {
    id: {
      title: 'Prisma Centra Nusantara | Solusi IT & Transformasi Digital',
      description: 'Prisma Centra Nusantara menyediakan pengembangan perangkat lunak, aplikasi mobile, cloud, UI/UX, dan konsultasi IT untuk kebutuhan operasional nyata.',
    },
    en: {
      title: 'Prisma Centra Nusantara | IT Solutions & Digital Transformation',
      description: 'Prisma Centra Nusantara delivers software engineering, mobile apps, cloud services, UI/UX design, and IT consulting for real operational needs.',
    },
  },
  '/proyek': {
    id: {
      title: 'Proyek | Prisma Centra Nusantara',
      description: 'Portofolio sistem monitoring, kontrol industri, dan pengalaman digital dari Prisma Centra Nusantara.',
    },
    en: {
      title: 'Projects | Prisma Centra Nusantara',
      description: 'Portfolio of monitoring systems, industrial control, and digital experiences delivered by Prisma Centra Nusantara.',
    },
  },
  '/karir': {
    id: {
      title: 'Karier | Prisma Centra Nusantara',
      description: 'Bergabung dengan Prisma Centra Nusantara. Lihat posisi Business Analyst, QA, Fullstack Developer, dan DevOps yang tersedia.',
    },
    en: {
      title: 'Careers | Prisma Centra Nusantara',
      description: 'Join Prisma Centra Nusantara. View open positions for Business Analyst, QA, Fullstack Developer, and DevOps roles.',
    },
  },
  '/berita': {
    id: {
      title: 'Berita Teknologi | Prisma Centra Nusantara',
      description: 'Kurasi berita teknologi terbaru dari sumber publik pilihan oleh Prisma Centra Nusantara.',
    },
    en: {
      title: 'Tech News | Prisma Centra Nusantara',
      description: 'Curated latest technology news from public sources selected by Prisma Centra Nusantara.',
    },
  },
}

function upsert(name, content, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(property ? 'property' : 'name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function RouteMeta() {
  const { pathname } = useLocation()
  const { lang } = useContext(LangContext)
  const isEn = lang === 'en'

  useEffect(() => {
    const data = metadata[pathname] || metadata['/']
    const entry = isEn ? data.en : data.id
    const url = `${baseUrl}${pathname === '/' ? '/' : pathname}`
    document.title = entry.title
    document.documentElement.lang = isEn ? 'en' : 'id'
    upsert('description', entry.description)
    upsert('og:title', entry.title, true)
    upsert('og:description', entry.description, true)
    upsert('og:url', url, true)
    upsert('twitter:title', entry.title)
    upsert('twitter:description', entry.description)
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [pathname, isEn])

  return null
}
