import re

with open('app/(sub)/graduation-show/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add imports
import_str = "Give4Diagram,"
new_imports = "Give4Diagram, Ask1Diagram, Ask2Diagram, Ask3Diagram, Ask4Diagram, Stay1Diagram, Stay2Diagram, Stay3Diagram, Stay4Diagram, Eat1Diagram, Eat2Diagram, Eat3Diagram, Eat4Diagram,"
content = content.replace(import_str, new_imports)

# 2. Add JSX
new_sections = """
                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>Ask (묻다)</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16rem', marginTop: '4rem' }}>
                        {/* Ask 1 */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 6. Ask 1 — Morphological Contrast (묻다 1 — 형태론적 대조)</div>
                                <Ask1Diagram />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Ask 1</h3>
                                    <p>English secures politeness by maintaining the core verb (ask) and attaching syntactic padding outside the clause to widen the psychological distance between speaker and listener.</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>묻다 1</h3>
                                    <p>영어는 핵심 동사(ask)의 형태를 고정시킨 채, 조동사나 완곡 표현 등 문장 바깥의 통사적 완충재를 덧붙여 화자와 청자 사이의 심리적 거리를 벌리고 공손성을 확보합니다. 반면 한국어는 문장 외부가 아닌 동사 내부로 침투하여, 문법 형태소(-시-)를 엄격한 순서대로 쌓아 올리거나 어근 자체를 전면 교체(여쭙-)하는 형태론적 변환을 통해 수직적 위계와 격식을 표현합니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* Ask 2 */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start', marginTop: '0' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 7. Ask 2 — Structural Metaphor (묻다 2 — 구조적 은유)</div>
                                <Ask2Diagram />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Ask 2</h3>
                                    <p>This graphic metaphorizes English’s strategic politeness structure, where a soft cushion expands flexibly like a round halo around an unchanging semantic core (purple) to mitigate interpersonal impact. In Korean, roots, grammatical morphemes, and politeness markers are mechanically assembled like Lego blocks. This reflects the strict normative pressure of agglutinative languages, where combinations are forcibly controlled by hierarchy and formality.</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>묻다 2</h3>
                                    <p>변하지 않는 의미의 핵(보라색)을 중심으로, 부드러운 완충재(초록색)가 마치 둥근 후광처럼 유연하게 팽창하며 대인적 충격을 완화해 나가는 영어 특유의 전략적인 공손성 구조를 은유한 그래픽입니다. 반면 한국어는 어근, 문법 형태소, 공손 표지가 각기 다른 기능의 레고 블록처럼 기계적으로 조립·교체됩니다. 이는 파악된 위계와 격식에 따라 결합 방식이 강제로 통제되는 교착어 특유의 엄격한 규범적 압력을 시각화한 것입니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* Ask 3 */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start', marginTop: '0' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 8. Ask 3 — Listener Formality (묻다 3 — 청자 격식)</div>
                                <Ask3Diagram />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Ask 3</h3>
                                    <p>The horizontal social distance from the listener is expressed along the X-axis. It illustrates how sentence-ending blocks are replaced horizontally based on the distance between an intimate listener (cyan) and a formal listener (maroon).</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>묻다 3</h3>
                                    <p>청자와의 수평적인 사회 거리를 나타내는 좌표계의 X축 시각화입니다. 사적으로 친밀한 청자(청록색)와 공적으로 격식을 갖춰야 하는 청자(자주색)라는 거리감의 차이에 따라 종결 어미 블록이 수평적으로 교체되는 양상을 보여줍니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* Ask 4 */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start', marginTop: '0' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 9. Ask 4 — Referent Coordinate (묻다 4 — 주체 및 객체 높임)</div>
                                <Ask4Diagram />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Ask 4</h3>
                                    <p>The vertical hierarchy of the referent can be expressed along the Y-axis. Starting from a neutral layer, it demonstrates the vertical layer expansion triggered by a subject-honoring suffix (-si-) and an object-honoring suppletive (yeojjupda).</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>묻다 4</h3>
                                    <p>언급되는 대상의 수직적 위계를 나타내는 좌표계의 Y축 시각화입니다. 중립 층위에서 출발해, 주체를 높이는 어미(-시-)와 객체를 높이는 보충 어휘(여쭙다)가 개입하여 일으키는 수직적인 층위 확장을 단계적으로 보여줍니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>Stay (있다)</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16rem', marginTop: '4rem' }}>
                        {/* Stay 1 */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 10. Stay 1 — Morphological Contrast (있다 1 — 형태론적 대조)</div>
                                <Stay1Diagram />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Stay 1</h3>
                                    <p>English secures politeness by maintaining the core verb (stay) and attaching syntactic padding outside the clause to widen the psychological distance between speaker and listener.</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>있다 1</h3>
                                    <p>영어는 핵심 동사(stay)의 형태를 고정시킨 채, 조동사나 가정법 등 문장 바깥의 통사적 완충재를 덧붙여 화자와 청자 사이의 심리적 거리를 벌리고 공손성을 확보합니다. 반면 한국어는 문장 외부가 아닌 동사 내부로 침투하여, 문법 형태소를 엄격하게 결합(있으시다)하거나 어근 자체를 완전히 전면 교체(계시다)하는 형태론적 변환을 통해 수직적 위계와 격식을 표현합니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* Stay 2 */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start', marginTop: '0' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 11. Stay 2 — Structural Metaphor (있다 2 — 구조적 은유)</div>
                                <Stay2Diagram />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Stay 2</h3>
                                    <p>This graphic metaphorizes English’s strategic politeness structure, where a soft cushion expands flexibly like a round halo around an unchanging semantic core (purple) to mitigate interpersonal impact. In Korean, roots, grammatical morphemes, and politeness markers are mechanically assembled like Lego blocks. This reflects the strict normative pressure of agglutinative languages, where combinations are forcibly controlled by hierarchy and formality.</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>있다 2</h3>
                                    <p>변하지 않는 의미의 핵(보라색)을 중심으로, 부드러운 완충재(초록색)가 마치 둥근 후광처럼 유연하게 팽창하며 대인적 충격을 완화해 나가는 영어 특유의 전략적인 공손성 구조를 은유한 그래픽입니다. 어근, 문법 형태소, 공손 표지가 각기 다른 기능의 레고 블록처럼 기계적으로 조립·교체됩니다. 이는 파악된 위계와 격식에 따라 결합 방식이 강제로 통제되는 교착어 특유의 엄격한 규범적 압력을 시각화한 것입니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* Stay 3 */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start', marginTop: '0' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 12. Stay 3 — Listener Formality (있다 3 — 청자 격식)</div>
                                <Stay3Diagram />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Stay 3</h3>
                                    <p>The horizontal social distance from the listener is expressed along the X-axis. It illustrates how sentence-ending blocks are replaced horizontally based on the distance between an intimate listener (cyan) and a formal listener (maroon).</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>있다 3</h3>
                                    <p>청자와의 수평적인 사회 거리를 나타내는 좌표계의 X축 시각화입니다. 사적으로 친밀한 청자(청록색)와 공적으로 격식을 갖춰야 하는 청자(자주색)라는 거리감의 차이에 따라 종결 어미 블록이 수평적으로 교체되는 양상을 보여줍니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* Stay 4 */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start', marginTop: '0' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 13. Stay 4 — Referent Coordinate (있다 4 — 주체 및 객체 높임)</div>
                                <Stay4Diagram />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Stay 4</h3>
                                    <p>The vertical hierarchy of the referent can be expressed along the Y-axis. Starting from a neutral layer, it shows the layer expansion triggered by an indirect subject-honoring suffix (-usi-) and a direct subject-honoring suppletive (gyesida).</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>있다 4</h3>
                                    <p>언급되는 대상의 수직적 위계를 나타내는 좌표계의 Y축 시각화입니다. 중립 층위에서 출발해, 주체를 간접적으로 높이는 방식(있으시다)과 직접적으로 높이는 보충 어휘(계시다)가 개입하며 일으키는 층위 확장을 보여줍니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>Eat (먹다)</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16rem', marginTop: '4rem' }}>
                        {/* Eat 1 */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 14. Eat 1 — Morphological Contrast (먹다 1 — 형태론적 대조)</div>
                                <Eat1Diagram />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Eat 1</h3>
                                    <p>English secures politeness by maintaining the core verb (eat) and attaching syntactic padding outside the clause to widen the psychological distance between speaker and listener. Conversely, Korean expresses vertical hierarchy and formality through morphological transformations—penetrating the verb to replace the base stem (meok-) entirely with a suppletive form (deusi-).</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>먹다 1</h3>
                                    <p>영어는 핵심 동사(eat)의 형태를 고정시킨 채, 조동사나 완곡 표현 등 문장 바깥의 통사적 완충재를 덧붙여 화자와 청자 사이의 심리적 거리를 벌리고 공손성을 확보합니다. 반면 한국어는 문장 외부가 아닌 동사 내부로 침투하여, 기본 어근(먹-)을 특수 어휘(드시-)로 완전히 전면 교체하는 극단적인 형태론적 변환을 통해 화자와 청자 사이의 수직적 위계와 격식을 표현합니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* Eat 2 */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start', marginTop: '0' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 15. Eat 2 — Structural Metaphor (먹다 2 — 구조적 은유)</div>
                                <Eat2Diagram />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Eat 2</h3>
                                    <p>This graphic metaphorizes English’s strategic politeness structure, where a soft cushion expands flexibly like a round halo around an unchanging semantic core (purple) to mitigate interpersonal impact. This shows the mechanical assembly of a suppletive form (brown block) replacing the base root. It visualizes how agglutinative languages strictly control and alter base word forms based on perceived hierarchy.</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>먹다 2</h3>
                                    <p>변하지 않는 의미의 핵(보라색)을 중심으로, 부드러운 완충재(초록색)가 마치 둥근 후광처럼 유연하게 팽창하며 대인적 충격을 완화해 나가는 영어 특유의 전략적인 공손성 구조를 은유한 그래픽입니다. 어근을 완전히 전면 교체하는 보충 어휘(갈색 블록)의 기계적인 조립 양상을 보여줍니다. 이는 파악된 위계에 따라 기본 어형이 파괴되고 강제로 통제되는 교착어 특유의 엄격한 규범적 압력을 시각화한 것입니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* Eat 3 */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start', marginTop: '0' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 16. Eat 3 — Listener Formality (먹다 3 — 청자 격식)</div>
                                <Eat3Diagram />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Eat 3</h3>
                                    <p>The horizontal social distance from the listener is expressed along the X-axis. It illustrates how sentence-ending blocks are replaced horizontally based on the distance between an intimate listener (cyan) and a formal listener (maroon).</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>먹다 3</h3>
                                    <p>청자와의 수평적인 사회 거리를 나타내는 좌표계의 X축 시각화입니다. 사적으로 친밀한 청자(청록색)와 공적으로 격식을 갖춰야 하는 청자(자주색)라는 거리감의 차이에 따라 종결 어미 블록이 수평적으로 교체되는 양상을 보여줍니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* Eat 4 */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start', marginTop: '0' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 17. Eat 4 — Referent Coordinate (먹다 4 — 주체 및 객체 높임)</div>
                                <Eat4Diagram />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Eat 4</h3>
                                    <p>The vertical hierarchy of the referent can be expressed along the Y-axis. Since the object of eating (food) cannot be socially elevated, the vertical layer expansion is strictly limited to the subject-honoring suppletive (deusida) without an object-honoring tier.</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>먹다 4</h3>
                                    <p>언급되는 대상의 수직적 위계를 나타내는 Y축 시각화입니다. 취식의 대상(음식)은 사회적으로 높일 수 없어 객체 높임이 성립하지 않으므로, 주체 높임(드시다)으로만 수직적인 층위 확장이 제한되는 엄격한 규칙을 보여줍니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
"""

# Find where to insert it. Just before </section> which comes after Give 4.
pattern = re.compile(
    r"(<div className=\{styles\.krCol\}>\s*<h3>주다 4<\/h3>\s*<p>언급되는 대상의 수직적 위계를 Y축을 통해 표현할 수 있습니다.*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)",
    re.DOTALL
)

new_content, count = pattern.subn(r"\1" + new_sections, content)

print(f"Replaced {count} instances.")

if count > 0:
    with open('app/(sub)/graduation-show/page.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
