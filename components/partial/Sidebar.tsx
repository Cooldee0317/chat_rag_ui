import ToogleButton from '@/components/UI/ToogleButton'
import { useSidebar } from '@/app/provider/SidebarProvider'

export default function Sidebar() {
  const { isSidebarOpen, toogleSidebar } = useSidebar()
  return (
    <>
      <div
        className={`bg-gray-200 px-4 py-6  transition-all duration-900 ease-in-out ${
          isSidebarOpen ? 'w-[30%]' : 'hidden'
        } overflow-hidden`}
      >
        {isSidebarOpen && (
          <div>
            <ToogleButton handleClick={() => toogleSidebar()} />
          </div>
        )}
        <div>this is content</div>
      </div>
    </>
  )
}
