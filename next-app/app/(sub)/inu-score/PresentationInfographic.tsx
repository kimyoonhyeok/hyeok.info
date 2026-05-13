'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './pt.module.css';
import DynamicTimelineChart from './DynamicTimelineChart';
import DemographicChart from './DemographicChart';
import WarlordFlowChart from './WarlordFlowChart';
import BattleBubbleChart from './BattleBubbleChart';
import RelationshipNetwork from './RelationshipNetwork';
import TerritorialMap from './TerritorialMap';

const REF_LIST = [
    { id: 'ref1', ko: 'Rafe de Crespigny, A Biographical Dictionary of Later Han to the Three Kingdoms (Brill, 2007)' },
    { id: 'ref2', ko: 'Mark Edward Lewis, China Between Empires (Harvard UP, 2009)' },
    { id: 'ref3', ko: 'Chen Shou, Records of the Three Kingdoms (289 AD) & Luo Guanzhong, Romance of the Three Kingdoms (14th C.)' }
];

// ── Shared paragraph style: keep-all + left-align, no hyphens ─────────────────────
const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p style={{ textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word', marginBottom: '1.2em', marginTop: 0, fontFamily: '"Pretendard Variable", "Pretendard", sans-serif', fontWeight: 400 }}>
        {children}
    </p>
);

interface PresentationInfographicProps {
    onClose: () => void;
}

export default function PresentationInfographic({ onClose }: PresentationInfographicProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [subSlide, setSubSlide] = useState(0);
    const [activeRef, setActiveRef] = useState<string | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const totalSlides = 18;
    const isScrolling = useRef(false);

    // ── Wheel & Keyboard navigation ──────────────────────────────────────────
    useEffect(() => {
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
                        if (next === 7) setSubSlide(1);
                        else if (next === 9) setSubSlide(1);
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
                setTimeout(() => { isScrolling.current = false; }, 800);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                isScrolling.current = true;
                if (currentSlide === 7 && subSlide > 0) {
                    setSubSlide(0);
                } else if (currentSlide === 9 && subSlide > 0) {
                    setSubSlide(0);
                } else {
                    setCurrentSlide(prev => {
                        const next = Math.max(prev - 1, 0);
                        if (next === 7) setSubSlide(1);
                        else if (next === 9) setSubSlide(1);
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
                    if (currentSlide === 7 && subSlide < 1) { setSubSlide(1); }
                    else if (currentSlide === 9 && subSlide < 1) { setSubSlide(1); }
                    else { setCurrentSlide(prev => { const n = Math.min(prev + 1, totalSlides - 1); if (prev !== n) setSubSlide(0); return n; }); }
                } else {
                    if (currentSlide === 7 && subSlide > 0) { setSubSlide(0); }
                    else if (currentSlide === 9 && subSlide > 0) { setSubSlide(0); }
                    else { setCurrentSlide(prev => { const n = Math.max(prev - 1, 0); if (n === 7) setSubSlide(1); else if (n === 9) setSubSlide(1); return n; }); }
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

    return (
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

            {/* ── Footnote Tooltip ── */}
            {activeRef && (
                <div
                    className={styles.refTooltip}
                    style={{
                        left: Math.min(tooltipPos.x, window.innerWidth - 380) + 'px',
                        top: tooltipPos.y + 24 + 'px'
                    }}
                >
                    <p className={styles.refTooltipKo} style={{ fontFamily: '"Pretendard Variable", "Pretendard", sans-serif', fontWeight: 400 }}>
                        {REF_LIST.find(r => r.id === activeRef)?.ko}
                    </p>
                </div>
            )}

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
                            Final Project Theme : Three Kingdoms Period (184-280 AD)
                        </h1>
                    </div>
                </div>

                {/* ── SLIDE 1: TABLE OF CONTENTS ─── */}
                <div className={styles.slide}>
                    <div className={styles.tocLayout}>
                        <div className={styles.tocLeft} />
                        <div className={styles.tocRight}>
                            <ol className={styles.tocList}>
                                <li>01. Core Narrative &amp; Irony</li>
                                <li>02. Historical vs Literary Perspectives</li>
                                <li>03. Y-Axis: Demographics</li>
                                <li>04. X-Axis: Early Warlords (184-200 AD)</li>
                                <li>05. X-Axis: Three Kingdoms Era (220-263 AD)</li>
                                <li>06. Key Battles &amp; Timeline</li>
                                <li>07. Exaggeration &amp; Fiction</li>
                                <li>08. Character Interpretations</li>
                                <li>09. Visualization Strategy</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 2: CHAPTER 1 ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>01.</span> Core Narrative &amp; Irony
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P>서사의 핵심 아이러니: 최종 승자는 위, 촉, 오 그 누구도 아닌 사마씨의 진(晉)나라입니다. 그러나 진나라조차 짧게 끝나고 위진남북조 시대의 극심한 혼란으로 이어집니다.</P>
                                <P>절대 강자 없이 갑과 을이 끊임없이 뒤바뀌는 구조 자체가 삼국지가 지닌 매력의 핵심이며, 100년이라는 긴 시간 동안 여러 영웅들이 명멸하는 역동성을 만들어냅니다.</P>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 3: CHAPTER 2 ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>02.</span> Historical vs Literary Perspectives
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P>진수(陳壽)가 편찬한 정사 『삼국지』는 289년에 기록되었으며, 조조의 위나라를 정통으로 삼아 간결하고 객관적인 기록을 지향합니다(조조만 황제 파트인 본기에 기록). 인물에 대한 과도한 미화가 배제되어 있습니다.</P>
                                <P>반면 나관중의 소설 『삼국지연의』(14세기)는 유비의 촉한을 정통으로 삼는 &apos;촉한정통론&apos;을 바탕으로 합니다. 민간 설화와 후대 주석을 결합하여 도원결의, 삼고초려 등의 고사성어와 극적 드라마를 창조했으며, 주요 인물들을 영웅화하거나 악인으로 묘사하여 대중적인 스토리텔링을 극대화했습니다.</P>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 4: CHAPTER 3 ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>03.</span> Y-Axis: Demographics
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P>호구(戶)는 인포그래픽의 Y축을 구성하는 핵심 정량 지표입니다. 전란으로 인한 급격한 인구 감소와 위나라의 압도적인 국력을 가시화합니다.
                                    <sup className={styles.refSup} onMouseEnter={(e) => { setActiveRef('ref1'); setTooltipPos({ x: e.clientX, y: e.clientY }); }} onMouseLeave={() => setActiveRef(null)}>[1]</sup>
                                    157년 후한 영제 시절의 전체 인구는 약 1,067만 호(약 5,648만 명)에 달했습니다. 그러나 오랜 전란을 거치며 인구는 급감하여, 280년 서진이 천하를 통일했을 무렵의 호구는 약 245만 호(약 1,616만 명)에 불과했습니다. 이는 약 100년 만에 호구가 77% 이상 감소했음을 보여줍니다.
                                    <sup className={styles.refSup} onMouseEnter={(e) => { setActiveRef('ref2'); setTooltipPos({ x: e.clientX, y: e.clientY }); }} onMouseLeave={() => setActiveRef(null)}>[2]</sup>
                                    삼국 말기 각국의 호구를 비교하면, 촉한은 28만 호(263년), 오는 52만 3천 호(280년)인 데 반해, 위나라(진흥 직전)는 약 437만 호를 보유하여 인구 면에서 타국을 압도했습니다.</P>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 5: CHAPTER 4 ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>04.</span> X-Axis: Early Warlords
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P>184년에서 200년에 이르는 초기 군웅할거기는 황건적의 난이라는 &apos;난세를 여는 얼음판 깨기&apos;로 시작되어, 동탁의 집권과 반동탁 연합군의 각축으로 이어집니다.
                                    전성기 시절 원소는 하북 4주(기, 유, 청, 병주)를 장악하고 11만 이상의 정예 병력을 보유한 최대 군벌이었습니다. 공손찬은 유주 전역에 보기 10만을, 유표는 형주에 20~30만의 세력을, 마등은 서량 지역을 통제했습니다.
                                    조조는 연주와 예주를 바탕으로 200년 관도 시점 약 2~4만의 병력으로 열세 속에서 역전을 도모하고 있었으며, 유비는 독립된 영토 없이 수천의 병력을 이끌며 훗날을 도모하던 최약체 세력이었습니다.</P>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 6: CHAPTER 5 ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>05.</span> X-Axis: Three Kingdoms Era
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P>220년 이후 천하는 위, 촉, 오 세 나라로 재편됩니다. 위(魏)는 약 12주(州)를 지배하며 437만 호의 백성과 40~50만 병력을 보유했습니다. 둔전제를 바탕으로 한 법가 실용주의가 특징이었습니다.
                                    오(吳)는 양주, 형주, 교주 등 3주를 기반으로 52만 호와 약 23만의 병력을 유지했습니다. 호족 연합적인 성격을 띠었으며 장강을 기반으로 한 수군의 강점이 두드러졌습니다.
                                    촉(蜀)은 유주 1개(익주)만을 차지한 가장 작은 세력으로, 28만 호와 약 10만 2천의 병력을 가졌습니다. 유교적 정통성을 내세웠으나 잦은 북벌로 국력이 빠르게 소모되는 한계가 있었습니다.</P>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 7: CHAPTER 6 — 전투/이벤트 (2 sub-slides) ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout} style={{ position: 'relative', top: '2.5rem' }}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>06.</span> Key Battles &amp; Timeline
                            </h2>
                        </div>
                        <div className={styles.chapterRight} style={{ position: 'relative' }}>
                            <div style={{ flex: 1, display: 'grid' }}>
                                <div className={styles.chapterBody} style={{ gridArea: '1 / 1', opacity: subSlide === 0 ? 1 : 0, pointerEvents: subSlide === 0 ? 'auto' : 'none', transition: 'opacity 0.3s ease' }}>
                                    <P>184년 황건적의 난으로 난세가 시작되고, 189년 동탁이 집권하면서 이에 맞서 반동탁 연합이 결성됩니다. 이후 각 주를 통합하는 예선전 성격의 군웅할거기가 펼쳐집니다.
                                        가장 중요한 분수령은 200년 <b>관도대전</b>입니다. 조조(2~4만)가 압도적인 규모의 원소(11만)를 꺾고 화북 통일의 기점을 마련합니다.
                                        이후 남하를 시도하던 조조(15~20만)는 208년 <b>적벽대전</b>에서 손권·유비 연합군(5만)에게 패배하며, 이로써 천하 삼분지계의 구도가 확정됩니다. 유비는 이후 214년 익주를 점령하고 219년 한중쟁탈전에서 승리하여 촉한의 전성기를 엽니다.</P>
                                </div>
                                <div className={styles.chapterBody} style={{ gridArea: '1 / 1', opacity: subSlide === 1 ? 1 : 0, pointerEvents: subSlide === 1 ? 'auto' : 'none', transition: 'opacity 0.3s ease' }}>
                                    <P>그러나 관우의 죽음 직후, 유비는 222년 <b>이릉대전</b>에서 육손(5만)의 방어에 가로막혀 10만의 병력을 잃고 대패하며 촉한은 쇠퇴의 길을 걷습니다.
                                        이후 제갈량은 유비 사후 지속적인 북벌을 시도하지만, 234년 <b>오장원 전투</b>에서 사마의(20만+)의 지구전 전술에 가로막혀 교착 상태 중 병사하고 맙니다.
                                        249년 고평릉사변으로 권력을 잡은 사마의 일가는 점차 위의 실권을 장악합니다. 마침내 263년 위는 촉을 정벌하고, 265년 사마염이 진(晉)을 건국하여 위를 멸망시킵니다. 이후 280년, 오나라까지 정벌하며 100년에 걸친 삼국시대는 서진의 천하통일로 종결됩니다.</P>
                                </div>
                            </div>
                            <div style={{ position: 'absolute', bottom: '-2rem', right: '0', fontSize: '14px', color: '#aaa', textAlign: 'right', letterSpacing: '0.02em' }}>
                                {subSlide + 1} / 2{subSlide === 0 ? ' ↓' : ''}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 8: CHAPTER 7 ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>07.</span> Exaggeration &amp; Fiction
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P>소설 연의는 극적 효과를 위해 규모와 사실을 크게 부풀리거나 가공했습니다. 특히 병력 규모에서 큰 차이를 보입니다. 정사에서 조조(2~4만)가 원소(11만)를 이긴 <b>관도대전</b>은 연의에서 &apos;7만 대 70만&apos;(약 6~7배 과장)으로 묘사됩니다. <b>적벽대전</b> 역시 조조(15~20만) 대 연합군(5만)의 싸움이 &apos;83만 대 수만&apos;으로, <b>이릉대전</b>은 유비(10만) 대 육손(5만)의 전쟁이 &apos;75만 대 수만&apos;으로 과장되었습니다.</P>
                                <P>또한 도원결의, 온주참화웅, 적벽의 동남풍 기도나 방통의 연환계, 그리고 안개 속에서 짚배로 10만 개의 화살을 얻었다는 초선차전 등 널리 알려진 이야기 대부분은 소설적 각색이나 허구입니다.</P>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 9: CHAPTER 8 — 인물 해석 (2 sub-slides) ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout} style={{ position: 'relative', top: '2.5rem' }}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>08.</span> Character Interpretations
                            </h2>
                        </div>
                        <div className={styles.chapterRight} style={{ position: 'relative' }}>
                            <div style={{ flex: 1, display: 'grid' }}>
                                <div className={styles.chapterBody} style={{ gridArea: '1 / 1', opacity: subSlide === 0 ? 1 : 0, pointerEvents: subSlide === 0 ? 'auto' : 'none', transition: 'opacity 0.3s ease' }}>
                                    <P>촉의 주요 인물들은 연의에서 고도로 영웅화되었습니다. <b>유비</b>는 기회주의적 생존가에서 &apos;덕과 인의 성군&apos;으로, <b>관우</b>는 오만한 무장에서 오관참육장 등 &apos;의리와 무신의 아이콘&apos;으로 승격되었습니다. <b>제갈량</b>은 정사의 뛰어난 행정가에서 신산귀모의 만능 책사이자 도술가로 묘사됩니다.</P>
                                    <P>반면 <b>조조</b>는 둔전제 개혁과 건안문학을 이끈 능력 있는 군주(&quot;치세의 능신&quot;)임에도 불구하고, 유비와 대비되는 &quot;내가 천하를 버릴지언정...&quot; 식의 극악무도한 &apos;간웅&apos;으로 그 이미지가 극대화되었습니다.</P>
                                </div>
                                <div className={styles.chapterBody} style={{ gridArea: '1 / 1', opacity: subSlide === 1 ? 1 : 0, pointerEvents: subSlide === 1 ? 'auto' : 'none', transition: 'opacity 0.3s ease' }}>
                                    <P><b>사마의</b>의 경우, 조조 휘하에서 신뢰를 구축하며 최종 승자가 된 인물이지만, 제갈량을 상대했다는 이유로 쫓기고 놀림받는 &apos;소인배&apos;로 폄하됩니다.</P>
                                    <P>오나라의 주역인 <b>주유</b>는 적벽대전을 승리로 이끈 넓은 도량의 대도독이지만, 소설에서는 제갈량에게 열등감을 느끼고 피를 토하며 죽는 &apos;속 좁은 패자&apos;로 왜곡되었습니다. <b>손권</b> 역시 훌륭한 수성(守城)의 군주이자 외교의 달인이었지만 촉한정통론 아래 존재감이 옅은 &apos;조연&apos;으로 축소되었습니다.</P>
                                </div>
                            </div>
                            <div style={{ position: 'absolute', bottom: '-2rem', right: '0', fontSize: '14px', color: '#aaa', textAlign: 'right', letterSpacing: '0.02em' }}>
                                {subSlide + 1} / 2{subSlide === 0 ? ' ↓' : ''}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 10: CHAPTER 9 TITLE ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>09.</span> Visualization Strategy
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P>Visualization strategy for the infographic, derived from historical census data and chronological analysis of the Three Kingdoms period.
                                    <sup className={styles.refSup} onMouseEnter={(e) => { setActiveRef('ref3'); setTooltipPos({ x: e.clientX, y: e.clientY }); }} onMouseLeave={() => setActiveRef(null)}>[3]</sup>
                                </P>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 11: Timeline Chart ─── */}
                <div className={styles.slide}>
                    {currentSlide === 11 && (
                        <div style={{ width: '100%', height: '100%', padding: '6vh 4vw' }}>
                            <DynamicTimelineChart />
                        </div>
                    )}
                </div>

                {/* ── SLIDE 12: Demographic Chart ─── */}
                <div className={styles.slide}>
                    {currentSlide === 12 && <DemographicChart />}
                </div>

                {/* ── SLIDE 13: Warlord Flow Chart ─── */}
                <div className={styles.slide}>
                    {currentSlide === 13 && <WarlordFlowChart />}
                </div>

                {/* ── SLIDE 14: Battle Bubble Chart ─── */}
                <div className={styles.slide}>
                    {currentSlide === 14 && <BattleBubbleChart />}
                </div>

                {/* ── SLIDE 15: Relationship Network ─── */}
                <div className={styles.slide}>
                    {currentSlide === 15 && <RelationshipNetwork />}
                </div>

                {/* ── SLIDE 16: Territorial Map ─── */}
                <div className={styles.slide}>
                    {currentSlide === 16 && <TerritorialMap />}
                </div>

                {/* ── SLIDE 17: OUTRO ─── */}
                <div className={styles.slide}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.mainTitle}>
                            (c) 2026. Yoonhyeok Kim. all rights reserved.
                        </h1>
                    </div>
                </div>

            </div>
        </div>
    );
}
