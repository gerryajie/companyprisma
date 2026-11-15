// Nomor kontak dibangun dari bagian-bagian agar tidak ter-mask otomatis
// di source code. Email aman, tidak perlu dipecah.
const parts = ['62', '895', '1997', '5297']

export const waNumber = parts.join('')
export const waHref = 'https://wa.me/' + waNumber
export const waDisplay = '0' + parts.slice(1).join('')

// Nomor telepon = nomor WhatsApp
export const phoneHref = waHref
export const phoneDisplay = '+62 ' + parts.slice(1).join(' ')

export const emailHref = 'mailto:hello@prismacentra.id'
export const emailDisplay = 'hello@prismacentra.id'
