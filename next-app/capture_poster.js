const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // 1920x1080 viewport with 4x deviceScaleFactor for ultra high resolution
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 4,
        });

        console.log('Navigating to poster page...');
        await page.goto('http://localhost:3000/inu-score/poster-v5', {
            waitUntil: 'networkidle0',
            timeout: 60000
        });

        console.log('Waiting for custom fonts and SVG to fully render...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        const outputDir = '/Users/yoonhyeokkim/Desktop/2026/Web/hyeok/hyeok.info/next-app/public/inu-score/infographic/Final';
        const fs = require('fs');
        if (!fs.existsSync(outputDir)){
            fs.mkdirSync(outputDir, { recursive: true });
        }
        const outputPath = path.join(outputDir, 'poster_final_1920x1080.png');
        console.log(`Saving screenshot to ${outputPath}...`);
        
        // Take a screenshot of the 1920x1080 viewport
        await page.screenshot({ 
            path: outputPath, 
            fullPage: false // Captures exactly the 1920x1080 viewport window
        });

        console.log('Screenshot saved successfully!');
        await browser.close();
    } catch (err) {
        console.error('Error taking screenshot:', err);
        process.exit(1);
    }
})();
