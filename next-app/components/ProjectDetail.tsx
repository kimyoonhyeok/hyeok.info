'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

import styles from '../app/(project)/project.module.css';

// Import Shared Components
import Header from './ui/Header';
import Footer from './ui/Footer';

interface Project {
    title: string;
    scope: string;
    category: string;
    completion: string;
    description: string;
    images: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Allow other properties
}

interface ProjectDetailProps {
    project: Project;
    slug: string;
}

export default function ProjectDetail({ project, slug }: ProjectDetailProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isInfoHovered, setIsInfoHovered] = useState(false);
    const [isMuted, setIsMuted] = useState(true); // Default muted for autoplay
    const swiperRef = useRef<SwiperType | null>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Handle Video Autoplay/Pause on Slide Change and Mute State
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;

            // Sync mute state
            video.muted = isMuted;

            if (index === activeIndex) {
                video.currentTime = 0;
                // Force load if it was preload="none"
                video.preload = "auto";
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch((error) => {
                        console.log("Auto-play prevented:", error);
                    });
                }
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    }, [activeIndex, isMuted]); // Re-run when mute toggles

    const dimmedStyle = isInfoHovered ? { opacity: 0.25 } : { opacity: 1 };

    // Navigation handlers
    const handlePrev = useCallback(() => {
        if (swiperRef.current) swiperRef.current.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (swiperRef.current) swiperRef.current.slideNext();
    }, []);

    const toggleMute = () => setIsMuted(prev => !prev);

    return (
        <div className={styles.container}>
            {/* Header (Participates in Grid) */}
            <Header />

            <div className={`${styles.projectInfo}`} style={dimmedStyle}>
                {project.title}
                <br />
                {project.scope}
                <br />
                {project.category}, {project.completion}
            </div>

            <div
                className={styles.moreInfo}
                onMouseEnter={() => setIsInfoHovered(true)}
                onMouseLeave={() => setIsInfoHovered(false)}
            >
                To find out more about the project details, hover here ↗

                <div
                    className={styles.moreInfoContent}
                    style={{
                        opacity: isInfoHovered ? 1 : 0,
                        visibility: isInfoHovered ? 'visible' : 'hidden'
                    }}
                >
                    {project.description}
                </div>
            </div>

            <div className={styles.image} style={dimmedStyle}>
                <Swiper
                    modules={[Navigation]}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    breakpoints={{
                        // Mobile & Tablet: Standard Slide Speed
                        0: { speed: 300 },
                        // Desktop: Instant Transition (No Slide)
                        1400: { speed: 0, allowTouchMove: false }
                    }}
                    className="mySwiper"
                >
                    {project.images.map((img: string, idx: number) => {
                        const isVideo = img.toLowerCase().endsWith('.mp4') || img.toLowerCase().endsWith('.webm');
                        const src = `/project_images/${slug}/${img}`;
                        const isNearby = Math.abs(activeIndex - idx) <= 1; // Prioritize current and adjacent

                        return (
                            <SwiperSlide key={idx}>
                                {isVideo ? (
                                    <video
                                        ref={(el) => { videoRefs.current[idx] = el; }}
                                        src={src}
                                        loop
                                        playsInline
                                        controls={false} // Hidden controls
                                        muted={isMuted} // React controlled
                                        preload={isNearby ? "auto" : "none"}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                ) : (
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <Image
                                            src={src}
                                            alt={`${project.title} - ${idx + 1}`}
                                            fill
                                            priority={idx === 0}
                                            sizes="100vw"
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                )}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

                {/* Custom Mute/Unmute Toggle Button */}
                {/* Only show if current slide is video? No, show always if mixed content, or check if active is video. 
                    But complicating "active is video" logic might be buggy with Swiper loop. 
                    Simpler: Always show, or let it toggle global state. 
                    Ideally, only show if active slide IS video. */}
                {(() => {
                    const currentImg = project.images[activeIndex];
                    const isCurrentVideo = currentImg && (currentImg.toLowerCase().endsWith('.mp4') || currentImg.toLowerCase().endsWith('.webm'));

                    if (!isCurrentVideo) return null;

                    return (
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                            style={{
                                position: 'absolute',
                                bottom: '20px',
                                right: '20px',
                                zIndex: 50,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '10px',
                                opacity: 0.7,
                                transition: 'opacity 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? (
                                // Mute Icon (Speaker with X)
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M23 9L17 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17 9L23 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : (
                                // Sound Icon (Speaker with waves)
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19.07 4.93C20.98 6.84 21.96 9.42 21.96 12C21.96 14.58 20.98 17.16 19.07 19.07M15.54 8.46C16.47 9.39 17 10.74 17 12C17 13.26 16.47 14.61 15.54 15.54" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </button>
                    );
                })()}

                {/* Desktop/Tablet Navigation Overlays - Explicit Click Handlers */}
                <div
                    className="swiper-overlay left"
                    onClick={handlePrev}
                />
                <div
                    className="swiper-overlay right"
                    onClick={handleNext}
                />
            </div>

            {/* Footer (Participates in Grid) */}
            <Footer />
        </div>
    );
}
