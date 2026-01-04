'use client';

import { useState, useRef } from 'react';
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
    const [isInfoHovered, setIsInfoHovered] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);

    // Legacy Hover Logic:
    // .container * { transition ... }
    // When hovering .moreInfo, set siblings opacity?
    // SCSS: .moreInfo20 { opacity: 0; ... } -> hover -> opacity: 1?
    // The SCSS only defines the class .moreInfo20 with transition. It doesn't explicitly show the :hover trigger code.
    // Assuming standard behavior: Hovering trigger reveals content.
    // JS Logic provided by user earlier: "moreInfo.addEventListener('mouseenter'...)"

    // We need to apply opacity to "everything else" when info is hovered.
    // In React this is state-driven.
    // Elements to dim: .projectInfo, .image 
    const dimmedStyle = isInfoHovered ? { opacity: 0.25 } : { opacity: 1 };

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
                    style={{ opacity: isInfoHovered ? 1 : 0 }}
                >
                    {project.description}
                </div>
            </div>

            <div className={styles.image} style={dimmedStyle}>
                {/* Custom Overlay Navigation */}
                <div
                    className="swiper-overlay left"
                    onClick={() => swiperRef.current?.slidePrev()}
                />
                <div
                    className="swiper-overlay right"
                    onClick={() => swiperRef.current?.slideNext()}
                />

                <Swiper
                    modules={[Navigation]}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    className="mySwiper"
                >
                    {project.images.map((img: string, idx: number) => {
                        const isVideo = img.toLowerCase().endsWith('.mp4') || img.toLowerCase().endsWith('.webm');
                        const src = `/works/${slug}/${img}`;

                        return (
                            <SwiperSlide key={idx}>
                                {isVideo ? (
                                    <video
                                        src={src}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        controls={false}
                                    />
                                ) : (
                                    <Image
                                        src={src}
                                        alt={`${project.title} - ${idx + 1}`}
                                        width={1920}
                                        height={1080}
                                        quality={100}
                                        priority={idx === 0}
                                    />
                                )}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>

            {/* Footer (Participates in Grid) */}
            <Footer />

            {/* Mobile Footer Wrapper if needed or handled by CSS module */}
            <div className={styles.minWidth320}>
                <ul>
                    <li>Contact | <a href="mailto:hyeok.info@gmail.com" target="_blank" rel="noopener noreferrer">hyeok.info@gmail.com</a></li>
                </ul>
                <h1>(c) 2025. Yoonhyeok Kim. all rights reserved.</h1>
            </div>
        </div>
    );
}
