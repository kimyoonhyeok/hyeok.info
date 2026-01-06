import { MetadataRoute } from 'next';
import { projects } from '@/lib/projectData';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://hyeok.info';

    // Static pages
    const routes = [
        '',
        '/works',
        '/about',
        '/brief',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic project pages
    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/works/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routes, ...projectRoutes];
}
