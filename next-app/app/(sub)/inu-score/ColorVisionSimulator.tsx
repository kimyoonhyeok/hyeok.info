'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from 'react';
import ColorMirroring from './ColorMirroring';

type FilterType = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia';

type ColorVisionSimulatorProps = {
    onClose: () => void;
};

const FILTERS: (FilterType | 'video' | 'mirroring')[] = ['normal', 'protanopia', 'deuteranopia', 'tritanopia', 'video', 'mirroring'];
const LABELS = ['Common (C)', 'Protanopia (P)', 'Deuteranopia (D)', 'Tritanopia (T)', 'Colour Changes (V)', 'Live Mirroring'];

export default function ColorVisionSimulator({ onClose }: ColorVisionSimulatorProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isAnimating = useRef(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile/tablet breakpoint
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 767);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const activeFilter = FILTERS[activeIndex];

    const getFilterStyle = (filter: FilterType) => {
        switch (filter) {
            case 'protanopia':   return 'url(#protanopia)';
            case 'deuteranopia': return 'url(#deuteranopia)';
            case 'tritanopia':   return 'url(#tritanopia)';
            default:             return 'none';
        }
    };

    // Keyboard and Wheel Interception
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (isAnimating.current) {
                e.preventDefault();
                return;
            }

            const atTop = container.scrollTop <= 10;
            
            if (atTop) {
                if (e.deltaY > 30) {
                    if (activeIndex < 5) {
                        e.preventDefault();
                        isAnimating.current = true;
                        setActiveIndex(i => i + 1);
                        setTimeout(() => isAnimating.current = false, 600);
                    }
                } else if (e.deltaY < -30) {
                    if (activeIndex > 0) {
                        e.preventDefault();
                        isAnimating.current = true;
                        setActiveIndex(i => i - 1);
                        setTimeout(() => isAnimating.current = false, 600);
                    }
                }
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, [activeIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const container = scrollContainerRef.current;
            if (!container) return;
            const atTop = container.scrollTop <= 10;

            if (atTop) {
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    if (activeIndex < 5) {
                        e.preventDefault(); // Stop screen from scrolling downwards
                        if (isAnimating.current) return; // Discard rapid inputs
                        isAnimating.current = true;
                        setActiveIndex(i => i + 1);
                        setTimeout(() => isAnimating.current = false, 600);
                    }
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    if (activeIndex > 0) {
                        e.preventDefault(); // Stop screen from scrolling upwards
                        if (isAnimating.current) return; // Discard rapid inputs
                        isAnimating.current = true;
                        setActiveIndex(i => i - 1);
                        setTimeout(() => isAnimating.current = false, 600);
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault(); // Stop bouncing at top
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown, { passive: false });
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex]);

    // Touch events for mobile — horizontal swipe (avoids conflict with vertical page scroll)
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.touches[0].clientX;
            touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (isAnimating.current) return;
            const dx = touchStartX.current - e.changedTouches[0].clientX;
            const dy = touchStartY.current - e.changedTouches[0].clientY;

            // Only trigger if horizontal swipe is dominant (prevent accidental triggers on vertical scroll)
            if (Math.abs(dx) < 30 || Math.abs(dx) < Math.abs(dy)) return;

            if (dx > 30 && activeIndex < 5) {
                // Swipe left → next filter
                isAnimating.current = true;
                setActiveIndex(i => i + 1);
                setTimeout(() => isAnimating.current = false, 600);
            } else if (dx < -30 && activeIndex > 0) {
                // Swipe right → prev filter
                isAnimating.current = true;
                setActiveIndex(i => i - 1);
                setTimeout(() => isAnimating.current = false, 600);
            }
        };

        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });
        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [activeIndex]);


    return (
        <div ref={scrollContainerRef} style={{ width: '100%', height: '100%', backgroundColor: '#fff', overflowY: 'auto' }}>
            {/* Color matrix filters */}
            <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
                <defs>
                    <filter id="protanopia">
                        <feColorMatrix type="matrix" values="
                            0.152286  1.052583 -0.204868  0  0
                            0.114503  0.786281  0.099216  0  0
                           -0.003882 -0.048116  1.051998  0  0
                            0         0         0         1  0" />
                    </filter>
                    <filter id="deuteranopia">
                        <feColorMatrix type="matrix" values="
                            0.367322  0.860646 -0.227968  0  0
                            0.280085  0.672501  0.047413  0  0
                           -0.011820  0.042940  0.968881  0  0
                            0         0         0         1  0" />
                    </filter>
                    <filter id="tritanopia">
                        <feColorMatrix type="matrix" values="
                            0.9500  0.0500  0.0000  0  0
                            0.0000  0.8000  0.2000  0  0
                            0.0000  0.8000  0.2000  0  0
                            0       0       0       1  0" />
                    </filter>
                </defs>
            </svg>

            {/* Poster Viewer */}
            <div style={{
                width: '100%',
                height: isMobile ? 'calc(100vh - 120px)' : 'calc(100vh - 120px)',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: isMobile ? '4rem 1rem 3rem' : '2rem 50px',
                boxSizing: 'border-box',
            }}>
                {/* Back Button */}
                <div style={{ position: 'absolute', top: '2rem', left: isMobile ? '1rem' : '50px', zIndex: 10 }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent', border: 'none', fontSize: isMobile ? '14px' : '18px',
                            cursor: 'pointer', color: '#666', display: 'flex',
                            alignItems: 'center', gap: '8px', transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#111'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                        &larr; Back
                    </button>
                </div>

                {/* Poster Image, Video, or Live Mirroring */}
                {activeFilter === 'mirroring' ? (
                    <div style={{ width: '100%', height: '100%', padding: isMobile ? '0' : '2rem 50px', boxSizing: 'border-box' }}>
                        <ColorMirroring />
                    </div>
                ) : activeFilter === 'video' ? (
                    <video
                        src="/inu-score/visual communication design/sideproject/colour_changes.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                            maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                            borderRadius: '4px',
                        }}
                    />
                ) : (
                    <img
                        src="/inu-score/visual communication design/sideproject/sideproject_poster_app_final.jpg"
                        alt="Main Poster — Color Vision Simulation"
                        style={{
                            maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
                            filter: getFilterStyle(activeFilter as FilterType),
                            transition: 'filter 0.35s ease-out',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                            borderRadius: '4px',
                        }}
                    />
                )}

                {/* ── State Indicator + Mobile Dots ── */}
                <div style={{
                    position: 'absolute',
                    bottom: isMobile ? '1rem' : '2rem',
                    left: isMobile ? '1rem' : '50px',
                    zIndex: 100,
                    userSelect: 'none',
                    fontFamily: '"Pretendard", sans-serif',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}>
                    <span style={{ fontSize: isMobile ? '13px' : '18px', color: '#666' }}>
                        {LABELS[activeIndex]}
                    </span>
                    {/* Mobile: dot indicators */}
                    {isMobile && (
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            {FILTERS.map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => { if (!isAnimating.current) { isAnimating.current = true; setActiveIndex(i); setTimeout(() => isAnimating.current = false, 600); } }}
                                    style={{
                                        width: i === activeIndex ? '18px' : '6px',
                                        height: '6px',
                                        borderRadius: '3px',
                                        backgroundColor: '#111',
                                        opacity: i === activeIndex ? 1 : 0.25,
                                        cursor: 'pointer',
                                        transition: 'all 0.35s ease',
                                        flexShrink: 0,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Mobile: swipe hint (only on first load, fades out) */}
                {isMobile && activeIndex === 0 && (
                    <div style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        zIndex: 100,
                        fontSize: '11px',
                        color: '#aaa',
                        fontFamily: '"Pretendard", sans-serif',
                        userSelect: 'none',
                        letterSpacing: '0.02em',
                    }}>
                        ← swipe →
                    </div>
                )}
            </div>

            {/* ── Info Section ── */}
            <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'flex-start',
                padding: isMobile ? '3rem 1rem' : '6rem 50px',
                gap: isMobile ? '2rem' : '4rem',
                width: '100%',
                boxSizing: 'border-box',
            }}>
                {/* Left: Metadata */}
                <div style={{
                    flex: isMobile ? 'none' : '0 0 40%',
                    width: isMobile ? '100%' : undefined,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem',
                    fontSize: isMobile ? '14px' : '20px',
                    lineHeight: 1.2,
                }}>
                    <div>Project Name : Divergent Consequences With Single Image</div>
                    <div>Task Scope : Poster Design, Web Design and Development</div>
                    <div>Category : Non-Commercial</div>
                    <div>Completion : Apr. 2026</div>
                </div>

                {/* Right: Description */}
                <div style={{
                    flex: 1,
                    width: isMobile ? '100%' : undefined,
                    fontSize: isMobile ? '14px' : '20px',
                    lineHeight: 1.6,
                    wordBreak: 'keep-all',
                    color: '#111',
                }}>
                    <p style={{ margin: 0, marginBottom: '1rem' }}>
                        This project was conceived to explore the concept of &lsquo;different outcomes from the same image.&rsquo; Approximately 80 to 85% of human perceptual activity is mediated through vision, and color operates as a particularly powerful cognitive tool.
                    </p>
                    <p style={{ margin: 0, marginBottom: '1rem' }}>
                        According to a study published in Management Decision by Singh (2006), individuals make judgements about an object within 90 S, and 62 to 90% of that assessment is based solely on color. Color Vision Deficiency (CVD) is a condition in which specific hues cannot be distinguished due to a functional abnormality of the cone cells in the retina, and it is broadly classified into three types.
                    </p>
                    <p style={{ margin: 0 }}>
                        By demonstrating that the identical image is reconstructed into entirely different images depending on the specific type of color vision deficiency, this work reveals how scalable and unequal the visual images we take for granted truly are. Depending on each individual&rsquo;s biological conditions, the identical stimulus is translated into profoundly different perceptual realities. Ultimately, this project fosters an awareness of the relativity of the concept of &lsquo;normal vision&rsquo; and raises fundamental questions regarding perceptual diversity and visual equity.
                    </p>

                    {/* EN Footnotes (no #4) */}
                    <div style={{ marginTop: isMobile ? '2rem' : '4rem', lineHeight: 1.6 }}>
                        1. Protanopia: characterized by the absence of long-wavelength sensitive cone cells; results in the inability to distinguish red from green. Approximately 1% of male population is affected.<br />
                        2. Deuteranopia: caused by missing medium-wavelength (green) cones. The most common form of color blindness; affects roughly 1% of males.<br />
                        3. Tritanopia: a rare form caused by absent short-wavelength (blue) cones; individuals confuse blue with green and yellow with violet.
                    </div>

                    {/* KO Description */}
                    <style>{`
                        [data-ko-desc] { font-family: "Pretendard Variable", "Pretendard", sans-serif !important; }
                        [data-ko-desc] * { font-family: inherit; }
                    `}</style>
                    <div data-ko-desc="true" style={{ marginTop: isMobile ? '4rem' : '8rem', lineHeight: 1.6, wordBreak: 'keep-all' }}>
                        <p style={{ margin: 0, marginBottom: '1rem' }}>
                            본 작업은 &ldquo;같은 이미지로부터 다른 결과&rdquo;라는 개념을 탐구하기 위해 진행되었다. 인간의 지각 활동의 80~85%가 시각을 통해 매개되며, 색은 특히 강력한 인지적 도구로 작동한다. Singh(2006)의 Management Decision에 게재된 연구에 따르면 인간은 90초 이내에 대상에 대한 판단을 내리며, 그 중 62~90%가 색에만 기반한다.
                        </p>
                        <p style={{ margin: 0, marginBottom: '1rem' }}>
                            색각 결함(Color Vision Deficiency, CVD)은 망막의 원추세포 기능 이상으로 특정 색을 구별하지 못하는 상태로, 크게 세 가지로 분류된다. Protanopia(제1색맹)는 장파장 감수성 원추세포(L-cone)가 결손되어 적색 스펙트럼 지각이 불가능하며, 남성의 약 1%, 여성의 약 0.01%가 경험한다. Deuteranopia(제2색맹)는 중파장 감수성 원추세포(M-cone)가 결손된 가장 흔한 형태로, 역시 남성의 약 1%, 여성의 약 0.01%가 이에 해당한다. Tritanopia(제3색맹)는 단파장 감수성 원추세포(S-cone)가 결손되어 청색-황색 구별에 어려움을 겪는 매우 희귀한 형태로, 약 0.01%가 경험한다.
                        </p>
                        <p style={{ margin: 0, marginBottom: '4rem' }}>
                            본 작업은 동일한 이미지가 각 색각 결함 유형에 따라 전혀 다른 이미지로 재구성됨을 보여줌으로써, 우리가 당연시하는 시각적 이미지가 얼마나 불안정하고 불평등한 것인지를 드러낸다. 각 개인의 생물학적 조건에 따라 동일한 자극이 전혀 다른 지각적 현실로 번역되며, 이 작업은 &ldquo;정상 시각&rdquo;이라는 개념의 상대성을 인식하게 하고 지각적 다양성과 시각적 형평성에 관한 근본적 질문을 제기한다.
                        </p>
                        {/* KO Footnotes (no #4) */}
                        <div style={{ lineHeight: 1.6 }}>
                            1. Protanopia(제1색맹): 장파장 감수성 원추세포(L-cone)가 결손되어 적색 계열의 색 지각이 불가능한 상태로, 남성 인구의 약 1%가 이에 해당한다.<br />
                            2. Deuteranopia(제2색맹): 중파장 감수성 원추세포(M-cone)가 결손된 가장 흔한 색각 결함 유형으로, 남성의 약 1%가 경험한다.<br />
                            3. Tritanopia(제3색맹): 단파장 감수성 원추세포(S-cone)가 결손되어 청색-황색 구별에 어려움을 겪는 매우 희귀한 형태로, 전체 인구의 약 0.01%가 해당한다.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
