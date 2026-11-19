import { useContext } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { LangContext } from '../LangContext'
import { phoneDisplay, phoneHref, emailDisplay, emailHref, addressDisplay } from '../contact-data.js'
import EmailModal from './EmailModal'
import { useState } from 'react'
import { content } from '../lang-data'

export default function Contact() {
  const { lang } = useContext(LangContext)
  const t = content[lang]
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="kontak" className="contact-band">
      <div className="container">
        <h2>{t.contact_h2}</h2>
        <p>{t.contact_p}</p>
        <button className="btn btn-primary btn-contact" onClick={() => setModalOpen(true)}>
          <Mail size={18} /> {t.nav_cta}
        </button>

        <div className="contact-row">
          <a className="contact-item" href={phoneHref} target="_blank" rel="noopener noreferrer"><Phone size={18} /> {phoneDisplay}</a>
          <a className="contact-item" href={emailHref}><Mail size={18} /> {emailDisplay}</a>
          <span className="contact-item"><MapPin size={18} /> {addressDisplay}</span>
        </div>
      </div>
      <EmailModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
