import React from 'react'
import WorkCard from './WorkCard'

const WorkExperience = () => {

    const workExp = [
        {
            icon : "/images/publicis-sapient.png",
            alt : "Publicis Sapient Logo",
            title : "Product Management Intern",
            dates : "6.2025 - 8.2025",
        },
        {
            icon : "/images/knightlab.png",
            alt : "Knight Lab Studio Logo",
            title : "Researcher",
            dates : "1.2026 - 3.2026",
        },
        {
            icon : "/images/novartis.png",
            alt : "Novartis Logo",
            title : "Content Lab Intern",
            dates : "6.2024 - 8.2024",
        },
        {
            icon : "/images/atc_logo.png",
            alt : "ATC Logo",
            title : "Co-Founder, Producer",
            dates : "4.2020 - Present",
        },
        {
            icon : "/images/northwestern.png",
            alt : "Northwestern Medill Logo",
            title : "Integrated Marketing Assistant",
            dates : "9.2022 - 3.2026",
        },
    ]

  return (
    <section className='flex flex-wrap justify-center gap-y-5 gap-[5%] md:gap-[2%] mb-[5%]'>

        {workExp.map((work, i) => (
            <WorkCard work={work} key={i} />
        ))}
      
    </section>
  )
}

export default WorkExperience
