import React from 'react'
import Marquee from 'react-fast-marquee'
import IndividualSkill from './IndividualSkill'
import projects from "@/data/projects.json"

function getSkills() {
    let skills = new Set();

    // since we're O(n) searching already, may as well do both at once
    for (let p in projects) {
        // console.log(p);
        for(let s of projects[p].skills) {

            skills.add(s);

        }
    }

    return skills;
}

const HomeSkills = () => {

    // const skills = [

    //     "Product Management",
    //     "Data Analysis",
    //     "Data Visualization",
    //     "Machine Learning",
    //     "Python",
    //     "React",
    //     "SQL",
    //     "R",
    //     "POPM SAFe 6",
    //     "Figma",
    //     "Content Marketing",
    //     "Algorithms",

    // ]

    const skills = Array.from(getSkills());

  return (
    <section className='home-skills-section w-full flex flex-col items-center px-[5%] mt-6 lg:mt-0 mb-12'>

        <h3 className='font-antique w-full text-center !text-[1.3rem] md:!text-[2.2rem] lg:text-left lg:!text-[1.7rem] mb-8'>Skills and Certifications</h3>

        <Marquee className="overflow-visible h-[75px] lg:py-2"
            pauseOnHover={true}
            gradient={true}
            gradientColor="#ffffff"
            gradientWidth="50px"
        >

            {
                skills.map((skill, i) => (
                    <IndividualSkill skill={skill} key={i} />
                ))
            }

        </Marquee>

      
    </section>
  )
}

export default HomeSkills
