'use client'
import LanguageButton from '@/components/UI/LanguageButton'
import ToogleButton from '@/components/UI/ToogleButton'
import { useSidebar } from '@/app/provider/SidebarProvider'
import { ITranslation } from '@/app/translation'

function Header({ custom }: { custom?: ITranslation }) {
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
          <h3 className='font-bold'>{custom?.header}</h3>
        </div>
      </div>
      <div>
        <LanguageButton />
      </div>
    </div>
  )
}

export default Header
