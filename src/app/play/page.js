import React from 'react'
import ProjectCard from '@/components/ProjectCard'
import playProjects from '@/data/play.json'

const page = () => {
  return (
    <main className='w-dvw px-[5%] h-full flex flex-col pt-[16dvh] lg:pt-[18dvh]'>

        <h1 className='font-antique !text-[1.8rem] md:!text-[2.0rem] lg:!text-[2.0rem] text-center lg:text-left mb-[5%] lg:mb-0'>
            Music & Other Creative Projects
        </h1>

        <hr className='hidden lg:block w-[75px] border-1 m-0 mt-4 mb-8' />

        {/* artistic projects from src/data/play.json, same cards as the Work page */}
        <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full mb-10'>
            {
                Object.entries(playProjects).map(([id, piece]) => (
                    <ProjectCard project={piece} projId={id} href={piece.link || null} fullWidth square key={id} />
                ))
            }
        </section>

    </main>
  )
}

export default page
