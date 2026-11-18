"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { NOTCH, BORDER, notchPath } from './WorkCard'

// same layout as WorkCard: title, framed image, dotted line, small gray caption
// fullWidth: fill the parent (used in the "View all" grid) instead of the fixed carousel width
const ProjectCard = ({project, projId, fullWidth = false}) => {
    const router = useRouter();

    function navToProj() {
        router.push(`/work/${projId}`);
    }

    const noImage = project.thumbnail === "/vectors/no-image.svg";

  return (
    <div
        className={`relative ${fullWidth ? 'w-full' : 'w-[35dvw] md:w-[23dvw] my-4'} h-[200px] lg:h-[30vh] lg:max-h-[230px] bg-gray-300 cursor-pointer hover:scale-[1.03] transition-transform duration-200 ease-in`}
        style={{clipPath: notchPath(NOTCH)}}
        onClick={navToProj}
    >
        <div
            className='absolute overflow-hidden flex flex-col bg-white'
            style={{inset: `${BORDER}px`, clipPath: notchPath(NOTCH - BORDER)}}
        >

            <div className='flex flex-col items-center justify-center w-full px-[6%] pt-[6%] pb-[4%]'>
                {/* always reserve 2 lines so every card's image frame is the same size */}
                <p className='!text-[0.8rem] md:!text-[0.9rem] lg:!text-[1.0rem] text-center !mb-0 leading-tight min-h-[2.5em] flex items-center justify-center'>
                    {project.title}
                </p>
            </div>

            {/* photo fills the whole frame, cropped to fit */}
            <div className='flex items-center justify-center w-full flex-1 min-h-0 bg-gray-50 overflow-hidden'>
                <img
                    src={project.thumbnail}
                    alt={`${project.title} Thumbnail`}
                    className={noImage ? 'w-[20%]' : 'w-full h-full object-cover'}
                />
            </div>

            <div className='flex items-center w-full px-2 pt-[3%]'>
                <span className='flex-1 border-t-2 border-dotted border-gray-300' />
            </div>

            <div className='flex items-center justify-center w-full px-[6%] pt-[3%] pb-[5%]'>
                {/* year from projects.json; the non-breaking space keeps the line's height when it's blank */}
                <p className='!text-[0.65rem] md:!text-[0.8rem] text-gray-500 !mb-0 text-center truncate'>
                    {project.year || ' '}
                </p>
            </div>

        </div>
    </div>
  )
}

export default ProjectCard
