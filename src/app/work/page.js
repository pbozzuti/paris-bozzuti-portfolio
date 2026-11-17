import Projects from '@/components/Projects'
import WorkExperience from '@/components/WorkExperience'
import React from 'react'

const page = () => {

    

  return (
    <main className='w-dvw px-[5%] h-full flex flex-col gap-[5%] pt-[16dvh] lg:pt-[18dvh] mb-4 md:mb-[28%] lg:mb-4'>

        {/* WORK EXPERIENCE */}

        <h1 className='font-antique !text-[2.5rem] md:!text-[3rem] lg:!text-[2.5rem] text-center lg:text-left mb-[5%] lg:mb-0'>
            Work Experience
        </h1>
        <hr className='hidden lg:block w-[75px] border-1 m-0 block mt-4 mb-8' />
        <WorkExperience />



        {/* PROJECTS  */}

        <h1 className='font-antique !text-[2.5rem] md:!text-[3rem] lg:!text-[2.5rem] text-center lg:text-left mt-[5%] lg:mt-0'>
            Projects
        </h1>
        <hr className='hidden lg:block w-[75px] border-1 m-0 block mt-4 mb-8' />
        <Projects />

      
    </main>
  )
}

export default page
