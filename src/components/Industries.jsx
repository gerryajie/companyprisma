import { useContext } from 'react'
import { LangContext } from '../LangContext'
import { content } from '../lang-data'
import { Landmark, Factory, Stethoscope, Truck, ShoppingBag, Building2 } from 'lucide-react'

const industries = [
  { name: 'Perbankan & Keuangan', icon: Landmark, img: '/img/banking.jpg', desc: 'Sistem keuangan yang aman dan terintegrasi untuk bank konvensional, BPR, hingga fintech.' },
  { name: 'Manufaktur', icon: Factory, img: '/img/manufacturing.jpg', desc: 'Otomatisasi produksi, IoT, dan pemantauan real-time untuk industri manufaktur modern.' },
  { name: 'Layanan Kesehatan', icon: Stethoscope, img: '/img/healthcare.jpg', desc: 'Platform kesehatan yang andal — rekam medis digital, telemedicine, hingga manajemen rumah sakit.' },
  { name: 'Logistik & Pengiriman', icon: Truck, img: '/img/logistics.jpg', desc: 'Solusi digitalisasi rantai pasok, pelacakan armada, dan optimasi distribusi.' },
  { name: 'Perdagangan & Distribusi', icon: ShoppingBag, img: '/img/trading.jpg', desc: 'Manajemen stok, penjualan, dan rantai pasok dalam satu ekosistem terpadu.' },
  { name: 'Pemerintahan & BUMN', icon: Building2, img: '/img/government.jpg', desc: 'Transformasi digital layanan publik dengan keamanan data sesuai regulasi nasional.' },
]

export default function Industries() {
  const { lang } = useContext(LangContext)
  const t = content[lang]

  return (
    <section id="industri" className="section section--alt">
      <div className="container">
        <div className="section-head">
          <span className="section-label">{t.industries_label}</span>
          <h2>{t.industries_h2}</h2>
          <p>{t.industries_lead}</p>
        </div>

        <div className="industry-grid">
          {industries.map(({ name, icon: Icon, img, desc }) => (
            <article key={name} className="industry-card">
              <div className="industry-img">
                <img src={img} alt={name} loading="lazy" />
              </div>
              <div className="industry-body">
                <div className="industry-icon"><Icon size={20} /></div>
                <h3>{name}</h3>
                <p>{desc}</p>
                <a href="#kontak" className="industry-link">
                  {lang === 'id' ? 'Diskusikan kebutuhan Anda' : 'Discuss Your Needs'} <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
