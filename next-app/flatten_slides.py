import re

with open('app/(sub)/inu-score/PresentationInfographic.tsx', 'r') as f:
    content = f.read()

# Remove subSlide
content = content.replace("const [subSlide, setSubSlide] = useState(0);", "")
content = content.replace("const totalSlides = 18;", "const totalSlides = 21;")

# Replace wheel listener logic
wheel_logic_old = """    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isScrolling.current) return;
            isScrolling.current = true;

            if (e.deltaY > 30) {
                if (currentSlide === 7 && subSlide < 1) {
                    setSubSlide(1);
                } else if (currentSlide === 9 && subSlide < 1) {
                    setSubSlide(1);
                } else {
                    setCurrentSlide(prev => {
                        const next = Math.min(prev + 1, totalSlides - 1);
                        if (prev !== next) setSubSlide(0);
                        return next;
                    });
                }
            } else if (e.deltaY < -30) {
                if (currentSlide === 7 && subSlide > 0) {
                    setSubSlide(0);
                } else if (currentSlide === 9 && subSlide > 0) {
                    setSubSlide(0);
                } else {
                    setCurrentSlide(prev => {
                        const next = Math.max(prev - 1, 0);
                        if (prev !== next) setSubSlide(0);
                        return next;
                    });
                }
            } else if (delta < -30 && currentSlide === 0) {
                // If scrolling up on the first slide, close the presentation
                onClose();
            }

            setTimeout(() => {
                isScrolling.current = false;
            }, 800);
        };"""

wheel_logic_new = """    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
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
        };"""
content = content.replace(wheel_logic_old, wheel_logic_new)

# Replace keyboard
kbd_old = """        const handleKeyDown = (e: KeyboardEvent) => {
            if (isScrolling.current) return;
            if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                isScrolling.current = true;
                if (currentSlide === 7 && subSlide < 1) { setSubSlide(1); }
                else if (currentSlide === 9 && subSlide < 1) { setSubSlide(1); }
                else { setCurrentSlide(prev => { const n = Math.min(prev + 1, totalSlides - 1); if (prev !== n) setSubSlide(0); return n; }); }
                setTimeout(() => { isScrolling.current = false; }, 800);
            } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                isScrolling.current = true;
                if (currentSlide === 7 && subSlide > 0) { setSubSlide(0); }
                else if (currentSlide === 9 && subSlide > 0) { setSubSlide(0); }
                else { setCurrentSlide(prev => { const n = Math.max(prev - 1, 0); if (prev !== n) setSubSlide(0); return n; }); }
                setTimeout(() => { isScrolling.current = false; }, 800);
            } else if (e.key === "Escape") {
                onClose();
            }
        };"""
kbd_new = """        const handleKeyDown = (e: KeyboardEvent) => {
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
        };"""
content = content.replace(kbd_old, kbd_new)

# Replace touch
touch_old = """    const touchStart = useRef(0);
    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => { touchStart.current = e.touches[0].clientY; };
        const handleTouchEnd = (e: TouchEvent) => {
            if (isScrolling.current) return;
            const diff = touchStart.current - e.changedTouches[0].clientY;
            if (Math.abs(diff) > 50) {
                isScrolling.current = true;
                if (diff > 0) {
                    if (currentSlide === 7 && subSlide < 1) { setSubSlide(1); }
                    else if (currentSlide === 9 && subSlide < 1) { setSubSlide(1); }
                    else { setCurrentSlide(prev => { const n = Math.min(prev + 1, totalSlides - 1); if (prev !== n) setSubSlide(0); return n; }); }
                } else {
                    if (currentSlide === 7 && subSlide > 0) { setSubSlide(0); }
                    else if (currentSlide === 9 && subSlide > 0) { setSubSlide(0); }
                    else { setCurrentSlide(prev => { const n = Math.max(prev - 1, 0); if (prev !== n) setSubSlide(0); return n; }); }
                }
                setTimeout(() => { isScrolling.current = false; }, 800);
            }
        };
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [currentSlide, subSlide]);"""
touch_new = """    const touchStart = useRef(0);
    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => { touchStart.current = e.touches[0].clientY; };
        const handleTouchEnd = (e: TouchEvent) => {
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
        };
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [currentSlide]);"""
content = content.replace(touch_old, touch_new)

content = content.replace("onClick={() => { setCurrentSlide(idx); setSubSlide(0); }}", "onClick={() => { setCurrentSlide(idx); }}")
content = content.replace("[currentSlide, subSlide]", "[currentSlide]")

with open('app/(sub)/inu-score/PresentationInfographic.tsx', 'w') as f:
    f.write(content)
print("Handers fixed")
