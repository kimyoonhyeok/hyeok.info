"use client";

import { useEffect, useState, useRef } from "react";
import IshiharaComponent from "./IshiharaComponent";
import HolbeinComponent from "./HolbeinComponent";
import styles from "./pt.module.css";

const REF_LIST = [
    {
        display: "Miranda Fricker, Epistemic Injustice (2007)",
        topic: "testimonial injustice & hermeneutical injustice",
        ko: "testimonial injustice와 hermeneutical injustice 이론으로 지식 획득 능력의 불평등이 권력 구조에서 발생하며, 특정 집단의 증언이나 해석이 무시되는 현상을 설명한다. Ishihara 색각 이상자, Holbein 미술 감상자, MRI 환자와 같은 다양한 지식 불균형 상황에 적용 가능한 이론적 틀을 제공한다.",
        url: "https://www.ssoar.info/ssoar/bitstream/handle/document/85059/ssoar-ses-2022-mansueto-Miranda_Frickers_Epistemic_Injustice_An.pdf",
    },
    {
        display: "Male et al. (2023)",
        topic: "Impact of Color Vision Deficiency on Quality of Life",
        ko: "색각 이상(CVD)자가 일상생활(과일 선택, 신호등 판독), 직업 제한(항공/의료 분야), 교육 활동(지도/차트 판독)에서 체계적인 정보 접근 제한을 겪는다는 점을 실증적으로 보여주며, Ishihara와 같은 시각 테스트 상황에서 발생하는 인식 격차를 뒷받침한다.",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10391464/",
    },
    {
        display: "Crichton (2017)",
        topic: "Epistemic Injustice in Psychiatry",
        ko: "의료 환경에서 환자와 전문가 간 해석 권력의 비대칭성을 Fricker 이론으로 분석하며, 환자의 표면적 인식과 전문가의 심층 판독 간 격차를 보여준다. 의료 이미지(MRI 등) 해석에서 발생할 수 있는 인식 불균형 상황에 적용 가능한 이론적 근거를 제공한다.",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5376720/",
    },
    {
        display: "국가인권위원회 (2004–2005)",
        topic: "색각이상자 차별 실태조사",
        ko: "한국 사회에서 색각 이상자가 경험하는 77.3% 색 혼동 경험, 90% 일상 불편, 취업 제한(항공/의료 분야) 등의 구조적 불편과 차별을 보여주는 대표적 통계 자료로, Ishihara 예시의 한국 사회적 맥락을 뒷받침한다.",
        url: "https://www.newswire.co.kr/newsRead.php?no=32431",
    },
    {
        display: "Alford-Duguid (2024)",
        topic: "On the Epistemic Significance of Perceptual Structure",
        ko: "시각 경험의 구조적 특징(structural features)이 정당화 방식에 차이를 만들며, object perception과 다른 패배 양상(defeat asymmetry)을 보인다는 점을 통해 동일한 시각 정보에서도 인식 결과가 달라질 수 있는 철학적 배경을 제공한다.",
        url: "https://academic.oup.com/pq/article/74/1/1/7048481",
    },
];

