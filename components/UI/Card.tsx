interface cardProps {
  icon: string
  title: string
  order: number
  text: string
  requestAPI: (value: string) => void
}

export default function Card(props: cardProps) {
  const { icon, title, order, text, requestAPI } = props

  function handleClick() {
    let body
    if (order === 0) {
      body = 'Help me find the right paint for my project'
    } else if (order === 1) {
      body =
        'Find specific details of a product (such as coverage, colours, pricing, etc.)'
    } else if (order === 2) {
      body = 'Guide me through the steps of painting with Jupol Gold'
    } else {
      body = 'Help me choose the right colour for my room'
    }

    requestAPI(body)
  }
  return (
    <div
      className='bg-[#F1F6F6] w-[100%] lg:w-[47%] gap-3 hover:cursor-pointer  rounded-[20px] flex items-center m-2 border-[1px] p-2 lg:px-[20px] lg:py-[30px]'
      onClick={handleClick}
    >
      <div className='bg-[#4A6F6E26] rounded-[5px] p-[7.5px]'>{icon}</div>
      <div>
        <div>
          <span className='font-bold'>{title}</span>
        </div>
        <p className='font-[400] leading-[24px] text-medium sm:text-lg'>
          {text}
        </p>
      </div>
    </div>
  )
}
