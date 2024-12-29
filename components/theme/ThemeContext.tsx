'use client'

import React, { createContext, useState, useContext, useEffect, useLayoutEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'

interface ThemeContextProps {
  theme: string
  setTheme: (theme: string) => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>('system')
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || siteMetadata.theme
    setTheme(savedTheme)
    setMounted(true)
  }, []) // Uniquement au montage initial

  // Utilisation de useLayoutEffect pour appliquer le thème et fond immédiatement
  useLayoutEffect(() => {
    const currentClassList = document.documentElement.classList;
    if (mounted) {
      const themeToApply = theme === 'dark' ||
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? 'dark' : 'light'

      // Appliquer directement le fond via les styles CSS
      if (themeToApply === 'dark' && !currentClassList.contains('dark')) {
        document.documentElement.classList.add('dark')
      } else if (themeToApply !== 'dark' && currentClassList.contains('dark')) {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [mounted, theme]) // Ce useLayoutEffect sera déclenché après que l'état mounted soit true et theme ait changé

  // Sauvegarder le thème dans localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme)
    }
  }, [theme, mounted]) // Sauvegarder dans localStorage après chaque changement de thème

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
