/* eslint-disable react(only-export-components) */
import { createContext, useContext, useEffect, useState } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('pc-theme')
    if (saved) {
      setTheme(saved)
    } else {
      setTheme(
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      )
    }
  }, []) // eslint-disable-line react(set-state-in-effect)

  useEffect(() => {
    if (!theme) return
    document.documentElement.dataset.theme = theme
    localStorage.setItem('pc-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
