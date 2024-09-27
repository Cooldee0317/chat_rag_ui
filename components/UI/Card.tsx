interface cardProps {
  icon?: string
  title?: string
  text?: string
}

export default function Card(props: cardProps) {
  const { icon, title, text } = props
  return (
    <div className='bg-[#F1F6F6] w-[100%] lg:w-[47%] gap-3  rounded-[20px] flex items-center m-2 border-[1px] p-2 lg:px-[20px] lg:py-[30px]'>
      <div className='bg-[#4A6F6E26] rounded-[5px] p-[7.5px]'>{icon}</div>
      <div>
        <div>
          <span className='font-bold'>{title}</span>
        </div>
        <p className='font-[400] leading-[24px] text-lg'>{text}</p>
      </div>
    </div>
  )
}
