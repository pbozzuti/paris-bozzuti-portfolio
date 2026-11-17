

import Link from 'next/link';

import React from 'react'

const IndividualSkill = ({skill}) => {

  return (
    <Link className='font-gambarino px-2 py-1 lg:px-4 lg:py-2 bg-gray-100 border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-100 hover:scale-[1.05] transition-all duration-100 ease-linear mx-2 rounded-lg cursor-pointer no-select text-[1rem] md:text-[1.5rem] lg:text-[1rem]' href={`/projects_by_skill?skill=${encodeURIComponent(skill)}`}>
        {skill}
    </Link>
  )
}

export default IndividualSkill
