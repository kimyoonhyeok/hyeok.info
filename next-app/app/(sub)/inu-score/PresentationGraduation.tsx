'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './pt.module.css';
import HTMLFlipBook from 'react-pageflip';

type PresentationGraduationProps = {
    onClose: () => void;
};

const BookPage = React.forwardRef<HTMLDivElement, { bgImage: string; bgPosition: string; bgSize: string; isCover?: boolean }>((props, ref) => {
    return (
        <div className="demoPage" ref={ref}>
            <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#fff',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
                backgroundImage: props.bgImage ? `url(${props.bgImage})` : 'none',
                backgroundPosition: props.bgPosition,
                backgroundSize: props.bgSize,
                backgroundRepeat: 'no-repeat',
            }} />
        </div>
    );
});
BookPage.displayName = 'BookPage';

const P = ({ children }: { children: React.ReactNode }) => (
    <p style={{ textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word', marginBottom: '1.2em', marginTop: 0, lineHeight: 1.6, fontSize: '1.1rem', color: '#333' }}>
        {children}
    </p>
);

export default function PresentationGraduation({ onClose }: PresentationGraduationProps) {
    const [mounted, setMounted] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isBookOpen, setIsBookOpen] = useState(false);
    const totalSlides = 5; // 0: Title, 1-3: Text, 4: Book Cover
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

    // Helper to generate the pages properly based on spreads
    const renderBookPages = () => {
        const pages = [];
        
        // Page 1: Blank White Page (Left side of the cover spread)
        pages.push(
            <BookPage key="p_blank_start" bgImage="" bgPosition="center" bgSize="cover" />
        );

        // Page 2: 01.png (Right page, Cover)
        pages.push(
            <BookPage key="p1" bgImage="/inu-score/graduation/01.png" bgPosition="center" bgSize="cover" />
        );

        // Pages 2 to 21: 02.png to 11.png (Spreads)
        for (let i = 2; i <= 11; i++) {
            const imgPath = `/inu-score/graduation/${String(i).padStart(2, '0')}.png`;
            // Left half of the spread
            pages.push(
                <BookPage key={`p${i}_left`} bgImage={imgPath} bgPosition="left center" bgSize="200% 100%" />
            );
            // Right half of the spread
            pages.push(
                <BookPage key={`p${i}_right`} bgImage={imgPath} bgPosition="right center" bgSize="200% 100%" />
            );
        }

        // Page 23: 12.png (Left page, Back Cover)
        pages.push(
            <BookPage key="p22" bgImage="/inu-score/graduation/12.png" bgPosition="center" bgSize="cover" />
        );

        // Page 24: Blank White Page (Right side of the back cover spread)
        pages.push(
            <BookPage key="p_blank_end" bgImage="" bgPosition="center" bgSize="cover" />
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
                    <div className={styles.indicatorsInner} style={{ transform: `translateY(${138 - currentSlide * 44}px)` }}>
                        {Array.from({ length: totalSlides }).map((_, idx) => {
                            const absOffset = Math.abs(idx - currentSlide);
                            const isActive = idx === currentSlide;
                            return (
                                <div
                                    key={idx}
                                    className={`${styles.indicatorWrapper} ${isActive ? styles.active : ''}`}
                                    style={{
                                        transform: `translateX(-${Math.min(absOffset * absOffset * 2.5, 18)}px) scale(${isActive ? 1 : 0.85})`,
                                        opacity: isActive ? 1 : 0.3,
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
                                        언어에는 존재하지만 형태가 없는 것이 있습니다.<br />
                                        한국어에는 다른 언어로 직접 번역되지 않는 단어들이 있습니다. 눈치, 정(情), 한(恨), 체면, 빨리빨리. 이 단어들은 한국어 화자에게 실재하는 감각으로 기능하지만, 대응하는 외국어 단어가 존재하지 않으며, 가장 근접한 번역어를 선택하더라도 그 의미의 상당 부분이 번역의 과정에서 소실됩니다.
                                    </P>
                                    <P>
                                        이 책은 그 소실되는 영역에 관한 기록입니다. 언어에는 존재하지만 형태가 없는 것에 시각적 형태를 부여하는 것, 이것이 이 작업의 주제<sup>1</sup>입니다. 언어는 단순한 소통의 도구가 아닙니다. 언어는 한 사회가 어떤 경험을 공유 가능한 것으로 간주하며, 어떤 감각을 이름 붙일 만큼 반복적이고 실재하는 것으로 여기는지를 보여주는 구조적 기록<sup>2</sup>입니다. 특정 언어에만 존재하는 단어는 그 언어 공동체가 세대를 거쳐 명명해온 감각과 그 사회의 작동 방식을 압축적으로 담고 있습니다.
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
                                    <span className={styles.chapterNum}>2.</span> 작업 내용
                                </h2>
                            </div>
                            <div className={styles.chapterRight}>
                                <div className={styles.chapterBody}>
                                    <P>
                                        이 책에는 영어 단어 하나로 1:1 치환이 불가능한 한국어 단어 및 표현 75개가 수록되어 있습니다. 현재로서는 이 단어들이 존재하게 된 한국의 사회적 조건을 분석하여, 다음과 같은 네 가지 범주로 분류하는 체계를 고려하고 있습니다. 첫 번째 범주인 유교적 위계에서는 나이와 지위가 관계를 규정하는 구조 속의 단어들을(체면, 선후배, 꼰대 등), 두 번째 정서의 축적과 억압에서는 내면에 쌓이는 감정들(한, 정, 서운하다 등)을 다루는 방안을 검토 중입니다. 또한 비언어적 소통을 다루는 집단적 감각 읽기<sup>1</sup>(눈치, 우리 등), 그리고 근대화 이후의 긴장을 다루는 속도와 압박의 내면화(빨리빨리, 칼퇴 등) 등의 범주화를 통해 단어들의 사회적 맥락을 입체적으로 구성해보고자 합니다.
                                    </P>
                                    <P>
                                        각 단어는 정의, 상황, 시각 이미지의 순서로 기록됩니다. 정의는 사전적 풀이를 넘어 그 단어가 어떤 사회적 조건 속에서 어떻게 기능하는지를 서술합니다. 상황은 그 단어가 실제로 발화되거나 체험되는 구체적 맥락을 제시합니다. 시각 이미지는 단어가 가리키는 감각을 시각적 형태로 번역한 이미지입니다. 언어적 서술이 닿지 못하는 지점에 이미지가 도달하기를 기대합니다.
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
                                    <span className={styles.chapterNum}>3.</span> 작업 필요성
                                </h2>
                            </div>
                            <div className={styles.chapterRight}>
                                <div className={styles.chapterBody}>
                                    <P>
                                        한국 문화를 가시화하는 데 있어 한옥, 한식, 전통 색채와 같은 물질적·표면적 소재를 경유하는 방식은 이미 폭넓게 존재합니다. 이 프로젝트는 그러한 접근과 다른 경로를 제안합니다. 한국어라는 언어 자체가 담고 있는 구조로부터 한국 사회를 읽어내는 것입니다.
                                    </P>
                                    <P>
                                        이 작업이 필요한 이유는 두 가지입니다. 첫째, 단어의 의미를 언어로만 풀어쓰는 것만으로는 전달에 한계가 있습니다. 특히 번역 불가능한 단어들은 정의문을 읽더라도 그 감각에 온전히 도달하기 어렵습니다. 이미지를 통해 그 단어의 감각에 접근하는 구조<sup>1</sup>를 구축함으로써, 해당 언어를 모르는 사람도 그 단어들이 가리키는 경험에 도달할 수 있는 경로를 만들고자 합니다.
                                    </P>
                                    <P>
                                        둘째, 이 작업은 한국어 화자 자신을 향한 것이기도 합니다. 당연하게 사용해온 단어들이 실은 어떤 사회적 조건 위에서 존재하는지를 낯설게 바라보는 기회<sup>2</sup>를 제공합니다. 내가 사용하는 언어, 내가 당연하게 여기는 위계 감각, 내가 설명 없이도 이해하는 감정들. 이 모든 것이 특정한 사회문화적 조건 속에서 형성된 것이라면, 그 단어들을 가시화하는 작업은 곧 나를 구성하는 조건들을 가시화하는 작업<sup>3</sup>이 됩니다.
                                    </P>
                                    <P>
                                        이 책은 번역될 수 없는 것들에 대한 기록입니다. 언어에는 존재하지만 형태가 없는 것에 형태를 부여하려 했습니다.
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
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img 
                                                src="/inu-score/graduation/01.png" 
                                                alt="Book Cover" 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2px' }} 
                                            />
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
                </div>
            </div>

            {/* ── 3D FLIPBOOK LIGHTBOX MODAL ─────────────────────────────────────── */}
            {isBookOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    zIndex: 9999,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                    {/* Close Button (Matching Global Back Button style & position) */}
                    <button 
                        onClick={() => setIsBookOpen(false)}
                        style={{
                            position: 'absolute', top: '5.625rem', left: '50px',
                            background: 'transparent', border: 'none', fontSize: '18px',
                            cursor: 'pointer', color: 'rgba(255,255,255,0.8)', display: 'flex',
                            alignItems: 'center', gap: '8px', transition: 'color 0.2s ease',
                            zIndex: 10000,
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
                    >
                        &larr; Back
                    </button>

                    {/* Instruction */}
                    <div style={{
                        position: 'absolute', top: '40px', color: 'rgba(255,255,255,0.4)',
                        fontSize: '12px', letterSpacing: '0.5px', textTransform: 'uppercase'
                    }}>
                        Drag corners or click to turn pages
                    </div>

                    {/* Book Component */}
                    <div style={{ width: '90%', maxWidth: '1200px', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* @ts-ignore */}
                        <HTMLFlipBook
                            width={450}
                            height={600}
                            size="stretch"
                            minWidth={315}
                            maxWidth={1000}
                            minHeight={400}
                            maxHeight={1533}
                            maxShadowOpacity={0.1}
                            showCover={false}
                            mobileScrollSupport={true}
                            className="demo-book"
                            style={{ margin: '0 auto', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}
                        >
                            {renderBookPages()}
                        </HTMLFlipBook>
                    </div>
                </div>
            )}
        </>
    );
}
