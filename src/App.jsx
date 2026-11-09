import { useState } from 'react'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ClientsMarquee from './components/ClientsMarquee'
import Services from './components/Services'
import Industries from './components/Industries'
import Process from './components/Process'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { LangContext } from './LangContext'

function App() {
  const [lang, setLang] = useState('id')

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <TopBar />
      <Navbar />
      <Hero />
      <ClientsMarquee />
      <Services />
      <Industries />
      <Process />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </LangContext.Provider>
  )
}

export default App
