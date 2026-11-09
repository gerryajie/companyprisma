import { useContext } from 'react'
import { Mail, Phone } from 'lucide-react'
import { LangContext } from '../LangContext'
import { phoneHref, phoneDisplay } from '../contact-data.js'

export default function TopBar() {
  const { lang } = useContext(LangContext)

  return (
    <div className="topbar" aria-label={lang === 'id' ? 'Informasi kontak' : 'Contact Information'}>
      <a href="mailto:hello@prismacentra.id"><Mail size={13} /> hello@prismacentra.id</a>
      <a href={phoneHref}><Phone size={13} />{phoneDisplay}</a>
      <span>{lang === 'id' ? 'Jam operasional: Senin–Jumat, 09:00–18:00 WIB' : 'Operating hours: Monday–Friday, 09:00–18:00 WIB'}</span>
    </div>
  )
}
