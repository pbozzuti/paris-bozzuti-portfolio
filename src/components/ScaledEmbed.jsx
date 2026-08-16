"use client"
import React, { useEffect, useRef, useState } from 'react'

const ScaledEmbed = ({ src, title, nativeWidth, nativeHeight }) => {

    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const updateScale = () => setScale(el.offsetWidth / nativeWidth);
        updateScale();

        const observer = new ResizeObserver(updateScale);
        observer.observe(el);
        return () => observer.disconnect();
    }, [nativeWidth]);

    return (
        <div
            ref={containerRef}
            className='w-full min-w-0 overflow-hidden rounded-lg border border-gray-200 shadow-lg'
            style={{ height: nativeHeight * scale }}
        >
            <iframe
                src={src}
                title={title}
                loading='lazy'
                style={{
                    width: nativeWidth,
                    height: nativeHeight,
                    border: 0,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left'
                }}
            />
        </div>
    )
}

export default ScaledEmbed
