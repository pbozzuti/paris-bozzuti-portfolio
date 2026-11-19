"use client"
import React, { useEffect, useState } from 'react'
import { ThreeDot } from 'react-loading-indicators';

const FitbitWidget = () => {

    const [data, setData] = useState(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        async function loadUp() {
            try {
                const res = await fetch("/api/fitbit-steps");
                if (!res.ok) throw new Error();
                setData(await res.json());
            } catch {
                setFailed(true);
            }
        }

        loadUp();
    }, [])

    if (failed) return null;

    const progress = data?.goal ? Math.min(data.steps / data.goal, 1) : null;

    return (
        <div className='w-full max-w-[500px] mt-4 px-6 py-4 bg-gray-100 border border-gray-200 rounded-lg shadow-lg flex items-center gap-4'>
            {/* footprints icon */}
            <svg className='h-[2.5rem] w-[2.5rem] flex-none' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />
                <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />
                <path d="M16 17h4" />
                <path d="M4 13h4" />
            </svg>

            <div className='flex flex-col gap-1 w-full'>
                <p className='!font-[600] !text-[1.0rem] !m-0'>Steps today:</p>

                {data ? (
                    <>
                        <p className='!font-[600] text-gray-500 !text-[1.0rem] !m-0'>
                            {data.steps.toLocaleString()}
                            {data.goal ? <span className='!font-[400]'> / {data.goal.toLocaleString()}</span> : null}
                        </p>

                        {progress !== null && (
                            <div className='w-full h-[6px] bg-gray-200 rounded-full overflow-hidden'>
                                <div
                                    className='h-full bg-gray-500 rounded-full transition-all duration-700 ease-out'
                                    style={{ width: `${progress * 100}%` }}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <ThreeDot color="#6B7280" size="small" text="" textColor="" />
                )}
            </div>
        </div>
    )
}

export default FitbitWidget
