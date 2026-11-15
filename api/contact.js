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

// Multipart/form-data parser for Vercel serverless
function parseMultipart(buf, contentType) {
  const m = contentType?.match(/boundary=(?:"([^"]+)"|([^;]+))/i) || []
  const boundary = (m[1] || m[2] || '').trim()
  if (!boundary) return null
  const sep = `--${boundary}`
  const parts = buf.toString('latin1').split(sep)
  const result = {}
  for (const rawPart of parts) {
    const part = rawPart.replace(/^\r\n/, '').replace(/\r\n--$/, '')
    if (!part.trim() || part === '--') continue
    const divider = part.indexOf('\r\n\r\n')
    if (divider < 0) continue
    const headerBlock = part.slice(0, divider)
    const body = part.slice(divider + 4).replace(/\r\n$/, '')
    const discMatch = headerBlock.match(/content-disposition:\s*form-data;\s*name="([^"]+)"(?:;\s*filename="([^"]*)")?/i)
    if (!discMatch) continue
    const fieldName = discMatch[1]
    const filename = discMatch[2] || ''
    if (filename) {
      result.filename = filename
      result.filetype = headerBlock.match(/content-type:\s*([^\r\n]+)/i)?.[1]?.trim() || 'application/octet-stream'
      result.data = Buffer.from(body, 'latin1')
    } else {
      result[fieldName] = body
    }
  }
  return result
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS')
    return res.status(204).end()
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let attachments = []
  let fields = {}

  // JSON body (contact form)
  if (!req.headers['content-type']?.includes('multipart')) {
    let body = req.body
    if (typeof body === 'string') {
      try { body = JSON.parse(body) } catch { body = {} }
    }
    fields = {
      name: body.name || '', company: body.company || '', email: body.email || '',
      phone: body.phone || '', subject: body.subject || '', message: body.message || '',
      botcheck: body.botcheck || '',
    }
  } else {
    // Multipart form (career application with resume)
    const raw = await new Promise((resolve, reject) => {
      const chunks = []
      req.on('data', (chunk) => chunks.push(chunk))
      req.on('end', () => resolve(Buffer.concat(chunks)))
      req.on('error', reject)
    })
    const parsed = parseMultipart(raw, req.headers['content-type'])
    if (!parsed) return res.status(400).json({ error: 'Invalid multipart request' })
    fields = {
      name: parsed.name || '', company: parsed.company || '', email: parsed.email || '',
      phone: parsed.phone || '', subject: parsed.subject || '', message: parsed.message || '',
      botcheck: parsed.botcheck || '',
    }
    if (parsed.data && parsed.filename) {
      attachments.push({ filename: parsed.filename, content: parsed.data, contentType: parsed.filetype })
    }
  }

  const { name = '', email = '', subject = '', message = '', botcheck = '' } = fields

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
  if (attachments.length) {
    const sizeMB = attachments[0].content.length / (1024 * 1024)
    if (sizeMB > 4) return res.status(400).json({ error: 'Ukuran file maksimal 4 MB.' })
    const ext = (attachments[0].filename || '').split('.').pop()?.toLowerCase()
    if (!['pdf', 'doc'].includes(ext)) {
      return res.status(400).json({ error: 'Hanya format PDF atau DOC yang diterima.' })
    }
  }

  const s = {
    name: esc(name), company: esc(fields.company || ''), email: esc(email),
    phone: esc(fields.phone || ''), subject: esc(subject), message: esc(message).replace(/\n/g, '<br>'),
  }

  try {
    const info = await getTransporter().sendMail({
      from: `"Website Prisma Centra" <${FROM}>`,
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
        ${attachments.length ? `<div style="margin-top:16px;padding:12px;background:#fef2f2;border-radius:8px;font-size:13px;color:#7f1d1d;">📎 Lampiran: ${esc(attachments[0].filename)} (${esc(attachments[0].contentType)})</div>` : ''}
        <p style="margin-top:24px;color:#8a94a6;font-size:12px;">Dikirim dari form kontak companyprisma.vercel.app</p>
      </div>`,
      attachments,
    })

    return res.status(200).json({ ok: true, id: info.messageId })
  } catch (err) {
    console.error('mail failed:', err.message)
    return res.status(500).json({ error: 'Gagal mengirim pesan. Coba lagi atau email prismanextech@gmail.com langsung.' })
  }
}
