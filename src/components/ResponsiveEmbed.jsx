import React from 'react'

const ResponsiveEmbed = ({ src, title }) => {
    return (
        <div className='w-full min-w-0 aspect-[4/3] overflow-hidden rounded-lg border border-gray-200 shadow-lg'>
            <iframe src={src} title={title} loading='lazy' className='w-full h-full border-0' />
        </div>
    )
}

export default ResponsiveEmbed
