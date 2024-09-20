'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface SidebarProviderProps {
  isSidebarOpen: boolean
  toogleSidebar: () => void
}

const SidebarContext = createContext<SidebarProviderProps | undefined>(
  undefined
)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toogleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toogleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext) as SidebarProviderProps
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarContext')
  }

  return context
}
