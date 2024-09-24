import { MdOutlineMarkChatRead } from 'react-icons/md'
import Card from '@/components/UI/Card'
export default function Content() {
  const serviceSample = [
    {
      element: '🎨',
      title: 'Find the Perfect Paint',
      text: 'Tailored recommendations for your project.',
    },
    {
      element: '🔍',
      title: 'Product Details',
      text: 'Jupol Junior specs at a glance.',
    },
    {
      element: '🖌️',
      title: 'Painting Guide',
      text: ' Easy steps for wall preparation and painting.',
    },
    {
      element: '📐',
      title: 'Paint Calculator',
      text: 'Figure out how much Jupol Gold you’ll need.',
    },
  ]
  return (
    <div className='container max-w-[90%] h-[calc(100vh-153px)] lg:max-w-[70] md:max-w-[60%] gap-16 flex flex-col justify-center mx-auto'>
      <div>
        <div className='flex flex-col gap-4 text-center'>
          <h2 className='text-[40px] font-[600] leading-[30px] text-[#FF6136]'>
            JUB P<span className='text-black'>AI</span>NTER
          </h2>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-wrap'>
          {serviceSample.map((value, index) => {
            return (
              <Card
                icon={value.element}
                title={value.title}
                text={value.text}
                key={index}
              ></Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
