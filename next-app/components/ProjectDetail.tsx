'use client';
/* eslint-disable @next/next/no-img-element */

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
    const [isGlobalMuted, setIsGlobalMuted] = useState<boolean>(false); // Try unmuted by default
    const swiperRef = useRef<SwiperType | null>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Handle Video Autoplay/Pause on Slide Change
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;

            if (index === activeIndex) {
                if (video.paused) {
                    video.currentTime = 0;
                    video.preload = "auto";
                    video.muted = isGlobalMuted; // Apply the global mute preference
                    
                    // The video's muted property is bound to state in JSX.
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch((error) => {
                            if (error.name === 'AbortError') return; // Ignore if it was aborted by a pause() call
                            console.log("Auto-play prevented (likely due to sound policy):", error);
                            // Fallback: Mute and play
                            video.muted = true;
                            setIsGlobalMuted(true);
                            video.play().catch(e => console.log("Muted fallback failed:", e));
                        });
                    }
                }
            } else {
                if (!video.paused) {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }, [activeIndex]);

    const setMute = (index: number, mute: boolean) => {
        const video = videoRefs.current[index];
        setIsGlobalMuted(mute); // Update global state
        
        if (video) {
            if (video.muted !== mute) {
                video.muted = mute;
                if (!mute) {
                    video.volume = 1;
                    // Force a re-play to ensure audio context is active
                    video.pause();
                    video.play().catch(e => console.error("Force play failed", e));
                }
            } else if (!mute && video.paused) {
                // If it's already unmuted but paused, play it
                video.volume = 1;
                video.play().catch(e => console.error("Force play failed", e));
            }
        }
    };

    // Navigation handlers
    const handlePrev = useCallback(() => {
        if (swiperRef.current) swiperRef.current.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (swiperRef.current) swiperRef.current.slideNext();
    }, []);

    return (
        <div className="project-detail-wrapper">
        <div className={styles.container}>
            {/* Header (Participates in Grid) */}
            <Header />

            <div className={styles.image}>
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
                                    <>
                                        <video
                                            ref={(el) => { videoRefs.current[idx] = el; }}
                                            src={src}
                                            loop
                                            autoPlay={idx === activeIndex}
                                            playsInline
                                            controls={false}
                                            muted={isGlobalMuted}
                                            preload={isNearby ? "auto" : "none"}
                                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                        />
                                    </>
                                ) : (slug === 'InuScore' && idx === 0) ? (
                                     // Natural-size img with inline overrides to defeat global .swiper-slide img CSS
                                     // This makes the element's actual size = visible poster size, so border is exact
                                     <img
                                         src={src}
                                         alt={`${project.title} - ${idx + 1}`}
                                         style={{
                                             width: 'auto',
                                             height: 'auto',
                                             maxWidth: '100%',
                                             maxHeight: '100%',
                                             display: 'block',
                                             objectFit: 'unset',
                                             border: '0.27px solid rgba(0, 0, 0, 0.12)',
                                             boxSizing: 'border-box',
                                         }}
                                     />
                                ) : (
                                     <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                         <Image
                                             src={src}
                                             alt={`${project.title} - ${idx + 1}`}
                                             fill
                                             priority={idx === 0}
                                             sizes="(max-width: 768px) 100vw, 100vw"
                                             quality={95}
                                             style={{ objectFit: 'contain' }}
                                         />
                                     </div>
                                )}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

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
            
            {/* Sound Controller for Active Video */}
            {project.images[activeIndex] && (project.images[activeIndex].toLowerCase().endsWith('.mp4') || project.images[activeIndex].toLowerCase().endsWith('.webm')) && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '1rem', // Match header's top margin perfectly inside .container
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 100, // Make sure it sits above everything
                        background: 'transparent',
                        display: 'flex',
                        alignItems: 'baseline',
                        fontSize: '0.75rem', // Match header font size
                        fontFamily: 'inherit',
                        color: 'inherit',
                        pointerEvents: 'auto'
                    }}
                >
                    Sound :&nbsp;
                    <span 
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMute(activeIndex, false); }}
                        className={`category-text ${!isGlobalMuted ? 'active' : 'inactive'}`}
                        style={{ cursor: 'pointer' }}
                    >On</span>
                    &nbsp;/&nbsp;
                    <span 
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMute(activeIndex, true); }}
                        className={`category-text ${isGlobalMuted ? 'active' : 'inactive'}`}
                        style={{ cursor: 'pointer' }}
                    >Off</span>
                </div>
            )}
        </div>

        {/* Info Section — rendered below the swiper for all projects */}
        <div className={styles.infoSection}>
            {/* Left: Metadata */}
            <div className={styles.infoLeft}>
                <div>Project Name : {project.title}</div>
                <div>Task Scope : {project.scope}</div>
                <div>Category : {project.category}</div>
                <div>Completion : {project.completion}</div>
            </div>
            {/* Right: Description */}
            <div className={styles.infoRight}>
                {project.description}
            </div>
        </div>

        {/* Footer (Rendered outside Grid at bottom for all projects) */}
        <div className={styles.standaloneFooter}>
            <Footer />
        </div>
        </div>
    );
}
