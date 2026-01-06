"use client";

import React, { useRef, useState, useEffect } from "react";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
}

export default function LazyVideo({ src, style, className, ...props }: LazyVideoProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" } // Start loading 200px before it enters viewport
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ ...style, position: "relative", backgroundColor: "#f0f0f0" }} // Placeholder background
        >
            {isVisible ? (
                <video
                    ref={videoRef}
                    src={src}
                    style={{ width: "100%", height: "100%", objectFit: "cover", ...style }}
                    onLoadedData={() => {
                        if (props.autoPlay) {
                            videoRef.current?.play().catch(() => { });
                        }
                    }}
                    {...props}
                />
            ) : null}
        </div>
    );
}
