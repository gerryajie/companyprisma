import { useContext } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { LangContext } from '../LangContext'
import { phoneDisplay, emailDisplay } from '../contact-data.js'
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
        <button className="btn btn-primary" style={{ fontSize: '.93rem', padding: '14px 30px' }} onClick={() => setModalOpen(true)}>
          <Mail size={17} /> {lang === 'id' ? 'Kirim Email kepada Kami' : 'Email Us'}
        </button>

        <div className="contact-row">
          <span className="contact-item"><Phone size={18} /> {phoneDisplay}</span>
          <span className="contact-item"><Mail size={18} /> {emailDisplay}</span>
          <span className="contact-item"><MapPin size={18} /> Jakarta, Indonesia</span>
        </div>
      </div>
      <EmailModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
