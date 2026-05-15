const fs = require('fs');
let code = fs.readFileSync('app/(sub)/inu-score/PresentationInfographic.tsx', 'utf-8');

code = code.replace(/const handleWheel = \(e: WheelEvent\) => \{[\s\S]*?setTimeout\(\(\) => \{[\s\S]*?\}, 800\);\n\s*\};/g, 
`const handleWheel = (e: WheelEvent) => {
            if (isScrolling.current) return;
            isScrolling.current = true;

            if (e.deltaY > 30) {
                setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
            } else if (e.deltaY < -30) {
                setCurrentSlide(prev => {
                    const next = Math.max(prev - 1, 0);
                    if (prev === 0 && next === 0) onClose();
                    return next;
                });
            }

            setTimeout(() => {
                isScrolling.current = false;
            }, 800);
        };`);

code = code.replace(/const handleKeyDown = \(e: KeyboardEvent\) => \{[\s\S]*?if \(e\.key === "Escape"\) \{\n\s*onClose\(\);\n\s*\}\n\s*\};/g,
`const handleKeyDown = (e: KeyboardEvent) => {
            if (isScrolling.current) return;
            if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                isScrolling.current = true;
                setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
                setTimeout(() => { isScrolling.current = false; }, 800);
            } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                isScrolling.current = true;
                setCurrentSlide(prev => Math.max(prev - 1, 0));
                setTimeout(() => { isScrolling.current = false; }, 800);
            } else if (e.key === "Escape") {
                onClose();
            }
        };`);

code = code.replace(/const handleTouchEnd = \(e: TouchEvent\) => \{[\s\S]*?setTimeout\(\(\) => \{ isScrolling\.current = false; \}, 800\);\n\s*\}\n\s*\};/g,
`const handleTouchEnd = (e: TouchEvent) => {
            if (isScrolling.current) return;
            const diff = touchStart.current - e.changedTouches[0].clientY;
            if (Math.abs(diff) > 50) {
                isScrolling.current = true;
                if (diff > 0) {
                    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
                } else {
                    setCurrentSlide(prev => Math.max(prev - 1, 0));
                }
                setTimeout(() => { isScrolling.current = false; }, 800);
            }
        };`);

fs.writeFileSync('app/(sub)/inu-score/PresentationInfographic.tsx', code);
