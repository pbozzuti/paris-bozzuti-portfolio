"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { motion, useScroll, useTransform} from 'framer-motion'
import Hamburger from 'hamburger-react'
import projects from "@/data/projects.json"

const Navbar = () => {



    const pathname = usePathname();

    const pages = [
        {
            path : "/",
            title : "Paris Bozzuti"
        },
        {
            path : '/about',
            title : "About"
        },
        {
            path : '/work',
            title : "Work"
        },
        {
            path : '/contact',
            title : "Contact"
        },
        {
            path : '/projects_by_skill',
            title : "Skills"
        }
    ];

    // console.log(pathname);
    // projects[pathname.slice(6)].title
    const pageName = (pathname.startsWith("/work/")) ? "Project" : pages.filter((p) => p.path === pathname).map((pg) => pg.title);
    // track our y scroll
    const {scrollY } = useScroll();

    const navHeight = useTransform(scrollY, [0, 200], ['115px', '60px']);
    const navWidth = useTransform(scrollY, [0, 200], ['100%', '40%']);
    const navBorderRadius = useTransform(scrollY, [0, 200], ['0px', '15px']);
    const navBorderColor = useTransform(scrollY, [0, 200], ["#374151", "#9CA3AF"]);
    const navPosition = useTransform(scrollY, [0, 200], ['static', 'fixed']);
    const navTop = useTransform(scrollY, [0, 200], ['0px', '25px'])
    const navBoxShadow = useTransform(
        scrollY,
        [0, 200],
        ['0px 0px 0px rgba(0,0,0,0)', '0px 4px 10px rgba(0,0,0,0.2)']
    );
    const navPadding = useTransform(scrollY, [0, 200], ["40px", "24px"]);


    // for the home icon
    const houseDim = useTransform(scrollY, [0, 200], ['50px', '40px']);
    const houseTop = useTransform(scrollY, [0, 200], ['32px', '8px']);
    const houseLeft = useTransform(scrollY, [0, 200], ['50px', '15px']);


    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  return (
    <>
        <motion.nav className='hidden lg:flex justify-between items-center p-10 bg-app_white'
            style={{
                height : navHeight,
                width : navWidth,
                borderRadius: navBorderRadius,
                position : navPosition,
                padding : navPadding,
                top : navTop,
                left : '50%',
                transform : 'translateX(-50%)',
                boxShadow : navBoxShadow,
                backgroundColor : '#ffffff',
                border : `1px solid #ddd`,
                zIndex : 50
            }}
            transition={{type : "spring", stiffness: 200, damping : 30}}
        
        >

            <motion.div className='home-icon absolute'
                style={{
                    width : houseDim,
                    height : houseDim,
                    top : houseTop,
                    left : houseLeft
                }}
                transition={{type : "spring", stiffness: 200, damping : 30}}


            >
                <Link href="/" className='home-link w-full h-full object-scale-down'>
                    <img src="/vectors/house_path.svg" alt="Home Link" className='' />
                </Link>
            </motion.div>
            

            <div className='site-links flex justify-center gap-24 w-full'>

                {
                    pages.slice(1, 4).map((p, i) => (
                        <Link href={p.path} className='font-gambarino text-xl m-0 transition-all duration-300 ease-in-out hover:scale-[1.05]' key={i}
                            style={{
                                fontWeight : pathname === p.path ? "bold" : "normal"
                            }}
                        >
                            {p.title}
                        </Link>
                    ))
                }

                
            </div>
        
        </motion.nav>

        <motion.nav className='mobile-and-ipad-navbar flex flex-col items-center justify-start lg:hidden fixed top-0 left-0 w-full overflow-hidden bg-app_white bg-white border-b border-gray-400 z-10 shadow-md'
            layout
            initial={{height : "12dvh"}}
            animate={{height : mobileMenuOpen ? "30dvh" : "12dvh"}}
            transition={{duration:0.5, ease: "easeOut"}}
        >
            {/* above is what holds the row (menu + Paris Bozz) AND the child links */}

            <div className='flex w-full flex-0 items-center relative min-h-[12dvh]'>
                {/* above holds the actual menu icon and her name  */}
                
                <div className='absolute pt-[1%] top-0 left-0 h-full flex items-center justify-center w-[18%] md:w-[20%]'>
                    <Hamburger direction='right' color='#171717' duration={0.4} ease="easeIn" size={35} toggled={mobileMenuOpen} toggle={setMobileMenuOpen} />
                </div>

                <Link href={pageName === "Project" ? "/work" : "/"} className=' w-full p-0 m-0'>
                    <h1 className={'!text-[2.3rem] md:!text-[3.2rem] font-antique text-center'}>{pageName}</h1>
                </Link>

            </div>

            <div className='flex flex-col justify-between px-4 h-full w-full pb-4'>
                {/* the actual list of nav links */}
                {/* these should be their own component cause we use em above  */}


                    {pages.map((p, i) => {
                        if (p.path !== pathname && p.title !== "Skills") {
                            return (<Link href={p.path} className='font-gambarino !text-lg md:!text-3xl m-0 p-0 text-app_black text-center' key={i} onClick={() => setMobileMenuOpen(false)}
                                // style={{
                                //     fontWeight : pathname === p.path ? "bold" : "normal"
                                // }}
                            >
                                {p.title}
                            </Link>);
                        }
                    })}

            </div>

        </motion.nav>

    </>
  )
}

export default Navbar
