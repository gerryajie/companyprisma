// DUMMY client logos — replace `src`/`name` with real company logos later.
// Put real files in public/clients/ (SVG or PNG, transparent background works best).
const files = [
  { id: 'nusantara-logistik', name: 'Nusantara Logistik' },
  { id: 'bank-sentosa', name: 'Bank Sentosa' },
  { id: 'harapan-sehat', name: 'RS Harapan Sehat' },
  { id: 'maju-bersama', name: 'Maju Bersama Group' },
  { id: 'garuda-retail', name: 'Garuda Retail' },
  { id: 'sinar-teknologi', name: 'Sinar Teknologi' },
  { id: 'bumi-energi', name: 'Bumi Energi' },
  { id: 'karya-mandiri', name: 'Karya Mandiri' },
]

export const clientCompanies = files.map((item) => ({
  name: item.name,
  src: `/clients/${item.id}.svg`,
}))
