import { notFound } from "next/navigation";
import { projects } from "@/lib/projectData";
import ProjectDetail from "@/components/ProjectDetail";

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return <ProjectDetail project={project} slug={slug} />;
}
