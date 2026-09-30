"use client";

import React from "react";
import styles from "./GraduationShow.module.css";
import { CoordinateMatrix, SymbolLegend, RelationalDiagram } from "./components/Chapter1Diagrams";
import { NunchiFig1, NunchiFig2, NunchiFig1_2, NunchiFig3 } from "./components/Chapter3Diagrams";
import { Give1Diagram, Give2Diagram, Give3Diagram, Give4Diagram, Ask1Diagram, Ask2Diagram, Ask3Diagram, Ask4Diagram, Stay1Diagram, Stay2Diagram, Stay3Diagram, Stay4Diagram, Eat1Diagram, Eat2Diagram, Eat3Diagram, Eat4Diagram } from "./components/Chapter2Diagrams";

export default function GraduationShowPage() {
    return (
        <main className={styles.container} data-page="graduation-show">
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    {/* Title removed per request */}
                </div>
            </section>

            <section className={styles.contentSection}>
                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>Foreword</h2>
                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <p>
                                Design is fundamentally a tool for communication, and the most basic unit of that communication is spoken and written language. The language we use goes beyond simply conveying information; it determines how we form relationships with others and how we view society. This book explores how two languages, English and Korean, shape different sociocultural environments. It is not an attempt to judge the superiority of a language, but a project to objectively illuminate the differences between the two cultures through language.<sup>1</sup>
                            </p>
                        </div>
                        <div className={styles.krCol}>
                            <p>
                                디자인은 본질적으로 의사소통의 도구이며, 그 의사소통의 가장 기본이 되는 단위는 말과 글입니다. 우리가 사용하는 언어는 단순히 정보를 전달하는 수단을 넘어, 우리가 타인과 관계를 맺고 사회를 바라보는 방식을 결정합니다. 이 책은 영어와 한국어라는 두 언어가 어떻게 서로 다른 사회문화적 환경을 형성하는지 탐구합니다. 언어의 우열을 가리기 위함이 아니라, 언어를 통해 두 문화의 차이를 객관적으로 조명하기 위한 작업입니다.<sup>1</sup>
                            </p>
                        </div>
                        <div className={`${styles.note} ${styles.enNote}`}>
                            <sup>1</sup> A note on scope:<br />
                            The cultural characteristics discussed in this book are explained based on general tendencies to clearly contrast the two linguistic systems. We acknowledge that actual everyday communication may vary depending on various social factors such as an individual&apos;s class, generation, and region.
                        </div>
                        <div className={`${styles.note} ${styles.krNote}`}>
                            <sup>1</sup> 범위에 대한 전제:<br />
                            이 책에서 다루는 문화적 특징은 두 언어 체계를 명확히 대조하기 위해 보편적인 경향성을 바탕으로 설명합니다. 실제 일상에서의 소통은 개인의 계층, 세대, 지역 등 다양한 사회적 요인에 따라 다르게 나타날 수 있음을 미리 밝힙니다.
                        </div>
                    </div>
                </div>

                <div className={styles.reveal}>
                    <h2 className={styles.sectionTitle}>Introduction</h2>
                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <p>This book is a visual research publication that examines how English and Korean construct sociocultural environments differently.</p>
                            <h3>Research Question</h3>
                            <p>How do English and Korean construct the sociocultural world differently?</p>
                            <h3>Structure</h3>
                            <p>This book investigates the question above through six chapters. Each chapter is composed of three phases:</p>
                            <ol className={styles.chapterList}>
                                <li>
                                    <strong>1. Research</strong>
                                    Academic analysis of how the two languages encode a specific sociocultural domain differently.
                                </li>
                                <li>
                                    <strong>2. Differences and Examples & Visual Experiment and Practice</strong>
                                    Introduction of 5 to 10 key vocabulary words and situational examples that demonstrate concrete linguistic and cultural differences within each domain.
                                </li>
                            </ol>
                        </div>
                        <div className={styles.krCol}>
                            <p>이 책은 영어와 한국어가 사회문화적 환경을 어떻게 다르게 구성하는지를 탐구하는 시각적 연구 서적입니다.<br />책의 구성은 아래와 같이 진행됩니다.</p>
                            <h3>연구 질문</h3>
                            <p>영어와 한국어는 사회문화적 세계를 어떻게 다르게 구성하는가.</p>
                            <h3>구성</h3>
                            <p>이 책은 위의 질문을 여섯 개의 장(章)을 통해 탐구합니다. 각 장은 세 단계로 구성됩니다:</p>
                            <ol className={styles.chapterList}>
                                <li>
                                    <strong>1. 선행연구</strong>
                                    두 언어가 특정 사회문화적 영역을 어떻게 다르게 부호화하는지에 대한 학술적 분석.
                                </li>
                                <li>
                                    <strong>2. 차이와 예시 & 시각 실험과 실천</strong>
                                    각 영역 내에서 구체적인 언어적, 문화적 차이를 보여주는 5~10개의 주요 단어와 상황 예시 소개. 연구된 언어적 맥락을 그래픽 시스템, 다이어그램, 타이포그래피 실험으로 변환.
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <p>The six chapters are as follows:</p>
                            <ol className={styles.chapterList}>
                                <li><strong>1. Addressing and Social Hierarchy</strong>How the two languages position speakers within social relationships through address terms, kinship vocabulary, and naming conventions.</li>
                                <li><strong>2. Grammatical Politeness and Social Distance</strong>How the grammatical structures of the two languages encode or bypass hierarchical distance between speakers.</li>
                                <li><strong>3. Situational Perception and Social Norms</strong>How the two languages articulate implicit social awareness, atmosphere reading, and normative expectations in communication.</li>
                                <li><strong>4. Conversation Structure and Pragmatic Response</strong>How the two languages differ in structuring agreement, disagreement, and perspectival alignment within dialogue.</li>
                                <li><strong>5. Emotional Vocabulary and Interpersonal Expectations</strong>How the two languages distinguish between individual psychological states and relationally contingent emotional expressions.</li>
                                <li><strong>6. Writing Systems and Cognitive Rhythm</strong>How the physical structures of the Latin alphabet and Hangul create differences in visual perception, reading rhythm, and the relationship between written and spoken language.</li>
                            </ol>

                            <h3>Methodology and Purpose</h3>
                            <p>As stated in the Foreword, design is fundamentally a tool for communication, and language is its most basic unit. The purpose of this project is to serve as a visual medium where people from different cultural backgrounds can understand and introduce each other&apos;s cultures.</p>
                            <p>To achieve this, the methodology of this book is driven by a rigorous threestep process repeated in every chapter. It begins with establishing a theoretical foundation (Research), grounds that theory in concrete linguistic realities through specific vocabulary (Differences and Examples), and culminates in active design application (Visual Experiment and Practice).</p>
                            <p>Through this systematic progression, the book translates the specific cultural contexts in which words are used into visual images and graphic systems, rather than simply translating dictionary meanings. The ultimate goal is to make the ambiguous boundaries of invisible language visible through design.</p>
                        </div>
                        <div className={styles.krCol}>
                            <p>여섯 개의 장은 다음과 같습니다:</p>
                            <ol className={styles.chapterList}>
                                <li><strong>1. 호칭과 사회적 위계</strong>두 언어가 호칭, 친족 어휘, 명명 방식을 통해 화자를 사회적 관계 안에 어떻게 위치시키는지를 다룹니다.</li>
                                <li><strong>2. 문법적 경어와 사회적 거리</strong>두 언어의 문법 구조가 화자 간의 위계적 거리를 어떻게 부호화하거나 생략하는지를 다룹니다.</li>
                                <li><strong>3. 상황 인지와 사회적 규범</strong>두 언어가 암묵적인 사회적 인식, 분위기 파악, 소통에서의 규범적 기대를 어떻게 표현하는지를 다룹니다.</li>
                                <li><strong>4. 대화 구조와 화용적 응답</strong>두 언어가 대화 내에서 동의, 비동의, 관점의 정렬을 구조화하는 방식의 차이를 다룹니다.</li>
                                <li><strong>5. 감정 어휘와 대인적 기대</strong>두 언어가 개인의 심리적 상태와 관계에 의존하는 감정 표현을 어떻게 구별하는지를 다룹니다.</li>
                                <li><strong>6. 문자 체계와 인지적 리듬</strong>라틴 알파벳과 한글의 물리적 구조가 시각적 인지, 읽기 리듬, 그리고 문어와 구어의 관계에 어떤 차이를 만들어내는지를 다룹니다.</li>
                            </ol>

                            <h3>방법론 및 목적</h3>
                            <p>서문에서 밝혔듯 디자인은 본질적으로 의사소통의 도구이며, 언어는 그 가장 기본이 되는 단위입니다. 이 프로젝트의 목적은 서로 다른 문화권을 가진 사람들이 문화적 차이를 이해하고 소개할 수 있는 시각적 매개체가 되는 데 있습니다.</p>
                            <p>이를 실현하기 위한 핵심 방법론으로서, 책의 모든 장은 두 과정을 반복합니다. 먼저 선행되었던 연구 자료를 기록하고, 이를 구체적인 단어와 예시를 통해 실제 언어 현상에 적용하며(실질적 차이와 예시), 최종적으로 디자인 영역으로 전환합니다.</p>
                            <p>이러한 체계적인 과정을 통해 단순히 사전적 의미를 번역하는 것을 넘어, 단어가 사용되는 맥락을 시각 이미지와 그래픽 시스템으로 변환합니다. 최종적으로, 보이지 않는 언어의 애매한 경계를 디자인을 통해 시각화하는 것이 이 책의 목적입니다.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chapter 1 */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.chapterTitle}>Addressing and Social Hierarchy</h1>
                    <p className={styles.chapterTitleKr}>호칭과 사회적 위계</p>
                </div>
            </section>

            <section className={styles.contentSection}>
                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>1. Research</h2>
                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <p>The English language defaults to the individual as an independent entity. In public and professional registers, individuals are addressed by their names or universal titles. Biological kinship terms (e.g., brother, sister, uncle) are strictly bound to actual family relations. While exceptions exist in specific subcultures or religious communities, extending family titles to nonrelatives in everyday public spheres is atypical. The linguistic structure does not obligate the speaker to encode age or hierarchy into the term of address.</p>
                            <p>Korean processes social relations through a dynamic coordinate system based on the mechanism of &apos;fictive kinship extension.&apos;<sup>1</sup><sup>2</sup><sup>3</sup><sup>4</sup> Biological family roles function as a metaphor mapped onto the entire nonfamily public sphere. A speaker does not perceive others as symmetrical individuals, but as nodes in a relational network. To address another person, the speaker must calculate a three-dimensional coordinate consisting of age, gender, and social solidarity.</p>
                            <p>This calculation operates in real-time. For example, the English word Brother is composed of +Kinship and +Sibling: Male. The Korean equivalent, Hyung (형), requires a more complex algorithm: ±Kinship (Fictive Extension) + +Speaker: Male + +Target: Male + +Hierarchy: Older + +Social Solidarity. Based on these address conventions, English speakers tend to address others as independent entities, whereas Korean speakers tend to construct a hierarchical and affective coordinate system that binds the speaker and the listener.</p>
                            <p>In English, the single pronoun &apos;You&apos; applies equally to all interlocutors. Within this structure, a speaker tends to initiate conversation without first ascertaining the other person&apos;s age, occupation, or social status — the two parties are placed on a linguistically horizontal plane. In contrast, the Korean relational coordinate system tends not to function properly unless vertical information — such as age, enrollment year, or professional rank — is confirmed first. Without such information, there is no basis for determining the appropriate level of honorific speech or the correct address term. Therefore, asking a stranger&apos;s age, enrollment year, or year of hire in Korean culture can be interpreted not as an impolite question, but rather as an essential &apos;initial coordinate setting&apos; process required to activate the correct grammatical honorific system and address terms.</p>
                        </div>
                        <div className={styles.krCol}>
                            <p>영어는 사람을 부를 때, 각 개인을 독립된 존재로 다루는 경향이 있습니다. 공적이거나 직업적인 관계에서 개인은 이름이나 Mr., Ms. 같은 보편적 호칭으로 불립니다. Brother, Sister, Uncle과 같은 생물학적 친족 어휘는 실제 가족 관계에 엄격하게 결속되어 있는 경향이 있습니다. 특정 하위문화나 종교 공동체에서는 예외가 존재하지만, 일상적인 공공 영역에서 가족 호칭을 혈연이 아닌 타인에게까지 확장하여 사용하는 것은 이례적입니다. 이러한 언어 구조 속에서 화자는 상대방을 부를 때, 나이나 서열 정보를 호칭 안에 반드시 담아야 할 의무가 크지 않은 경향이 있습니다.</p>
                            <p>한국어는 사회적 관계를 처리할 때, &apos;가상 친족 확장&apos;<sup>1</sup>이라는 독특한 메커니즘에 기반한 관계적 좌표계를 사용하는 경향이 있습니다.<sup>2</sup><sup>3</sup><sup>4</sup> 이는 원래 가족 내부에서만 사용되던 호칭 체계(형, 누나, 오빠, 언니 등)가 비혈연 관계, 즉 사회 전반의 공적 영역으로까지 확장되어 적용되는 현상을 말합니다. 이 체계 안에서 화자는 상대방을 자신과 동등한 독립된 개인으로 인식하기보다, 자신을 중심으로 한 관계망 속에서 특정 위치를 점유하는 존재로 인식하는 경향이 있습니다. 따라서 누군가를 부르기 위해서는 상대방의 나이, 성별, 그리고 나와의 사회적 친밀도라는 세 가지 변수를 실시간으로 파악하고 계산해야 하는 경향이 있습니다.</p>
                            <p>이 계산 과정은 대화가 시작되는 순간 실시간으로 이루어집니다. 영어 단어 &apos;Brother&apos;가 담고 있는 정보는 비교적 단순합니다. +혈연과 +남자 형제라는 두 가지 조건만 충족되면 사용할 수 있습니다. 반면, 한국어에서 이에 대응하는 &apos;형&apos;이라는 단어 하나가 성립하려면 훨씬 많은 조건이 동시에 충족되어야 합니다. 말하는 사람(화자)이 남성이어야 하고 +화자: 남성, 상대방도 남성이어야 하며 +대상: 남성, 상대방이 나보다 나이가 많아야 하고 +위계: 연상, 두 사람 사이에 일정 수준 이상의 친밀감이 형성되어 있어야 합니다 +사회적 연대. 여기에 실제 혈연이 아니더라도 이 호칭을 사용할 수 있다는 가상 확장의 조건 ±혈연(가상 확장)까지 더해집니다. 이러한 호칭 구조의 차이에 따라, 영어 화자가 누군가를 부를 때는 상대방을 하나의 독립된 개인으로 지칭하는 경향이 있는 반면, 한국어 화자가 누군가를 부를 때는 자신과 상대방 사이의 나이, 성별, 친밀도를 복합적으로 반영하는 위계적이고 정서적인 관계 좌표를 구축하는 경향이 있다고 해석할 수 있습니다.</p>
                            <p>영어에서는 &apos;You&apos;라는 하나의 대명사가 모든 상대방에게 동일하게 적용됩니다. 이 구조 안에서 화자는 상대방의 나이, 직업, 사회적 지위를 미리 파악하지 않아도 대화를 시작할 수 있는 경향이 있습니다. 대화의 두 주체가 언어적으로 수평적인 위치에 놓이기 때문입니다. 반면, 한국어의 관계 좌표계는 나이, 학번, 직급 같은 수직적 정보가 먼저 확인되지 않으면 올바르게 작동하기 어려운 경향이 있습니다. 적절한 높임말의 단계와 호칭을 결정할 기준이 부재하기 때문입니다. 따라서 한국 문화에서 처음 만난 사람에게 나이나 학번, 입사 연도를 묻는 행위는 무례한 질문이라기보다, 올바른 문법적 존대 체계와 호칭을 작동시키기 위해 반드시 거쳐야 하는 &apos;초기 좌표 설정&apos; 과정에 가깝다고 볼 수 있습니다.</p>
                        </div>
                        <div className={`${styles.note} ${styles.enNote}`}>
                            <sup>1</sup> Fictive Kinship: A socio-anthropological concept established by scholars such as A. R. Radcliffe-Brown, referring to the practice of regarding non-biological and non-legal individuals as social kin members and applying kinship terminology and relational bonds to them.<br />
                            <sup>2</sup> Kim, H. K. (1967). &quot;Mechanism of Fictive Kinship Extension,&quot; Language Research, Language Education Institute, Seoul National University.<br />
                            <sup>3</sup> King, R. (2006). Korean Language in Culture and Society, University of Hawaii Press.<br />
                            <sup>4</sup> Radcliffe-Brown, A. R. (1952). Structure and Function in Primitive Society, Free Press.
                        </div>
                        <div className={`${styles.note} ${styles.krNote}`}>
                            <sup>1</sup> 가상 친족(Fictive Kinship): 생물학적 또는 법적 혈연관계가 아닌 타인을 사회적으로 친족 성원으로 간주하여 호칭 및 유대 관계를 적용하는 사회인류학적 개념 (A. R. 래드클리프-브라운 등 확립).<br />
                            <sup>2</sup> 김한곤 (1967). 「가상 친족 확장 메커니즘」,「어학연구」, 서울대학교 언어교육원.<br />
                            <sup>3</sup> 킹, R. (2006).「문화와 사회 속의 한국어」, 하와이 대학교 출판부.<br />
                            <sup>4</sup> 레드클리프-브라운, A. R. (1952).「원시사회의 구조와 기능」, 프리 프레스.
                        </div>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>2. Differences and Examples &amp; Visual Experiment and Practice</h2>
                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <h3>Mapping System: The Two-Dimensional Relational Axes</h3>
                            <p>The vocabulary of each chapter is mapped onto a two-dimensional coordinate system. The vertical axis (Y) represents social Hierarchy, specifically indicating the degree of biological, generational, or institutional seniority between the speaker and the listener. The horizontal axis (X) represents Social Distance &amp; Permanence, indicating the degree of relational intimacy, durability, and the domain-specificity of the bond.</p>
                            <p>A term placed high on the Y-axis reflects a strong power differential, while a term placed at the far right of the X-axis reflects a wide social distance or a transient, anonymous relationship. These two axes are independent variables. That is, a single term may be high in hierarchy while simultaneously low in social distance (e.g., Hyeong — representing both a higher social seniority than the speaker and a strong sense of solidarity). Conversely, a term may be neutral in hierarchy while high in social distance (e.g., Sir/Ma&apos;am — an anonymous and transactional relationship). Operating together, the two axes enable each address term to occupy a precise, non-overlapping coordinate within the relational space.<sup>5</sup></p>
                        </div>
                        <div className={styles.krCol}>
                            <h3>매핑 시스템: 2차원 관계 좌표축</h3>
                            <p>각 챕터의 어휘는 2차원 좌표계 위에 배치됩니다. 세로축(Y)은 사회적 위계를 나타냅니다. 화자와 청자 사이에 존재하는 생물학적, 세대적, 또는 제도적 서열 차이의 크기를 의미합니다. 가로축(X)은 사회적 거리와 관계의 지속성을 나타냅니다. 두 사람 사이의 친밀함이 얼마나 깊은지, 그 관계가 얼마나 오래 지속되는지, 그리고 특정 영역(직장, 학교 등)에 한정된 관계인지 여부를 반영합니다.</p>
                            <p>세로축에서 높은 위치에 놓인 단어일수록 강한 권력 차이를 반영하는 경향이 있고, 가로축에서 오른쪽 끝에 위치한 단어일수록 넓은 사회적 거리 혹은 일회성·익명적 관계를 반영하는 경향이 있습니다. 이 두 축은 서로 독립적으로 작동합니다. 즉, 하나의 단어가 위계에서는 높은 위치에 있으면서 동시에 사회적 거리에서는 가까운 위치에 있을 수 있습니다. 예를 들어 &apos;형&apos;은 화자보다 사회적 서열이 높으면서도 강한 연대감을 동시에 담고 있는 호칭입니다. 반대로 위계에서는 중립적이면서 사회적 거리에서는 먼 위치에 있는 호칭도 있습니다. Sir나 Ma&apos;am은 이름도 모르는 상대방에게 일회적으로 사용되는 익명적인 관계의 호칭입니다. 이 두 축이 함께 작동함으로써, 각 호칭은 관계 공간 안에서 겹치지 않는 고유한 좌표를 점유할 수 있게 됩니다.<sup>5</sup></p>
                        </div>
                        <div className={`${styles.note} ${styles.enNote}`}>
                            <sup>5</sup> To ensure visual legibility and articulate relational directionality effectively, the physical scale and layout of certain complex address nodes are flexibly adjusted rather than rigidly confined within the absolute boundaries of the 3×3 (9-quadrant) grid matrix.
                        </div>
                        <div className={`${styles.note} ${styles.krNote}`}>
                            <sup>5</sup> 다이어그램의 시각적 가독성(Legibility)과 정보 전달력을 확보하기 위해, 일부 복합 호칭 노드의 물리적 크기와 배치는 9개 구역(3×3 매트릭스) 그리드의 절대적인 경계에 엄격하게 종속되기보다는, 관계적 방향성과 위계 구조가 명확히 드러나도록 유연하게 비례 보정(Scalability Adjustment)되었습니다.
                        </div>
                    </div>
                </div>

                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '8rem auto 16rem auto', width: '100%', maxWidth: '1125px' }}>
                    <p style={{ color: "#7c7c7c", fontSize: "14px", fontWeight: 700, margin: "0 0 2rem 0", alignSelf: "flex-start" }}>Fig 1. Relational Matrix (관계 좌표계)</p>
                    <CoordinateMatrix />
                    <SymbolLegend />
                </div>
                {/* Vocabulary Cards: 001 ~ 009 */}
                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>001. Eoreun / 어른</h2>

                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <RelationalDiagram
                            speakerGender="neutral"
                            targetGender="neutral"
                            targetX={3}
                            targetY={3}
                            boundary="none"
                            speakerLabel={'Speaker : Gender-Neutral\n화자 : 성별 무관'}
                            targetLabel={'Target : Gender-Neutral\n청자 : 성별 무관'}
                            distanceLabel={'Distance(X): High\nHierarchy(Y): High'}
                            autoHint={true}
                        />
                    </div>

                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <p>Formula: (Speaker: Any) + (Target: Any) + (Hierarchy: Absolute Senior) + (Power Distance: Maximized) + (Social Domain: Unlimited)</p>
                            <p>Logic: The power distance variable is maximized, establishing a strong vertical distance between the speaker and the target. Without relying on fictive kinship extension, this term tends to demand vertical deference across all social domains.</p>
                            <p>Korean Approximation: adult, elder</p>
                            <p>Definition: This term does not simply refer to a person who has reached legal adulthood. It refers to an elder who commands social respect through accumulated experience and moral integrity. The presence of an eoreun tends to set a different standard of conduct in any given social setting.</p>
                            <p>Contextual Usage: &quot;Do not cross your legs in the presence of an eoreun.&quot; In this context, eoreun does not refer to a specific individual, but functions as a behavioral reference point across all social settings.</p>
                        </div>
                        <div className={styles.krCol}>
                            <p>공식: (화자: 무관) + (청자: 무관) + (위계: 절대적 연장자) + (권력 거리: 극대화) + (적용 영역: 무제한)</p>
                            <p>특징: 권력 거리 변수가 극대화되어, 화자와 청자 사이에 강한 수직적 거리감이 발생하는 구조입니다. 가족 호칭을 빌려오는 가상 친족 확장 없이도 사회의 모든 영역에서 수직적 존경을 요구하는 경향이 있습니다.</p>
                            <p>영문 유사어: adult, elder</p>
                            <p>정의: 단순히 법적으로 성인이 된 사람을 가리키는 것이 아니라, 오랜 경험과 도덕적 품성을 갖추어 사회적 존경을 받아야 하는 연장자를 의미합니다. 이 존재가 있는 자리에서는 행동의 기준이 달라지는 경향이 있습니다.</p>
                            <p>상황적 용례: &quot;어른 앞에서 다리를 꼬지 마라.&quot; 이 문장에서 &apos;어른&apos;은 특정한 개인이 아니라, 모든 사회적 장면에서 행동 규범의 기준점으로 작용하는 존재입니다.</p>
                        </div>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>002. Hyeong / Oppa / 형 / 오빠</h2>

                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <RelationalDiagram
                            speakerGender="neutral"
                            targetGender="neutral"
                            targetX={3}
                            targetY={3}
                            boundary="ingroup"
                            boundaryLabel="In-group : 내집단"
                            speakerLabel={'Speaker : Gender-Neutral\n화자 : 성별 무관'}
                            targetLabel={'Target : Gender-Neutral\n청자 : 성별 무관'}
                            distanceLabel={'Distance(X): High\nHierarchy(Y): High'}
                            autoHint={true}
                        />
                    </div>

                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <RelationalDiagram
                            speakerGender="female"
                            targetGender="male"
                            targetX={1}
                            targetY={1}
                            boundary="ingroup"
                            boundaryLabel="In-group : 내집단"
                            speakerLabel={'Speaker : Female\n화자 : 여성'}
                            targetLabel={'Target : Male\n청자 : 남성'}
                            distanceLabel={'Distance(X): Low\nHierarchy(Y): Low'}
                            autoHint={true}
                        />
                    </div>

                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <p>Formula (Hyeong): (Speaker: Male) + (Target: Male) + (Hierarchy: Older) + (Social Solidarity: High) + (Kinship Boundary: Fictive Extension)</p>
                            <p>Formula (Oppa): (Speaker: Female) + (Target: Male) + (Hierarchy: Older) + (Social Solidarity: High) + (Kinship Boundary: Fictive Extension)</p>
                            <p>Logic: This is the address term in which the mechanism of fictive kinship extension — expanding the boundary of biological family into the public domain — tends to operate most centrally. A clear hierarchy (the target being older than the speaker) exists, while simultaneously expressing a strong sense of social solidarity and closeness.</p>
                            <p>Korean Approximation: no direct equivalent</p>
                            <p>Definition: Hyeong is used by male speakers to address an older male; oppa is used by female speakers to address an older male. Both terms can be used regardless of actual blood relations.</p>
                            <p>Contextual Usage: A male student who enrolled one year earlier is addressed as hyeong within a university club. A close friend&apos;s boyfriend may also be addressed as oppa.</p>
                        </div>
                        <div className={styles.krCol}>
                            <p>공식(형): (화자: 남성) + (청자: 남성) + (위계: 연상) + (사회적 연대: 친밀함) + (친족 경계: 가상 확장)</p>
                            <p>공식(오빠): (화자: 여성) + (청자: 남성) + (위계: 연상) + (사회적 연대: 친밀함) + (친족 경계: 가상 확장)</p>
                            <p>특징: 생물학적 가족의 경계를 공적 영역으로 확장하는 가상 친족 확장 메커니즘이 가장 핵심적으로 작동하는 호칭입니다. 뚜렷한 위계(나보다 나이가 많음)가 존재하면서도 동시에 강한 사회적 연대감과 친밀함을 표현하는 경향이 있습니다.</p>
                            <p>영문 유사어: 직접적 대응어 없음</p>
                            <p>정의: 형은 남성이 자신보다 나이가 많은 남성을 부르는 호칭이고, 오빠는 여성이 자신보다 나이가 많은 남성을 부르는 호칭입니다. 두 호칭 모두 실제 혈연관계와 무관하게 사용될 수 있습니다.</p>
                            <p>상황적 용례: 대학 동아리에서 1년 먼저 입학한 남학생을 &quot;형&quot;이라고 부릅니다. 친한 친구의 남자친구를 &quot;오빠&quot;라고 부르는 경우도 있습니다.</p>
                        </div>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>003. Nuna / Eonni / 누나 / 언니</h2>

                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <RelationalDiagram
                            speakerGender="neutral"
                            targetGender="neutral"
                            targetX={2}
                            targetY={2}
                            boundary="ingroup"
                            boundaryLabel="In-group : 내집단"
                            speakerLabel={'Speaker : Gender-Neutral\n화자 : 성별 무관'}
                            targetLabel={'Target : Gender-Neutral\n청자 : 성별 무관'}
                            distanceLabel={'Distance(X): Mid\nHierarchy(Y): Mid'}
                            autoHint={true}
                        />
                    </div>

                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <RelationalDiagram
                            speakerGender="female"
                            targetGender="female"
                            targetX={1}
                            targetY={1}
                            boundary="none"
                            speakerLabel={'Speaker : Female\n화자 : 여성'}
                            targetLabel={'Target : Female\n청자 : 여성'}
                            distanceLabel={'Distance(X): Low\nHierarchy(Y): Low'}
                            autoHint={true}
                        />
                    </div>

                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <RelationalDiagram
                            speakerGender="male"
                            targetGender="female"
                            targetX={1}
                            targetY={1}
                            boundary="none"
                            speakerLabel={'Speaker : Male\n화자 : 남성'}
                            targetLabel={'Target : Female\n청자 : 여성'}
                            distanceLabel={'Distance(X): Low\nHierarchy(Y): Low'}
                            autoHint={true}
                        />
                    </div>

                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <p>Formula (Nuna): (Speaker: Male) + (Target: Female) + (Hierarchy: Older) + (Social Solidarity: High) + (Kinship Boundary: Fictive Extension)</p>
                            <p>Formula (Eonni): (Speaker: Female) + (Target: Female) + (Hierarchy: Older) + (Social Solidarity: High) + (Kinship Boundary: Fictive Extension)</p>
                            <p>Logic: Structurally identical to the Hyeong/Oppa system, with the target gender variable substituted from male to female. The mechanism of fictive kinship extension — encoding both hierarchy and social solidarity simultaneously — remains the same.</p>
                            <p>Korean Approximation: no direct equivalent</p>
                            <p>Definition: Nuna is used by male speakers to address an older female; eonni is used by female speakers to address an older female. Both terms apply beyond biological kinship and carry a sense of relational warmth alongside hierarchy.</p>
                            <p>Contextual Usage: A female colleague two years senior may be addressed as eonni within the workplace. The term can equally extend to an unfamiliar female vendor encountered in a market.</p>
                        </div>
                        <div className={styles.krCol}>
                            <p>공식(누나): (화자: 남성) + (청자: 여성) + (위계: 연상) + (사회적 연대: 친밀함) + (친족 경계: 가상 확장)</p>
                            <p>공식(언니): (화자: 여성) + (청자: 여성) + (위계: 연상) + (사회적 연대: 친밀함) + (친족 경계: 가상 확장)</p>
                            <p>특징: 형/오빠와 동일한 가상 친족 확장 메커니즘이 작동하며, 청자의 성별 변수만 여성으로 치환된 구조로 해석할 수 있습니다. 위계와 사회적 연대가 동시에 형성되는 방식을 공유합니다.</p>
                            <p>영문 유사어: 직접적 대응어 없음</p>
                            <p>정의: 누나는 남성이 자신보다 나이가 많은 여성을 부르는 호칭이고, 언니는 여성이 자신보다 나이가 많은 여성을 부르는 호칭입니다. 두 호칭 모두 실제 혈연관계와 무관하게 사용될 수 있습니다.</p>
                            <p>상황적 용례: 직장에서 2년 먼저 입사한 여성 선배를 &quot;언니&quot;라고 부르는 경우가 있습니다. 시장에서 처음 만나는 여성 상인에게도 동일하게 사용될 수 있습니다.</p>
                        </div>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>004. Witsaram / 윗사람</h2>

                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <RelationalDiagram
                            speakerGender="neutral"
                            targetGender="neutral"
                            targetX={3}
                            targetY={3}
                            boundary="ingroup"
                            boundaryLabel="In-group : 내집단"
                            speakerLabel={'Speaker : Gender-Neutral\n화자 : 성별 무관'}
                            targetLabel={'Target : Gender-Neutral\n청자 : 성별 무관'}
                            distanceLabel={'Distance(X): High\nHierarchy(Y): High'}
                            autoHint={true}
                        />
                    </div>

                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <p>Formula: (Speaker: Any) + (Target: Any) + (Hierarchy: Absolute Superior) + (Power Distance: Maximized) + (Social Domain: Unlimited) + (In-group: Relational)</p>
                            <p>Logic: Like eoreun, this term maximizes the power distance variable without invoking fictive kinship. However, whereas eoreun applies universally to any generational senior, witsaram tends to presuppose an existing relational hierarchy — such as a professional, academic, or familial network — in which the speaker is already positioned as a subordinate.</p>
                            <p>English Approximation: superior, senior</p>
                            <p>Definition: A person occupying a higher position within any shared social hierarchy — professional, academic, or familial — to whom deference is considered obligatory regardless of context.</p>
                            <p>Contextual Usage: &quot;When a witsaram instructs you, you act first.&quot; The term tends to operate across professional and familial settings alike, without distinction between public and private domains.</p>
                        </div>
                        <div className={styles.krCol}>
                            <p>공식: (화자: 무관) + (청자: 무관) + (위계: 절대적 상위) + (권력 거리: 극대화) + (적용 영역: 무제한) + (내집단: 관계적)</p>
                            <p>특징: 권력 거리 변수가 극대화된다는 점에서 &apos;어른&apos;과 구조를 공유하지만, &apos;어른&apos;이 보편적으로 적용되는 것과 달리 &apos;윗사람&apos;은 화자가 이미 특정 위계 관계망(직장, 학교, 가족 등) 안에 속해 있을 때 작동하는 경향이 있습니다.</p>
                            <p>영문 유사어: superior, senior</p>
                            <p>정의: 직장, 학교, 가족 등 특정 위계 구조 안에서 자신보다 높은 위치에 있는 사람을 가리킵니다. 해당 관계망 안에서는 공적·사적 구분 없이 복종이 전제되는 경향이 있습니다.</p>
                            <p>상황적 용례: &quot;윗사람이 시키면 일단 해.&quot; 직장·가정 등 영역에 관계없이 적용되는 경향이 있습니다.</p>
                        </div>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>005. Seonbae / Hubae / 선후배</h2>

                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <RelationalDiagram
                            speakerGender="neutral"
                            targetGender="neutral"
                            targetX={2}
                            targetY={2}
                            boundary="ingroup"
                            boundaryLabel="In-group : 내집단"
                            speakerLabel={'Speaker : Gender-Neutral\n화자 : 성별 무관'}
                            targetLabel={'Target : Gender-Neutral\n청자 : 성별 무관'}
                            distanceLabel={'Distance(X): Mid\nHierarchy(Y): Mid'}
                            autoHint={true}
                        />
                    </div>

                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <p>Formula: (Speaker: Any) + (Target: Any) + (Hierarchy: Institutional) + (Basis of Hierarchy: Entrance Year) + (In-group Boundary: Institutional)</p>
                            <p>Logic: This term substitutes biological age with institutional entrance year as the basis for hierarchy. Rather than invoking fictive kinship, it draws the boundary from shared institutional membership — such as a school or workplace — making seniority a structural rather than biological category.</p>
                            <p>English Approximation: senior / junior</p>
                            <p>Definition: A relational category denoting those who entered the same institution earlier (seonbae) and those who entered later (hubae), independent of chronological age. It tends to govern conduct and forms of address within shared organizations.</p>
                            <p>Contextual Usage: Even when older in chronological age, a person who enrolled one year later tends to assume the role of hubae and use formal speech toward their seonbae.</p>
                        </div>
                        <div className={styles.krCol}>
                            <p>공식: (화자: 무관) + (청자: 무관) + (위계: 제도적) + (위계 기준: 입학·입사 기수) + (내집단: 제도적·조직적)</p>
                            <p>특징: 나이라는 생물학적 위계 기준 대신 기수(입학·입사 순서)를 위계의 기준으로 삼습니다. 가상 친족 확장 대신 동일 기관이라는 제도적 경계를 기반으로 관계가 설정되는 구조로 해석할 수 있습니다.</p>
                            <p>영문 유사어: senior / junior</p>
                            <p>정의: 같은 기관 안에서 먼저 들어온 사람(선배)과 나중에 들어온 사람(후배)의 관계를 나타냅니다. 나이와는 독립적으로 작동하는 경향이 있습니다.</p>
                            <p>상황적 용례: 나이가 더 많더라도 입학 연도가 늦으면 후배가 되며, 선배에게 존댓말을 사용하는 경향이 있습니다.</p>
                        </div>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>006. You / 당신, 너</h2>

                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <RelationalDiagram
                            speakerGender="combined"
                            targetGender="combined"
                            targetX={3}
                            targetY={0}
                            boundary="none"
                            speakerLabel={'combined'}
                            distanceLabel={'Distance(X): N/A\nHierarchy(Y): N/A'}
                            autoHint={true}
                        />
                    </div>

                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <p>Formula: (Speaker: Any) + (Target: Any) + (Hierarchy: Neutralized, Zero) + (Relational Symmetry: Symmetrical) + (Address Type: Deictic Pronoun)</p>
                            <p>Logic: Grounded in Brown &amp; Gilman (1960),<sup>6</sup> this universal pronoun structurally neutralizes the hierarchy variable, placing both speaker and target on a symmetrical horizontal plane. It does not encode the target&apos;s age, status, or relational closeness — only their structural position as the listener in the conversational situation.</p>
                            <p>Korean Approximation: 당신, 너 (no exact structural equivalent)</p>
                            <p>Definition: A universal second-person pronoun that addresses the listener purely as a conversational participant position, establishing symmetry regardless of age, status, or kinship. It does not encode social hierarchy between speakers.</p>
                            <p>Contextual Usage: Addressing a grandparent or a corporate executive as &quot;You&quot; is the default mode in English. This does not indicate disrespect — it reflects a structure that places both parties on a horizontal plane regardless of their actual social relationship.</p>
                        </div>
                        <div className={styles.krCol}>
                            <p>공식: (화자: 무관) + (청자: 무관) + (위계: 0, 무력화) + (관계 대칭성: 대칭적) + (지칭 방식: 직시 대명사)</p>
                            <p>특징: 수직적 위계 변수를 소거하고 화자와 청자를 1:1 대칭 구도로 놓는 보편적 장치로 해석할 수 있습니다.<sup>6</sup> 이 단어는 실제 사회적 지위를 평등하게 만드는 것이 아니라, 언어 구조 안에서 위계 변수 자체를 비활성화하는 방식으로 작동합니다.</p>
                            <p>국문 유사어: 당신, 너 (직접적 대응어 없음)</p>
                            <p>정의: 나이, 지위, 혈연에 관계없이 모든 대화 상대를 대칭적 위치에 놓는 보편적 2인칭 대명사입니다. 상대방의 이름이나 개별 정체성에 대한 사전 정보 없이도 사용할 수 있습니다.</p>
                            <p>상황적 용례: 조부모나 기업 임원을 &quot;You&quot;라고 부르는 것이 영어의 기본 방식입니다. 이는 실례를 범하는 것이 아니라, 두 화자를 언어 구조상 수평적 위치에 놓는 방식으로 볼 수 있습니다.</p>
                        </div>
                        <div className={`${styles.note} ${styles.enNote}`}>
                            <sup>6</sup> Brown, R., &amp; Gilman, A. (1960). &quot;The Pronouns of Power and Solidarity,&quot; Style in Language.
                        </div>
                        <div className={`${styles.note} ${styles.krNote}`}>
                            <sup>6</sup> 브라운, R., &amp; 길먼, A. (1960). 「권력과 연대의 대명사」,「언어 속의 스타일」
                        </div>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>007. First Name / 이름 부르기</h2>

                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <RelationalDiagram
                            speakerGender="combined"
                            targetGender="combined"
                            targetX={2}
                            targetY={0}
                            boundary="ingroup"
                            boundaryLabel="In-group : 내집단"
                            speakerLabel={'combined'}
                            distanceLabel={'Distance(X): Mid\nHierarchy(Y): N/A'}
                            autoHint={true}
                        />
                    </div>

                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <p>Formula: (Speaker: Any) + (Target: Any) + (Hierarchy: Neutralized, Zero) + (Relational Symmetry: Symmetrical) + (Address Type: Proper Noun Index) + (In-group: Required)</p>
                            <p>Logic: Grounded in socio-linguistic indexicality<sup>7</sup> and cultural individualism,<sup>8</sup> addressing someone by their given name operates as a proper noun index that directly invokes individual personhood. Unlike &quot;You,&quot; which requires no prior information, &quot;First Name&quot; presupposes that the speaker already holds the target&apos;s name — placing it within an in-group boundary. It can be understood as a symmetrical device that bypasses generational age, institutional rank, and kinship titles to address the individual on a horizontal plane.<sup>9</sup></p>
                            <p>Korean Approximation: 이름 부르기 (no direct structural equivalent)</p>
                            <p>Definition: The convention of addressing an individual by their given name across social domains, placing individual identity over institutional rank, generational age, or kinship titles.</p>
                            <p>Contextual Usage: Friends, family members, colleagues, and even organizational seniors tend to be addressed by given names. In contrast, using a given name to address an older person or senior is generally not accepted in Korean across public and private domains alike.</p>
                        </div>
                        <div className={styles.krCol}>
                            <p>공식: (화자: 무관) + (청자: 무관) + (위계: 0, 무력화) + (관계 대칭성: 대칭적) + (지칭 방식: 고유명사 인덱스) + (내집단: 필요)</p>
                            <p>특징: 기호학적 인덱스성 이론<sup>7</sup> 및 개인주의 문화 지수<sup>8</sup>에 기반한 지칭 방식으로 해석할 수 있습니다. 대화 상황에서 청자의 구조적 위치를 지칭하는 &apos;You&apos;와 달리, 이름 부르기는 상대방의 고유명사를 통해 개별 정체성을 직접 지칭합니다. 사전에 상대의 이름 정보를 가지고 있어야 발화가 가능하다는 점에서 최소한의 내집단 경계가 전제되며, 직급이나 나이를 넘어 개별 주체를 수평적으로 지칭하는 대칭적 언어 장치로 볼 수 있습니다.<sup>9</sup></p>
                            <p>국문 유사어: 이름 부르기 (직접적 대응어 없음)</p>
                            <p>정의: 조직 내 직급, 세대적 나이, 친족 호칭보다 개인의 정체성을 우선하여 고유명사(이름)로 상대를 지칭하는 방식입니다.</p>
                            <p>상황적 용례: 친구, 가족, 동료, 나아가 직장 상사에게도 이름으로 부르는 것이 일반적입니다. 반면 한국어에서는 공적·사적 영역 모두에서 손위 연장자에게 이름을 직접 사용하는 것이 받아들여지지 않는 경향이 있습니다.</p>
                        </div>
                        <div className={`${styles.note} ${styles.enNote}`}>
                            <sup>7</sup> Agha, A. (2007). Language and Social Relations, Cambridge University Press.<br />
                            <sup>8</sup> Hofstede, G. (2001). Culture&apos;s Consequences: Comparing Values, Behaviors, Institutions and Organizations Across Nations, Sage Publications.<br />
                            <sup>9</sup> Brown, R., &amp; Gilman, A. (1960). &quot;The Pronouns of Power and Solidarity,&quot; Style in Language.
                        </div>
                        <div className={`${styles.note} ${styles.krNote}`}>
                            <sup>7</sup> 아가, A. (2007).「언어와 사회적 관계」, 케임브리지 대학교 출판부.<br />
                            <sup>8</sup> 홉스테드, G. (2001).「문화의 결과: 가치, 행동, 제도 및 조직의 비교」, 세이지 출판사.<br />
                            <sup>9</sup> 브라운, R., &amp; 길먼, A. (1960). 「권력과 연대의 대명사」,「언어 속의 스타일」
                        </div>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>008. Brother / Sister / 친형제 / 친자매</h2>

                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <RelationalDiagram
                            speakerGender="neutral"
                            targetGender="neutral"
                            targetX={1}
                            targetY={2}
                            boundary="kinship"
                            boundaryLabel="Kinship Boundary : Closed / 친족경계 : 닫힘"
                            speakerLabel={'Speaker : Gender-Neutral\n화자 : 성별 무관'}
                            targetLabel={'Speaker : Gender-Neutral\n화자 : 성별 무관'}
                            distanceLabel={'Distance(X): Low\nHierarchy(Y): Mid'}
                            autoHint={true}
                        />
                    </div>

                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <RelationalDiagram
                            speakerGender="female"
                            targetGender="female"
                            targetX={1}
                            targetY={2}
                            boundary="kinship"
                            boundaryLabel="Kinship Boundary : Closed / 친족경계 : 닫힘"
                            speakerLabel={'Speaker : Female\n화자 : 여성'}
                            targetLabel={'Target : Female\n청자: 여성'}
                            distanceLabel={'Distance(X): Low\nHierarchy(Y): Mid'}
                            autoHint={true}
                        />
                    </div>

                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <RelationalDiagram
                            speakerGender="male"
                            targetGender="male"
                            targetX={1}
                            targetY={2}
                            boundary="kinship"
                            boundaryLabel="Kinship Boundary : Closed / 친족경계 : 닫힘"
                            speakerLabel={'Speaker : Male\n화자 : 남성'}
                            targetLabel={'Target : Male\n청자: 남성'}
                            distanceLabel={'Distance(X): Low\nHierarchy(Y): Mid'}
                            autoHint={true}
                        />
                    </div>

                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <RelationalDiagram
                            speakerGender="female"
                            targetGender="male"
                            targetX={1}
                            targetY={2}
                            boundary="kinship"
                            boundaryLabel="Kinship Boundary : Closed / 친족경계 : 닫힘"
                            speakerLabel={'Speaker : Female\n화자 : 여성'}
                            targetLabel={'Target : Male\n청자: 남성'}
                            distanceLabel={'Distance(X): Low\nHierarchy(Y): Mid'}
                            autoHint={true}
                        />
                    </div>

                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <p>Formula: (Speaker: Any) + (Target: Gendered) + (Hierarchy: Neutralized) + (Social Solidarity: Biological Kinship) + (Kinship Boundary: Closed)</p>
                            <p>Logic: This term denotes a strong biological bond without encoding relative age within the sibling hierarchy. Unlike the Korean terms hyeong or nuna, these English terms do not extend fictively to non-relatives in standard public settings — maintaining a closed categorical boundary.</p>
                            <p>Korean Approximation: 친형제, 친자매</p>
                            <p>Definition: Terms strictly bound to biological or legal family relations. They are closed categories that do not extend to non-relatives in public settings, and they do not specify the relative age or seniority of siblings.</p>
                            <p>Contextual Usage: Unlike the Korean terms hyeong or nuna, an older male colleague is not addressed as &quot;brother&quot; in standard professional settings.</p>
                        </div>
                        <div className={styles.krCol}>
                            <p>공식: (화자: 무관) + (청자: 성별 구분) + (위계: 무력화, 나이 미구분) + (사회적 연대: 생물학적 결속) + (친족 경계: 닫힘)</p>
                            <p>특징: 강한 생물학적 연대를 나타내지만 나이에 따른 위계의 차이를 언어적으로 반영하지는 않습니다. 한국어의 형·누나·오빠·언니와 달리, 비혈연 타인에게 경계가 확장되지 않는 닫힌 구조로 해석할 수 있습니다.</p>
                            <p>국문 유사어: 친형제, 친자매</p>
                            <p>정의: 생물학적·법적 혈연 관계에만 적용되는 호칭입니다. 형제 사이의 상대적인 나이 서열을 단어 자체에 포함하지 않으며, 공적 영역의 비혈연 타인에게 확장되지 않습니다.</p>
                            <p>상황적 용례: 한국어의 &quot;형&quot;이나 &quot;누나&quot;와 달리, 직장 환경에서 연상의 남성 동료를 &quot;brother&quot;라고 부르지 않습니다.</p>
                        </div>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>009. Mr. / Ms. / ~씨, 선생님</h2>

                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <RelationalDiagram
                            speakerGender="combined"
                            targetGender="neutral"
                            targetX={3}
                            targetY={0}
                            boundary="outgroup"
                            boundaryLabel="Out-group : 외집단"
                            speakerLabel={'combined'}
                            distanceLabel={'Distance(X): High\nHierarchy(Y): N/A'}
                            autoHint={true}
                        />
                    </div>

                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <p>Formula: (Speaker: Any) + (Target: Gendered, English / Gender-Neutral, Korean) + (Hierarchy: Neutral) + (Formality: Flat Padding) + (Relational Permanence: Situational) + (Name Required: Surname/Given Name) + (In-group: Out-group)</p>
                            <p>Logic: Functionally similar to Korean public honorifics such as ~ssi or seonsaengnim in serving as a flat layer of formal respect. However, English mandates target gender encoding (Mr. vs. Ms.), whereas Korean equivalents neutralize gender entirely.</p>
                            <p>Korean Approximation: ~씨, 선생님 (functional equivalent; Korean terms are gender-neutral)</p>
                            <p>Definition: Public honorifics that signal basic social respect without carrying information about the interpersonal intimacy, hierarchy, or solidarity between the speakers.</p>
                            <p>Contextual Usage: Used equally for a 20-year-old client and a 60-year-old neighbor, tending to function as a flat formal layer rather than a relational marker.</p>
                        </div>
                        <div className={styles.krCol}>
                            <p>공식: (화자: 무관) + (청자: 성별 구분, 영문 / 성별 무관, 국문) + (위계: 중립) + (격식성: 평면적 완충재) + (관계 지속성: 상황적) + (이름 보유성: 필수) + (내집단: 외집단)</p>
                            <p>특징: 한국어의 공적 존칭(~씨, 선생님)과 평면적 완충재로서의 기능을 공유하는 구조로 해석할 수 있습니다. 단, 영어는 청자의 성별 변수(Mr. vs. Ms.)를 필수로 구분하는 반면, 한국어 대응어는 성별 변수를 소거하는 점에서 차이가 있습니다.</p>
                            <p>국문 유사어: ~씨, 선생님 (기능적 유사어)</p>
                            <p>정의: 화자 간의 친밀도, 위계, 연대감에 대한 정보 없이 기본적인 사회적 존중을 나타내는 공적 존칭입니다.</p>
                            <p>상황적 용례: 20대 고객과 60대 이웃 모두에게 동일하게 사용되며, 관계적 좌표라기보다 평면적인 형식적 완충재로 작용하는 경향이 있습니다.</p>
                        </div>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>010. Sir / Ma&apos;am / 선생님 / 사장님</h2>

                    <div style={{ width: '100%', marginBottom: '4rem' }}>
                        <RelationalDiagram
                            speakerGender="neutral"
                            targetGender="neutral"
                            targetX={2.5}
                            targetY={1.5}
                            boundary="outgroup"
                            boundaryLabel="Out-group : 외집단"
                            speakerLabel={'Speaker : Gender-Neutral\n화자 : 성별 무관'}
                            targetLabel={'Target : Gender-Neutral\n청자 : 성별 무관'}
                            distanceLabel={'Distance(X): High\nHierarchy(Y): Mid'}
                            autoHint={true}
                        />
                        <RelationalDiagram
                            speakerGender="neutral"
                            targetGender="male"
                            targetX={2.1}
                            targetY={1.5}
                            target2Gender="female"
                            target2X={2.9}
                            target2Y={1.5}
                            target2Label={'Target : Female\n청자: 여성'}
                            boundary="outgroup"
                            boundaryLabel="Out-group : 외집단"
                            speakerLabel={'Speaker : Gender-Neutral\n화자 : 성별 무관'}
                            targetLabel={'Target : Male\n청자: 남성'}
                            distanceLabel={'Distance(X): High\nHierarchy(Y) : Mid'}
                            autoHint={true}
                        />
                    </div>

                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <p>Formula: (Speaker: Gender-Neutral) + (Target: Gender-Neutral) + (Hierarchy: Mid) + (Social Distance: High) + (Relational Boundary: Out-group)</p>
                            <p>Logic: A generic honorific used in face-to-face transactional or service-oriented contexts, where the hierarchy of the target is acknowledged but the relational bond remains impersonal. Unlike Mr./Ms., neither the English nor Korean variants require strict gender encoding in everyday usage.</p>
                            <p>Korean Approximation: 선생님, 사장님 (context-dependent titles)</p>
                            <p>Definition: Informal honorifics used in public out-group contexts to signal basic deference without encoding personal intimacy or sustained relational commitment.</p>
                            <p>Contextual Usage: A customer addressing a shop owner as 사장님 in Korean, or a subordinate addressing a senior colleague as Sir in formal English settings.</p>
                        </div>
                        <div className={styles.krCol}>
                            <p>공식: (화자: 성별 무관) + (청자: 성별 무관) + (위계: 중간) + (사회적 거리: 높음) + (관계 경계: 외집단)</p>
                            <p>특징: 대면적 거래 또는 서비스 맥락에서 청자의 위계를 인정하면서도 비개인적 관계 내에서 사용하는 일반적 존칭입니다. Mr./Ms.와 달리 성별 변수를 언어에 강제적으로 부호화하지 않는 구조적 특징을 공유합니다.</p>
                            <p>국문 유사어: 선생님, 사장님 (맥락 의존적 호칭)</p>
                            <p>정의: 지속적 관계 결속이나 개인적 친밀도를 부호화하지 않으면서, 공적 외집단 맥락에서 기본적 경의를 표시하는 비공식 존칭입니다.</p>
                            <p>상황적 용례: 한국어에서 상점 주인을 &quot;사장님&quot;이라고 부르거나, 영어의 공식적 맥락에서 상급자를 &quot;Sir&quot;로 호칭하는 경우에 해당합니다.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chapter 2 */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.chapterTitle}>Grammatical Politeness and Social Distance</h1>
                    <p className={styles.chapterTitleKr}>문법적 경어와 사회적 거리</p>
                </div>
            </section>

            <section className={styles.contentSection}>
                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>1. Research</h2>
                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <p>How do different languages construct the same pragmatic function of respect? According to morphological typology (Greenberg, 1960)<sup>1</sup>, languages possess different structural tendencies for encoding grammatical information. English leans toward an analytic structure, where politeness is primarily realized through external syntactic and discourse resources—such as modal verbs, euphemisms, and indirect speech acts—placed outside the core word. Korean, leaning toward an agglutinative structure, provides favorable structural conditions to systematically encode politeness internally, using morphological devices like sentence-ending suffixes and pre-final suffixes.</p>
                            <p>For example, to elevate the politeness of the &apos;Give me,&apos; English employs external padding: &apos;Could you give me?&apos; or &apos;I was wondering if you could possibly give me.&apos; The core verb give remains structurally intact. English builds an architectural buffer space on the syntactic and discourse levels to achieve sophisticated politeness, an approach often characterized by active volition and strategic selection (Ide, 1989; Brown, 2011)<sup>2</sup>.</p>
                            <p>In contrast, Korean addresses this through structural transformation. The verb juda (give) becomes juseyo, jusipsio, or is entirely replaced by deurida. As social relationships become defined, the use of specific morphological and lexical markers operates under strong grammatical and pragmatic pressure, a dynamic known as discernment (Ide, 1989). Rather than adding external syntactic layers, Korean relies on the internal morphing of verb stems, suffixes, and full lexical suppletion.</p>
                            <p>Both English and Korean possess highly sophisticated politeness systems. However, English tends to encode politeness through external syntactic and discourse strategies<sup>3</sup>, whereas Korean tends to encode it more directly through internal marking—a multi-layered system including morphological affixes, lexical suppletion, and tiered sentence-ending structures.</p>
                        </div>
                        <div className={styles.krCol}>
                            <p>존중이라는 동일한 화용론적 기능을 다른 언어들은 어떻게 구성할까요? 형태론적 유형론(Greenberg, 1960)<sup>1</sup>에 따르면, 언어는 문법 정보를 처리하는 구조적 경향성이 다릅니다. 영어는 분석어(Analytic Language)적 경향을 띠어, 조동사나 완곡 표현, 간접 화행 등 단어 바깥의 통사적·담화적 자원을 통해 공손함을 실현하는 경향이 있습니다. 반면 한국어는 교착어(Agglutinative Language)적 경향을 띠어, 종결어미나 선어말어미 등 단어 내부의 형태론적 장치를 통해 공손함을 체계적으로 부호화하기 쉬운 구조적 조건을 갖추고 있습니다.</p>
                            <p>예를 들어 &apos;Give me(주세요)&apos;라는 요청의 공손함을 높이기 위해 영어는 외부 완충재를 사용합니다: &apos;Could you give me?&apos; 또는 &apos;I was wondering if you could possibly give me.&apos; 핵심 동사 give는 구조적으로 온전히 유지됩니다. 영어는 통사적·담화적 층위에서 완충 효과를 만들어 정교한 공손함을 달성하며, 이는 종종 화자의 능동적 의지와 전략적 선택(Volition)으로 특징지어집니다(Ide, 1989; Brown, 2011)<sup>2</sup>.</p>
                            <p>반면 한국어는 구조적 변환을 통해 이에 접근합니다. 동사 주다는 주세요, 주십시오로 변하거나 드리다로 완전히 교체됩니다. 사회적 관계가 분명해질수록 특정 형태론적·어휘적 표지의 사용에는 문법적·화용론적 압력이 강하게 작동하며(Discernment) 규범화됩니다(Ide, 1989). 한국어는 외부적인 통사적 레이어를 더하기보다 동사 어간, 어미의 내부적 변형과 전면적인 어휘 보충법에 의존합니다.</p>
                            <p>영어와 한국어는 모두 정교한 공손 체계를 지니고 있습니다. 그러나 영어는 공손함을 주로 구문적·담화적 전략(External Strategies)으로 부호화하는 경향이 있는 반면, 한국어는 형태론적 접사, 어휘적 보충법, 그리고 단계적인 종결어미 체계를 포함한 다층적 장치(Internal Marking)<sup>3</sup>로 더 직접적으로 부호화하는 경향이 있습니다.</p>
                        </div>
                        <div className={`${styles.note} ${styles.enNote}`}>
                            <sup>1</sup> Greenberg, J. H. (1960). &quot;A Quantitative Approach to the Morphological Typology of Language&quot;, International Journal of American Linguistics.<br />
                            <sup>2</sup> Ide, S. (1989). &quot;Formal forms and discernment: Two neglected aspects of universals of linguistic politeness&quot;, Multilingua, 8(2-3); Brown, L. (2011). Korean honorifics and politeness in second language learning, John Benjamins.<br />
                            <sup>3</sup> In reality, the Korean addressee honorific system is not a simple linear hierarchy but a multidimensional system where formality and politeness axes intersect (cf. Sohn, H. M. 1999. The Korean Language).
                        </div>
                        <div className={`${styles.note} ${styles.krNote}`}>
                            <sup>1</sup> Greenberg, J. H. (1960). 「A Quantitative Approach to the Morphological Typology of Language」, International Journal of American Linguistics.<br />
                            <sup>2</sup> Ide, S. (1989). 「Formal forms and discernment: Two neglected aspects of universals of linguistic politeness」, Multilingua, 8(2-3); Brown, L. (2011). Korean honorifics and politeness in second language learning, John Benjamins.<br />
                            <sup>3</sup> 한국어 상대 높임법은 단순한 선형적 상하 관계가 아니라 격식/비격식과 존대/비존대라는 두 축이 교차하는 다차원적 체계입니다 (Sohn, H. M. 1999. The Korean Language 참조).
                        </div>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>2. Differences and Examples &amp; Visual Experiment and Practice</h2>
                    
                    <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start' }}>
                        {/* Left: Diagram (4 blocks) */}
                        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '0' }}>
                            <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 1. Morphological and Lexical Mechanisms (형태론적, 어휘적 기제)</div>
                            <div style={{ backgroundColor: '#583884', color: '#7c7c7c', padding: '2.5rem', textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'Pretendard, sans-serif' }}>
                                Lexical Root &amp; Base Form<br/>(어근 및 기본형)
                            </div>
                            <div style={{ backgroundColor: '#e7e7e7', color: '#7c7c7c', padding: '2.5rem', textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'Pretendard, sans-serif' }}>
                                Grammatical Morpheme<br/>(문법 형태소)
                            </div>
                            <div style={{ backgroundColor: '#00fb49', color: '#7c7c7c', padding: '2.5rem', textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'Pretendard, sans-serif' }}>
                                Politeness Marker &amp; Mitigating Device<br/>(공손 표지 및 완화 기제)
                            </div>
                            <div style={{ backgroundColor: '#85712a', color: '#7c7c7c', padding: '2.5rem', textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'Pretendard, sans-serif' }}>
                                Suppletive Form<br/>(어휘적 보충법 / 보충 어휘)
                            </div>
                        </div>

                        {/* Right: Text (English & Korean) */}
                        <div style={{ flex: '2', display: 'flex', gap: '4rem' }}>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }} className={styles.enCol}>
                                <h3>1. Ways</h3>
                                <p>The visual blocks on the left represent the structural layers through which social hierarchy and relational distance are linguistically encoded. Before examining specific examples, it is necessary to define the morphological and lexical mechanisms that constitute this system.</p>
                                <p><strong>Lexical Root and Base Form</strong> The neutral semantic core of a word, uninflected by social hierarchy, context, or interpersonal variables. It represents the absolute basic state of meaning before any relational calculation is applied.</p>
                                <p><strong>Grammatical Morpheme</strong> The structural units attached to the root that determine grammatical function. In hierarchical languages, these morphemes act as the foundational structure to which honorific conjugations are anchored.</p>
                                <p><strong>Politeness Marker and Mitigating Device</strong> Syntactic attachments used to calibrate social distance and respect without altering the original root word. These devices function as a dial, adjusting the degree of politeness based on the situational context.</p>
                                <p><strong>Suppletive Form</strong> The phenomenon where modifying the base form is insufficient for the required level of respect. Instead, the base word is completely replaced by an entirely distinct vocabulary item reserved strictly for elevated subjects or recipients.</p>
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }} className={styles.krCol}>
                                <h3>1. 방법들</h3>
                                <p>좌측의 시각적 블록들은 사회적 위계와 관계적 거리가 언어적으로 암호화되는 구조적 층위를 나타냅니다. 구체적인 예시를 살펴보기에 앞서, 이 시스템을 구성하는 형태론적, 어휘적 기제들을 다음과 같이 정의합니다.</p>
                                <p><strong>보라색 (어근 및 기본형):</strong> 사회적 위계나 관계적 변인이 반영되기 전, 단어가 지닌 중립적이고 핵심적인 의미 단위입니다. 관계적 계산이 적용되기 이전의 절대적인 기본 상태를 의미합니다.</p>
                                <p><strong>회색 (문법 형태소):</strong> 어근에 결합하여 문법적 기능을 결정하는 구조적 단위입니다. 위계적 언어에서는 존대 활용이 결합하기 위한 구조적 토대로 작용합니다.</p>
                                <p><strong>초록색 (공손 표지 및 완화 기제):</strong> 어근 자체를 변형하지 않고 접사나 종결 어미 등을 부착하여 화자와 청자 간의 존대 수준을 조율하는 장치입니다. 상황적 맥락에 따라 공손성의 강도를 미세하게 조절하는 역할을 합니다.</p>
                                <p><strong>갈색 (어휘적 보충법 및 보충 어휘):</strong> 기본형에 문법적 접사를 더하는 것만으로는 요구되는 존대의 수준을 충족할 수 없을 때 발생합니다. 형태가 완전히 다른 독립된 특수 어휘로 원단어를 전면 교체하여 극대화된 위계를 표현하는 방식입니다.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>Give (주다)</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16rem', marginTop: '4rem' }}>
                        {/* Give 1 */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 2. Give 1 — Morphological Contrast (주다 1 — 형태론적 대조)</div>
                                <Give1Diagram />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Give 1</h3>
                                    <p>English secures politeness by maintaining the core verb (give) and attaching syntactic padding—like modals—outside the clause to widen the psychological distance between speaker and listener.</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>주다 1</h3>
                                    <p>반면 한국어는 문장 외부가 아닌 동사 내부로 침투하여, 어간 자체를 전면 교체하거나 여러 문법 형태소를 엄격한 순서대로 겹겹이 쌓아 올리는 형태론적 변환을 통해 수직적 위계와 격식을 표현합니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* Give 2 */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start', marginTop: '0' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 3. Give 2 — Visual Metaphor (주다 2 — 시각적 은유)</div>
                                <Give2Diagram />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Give 2</h3>
                                    <p>This graphic metaphorizes English&apos;s strategic politeness structure, where a soft cushion (green) expands flexibly like a round halo around an unchanging semantic core (purple) to mitigate interpersonal impact.</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>주다 2</h3>
                                    <p>어근, 문법 형태소, 공손 표지가 각기 다른 기능의 레고 블록처럼 기계적으로 조립 및 교체됩니다. 이는 파악된 위계와 격식에 따라 결합 방식이 강제로 통제되는 교착어 특유의 엄격한 규범적 압력으로 표현될 수 있습니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* Give 3 — 격식 표현 (Formality, X-axis) */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start', marginTop: '0' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 4. Give 3 — Listener Formality (주다 3 — 청자 격식)</div>
                                <Give3Diagram />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Give 3</h3>
                                    <p>The horizontal social distance from the listener can be expressed along the X-axis. It illustrates how sentence-ending blocks are replaced horizontally based on the distance between an intimate listener (cyan) and a formal listener (maroon).</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>주다 3</h3>
                                    <p>청자와의 수평적인 사회 거리를 X축으로 표현할 수 있습니다. 구체적으로, 사적으로 친밀한 청자(청록색)와 공적으로 격식을 갖춰야 하는 청자(자주색)라는 거리감의 차이에 따라 종결 어미 블록이 수평적으로 교체되는 양상을 보여줍니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* Give 4 — 주체 및 객체 높임 (Referent, Y-axis) */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start', marginTop: '0' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 5. Give 4 — Referent Coordinate (주다 4 — 주체 및 객체 높임)</div>
                                <Give4Diagram />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Give 4</h3>
                                    <p>The vertical hierarchy of the referent can be expressed along the Y-axis. Starting from a neutral layer, it step-by-step demonstrates the vertical layer expansion triggered by a subject-honoring suffix (-si-) and an object-honoring suppletive (deurida).</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>주다 4</h3>
                                    <p>언급되는 대상의 수직적 위계를 Y축을 통해 표현할 수 있습니다. 구체적으로, 중립 층위에서 출발해, 주체를 높이는 어미(-시-)와 객체를 높이는 보충 어휘(드리다)가 개입하여 일으키는 수직적인 층위 확장을 단계적으로 보여줍니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

                {/* Chapter 3 */}
                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <div className={styles.titleScreen} style={{ backgroundColor: '#00c3eb' }}>
                        <div className={styles.chapterNumber}>Chapter 3</div>
                        <h1 className={styles.chapterTitle}>Situational Perception and Social Norms</h1>
                        <h2 className={styles.chapterSubtitle}>상황 인지와 사회적 규범</h2>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>1. Research</h2>
                    <div className={styles.flexRow}>
                        <div className={styles.enCol}>
                            <h3>Situational Perception and Social Norms</h3>
                            <p>In cross-cultural pragmatics, managing unstated situational atmosphere and social face is not an absolute binary, but a shared communicative continuum configured with differing cultural weights (Hall, 1976; Ide, 1989)<sup>1</sup>.</p>
                            <p>In Anglo-British discourse, inappropriate or oblivious behavior is often evaluated as tactlessness or social awkwardness—primarily framing it as an individual's failure to regulate explicit communicative intention and volition. English addresses atmospheric awareness through various overlapping concepts such as 'tact', 'reading the room', and 'saving face', which largely function as descriptive and evaluative terms for personal conduct and situational skill.</p>
                            <p>In contrast, Korean culture distributes a significantly heavier burden of contextual decoding onto the listener, institutionalizing atmospheric perception ('nunchi') and dignity preservation ('chaemyeon') as normative discernment (Ide, 1989; Lim, 1994)<sup>2</sup>.</p>
                            <p>Rather than remaining an isolated evaluative trait, 'nunchi' expands into an active relational grammar. It functions as a dynamic root that combines with directional verbs to operate across active observation ('nunchireul boda'), causative pressure ('nunchireul juda'), and passive constraint ('nunchiga boida'). While English approaches situational awareness through distributed idiomatic descriptions of personal volition, Korean centralizes it into an operational vocabulary that systematically coordinates social hierarchy and interpersonal boundaries.</p>
                        </div>
                        <div className={styles.krCol}>
                            <h3>상황 인지와 사회적 규범</h3>
                            <p>비교화용론의 관점에서 무언의 상황적 분위기를 감지하고 사회적 체면을 유지하는 행위는 절대적인 이분법이라기보다, 문화권마다 서로 다른 비중으로 구성되는 소통의 연속체적 과제입니다(Hall, 1976; Ide, 1989)<sup>1</sup>.</p>
                            <p>영미권 담화에서도 상황에 맞지 않는 발화나 행동은 'tactless', 'oblivious', 혹은 'socially awkward'한 것으로 평가될 수 있으나, 이는 대체로 화자가 자신의 명시적 의도를 섬세하게 조율하지 못한 데서 비롯된 개인의 전략적 소통 실패(Volition)로 귀결되는 경향이 있습니다. 영어는 'tact', 'reading the room', 'saving face' 등 부분적으로 중첩되는 다양한 개념들을 통해 상황 인식을 다루며, 이들은 주로 개인의 성향과 행동을 평가하는 기술적 어휘로 기능합니다.</p>
                            <p>반면 한국어권에서는 맥락 해독의 인지적 부담이 청자에게 더 크게 배분되는 경향이 있어, 분위기 감지('눈치')와 사회적 품위 유지('체면')가 상호작용 속에서 준수해야 할 규범적 분별(Discernment)의 의무로 제도화되어 왔습니다(Ide, 1989; 임태섭, 1994)<sup>2</sup>.</p>
                            <p>이에 따라 한국어의 '눈치'는 단순한 개인의 성향 평가에 머무르지 않고, 능동적 탐색('눈치를 보다'), 사동적 압력('눈치를 주다'), 피동적 구속('눈치가 보이다')과 같이 다양한 동사 결합을 통해 상호작용의 물리적 역학으로 확장됩니다. 결과적으로 영어가 개인의 자발적 의지와 관련된 분산된 관용적 서술을 통해 상황 인식을 다룬다면, 한국어는 위계와 관계적 경계를 조율하는 단일한 조작적 어휘군을 중심으로 이를 체계화하는 경향이 있다고 해석할 수 있습니다.</p>
                        </div>
                        <div className={`${styles.note} ${styles.enNote}`}>
                            <sup>1</sup> Martin, S. E. (1992). A Reference Grammar of Korean: A Complete Guide to the Grammar and History of the Korean Lang Charles E. Tuttle. (Referenced as grammatical background supporting that Korean responses to negative questions correlate with the surface negative structure, rather than as direct proof of macro-pragmatic divergence.)
                        </div>
                        <div className={`${styles.note} ${styles.krNote}`}>
                            <sup>2</sup> Sohn, H. M. (1999). The Korean Language. Cambridge University Press. (한국어의 전반적인 문법 및 담화적 특성을 설명하는 배경 문헌으로 참조함.)
                        </div>
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>2. Differences and Examples & Visual Experiment and Practice</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16rem', marginTop: '4rem' }}>
                        {/* Nunchi Section */}
                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 18. Nunchi 1 — Independent Individual (눈치 1 — 독립된 주체)</div>
                                <NunchiFig1 />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Fig 1</h3>
                                    <p>The circular geometric node represents an independent individual embedded within a given social interaction.</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>Fig 1</h3>
                                    <p>다이어그램 내의 정원(Circle) 형태는 주어진 사회적 상호작용 속에 위치한 독립된 개별 주체를 의미합니다.</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 19. Nunchi 2 — Situational Space (눈치 2 — 상황적 공간)</div>
                                <NunchiFig2 />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Fig 2</h3>
                                    <p>The square background defines a bounded situational space or specific relational environment in which interaction occurs.</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>Fig 2</h3>
                                    <p>사각형의 배경 평면은 상호작용이 이뤄지는 제한된 특정 상황이나 관계적 공간의 경계를 정의합니다.</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 20. Nunchi — Definition (눈치 — 정의)</div>
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>눈치, Nunchi</h3>
                                    <p>The subtle capacity or tact to evaluate others' unstated feelings, intentions, and atmospheric cues through immediate context.</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>눈치, Nunchi</h3>
                                    <p>남의 마음이나 무언의 분위기를 그때그때 상황적 맥락으로 미루어 알아내는 낌새, 또는 그러한 감각적 능력.</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 21. Nunchi 3 — Embedded Individual (눈치 3 — 고정된 주체)</div>
                                <NunchiFig1_2 />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Fig 1+2</h3>
                                    <p>The combination of a circular node positioned inside a square plane symbolizes an individual embedded within a specific situational context.</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>Fig 1+2</h3>
                                    <p>사각형(상황적 공간) 내부 중심에 위치한 정원(개인)의 결합은 특정 사회적 맥락이나 환경 속에 고정된 주체를 의미합니다.</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '4rem', width: '100%', alignItems: 'flex-start' }}>
                            <div style={{ flex: '1.5' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#7c7c7c', marginBottom: '4rem', lineHeight: '1.5' }}>Fig 22. Nunchi 4 — Atmospheric Alignment (눈치 4 — 분위기 동조)</div>
                                <NunchiFig3 />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className={styles.enCol}>
                                    <h3>Fig 3</h3>
                                    <p>The overlapping and subtle tonal transitions between geometric elements map the active process of reading and aligning with the surrounding atmosphere.</p>
                                </div>
                                <div className={styles.krCol}>
                                    <h3>Fig 3</h3>
                                    <p>기하학적 요소 간의 중첩과 톤 변화는 주변 분위기를 능동적으로 읽어내고 그에 맞춰 자신을 정렬하는 맥락 해독 과정을 도식화합니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


</section>

        </main>
    );
}
// test cache
