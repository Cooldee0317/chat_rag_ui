'use client'
import LanguageButton from '@/components/UI/LanguageButton'
import Link from 'next/link'
import { ITranslation } from '@/app/translation'

function Header({ custom }: { custom?: ITranslation }) {
  // const { isSidebarOpen, toogleSidebar } = useSidebar()

  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-3'>
        {/* {!isSidebarOpen && (
          <div>
            <ToogleButton handleClick={() => toogleSidebar()} />
          </div>
        )} */}
        <div>
          <Link href="https://siqbots.com/jub-notes/"><h3 className='font-bold text-[24px] m-0'>{custom?.header}</h3></Link>
        </div>
      </div>
      <div>
        <LanguageButton />
      </div>
    </div>
  )
}

export default Header
