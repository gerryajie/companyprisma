import { useContext } from 'react'
import { Mail } from 'lucide-react'
import { LangContext } from '../LangContext'
import { emailHref, emailDisplay } from '../contact-data.js'

export default function TopBar() {
  const { lang } = useContext(LangContext)

  return (
    <div className="topbar" aria-label={lang === 'id' ? 'Informasi kontak' : 'Contact Information'}>
      <a href={emailHref}><Mail size={13} /> {emailDisplay}</a>
    </div>
  )
}
