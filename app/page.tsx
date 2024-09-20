'use client'
import { useLanguage } from './provider/LanguageContext'
import LanguageButton from '@/components/UI/LanguageButton'
import ToogleButton from '@/components/UI/ToogleButton'
import { useSidebar } from './provider/SidebarProvider'
import Sidebar from '@/components/partial/Sidebar'

export default function Home() {
  const { language } = useLanguage()
  const { isSidebarOpen, toogleSidebar } = useSidebar()
  return (
    <div className='min-h-screen'>
      <div className='max-w-[80%] flex justify-end min-h-screen mx-auto bg-gray-400'>
        <Sidebar />
        <div
          className={`px-8 py-6 transition-all duration-900 ease-in-out ${
            isSidebarOpen ? 'w-[70%]' : 'w-[100%]'
          }`}
        >
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
        </div>
      </div>
    </div>
  )
}
