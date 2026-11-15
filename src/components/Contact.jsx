import { useContext } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { LangContext } from '../LangContext'
import { phoneDisplay, phoneHref, emailDisplay, emailHref, addressDisplay } from '../contact-data.js'
import EmailModal from './EmailModal'
import { useState } from 'react'

export default function Contact() {
  const { lang } = useContext(LangContext)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="kontak" className="contact-band">
      <div className="container">
        <h2>{lang === 'id' ? 'Siap Memulai Proyek Anda?' : 'Ready to Start Your Project?'}</h2>
        <p>
          {lang === 'id'
            ? 'Konsultasikan kebutuhan IT perusahaan Anda secara gratis. Tim kami merespons dalam waktu satu hari kerja.'
            : 'Get a free consultation for your company\u2019s IT needs. Our team responds within one business day.'}
        </p>
        <button className="btn btn-primary btn-contact" onClick={() => setModalOpen(true)}>
          <Mail size={18} /> {lang === 'id' ? 'Kirim Email kepada Kami' : 'Email Us'}
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
