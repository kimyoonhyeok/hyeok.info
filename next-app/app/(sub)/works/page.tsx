"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projectData";
import KoricaThumbnail from "@/components/KoricaThumbnail";
import LazyVideo from "@/components/LazyVideo";

interface ProjectItemProps {
    href: string;
    imgSrc: string;
    alt: string;
    title: string;
    scope: string;
    category: string;
    completion: string;
    slug: string;
}

// Helper to render standardized project item
const ProjectItem = ({ href, imgSrc, alt, title, scope, category, completion, slug }: ProjectItemProps) => {
    const isVideo = imgSrc.toLowerCase().endsWith('.mp4') || imgSrc.toLowerCase().endsWith('.webm');

    return (
        <Link href={href} className="project-item">
            <div
                className="image-wrapper"
                style={(slug === 'AcademicMotionGraphic' || slug === 'TD') ? { aspectRatio: '13/10' } : undefined}
            >
                {slug === 'KoricaWeb' ? (
                    <KoricaThumbnail />
                ) : isVideo ? (
                    <LazyVideo
                        src={`${imgSrc}?v=${slug === 'TD' || slug === 'AcademicMotionGraphic' ? '2' : '1'}`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: (slug === 'AcademicMotionGraphic' || slug === 'TD') ? 'contain' : 'cover',
                            willChange: 'transform',
                            backfaceVisibility: 'hidden',
                            transform: slug === 'fitnessIdeal' ? 'scale(1.25) translate3d(0, 0, 0)' : 'translate3d(0, 0, 0)'
                        }}
                    />
                ) : (
                    <Image
                        src={imgSrc}
                        alt={alt}
                        width={600}
                        height={450}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={60} // Optimization: Reduce thumbnail quality for speed
                    />
                )}
            </div>
            <div className="info-wrapper">
                <div className="header">
                    <span className="title">Project Name : {title}</span>
                </div>
                <div className="metadata">
                    <div>Task Scope : {scope}</div>
                    <div>
                        Category : <span className={`category-text ${category === 'Commercial' ? 'active' : 'inactive'}`}>Commercial</span> / <span className={`category-text ${category === 'Non-Commercial' ? 'active' : 'inactive'}`}>Non-Commercial</span>
                    </div>
                    <div>Completion : {completion}</div>
                </div>
            </div>
        </Link>
    );
};

export default function WorksPage() {
    return (
        <div className="project-grid">
            {projects.map((project) => {
                // Use the thumbnail field from extraction
                // Path: /works/{slug}/{thumbnail}
                const thumbnailSrc = project.thumbnail
                    ? `/project_images/${project.slug}/${project.thumbnail}`
                    // Fallback to first image if thumbnail empty
                    : (project.images.length > 0 ? `/project_images/${project.slug}/${project.images[0]}` : "/no-image.jpg");

                return (
                    <ProjectItem
                        key={project.slug}
                        href={`/works/${project.slug}`}
                        imgSrc={thumbnailSrc}
                        alt={project.title}
                        title={project.title}
                        scope={project.scope}
                        category={project.category}
                        completion={project.completion}
                        slug={project.slug}
                    />
                );
            })}
        </div>
    );
}
