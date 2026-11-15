import { useEffect, useState } from 'react'
import { FileText, Mail, Send, Upload, User, X } from 'lucide-react'
import { emailDisplay } from '../contact-data.js'

export default function CareerApplyModal({ open, onClose, role, lang = 'id' }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', botcheck: '' })
  const [file, setFile] = useState(null)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const isEn = lang === 'en'

  useEffect(() => {
    if (open) {
      setForm({ name: '', email: '', phone: '', message: '', botcheck: '' })
      setFile(null)
      setSending(false)
      setDone(false)
      setError('')
    }
  }, [open, role])

  if (!open) return null

  const change = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.value }))
  const chooseFile = (e) => {
    const selected = e.target.files?.[0]
    if (!selected) return
    const valid = ['application/pdf', 'application/msword']
    const extOk = /\.(pdf|doc)$/i.test(selected.name)
    if (!extOk || (selected.type && !valid.includes(selected.type))) {
      setError(isEn ? 'Only PDF or DOC files are allowed.' : 'Hanya file PDF atau DOC yang boleh dikirim.')
      e.target.value = ''
      setFile(null)
      return
    }
    if (selected.size > 4 * 1024 * 1024) {
      setError(isEn ? 'File size must be 4 MB or less.' : 'Ukuran file maksimal 4 MB.')
      e.target.value = ''
      setFile(null)
      return
    }
    setError('')
    setFile(selected)
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError(isEn ? 'Attach your CV in PDF or DOC format.' : 'Lampirkan CV dalam format PDF atau DOC.')
      return
    }
    setSending(true)
    setError('')
    const data = new FormData()
    data.append('name', form.name)
    data.append('email', form.email)
    data.append('phone', form.phone)
    data.append('subject', `Lamaran ${role}`)
    data.append('message', form.message || `Lamaran untuk posisi ${role}`)
    data.append('botcheck', form.botcheck)
    data.append('file', file)
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: data })
      const result = await res.json().catch(() => ({}))
      if (!res.ok || !result.ok) throw new Error(result.error || (isEn ? 'Failed to send application.' : 'Gagal mengirim lamaran.'))
      setDone(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        {done ? (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h3>{isEn ? 'Application Sent!' : 'Lamaran Terkirim!'}</h3>
            <p>{isEn ? `Your application for ${role} has reached our team.` : `Lamaran untuk posisi ${role} sudah masuk ke inbox tim kami.`}</p>
            <button className="btn-submit" onClick={onClose}>{isEn ? 'Close' : 'Tutup'}</button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <Mail size={22} style={{ color: 'var(--accent)' }} />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{isEn ? 'Apply for' : 'Lamar posisi'} {role}</h3>
                <p style={{ margin: '4px 0 0', fontSize: '.8rem', color: 'var(--ink-soft)' }}>{emailDisplay}</p>
              </div>
            </div>
            <form onSubmit={submit} className="modal-form">
              <div className="form-row">
                <div className="form-group"><label><User size={14} /> {isEn ? 'Full Name *' : 'Nama Lengkap *'}</label><input required name="name" value={form.name} onChange={change} /></div>
                <div className="form-group"><label><Mail size={14} /> Email *</label><input required type="email" name="email" value={form.email} onChange={change} /></div>
              </div>
              <div className="form-group"><label>{isEn ? 'Phone Number' : 'No. Telepon'}</label><input name="phone" value={form.phone} onChange={change} /></div>
              <div className="form-group"><label><FileText size={14} /> {isEn ? 'CV / Resume *' : 'CV / Resume *'}</label><input required type="file" accept=".pdf,.doc,application/pdf,application/msword" onChange={chooseFile} /><small className="file-help"><Upload size={13} /> PDF atau DOC · maks. 4 MB</small></div>
              <div className="form-group"><label>{isEn ? 'Message' : 'Pesan'}</label><textarea name="message" rows={3} value={form.message} onChange={change} placeholder={isEn ? 'Tell us briefly about yourself...' : 'Ceritakan singkat tentang diri Anda...'} /></div>
              <input type="text" name="botcheck" value={form.botcheck} onChange={change} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }} />
              {error && <p className="form-error">{error}</p>}
              <button type="submit" className="btn-submit" disabled={sending}><Send size={16} /> {sending ? (isEn ? 'Sending...' : 'Mengirim...') : (isEn ? 'Send Application' : 'Kirim Lamaran')}</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
