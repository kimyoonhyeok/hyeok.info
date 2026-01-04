const fs = require('fs');
const path = require('path');
// Cheerio removed since it's not available. Regex used instead. 
// Wait, I can't use external modules that aren't installed. I should stick to fs and string manipulation.

const worksDir = '/Users/yoonhyeokkim/Desktop/2025/Web/hyeok/hyeok.info/main/works';
const outputFile = path.join(worksDir, 'grid_content.html');

// Helper to get directories
const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && dirent.name !== 'style' && !dirent.name.startsWith('.'))
        .map(dirent => dirent.name);

const directories = getDirectories(worksDir);

// Sort directories if needed? The original list had a specific order (2024, 2023). 
// I should probably try to preserve the order if possible, or sort by date if I can extract it.
// For now, let's just process them. I'll might need to map them to the original list order manualy or just sort by year desc.

let projects = [];

directories.forEach(dir => {
    const indexPath = path.join(worksDir, dir, 'index.html');
    if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, 'utf8');

        // Extract projectInfo
        // <div class="projectInfo">
        //     Title
        //     <br>
        //     Scope. Category, Date
        //     <br>
        // </div>

        const projectInfoMatch = content.match(/<div class="projectInfo">([\s\S]*?)<\/div>/);
        if (projectInfoMatch) {
            const innerText = projectInfoMatch[1].trim();
            const lines = innerText.split('<br>').map(l => l.trim()).filter(l => l.length > 0);

            if (lines.length >= 2) {
                const title = lines[0];
                const metaString = lines[1];
                // Ex: "Identity design. Commercial, Nov. 2024"

                // Naive parsing logic
                // Split by first dot for Scope
                let scope = "";
                let rest = "";

                const dotIndex = metaString.indexOf('.');
                if (dotIndex !== -1) {
                    scope = metaString.substring(0, dotIndex).trim();
                    rest = metaString.substring(dotIndex + 1).trim();
                } else {
                    scope = metaString;
                }

                // Split rest by last comma for Date? Or just comma?
                // "Commercial, Nov. 2024"
                // "Commercial, Sep. 2024"
                let category = "";
                let completion = "";

                const commaIndex = rest.lastIndexOf(',');
                if (commaIndex !== -1) {
                    category = rest.substring(0, commaIndex).trim();
                    completion = rest.substring(commaIndex + 1).trim();
                } else {
                    category = rest;
                }

                // Image handling: check if video exists or jpg
                // The prompt says "thumbnail image to the first image". 
                // I'll grab 01.jpg by default, or 01.mp4 if 01.jpg missing?
                // In the original works.html, some used mp4 (kodo).
                // Let's check for 01.mp4 first, then 01.jpg.

                let mediaHtml = '';
                if (fs.existsSync(path.join(worksDir, dir, '01.mp4'))) {
                    mediaHtml = `<video src="./${dir}/01.mp4" autoplay loop muted playsinline></video>`;
                } else {
                    mediaHtml = `<img src="./${dir}/01.jpg" alt="${title}">`;
                }

                projects.push({
                    dir,
                    title,
                    scope,
                    category,
                    completion,
                    mediaHtml,
                    year: completion.includes('2024') ? 2024 : 2023 // Simple year extractor
                });
            }
        }
    }
});

// Sort by year desc (2024 then 2023), then maybe by something else? 
// Original code had manual ordering. I will try to respect year.
projects.sort((a, b) => b.year - a.year);

let htmlOutput = '';

// Helper to generate specific project HTML
const generateCard = (p) => `
        <a href="./${p.dir}/index.html" class="project-item">
            <div class="image-wrapper">
                ${p.mediaHtml}
            </div>
            <div class="info-wrapper">
                <div class="header">
                    <span class="title">${p.title}</span>
                </div>
                <div class="metadata">
                    <div>Task Scope : ${p.scope}</div>
                    <div>Category : ${p.category}</div>
                    <div>Completion : ${p.completion}</div>
                </div>
            </div>
        </a>`;

htmlOutput += '<div class="project-grid">\n';
projects.forEach(p => {
    htmlOutput += generateCard({
        ...p,
        title: `Project Name : ${p.title}`
    }) + '\n';
});
htmlOutput += '</div>';

fs.writeFileSync(outputFile, htmlOutput);
console.log(`Generated grid HTML to ${outputFile}`);
