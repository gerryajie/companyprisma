import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Globe, MessageCircle } from 'lucide-react'
import { LangContext } from '../LangContext'
import { content } from '../lang-data'
import { phoneHref, phoneDisplay, emailHref, emailDisplay, waHref, addressDisplay } from '../contact-data.js'

const socials = [
  { icon: Globe, labelId: 'Website', labelEn: 'Website', href: '/' },
  { icon: MessageCircle, labelId: 'WhatsApp', labelEn: 'WhatsApp', href: waHref },
]

export default function Footer() {
  const { lang } = useContext(LangContext)
  const t = content[lang]

  const footerColumns = lang === 'id'
    ? [
        {
          title: 'Perusahaan',
          links: [
            { label: 'Tentang Kami', to: '/#tentang' },
            { label: 'Proyek', to: '/proyek' },
            { label: 'Karier', to: '/karir' },
            { label: 'Berita', to: '/berita' },
            { label: 'Kontak', to: '/#kontak' },
          ],
        },
        {
          title: 'Layanan',
          links: [
            { label: 'Custom Software', to: '/#layanan' },
            { label: 'Mobile Apps', to: '/#layanan' },
            { label: 'Cloud & DevOps', to: '/#layanan' },
            { label: 'UI/UX Design', to: '/#layanan' },
            { label: 'IT Consulting', to: '/#layanan' },
          ],
        },
        {
          title: 'Industri',
          links: [
            { label: 'Perbankan', to: '/#industri' },
            { label: 'Manufaktur', to: '/#industri' },
            { label: 'Kesehatan', to: '/#industri' },
            { label: 'Logistik', to: '/#industri' },
            { label: 'Pemerintahan', to: '/#industri' },
          ],
        },
      ]
    : [
        {
          title: 'Company',
          links: [
            { label: 'About Us', to: '/#tentang' },
            { label: 'Projects', to: '/proyek' },
            { label: 'Careers', to: '/karir' },
            { label: 'News', to: '/berita' },
            { label: 'Contact', to: '/#kontak' },
          ],
        },
        {
          title: 'Services',
          links: [
            { label: 'Custom Software', to: '/#layanan' },
            { label: 'Mobile Apps', to: '/#layanan' },
            { label: 'Cloud & DevOps', to: '/#layanan' },
            { label: 'UI/UX Design', to: '/#layanan' },
            { label: 'IT Consulting', to: '/#layanan' },
          ],
        },
        {
          title: 'Industries',
          links: [
            { label: 'Banking', to: '/#industri' },
            { label: 'Manufacturing', to: '/#industri' },
            { label: 'Healthcare', to: '/#industri' },
            { label: 'Logistics', to: '/#industri' },
            { label: 'Government', to: '/#industri' },
          ],
        },
      ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/logo.png" alt={t.nav_about} />
            <strong>Prisma Centra Nusantara</strong>
            <p>{t.footer_about}</p>
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
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer-col">
            <h4>{t.footer_contact}</h4>
            <ul>
              <li><a href={emailHref}>{emailDisplay}</a></li>
              <li><a href={phoneHref} target="_blank" rel="noopener noreferrer">{phoneDisplay}</a></li>
              <li>{addressDisplay}</li>
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
