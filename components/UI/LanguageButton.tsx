'use client'
import { useLanguage } from '@/app/provider/LanguageContext'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import { MdKeyboardArrowDown, MdLanguage } from 'react-icons/md'

export default function LanguageButton() {
  const { language, changeLanguage } = useLanguage()

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant='bordered'>
          <MdLanguage />
          {language === 'en' ? 'English' : 'Slovenščina'}{' '}
          <MdKeyboardArrowDown />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Static Actions'>
        <DropdownItem onClick={() => changeLanguage('en')} key='new'>
          English
        </DropdownItem>
        <DropdownItem onClick={() => changeLanguage('si')} key='copy'>
          Slovenščina
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
