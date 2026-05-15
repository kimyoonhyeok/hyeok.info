import re

with open('app/(sub)/inu-score/PresentationInfographic.tsx', 'r') as f:
    content = f.read()

# 1. Total slides
content = content.replace("const totalSlides = 18;", "const totalSlides = 21;")

# 2. handleWheel
wheel_pattern = re.compile(r'const handleWheel = \(e: WheelEvent\) => \{.*?setTimeout\(\(\) => \{\n\s*isScrolling\.current = false;\n\s*\}, 800\);\n\s*\};', re.DOTALL)
wheel_new = """const handleWheel = (e: WheelEvent) => {
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
content = wheel_pattern.sub(wheel_new, content)

# 3. handleKeyDown
kbd_pattern = re.compile(r'const handleKeyDown = \(e: KeyboardEvent\) => \{.*?if \(e\.key === "Escape"\) \{\n\s*onClose\(\);\n\s*\}\n\s*\};', re.DOTALL)
kbd_new = """const handleKeyDown = (e: KeyboardEvent) => {
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
content = kbd_pattern.sub(kbd_new, content)

# 4. handleTouchEnd
touch_pattern = re.compile(r'const handleTouchEnd = \(e: TouchEvent\) => \{.*?setTimeout\(\(\) => \{ isScrolling\.current = false; \}, 800\);\n\s*\}\n\s*\};', re.DOTALL)
touch_new = """const handleTouchEnd = (e: TouchEvent) => {
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
        };"""
content = touch_pattern.sub(touch_new, content)

# 5. useEffect dependencies
content = content.replace("}, [currentSlide, subSlide]);", "}, [currentSlide]);")

# 6. Remove subSlide from DOM logic completely
content = content.replace("const [subSlide, setSubSlide] = useState(0);", "")

# 7. Flatten Chapter 1
content = re.sub(r'<div className=\{styles\.chapterRight\} style=\{\{ position: \'relative\' \}\}>\n\s*<div style=\{\{ flex: 1, display: \'grid\' \}\}>\n\s*<div className=\{styles\.chapterBody\} style=\{\{ gridArea: \'1 / 1\', opacity: subSlide === 0 \? 1 : 0, pointerEvents: subSlide === 0 \? \'auto\' : \'none\', transition: \'opacity 0\.3s ease\' \}\}>\n\s*<P>서사의 핵심 아이러니: 최종 승자는 위, 촉, 오 그 누구도 아닌 사마씨의 진\(晉\)나라입니다\. 그러나 진나라조차 짧게 끝나고 위진남북조 시대의 극심한 혼란으로 이어집니다\.</P>\n\s*<P>절대 강자 없이 갑과 을이 끊임없이 뒤바뀌는 구조 자체가 삼국지가 지닌 매력의 핵심이며, 100년이라는 긴 시간 동안 여러 영웅들이 명멸하는 역동성을 만들어냅니다\.</P>\n\s*</div>\n\s*<div className=\{styles\.chapterBody\} style=\{\{ gridArea: \'1 / 1\', opacity: subSlide === 1 \? 1 : 0, pointerEvents: subSlide === 1 \? \'auto\' : \'none\', transition: \'opacity 0\.3s ease\' \}\}>\n\s*<P>개인의 능력이 운명을 결정하는 듯 보이지만, 결국 시대의 거대한 흐름\(천시\) 앞에서는 개인의 노력이 무위로 돌아가는 허무주의적 결말을 맞이합니다\.</P>\n\s*<P>&quot;천하의 대세는 나뉘면 반드시 합쳐지고, 합쳐지면 반드시 나뉜다&quot;는 서문의 구절은 영원한 권력도, 영원한 국가도 없음을 강조합니다\.</P>\n\s*</div>\n\s*</div>\n\s*<div style=\{\{ position: \'absolute\', bottom: \'-2rem\', right: \'0\', fontSize: \'14px\', color: \'#aaa\', textAlign: \'right\', letterSpacing: \'0\.02em\' \}\}>\n\s*\{subSlide \+ 1\} / 2\{subSlide === 0 \? \' ↓\' : \'\'\}\n\s*</div>\n\s*</div>',
"""<div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P>서사의 핵심 아이러니: 최종 승자는 위, 촉, 오 그 누구도 아닌 사마씨의 진(晉)나라입니다. 그러나 진나라조차 짧게 끝나고 위진남북조 시대의 극심한 혼란으로 이어집니다.</P>
                                <P>절대 강자 없이 갑과 을이 끊임없이 뒤바뀌는 구조 자체가 삼국지가 지닌 매력의 핵심이며, 100년이라는 긴 시간 동안 여러 영웅들이 명멸하는 역동성을 만들어냅니다.</P>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 3: CHAPTER 1 cont ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>01.</span> Core Narrative &amp; Irony
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P>개인의 능력이 운명을 결정하는 듯 보이지만, 결국 시대의 거대한 흐름(천시) 앞에서는 개인의 노력이 무위로 돌아가는 허무주의적 결말을 맞이합니다.</P>
                                <P>&quot;천하의 대세는 나뉘면 반드시 합쳐지고, 합쳐지면 반드시 나뉜다&quot;는 서문의 구절은 영원한 권력도, 영원한 국가도 없음을 강조합니다.</P>
                            </div>
                        </div>""", content)

# 8. Flatten Chapter 2
content = re.sub(r'<div className=\{styles\.chapterRight\} style=\{\{ position: \'relative\' \}\}>\n\s*<div style=\{\{ flex: 1, display: \'grid\' \}\}>\n\s*<div className=\{styles\.chapterBody\} style=\{\{ gridArea: \'1 / 1\', opacity: subSlide === 0 \? 1 : 0, pointerEvents: subSlide === 0 \? \'auto\' : \'none\', transition: \'opacity 0\.3s ease\' \}\}>\n\s*<P><b>정사 삼국지 \(Sanguozhi\)</b>는 진수\(Chen Shou\)가 편찬한 정통 역사서로, 승자인 위나라를 정통으로 삼아\(위진정통론\) 간결하고 객관적인 기록을 지향합니다\.</P>\n\s*<P>반면, <b>삼국지연의 \(Sanguo Yanyi\)</b>는 14세기 나관중이 쓴 역사 소설로, 촉한정통론\(Liu Bei as the legitimate ruler\)을 바탕으로 촉의 인물들을 영웅화하고 극적인 요소를 대거 추가했습니다\.</P>\n\s*</div>\n\s*<div className=\{styles\.chapterBody\} style=\{\{ gridArea: \'1 / 1\', opacity: subSlide === 1 \? 1 : 0, pointerEvents: subSlide === 1 \? \'auto\' : \'none\', transition: \'opacity 0\.3s ease\' \}\}>\n\s*<P>우리가 흔히 접하는 삼국지는 대부분 &apos;연의&apos;의 각색된 내용입니다\. 정사에서는 지극히 평범하거나 패배했던 전투들이 연의에서는 특정 인물을 돋보이게 하는 신화적 사건으로 포장되었습니다\. \(예: 제갈량의 적벽대전 동남풍 대여\)</P>\n\s*<P>이러한 &apos;역사와 픽션의 괴리&apos;는 우리가 삼국지를 이해하는 데 있어 중요한 분석 지점을 제공합니다\.\n\s*<sup className=\{styles\.refSup\} onMouseEnter=\{\(e\) => \{ setActiveRef\(\'ref1\'\); setTooltipPos\(\{ x: e\.clientX, y: e\.clientY \}\); \}\} onMouseLeave=\{\(\) => setActiveRef\(null\)\}>\[1\]</sup>\n\s*</P>\n\s*</div>\n\s*</div>\n\s*<div style=\{\{ position: \'absolute\', bottom: \'-2rem\', right: \'0\', fontSize: \'14px\', color: \'#aaa\', textAlign: \'right\', letterSpacing: \'0\.02em\' \}\}>\n\s*\{subSlide \+ 1\} / 2\{subSlide === 0 \? \' ↓\' : \'\'\}\n\s*</div>\n\s*</div>',
"""<div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P><b>정사 삼국지 (Sanguozhi)</b>는 진수(Chen Shou)가 편찬한 정통 역사서로, 승자인 위나라를 정통으로 삼아(위진정통론) 간결하고 객관적인 기록을 지향합니다.</P>
                                <P>반면, <b>삼국지연의 (Sanguo Yanyi)</b>는 14세기 나관중이 쓴 역사 소설로, 촉한정통론(Liu Bei as the legitimate ruler)을 바탕으로 촉의 인물들을 영웅화하고 극적인 요소를 대거 추가했습니다.</P>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 5: CHAPTER 2 cont ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>02.</span> Historical vs Literary
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P>우리가 흔히 접하는 삼국지는 대부분 &apos;연의&apos;의 각색된 내용입니다. 정사에서는 지극히 평범하거나 패배했던 전투들이 연의에서는 특정 인물을 돋보이게 하는 신화적 사건으로 포장되었습니다. (예: 제갈량의 적벽대전 동남풍 대여)</P>
                                <P>이러한 &apos;역사와 픽션의 괴리&apos;는 우리가 삼국지를 이해하는 데 있어 중요한 분석 지점을 제공합니다.
                                    <sup className={styles.refSup} onMouseEnter={(e) => { setActiveRef('ref1'); setTooltipPos({ x: e.clientX, y: e.clientY }); }} onMouseLeave={() => setActiveRef(null)}>[1]</sup>
                                </P>
                            </div>
                        </div>""", content)

# 9. Flatten Chapter 6
content = re.sub(r'<div className=\{styles\.chapterRight\} style=\{\{ position: \'relative\' \}\}>\n\s*<div style=\{\{ flex: 1, display: \'grid\' \}\}>\n\s*<div className=\{styles\.chapterBody\} style=\{\{ gridArea: \'1 / 1\', opacity: subSlide === 0 \? 1 : 0, pointerEvents: subSlide === 0 \? \'auto\' : \'none\', transition: \'opacity 0\.3s ease\' \}\}>\n\s*<P><b>관도대전 \(200 AD\)</b>: 하북의 패자 원소와 조조의 결전\. 원소의 11만 대군에 맞서 4만의 병력으로 조조가 기적적인 승리를 거두며 하북을 제패, 가장 거대한 세력으로 성장하는 발판이 되었습니다\.</P>\n\s*<P><b>적벽대전 \(208 AD\)</b>: 조조의 20만 대군\(연의 100만\) 남하를 유비-손권 연합군\(5만\)이 화공으로 저지한 전투\. 이 승리로 조조의 천하 통일이 좌절되고, 본격적인 삼국 정립\(천하삼분지계\)의 서막이 올랐습니다\.</P>\n\s*</div>\n\s*<div className=\{styles\.chapterBody\} style=\{\{ gridArea: \'1 / 1\', opacity: subSlide === 1 \? 1 : 0, pointerEvents: subSlide === 1 \? \'auto\' : \'none\', transition: \'opacity 0\.3s ease\' \}\}>\n\s*<P><b>이릉대전 \(222 AD\)</b>: 관우의 복수를 위해 유비가 동오를 침공한 전투\. 육손의 화공에 촉군이 전멸에 가까운 타격을 입고 유비마저 앓아눕게 되면서, 촉나라의 국력은 급격히 쇠퇴하고 결국 가장 먼저 멸망하는 원인이 되었습니다\.\n\s*<sup className=\{styles\.refSup\} onMouseEnter=\{\(e\) => \{ setActiveRef\(\'ref2\'\); setTooltipPos\(\{ x: e\.clientX, y: e\.clientY \}\); \}\} onMouseLeave=\{\(\) => setActiveRef\(null\)\}>\[2\]</sup>\n\s*</P>\n\s*</div>\n\s*</div>\n\s*<div style=\{\{ position: \'absolute\', bottom: \'-2rem\', right: \'0\', fontSize: \'14px\', color: \'#aaa\', textAlign: \'right\', letterSpacing: \'0\.02em\' \}\}>\n\s*\{subSlide \+ 1\} / 2\{subSlide === 0 \? \' ↓\' : \'\'\}\n\s*</div>\n\s*</div>',
"""<div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P><b>관도대전 (200 AD)</b>: 하북의 패자 원소와 조조의 결전. 원소의 11만 대군에 맞서 4만의 병력으로 조조가 기적적인 승리를 거두며 하북을 제패, 가장 거대한 세력으로 성장하는 발판이 되었습니다.</P>
                                <P><b>적벽대전 (208 AD)</b>: 조조의 20만 대군(연의 100만) 남하를 유비-손권 연합군(5만)이 화공으로 저지한 전투. 이 승리로 조조의 천하 통일이 좌절되고, 본격적인 삼국 정립(천하삼분지계)의 서막이 올랐습니다.</P>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 10: CHAPTER 6 cont ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>06.</span> Key Battles &amp; Timeline
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P><b>이릉대전 (222 AD)</b>: 관우의 복수를 위해 유비가 동오를 침공한 전투. 육손의 화공에 촉군이 전멸에 가까운 타격을 입고 유비마저 앓아눕게 되면서, 촉나라의 국력은 급격히 쇠퇴하고 결국 가장 먼저 멸망하는 원인이 되었습니다.
                                    <sup className={styles.refSup} onMouseEnter={(e) => { setActiveRef('ref2'); setTooltipPos({ x: e.clientX, y: e.clientY }); }} onMouseLeave={() => setActiveRef(null)}>[2]</sup>
                                </P>
                            </div>
                        </div>""", content)

# 10. Flatten Chapter 8
content = re.sub(r'<div className=\{styles\.chapterRight\} style=\{\{ position: \'relative\' \}\}>\n\s*<div style=\{\{ flex: 1, display: \'grid\' \}\}>\n\s*<div className=\{styles\.chapterBody\} style=\{\{ gridArea: \'1 / 1\', opacity: subSlide === 0 \? 1 : 0, pointerEvents: subSlide === 0 \? \'auto\' : \'none\', transition: \'opacity 0\.3s ease\' \}\}>\n\s*<P>촉의 주요 인물들은 연의에서 고도로 영웅화되었습니다\. <b>유비</b>는 기회주의적 생존가에서 &apos;덕과 인의 성군&apos;으로, <b>관우</b>는 오만한 무장에서 오관참육장 등 &apos;의리와 무신의 아이콘&apos;으로 승격되었습니다\. <b>제갈량</b>은 정사의 뛰어난 행정가에서 신산귀모의 만능 책사이자 도술가로 묘사됩니다\.</P>\n\s*<P>반면 <b>조조</b>는 둔전제 개혁과 건안문학을 이끈 능력 있는 군주\(&quot;치세의 능신&quot;\)임에도 불구하고, 유비와 대비되는 &quot;내가 천하를 버릴지언정\.\.\.&quot; 식의 극악무도한 &apos;간웅&apos;으로 그 이미지가 극대화되었습니다\.</P>\n\s*</div>\n\s*<div className=\{styles\.chapterBody\} style=\{\{ gridArea: \'1 / 1\', opacity: subSlide === 1 \? 1 : 0, pointerEvents: subSlide === 1 \? \'auto\' : \'none\', transition: \'opacity 0\.3s ease\' \}\}>\n\s*<P><b>사마의</b>의 경우, 조조 휘하에서 신뢰를 구축하며 최종 승자가 된 인물이지만, 제갈량을 상대했다는 이유로 쫓기고 놀림받는 &apos;소인배&apos;로 폄하됩니다\.</P>\n\s*<P>오나라의 주역인 <b>주유</b>는 적벽대전을 승리로 이끈 넓은 도량의 대도독이지만, 소설에서는 제갈량에게 열등감을 느끼고 피를 토하며 죽는 &apos;속 좁은 패자&apos;로 왜곡되었습니다\. <b>손권</b> 역시 훌륭한 수성\(守城\)의 군주이자 외교의 달인이었지만 촉한정통론 아래 존재감이 옅은 &apos;조연&apos;으로 축소되었습니다\.</P>\n\s*</div>\n\s*</div>\n\s*<div style=\{\{ position: \'absolute\', bottom: \'-2rem\', right: \'0\', fontSize: \'14px\', color: \'#aaa\', textAlign: \'right\', letterSpacing: \'0\.02em\' \}\}>\n\s*\{subSlide \+ 1\} / 2\{subSlide === 0 \? \' ↓\' : \'\'\}\n\s*</div>\n\s*</div>',
"""<div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P>촉의 주요 인물들은 연의에서 고도로 영웅화되었습니다. <b>유비</b>는 기회주의적 생존가에서 &apos;덕과 인의 성군&apos;으로, <b>관우</b>는 오만한 무장에서 오관참육장 등 &apos;의리와 무신의 아이콘&apos;으로 승격되었습니다. <b>제갈량</b>은 정사의 뛰어난 행정가에서 신산귀모의 만능 책사이자 도술가로 묘사됩니다.</P>
                                <P>반면 <b>조조</b>는 둔전제 개혁과 건안문학을 이끈 능력 있는 군주(&quot;치세의 능신&quot;)임에도 불구하고, 유비와 대비되는 &quot;내가 천하를 버릴지언정...&quot; 식의 극악무도한 &apos;간웅&apos;으로 그 이미지가 극대화되었습니다.</P>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SLIDE 13: CHAPTER 8 cont ─── */}
                <div className={styles.slide}>
                    <div className={styles.chapterLayout}>
                        <div className={styles.chapterLeft}>
                            <h2 className={styles.chapterTitle}>
                                <span className={styles.chapterNum}>08.</span> Character Interpretations
                            </h2>
                        </div>
                        <div className={styles.chapterRight}>
                            <div className={styles.chapterBody}>
                                <P><b>사마의</b>의 경우, 조조 휘하에서 신뢰를 구축하며 최종 승자가 된 인물이지만, 제갈량을 상대했다는 이유로 쫓기고 놀림받는 &apos;소인배&apos;로 폄하됩니다.</P>
                                <P>오나라의 주역인 <b>주유</b>는 적벽대전을 승리로 이끈 넓은 도량의 대도독이지만, 소설에서는 제갈량에게 열등감을 느끼고 피를 토하며 죽는 &apos;속 좁은 패자&apos;로 왜곡되었습니다. <b>손권</b> 역시 훌륭한 수성(守城)의 군주이자 외교의 달인이었지만 촉한정통론 아래 존재감이 옅은 &apos;조연&apos;으로 축소되었습니다.</P>
                            </div>
                        </div>""", content)


# 11. Replace indicator logic
content = content.replace("onClick={() => { setCurrentSlide(idx); setSubSlide(0); }}", "onClick={() => setCurrentSlide(idx)}")

# 12. Adjust currentSlide mapping for charts
content = content.replace("currentSlide === 11 && (", "currentSlide === 15 && (")
content = content.replace("currentSlide === 12 && <DemographicChart", "currentSlide === 16 && <DemographicChart")
content = content.replace("currentSlide === 13 && <WarlordFlowChart", "currentSlide === 17 && <WarlordFlowChart")
content = content.replace("currentSlide === 14 && <BattleBubbleChart", "currentSlide === 18 && <BattleBubbleChart")
content = content.replace("currentSlide === 15 && <RelationshipNetwork", "currentSlide === 19 && <RelationshipNetwork")
content = content.replace("currentSlide === 16 && <TerritorialMap", "currentSlide === 20 && <TerritorialMap")

# 13. I'll remove padding wrapper around DynamicTimelineChart here again too!
content = re.sub(r'<div style=\{\{ width: \'100%\', height: \'100%\', padding: \'6vh 4vw\' \}\}>\n\s*<DynamicTimelineChart />\n\s*</div>', '<DynamicTimelineChart />', content)

with open('app/(sub)/inu-score/PresentationInfographic.tsx', 'w') as f:
    f.write(content)
print("Finished safe flattening!")
