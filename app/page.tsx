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
  Input,
  Select,
  SelectItem,
  Selection,
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
  const [height, setHeight] = useState<string>()
  const [length, setLength] = useState<string>()
  const [width, setWidth] = useState<string>()
  const [windows, setWindows] = useState<string>()
  const [doors, setDoors] = useState<string>()
  const [ceiling, setCeiling] = useState<string>('')
  const [doorArea, setDoorArea] = useState<string>()
  const [windowArea, setWindowArea] = useState<string>()
  const [additionalArea, setAdditionalArea] = useState<string>()

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
      chat_history: chatLists,
      lang: language,
      previous_search_query: '',
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
          response_type: response.data.response_type,
        }
        await dispatch(addChatList(msg))
      }
    } catch (error: any) {
      showToast('error', <p>{error.message}</p>)
      setPending(false)
    }
  }

  async function sendMessage() {
    if (message !== '') {
      if (!writingStatus && !pending) {
        let query
        if (currentResponseType === 'CALCULATION TYPE2') {
          query = `{"type":"2","area":0,"height":${height},"length":${length},"width":${width},"door area":0,"window area":0,"doors number":${doors},"windows number":${windows},"additional unpaintable areas":0,"ceiling":${
            ceiling === 'yes' ? true : false
          }}`
        } else if (currentResponseType === 'CALCULATION TYPE3') {
          query = `{"type":"3","area":0,"height":${height},"length":${length},"width":${width},"door area":${doorArea},"window area":${windowArea},"doors number":${doors},"windows number":${windows},"additional unpaintable areas":${additionalArea},"ceiling":${
            ceiling === 'yes' ? true : false
          }}`
        } else {
          query = message
        }

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

  const addCategoriesSection = (categories: any[], remainingButtons: any[]) => {
    return (
      <div>
        <h4>Categories</h4>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
        <p>Remaining buttons: {remainingButtons.join(', ')}</p>
      </div>
    )
  }

  function CateEle({ type }: { type: string }) {
    return (
      <div className='bg-[#F1F6F6] flex flex-col gap-2 p-4 rounded-md'>
        <div className='flex gap-2'>
          <Input
            type='text'
            label='Height'
            variant='bordered'
            value={height}
            onValueChange={setHeight}
          />
          <Input
            type='text'
            label='Length'
            variant='bordered'
            value={length}
            onValueChange={setLength}
          />
          <Input
            type='text'
            label='Width'
            variant='bordered'
            value={width}
            onValueChange={setWidth}
          />
        </div>
        <div>
          <Select
            label='Do you want to paint the ceiling?'
            className='w-full'
            variant='bordered'
            selectedKeys={[ceiling]}
            onChange={handleSetCeiling}
          >
            <SelectItem key='yes'>Yes</SelectItem>
            <SelectItem key='no'>No</SelectItem>
          </Select>
        </div>
        <div className='flex gap-2'>
          <Input
            type='text'
            label='Number of Windows'
            variant='bordered'
            value={windows}
            onValueChange={setWindows}
          />
          <Input
            type='text'
            label='Number of Doors'
            variant='bordered'
            value={doors}
            onValueChange={setDoors}
          />
        </div>
        {type === 'calc3' && (
          <div>
            <div className='flex gap-2'>
              <Input
                type='text'
                label='Door area'
                variant='bordered'
                value={windowArea}
                onValueChange={setWindowArea}
              />
              <Input
                type='text'
                label='Window area'
                variant='bordered'
                value={doorArea}
                onValueChange={setDoorArea}
              />
              <Input
                type='text'
                label='Additional unpaintable areas'
                variant='bordered'
                value={additionalArea}
                onValueChange={setAdditionalArea}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderButtons = () => {
    const first = buttons[0]
    const remainingButtons = buttons.slice(1)

    if (first === 'additional info') {
      const tempCategories: any[] = []
      let i = 0
      while (i < remainingButtons.length && remainingButtons[i] !== 'finish') {
        tempCategories.push(remainingButtons[i])
        i++
      }
      const newRemainingButtons = remainingButtons.slice(i + 1)
      return addCategoriesSection(tempCategories, newRemainingButtons)
    } else if (first === 'calculation selection') {
      return (
        <div className='chat-buttons flex flex-wrap gap-2'>
          {[1, 2, 3].map((i) => (
            <Button
              className='bg-[#F1F6F6]'
              key={i}
              onClick={() => {
                setMessage(i.toString())
                sendMessage()
              }}
            >
              {i === 1 && 'Enter known area'}
              {i === 2 && 'Calculate approximate area'}
              {i === 3 && 'Calculate exact area'}
            </Button>
          ))}
        </div>
      )
    } else if (['calc1', 'calc2', 'calc3'].includes(first)) {
      if (first === 'calc1') {
        return (
          <div className='bg-[#F1F6F6] p-4 rounded-md'>
            <Input
              type='text'
              label='Area'
              variant='bordered'
              value={message}
              onValueChange={setMessage}
            />
          </div>
        )
      } else if (first === 'calc2') {
        return <CateEle type={first} />
      }
    } else if (first === 'normal') {
      return (
        <div className='chat-buttons flex flex-wrap gap-2'>
          {remainingButtons.map((msg, index) => (
            <Button
              className='bg-[#F1F6F6]'
              key={index}
              onClick={() => {
                if (msg === 'Colour chart') {
                  window.open(
                    'https://www.jub.si/barvni-odtenki-in-navdihi/barvna-karta-jub-favourite-feelings/?category=Joy',
                    '_blank'
                  )
                  const addon = `🎨**Once you've found the color that speaks to you, let's dive into finding the perfect paint to match!**\n\nTo get started, could you share a bit more about the **room** you're painting? And if you have any preferences, such as:\n- **Budget**\n- **Washability**\n- **Health impact** (like low VOCs or allergies)\n- **Special features** (like mold protection, stain resistance, thermal insulation, etc.)\n\nI'm here to help you find exactly what you're looking for! Let's make this project a breeze!🏠✨`
                  requestAPI(addon)
                } else if (msg === 'Jupol trend catalogue') {
                  window.open(
                    'https://www.jub.si/izdelki/jupol-trend/',
                    '_blank'
                  )
                } else if (msg === 'Jupol junior catalogue') {
                  window.open(
                    'https://www.jub.si/izdelki/jupol-junior/',
                    '_blank'
                  )
                } else if (msg == 'Designer Colours') {
                  window.open(
                    'https://www.jub.eu/surprising-ideas-for-painting-walls/',
                    '_blank'
                  )
                } else if (msg == 'DECOR Range') {
                  window.open(
                    'https://www.jub.eu/system-solutions-diy/dekorativne-resitve-en/',
                    '_blank'
                  )
                } else {
                  requestAPI(msg)
                }
              }}
            >
              {msg}
            </Button>
          ))}
        </div>
      )
    } else {
      console.log(`first word of buttons is incorrect: ${buttons}`)
    }
  }

  function handleSetCeiling(e: React.ChangeEvent<HTMLSelectElement>) {
    setCeiling(e.target.value)
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
              className='container chatbox h-[calc(100vh-185px)] my-4 pb-5 pt-12 overflow-y-auto scrollbar-x-hide flex flex-col justify-between'
            >
              <div>
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

                <BeatLoader
                  loading={pending}
                  cssOverride={override}
                  size={10}
                  aria-label='Loading Spinner'
                  data-testid='loader'
                />
              </div>
              <div
                className={`button_container w-full flex flex-wrap justify-center gap-2`}
              >
                <CateEle type='calc3'/>
              </div>
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
