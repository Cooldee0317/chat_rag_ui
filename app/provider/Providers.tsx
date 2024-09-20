import { NextUIProvider } from '@nextui-org/react'
import { LanguageProvider } from './LanguageContext'
import { SidebarProvider } from './SidebarProvider'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <LanguageProvider>
        <NextUIProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </NextUIProvider>
      </LanguageProvider>
    </div>
  )
}

export default Providers
