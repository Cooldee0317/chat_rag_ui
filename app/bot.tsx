'use client'
import { useState, useEffect, useRef, CSSProperties } from 'react'
import { useSidebar } from './provider/SidebarProvider'
import Header from '@/components/partial/Header'
import { BsSend } from 'react-icons/bs'
import Content from '@/components/partial/Content'
import 'react-toastify/dist/ReactToastify.css'
import { showToast, generateConversationID } from '@/utils/helper'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BeatLoader from 'react-spinners/BeatLoader'
import Axios from '@/utils/axios'
import useClientMediaQuery from '@/app/Hooks/useClientMediaQuery'

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
  RadioGroup, Radio, CheckboxGroup, Checkbox
} from '@nextui-org/react'
import { Textarea } from '@nextui-org/react'
import { translations, ITranslation } from './translation'
import BotChatItem from '@/components/UI/BotChatItem'
import { useAppSelector, useAppDispatch } from './Redux/store'
import { addChatList, addInfo } from './Redux/chat/chatSlice'
import { useLanguage } from './provider/LanguageContext'
import { MdExpandMore } from "react-icons/md";

const override: CSSProperties = {
  display: 'inline-block',
  borderColor: 'red',
  textAlign: 'left',
  marginLeft: '10px',
}

interface ColorProps {
  link: string
  rgb: string
  name: string
}

