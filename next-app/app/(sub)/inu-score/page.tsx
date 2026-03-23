"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import styles from "./pt.module.css";

export default function PresentationPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [subSlide, setSubSlide] = useState(0);
    const [mounted, setMounted] = useState(false);
    const totalSlides = 11; // Title + TOC + Ch1 intro + Ch1 examples + Relationship + Background + Purpose + 4 sections
    const isScrolling = useRef(false);

    // Prevent hydration mismatch: only render after mount
    useEffect(() => { setMounted(true); }, []);

    // Disable body scroll globally for this page
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isScrolling.current) return;
            isScrolling.current = true;

            if (e.deltaY > 30) {
                if (currentSlide === 3 && subSlide < 2) {
                    setSubSlide(prev => prev + 1);
                } else {
                    setCurrentSlide((prev) => {
                        const next = Math.min(prev + 1, totalSlides - 1);
                        if (prev !== next) setSubSlide(0);
                        return next;
                    });
                }
            } else if (e.deltaY < -30) {
                if (currentSlide === 3 && subSlide > 0) {
                    setSubSlide(prev => prev - 1);
                } else {
                    setCurrentSlide((prev) => {
                        const next = Math.max(prev - 1, 0);
                        if (next === 3) setSubSlide(2);
                        return next;
                    });
                }
            }

            setTimeout(() => {
                isScrolling.current = false;
            }, 800);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isScrolling.current) return;
            if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                isScrolling.current = true;
                if (currentSlide === 3 && subSlide < 2) {
                    setSubSlide(prev => prev + 1);
                } else {
                    setCurrentSlide((prev) => {
                        const next = Math.min(prev + 1, totalSlides - 1);
                        if (prev !== next) setSubSlide(0);
                        return next;
                    });
                }
                setTimeout(() => { isScrolling.current = false; }, 800);
            } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                isScrolling.current = true;
                if (currentSlide === 3 && subSlide > 0) {
                    setSubSlide(prev => prev - 1);
                } else {
                    setCurrentSlide((prev) => {
                        const next = Math.max(prev - 1, 0);
                        if (next === 3) setSubSlide(2);
                        return next;
                    });
                }
                setTimeout(() => { isScrolling.current = false; }, 800);
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentSlide, subSlide]);

    // Also support touch swiping for mobile
    const touchStart = useRef(0);
    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            touchStart.current = e.touches[0].clientY;
        };
        const handleTouchEnd = (e: TouchEvent) => {
            if (isScrolling.current) return;
            const touchEnd = e.changedTouches[0].clientY;
            const diff = touchStart.current - touchEnd;

            if (Math.abs(diff) > 50) {
                isScrolling.current = true;
                if (diff > 0) {
                    if (currentSlide === 3 && subSlide < 2) {
                        setSubSlide(prev => prev + 1);
                    } else {
                        setCurrentSlide((prev) => {
                            const next = Math.min(prev + 1, totalSlides - 1);
                            if (prev !== next) setSubSlide(0);
                            return next;
                        });
                    }
                } else {
                    if (currentSlide === 3 && subSlide > 0) {
                        setSubSlide(prev => prev - 1);
                    } else {
                        setCurrentSlide((prev) => {
                            const next = Math.max(prev - 1, 0);
                            if (next === 3) setSubSlide(2);
                            return next;
                        });
                    }
                }
                setTimeout(() => { isScrolling.current = false; }, 800);
            }
        };

        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });
        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [currentSlide, subSlide]);

    if (!mounted) return null;

    return (
        <div className={styles.ptContainer}>
            {/* Side Navigation Indicators */}
            <div className={styles.slideIndicators}>
                {Array.from({ length: totalSlides }).map((_, idx) => (
                    <div
                        key={idx}
                        className={`${styles.indicatorWrapper} ${currentSlide === idx ? styles.active : ""}`}
                        onClick={() => {
                            setCurrentSlide(idx);
                            setSubSlide(0); // Reset subSlide whenever jumping via sidebar
                        }}
                        title={`Go to slide ${idx + 1}`}
                    >
                        <div className={styles.indicatorLine} />
                        <span>{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                ))}
            </div>

            <div
                className={styles.slidesWrapper}
                style={{ transform: `translateY(-${currentSlide * 100}vh)` }}
            >
                {/* ─── SLIDE 0: TITLE ─── */}
                <div className={styles.slide}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.mainTitle}>
                            Epistemic Asymmetry: Divergent consequences of a single image
                        </h1>
                    </div>
                </div>

                {/* ─── SLIDE 1: TABLE OF CONTENTS ─── */}
                <div className={styles.slide}>
                    <div className={styles.tocLayout}>
                        <div className={styles.tocLeft} />
                        <div className={styles.tocRight}>
                            <ol className={styles.tocList}>
                                <li>내가 선택한 &ldquo;서로 다른&rdquo; A와 B 소개</li>
                                <li>A와 B의 관계 유형</li>
                                <li>작업의 필요성 / 배경: 왜</li>
                                <li>작업을 통해 하고자 하는 것 혹은 작업의 주제 / 목적: 무엇을</li>
                                <li>A와 B 관련 배경지식 / 이론</li>
                                <li>포스터 디자인 소개: 손 스케치 및 초안</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* ─── SLIDE 2: CHAPTER 1 — A & B Introduction ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>1.</span> 내가 선택한 &ldquo;서로 다른&rdquo; A와 B 소개
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <p className={styles.chapterLabel}>
                                Epistemic Asymmetry: Divergent consequences of a single image &mdash; 권력 관계에 따른 이미지 해석
                            </p>
                            <p className={styles.chapterBody}>
                                본 프로젝트에서 A와 B는 동일한 시각 정보를 마주하는 상반된 관찰자입니다.
                                A는 생물학적 조건이나 후천적 지식의 부재로 이미지를 표면적으로만 인지하며,
                                B는 해독 능력을 갖추어 심층적 정보를 추출할 수 있는 관찰자로 구분합니다.
                                이를 바탕으로 4가지 예시(추가될 예정)를 설정했습니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ─── SLIDE 3: CHAPTER 1 — 4 Examples ─── */}
                <div className={styles.slide}>
                    <div className={`${styles.examplesLayout} ${currentSlide === 3 ? styles.active : ""} ${styles[`subStep${subSlide}`]}`}>
                        <div className={styles.exampleRow}>
                            <div className={styles.exampleA}>A &mdash; 적록색을 구분하지 못하는 색각이상자</div>
                            <div className={styles.exampleCenter}>1. Ishihara 색각 검사표</div>
                            <div className={styles.exampleB}>B &mdash; 색구분이 가능한 자</div>
                        </div>
                        <div className={styles.exampleRow}>
                            <div className={styles.exampleA}>A &mdash; 악보를 해석하지 못하는 자</div>
                            <div className={styles.exampleCenter}>2. 악보</div>
                            <div className={styles.exampleB}>B &mdash; 악보 해석이 가능한 자</div>
                        </div>
                        <div className={styles.exampleRow}>
                            <div className={styles.exampleA}>A &mdash; 회화 표상만을 수용하는 자</div>
                            <div className={styles.exampleCenter}>3. 한스 홀바인의 회화</div>
                            <div className={styles.exampleB}>B &mdash; 작품 의미를 파악할 수 있는 자</div>
                        </div>
                        <div className={styles.exampleRow}>
                            <div className={styles.exampleA}>A &mdash; 대부분의 환자</div>
                            <div className={styles.exampleCenter}>4. MRI</div>
                            <div className={styles.exampleB}>B &mdash; 반향하는 자기장을 판독할 수 있는 자</div>
                        </div>
                    </div>
                </div>

                {/* ─── SLIDE 4: CHAPTER 2 — A & B RELATIONSHIP TYPE ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>2.</span> A와 B의 관계 유형
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <p className={styles.chapterLabel}>
                                A와 B는 동일한 시각물 앞에서도 인지적 결과가 완전히 양극화되는 &lsquo;인식론적 불균형(Epistemic Imbalance)&rsquo; 관계입니다.
                            </p>
                            <p className={styles.chapterBody}>
                                두 관찰자는 같은 이미지를 공유하지만, 해독 능력 유무에 따라 도달하는 실재가 다릅니다.
                                A는 시각 데이터의 1차원적인 표면층에 머물러 기호의 실제 기능이나 숨겨진 정보에 접근하지 못합니다.
                                반면 B는 표면을 넘어 기호가 의도한 의미를 온전히 획득합니다.
                                이들은 오직 생물학적, 교육적 조건의 차이만으로 철저히 분리된 인지적 결과를 경험하게 됩니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ─── SLIDE 5: CHAPTER 3 — BACKGROUND / WHY ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>3.</span> 작업의 필요성/배경: 왜
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <p className={styles.chapterLabel}>
                                시각 정보는 보편적으로 주어지는 듯하지만, 실제로는 관찰자의 해독 권력(조건 및 지식)에 따라 철저히 불균등하게 수용됩니다.
                            </p>
                            <p className={styles.chapterBody}>
                                이러한 비대칭성은 동일한 이미지임에도 전혀 다른 실질적 결과를 낳습니다.
                                해독 능력이 없는 A에게 핵심 정보는 차단되거나 무의미한 패턴으로 남습니다.
                                따라서 특정 지식이나 신체적 조건의 부재가 개인의 시각 매체 인지와 정보 획득 방식에 얼마나 극명한 차이를 만들어내는지 객관적으로 관찰하고 분석할 필요가 있습니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ─── SLIDE 6: CHAPTER 4 — PURPOSE / WHAT ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>4.</span> 작업을 통해 하고자 하는 것 혹은 작업의 주제/목적: 무엇을
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <p className={styles.chapterLabel}>
                                주제는 &lsquo;권력 관계에 따른 이미지 해석: 단일 기호가 파생하는 극단적 결과&rsquo;입니다.
                            </p>
                            <p className={styles.chapterBody}>
                                본 프로젝트의 목적은 A와 B의 상이한 인지 결과를 단일 평면 위에 객관적으로 시각화하는 것입니다.
                                선정된 (N)가지 매체(색각 검사표, 악보, 회화, MRI)를 바탕으로,
                                A의 제한된 인지 상태(정보의 부재, 표면적 시선)와 B의 해독된 실재(의학적 판독, 청각적 치환 등)를 하나의 캔버스에 중첩하여 표현합니다.
                                이를 통해 보이지 않는 권력의 차이가 어떻게 양극화된 결과를 초래하는지 데이터 아카이빙 포스터로 시각화합니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ─── SLIDE 7: INTERACTIVE RESEARCH EXAMPLE (THE FRAME) ─── */}
                <div className={styles.slide}>
                    <div className={styles.slideContent}>
                        <div className={styles.textSide}>
                            <h3 className={styles.slideHeader}>01. Sample</h3>
                            <h2 className={styles.slideTitle}>Interactive Research Example</h2>
                            <p className={styles.slideDesc}>
                                본 프로젝트는 선천적 생물학 기호인 ‘이시하라 색맹 검사표(Ishihara pseudoisochromatic plates)’와
                                후천적 학습 기호인 ‘악보’를 결합한 웹 기반의 인터랙티브 시각물입니다.
                                <br /><br />
                                정상 시력 사용자에게만 경로를 노출해 선율을 연주할 수 있도록 허락하며,
                                색각 이상자의 시야에서는 불협화음만이 발생합니다. 이를 통해 지식 권력의 비대칭성과 소외를 시각화합니다.
                            </p>
                        </div>
                        <div className={styles.frameSide}>
                            {/* The iframe loads the interactive page directly as a preview */}
                            <iframe
                                src="/inu-score/interactive"
                                className={styles.iframeFrame}
                                tabIndex={-1}
                            />
                            {/* The transparent overlay captures clicks and serves as a link */}
                            <Link href="/inu-score/interactive" className={styles.frameOverlay}>
                                <div className={styles.frameHoverPrompt}>Click to explore interactive score</div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ─── SLIDE 2: THEORY ─── */}
                <div className={styles.slide}>
                    <div className={styles.slideContent}>
                        <div className={styles.textSide}>
                            <h3 className={styles.slideHeader}>02. Theory</h3>
                            <h2 className={styles.slideTitle}>Epistemic Injustice</h2>
                            <p className={styles.slideDesc}>
                                영국 철학자 미란다 프리커(Miranda Fricker)의 &lsquo;인식론적 부정의&rsquo; 이론을 기반으로,
                                정보 비대칭성과 권력의 상관관계를 분석한 사회학 연구들을 참조했습니다.
                                지식과 정보를 해독할 수 있는 권한의 비대칭성은 단순한 앎의 차이를 넘어
                                해독 권한이 없는 특정 집단의 사회적 주체성을 훼손하고 구조적인 배제를 재생산합니다.
                            </p>
                        </div>
                        <div className={styles.frameSide} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)' }}>
                            <span style={{ opacity: 0.3, letterSpacing: '0.15em', fontWeight: 600 }}>[ THEORY VISUALIZATION ]</span>
                        </div>
                    </div>
                </div>

                {/* ─── SLIDE 3: NOTATION ─── */}
                <div className={styles.slide}>
                    <div className={styles.slideContent}>
                        <div className={styles.textSide}>
                            <h3 className={styles.slideHeader}>03. Notation</h3>
                            <h2 className={styles.slideTitle}>Graphic Score & Power</h2>
                            <p className={styles.slideDesc}>
                                음악 기보법의 관점에서 본 작업은 전통적인 오선보의 관습을 탈피한 &lsquo;그래픽 악보&rsquo;의 맥락에 놓여 있습니다.
                                기존의 사운드 인터랙션 작업들이 대체로 시각이 청각을 직관적으로 보조하는 데 머물렀다면,
                                본 프로젝트는 &lsquo;정상 색각&rsquo;이라는 신체적 조건을 악보 해독의 필수 암호 키(Key)로 기능하게 만들었습니다.
                            </p>
                        </div>
                        <div className={styles.frameSide} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)' }}>
                            <span style={{ opacity: 0.3, letterSpacing: '0.15em', fontWeight: 600 }}>[ NOTATION VISUALIZATION ]</span>
                        </div>
                    </div>
                </div>

                {/* ─── SLIDE 4: OPTICS ─── */}
                <div className={styles.slide}>
                    <div className={styles.slideContent}>
                        <div className={styles.textSide}>
                            <h3 className={styles.slideHeader}>04. Optics</h3>
                            <h2 className={styles.slideTitle}>Color Camouflage Theory</h2>
                            <p className={styles.slideDesc}>
                                이시하라 색맹 검사표는 색채 위장(Color camouflage) 원리를 통해 시각적 노이즈 속에서 특정 정보를
                                은폐하거나 노출하는 대표적인 의학 기호입니다. 광학 및 색채 인지 연구에 따르면,
                                이 패턴은 인공지능의 시각 인식 모델마저 기만할 수 있는 강력한 착시 및 암호화 기제로 작용합니다.
                            </p>
                        </div>
                        <div className={styles.frameSide} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)' }}>
                            <span style={{ opacity: 0.3, letterSpacing: '0.15em', fontWeight: 600 }}>[ OPTICS VISUALIZATION ]</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
