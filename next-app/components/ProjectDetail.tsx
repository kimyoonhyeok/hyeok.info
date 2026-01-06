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
    const swiperRef = useRef<SwiperType | null>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Handle Video Autoplay/Pause on Slide Change
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;

            // Enforce sound enabled (Browser interaction policy might block this initially)
            video.muted = false;

            if (index === activeIndex) {
                video.currentTime = 0;
                // Force load if it was preload="none"
                video.preload = "auto";
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch((error) => {
                        console.log("Auto-play prevented (likely due to sound policy):", error);
                        // Optional fallback logic could go here, but per user request, we force this setup.
                    });
                }
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    }, [activeIndex]);

    const dimmedStyle = isInfoHovered ? { opacity: 0.25 } : { opacity: 1 };

    // Navigation handlers
    const handlePrev = useCallback(() => {
        if (swiperRef.current) swiperRef.current.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (swiperRef.current) swiperRef.current.slideNext();
    }, []);

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
                                        playsInline // Essential for iOS
                                        controls={false} // Hidden controls per request
                                        muted={false} // Enforce sound ON per request
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
                                            sizes="(max-width: 768px) 100vw, 100vw"
                                            quality={75} // Balanced quality for full screen
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

            {/* Footer (Participates in Grid) */}
            <Footer />
        </div>
    );
}
