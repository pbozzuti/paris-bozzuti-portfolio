
import React from 'react'
import projects from "@/data/projects.json"
import { notFound } from 'next/navigation';
import IndividualSkill from '@/components/IndividualSkill';
import ScaledEmbed from '@/components/ScaledEmbed';
import ResponsiveEmbed from '@/components/ResponsiveEmbed';

const EMBED_NATIVE_SIZE = {
    "/images/knight-lab-viz1.html": { width: 850, height: 750 },
    "/images/knight-lab-viz2.html": { width: 1100, height: 750 },
};

function renderProjectMedia(im, i, title) {
    if (im.endsWith('.html')) {
        const nativeSize = EMBED_NATIVE_SIZE[im];
        const embedTitle = `${title} Interactive Visualization ${i + 1}`;
        return nativeSize
            ? <ScaledEmbed key={i} src={im} title={embedTitle} nativeWidth={nativeSize.width} nativeHeight={nativeSize.height} />
            : <ResponsiveEmbed key={i} src={im} title={embedTitle} />;
    }
    return <img key={i} className='object-contain' src={im} alt={`${title} Image`} />;
}

export async function generateStaticParams() {
    return Object.keys(projects).map((id) => ({id}));
}

export default async function page({params}) {

    // const [project, setProject] = useState(projects["diamond_bid_creator"]);
    const {id} = await params;
    const project = projects[id]
    

    if (!project) notFound();

  return (
    <main className='flex flex-col items-center w-dvw px-[5%] h-full pt-[16dvh] lg:pt-[18dvh] mb-[5%]'>

        <section className='desktop-view hidden lg:flex justify-between w-full'>
            <div className='flex flex-col gap-5 w-[55%]'>
                <h1 className='font-antique !text-[5.5rem]'>
                    {project.title}
                </h1>
                <hr className='w-[75px] border-2 m-0 block mt-4 mb-8' />

                {
                    project.description.map((d, i) => {
                            return d.startsWith("http") ?
                            (
                                <a href={d} target={"_blank"} className="text-gray-700 text-2xl underline" key={i}>View Project.</a>
                            )
                            :
                            (
                                <p className='text-[1.4rem]' key={i}>
                                    {d}
                                </p>
                            )
                            
                    })
                }

                <hr className='w-[75px] border-2 m-0 block mt-4 mb-8' />

                <div className='flex gap-3 flex-wrap'>
                    {
                        project.skills.map((s, i) => (
                            <IndividualSkill skill={s} key={i} />
                        ))
                    }
                </div>




            </div>

            {/* <div className='images flex flex-wrap gap-2 gap-y-2 w-[40%] border overflow-hidden'>
                {
                    project.project_images.map((im, i) => (
                        <img className='object-scale-down' src={im} alt={`${project.title} Image`} key={i} />
                    ))
                }
            </div> */}

            {/* for now -- hard code 3 versions for the 3 possible number of images  */}

            {project.project_images.some(im => im.endsWith('.html')) ?

                <div className='flex flex-col gap-6 justify-center w-[45%] min-w-0'>
                    {
                        project.project_images.map((im, i) => renderProjectMedia(im, i, project.title))
                    }
                </div>

                :

            project.project_images.length === 1 ?

                <div className='flex justify-center items-center w-[35%] overflow-hidden'>
                    <img className='object-contain' src={project.project_images[0]} alt={`${project.title} Image`} />
                </div>

                :

                (project.project_images.length === 2) ?
                    <div className='flex flex-col justify-center gap-2 w-[35%] overflow-hidden'>
                        {
                            project.project_images.map((im, i) => (
                                <img className='object-contain' src={im} alt={`${project.title} Image`} key={i} />
                            ))
                        }
                    </div>

                :
                // else 3
                <div className='flex flex-col gap-2 justify-center items-center w-[40%] overflow-hidden'>
                    {/* first two */}
                    <div className='flex gap-2 justify-center items-center w-full overflow-hidden'>
                        <img className='object-contain max-w-[49%]' src={project.project_images[0]} alt={`${project.title} Image`} />

                        <img className='object-contain max-w-[49%]' src={project.project_images[1]} alt={`${project.title} Image`} />
                    </div>

                    {/* last  */}
                    <img className='object-contain' src={project.project_images[2]} alt={`${project.title} Image`} />
                    
                </div>
            
            }

        </section>

        {/* mobile and tablet version ig  */}

        <section className='flex flex-col items-center gap-8 lg:hidden w-full min-w-0'>

            <h1 className='font-antique text-center !text-[2.5rem] md:!text-[3rem]'>
                {project.title}
            </h1>

            {/* again, for now, just hard coding num pics  */}
            {project.project_images.some(im => im.endsWith('.html')) ?

                <div className='flex flex-col gap-4 w-full min-w-0'>
                    {
                        project.project_images.map((im, i) => renderProjectMedia(im, i, project.title))
                    }
                </div>

                :

            project.project_images.length <= 1 ?

                <div className='flex justify-center items-center w-full max-h-[30vh] md:max-h-[40vh] overflow-hidden'>
                    {
                        project.project_images.map((im, i) => (
                            <img className='object-contain' src={im} alt={`${project.title} Image`} key={i} />
                        ))
                    }
                </div>

                :

                <div className='flex flex-row justify-start gap-2 w-full max-h-[30vh] md:max-h-[40vh] overflow-y-hidden overflow-x-scroll'>
                    {
                        project.project_images.map((im, i) => (
                            <img className='max-h-[30vh] md:max-h-[40vh] w-auto flex-none' src={im} alt={`${project.title} Image`} key={i} />
                        ))
                    }
                </div>

                // (project.project_images.length >= 2) ?
                //     <div className='flex flex-row gap-2 w-full max-h-[30vh] md:max-h-[40vh] overflow-y-hidden overflow-x-scroll'>
                //         {
                //             project.project_images.map((im, i) => (
                //                 <img className='object-contain' src={im} alt={`${project.title} Image`} key={i} />
                //             ))
                //         }
                //     </div>

                // :
                // else 3
                // <div className='flex flex-col gap-2 justify-center items-center w-[40%] overflow-hidden'>
                //     {/* first two */}
                //     <div className='flex gap-2 justify-center items-center w-full overflow-hidden'>
                //         <img className='object-contain max-w-[49%]' src={project.project_images[0]} alt={`${project.title} Image`} />

                //         <img className='object-contain max-w-[49%]' src={project.project_images[1]} alt={`${project.title} Image`} />
                //     </div>

                //     {/* last  */}
                //     <img className='object-contain' src={project.project_images[2]} alt={`${project.title} Image`} />
                    
                // </div>
            
            }

            {
                project.description[0].startsWith("http") ?

                <div className='flex flex-col items-center w-full gap-4 md:gap-8 mb-2'>
                    <a href={project.description[0]} target="_blank" className='text-gray-700 text-2xl underline'>View Project.</a>
                    {/* here we assume no project desc will ever be JUST a link  */}
                    <p className='text-[1.1rem] md:text-[1.9rem] !leading-[1.4]'>
                        {project.description[1]}
                    </p>

                    <div className='flex gap-3 flex-wrap w-full justify-center mb-2'>
                        {project.skills.map((sk, i) => (
                            <IndividualSkill skill={sk} key={i} />
                        ))}
                    </div>

                    {/* any leftover desc  */}
                    {project.description.slice(2).map((d, i) => (
                        <p className='text-[1.1rem] md:text-[1.9rem] !leading-[1.4]' key={i}>
                            {d}
                        </p>
                    ))}
                </div>
                :
                <div className='flex flex-col items-center w-full gap-4 md:gap-8 mb-2'>

                    <p className='text-[1.1rem] md:text-[1.9rem] !leading-[1.4]'>
                        {project.description[0]}
                    </p>

                    <div className='flex gap-3 flex-wrap w-full justify-center mb-2'>
                        {project.skills.map((sk, i) => (
                            <IndividualSkill skill={sk} key={i} />
                        ))}
                    </div>

                    {/* any leftover desc  */}
                    {project.description.slice(1).map((d, i) => (
                        <p className='text-[1.1rem] md:text-[1.9rem] !leading-[1.4]' key={i}>
                            {d}
                        </p>
                    ))}

                </div>
            }

        </section>



    </main>
  )
}
