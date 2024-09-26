'use client'
import { useState, useEffect, useRef, CSSProperties } from 'react'
import { useSidebar } from './provider/SidebarProvider'
import Sidebar from '@/components/partial/Sidebar'
import Header from '@/components/partial/Header'
import { BsSend } from 'react-icons/bs'
import Content from '@/components/partial/Content'
import Axios from '@/utils/axios'
import 'react-toastify/dist/ReactToastify.css'
import { showToast, generateConversationID } from '@/utils/helper'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BeatLoader from 'react-spinners/BeatLoader'
import axios from 'axios'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import { Textarea } from '@nextui-org/react'
import { translations, ITranslation } from './translation'
import BotChatItem from '@/components/UI/BotChatItem'
import { useAppSelector, useAppDispatch } from './Redux/store'
import { addChatList } from './Redux/chat/chatSlice'
import { useLanguage } from './provider/LanguageContext'

const override: CSSProperties = {
  display: 'inline-block',
  borderColor: 'red',
  textAlign: 'left',
  marginLeft: '10px',
}

export default function Home() {
  const dispatch = useAppDispatch()

  const { isSidebarOpen } = useSidebar()
  const { language } = useLanguage()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [customLanguage, setCustomlanguage] = useState<ITranslation>()
  const [message, setMessage] = useState('')
  const [currentResponseType, setCurrentResponseType] =
    useState<string>('INITIAL MESSAGE')
  const [reportContent, setReportContent] = useState<string>('')
  const [buttons, setButtons] = useState([])
  const [pending, setPending] = useState(false)

  const writingStatus = useAppSelector((state) => state.chat.writing_status)
  const chatLists = useAppSelector((state) => state.chat.lists)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (language === 'eng') {
      setCustomlanguage(translations.eng)
    } else {
      setCustomlanguage(translations.svn)
    }
  }, [language])

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight
    }
  }, [chatLists])

  async function requestAPI(value: string) {
    setButtons([])

    let userMsg = {
      message: value,
      type: 'user',
    }

    dispatch(addChatList(userMsg))

    const body = JSON.stringify({
      query: value,
      conversationID: generateConversationID(),
      chat_history: [
        {
          sender: 'bot',
          content: 'i am paintassisstence bot',
          response_type: 'INITIAL MESSAGE',
        },
      ],
      lang: language,
      previous_search_query: '',
      colors: [],
    })

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://siqbots.com/rag1.0/invoke',
      headers: {
        'X-Api-Key': 'swdUNpOVONIbSVUacAmsQgk8rG049TbiQApcPEzRQCo',
        'Content-Type': 'application/json',
      },
      data: body,
    }

    try {
      setPending(true)
      const response = await axios.request(config)
      if (response.status === 200) {
        setPending(false)
        setCurrentResponseType(response.data.response_type)
        setButtons(response.data.buttons)
        let msg = {
          message: response.data.response,
          type: 'bot',
        }
        await dispatch(addChatList(msg))
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function sendMessage() {
    if (message !== '') {
      if (!writingStatus && !pending) {
        let query = message

        requestAPI(query)

        setMessage('')
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  function handleReport() {
    if (reportContent !== '') {
      console.log('object')
      return ''
    } else {
      return showToast('warning', <p>You should input the report message</p>)
    }
  }

  return (
    <div className='bg-gray-200'>
      <div className='container bg-white flex min-h-screen mx-auto'>
        {/* <Sidebar /> */}
        <div
          className={`justify-between px-8 relative py-6 transition-all duration-900 gap-10 ease-in-out ${
            isSidebarOpen ? 'w-[70%]' : 'w-[100%]'
          }`}
        >
          <Header custom={customLanguage} />
          {chatLists.length > 0 ? (
            <div
              ref={chatEndRef}
              className='container chatbox h-[calc(100vh-185px)] my-4 pb-5 pt-12 overflow-y-auto scrollbar-x-hide flex flex-col'
            >
              {chatLists.map((value, index) => {
                if (value.type === 'bot') {
                  return (
                    <div key={index} className='flex m-2'>
                      <BotChatItem message={value.message} />
                    </div>
                  )
                } else if (value.type === 'user') {
                  return (
                    <div key={index} className='flex justify-end m-1'>
                      <div className='max-w-[40%] py-2 px-4 bg-gray-200 rounded-xl'>
                        <p>{value.message}</p>
                      </div>
                    </div>
                  )
                }
              })}
              <div className='button_container flex flex-wrap gap-2'>
                {buttons.length > 0 &&
                  buttons.map((value, index) => {
                    return (
                      <Button
                        key={index}
                        onClick={() => requestAPI(value)}
                        color='primary'
                        variant='bordered'
                      >
                        {value}
                      </Button>
                    )
                  })}
              </div>
              <BeatLoader
                loading={pending}
                cssOverride={override}
                size={10}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            </div>
          ) : (
            <Content />
          )}

          <div className='flex justify-center w-full items-center px-6 gap-2'>
            <div className='flex w-full gap-2 justify-center'>
              <Button
                radius='full'
                className='border py-7 px-5'
                onPress={onOpen}
              >
                {customLanguage?.report}
              </Button>
              <div className='w-[80%] text-[14px] relative'>
                <input
                  disabled={writingStatus ? true : false}
                  type='text'
                  placeholder={customLanguage?.placeholder}
                  className='py-5 pl-4 pr-32 rounded-full w-full shadow-custom-inset focus-visible:outline-none'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className='absolute  right-2 bottom-[5.5px]'>
                  <Button
                    radius='full'
                    className='text-white text-lg send_btn_border p-6 bg-gradient-to-tr from-[#FF8C42] to-[#FF6136]'
                    endContent={<BsSend className='text-sswhite' />}
                    onClick={() => sendMessage()}
                  >
                    {customLanguage?.sendButton}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <Modal
          backdrop='opaque'
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size='xl'
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: 'easeOut',
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: 'easeIn',
                },
              },
            },
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  {customLanguage?.reportTitle}
                </ModalHeader>
                <ModalBody>
                  <p>{customLanguage?.reportInstructions}</p>
                  <Textarea
                    isRequired
                    placeholder={customLanguage?.reportTextPlaceholder}
                    className=''
                    value={reportContent}
                    onChange={(e) => setReportContent(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' variant='light' onPress={onClose}>
                    {customLanguage?.closeReportButton}
                  </Button>
                  <Button color='primary' onClick={handleReport}>
                    {customLanguage?.sendReportButton}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <ToastContainer
          bodyClassName={() => 'text-sm font-white font-med block p-3 flex'}
        />
      </>
    </div>
  )
}
