import { useEffect, useState } from 'react'
import { marked } from 'marked'
import { ReactTyped } from 'react-typed'
import DOMPurify from 'dompurify'
import { changeWriteStatus } from '@/app/Redux/chat/chatSlice'
import { useAppDispatch } from '@/app/Redux/store'
interface MessageProps {
  message: string
}

export default function BotChatItem({ message }: MessageProps) {
  const dispatch = useAppDispatch()

  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    const parseMarkdown = async () => {
      try {
        const parsedContent = await marked(message)
        const sanitizedContent = DOMPurify.sanitize(parsedContent)
        setHtmlContent(sanitizedContent)
      } catch (error) {
        console.error('Error parsing markdown:', error)
      }
    }

    parseMarkdown()
  }, [message])

  async function begin() {
    dispatch(changeWriteStatus(true))
  }

  async function destroy() {
    dispatch(changeWriteStatus(false))
  }

  return (
    <div className='inline-block max-w-[80%] p-2 rounded-lg'>
      <ReactTyped
        strings={[htmlContent]}
        typeSpeed={5}
        showCursor={false}
        onBegin={begin}
        onComplete={destroy}
      />
    </div>
  )
}
