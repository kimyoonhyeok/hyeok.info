const fs = require('fs');
const path = require('path');

const rootDir = '/Users/yoonhyeokkim/Desktop/2025/Web/hyeok/hyeok.info/main';
const worksDir = path.join(rootDir, 'works');
const worksHtmlPath = path.join(worksDir, 'works.html');
const gridContentPath = path.join(worksDir, 'grid_content.html');

console.log(`Scanning root: ${rootDir}`);

// 1. Update works.html with new grid
if (fs.existsSync(worksHtmlPath) && fs.existsSync(gridContentPath)) {
    console.log('Updating works.html...');
    let worksHtml = fs.readFileSync(worksHtmlPath, 'utf8');
    const gridContent = fs.readFileSync(gridContentPath, 'utf8');

    const gridStartStr = '<div class="project-grid">';
    const gridStart = worksHtml.indexOf(gridStartStr);
    const gridEnd = worksHtml.indexOf('<footer>');

    if (gridStart !== -1 && gridEnd !== -1) {
        const preGrid = worksHtml.substring(0, gridStart);
        const postGrid = worksHtml.substring(gridEnd);
        worksHtml = preGrid + gridContent + '\n\n  ' + postGrid;
        console.log('Replaced grid content.');
    } else {
        console.error('Could not find grid markers in works.html. Skipping grid update.');
    }

    worksHtml = worksHtml.replace(/<\/html>\s*<\/html>/g, '</html>');
    worksHtml = worksHtml.replace(/(<\/html>\s*)+$/g, '</html>');

    fs.writeFileSync(worksHtmlPath, worksHtml);
    console.log('works.html updated and cleaned.');
} else {
    console.warn("works.html or grid_content.html not found, skipping works.html specific update.");
}


// Helper to recursively find files
const getAllFiles = (dir, ext, fileList = []) => {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                getAllFiles(filePath, ext, fileList);
            }
        } else {
            if (path.extname(file) === ext) {
                fileList.push(filePath);
            }
        }
    });
    return fileList;
};

// 2. Patch CSS Files
console.log('Patching CSS files...');
const cssFiles = getAllFiles(rootDir, '.css');

const stickyHeaderCss = `
/* Sticky Header Added by Script */
.global-header {
  position: sticky; /* Standard */
  position: -webkit-sticky; /* Safari */
  top: 0;
  z-index: 9999;
  transition: background-color 0.3s ease;
}
.global-header.scrolled {
  background-color: #ffffff !important;
}
`;

const imageWrapperCss = `
/* Image Wrapper Refinement */
.image-wrapper {
    padding: 25px 0 !important;
    background-color: #ffffff !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}
.image-wrapper img, .image-wrapper video {
    object-fit: contain !important;
    width: 100% !important;
    height: 100% !important;
}
`;

cssFiles.forEach(file => {
    let css = fs.readFileSync(file, 'utf8');

    // Replace font sizes
    css = css.replace(/--std:\s*16px/g, '--std: 12px');
    css = css.replace(/font-size:\s*16px/g, 'font-size: 12px');

    // Enforce 400 weight
    css = css.replace(/font-weight:\s*(500|600|700|bold)/g, 'font-weight: 400');

    // Update sticky header CSS background color
    css = css.replace(/background-color: rgba\(255, 255, 255, 0\.95\);/g, 'background-color: #ffffff;');
    css = css.replace(/backdrop-filter: blur\(5px\);/g, '');

    // Append Sticky Header CSS
    if (!css.includes('.global-header.scrolled')) {
        css += '\n' + stickyHeaderCss;
    }

    // Append Image Wrapper CSS
    // We assume appending !important rules is the safest way to override existing rules programmatically
    if (!css.includes('/* Image Wrapper Refinement */')) {
        css += '\n' + imageWrapperCss;
    }

    fs.writeFileSync(file, css);
    console.log(`Patched CSS: ${file}`);
});


// 3. Inject JS into HTML files
console.log('Injecting JS into HTML files...');
const htmlFiles = getAllFiles(rootDir, '.html');

const stickyScript = `
<script>
    // Sticky Header Script
    document.addEventListener('DOMContentLoaded', () => {
        const header = document.querySelector('.global-header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 10) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    });
</script>
`;

htmlFiles.forEach(file => {
    if (file.endsWith('grid_content.html') || file.endsWith('extract_metadata.js') || file.endsWith('global_patch.js')) return;

    let html = fs.readFileSync(file, 'utf8');

    if (!html.includes('Sticky Header Script') && html.includes('</body>')) {
        html = html.replace('</body>', `${stickyScript}\n</body>`);
        fs.writeFileSync(file, html);
        console.log(`Injected JS: ${file}`);
    }
});

console.log('Global patch complete.');
