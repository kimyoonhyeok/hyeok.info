'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './pt.module.css';
import HTMLFlipBook from 'react-pageflip';

type PresentationGraduationProps = {
    onClose: () => void;
};

const BookPage = React.forwardRef<HTMLDivElement, { bgImage?: string; bgPosition?: string; bgSize?: string; children?: React.ReactNode }>((props, ref) => {
    return (
        <div className="demoPage" ref={ref} style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#fff' }}>
            {props.bgImage && (
                <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url('${props.bgImage}')`,
                    backgroundPosition: props.bgPosition || 'center',
                    backgroundSize: props.bgSize || '100% 100%',
                    backgroundRepeat: 'no-repeat',
                }} />
            )}
            {props.children && (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: props.bgImage ? 'transparent' : '#fff',
                }}>
                    {props.children}
                </div>
            )}
        </div>
    );
});
BookPage.displayName = 'BookPage';

const P = ({ children }: { children: React.ReactNode }) => (
    <p style={{ textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word', marginBottom: '1.2em', marginTop: 0, lineHeight: 1.6, fontSize: '1.1rem', color: '#333' }}>
        {children}
    </p>
);

const GRAD2_REF_LIST = [
    {
        display: "King, R. (2006). Korean kinship terminology.",
        detail: "In H.-M. Sohn (Ed.), Korean language in culture and society (pp. 101–117). University of Hawai'i Press.",
        url: "https://juniperpublishers.com/oajels/OAJELS.MS.ID.555578.php",
    },
    {
        display: "Koh, H. J. (2002). A cross-cultural study of address terms in Korean and English.",
        detail: "Doctoral dissertation, University of Hawai'i at Mānoa.",
        url: "https://juniperpublishers.com/oajels/OAJELS.MS.ID.555578.php",
    },
    {
        display: "East Asian Pragmatics. (2024). Kinship terminology comparison in East Asian languages.",
        detail: "East Asian Pragmatics. https://doi.org/10.3138/eap-2024-0216",
        url: "https://utppublishing.com/doi/10.3138/eap-2024-0216",
    },
    {
        display: "Sohn, H.-M. (1999). The Korean language.",
        detail: "Cambridge University Press.",
        url: "https://archive.org/details/koreanlanguage0000sohn",
    },
    {
        display: "Sohn, S.-O. (2002). The grammaticalization of honorific particles in Korean.",
        detail: "In I. Wischer & G. Diewald (Eds.), New reflections on grammaticalization (pp. 309–326). John Benjamins.",
        url: "https://muse.jhu.edu/article/805279/summary",
    },
    {
        display: "채완. (2003). 한국어의 의성어와 의태어.",
        detail: "서울대학교출판부. (국립국어원, 새국어생활, 2006, 16(4) 수록본 참조)",
        url: "https://www.korean.go.kr/nkview/nklife/2006_4/2006_0411.pdf",
    },
    {
        display: "Imai, M., & Kita, S. (2014). The sound symbolism bootstrapping hypothesis.",
        detail: "Philosophical Transactions of the Royal Society B, 369(1651), 20130298.",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4123677/",
    },
    {
        display: "Berlin, B., & Kay, P. (1969). Basic color terms: Their universality and evolution.",
        detail: "University of California Press.",
        url: "https://www.wonderfulcolors.org/blog/basic-color-terms-their-universality-and-evolution-by-berlin-and-kay/",
    },
];

export default function PresentationGraduation2({ onClose }: PresentationGraduationProps) {
    const [mounted, setMounted] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isBookOpen, setIsBookOpen] = useState(false);
    const [activeRef2, setActiveRef2] = useState<{ id: number; x: number; y: number } | null>(null);
    const totalSlides = 7; // 0: Title, 1-3: Text, 4: Book Cover, 5: Exhibition Sketch, 6: Outro/Copyright
    const isScrolling = useRef(false);

    useEffect(() => { setMounted(true); }, []);

    // ── Wheel & Keyboard navigation for the background slides ────────────────
    useEffect(() => {
        if (isBookOpen) return; // Disable background scrolling when book is open

        const handleWheel = (e: WheelEvent) => {
            if (isScrolling.current) return;
            isScrolling.current = true;
            if (e.deltaY > 30) {
                setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
            } else if (e.deltaY < -30) {
                setCurrentSlide(prev => Math.max(prev - 1, 0));
            }
            setTimeout(() => { isScrolling.current = false; }, 800);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isScrolling.current) return;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
                isScrolling.current = true;
                setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
                setTimeout(() => { isScrolling.current = false; }, 800);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
                isScrolling.current = true;
                setCurrentSlide(prev => Math.max(prev - 1, 0));
                setTimeout(() => { isScrolling.current = false; }, 800);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentSlide, isBookOpen]);

    if (!mounted) return null;

    const renderBookPages = () => {
        const pages: React.ReactNode[] = [];
        
        // Page 1: Cover (shown alone on the right because showCover=true)
        pages.push(
            <BookPage 
                key="p1" 
                bgImage="/inu-score/visual communication design/graduation/page_01.jpg" 
            />
        );

        // Inner pages: page_02.jpg – page_34.jpg
        // These are double-wide spreads in the PDF, so we split them into left and right halves.
        for (let i = 2; i <= 34; i++) {
            const imgPath = `/inu-score/visual communication design/graduation/page_${String(i).padStart(2, '0')}.jpg`;
            
            // Left half of the spread
            pages.push(
                <BookPage 
                    key={`p${i}_left`} 
                    bgImage={imgPath} 
                    bgPosition="left center" 
                    bgSize="200% 100%" 
                />
            );
            
            // Right half of the spread
            pages.push(
                <BookPage 
                    key={`p${i}_right`} 
                    bgImage={imgPath} 
                    bgPosition="right center" 
                    bgSize="200% 100%" 
                />
            );
        }

        // Back cover: page_35.jpg (Left page, shown alone at the end because showCover=true and total is even)
        pages.push(
            <BookPage 
                key="p35" 
                bgImage="/inu-score/visual communication design/graduation/page_35.jpg" 
            />
        );

        return pages;
    };

    return (
        <>
            {/* Background Slides View (Vertical Scroll) */}
            <div className={styles.ptContainer}>
                {/* ── Global Back Button ── */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: '5.625rem', left: '50px',
                        background: 'transparent', border: 'none', fontSize: '18px',
                        cursor: 'pointer', color: '#666', display: 'flex',
                        alignItems: 'center', gap: '8px', transition: 'color 0.2s ease',
                        zIndex: 10,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#111')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#666')}
                >
                    &larr; Back
                </button>

                {/* ── Side Navigation Indicator ───────────────────────────────── */}
                <div className={styles.slideIndicators}>
                    <div 
                        className={styles.indicatorsInner}
                        style={{ transform: `translateY(${-Math.max(0, Math.min(currentSlide - 2, Math.max(0, totalSlides - 6))) * 40}px)` }}
                    >
                        {Array.from({ length: totalSlides }).map((_, idx) => {
                            const isActive = idx === currentSlide;
                            // Window start is activeIndex - 2, clamped
                            const windowStart = Math.max(0, Math.min(currentSlide - 2, Math.max(0, totalSlides - 6)));
                            const isVisible = totalSlides <= 6 || (idx >= windowStart && idx < windowStart + 6);
                            
                            return (
                                <div
                                    key={idx}
                                    className={`${styles.indicatorWrapper} ${isActive ? styles.active : ''}`}
                                    style={{ 
                                        opacity: isVisible ? (isActive ? 1 : 0.3) : 0,
                                        pointerEvents: isVisible ? 'auto' : 'none',
                                        visibility: isVisible ? 'visible' : 'hidden'
                                    }}
                                    onClick={() => setCurrentSlide(idx)}
                                >
                                    <div className={styles.indicatorLine} />
                                    <span>{String(idx + 1).padStart(2, '0')}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Slides Wrapper ────────────────────────────────────────────── */}
                <div className={styles.slidesWrapper} style={{ transform: `translateY(-${currentSlide * 100}vh)` }}>
                    {/* SLIDE 0: TITLE */}
                    <div className={styles.slide}>
                        <div className={styles.titleContainer}>
                            <h1 className={styles.mainTitle}>Forms of Words</h1>
                        </div>
                    </div>

                    {/* SLIDE 1: CHAPTER 1 */}
                    <div className={styles.slide}>
                        <div className={styles.chapterLayout}>
                            <div className={styles.chapterLeft}>
                                <h2 className={styles.chapterTitle}>
                                    <span className={styles.chapterNum}>1.</span> 작업 주제
                                </h2>
                            </div>
                            <div className={styles.chapterRight}>
                                <div className={styles.chapterBody}>
                                    <P>
                                        한국어에는 영어로 1:1 직접 번역이 불가능한 단어들이 있습니다. 형/오빠/동생, 파랗다/푸르다, 눈치, 정(情)과 같은 단어들은 한국어 화자에게 실재하는 감각이지만 번역 과정에서 의미의 상당 부분이 소실됩니다. 이 작업의 핵심 주제는 언어에는 존재하지만 형태가 없는 이 소실되는 영역에 시각적 형태를 부여하는 것입니다.
                                    </P>
                                    <P>
                                        단순한 소통의 도구를 넘어, 특정 언어에만 존재하는 단어는 그 언어 공동체가 세대를 거쳐 명명해온 감각과 사회적 작동 방식을 압축적으로 담고 있습니다. 본 프로젝트는 두 언어 간의 어휘 체계가 엇갈리는 다양한 양상을 포착하여, 번역 불가능성의 실체를 객관적인 데이터 아카이빙 형태로 시각화하고자 합니다.
                                    </P>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 2: CHAPTER 2 */}
                    <div className={styles.slide}>
                        <div className={styles.chapterLayout}>
                            <div className={styles.chapterLeft}>
                                <h2 className={styles.chapterTitle}>
                                    <span className={styles.chapterNum}>2.</span> 작업 내용 및 분류 기준 검토
                                </h2>
                            </div>
                            <div className={styles.chapterRight}>
                                <div className={styles.chapterBody}>
                                    <P>
                                        지난 1차 PT에서는 단어들을 구체적으로 어떻게 분류할지에 대한 명확한 기준 없이, 번역되지 않는 단어들을 시각화하는 방식 자체에 집중하며 분류 기준은 추후 모색하기로 하였습니다. 이후 학술적 피드백을 바탕으로, 단순히 의미 도메인별로 묶는 방식을 넘어 <strong>&lsquo;번역이 불가능한 원인(reason for untranslatability)&rsquo;</strong>을 기준으로 단어들을 분류하는 방안을 검토 중입니다.
                                    </P>
                                    <P>
                                        구체적으로는 두 언어 간에 개념의 경계가 다르게 그어진 경우(범주 경계 불일치), 영어에 해당 표현 시스템 자체가 존재하지 않는 경우(체계적 구조 부재), 그리고 대응하는 개념 자체가 없는 경우(개념적 공백)의 세 가지 측면에서 단어들의 위치를 파악하려 합니다. 아직 기준을 완전히 확정한 것은 아니며, 이 방향성을 바탕으로 단어들의 맥락을 입체적으로 구성해보고자 합니다.
                                    </P>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 3: CHAPTER 3 */}
                    <div className={styles.slide}>
                        <div className={styles.chapterLayout}>
                            <div className={styles.chapterLeft}>
                                <h2 className={styles.chapterTitle}>
                                    <span className={styles.chapterNum}>3.</span> 이론적 배경 및 기준의 장단점
                                </h2>
                            </div>
                            <div className={styles.chapterRight}>
                                <div className={styles.chapterBody}>
                                    <P>
                                        이러한 분류를 위해 어휘 유형론(lexical typology) 및 비교언어학의 논문들을 검토하고 있습니다. 친족어의 경계 차이는 King(2006)<sup className={styles.refSup} onMouseEnter={(e) => setActiveRef2({ id: 0, x: e.clientX, y: e.clientY })} onMouseMove={(e) => setActiveRef2(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : prev)} onMouseLeave={() => setActiveRef2(null)}>1</sup>·Koh(2002)<sup className={styles.refSup} onMouseEnter={(e) => setActiveRef2({ id: 1, x: e.clientX, y: e.clientY })} onMouseMove={(e) => setActiveRef2(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : prev)} onMouseLeave={() => setActiveRef2(null)}>2</sup>과 동아시아 비교 연구<sup className={styles.refSup} onMouseEnter={(e) => setActiveRef2({ id: 2, x: e.clientX, y: e.clientY })} onMouseMove={(e) => setActiveRef2(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : prev)} onMouseLeave={() => setActiveRef2(null)}>3</sup>를, 색채어의 경계 차이는 Berlin &amp; Kay(1969)<sup className={styles.refSup} onMouseEnter={(e) => setActiveRef2({ id: 7, x: e.clientX, y: e.clientY })} onMouseMove={(e) => setActiveRef2(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : prev)} onMouseLeave={() => setActiveRef2(null)}>8</sup>를, 경어의 구조적 차이는 Sohn(1999)<sup className={styles.refSup} onMouseEnter={(e) => setActiveRef2({ id: 3, x: e.clientX, y: e.clientY })} onMouseMove={(e) => setActiveRef2(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : prev)} onMouseLeave={() => setActiveRef2(null)}>4</sup>·Sohn(2002)<sup className={styles.refSup} onMouseEnter={(e) => setActiveRef2({ id: 4, x: e.clientX, y: e.clientY })} onMouseMove={(e) => setActiveRef2(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : prev)} onMouseLeave={() => setActiveRef2(null)}>5</sup>를, 의태어의 구조적 차이는 채완(2003)<sup className={styles.refSup} onMouseEnter={(e) => setActiveRef2({ id: 5, x: e.clientX, y: e.clientY })} onMouseMove={(e) => setActiveRef2(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : prev)} onMouseLeave={() => setActiveRef2(null)}>6</sup>·Imai &amp; Kita(2014)<sup className={styles.refSup} onMouseEnter={(e) => setActiveRef2({ id: 6, x: e.clientX, y: e.clientY })} onMouseMove={(e) => setActiveRef2(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : prev)} onMouseLeave={() => setActiveRef2(null)}>7</sup>를, 정서어의 개념적 차이는 Wierzbicka(1997)의 연구를 참조하고 있습니다.
                                    </P>
                                    <P>
                                        원인 기반 분류는 학술적 분석 방법론과 1:1로 대응되어 시각화의 논리적 일관성을 확보할 수 있다는 큰 장점이 있습니다. 그러나 &lsquo;정서·관계어&rsquo; 영역은 언어학보다 문화심리학적 성격이 강해 어휘유형론적 근거가 상대적으로 제한적(B급)이며, &lsquo;개념의 부재&rsquo;를 어디까지 인정할 것인지 경계가 불분명하다는 한계도 존재합니다.
                                    </P>
                                    <P>
                                        따라서 학술적 신뢰도가 높은 A급 영역(친족어, 경어, 의성·의태어, 색채어)을 중심축으로 잡고, 자료가 부족한 식감어 등은 하위 범주나 보조적 사례로 다루며 논리적 허점을 보완하는 방향으로 시각화 기준을 다듬어갈 계획입니다.
                                    </P>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 4: CHAPTER 4 (BOOK PREVIEW) */}
                    <div className={styles.slide}>
                        <div className={styles.chapterLayout}>
                            <div className={styles.chapterLeft}>
                                <h2 className={styles.chapterTitle}>
                                    <span className={styles.chapterNum}>4.</span> 메인 그래픽 이미지 외 작업 진행 내용
                                </h2>
                            </div>
                            <div className={styles.chapterRight}>
                                <div className={styles.chapterBody}>
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <div 
                                            style={{ 
                                                position: 'relative', 
                                                width: '350px', 
                                                height: '450px', 
                                                cursor: 'pointer',
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                                transition: 'transform 0.3s ease'
                                            }}
                                            onClick={() => setIsBookOpen(true)}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                        >
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#1a1a1a',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '2px',
                                            }}>
                                                <span style={{
                                                    fontFamily: '"garamond-premier-pro", Georgia, "Times New Roman", serif',
                                                    fontSize: '28px',
                                                    fontWeight: 400,
                                                    color: '#ffffff',
                                                    letterSpacing: '0.15em',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    Cover
                                                </span>
                                            </div>
                                            {/* Hover Overlay with Magnifying Glass */}
                                            <div style={{
                                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                                backgroundColor: 'rgba(0,0,0,0.4)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                opacity: 0, transition: 'opacity 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                            onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                                            >
                                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="11" cy="11" r="8"></circle>
                                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                                    <line x1="11" y1="8" x2="11" y2="14"></line>
                                                    <line x1="8" y1="11" x2="14" y2="11"></line>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 5: EXHIBITION SKETCH */}
                    <div className={styles.slide}>
                        <div className={styles.chapterLayout}>
                            <div className={styles.chapterLeft}>
                                <h2 className={styles.chapterTitle}>
                                    <span className={styles.chapterNum}>5.</span> 전시 스케치
                                </h2>
                            </div>
                            <div className={styles.chapterRight}>
                                <div className={styles.chapterBody}>
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src="/inu-score/visual communication design/graduation/exhibition_sketch_v3_white_hanji.png"
                                            alt="Exhibition Sketch"
                                            style={{ 
                                                width: '100%', 
                                                maxWidth: '800px', 
                                                height: 'auto', 
                                                display: 'block' 
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 6: OUTRO / COPYRIGHT */}
                    <div className={styles.slide}>
                        <div className={styles.titleContainer}>
                            <h1 className={styles.mainTitle}>
                                (c) 2026. Yoonhyeok Kim. all rights reserved.
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── 3D FLIPBOOK LIGHTBOX MODAL ─────────────────────────────────────── */}
            {isBookOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    zIndex: 9999,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                    {/* Close Button (Matching Global Back Button style & position) */}
                    <button 
                        onClick={() => setIsBookOpen(false)}
                        style={{
                            position: 'absolute', top: '5.625rem', left: '50px',
                            background: 'transparent', border: 'none', fontSize: '18px',
                            cursor: 'pointer', color: 'rgba(0, 0, 0, 0.7)', display: 'flex',
                            alignItems: 'center', gap: '8px', transition: 'color 0.2s ease',
                            zIndex: 10000,
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#000')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0, 0, 0, 0.7)')}
                    >
                        &larr; Back
                    </button>

                    {/* Instruction */}
                    <div style={{
                        position: 'absolute', top: '40px', color: 'rgba(0, 0, 0, 0.4)',
                        fontSize: '12px', letterSpacing: '0.5px', textTransform: 'uppercase'
                    }}>
                        Drag corners or click to turn pages
                    </div>

                    {/* Book Component */}
                    <div style={{ width: '90%', maxWidth: '1200px', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* @ts-expect-error - react-pageflip types are incomplete and do not cover all props perfectly */}
                        <HTMLFlipBook
                            width={450}
                            height={580}
                            size="stretch"
                            minWidth={315}
                            maxWidth={1000}
                            minHeight={400}
                            maxHeight={1533}
                            maxShadowOpacity={0.1}
                            showCover={true}
                            mobileScrollSupport={true}
                            className="demo-book"
                            style={{ margin: '0 auto', boxShadow: '0 30px 60px rgba(0,0,0,0.12), 0 10px 20px rgba(0,0,0,0.06)' }}
                        >
                            {renderBookPages()}
                        </HTMLFlipBook>
                    </div>
                </div>
            )}

            {/* ── Reference Tooltip ── */}
            {activeRef2 && (
                <div
                    className={styles.refTooltip}
                    style={{
                        left: Math.max(12, (activeRef2?.x ?? 0) - 380),
                        top: Math.max(12, (activeRef2?.y ?? 0) - 20),
                    }}
                >
                    <p className={styles.refTooltipKo}>
                        <strong>{GRAD2_REF_LIST[activeRef2?.id ?? 0]?.display}</strong>{' '}
                        {GRAD2_REF_LIST[activeRef2?.id ?? 0]?.detail}
                    </p>
                    <a
                        href={GRAD2_REF_LIST[activeRef2?.id ?? 0]?.url ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.refTooltipUrl}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {GRAD2_REF_LIST[activeRef2?.id ?? 0]?.url}
                    </a>
                </div>
            )}
        </>
    );
}
