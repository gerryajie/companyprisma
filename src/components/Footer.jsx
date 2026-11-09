import { useContext } from 'react'
import { Globe, MessageCircle, Send } from 'lucide-react'
import { LangContext } from '../LangContext'
import { content } from '../lang-data'
import { phoneHref, phoneDisplay, emailHref, emailDisplay } from '../contact-data.js'

const socials = [
  { icon: Globe, labelId: 'Website', labelEn: 'Website', href: '#' },
  { icon: MessageCircle, labelId: 'WhatsApp', labelEn: 'WhatsApp', href: '#' },
  { icon: Send, labelId: 'Telegram', labelEn: 'Telegram', href: '#' },
]

export default function Footer() {
  const { lang } = useContext(LangContext)
  const t = content[lang]

  const aboutText = lang === 'id'
    ? 'Perusahaan teknologi baru dengan tim senior berpengalaman 5+ tahun — membangun sistem yang stabil, aman, dan skalabel untuk bisnis Anda.'
    : 'A new technology company backed by a senior team with 5+ years of experience — building stable, secure, and scalable systems for your business.'

  const footerColumns = lang === 'id'
    ? [
        { title: 'Perusahaan', links: ['Tentang Kami', 'Tim & Karier', 'Portofolio', 'Blog'] },
        { title: 'Layanan', links: ['Custom Software', 'Mobile Apps', 'Cloud & DevOps', 'UI/UX Design', 'Managed Hosting', 'IT Consulting'] },
        { title: 'Industri', links: ['Perbankan', 'Manufaktur', 'Kesehatan', 'Logistik', 'Pemerintahan'] },
      ]
    : [
        { title: 'Company', links: ['About Us', 'Team & Careers', 'Portfolio', 'Blog'] },
        { title: 'Services', links: ['Custom Software', 'Mobile Apps', 'Cloud & DevOps', 'UI/UX Design', 'Managed Hosting', 'IT Consulting'] },
        { title: 'Industries', links: ['Banking', 'Manufacturing', 'Healthcare', 'Logistics', 'Government'] },
      ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/logo.png" alt={lang === 'id' ? 'Logo Prisma Centra Nusantara' : 'Prisma Centra Nusantara Logo'} />
            <strong>Prisma Centra Nusantara</strong>
            <p>{aboutText}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {socials.map(({ icon: Icon, labelId, labelEn, href }) => (
                <a key={labelId} href={href} aria-label={lang === 'id' ? labelId : labelEn} style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', transition: 'all .2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#60A5FA'; e.currentTarget.style.color = '#60A5FA'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'; e.currentTarget.style.color = '#64748B'; }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map(({ title, links }) => (
            <div key={title} className="footer-col">
              <h4>{title}</h4>
              <ul>
                {links.map((link) => (
                  <li key={link}><a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer-col">
            <h4>{lang === 'id' ? 'Kontak' : 'Contact'}</h4>
            <ul>
              <li><a href={emailHref}>{emailDisplay}</a></li>
              <li><a href={phoneHref}>{phoneDisplay}</a></li>
              <li>Jl. Sudirman Kav. 50<br/>Jakarta Selatan, 12190</li>
              <li>{lang === 'id' ? 'Senin–Jumat, 09:00–18:00 WIB' : 'Monday–Friday, 09:00–18:00 WIB'}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t.footer_copyright}</span>
        </div>
      </div>
    </footer>
  )
}
