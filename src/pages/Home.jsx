import Hero from '../components/Hero'
import ClientsMarquee from '../components/ClientsMarquee'
import Services from '../components/Services'
import Industries from '../components/Industries'
import Process from '../components/Process'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <ClientsMarquee />
      <Services />
      <Industries />
      <Process />
      <About />
      <Testimonials />
      <Contact />
    </>
  )
}
