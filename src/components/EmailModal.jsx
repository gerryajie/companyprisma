import { useState, useEffect, useContext } from 'react'
import { X, Mail, User, Building2, Phone, MessageSquare, Send } from 'lucide-react'
import { LangContext } from '../LangContext'
import { emailHref, emailDisplay } from '../contact-data.js'

export default function EmailModal({ open, onClose }) {
  const { lang } = useContext(LangContext)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', subject: '', message: '' })
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (open) {
      setDone(false)
      setForm({ name: '', company: '', email: '', phone: '', subject: '', message: '' })
    }
  }, [open])

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = form.subject || `Konsultasi proyek — ${form.name}`
    const lines = [`Nama: ${form.name}`]
    if (form.company) lines.push(`Perusahaan: ${form.company}`)
    lines.push(`Email: ${form.email}`)
    if (form.phone) lines.push(`Telepon: ${form.phone}`)
    lines.push('', form.message)
    const body = lines.join('\n')
    const href = `${emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    const a = document.createElement('a')
    a.href = href
    a.rel = 'noopener'
    a.click()
    setDone(true)
  }

  if (!open) return null

  const t = {
    name: lang === 'id' ? 'Nama Lengkap *' : 'Full Name *',
    company: lang === 'id' ? 'Nama Perusahaan' : 'Company Name',
    email: lang === 'id' ? 'Email *' : 'Email *',
    phone: lang === 'id' ? 'No. Telepon' : 'Phone Number',
    subject: lang === 'id' ? 'Subjek' : 'Subject',
    message: lang === 'id' ? 'Pesan *' : 'Message *',
    send: lang === 'id' ? 'Kirim Pesan' : 'Send Message',
    sent: lang === 'id' ? 'Aplikasi email Anda sudah dibuka dengan isi pesan ini. Tinggal tekan kirim — tim kami merespons dalam 1 hari kerja.' : 'Your email app has been opened with this message. Just hit send — our team responds within one business day.',
    close: lang === 'id' ? 'Tutup' : 'Close',
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {!done ? (
          <>
            <div className="modal-header">
              <Mail size={22} style={{ color: 'var(--accent)' }} />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{lang === 'id' ? 'Kirim Email kepada Kami' : 'Email Us'}</h3>
                <p style={{ margin: '4px 0 0', fontSize: '.8rem', color: 'var(--ink-soft)' }}>
                  {lang === 'id'
                    ? 'Isi form di bawah dan tim kami akan merespons dalam 1 hari kerja.'
                    : 'Fill out the form below and our team will respond within one business day.'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label><User size={14} /> {t.name}</label>
                  <input required name="name" value={form.name} onChange={handleChange} placeholder={lang === 'id' ? 'John Doe' : 'John Doe'} />
                </div>
                <div className="form-group">
                  <label><Building2 size={14} /> {t.company}</label>
                  <input name="company" value={form.company} onChange={handleChange} placeholder={lang === 'id' ? 'PT Contoh' : 'Acme Corp'} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><Mail size={14} /> {t.email}</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@perusahaan.com" />
                </div>
                <div className="form-group">
                  <label><Phone size={14} /> {t.phone}</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+62 812 xxxx xxxx" />
                </div>
              </div>

              <div className="form-group">
                <label><MessageSquare size={14} /> {t.subject}</label>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder={lang === 'id' ? 'Diskusi proyek sistem keamanan...' : 'Project discussion...'} />
              </div>

              <div className="form-group">
                <label>{t.message}</label>
                <textarea required name="message" rows={4} value={form.message} onChange={handleChange} placeholder={lang === 'id' ? 'Ceritakan kebutuhan proyek Anda...' : 'Tell us about your project needs...'} />
              </div>

              <button type="submit" className="btn-submit">
                <Send size={16} /> {t.send}
              </button>
            </form>
          </>
        ) : (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h3 style={{ marginTop: 16 }}>{lang === 'id' ? 'Email Siap Dikirim' : 'Email Ready to Send'}</h3>
            <p>{t.sent}</p>
            <p style={{ fontSize: '.82rem', marginTop: 10 }}>
              {lang === 'id' ? 'Tidak terbuka otomatis? Kirim manual ke ' : "Didn't open? Send manually to "}
              <a href={emailHref} style={{ color: 'var(--accent)', fontWeight: 600 }}>{emailDisplay}</a>
            </p>
            <button className="btn-submit" onClick={onClose}>{t.close}</button>
          </div>
        )}
      </div>
    </div>
  )
}
