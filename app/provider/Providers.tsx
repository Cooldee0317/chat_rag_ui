'use client'
import { NextUIProvider } from '@nextui-org/react'
import { LanguageProvider } from './LanguageContext'
import { SidebarProvider } from './SidebarProvider'
import ReduxProvider from './Redux-provider'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ReduxProvider>
        <LanguageProvider>
          <NextUIProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </NextUIProvider>
        </LanguageProvider>
      </ReduxProvider>
    </div>
  )
}

export default Providers
