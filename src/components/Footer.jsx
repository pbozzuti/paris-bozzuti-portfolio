import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    // <footer className='absolute bottom-[5%] flex justify-between items-center px-4 py-2 w-[90%] ml-[5%] md:w-[80%] md:ml-[10%] lg:w-[40%] lg:ml-[30%] rounded-lg shadow-lg border border-gray-300 max-h-[6%]'>

    <footer className=' flex justify-between items-center px-4 py-2 mb-[5%] lg:mb-[2%] w-[90%] ml-[5%] md:w-[80%] md:ml-[10%] lg:w-[40%] lg:ml-[30%] rounded-lg shadow-lg border border-gray-300 max-h-[6%]'>




        <p className='!p-0 !m-0 '>
            &copy; <strong>Paris Bozzuti</strong>, 2026
        </p>


        <div className='flex items-center justify-end gap-[10%] overflow-none '>

            <Link href="/about" className="">
                About
            </Link>

            <Link href="/" className="">
                {/* <img className='object-fit h-full w-full' src='/vectors/house.svg' alt="Home Icon" /> */}
                Home
            </Link>

        </div>
      
    </footer>
  )
}

export default Footer
