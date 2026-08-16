import React from 'react'

const WorkCard = ({work}) => {
  return (
    <div className='relative w-[80%] h-[10vh] md:w-[18%] md:min-h-[150px] md:h-[15vh] lg:h-[30vh] lg:max-h-[200px] overflow-hidden flex flex-col items-center px-[4%] py-[1%] border border-gray-200 bg-gray-100 rounded-lg shadow-lg'>

        <div className='flex flex-col items-center justify-center w-full max-h-[30%]'>
            <img src={work.icon} alt={work.alt} className="h-full object-contain" />
        </div>

        <div className='flex flex-col items-center justify-center w-full absolute top-[35%] max-w-[90%]'>
            <p className='!text-[0.8rem] md:!text-[1rem] lg:!text-[1.2rem] !font-bold text-center'>
                {work.title}
            </p>
        </div>

        <p className='absolute bottom-0 md:bottom-[5%] !text-[0.7rem] md:!text-[1rem]'>
            {work.dates}
        </p>

    </div>
  )
}

export default WorkCard
