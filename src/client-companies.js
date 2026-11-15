// Real client logos supplied in /Downloads/gambar_trikarsa.
const files = [
  { id: 'iu', name: 'iU' , ext: 'png' },
  { id: 'pama', name: 'PAMA — member of ASTRA', ext: 'png' },
  { id: 'lemigas', name: 'LEMIGAS', ext: 'png' },
  { id: 'as', name: 'AS', ext: 'jpg' },
  { id: 'cahaya-mandiri-farma', name: 'Cahaya Mandiri Farma', ext: 'jpg' },
  { id: 'dsv', name: 'DSV', ext: 'png' },
  { id: 'mister-pancong', name: 'Mister Pancong', ext: 'png' },
  { id: 'penduduk-jajan', name: "Pen'duduk Jajan", ext: 'png' },
]

export const clientCompanies = files.map((item) => ({
  name: item.name,
  src: `/clients/${item.id}.${item.ext}`,
}))

export const clientById = Object.fromEntries(files.map((item) => [
  item.id,
  { name: item.name, src: `/clients/${item.id}.${item.ext}` },
]))
