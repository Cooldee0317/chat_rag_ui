'use client'
import { useSidebar } from './provider/SidebarProvider'
import Sidebar from '@/components/partial/Sidebar'
import Header from '@/components/partial/Header'
import { MdOutlineMarkChatRead } from 'react-icons/md'
import { BsSend } from 'react-icons/bs'
import Card from '@/components/UI/Card'
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
import FeedBackMiniButton from '@/components/UI/FeedBackMiniButton'

export default function Home() {
  const { isSidebarOpen } = useSidebar()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const serviceSample = [
    {
      element: <MdOutlineMarkChatRead />,
      text: 'Choosing the right product for your project',
    },
    {
      element: <MdOutlineMarkChatRead />,
      text: 'Retrieving specific details of a product (such as coverage, drying time, colours, price, etc.)',
    },
    {
      element: <MdOutlineMarkChatRead />,
      text: 'Calculating the painting area and the amount of paint needed for your project',
    },
    {
      element: <MdOutlineMarkChatRead />,
      text: 'Or general home renovation and painting advice',
    },
  ]
  return (
    <div className='bg-gray-200'>
      <div className='container bg-white flex min-h-screen mx-auto'>
        <Sidebar />
        <div
          className={`flex flex-col justify-between px-8 relative py-6 transition-all duration-900 gap-10 ease-in-out ${
            isSidebarOpen ? 'w-[70%]' : 'w-[100%]'
          }`}
        >
          <Header />
          <div className='container max-w-[90%] lg:max-w-[70] md:max-w-[60%] gap-16 flex flex-col mx-auto'>
            <div>
              <div className='flex flex-col gap-4 text-center'>
                <h4 className='text-[20px] font-[600] leading-[30px]'>
                  Welcome To
                </h4>
                <h2 className='text-[40px] font-[600] leading-[30px]'>
                  Paint Assistance
                </h2>
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='text-center'>
                <h5 className='font-[400] leading-[24px] text-[16px] text-gray-600'>
                  I can help you with:
                </h5>
              </div>
              <div className='flex flex-wrap'>
                {serviceSample.map((value, index) => {
                  return (
                    <Card
                      icon={value.element}
                      text={value.text}
                      key={index}
                    ></Card>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='flex justify-around items-center px-6 gap-2'>
            <div className='w-[20%] text-right text-[14px] font-bold'>
              <Button
                radius='full'
                className='border py-7 px-5'
                onPress={onOpen}
              >
                Give Feedback
              </Button>
            </div>
            <div className='w-[80%] text-[14px] relative'>
              <input
                type='text'
                placeholder='Type Any query to search'
                className='py-5 pl-4 pr-28 rounded-full w-full shadow-custom-inset '
              />
              <div className='absolute  right-2 bottom-[5.5px]'>
                <Button
                  radius='full'
                  className='text-white text-lg send_btn_border p-6 bg-gradient-to-tr from-[#FF8C42] to-[#FF6136]'
                  endContent={<BsSend className='text-sswhite' />}
                >
                  send
                </Button>
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
                  Feedback
                </ModalHeader>
                <ModalBody>
                  <p>
                    Please report all wrong or inaccurate bot responses. Please
                    describe what the issue is and how did you expect the bot to
                    respond. Positive feedback is also appreciated!
                  </p>
                  <Textarea
                    isRequired
                    placeholder='Enter your feedback'
                    className=''
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' variant='light' onPress={onClose}>
                    Close
                  </Button>
                  <Button color='primary' onPress={onClose}>
                    Report
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  )
}
