"use client"
import React, { useState } from 'react'
import ProjectCard from './ProjectCard'
import projects from "@/data/projects.json"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { BORDER, notchPath } from './WorkCard'

// smaller notch than the cards so it suits the button's size
const BUTTON_NOTCH = 8

const Projects = () => {

    // false = carousel, true = grid of every project
    const [showAll, setShowAll] = useState(false);

    return (
        <section className='w-[90%] ml-[5%] flex flex-col items-center'>

            {showAll ? (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full py-10'>
                    {
                        Object.entries(projects).map(([projId, project]) => (
                            <ProjectCard project={project} projId={projId} fullWidth key={projId} />
                        ))
                    }
                </div>
            ) : (
                <Carousel
                    opts={{
                        loop : true,
                        // align: "start",
                    }}
                    className="p-10 h-full w-full overflow-visible"
                >
                    <CarouselContent className="overflow-visible">
                        {
                            Object.entries(projects).map((proj, i) => (
                                <CarouselItem className="flex-none h-auto" key={i}>
                                    <ProjectCard project={proj[1]} projId={proj[0]} />
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>

                    <CarouselPrevious className="ml-[10%] md:ml-0" />
                    <CarouselNext className="mr-[10%] md:mr-0" />
                </Carousel>
            )}

            {/* notched outline like the cards: gray outer shape, white inner shape inset by BORDER */}
            <button
                type='button'
                onClick={() => setShowAll(!showAll)}
                className='group bg-gray-300 cursor-pointer'
                style={{padding: `${BORDER}px`, clipPath: notchPath(BUTTON_NOTCH)}}
            >
                <span
                    className='block px-6 py-2 bg-white text-sm md:text-base group-hover:bg-gray-50 transition-colors duration-200'
                    style={{clipPath: notchPath(BUTTON_NOTCH - BORDER)}}
                >
                    {showAll ? 'Show less' : 'View all'}
                </span>
            </button>

        </section>
    )
}

export default Projects