export default function Bot() {
  const dispatch = useAppDispatch()

  const { isSidebarOpen } = useSidebar()
  const { language } = useLanguage()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const isMobile = useClientMediaQuery()

  const [chatLists, setChatLists] = useState<any[]>([{
    content: 'Welcome to Paint Assistence! You can choose one of the following options or ask me anything regarding home renovation or painting! I will be glad to help.🎨',
    sender: 'bot',
    response_type: 'INITIAL MESSAGE'
  }])
  const [customLanguage, setCustomlanguage] = useState<ITranslation>()
  const [message, setMessage] = useState('')
  const [currentResponseType, setCurrentResponseType] =
    useState<string>('INITIAL MESSAGE')

  const [currentSearchQuery, setCurrentSearchQuery] = useState<any>('')
  const [conversationID, setConversationID] = useState<string>('')
  const [reportContent, setReportContent] = useState<string>('')
  const [buttons, setButtons] = useState([])
  const [colours, setColours] = useState<ColorProps[]>([])
  const [pending, setPending] = useState(false)
  const [height, setHeight] = useState<string>()
  const [length, setLength] = useState<string>()
  const [width, setWidth] = useState<string>()
  const [windows, setWindows] = useState<string>()
  const [doors, setDoors] = useState<string>()
  const [ceiling, setCeiling] = useState<string>("")
  const [doorArea, setDoorArea] = useState<string>()
  const [windowArea, setWindowArea] = useState<string>()
  const [additionalArea, setAdditionalArea] = useState<string>()
  const [area, setArea] = useState<string>()
  const [washability, setWashability] = useState<string>('')
  const [coverage, setCoverage] = useState<string>('')
  const [priceRange, setPriceRange] = useState<string>('')
  const [finish, setFinish] = useState<string>('')
  const [features, setFeatures] = useState<any[]>([])
  const [moreFeatures, setMoreFeatures] = useState<boolean>(false)

  const writingStatus = useAppSelector((state) => state.chat.writing_status)
  const chat_history = useAppSelector((state) => state.chat.lists)
  const chatEndRef = useRef<HTMLDivElement | null>(null)
  const inputEle = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const id = generateConversationID()
    setConversationID(id)
    inputEle.current?.focus()
  }, [])

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
  }, [chat_history])

  const openExternalLink = (url: string) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  async function requestAPI(value: string) {
    setButtons([])
    setColours([])

    const userMsg = {
      content: value,
      sender: 'user',
    }

    dispatch(addChatList(userMsg))
    setChatLists((prev) => {
      return [...prev, userMsg]
    })

    const body = JSON.stringify({
      query: value,
      conversationID: conversationID,
      chat_history: chat_history,
      lang: language,
      previous_search_query: currentSearchQuery,
    })

    try {
      setPending(true)
      const response = await Axios.post('/invoke', body)
      if (response.status === 200) {
        setPending(false)
        setCurrentResponseType(response.data.response_type)
        setCurrentSearchQuery(response.data.current_search_query)
        setButtons(response.data.buttons)
        setColours(response.data?.colours?.reverse() ?? []);
        const msg = {
          content: response.data.response,
          sender: 'bot',
          response_type: response.data.response_type,
        }
        await dispatch(addChatList(msg))
        setChatLists((prev) => {
          return [...prev, msg]
        })
      }
    } catch (error: any) {
      showToast('error', <p>{error.message}</p>)
      setPending(false)
    }
  }

  async function sendMessage() {
    if (!writingStatus && !pending) {
      let query
      if (currentResponseType === 'CALCULATION TYPE1') {
        query = `{"type":"1","area":${area},"height":0,"length":0,"width":0,"door area":0,"window area":0,"doors number":0,"windows number":0,"additional unpaintable areas":0
          }`
      } else if (currentResponseType === 'CALCULATION TYPE2') {
        query = `{"type":"2","area":0,"height":"${height ?? 0}","length":"${length ?? 0}","width":"${width ?? 0}","door area":0,"window area":0,"doors number":${doors ?? 0},"windows number":"${windows ?? 0}","additional unpaintable areas":0,"ceiling":${ceiling === 'yes' ? true : false
          }}`
      } else if (currentResponseType === 'CALCULATION TYPE3') {
        query = `{"type":"3","area":0,"height":"${height ?? 0}","length":"${length ?? 0}","width":"${width ?? 0}","door area":"${doorArea ?? 0}","window area":"${windowArea ?? 0}","doors number":"${doors ?? 0}","windows number":"${windows ?? 0}","additional unpaintable areas":"${additionalArea ?? 0}","ceiling":${ceiling === 'yes' ? true : false
          }}`
      } else if (currentResponseType === 'ADDITIONAL INFO') {
        query = `User selection: Washability: ${washability}, Coverage: ${coverage}, Price range: ${priceRange}, Finish: ${finish}, Features: ${features.toString()}`
      } else {
        if (message === '') return
        query = message
      }

      requestAPI(query)
      setMessage('')
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  async function handleReport() {
    if (reportContent !== '') {
      const body = {
        chat_history: chatLists,
        message: reportContent,
      }

      try {
        const response = await Axios.post('/report', body)
        if (response.data.status === true) {
          showToast('success', 'Send report successfully')
        }
        setReportContent('')
      } catch (error: any) {
        showToast('error', <p>{error.message}</p>)
      }
    } else {
      return showToast('warning', <p>You should input the report message</p>)
    }
  }

  const handleRadioChange = (category: string, value: string) => {
    console.log(category, value)
    switch (category) {
      case "Washability":
        setWashability(value);
        break;
      case "Coverage":
        setCoverage(value);
        break;
      case "Price range":
        setPriceRange(value);
        break;
      default:
        break;
    }
  };


  const addCategoriesSection = (categories: any[], remainingButtons: any[]) => {
    return (
      <div className='bg-[#F1F6F6] flex flex-col gap-2 p-4 rounded-md w-full md:w-1/2'>
        {categories.map((category, index) => (
          <RadioGroup
            label={category}
            orientation="horizontal"
            key={index}
            value={(() => {
              switch (category) {
                case "Washability":
                  return washability;
                case "Coverage":
                  return coverage;
                case "Price range":
                  return priceRange;
                default:
                  return "";
              }
            })()}
            onChange={(e) => handleRadioChange(category, e.target.value)}
          >
            <Radio value="High">High</Radio>
            <Radio value="Middle">Middle</Radio>
            <Radio value="Low">Low</Radio>
            <Radio value="Not Important">Not Important</Radio>
          </RadioGroup>
        ))}
        <RadioGroup
          label="Finish"
          orientation="horizontal"
          value={finish}
          onChange={(e) => setFinish(e.target.value)}
        >
          {
            remainingButtons.map((value, index) => {
              if (index < 4) {
                return (
                  <Radio key={index} value={value}>{value}</Radio>
                )
              }
            })
          }
        </RadioGroup>
        <div>
          <CheckboxGroup
            label="Select cities"
            orientation="horizontal"
            color="primary"
            value={features}
            onValueChange={setFeatures}
          >
            {
              remainingButtons.map((value, index,) => {
                if (index > 3) {
                  return <Checkbox key={index} className={!moreFeatures && index > 8 ? 'hidden' : 'inline-flex'} value={value}>{value}</Checkbox>
                }
              })
            }
            {
              !moreFeatures && <Button isIconOnly color="primary" size="sm" aria-label="More" onClick={() => setMoreFeatures(!moreFeatures)}><MdExpandMore /></Button>
            }
          </CheckboxGroup>
        </div>
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
                requestAPI(i.toString())
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
              value={area}
              onValueChange={setArea}
            />
          </div>
        )
      } else if (first === 'calc2' || first === 'calc3') {
        return <CateEle type={first} />
      }
    } else if (first === 'normal') {
      return (
        <div className='chat-buttons flex flex-wrap gap-2'>
          {remainingButtons.map((msg, index) => (
            <Button
              className='bg-[#F1F6F6]'
              key={index}
              onClick={async () => {
                if (msg === 'Colour Chart') {
                  openExternalLink(
                    'https://www.jub.si/barvni-odtenki-in-navdihi/barvna-karta-jub-favourite-feelings/?category=Joy',
                  )
                  const addon = `🎨Once you've found the color that speaks to you, let's dive into finding the perfect paint to match!\n\nTo get started, could you share a bit more about the room you're painting? And if you have any preferences, such as:\n- Budget\n- Washability\n- Health impact (like low VOCs or allergies)\n- Special features (like mold protection, stain resistance, thermal insulation, etc.)\n\nI'm here to help you find exactly what you're looking for! Let's make this project a breeze!🏠✨`
                  const msg = {
                    content: addon,
                    sender: 'bot',
                  }
                  await dispatch(addInfo(addon))
                  setChatLists((prev) => {
                    return [...prev, msg]
                  })
                } else if (msg == "JUPOL TREND Catalogue") {
                  openExternalLink("https://www.jub.si/izdelki/jupol-trend/");
                } else if (msg == "JUPOL JUNIOR Catalogue") {
                  openExternalLink("https://www.jub.si/izdelki/jupol-junior/");
                } else if (msg == "Designer Colours") {
                  openExternalLink("https://siqbots.com/designer-colours/");
                } else if (msg == "DECOR Range") {
                  openExternalLink("https://www.jub.eu/system-solutions-diy/dekorativne-resitve-en/");
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
          className={`justify-between px-8 relative py-6 transition-all duration-900 gap-10 ease-in-out ${isSidebarOpen ? 'w-[70%]' : 'w-[100%]'
            }`}
        >
          <Header custom={customLanguage} />
          {chatLists.length > 1 ? (
            <div
              ref={chatEndRef}
              className='container chatbox h-[calc(100vh-185px)] my-4 pb-5 pt-12 px-3 overflow-y-auto scrollbar-x-hide flex flex-col justify-between'
            >
              <div>
                {chatLists.map((value, index) => {
                  if (value.sender === 'bot') {
                    return (
                      <div key={index} className='flex m-2'>
                        <BotChatItem message={value.content} />
                      </div>
                    )
                  } else if (value.sender === 'user') {
                    return (
                      <div key={index} className='flex justify-end m-1'>
                        <div className='max-w-full sm:max-w-[70%] py-2 px-4 bg-[#e56634a8] text-white rounded-xl'>
                          <p>{value.content}</p>
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
              <div className='w-full flex flex-col gap-2'>
                <div className='w-full flex justify-center'>
                  <div className={`color_box w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-${colours.length} lg:w-[60%] gap-2`}>
                    {
                      colours?.length > 0 && colours.map((value, index) => {
                        if (value.rgb !== null) {
                          return (
                            <div className={`cursor-pointer px-1 h-20 flex justify-center items-center rounded-md`} onClick={() => {
                              openExternalLink(value.link)
                            }} style={{ backgroundColor: `rgb${value.rgb}` }} key={index}>
                              <div className='text-center text-sm'>
                                <p>{value.name}</p>
                              </div>
                            </div>
                          )
                        } else {
                          return (<div className={`cursor-pointer px-1 h-20 flex justify-center items-center rounded-md swatch_bg`} key={index} onClick={() => {
                            openExternalLink('https://www.jub.eu/system-solutions-diy/dekorativne-resitve-en/')
                          }}></div>)
                        }
                      })
                    }
                  </div>
                </div>
                <div
                  className='button_container w-full flex flex-wrap justify-center gap-2'
                >
                  {renderButtons()}
                </div>
              </div>
            </div>
          ) : (
            <Content requestAPI={requestAPI} />
          )}

          <div className='flex justify-center w-full items-center px-6 gap-2'>
            <div className='flex w-full gap-2 justify-center'>
              <Button
                radius='full'
                className='border py-4 px-3 sm:py-7 sm:px-5'
                onPress={onOpen}
              >
                {customLanguage?.report}
              </Button>
              <div className='w-[80%] text-sm relative'>
                <input
                  disabled={writingStatus ? true : false}
                  type='text'
                  ref={inputEle}
                  placeholder={customLanguage?.placeholder}
                  className='py-3 pl-2 pr-14 sm:py-5 sm:px-4 sm:pr-32 rounded-full w-full shadow-custom-inset focus-visible:outline-none'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className='absolute  right-2 bottom-[5px] sm:bottom-[5.5px]'>
                  {!isMobile ? <Button
                    radius='full'
                    className='text-white text-md send_btn_border sm:p-6 bg-gradient-to-tr from-[#FF8C42] to-[#FF6136]'
                    endContent={<BsSend className='text-white' />}
                    onClick={() => sendMessage()}
                  >
                    <span>{customLanguage?.sendButton}</span>
                  </Button> : <Button
                    radius='full'
                    className='text-white text-md send_btn_border sm:p-5 bg-gradient-to-tr from-[#FF8C42] to-[#FF6136]'
                    onClick={() => sendMessage()}
                    size='sm'
                    isIconOnly
                  >
                    <BsSend className='text-white' />
                  </Button>}
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
                  <Button
                    color='primary'
                    onPress={onClose}
                    onClick={handleReport}
                  >
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
