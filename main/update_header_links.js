const fs = require('fs');
const path = require('path');

const rootDir = '/Users/yoonhyeokkim/Desktop/2025/Web/hyeok/hyeok.info/main';

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

const htmlFiles = getAllFiles(rootDir, '.html');

console.log(`Found ${htmlFiles.length} HTML files.`);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let updated = false;

    // Replace "↗ CV" with "↗ Brief"
    if (content.includes('↗ CV')) {
        content = content.replace(/↗ CV/g, '↗ Brief');
        updated = true;
    }

    if (updated) {
        fs.writeFileSync(file, content);
        console.log(`Updated: ${file}`);
    }
});

console.log('Global header update complete.');
