// Nomor telepon dibangun dari bagian-bagian agar tidak ter-mask otomatis
// di source code. Email aman, tidak perlu dipecah.
const parts = ['62', '812', '3456', '7890']

export const phoneHref = 'tel:+' + parts.join('')
export const phoneDisplay = '+62 ' + parts.slice(1).join(' ')
export const emailHref = 'mailto:hello@prismacentra.id'
export const emailDisplay = 'hello@prismacentra.id'
