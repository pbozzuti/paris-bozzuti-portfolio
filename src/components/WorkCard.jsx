import React from 'react'

// shared with ProjectCard so both card types have the same notched frame
export const NOTCH = 14
export const BORDER = 1.5

export const notchPath = (n) =>
    `polygon(0 0, calc(100% - ${n}px) 0, 100% ${n}px, 100% 100%, ${n}px 100%, 0 calc(100% - ${n}px))`

const WorkCard = ({work, index = 0}) => {
  return (
    <div
        className='relative w-[45%] min-h-[190px] md:w-[18%] md:min-h-[190px] md:h-[8vh] lg:h-[20vh] lg:max-h-[150px] bg-gray-300'
        style={{clipPath: notchPath(NOTCH)}}
    >
        <div
            className='absolute overflow-hidden flex flex-col bg-white'
            style={{inset: `${BORDER}px`, clipPath: notchPath(NOTCH - BORDER)}}
        >

            <div className='flex flex-col items-center justify-center w-full px-[6%] pt-[8%] pb-[5%]'>
                {/* always reserve 2 lines so every card's image frame is the same size */}
                <p className='!text-[0.8rem] md:!text-[0.8rem] lg:!text-[1.0rem] text-center !mb-0 leading-tight min-h-[2.5em] flex items-center justify-center'>
                    {work.title}
                </p>
            </div>

            <div className='relative flex flex-col items-center justify-center w-full flex-1 min-h-0 bg-gray-50 px-[10%] py-[8%]'>
                {/* corner marks framing the image */}
                <span className='absolute top-2 left-2 w-3 h-3 border-t-1 border-l-1 border-gray-200 z-10' />
                <span className='absolute bottom-2 right-2 w-3 h-3 border-b-1 border-r-1 border-gray-200 z-10' />

                <img src={work.icon} alt={work.alt} className="max-h-full max-w-[65%] object-contain" />
            </div>

            <div className='flex items-center w-full px-2 pt-[3%]'>
                <span className='flex-1 border-t-2 border-dotted border-gray-300' />
            </div>

            <div className='flex items-center justify-center w-full px-[6%] pt-[3%] pb-[6%]'>
                <p className='!text-[0.65rem] md:!text-[0.8rem] text-gray-500 !mb-0 text-center'>
                    {work.dates}
                </p>
            </div>

        </div>
    </div>
  )
}

export default WorkCard
