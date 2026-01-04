import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projectData";

interface ProjectItemProps {
    href: string;
    imgSrc: string;
    alt: string;
    title: string;
    scope: string;
    category: string;
    completion: string;
}

// Helper to render standardized project item
const ProjectItem = ({ href, imgSrc, alt, title, scope, category, completion }: ProjectItemProps) => {
    const isVideo = imgSrc.toLowerCase().endsWith('.mp4') || imgSrc.toLowerCase().endsWith('.webm');

    return (
        <Link href={href} className="project-item">
            <div className="image-wrapper">
                {isVideo ? (
                    <video
                        src={imgSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <Image
                        src={imgSrc}
                        alt={alt}
                        width={600}
                        height={450}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 33vw"
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
                    ? `/works/${project.slug}/${project.thumbnail}`
                    // Fallback to first image if thumbnail empty
                    : (project.images.length > 0 ? `/works/${project.slug}/${project.images[0]}` : "/no-image.jpg");

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
                    />
                );
            })}
        </div>
    );
}
