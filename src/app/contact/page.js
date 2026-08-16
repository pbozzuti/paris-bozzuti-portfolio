import React from 'react'

const page = () => {

    const connect = [
        {
            title : "Connect with me!",
            url : "https://www.linkedin.com/in/paris-bozzuti/",
            icon : "/vectors/linkedin.svg"
        },
        {
            title : "Email",
            url : "mailto:pbozzuti@gmail.com",
            icon : "/vectors/email.svg"

        },
        {
            title : "Download Resume",
            url : "/documents/paris_bozzuti.pdf",
            icon : "/vectors/download.svg"

        },
        {
            title : "GitHub",
            url : "https://github.com/pbozzuti",
            icon : "/vectors/github.svg"

        }
    ]

  return (
    <main className='flex flex-col w-full px-[5%] pt-[16dvh] lg:pt-[18dvh] overflow-none mb-5'>

        <h1 className='hidden lg:block !text-[5.5rem] font-antique mb-4'>
            Contact
        </h1>

        <hr className='hidden lg:block w-[75px] border-2 m-0 mt-4 mb-8' />

        <div className='socials-links flex flex-col h-[45dvh] justify-between mb-[28dvh] lg:mb-0'>

            {
                connect.map((p, i) => {

                    if (p.title !== "Download Resume") {
                        return (
                            <a href={p.url} target="_blank" className='flex gap-8 items-center lg:w-[50%]' key={i}>
                                <img className='h-[5dvh]' src={p.icon} />
                                <p className='text-[1.5rem] lg:text-[2rem] !p-0 !m-0'>{p.title}</p>
                            </a>
                        )
                    } else {
                        return (
                            <a href={p.url} download className='flex gap-8 items-center lg:w-[50%]' key={i}>
                                <img className='h-[5dvh]' src={p.icon} />
                                <p className='text-[1.5rem] lg:text-[2rem] !p-0 !m-0'>{p.title}</p>
                            </a>
                        )
                    }
                })
            }

        </div>
      
    </main>
  )



}

export default page