export default function PresentationPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [subSlide, setSubSlide] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [activeRef, setActiveRef] = useState<{ id: number; x: number; y: number } | null>(null);
    const [isPosterExpanded, setIsPosterExpanded] = useState(false);
    const totalSlides = 13;
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
        <>
        <div className={styles.ptContainer}>
            {/* Side Navigation — Arc Wheel Indicator */}
            <div className={styles.slideIndicators}>
                <div
                    className={styles.indicatorsInner}
                    style={{
                        transform: `translateY(${138 - currentSlide * 44}px)`,
                    }}
                >
                    {Array.from({ length: totalSlides }).map((_, idx) => {
                        const offset = idx - currentSlide;
                        const absOffset = Math.abs(offset);
                        const isActive = idx === currentSlide;
                        // Keep original opacity & scale behavior
                        const opacity = isActive ? 1 : 0.3;
                        const scale = isActive ? 1 : 0.85;
                        // Arc shift: quadratic X push so items trace a circular path
                        const arcShiftX = Math.min(absOffset * absOffset * 2.5, 18);
                        return (
                            <div
                                key={idx}
                                className={`${styles.indicatorWrapper} ${isActive ? styles.active : ""}`}
                                style={{
                                    transform: `translateX(-${arcShiftX}px) scale(${scale})`,
                                    opacity,
                                }}
                                onClick={() => {
                                    setCurrentSlide(idx);
                                    setSubSlide(0);
                                }}
                                title={`Go to slide ${idx + 1}`}
                            >
                                <div className={styles.indicatorLine} />
                                <span>{String(idx + 1).padStart(2, "0")}</span>
                            </div>
                        );
                    })}
                </div>
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
                            <div className={styles.chapterBody}>
                                <p>본 프로젝트에서 A와 B는 동일한 시각 정보를 마주하는 상반된 관찰자입니다.</p>
                                <p>A는 생물학적 조건이나 후천적 지식의 부재로 이미지를 표면적으로만 인지하며, B는 해독 능력을 갖추어 심층적 정보를 추출할 수 있는 관찰자로 구분합니다.</p>
                                <p>이를 바탕으로 4가지 예시(추가될 예정)를 설정했습니다.</p>
                            </div>
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
                            <div className={styles.chapterBody}>
                                <p>두 관찰자는 같은 이미지를 공유하지만, 해독 능력 유무에 따라 도달하는 실재가 다릅니다.</p>
                                <p>A는 시각 데이터의 1차원적인 표면층에 머물러 기호의 실제 기능이나 숨겨진 정보에 접근하지 못합니다. 반면 B는 표면을 넘어 기호가 의도한 의미를 온전히 획득합니다.</p>
                                <p>이들은 오직 생물학적, 교육적 조건의 차이만으로 철저히 분리된 인지적 결과를 경험하게 됩니다.</p>
                            </div>
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
                            <div className={styles.chapterBody}>
                                <p>이러한 비대칭성은 동일한 이미지임에도 전혀 다른 실질적 결과를 낳습니다. 해독 능력이 없는 A에게 핵심 정보는 차단되거나 무의미한 패턴으로 남습니다.</p>
                                <p>따라서 특정 지식이나 신체적 조건의 부재가 개인의 시각 매체 인지와 정보 획득 방식에 얼마나 극명한 차이를 만들어내는지 객관적으로 관찰하고 분석할 필요가 있습니다.</p>
                            </div>
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
                            <div className={styles.chapterBody}>
                                <p>본 프로젝트의 목적은 A와 B의 상이한 인지 결과를 단일 평면 위에 객관적으로 시각화하는 것입니다. 선정된 (N)가지 매체(색각 검사표, 악보, 회화, MRI)를 바탕으로, A의 제한된 인지 상태(정보의 부재, 표면적 시선)와 B의 해독된 실재(의학적 판독, 청각적 치환 등)를 하나의 캔버스에 중첩하여 표현합니다.</p>
                                <p>이를 통해 보이지 않는 권력의 차이가 어떻게 양극화된 결과를 초래하는지 데이터 아카이빙 포스터로 시각화합니다.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── SLIDE 8: CHAPTER 5 — BIBLIOGRAPHY / THEORY BACKGROUND ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>5.</span> A와 B 관련 배경지식/이론
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <p className={styles.refInlineList}>
                                {REF_LIST.map((ref, i) => (
                                    <span key={i} className={styles.refItemInline}>
                                        <span className={styles.refDisplay}>{ref.display}</span>
                                        {" "}
                                        <span className={styles.refTopic}>{ref.topic}</span>
                                        <sup
                                            className={styles.refSup}
                                            onMouseEnter={(e) =>
                                                setActiveRef({ id: i, x: e.clientX, y: e.clientY })
                                            }
                                            onMouseMove={(e) =>
                                                setActiveRef((prev) =>
                                                    prev ? { ...prev, x: e.clientX, y: e.clientY } : prev
                                                )
                                            }
                                            onMouseLeave={() => setActiveRef(null)}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveRef((prev) =>
                                                    prev?.id === i
                                                        ? null
                                                        : { id: i, x: e.clientX, y: e.clientY }
                                                );
                                            }}
                                        >
                                            {i + 1}
                                        </sup>
                                        {i < REF_LIST.length - 1 && <span className={styles.refSeparator}> / </span>}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ─── SLIDE 9: CHAPTER 6 — PURPOSE AND VISUALIZATION PLAN ─── */}
                {/* ─── SLIDE 6: PURPOSE / SOLUTION (Slide 9 in user terms, index 6) ─── */}
                <div className={styles.slide}>
                    <div className={`${styles.chapterLayout} ${styles.chapterLayoutCompact}`}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>6.</span> 작업의 목적/주제를 위한 해결 방안, 시각화 방안, 시각화 요소
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <p className={styles.chapterLabel}>
                                본 프로젝트 목적은 단일 시각 기호 앞에서의 해독 권력(생물학적 조건 및 지식) 유무가 어떻게 양극화된 인지적 실재를 구축하는지 증명하고 아카이빙하는 것입니다. 표면적 인지에 머무는 A와 심층 정보를 해독하는 B의 인지적 격차를 데이터화해 인식론적 불균형을 시각적으로 가시화하고자 합니다.
                            </p>
                            <div className={styles.chapterBody}>
                                <p>이를 위해, 관찰자의 인지 과정을 검증 가능한 데이터로 변환하는 웹 기반 인터렉티브 아카이빙 포스터를 구축할 계획입니다. 비교를 용이하게 하도록 3열 그리드 레이아웃을 채택해, 좌측 열에는 A의 제한된 시각적 관점을, 우측 열에는 B의 해독된 실재를 배치합니다. 프로젝트의 핵심이 되는 중앙 열에는 색각 검사표, 악보, 한스 홀바인의 회화, MRI 등의 원본 베이스 캔버스를 바탕으로 두 관찰자의 Eye-tracking data 을 동시 맵핑한 &apos;결합 이미지&apos;를 위치시킬 계획입니다.</p>
                                <p>중앙 공간에서는 표면을 A의 분산된 시선 궤적과 핵심 정보를 볼 수 있는 B의 궤적을 대비되는 색상으로 구분하여 원본 이미지 위에 중첩할 계획입니다.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── SLIDE 7: ISHIHARA INTERACTIVE (Slide 10 in user terms, index 7) ─── */}
                <div className={styles.slide}>
                    <IshiharaComponent />
                </div>

                {/* ─── SLIDE 8: HOLBEIN INTERACTIVE (Slide 11 in user terms, index 8) ─── */}
                <div className={styles.slide}>
                    <HolbeinComponent />
                </div>

                {/* ─── SLIDE 12: CHAPTER 7 — POSTER DESIGN ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>7.</span> 포스터 디자인 소개: 손 스케치 및 초안
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <img 
                                src="/inu-score/Sample(03.24).jpg" 
                                alt="Poster Sketch" 
                                onClick={() => setIsPosterExpanded(true)}
                                style={{
                                    width: '100%',
                                    maxWidth: '380px',
                                    height: 'auto', 
                                    borderRadius: '8px',
                                    marginTop: '4px', /* Aligns better with font line-height */
                                    boxShadow: '-10px 10px 30px rgba(0,0,0,0.3)',
                                    border: '1px solid rgba(0,0,0,0.03)',
                                    cursor: 'zoom-in',
                                    transition: 'transform 0.2s ease',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                        </div>
                    </div>
                </div>

                {/* ─── SLIDE 14: END PAGE ─── */}
                <div className={styles.slide}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.mainTitle} style={{ fontFamily: '"garamond-premier-pro", serif', fontSize: '24px', fontWeight: 600, color: '#111' }}>
                            (c) 2026. Yoonhyeok Kim.
                        </h1>
                    </div>
                </div>

            </div>
        </div>

        {isPosterExpanded && (
            <div 
                onClick={() => setIsPosterExpanded(false)}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 99999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'zoom-out',
                    animation: 'fadeIn 0.3s ease-out forwards'
                }}
            >
                <img 
                    src="/inu-score/Sample(03.24).jpg" 
                    alt="Poster Sketch Expanded" 
                    style={{
                        maxWidth: '1000px',
                        width: '80%',
                        height: 'auto',
                        maxHeight: '90vh',
                        objectFit: 'contain',
                        boxShadow: '-20px 20px 60px rgba(0,0,0,0.6)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        borderRadius: '8px'
                    }}
                />
                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `}</style>
            </div>
        )}

        {activeRef && (
            <div
                className={styles.refTooltip}
                style={{
                    left: Math.max(12, (activeRef?.x ?? 0) - 380),
                    top: Math.max(12, (activeRef?.y ?? 0) - 20),
                }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                <p className={styles.refTooltipKo}>{REF_LIST[activeRef?.id ?? 0]?.ko}</p>
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                <a
                    href={REF_LIST[activeRef?.id ?? 0]?.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.refTooltipUrl}
                    onClick={(e) => e.stopPropagation()}
                >
                    {REF_LIST[activeRef?.id ?? 0]?.url}
                </a>
            </div>
        )}
        </>
    );
}
