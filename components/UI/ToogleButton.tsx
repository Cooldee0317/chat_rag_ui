'use client'
import { Button } from '@nextui-org/react'
import { MdToc } from 'react-icons/md'

interface ToogleButtonProps {
  handleClick: () => void
}

export default function ToogleButton({ handleClick }: ToogleButtonProps) {
  return (
    <Button
      onPress={handleClick}
      isIconOnly
      size='md'
      color='default'
      aria-label='hide'
    >
      <MdToc className='w-5 h-5' />
    </Button>
  )
}
