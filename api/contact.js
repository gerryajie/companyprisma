import nodemailer from 'nodemailer'

const TO = process.env.RECEIVE_EMAIL || 'prismanextech@gmail.com'
const FROM = process.env.FROM_EMAIL || process.env.SMTP_USER || 'prismanextech@gmail.com'

let transporter
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== 'false',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  }
  return transporter
}

const esc = (v = '') =>
  String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS')
    return res.status(204).end()
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { body = {} }
  }
  const { name = '', company = '', email = '', phone = '', subject = '', message = '', botcheck = '' } = body || {}

  if (botcheck) return res.status(200).json({ ok: true }) // silently drop bots
  if (!name.trim() || !email.trim() || !message.trim()) {
    return res.status(400).json({ error: 'Nama, email, dan pesan wajib diisi.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Format email tidak valid.' })
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: 'Pesan terlalu panjang.' })
  }

  const s = {
    name: esc(name), company: esc(company), email: esc(email),
    phone: esc(phone), subject: esc(subject), message: esc(message).replace(/\n/g, '<br>'),
  }

  try {
    const info = await getTransporter().sendMail({
      from: `"Website Prismatech" <${FROM}>`,
      to: TO,
      replyTo: email,
      subject: `[Website] ${subject || `Pesan baru dari ${name}`}`,
      html: `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:auto;padding:24px;background:#fff;">
        <h2 style="color:#0A6ED1;margin:0 0 16px;">Pesan Baru dari Website</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;font-weight:600;width:130px;color:#0B1B2B;">Nama</td><td style="padding:8px 0;">${s.name}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#0B1B2B;">Perusahaan</td><td style="padding:8px 0;">${s.company || '-'}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#0B1B2B;">Email</td><td style="padding:8px 0;"><a href="mailto:${s.email}">${s.email}</a></td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#0B1B2B;">Telepon</td><td style="padding:8px 0;">${s.phone || '-'}</td></tr>
        </table>
        <div style="margin-top:20px;padding:16px;background:#f5f8fc;border-radius:10px;font-size:14px;line-height:1.65;color:#0B1B2B;">
          ${s.message}
        </div>
        <p style="margin-top:24px;color:#8a94a6;font-size:12px;">Dikirim dari form kontak companyprisma.vercel.app</p>
      </div>`,
    })

    return res.status(200).json({ ok: true, id: info.messageId })
  } catch (err) {
    console.error('mail failed:', err.message)
    return res.status(500).json({ error: 'Gagal mengirim pesan. Coba lagi atau email prismanextech@gmail.com langsung.' })
  }
}
