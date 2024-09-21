'use client'
import { useLanguage } from '@/app/provider/LanguageContext'
import LanguageButton from '@/components/UI/LanguageButton'
import ToogleButton from '@/components/UI/ToogleButton'
import { useSidebar } from '@/app/provider/SidebarProvider'

function Header() {
  const { language } = useLanguage()
  const { isSidebarOpen, toogleSidebar } = useSidebar()

  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-3'>
        {!isSidebarOpen && (
          <div>
            <ToogleButton handleClick={() => toogleSidebar()} />
          </div>
        )}
        <div>
          {language === 'en' ? (
            <h3 className='font-bold'>Home Renovation Assistance</h3>
          ) : (
            <h3 className='font-bold'>Pomoč pri prenovi doma</h3>
          )}
        </div>
      </div>
      <div>
        <LanguageButton />
      </div>
    </div>
  )
}

export default Header
