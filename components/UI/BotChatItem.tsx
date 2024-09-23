import { useEffect, useState } from 'react'
import { ReactTyped, Typed } from 'react-typed'
interface MessageProps {
  message: string
}

export default function BotChatItem({ message }: MessageProps) {
  const [typed, setTyped] = useState<Typed | undefined>()

  return (
    <div className='inline-block max-w-[80%] p-4rounded-lg'>
      <ReactTyped typedRef={setTyped} strings={[message]} typeSpeed={20} />
    </div>
  )
}
