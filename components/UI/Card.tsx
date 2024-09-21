interface cardProps {
  icon?: React.ReactElement
  text?: string
}

export default function Card(props: cardProps) {
  const { icon, text } = props
  return (
    <div className='bg-[#F1F6F6] w-[100%] lg:w-[47%] gap-3  rounded-[20px] flex items-center m-2 border-[1px] px-[20px] py-[30px]'>
      <div className='bg-[#4A6F6E26] rounded-[5px] p-[7.5px]'>{icon}</div>
      <div>
        <p className='font-[400] leading-[24px] text-lg'>{text}</p>
      </div>
    </div>
  )
}
