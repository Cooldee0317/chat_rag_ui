'use client'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import { MdOutlineMoreVert } from 'react-icons/md'

export default function FeedBackMiniButton() {
  return (
    <div className='md:hidden'>
        <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size='lg' variant='bordered' radius='full'>
          <MdOutlineMoreVert />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Dynamic Actions'>
        <DropdownItem>Feedback</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    </div>
  )
}
