import ListeningTo from '@/components/ListeningTo'
import React from 'react'

const page = () => {
  return (
    <main className='w-dvw px-[5%] h-full flex flex-col lg:flex-row pt-[16dvh] lg:pt-[18dvh] lg:justify-center lg:items-center lg:gap-32'>
        {/* the main container -- row for desktop, col for mobile */}

        <section className='about-me-copy h-full hidden lg:flex flex-col w-1/2'>
            <h1 className='font-antique !text-[5.5rem]'>
                About Me
            </h1>

            <hr className='w-[75px] border-2 m-0 block mt-4 mb-8' />


            <p className='text-[1.4rem]'>
                Hello! I&apos;m Paris, a recent Northwestern graduate born in New Jersey.
            </p>

            <p className='text-[1.4rem]'>
                My background is in technical product management and marketing, which  has given me an entrepreneurial spirit, a strong statistical foundation, and a keen eye for storytelling. All in all, I am a problem solver who uses both creative and technical skills to build innovative business solutions. I work best in teams, bringing leadership skills to build a project with others.
            </p>

            <p className='text-[1.4rem]'>
                Outside of work, I am a co-founder of a non-profit theatre company, a huge Mets fan, and an amateur robotics enthusiast. I spend my free time playing guitar and watching Vanderpump Rules.
            </p>

            <hr className='w-[75px] border-2 m-0 block mt-4 mb-8' />


            {/* SPOTIFY COMONENT HERE */}
            <ListeningTo />

        </section>

        <section className='hidden images lg:flex w-full h-[15vh] justify-between md:h-[23vh] md:justify-center md:gap-8 lg:flex-col lg:h-[90%] lg:w-[24dvw] lg:gap-5 lg:justify-between'>
                <img className='h-full object-fit lg:w-full shadow-lg rounded-lg' src="images/paris-headshot.png" alt="Paris Bozzuti Headshot" />

                <img className='h-full object-fit lg:w-full shadow-lg rounded-lg' src="images/bozzuti-in-action.png" alt="Paris Bozzuti working hard with her team" />
        </section>

        <div className='flex flex-col gap-6 w-full lg:hidden'>

            <p className='text-[1.1rem] md:text-[1.9rem] text-center !mb-0'>
                    Hello! I&apos;m Paris, a recent Northwestern graduate born in New Jersey.
            </p>

            <section className='images flex w-full h-[15dvh] justify-between md:h-[23dvh] md:justify-center md:gap-8 lg:flex-col lg:h-[90%] lg:w-[24dvw] lg:gap-5 lg:justify-between'>
                <img className='h-full object-fit lg:w-full shadow-lg rounded-lg' src="images/Paris-headshot-2.png" alt="Paris Bozzuti Headshot" />

                <img className='h-full object-fit lg:w-full shadow-lg rounded-lg' src="images/bozzuti-in-action.png" alt="Paris Bozzuti working hard with her team" />
            </section>

            <p className='text-[1.1rem] md:text-[1.9rem] !leading-[1.4]'>
                    My background is in technical product management and marketing, which  has given me an entrepreneurial spirit, a strong statistical foundation, and a keen eye for storytelling. All in all, I am a problem solver who uses both creative and technical skills to build innovative business solutions. I work best in teams, bringing leadership skills to build a project with others.
            </p>

            <ListeningTo />

            <p className='text-[1.1rem] md:text-[1.9rem] !leading-[1.4]'>
                Outside of work, I am a co-founder of a non-profit theater company, a huge Mets fan, and an amateur robotics enthusiast. I spend my free time playing guitar and watching Vanderpump Rules.
            </p>

        </div>

        

    </main>
  )
}

export default page
