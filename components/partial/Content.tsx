import { MdOutlineMarkChatRead } from 'react-icons/md'
import Card from '@/components/UI/Card'
export default function Content() {
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
    <div className='container max-w-[90%] h-[calc(100vh-153px)] lg:max-w-[70] md:max-w-[60%] gap-16 flex flex-col justify-center mx-auto'>
      <div>
        <div className='flex flex-col gap-4 text-center'>
          <h4 className='text-[20px] font-[600] leading-[30px]'>Welcome To</h4>
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
              <Card icon={value.element} text={value.text} key={index}></Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
