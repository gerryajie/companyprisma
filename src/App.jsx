import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import CareersPage from './pages/CareersPage'
import NewsPage from './pages/NewsPage'
import { LangContext } from './LangContext'
import { ThemeProvider } from './ThemeContext'

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('pc-lang') || 'id')

  const changeLang = (next) => {
    setLang(next)
    localStorage.setItem('pc-lang', next)
  }

  return (
    <ThemeProvider>
      <LangContext.Provider value={{ lang, setLang: changeLang }}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="proyek" element={<ProjectsPage />} />
              <Route path="karir" element={<CareersPage />} />
              <Route path="berita" element={<NewsPage />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LangContext.Provider>
    </ThemeProvider>
  )
}

export default App
