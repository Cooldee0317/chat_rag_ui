'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface LanguageContextProps {
  language: string
  changeLanguage: (newLanguage: string) => void
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('eng')
  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext) as LanguageContextProps
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}
