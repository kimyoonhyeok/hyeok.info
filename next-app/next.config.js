/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    async redirects() {
        return [
            // Specific File Redirects (Must come BEFORE wildcards)
            {
                source: '/index.html',
                destination: '/',
                permanent: true,
            },
            {
                source: '/works.html',
                destination: '/works',
                permanent: true,
            },
            {
                source: '/about.html',
                destination: '/about',
                permanent: true,
            },
            {
                source: '/brief/brief.html',
                destination: '/brief',
                permanent: true,
            },
            {
                source: '/cv/cv.html',
                destination: '/brief',
                permanent: true,
            },
            // Catch-all for legacy HTML files (e.g. /works/project.html -> /works/project)
            {
                source: '/:path*.html',
                destination: '/:path*',
                permanent: true,
            },
        ]
    },
};

module.exports = nextConfig;
