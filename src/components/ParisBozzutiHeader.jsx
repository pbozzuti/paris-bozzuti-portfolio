import React from 'react'

const ParisBozzutiHeader = () => {
  return (
    <header className='paris-bozzuti-header flex flex-col items-center w-full gap-2 md:gap-6 pt-[12dvh] lg:pt-0 lg:gap-32 lg:flex-row lg:justify-center lg:mb-5 lg:scale-[0.8]'>

        <section className='hidden lg:flex flex-col w-1/2'>

            {/* THE WHOLE DIV BELOW IS THE WEIRDEST MOST FUCKED UP LAYOUT I'VE EVER HAD TO DO. THIS IS NEITHER PROFESSIONAL NOR IDEAL */}
            <div className='hi-i-am flex items-center justify-start gap-4 mb-0 '>
                <div className='flex items-center p-0 h-full '>
                  <hr className='w-[75px] border-2 m-0 block' />

                </div>
                <p className=' mt-5 leading-none text-[1.7rem]'>Hi, I am</p> 

            </div>

            <h1 className='paris-bozzuti !text-[5.5rem] font-antique mb-4'>
              Paris Bozzuti
            </h1>


            <p className='text-[1.7rem]'>
              recent Northwestern graduate in Data Science and Radio/Television/Film.
            </p>

            <hr className='w-[75px] border-2 m-0 block mt-4 mb-8' />

            <p className='text-[1.7rem]  '>
                With a passion for analytics and data as well as creative design, I work at the intersection of digital technology and media to generate data-backed creative solutions to business problems, whether in product development, marketing or analytics.
            </p>

        </section>

        <p className='block lg:hidden text-center text-[1.1rem] md:text-[1.9rem]'>
            Recent Northwestern graduate in Data Science and Radio/Television/Film.
        </p>

        <div className='paris-bozutti-headshot w-[80dvw] h-[80dvw] md:w-auto md:h-auto rounded-xl lg:rounded-none lg:w-[24dvw] lg:h-auto lg:max-w-1/3'
            style={{
                boxShadow: "0px 10px 10px rgb(0,0,0,0.3)"
            }}
        
        >

            <img src="/images/paris-personality.png" className="hidden lg:block object-contain"  alt="Paris Bozzuti personality picture"/>

            <img src="/images/paris-personality-mobile.png" className='block lg:hidden object-fill rounded-xl' alt="Paris Bozzuti personality picture" />

        </div>

        <p className='block lg:hidden text-center text-[1.1rem] md:text-[1.9rem] mt-8'>
            With a passion for analytics and data as well as creative design, I work at the intersection of digital technology and media to generate data-backed creative solutions to business problems, whether in product development, marketing or analytics.
        </p>
      
    </header>
  )
}

export default ParisBozzutiHeader
