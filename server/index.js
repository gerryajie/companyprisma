import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Transport — pakai SMTP Gmail atau SMTP lain yang configured env
// Environment variables needed:
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
//   FROM_EMAIL, REPLY_TO_EMAIL
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }))

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, company, email, phone, subject, message } = req.body

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, dan pesan wajib diisi.' })
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Format email tidak valid.' })
  }

  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char])
  const safe = {
    name: escapeHtml(name), company: escapeHtml(company), email: escapeHtml(email),
    phone: escapeHtml(phone), subject: escapeHtml(subject), message: escapeHtml(message),
  }

  try {
    const info = await transporter.sendMail({
      from: `"Website Contact" <${process.env.FROM_EMAIL || 'sales@prismatech.co.id'}>`,
      to: process.env.CONTACT_RECEIVE_EMAIL || 'sales@prismatech.co.id',
      replyTo: email,
      subject: `[Contact] ${subject || 'Inquiry from Website'}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:auto;padding:20px;">
          <h2 style="color:#0A6ED1;">Pesan Baru dari Website</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-weight:bold;width:120px;">Nama:</td><td style="padding:8px 0;">${safe.name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;">Perusahaan:</td><td style="padding:8px 0;">${safe.company || '-'}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;">Email:</td><td style="padding:8px 0;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;">Telepon:</td><td style="padding:8px 0;">${safe.phone || '-'}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;">Subjek:</td><td style="padding:8px 0;">${safe.subject || 'Umum'}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#f7f8fa;border-radius:8px;">
            <strong>Pesan:</strong>
            <p style="margin-top:8px;line-height:1.6;">${safe.message.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="margin-top:24px;color:#888;font-size:.8rem;text-align:center;">
            Dikirim melalui prismacentra.id contact form
          </div>
        </div>
      `,
    })

    console.log('✅ Email terkirim:', info.messageId)
    res.json({ ok: true, messageId: info.messageId })
  } catch (err) {
    console.error('❌ Gagal kirim email:', err.message)
    res.status(500).json({ error: 'Gagal mengirim pesan. Coba lagi nanti.' })
  }
})

app.listen(PORT, () => {
  console.log(`📧 Server running on http://localhost:${PORT}`)
})
