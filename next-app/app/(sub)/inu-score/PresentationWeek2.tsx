'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './pt.module.css';

type PresentationWeek2Props = {
    onClose: () => void;
    onOpenMainPoster: () => void;
    onOpenApp: () => void;
};

// ── Shared paragraph style: keep-all + left-align, no hyphens ─────────────────────
const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p style={{ textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word', marginBottom: '1.2em', marginTop: 0 }}>
        {children}
    </p>
);

export default function PresentationWeek2({ onClose, onOpenMainPoster, onOpenApp }: PresentationWeek2Props) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [subSlide, setSubSlide] = useState(0);
    const totalSlides = 10;
    const isScrolling = useRef(false);

    // ── Wheel & Keyboard navigation ──────────────────────────────────────────
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isScrolling.current) return;
            isScrolling.current = true;

            if (e.deltaY > 30) {
                if (currentSlide === 6 && subSlide < 1) {
                    setSubSlide(1);
                } else {
                    setCurrentSlide(prev => {
                        const next = Math.min(prev + 1, totalSlides - 1);
                        if (prev !== next) setSubSlide(0);
                        return next;
                    });
                }
            } else if (e.deltaY < -30) {
                if (currentSlide === 6 && subSlide > 0) {
                    setSubSlide(0);
                } else {
                    setCurrentSlide(prev => {
                        const next = Math.max(prev - 1, 0);
                        if (next === 6) setSubSlide(1);
                        return next;
                    });
                }
            }
            setTimeout(() => { isScrolling.current = false; }, 800);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isScrolling.current) return;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                isScrolling.current = true;
                if (currentSlide === 6 && subSlide < 1) {
                    setSubSlide(1);
                } else {
                    setCurrentSlide(prev => {
                        const next = Math.min(prev + 1, totalSlides - 1);
                        if (prev !== next) setSubSlide(0);
                        return next;
                    });
                }
                setTimeout(() => { isScrolling.current = false; }, 800);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                isScrolling.current = true;
                if (currentSlide === 6 && subSlide > 0) {
                    setSubSlide(0);
                } else {
                    setCurrentSlide(prev => {
                        const next = Math.max(prev - 1, 0);
                        if (next === 6) setSubSlide(1);
                        return next;
                    });
                }
                setTimeout(() => { isScrolling.current = false; }, 800);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentSlide, subSlide]);

    // ── Touch swipe ──────────────────────────────────────────────────────────
    const touchStart = useRef(0);
    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => { touchStart.current = e.touches[0].clientY; };
        const handleTouchEnd = (e: TouchEvent) => {
            if (isScrolling.current) return;
            const diff = touchStart.current - e.changedTouches[0].clientY;
            if (Math.abs(diff) > 50) {
                isScrolling.current = true;
                if (diff > 0) {
                    if (currentSlide === 6 && subSlide < 1) { setSubSlide(1); }
                    else { setCurrentSlide(prev => { const n = Math.min(prev + 1, totalSlides - 1); if (prev !== n) setSubSlide(0); return n; }); }
                } else {
                    if (currentSlide === 6 && subSlide > 0) { setSubSlide(0); }
                    else { setCurrentSlide(prev => { const n = Math.max(prev - 1, 0); if (n === 6) setSubSlide(1); return n; }); }
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
    }, [currentSlide, subSlide]);

    // ── "Land to" link style ─────────────────────────────────────────────────
    const landLinkStyle: React.CSSProperties = {
        display: 'inline-block',
        fontSize: '20px',
        fontWeight: 400,
        color: '#111',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'color 0.2s ease',
        textAlign: 'left',
        lineHeight: 1.4,
        userSelect: 'none',
    };

    return (
        <>
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
                    style={{ transform: `translateY(${138 - currentSlide * 44}px)` }}
                >
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
                                onClick={() => { setCurrentSlide(idx); setSubSlide(0); }}
                                title={`Slide ${idx + 1}`}
                            >
                                <div className={styles.indicatorLine} />
                                <span>{String(idx + 1).padStart(2, '0')}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Slide Wrapper ────────────────────────────────────────────── */}
            <div
                className={styles.slidesWrapper}
                style={{ transform: `translateY(-${currentSlide * 100}vh)` }}
            >

                {/* ── SLIDE 0: TITLE ─── */}
                <div className={styles.slide}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.mainTitle}>
                            Epistemic Asymmetry: Divergent consequences of a single image
                        </h1>
                    </div>
                </div>

                {/* ── SLIDE 1: TABLE OF CONTENTS ─── */}
                <div className={styles.slide}>
                    <div className={styles.tocLayout}>
                        <div className={styles.tocLeft} />
                        <div className={styles.tocRight}>
                            <ol className={styles.tocList}>
                                <li>내가 선택한 &ldquo;서로 다른&rdquo; A와 B 소개</li>
                                <li>A와 B의 관계 유형</li>
                                <li>작업의 필요성/배경: 왜</li>
                                <li>작업을 통해 하고자 하는 것 혹은 작업의 주제/목적: 무엇을</li>
                                <li>A와 B 관련 배경지식/이론</li>
                                <li>작업의 목적/주제를 위한 해결 방안, 시각화 방안, 시각화 요소</li>
                                <li>MainPoster (420×594mm)</li>
                                <li>Application, Web</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 2: CHAPTER 1 ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>1.</span> 내가 선택한 &ldquo;서로 다른&rdquo; A와 B 소개
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P>본 작업에서 A는 세 종류의 원추세포(L, M, S)의 신호를 모두 활용해 색을 구분하는 정상 삼색 색각(trichromat)을 지칭하며, &ldquo;표준 시각&rdquo;의 기준으로 전제된다.</P>
                                <P>B는 색각 결함(Color Vision Deficiency, CVD)을 지닌 관찰자를 의미하며, Protanopia(제1색맹), Deuteranopia(제2색맹), Tritanopia(제3색맹)의 세 유형으로 세분된다. Protanopia는 장파장에 민감한 L-원추세포 기능이 결손된 상태, Deuteranopia는 중파장에 민감한 M-원추세포가 결손된 상태, Tritanopia는 단파장에 민감한 S-원추세포가 결손된 상태로, 각기 적–녹, 청–황의 구분 방식에 다른 제한을 가져온다.</P>
                                <P>이처럼 A와 B는 동일한 물리적 자극을 전혀 다른 색채 공간에서 해석하는 두 집단으로 설정되며, 하나의 이미지를 둘러싼 상이한 지각 체계를 극명하게 대비시키는 역할을 한다.</P>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 3: CHAPTER 2 ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>2.</span> A와 B의 관계 유형
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P>정상 색각은 통계적 다수와 산업 표준에 의해 &ldquo;기본값(default)&rdquo;이자 규범적 시각으로 간주되며, 색각 결함은 이에 비해 보조적이거나 결핍된 것으로 취급되는 경향이 있다. 이는 정보 디자인, UI, 교육 자료에서 색을 사용하는 방식이 주로 정안자의 지각을 기준으로 설계되고, 색각 결함자를 부차적 대상으로 위치시키는 일종의 지각적 권력관계로 작동한다.</P>
                                <P>본 작업은 같은 이미지가 A에게는 &ldquo;자명하고 자연스러운&rdquo; 것으로, B에게는 &ldquo;부분적으로 누락되거나 전혀 다른 구조를 지닌&rdquo; 것으로 경험된다는 점에 주목하며, 동일 이미지가 실은 권력적으로 편향된 해석의 장이라는 사실을 드러내고자 한다.</P>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 4: CHAPTER 3 ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>3.</span> 작업의 필요성/배경: 왜
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P>인간의 인지 활동에서 시각은 가장 지배적인 감각으로, 장면 분할, 물체 인식, 장면 기억 형성에 핵심적인 역할을 단서로 한다. 특히 색채는 물체의 동일성, 상태, 의미를 빠르게 판단하는 데 사용되는 강력한 단서로, 자연 장면에서 사물 경계를 분리하고 기억 재인 성능을 향상시키는 것으로 보고된다.</P>
                                <P>그럼에도 불구하고 색각 결함은 &ldquo;예외적인 소수&rdquo;의 문제로 축소되며, 우리가 &ldquo;보편적&rdquo;이라 생각해온 이미지와 색채 체계가 실제로는 극도로 비대칭적이고 일부 집단에게 불리하다는 점은 충분히 인식되지 못하고 있다.</P>
                                <P>본 작업은 이러한 인지적·사회적 비대칭을 가시화함으로써, 우리가 당연시하는 시각적 세계가 얼마나 불안정하고 불평등한 구조 위에 놓여 있는지를 탐구하려는 시도이다.</P>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 5: CHAPTER 4 ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>4.</span> 작업을 통해 하고자 하는 것 혹은 작업의 주제/목적: 무엇을
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P>본 작업은 동일한 이미지가 Protanopia, Deuteranopia, Tritanopia 각각의 색각 결함 유형에 따라 상이한 색채 구조와 형태적 강조를 갖는 전혀 다른 이미지로 재구성됨을 시각화한다.</P>
                                <P>이를 통해 &ldquo;정상 시각&rdquo;이라는 개념이 절대적 기준이 아니라 특정 생물학적·통계적 조건에 기초한 상대적 구성물에 불과하다는 점을 드러내고, 시지각의 다양성을 존중하는 새로운 시각적 규범을 모색하고자 한다.</P>
                                <P>동일한 물리적 자극이 각 개인의 시각 시스템에 따라 서로 다른 지각적 현실로 번역된다는 사실을 전면에 배치함으로써, 작업은 시각적 형평성과 접근성을 예외적 배려가 아닌 설계의 전제 조건으로 사유하도록 요구한다.</P>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 6: CHAPTER 5 — 배경지식/이론 (2 sub-slides) ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout} style={{ position: 'relative', top: '2.5rem' }}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>5.</span> A와 B 관련 배경지식/이론
                            </h2>
                        </div>

                        <div className={styles.chapterRight} style={{ position: 'relative' }}>
                            <div style={{ flex: 1, display: 'grid' }}>
                                <div className={styles.chapterBody} style={{ gridArea: '1 / 1', opacity: subSlide === 0 ? 1 : 0, pointerEvents: subSlide === 0 ? 'auto' : 'none', transition: 'opacity 0.3s ease' }}>
                                    <P>본 작업은 색각 이상을 단순한 생물학적 &ldquo;결손&rdquo;이 아니라, 지식 생산과 사회적 참여에서 구조적 불평등을 야기하는 인식론적 불의(epistemic injustice)의 한 양상으로 이해하는 데서 출발한다. Fricker는 『Epistemic Injustice』(2007)에서 특정 집단이 &ldquo;알고 있는 자(knower)&rdquo;로서 정당한 신뢰와 이해를 박탈당할 때 발생하는 부당함을 증언적 불의(testimonial injustice)와 해석학적 불의(hermeneutical injustice)로 구분한다.</P>
                                    <P>색각 이상자는 실제 생활에서 안전, 교육, 직업 선택 등 다양한 영역에서 색 정보에 의존하는 과제를 수행하며 상당한 어려움을 겪지만, 그 어려움은 &ldquo;별문제 아니다&rdquo;, &ldquo;그냥 적응하면 된다&rdquo;는 식으로 축소되거나 과장된 것으로 의심받기 쉽다. Male et al.(2023)의 연구는 색각 이상자가 정안자에 비해 생활(lifestyle), 정서(emotions), 직업(work) 영역 전반에서 삶의 질(QoL)이 유의미하게 낮다는 점을 CVD-QoL 도구를 통해 계량적으로 보여주며, 색각 이상이 심리적·경제적·직업적 차별과 연결될 수 있음을 지적한다.</P>
                                    <P>의료 현장에서의 인식론적 불의를 분석한 Crichton 등(2017)의 논의는 이 문제를 다른 각도에서 비추어 준다. 이들은 정신질환자가 부정적 낙인과 고정관념 때문에 자신의 증상과 경험을 설명할 때 반복적으로 신뢰를 잃고, 의사의 &ldquo;딱딱한(hard)&rdquo; 증거가 &ldquo;부드러운(soft)&rdquo; 환자 서사보다 우선되면서 지식 생성 과정에서 체계적으로 배제된다고 지적한다.</P>
                                </div>
                                <div className={styles.chapterBody} style={{ gridArea: '1 / 1', opacity: subSlide === 1 ? 1 : 0, pointerEvents: subSlide === 1 ? 'auto' : 'none', transition: 'opacity 0.3s ease' }}>
                                    <P>한국에서는 국가인권위원회가 경찰 공무원 채용 과정에서 색각 이상자를 일률적으로 배제하는 규정이 직업 선택의 자유와 평등권을 침해하는 차별에 해당한다고 판단하고, 관련 규정의 개정을 권고한 바 있다. 당시 조사에서 동일한 &ldquo;중등도&rdquo; 혹은 &ldquo;고도&rdquo; 색각 이상으로 분류된 사람들 사이에서도 실제 색 구분 능력은 크게 달랐음에도, 제도는 이런 차이를 고려하지 않은 채 색각 이상 전반을 위험·무능의 범주로 묶어 배제하고 있었다.</P>
                                    <P>Alford-Duguid(2024)는 지각의 &ldquo;구조(structure)&rdquo;—예를 들어 시야의 경계나 배열 방식처럼, 내용과는 다른 층위의 형식적 특징—가 세계에 대한 우리의 믿음 형성에 독자적인 인식론적 역할을 한다고 주장한다. 그에 따르면 지각 경험은 단지 &ldquo;무엇을 보느냐&rdquo;(대상과 속성)에 대한 정보뿐 아니라, &ldquo;어떻게 보느냐&rdquo;(감각장과 구조)에 관한 정보를 통해서도 외부 세계에 대한 비추론적 정당화를 제공한다.</P>
                                    <P>이와 같이, 색각 이상을 둘러싼 경험과 제도적 현실을 인식론적 불의, 삶의 질 연구, 지각 구조의 인식론적 함의라는 세 층위에서 읽어낼 때, 색을 둘러싼 시각적 세계가 단지 생물학적 차이의 문제가 아니라 지식, 권력, 정의의 문제이기도 하다는 점이 부각된다.</P>
                                </div>
                            </div>

                            {/* Page indicator */}
                            <div style={{
                                position: 'absolute',
                                bottom: '-2rem',
                                right: '0',
                                fontSize: '14px',
                                color: '#aaa',
                                textAlign: 'right',
                                letterSpacing: '0.02em',
                            }}>
                                {subSlide + 1} / 2{subSlide === 0 ? ' ↓' : ''}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 7: CHAPTER 6 ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>6.</span> 작업의 목적/주제를 위한 해결 방안, 시각화 방안, 시각화 요소
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P>작업의 핵심은 형태나 서사보다 색채 자체에 대한 민감도를 전면으로 끌어올리는 데 있으므로, 가능한 한 단순하고 직관적인 이미지를 사용해 관람자가 색의 변형에만 집중할 수 있도록 했다.</P>
                                <P>전 세계적으로 가장 높은 인지도를 가진 회화 중 하나이자, 저작권이 소멸해 공공 영역(public domain)에 속하는 레오나르도 다 빈치의 회화 「모나리자」(Mona Lisa)를 차용함으로써, 이미지 자체의 낯섦이 아니라 색채 구조의 변화에 주의를 집중시키고자 했다. 다만 원화를 촬영·디지털화한 개별 사진은 경우에 따라 별도의 저작권이나 이용 조건이 부여될 수 있기에, 창작적 개입이 최소화된 공공 영역 이미지를 기반으로 작업을 구성함으로써 색채 변형의 문제를 법적·상업적 이해관계로부터 최대한 분리하려 했다.</P>
                                <P>결과적으로 한 행(row)에 배치된 네 개의 이미지는 어떤 관람자에게는 서로 다른 네 가지 색채 구조로, 또 다른 관람자에게는 &ldquo;대체로 비슷해 보이는&rdquo; 네 개의 변주로 인식될 수 있으며, 바로 이 인식의 간극이 작업이 겨냥하는 지각적·정치적 공간이 된다.</P>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 8: CHAPTER 7 — Land to MainPoster ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout} style={{ alignItems: 'center' }}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>7.</span> MainPoster (420×594mm)
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div
                                style={landLinkStyle}
                                onClick={onOpenMainPoster}
                                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.color = '#E74C3C')}
                                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.color = '#111')}
                            >
                                Land to MainPoster(420×594mm) &rarr;
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 9: CHAPTER 8 — Land to Application, Web ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout} style={{ alignItems: 'center' }}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>8.</span> Application, Web
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div
                                style={landLinkStyle}
                                onClick={onOpenApp}
                                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.color = '#E74C3C')}
                                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.color = '#111')}
                            >
                                Land to Application, Web &rarr;
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}
