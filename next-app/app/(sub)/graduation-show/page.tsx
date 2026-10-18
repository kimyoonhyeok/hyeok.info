"use client";

import React from "react";
import styles from "./GraduationShow.module.css";
import ChapterNavigation from "./components/ChapterNavigation";
import InteractivePoster from "./components/InteractivePoster";
import Chapter1Instrument from "./components/Chapter1Instrument";
import Chapter2Instrument from "./components/Chapter2Instrument";
import Chapter3Instrument from "./components/Chapter3Instrument";
import Chapter4Instrument from "./components/Chapter4Instrument";

export default function GraduationShowPage() {
    const [lang, setLang] = React.useState<"en" | "kr">("en");
    const [isMounted, setIsMounted] = React.useState(false);
    const [isNavVisible, setIsNavVisible] = React.useState(false);

    // Scroll reveal observer: smoothly reveals sections from bottom to top with natural ease-in-out
    React.useEffect(() => {
        setIsMounted(true);

        const elements = document.querySelectorAll(`.${styles.reveal}`);

        // Immediately reveal elements already within or near initial viewport
        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 150) {
                el.classList.add(styles.revealed);
            }
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.revealed);
                    }
                });
            },
            { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <main
            className={styles.container}
            data-page="graduation-show"
            data-lang={lang}
            data-nav-visible={isNavVisible ? "true" : "false"}
            data-js={isMounted ? "true" : "false"}
        >
            <ChapterNavigation
                lang={lang}
                onToggleLang={setLang}
                onVisibilityChange={setIsNavVisible}
            />
            <section className={styles.landingHeroSection}>
                <InteractivePoster lang={lang} onToggleLang={setLang} />
            </section>

            <section className={styles.contentSection}>
                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>{lang === "en" ? "Foreword" : "서문"}</h2>
                    <div className={styles.flexRow}>
                        {lang === "en" ? (
                            <>
                                <div className={styles.enCol}>
                                    <p>
                                        Design is fundamentally a tool for communication, and the most basic unit of that communication is spoken and written language. The language we use goes beyond simply conveying information; it determines how we form relationships with others and how we view society. This book explores how two languages, English and Korean, shape different sociocultural environments. It is not an attempt to judge the superiority of a language, but a project to objectively illuminate the differences between the two cultures through language.<sup>1</sup>
                                    </p>
                                </div>
                                <div className={`${styles.note} ${styles.enNote}`}>
                                    <sup>1</sup> A note on scope:<br />
                                    The cultural characteristics discussed in this book are explained based on general tendencies to clearly contrast the two linguistic systems. We acknowledge that actual everyday communication may vary depending on various social factors such as an individual&apos;s class, generation, and region.
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.krCol}>
                                    <p>
                                        디자인은 본질적으로 의사소통의 도구이며, 그 의사소통의 가장 기본이 되는 단위는 말과 글입니다. 우리가 사용하는 언어는 단순히 정보를 전달하는 수단을 넘어, 우리가 타인과 관계를 맺고 사회를 바라보는 방식을 결정합니다. 이 책은 영어와 한국어라는 두 언어가 어떻게 서로 다른 사회문화적 환경을 형성하는지 탐구합니다. 언어의 우열을 가리기 위함이 아니라, 언어를 통해 두 문화의 차이를 객관적으로 조명하기 위한 작업입니다.<sup>1</sup>
                                    </p>
                                </div>
                                <div className={`${styles.note} ${styles.krNote}`}>
                                    <sup>1</sup> 범위에 대한 전제:<br />
                                    이 책에서 다루는 문화적 특징은 두 언어 체계를 명확히 대조하기 위해 보편적인 경향성을 바탕으로 설명됩니다. 실제 일상에서의 소통은 개인의 계층, 세대, 지역 등 다양한 사회적 요인에 따라 다르게 나타날 수 있음을 미리 밝힙니다.
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div id="chapter-0" className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>{lang === "en" ? "Introduction" : "서론"}</h2>
                    <div className={styles.flexRow}>
                        {lang === "en" ? (
                            <div className={styles.enCol}>
                                <p>This book is a visual research publication that examines how English and Korean construct sociocultural environments differently.</p>
                                <h3>Research Question</h3>
                                <p>How do English and Korean construct the sociocultural world differently?</p>
                                <h3>Structure</h3>
                                <p>This book investigates the question above through four chapters. Each chapter is composed of two phases:</p>
                                <ol className={styles.chapterList}>
                                    <li>
                                        <strong>1. Research</strong>
                                        Academic analysis of how the two languages encode a specific sociocultural domain differently.
                                    </li>
                                    <li>
                                        <strong>2. Differences and Examples &amp; Visual Experiment and Practice</strong>
                                        Grounding linguistic differences in concrete vocabulary and situational examples, translated into graphic systems, diagrams, and visual experiments.
                                    </li>
                                </ol>
                                <p>The four chapters are as follows:</p>
                                <ol className={styles.chapterList}>
                                    <li><strong>Chapter I. Addressing and Social Hierarchy</strong>Research: Relational positioning across biological and fictive kinship coordinates. Differences and Examples &amp; Visual Experiment and Practice: 10 core addressing terms (Eoreun, Hyeong/Oppa, Nuna/Eonni, etc.) and graphic translation of social coordinate grids.</li>
                                    <li><strong>Chapter II. Grammatical Politeness and Social Distance</strong>Research: Morphological Encoding and Syntactic Expression. Differences and Examples &amp; Visual Experiment and Practice: Conjugation patterns of verbs (Juda, Mutda, Itda, Meokda), honorific registers, and syntactic buffer layer diagrams.</li>
                                    <li><strong>Chapter III. Situational Perception and Affective Norms</strong>Research: Implicit contextual reading, collective gaze, and relational affective boundaries. Differences and Examples &amp; Visual Experiment and Practice: Nunchi and Tact, Ojilap and Nosy, Chaemyeon, Biwi, Yeomchi, Dori, Sosin, Jaechi, etc., paired with geometric contextual diagrams.</li>
                                    <li><strong>Chapter IV. Conversational Rituals and Dialogue Perspectives</strong>Research: Culinary mediums (&apos;Bap&apos; and &apos;Tea&apos;) as phatic rituals modulating social distance, and communicative points of orientation in question-and-answer interactions. Differences and Examples &amp; Visual Experiment and Practice: 4-stage relational food/tea rituals (Opening, Maintenance, Rejection, Exclusion) alongside perspectival alignment in negative question responses (&quot;Didn&apos;t you?&quot; / &quot;안 했어?&quot;).</li>
                                </ol>

                                <h3>Methodology and Purpose</h3>
                                <p>As stated in the Foreword, design is fundamentally a tool for communication, and language is its most basic unit. The purpose of this project is to serve as a visual medium where people from different cultural backgrounds can understand and introduce each other&apos;s cultures.</p>
                                <p>To achieve this, the methodology of this book is driven by a systematic progression repeated in every chapter. It begins with establishing a theoretical foundation (Research), grounds that theory in concrete linguistic realities through specific vocabulary, and culminates in active design application (Differences and Examples &amp; Visual Experiment and Practice).</p>
                                <p>Through this systematic progression, the book translates the specific cultural contexts in which words are used into visual images and graphic systems, rather than simply translating dictionary meanings. The ultimate goal is to make the ambiguous boundaries of invisible language visible through design.</p>
                            </div>
                        ) : (
                            <div className={styles.krCol}>
                                <p>이 책은 영어와 한국어가 사회문화적 환경을 어떻게 다르게 구성하는지를 탐구하는 시각적 연구 서적입니다.<br />책의 구성은 아래와 같이 진행됩니다.</p>
                                <h3>연구 질문</h3>
                                <p>영어와 한국어는 사회문화적 세계를 어떻게 다르게 구성하는가.</p>
                                <h3>구성</h3>
                                <p>이 책은 위의 질문을 네 개의 장(章)을 통해 탐구합니다. 각 장은 두 단계로 구성됩니다:</p>
                                <ol className={styles.chapterList}>
                                    <li>
                                        <strong>1. 선행 연구</strong>
                                        두 언어가 특정 사회문화적 영역을 어떻게 다르게 부호화하는지에 대한 학술적 분석.
                                    </li>
                                    <li>
                                        <strong>2. 차이와 예시 &amp; 시각적 실험과 실천</strong>
                                        구체적인 어휘 및 상황적 예시를 통해 언어적 차이를 제시하고, 이를 그래픽 시스템, 다이어그램, 시각 실험으로 변환.
                                    </li>
                                </ol>
                                <p>네 개의 장은 다음과 같습니다:</p>
                                <ol className={styles.chapterList}>
                                    <li><strong>제1장. 호칭과 사회적 위계</strong>선행 연구: 생물학적·가상 친족 좌표계를 통한 화자-청자의 관계적 위치 설정. 차이와 예시 &amp; 시각적 실험과 실천: 10개 핵심 호칭어(어른, 형/오빠, 누나/언니 등)와 사회적 좌표망의 시각화.</li>
                                    <li><strong>제2장. 문법적 경어와 사회적 거리</strong>선행 연구: 단어 형태에 직접 나타내는 방식과 문장 구조로 간접적으로 표현하는 방식. 차이와 예시 &amp; 시각적 실험과 실천: &apos;주다&apos;, &apos;묻다&apos;, &apos;있다&apos;, &apos;먹다&apos;의 형태소 변화 및 어휘적 보충법 변화, 상대 높임법 체계 및 통사적 완충 레이어 다이어그램.</li>
                                    <li><strong>제3장. 상황 인지와 정서적 규범</strong>선행 연구: 암묵적 맥락 읽기, 집단적 시선 통제, 관계적 정서 한계선. 차이와 예시 &amp; 시각적 실험과 실천: 눈치 ↔ Tact, 오지랖 ↔ Nosy, 체면, 비위, 염치, 도리, 소신, 재치 등의 핵심 개념과 기하학적 맥락 정렬 다이어그램.</li>
                                    <li><strong>제4장. 대화 의례와 소통의 관점</strong>선행 연구: 식음 매개물(&apos;밥&apos;과 &apos;차&apos;)을 통한 심리적 거리 조율 및 대화 의례, 질의응답 시 화자-청자의 준거점 및 관점 동기화. 차이와 예시 &amp; 시각적 실험과 실천: 4단계 식음 의례 대칭 구조(진입, 유지, 거부, 배제) 및 부정의문문 질의응답(&quot;Didn&apos;t you?&quot; / &quot;안 했어?&quot;)에서의 관점 동기화 그래픽.</li>
                                </ol>

                                <h3>방법론 및 목적</h3>
                                <p>서문에서 밝혔듯 디자인은 본질적으로 의사소통의 도구이며, 언어는 그 가장 기본이 되는 단위입니다. 이 프로젝트의 목적은 서로 다른 문화권을 가진 사람들이 문화적 차이를 이해하고 소개할 수 있는 시각적 매개체가 되는 데 있습니다.</p>
                                <p>이를 실현하기 위한 핵심 방법론으로서, 책의 모든 장은 이 과정들을 반복합니다. 먼저 학술적인 이론적 토대를 세우고(선행 연구), 이를 구체적인 단어와 예시를 통해 실제 언어 현상에 적용하며 디자인 영역의 시각 실험으로 변환합니다(차이와 예시 &amp; 시각적 실험과 실천).</p>
                                <p>이러한 체계적인 과정을 통해 단순히 사전적 의미를 번역하는 것을 넘어, 단어가 사용되는 맥락을 시각 이미지와 그래픽 시스템으로 변환합니다. 최종적으로, 보이지 않는 언어의 애매한 경계를 디자인을 통해 시각화하는 것이 이 책의 목적입니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Chapter 1 */}
            <section id="chapter-1" className={styles.chapterHeroSection} style={{ backgroundColor: "#ff560d" }} />

            <section className={styles.contentSection}>
                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>{lang === "en" ? "1. Research" : "1. 선행연구"}</h2>
                    <div className={styles.flexRow}>
                        {lang === "en" ? (
                            <>
                                <div className={styles.enCol}>
                                    <p>The English language defaults to the individual as an independent entity. In public and professional registers, individuals are addressed by their names or universal titles. Biological kinship terms (e.g., brother, sister, uncle) are strictly bound to actual family relations. While exceptions exist in specific subcultures or religious communities, extending family titles to nonrelatives in everyday public spheres is atypical. The linguistic structure does not obligate the speaker to encode age or hierarchy into the term of address.</p>
                                    <p>Korean processes social relations through a dynamic coordinate system based on the mechanism of &apos;fictive kinship extension.&apos;<sup>1</sup><sup>2</sup><sup>3</sup><sup>4</sup> Biological family roles function as a metaphor mapped onto the entire nonfamily public sphere. A speaker does not perceive others as symmetrical individuals, but as nodes in a relational network. To address another person, the speaker must calculate a three-dimensional coordinate consisting of age, gender, and social solidarity.</p>
                                    <p>This calculation operates in real-time. For example, the English word Brother is composed of +Kinship and +Sibling: Male. The Korean equivalent, Hyung (형), requires a more complex algorithm: ±Kinship (Fictive Extension) + +Speaker: Male + +Target: Male + +Hierarchy: Older + +Social Solidarity. Based on these address conventions, English speakers tend to address others as independent entities, whereas Korean speakers tend to construct a hierarchical and affective coordinate system that binds the speaker and the listener.</p>
                                    <p>In English, the single pronoun &apos;You&apos; applies equally to all interlocutors. Within this structure, a speaker tends to initiate conversation without first ascertaining the other person&apos;s age, occupation, or social status — the two parties are placed on a linguistically horizontal plane. In contrast, the Korean relational coordinate system tends not to function properly unless vertical information — such as age, enrollment year, or professional rank — is confirmed first. Without such information, there is no basis for determining the appropriate level of honorific speech or the correct address term. Therefore, asking a stranger&apos;s age, enrollment year, or year of hire in Korean culture can be interpreted not as an impolite question, but rather as an essential &apos;initial coordinate setting&apos; process required to activate the correct grammatical honorific system and address terms.</p>
                                </div>
                                <div className={`${styles.note} ${styles.enNote}`}>
                                    <sup>1</sup> Fictive Kinship: A socio-anthropological concept established by scholars such as A. R. Radcliffe-Brown, referring to the practice of regarding non-biological and non-legal individuals as social kin members and applying kinship terminology and relational bonds to them.<br />
                                    <sup>2</sup> Kim, H. K. (1967). &quot;Mechanism of Fictive Kinship Extension,&quot; Language Research, Language Education Institute, Seoul National University.<br />
                                    <sup>3</sup> King, R. (2006). Korean Language in Culture and Society, University of Hawaii Press.<br />
                                    <sup>4</sup> Radcliffe-Brown, A. R. (1952). Structure and Function in Primitive Society, Free Press.
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.krCol}>
                                    <p>영어는 사람을 부를 때, 각 개인을 독립된 존재로 다루는 경향이 있습니다. 공적이거나 직업적인 관계에서 개인은 이름이나 Mr., Ms. 같은 보편적 호칭으로 불립니다. Brother, Sister, Uncle과 같은 생물학적 친족 어휘는 실제 가족 관계에 엄격하게 결속되어 있는 경향이 있습니다. 특정 하위문화나 종교 공동체에서는 예외가 존재하지만, 일상적인 공공 영역에서 가족 호칭을 혈연이 아닌 타인에게까지 확장하여 사용하는 것은 이례적입니다. 이러한 언어 구조 속에서 화자는 상대방을 부를 때, 나이나 서열 정보를 호칭 안에 반드시 담아야 할 의무가 크지 않은 경향이 있습니다.</p>
                                    <p>한국어는 사회적 관계를 처리할 때, &apos;가상 친족 확장&apos;<sup>1</sup>이라는 독특한 메커니즘에 기반한 관계적 좌표계를 사용하는 경향이 있습니다.<sup>2</sup><sup>3</sup><sup>4</sup> 이는 원래 가족 내부에서만 사용되던 호칭 체계(형, 누나, 오빠, 언니 등)가 비혈연 관계, 즉 사회 전반의 공적 영역으로까지 확장되어 적용되는 현상을 말합니다. 이 체계 안에서 화자는 상대방을 자신과 동등한 독립된 개인으로 인식하기보다, 자신을 중심으로 한 관계망 속에서 특정 위치를 점유하는 존재로 인식하는 경향이 있습니다. 따라서 누군가를 부르기 위해서는 상대방의 나이, 성별, 그리고 나와의 사회적 친밀도라는 세 가지 변수를 실시간으로 파악하고 계산해야 하는 경향이 있습니다.</p>
                                    <p>이 계산 과정은 대화가 시작되는 순간 실시간으로 이루어집니다. 영어 단어 &apos;Brother&apos;가 담고 있는 정보는 비교적 단순합니다. +혈연과 +남자 형제라는 두 가지 조건만 충족되면 사용할 수 있습니다. 반면, 한국어에서 이에 대응하는 &apos;형&apos;이라는 단어 하나가 성립하려면 훨씬 많은 조건이 동시에 충족되어야 합니다. 말하는 사람(화자)이 남성이어야 하고 +화자: 남성, 상대방도 남성이어야 하며 +대상: 남성, 상대방이 나보다 나이가 많아야 하고 +위계: 연상, 두 사람 사이에 일정 수준 이상의 친밀감이 형성되어 있어야 합니다 +사회적 연대. 여기에 실제 혈연이 아니더라도 이 호칭을 사용할 수 있다는 가상 확장의 조건 ±혈연(가상 확장)까지 더해집니다. 이러한 호칭 구조의 차이에 따라, 영어 화자가 누군가를 부를 때는 상대방을 하나의 독립된 개인으로 지칭하는 경향이 있는 반면, 한국어 화자가 누군가를 부를 때는 자신과 상대방 사이의 나이, 성별, 친밀도를 복합적으로 반영하는 위계적이고 정서적인 관계 좌표를 구축하는 경향이 있다고 해석할 수 있습니다.</p>
                                    <p>영어에서는 &apos;You&apos;라는 하나의 대명사가 모든 상대방에게 동일하게 적용됩니다. 이 구조 안에서 화자는 상대방의 나이, 직업, 사회적 지위를 미리 파악하지 않아도 대화를 시작할 수 있는 경향이 있습니다. 대화의 두 주체가 언어적으로 수평적인 위치에 놓이기 때문입니다. 반면, 한국어의 관계 좌표계는 나이, 학번, 직급 같은 수직적 정보가 먼저 확인되지 않으면 올바르게 작동하기 어려운 경향이 있습니다. 적절한 높임말의 단계와 호칭을 결정할 기준이 부재하기 때문입니다. 따라서 한국 문화에서 처음 만난 사람에게 나이나 학번, 입사 연도를 묻는 행위는 무례한 질문이라기보다, 올바른 문법적 존대 체계와 호칭을 작동시키기 위해 반드시 거쳐야 하는 &apos;초기 좌표 설정&apos; 과정에 가깝다고 볼 수 있습니다.</p>
                                </div>
                                <div className={`${styles.note} ${styles.krNote}`}>
                                    <sup>1</sup> 가상 친족(Fictive Kinship): 생물학적 또는 법적 혈연관계가 아닌 타인을 사회적으로 친족 성원으로 간주하여 호칭 및 유대 관계를 적용하는 사회인류학적 개념 (A. R. 래드클리프-브라운 등 확립).<br />
                                    <sup>2</sup> 김한곤 (1967). 「가상 친족 확장 메커니즘」,「어학연구」, 서울대학교 언어교육원.<br />
                                    <sup>3</sup> 킹, R. (2006).「문화와 사회 속의 한국어」, 하와이 대학교 출판부.<br />
                                    <sup>4</sup> 레드클리프-브라운, A. R. (1952).「원시사회의 구조와 기능」, 프리 프레스.
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>
                        {lang === "en"
                            ? "2. Differences and Examples & Visual Experiment and Practice"
                            : "2. 차이와 예시 & 시각 실험과 실천"}
                    </h2>
                    <div className={styles.flexRow}>
                        {lang === "en" ? (
                            <>
                                <div className={styles.enCol}>
                                    <h3>Mapping System: The Two-Dimensional Relational Axes</h3>
                                    <p>The vocabulary of each chapter is mapped onto a two-dimensional coordinate system. The vertical axis (Y) represents social Hierarchy, specifically indicating the degree of biological, generational, or institutional seniority between the speaker and the listener. The horizontal axis (X) represents Social Distance &amp; Permanence, indicating the degree of relational intimacy, durability, and the domain-specificity of the bond.</p>
                                    <p>A term placed high on the Y-axis reflects a strong power differential, while a term placed at the far right of the X-axis reflects a wide social distance or a transient, anonymous relationship. These two axes are independent variables. That is, a single term may be high in hierarchy while simultaneously low in social distance (e.g., Hyeong — representing both a higher social seniority than the speaker and a strong sense of solidarity). Conversely, a term may be neutral in hierarchy while high in social distance (e.g., Sir/Ma&apos;am — an anonymous and transactional relationship). Operating together, the two axes enable each address term to occupy a precise, non-overlapping coordinate within the relational space.<sup>5</sup></p>
                                </div>
                                <div className={`${styles.note} ${styles.enNote}`}>
                                    <sup>5</sup> To ensure visual legibility and articulate relational directionality effectively, the physical scale and layout of certain complex address nodes are flexibly adjusted rather than rigidly confined within the absolute boundaries of the 3×3 (9-quadrant) grid matrix.
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.krCol}>
                                    <h3>매핑 시스템: 2차원 관계 좌표축</h3>
                                    <p>각 챕터의 어휘는 2차원 좌표계 위에 배치됩니다. 세로축(Y)은 사회적 위계를 나타냅니다. 화자와 청자 사이에 존재하는 생물학적, 세대적, 또는 제도적 서열 차이의 크기를 의미합니다. 가로축(X)은 사회적 거리와 관계의 지속성을 나타냅니다. 두 사람 사이의 친밀함이 얼마나 깊은지, 그 관계가 얼마나 오래 지속되는지, 그리고 특정 영역(직장, 학교 등)에 한정된 관계인지 여부를 반영합니다.</p>
                                    <p>세로축에서 높은 위치에 놓인 단어일수록 강한 권력 차이를 반영하는 경향이 있고, 가로축에서 오른쪽 끝에 위치한 단어일수록 넓은 사회적 거리 혹은 일회성·익명적 관계를 반영하는 경향이 있습니다. 이 두 축은 서로 독립적으로 작동합니다. 즉, 하나의 단어가 위계에서는 높은 위치에 있으면서 동시에 사회적 거리에서는 가까운 위치에 있을 수 있습니다. 예를 들어 &apos;형&apos;은 화자보다 사회적 서열이 높으면서도 강한 연대감을 동시에 담고 있는 호칭입니다. 반대로 위계에서는 중립적이면서 사회적 거리에서는 먼 위치에 있는 호칭도 있습니다. Sir나 Ma&apos;am은 이름도 모르는 상대방에게 일회적으로 사용되는 익명적인 관계의 호칭입니다. 이 두 축이 함께 작동함으로써, 각 호칭은 관계 공간 안에서 겹치지 않는 고유한 좌표를 점유할 수 있게 됩니다.<sup>5</sup></p>
                                </div>
                                <div className={`${styles.note} ${styles.krNote}`}>
                                    <sup>5</sup> 다이어그램의 시각적 가독성(Legibility)과 정보 전달력을 확보하기 위해, 일부 복합 호칭 노드의 물리적 크기와 배치는 9개 구역(3×3 매트릭스) 그리드의 절대적인 경계에 엄격하게 종속되기보다는, 관계적 방향성과 위계 구조가 명확히 드러나도록 유연하게 비례 보정(Scalability Adjustment)되었습니다.
                                </div>
                            </>
                        )}
                    </div>

                    {/* Chapter 1 Interactive Instrument Viewport */}
                    <Chapter1Instrument lang={lang} />
                </div>
            </section>

            {/* Chapter 2 */}
            <section id="chapter-2" className={styles.chapterHeroSection} style={{ backgroundColor: "#85712a" }} />

            <section className={styles.contentSection}>
                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>{lang === "en" ? "1. Research" : "1. 선행연구"}</h2>
                    <div className={styles.flexRow}>
                        {lang === "en" ? (
                            <>
                                <div className={styles.enCol}>
                                    <p>How do different languages construct the same pragmatic function of respect? According to morphological typology (Greenberg, 1960)<sup>1</sup>, languages possess different structural tendencies for encoding grammatical information. English leans toward an analytic structure, where politeness is primarily realized through external syntactic and discourse resources—such as modal verbs, euphemisms, and indirect speech acts—placed outside the core word. Korean, leaning toward an agglutinative structure, provides favorable structural conditions to systematically encode politeness internally, using morphological devices like sentence-ending suffixes and pre-final suffixes.</p>
                                    <p>For example, to elevate the politeness of the &apos;Give me,&apos; English employs external padding: &apos;Could you give me?&apos; or &apos;I was wondering if you could possibly give me.&apos; The core verb give remains structurally intact. English builds an architectural buffer space on the syntactic and discourse levels to achieve sophisticated politeness, an approach often characterized by active volition and strategic selection (Ide, 1989; Brown, 2011)<sup>2</sup>.</p>
                                    <p>In contrast, Korean addresses this through structural transformation. The verb juda (give) becomes juseyo, jusipsio, or is entirely replaced by deurida. As social relationships become defined, the use of specific morphological and lexical markers operates under strong grammatical and pragmatic pressure, a dynamic known as discernment (Ide, 1989). Rather than adding external syntactic layers, Korean relies on the internal morphing of verb stems, suffixes, and full lexical suppletion.</p>
                                    <p>Both English and Korean possess highly sophisticated politeness systems. However, English tends to encode politeness through external syntactic and discourse strategies<sup>3</sup>, whereas Korean tends to encode it more directly through internal marking—a multi-layered system including morphological affixes, lexical suppletion, and tiered sentence-ending structures.</p>
                                </div>
                                <div className={`${styles.note} ${styles.enNote}`}>
                                    <sup>1</sup> Greenberg, J. H. (1960). &quot;A Quantitative Approach to the Morphological Typology of Language&quot;, International Journal of American Linguistics.<br />
                                    <sup>2</sup> Ide, S. (1989). &quot;Formal forms and discernment: Two neglected aspects of universals of linguistic politeness&quot;, Multilingua, 8(2-3); Brown, L. (2011). Korean honorifics and politeness in second language learning, John Benjamins.<br />
                                    <sup>3</sup> In reality, the Korean addressee honorific system is not a simple linear hierarchy but a multidimensional system where formality and politeness axes intersect (cf. Sohn, H. M. 1999. The Korean Language).
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.krCol}>
                                    <p>존중이라는 동일한 화용론적 기능을 다른 언어들은 어떻게 구성할까요? 형태론적 유형론(Greenberg, 1960)<sup>1</sup>에 따르면, 언어는 문법 정보를 처리하는 구조적 경향성이 다릅니다. 영어는 분석어(Analytic Language)적 경향을 띠어, 조동사나 완곡 표현, 간접 화행 등 단어 바깥의 통사적·담화적 자원을 통해 공손함을 실현하는 경향이 있습니다. 반면 한국어는 교착어(Agglutinative Language)적 경향을 띠어, 종결어미나 선어말어미 등 단어 내부의 형태론적 장치를 통해 공손함을 체계적으로 부호화하기 쉬운 구조적 조건을 갖추고 있습니다.</p>
                                    <p>예를 들어 &apos;Give me(주세요)&apos;라는 요청의 공손함을 높이기 위해 영어는 외부 완충재를 사용합니다: &apos;Could you give me?&apos; 또는 &apos;I was wondering if you could possibly give me.&apos; 핵심 동사 give는 구조적으로 온전히 유지됩니다. 영어는 통사적·담화적 층위에서 완충 효과를 만들어 정교한 공손함을 달성하며, 이는 종종 화자의 능동적 의지와 전략적 선택(Volition)으로 특징지어집니다(Ide, 1989; Brown, 2011)<sup>2</sup>.</p>
                                    <p>반면 한국어는 구조적 변환을 통해 이에 접근합니다. 동사 주다는 주세요, 주십시오로 변하거나 드리다로 완전히 교체됩니다. 사회적 관계가 분명해질수록 특정 형태론적·어휘적 표지의 사용에는 문법적·화용론적 압력이 강하게 작동하며(Discernment) 규범화됩니다(Ide, 1989). 한국어는 외부적인 통사적 레이어를 더하기보다 동사 어간, 어미의 내부적 변형과 전면적인 어휘 보충법에 의존합니다.</p>
                                    <p>영어와 한국어는 모두 정교한 공손 체계를 지니고 있습니다. 그러나 영어는 공손함을 주로 구문적·담화적 전략(External Strategies)으로 부호화하는 경향이 있는 반면, 한국어는 형태론적 접사, 어휘적 보충법, 그리고 단계적인 종결어미 체계를 포함한 다층적 장치(Internal Marking)<sup>3</sup>로 더 직접적으로 부호화하는 경향이 있습니다.</p>
                                </div>
                                <div className={`${styles.note} ${styles.krNote}`}>
                                    <sup>1</sup> Greenberg, J. H. (1960). 「A Quantitative Approach to the Morphological Typology of Language」, International Journal of American Linguistics.<br />
                                    <sup>2</sup> Ide, S. (1989). 「Formal forms and discernment: Two neglected aspects of universals of linguistic politeness」, Multilingua, 8(2-3); Brown, L. (2011). Korean honorifics and politeness in second language learning, John Benjamins.<br />
                                    <sup>3</sup> 한국어 상대 높임법은 단순한 선형적 상하 관계가 아니라 격식/비격식과 존대/비존대라는 두 축이 교차하는 다차원적 체계입니다 (Sohn, H. M. 1999. The Korean Language 참조).
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>
                        {lang === "en"
                            ? "2. Differences and Examples & Visual Experiment and Practice"
                            : "2. 차이와 예시 & 시각 실험과 실천"}
                    </h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
                        {/* Above Diagram: Intro & Figure Header */}
                        <div style={{ width: '100%' }}>
                            {lang === "en" ? (
                                <div className={styles.enCol}>
                                    <h3>1. Ways</h3>
                                    <p>The visual blocks below represent the structural layers through which social hierarchy and relational distance are linguistically encoded. Before examining specific examples, it is necessary to define the morphological and lexical mechanisms that constitute this system.</p>
                                </div>
                            ) : (
                                <div className={styles.krCol}>
                                    <h3>1. 방법들</h3>
                                    <p>아래의 시각적 블록들은 사회적 위계와 관계적 거리가 언어적으로 암호화되는 구조적 층위를 나타냅니다. 구체적인 예시를 살펴보기에 앞서, 이 시스템을 구성하는 형태론적, 어휘적 기제들을 다음과 같이 정의합니다.</p>
                                </div>
                            )}

                            <div style={{ fontFamily: 'Pretendard Variable, Pretendard, sans-serif', fontSize: '18px', fontWeight: 700, color: '#000000', margin: '1rem 0 0.25rem 0', lineHeight: '1.25' }}>
                                {lang === "en"
                                    ? "Fig 1. Morphological and Lexical Mechanisms"
                                    : "그림 1. 형태론적, 어휘적 기제"}
                            </div>
                        </div>

                        {/* Center: Enlarged Diagram (4 stacked blocks) */}
                        <div style={{ width: '100%', maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0' }}>
                            <div style={{ backgroundColor: '#583884', color: '#ffffff', padding: '1.25rem 2rem', textAlign: 'center', fontSize: '18px', fontWeight: 700, fontFamily: 'Pretendard Variable, Pretendard, sans-serif' }}>
                                {lang === "en" ? "Lexical Root & Base Form" : "어근 및 기본형"}
                            </div>
                            <div style={{ backgroundColor: '#e7e7e7', color: '#000000', padding: '1.25rem 2rem', textAlign: 'center', fontSize: '18px', fontWeight: 700, fontFamily: 'Pretendard Variable, Pretendard, sans-serif' }}>
                                {lang === "en" ? "Grammatical Morpheme" : "문법 형태소"}
                            </div>
                            <div style={{ backgroundColor: '#00fb49', color: '#000000', padding: '1.25rem 2rem', textAlign: 'center', fontSize: '18px', fontWeight: 700, fontFamily: 'Pretendard Variable, Pretendard, sans-serif' }}>
                                {lang === "en" ? "Politeness Marker & Mitigating Device" : "공손 표지 및 완화 기제"}
                            </div>
                            <div style={{ backgroundColor: '#85712a', color: '#ffffff', padding: '1.25rem 2rem', textAlign: 'center', fontSize: '18px', fontWeight: 700, fontFamily: 'Pretendard Variable, Pretendard, sans-serif' }}>
                                {lang === "en" ? "Suppletive Form" : "어휘적 보충법 / 보충 어휘"}
                            </div>
                        </div>

                        {/* Below Diagram: Detailed Component Descriptions */}
                        <div style={{ width: '100%' }}>
                            {lang === "en" ? (
                                <div className={styles.enCol}>
                                    <p><strong>Lexical Root and Base Form</strong> The neutral semantic core of a word, uninflected by social hierarchy, context, or interpersonal variables. It represents the absolute basic state of meaning before any relational calculation is applied.</p>
                                    <p><strong>Grammatical Morpheme</strong> The structural units attached to the root that determine grammatical function. In hierarchical languages, these morphemes act as the foundational structure to which honorific conjugations are anchored.</p>
                                    <p><strong>Politeness Marker and Mitigating Device</strong> Syntactic attachments used to calibrate social distance and respect without altering the original root word. These devices function as a dial, adjusting the degree of politeness based on the situational context.</p>
                                    <p><strong>Suppletive Form</strong> The phenomenon where modifying the base form is insufficient for the required level of respect. Instead, the base word is completely replaced by an entirely distinct vocabulary item reserved strictly for elevated subjects or recipients.</p>
                                </div>
                            ) : (
                                <div className={styles.krCol}>
                                    <p><strong>보라색 (어근 및 기본형):</strong> 사회적 위계나 관계적 변인이 반영되기 전, 단어가 지닌 중립적이고 핵심적인 의미 단위입니다. 관계적 계산이 적용되기 이전의 절대적인 기본 상태를 의미합니다.</p>
                                    <p><strong>회색 (문법 형태소):</strong> 어근에 결합하여 문법적 기능을 결정하는 구조적 단위입니다. 위계적 언어에서는 존대 활용이 결합하기 위한 구조적 토대로 작용합니다.</p>
                                    <p><strong>초록색 (공손 표지 및 완화 기제):</strong> 어근 자체를 변형하지 않고 접사나 종결 어미 등을 부착하여 화자와 청자 간의 존대 수준을 조율하는 장치입니다. 상황적 맥락에 따라 공손성의 강도를 미세하게 조절하는 역할을 합니다.</p>
                                    <p><strong>갈색 (어휘적 보충법 및 보충 어휘):</strong> 기본형에 문법적 접사를 더하는 것만으로는 요구되는 존대의 수준을 충족할 수 없을 때 발생합니다. 형태가 완전히 다른 독립된 특수 어휘로 원단어를 전면 교체하여 극대화된 위계를 표현하는 방식입니다.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Chapter 2 Interactive Verb Assembler Viewport */}
                    <Chapter2Instrument lang={lang} />
                </div>
            </section>

            {/* Chapter 3 */}
            <section id="chapter-3" className={styles.chapterHeroSection} style={{ backgroundColor: "#02fb49" }} />

            <section className={styles.contentSection}>
                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>{lang === "en" ? "1. Research" : "1. 선행연구"}</h2>
                    <div className={styles.flexRow}>
                        {lang === "en" ? (
                            <>
                                <div className={styles.enCol}>
                                    <h3>Situational Perception and Affective Norms</h3>
                                    <p>In cross-cultural pragmatics, managing unstated situational atmosphere and social face is not an absolute binary, but a shared communicative continuum configured with differing cultural weights (Hall, 1976; Ide, 1989)<sup>1, 2</sup>.</p>
                                    <p>In Anglo-American discourse, inappropriate or oblivious behavior is often evaluated as tactlessness or social awkwardness—primarily framing it as an individual&apos;s failure to regulate explicit communicative intention and volition. English addresses atmospheric awareness through various overlapping concepts such as &apos;tact&apos;, &apos;reading the room&apos;, and &apos;saving face&apos;, which largely function as descriptive and evaluative terms for personal conduct and situational skill.</p>
                                    <p>In contrast, Korean culture distributes a significantly heavier burden of contextual decoding onto the listener, institutionalizing atmospheric perception (&apos;nunchi&apos;) and dignity preservation (&apos;chaemyeon&apos;) as normative discernment (Ide, 1989; Lim, 1994)<sup>2, 3</sup>.</p>
                                    <p>Rather than remaining an isolated evaluative trait, &apos;nunchi&apos; expands into an active relational grammar. It functions as a dynamic root that combines with directional verbs to operate across active observation (&apos;nunchireul boda&apos;), causative pressure (&apos;nunchireul juda&apos;), and passive constraint (&apos;nunchiga boida&apos;). While English approaches situational awareness through distributed idiomatic descriptions of personal volition, Korean centralizes it into an operational vocabulary that systematically coordinates social hierarchy and interpersonal boundaries.</p>
                                </div>
                                <div className={`${styles.note} ${styles.enNote}`}>
                                    <sup>1</sup> Hall, E. T. (1976). &quot;Beyond Culture&quot;, Anchor Books.<br />
                                    <sup>2</sup> Ide, S. (1989). &quot;Formal forms and discernment: Two neglected aspects of universals of linguistic politeness&quot;, Multilingua, 8(2-3), 223–248.<br />
                                    <sup>3</sup> Lim, T. S. (1994). &quot;A Study on the Structure of Chemyon and the Determinants of Chemyon Needs&quot;, Korean Journal of Journalism &amp; Communication Studies, 30, 207–247.
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.krCol}>
                                    <h3>상황 인지와 정서적 규범</h3>
                                    <p>비교화용론의 관점에서 무언의 상황적 분위기를 감지하고 사회적 체면을 유지하는 행위는 절대적인 이분법이라기보다, 문화권마다 서로 다른 비중으로 구성되는 소통의 연속체적 과제입니다(Hall, 1976; Ide, 1989)<sup>1, 2</sup>.</p>
                                    <p>영미권 담화에서도 상황에 맞지 않는 발화나 행동은 &apos;tactless&apos;, &apos;oblivious&apos;, 혹은 &apos;socially awkward&apos;한 것으로 평가될 수 있으나, 이는 대체로 화자가 자신의 명시적 의도를 섬세하게 조율하지 못한 데서 비롯된 개인의 전략적 소통 실패로 귀결되는 경향이 있습니다. 영어는 &apos;tact&apos;, &apos;reading the room&apos;, &apos;saving face&apos; 등 부분적으로 중첩되는 다양한 개념들을 통해 상황 인식을 다루며, 이들은 주로 개인의 성향과 행동을 평가하는 기술적 어휘로 기능합니다.</p>
                                    <p>반면 한국어권에서는 맥락 해독의 인지적 부담이 청자에게 더 크게 배분되는 경향이 있어, 분위기 감지(&apos;눈치&apos;)와 사회적 품위 유지(&apos;체면&apos;)가 상호작용 속에서 준수해야 할 규범적 분별의 의무로 제도화되어 왔습니다(Ide, 1989; 임태섭, 1994)<sup>2, 3</sup>.</p>
                                    <p>이에 따라 한국어의 &apos;눈치&apos;는 단순한 개인의 성향 평가에 머무르지 않고, 능동적 탐색(&apos;눈치를 보다&apos;), 사동적 압력(&apos;눈치를 주다&apos;), 피동적 구속(&apos;눈치가 보이다&apos;)과 같이 다양한 동사 결합을 통해 상호작용의 물리적 역학으로 확장됩니다. 결과적으로 영어가 개인의 자발적 의지와 관련된 분산된 관용적 서술을 통해 상황 인식을 다룬다면, 한국어는 위계와 관계적 경계를 조율하는 단일한 조작적 어휘군을 중심으로 이를 체계화하는 경향이 있다고 해석할 수 있습니다.</p>
                                </div>
                                <div className={`${styles.note} ${styles.krNote}`}>
                                    <sup>1</sup> 홀, E. T. (1976). 「문화를 넘어서」, 앵커 북스.<br />
                                    <sup>2</sup> 이데, S. (1989). 「격식 표현과 분별: 언어 공손성 보편론의 두 가지 측면」, 「Multilingua」, 8(2-3), 223–248.<br />
                                    <sup>3</sup> 임태섭 (1994). 「체면의 구조와 체면욕구의 결정인자에 관한 연구」, 「한국언론학보」, 30, 207–247.
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>
                        {lang === "en"
                            ? "2. Differences and Examples & Visual Experiment and Practice"
                            : "2. 차이와 예시 & 시각 실험과 실천"}
                    </h2>

                    {/* Chapter 3 Interactive Relational Dynamics Simulator Viewport */}
                    <Chapter3Instrument lang={lang} />
                </div>
            </section>

            {/* Chapter 4 */}
            <section id="chapter-4" className={styles.chapterHeroSection} style={{ backgroundColor: "#03c1e5" }} />

            <section className={styles.contentSection}>
                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>{lang === "en" ? "1. Research" : "1. 선행연구"}</h2>
                    <div className={styles.flexRow}>
                        {lang === "en" ? (
                            <>
                                <div className={styles.enCol}>
                                    <h3>Conversational Rituals and Dialogue Perspectives</h3>
                                    <p>In both British and Korean cultures, the most ubiquitous conversational rituals are anchored in specific culinary mediums—&apos;Tea&apos; and &apos;Bap&apos; (Meal/Rice). The linguistic prominence of these items stems from their historical roles in physical survival and collective well-being. In Korea&apos;s agrarian history, where food scarcity was a recurring challenge, rice functioned as a primary indicator of well-being. Consequently, sharing a meal and asking if one had eaten evolved into an index of social care and familial inclusion. Similarly, following its mass democratization during the Industrial Revolution, tea in Britain transitioned from a luxury good to a daily necessity. It provided essential warmth, safe hydration, and caloric comfort to the working classes, cementing its status as a universal social panacea. In both contexts, a physical necessity for survival and comfort sublimated into a socio-linguistic metaphor for interpersonal warmth, functioning as a primary vehicle for phatic communion (Malinowski, 1923)<sup>1</sup>.</p>
                                    <p>While both cultures share this pragmatic foundation, the specific social mechanics of &apos;Bap&apos; and &apos;Tea&apos; diverged according to their historical environments. In Korea, the agrarian tradition of collective labor (Pumasi) meant that survival was inherently communal. In this context, eating from the same pot was a ritual that actively dissolved the boundary between &apos;you&apos; and &apos;me,&apos; merging individuals into a singular collective unit (Sik-gu). Because individual well-being was inseparable from the group&apos;s survival, using &apos;Bap&apos; as a conversational tool inherently carries the weight of pulling the other person into an interdependent, highly proximate emotional space.</p>
                                    <p>Conversely, the British &apos;Tea&apos; ritual developed within an industrialized urban society characterized by complex class divisions and a strong emphasis on personal privacy. In such an environment, social interactions required a mechanism to bridge gaps without aggressively breaching private boundaries. Tea-making serves as a &apos;displacement activity&apos; (Fox, 2004)<sup>2</sup>—a standardized physical action that provides a neutral focal point for both parties. By focusing on the kettle and the cup, individuals can share a space and alleviate awkwardness without the pressure of direct emotional disclosure. Therefore, the divergence in their sociolinguistic functions becomes noticeable: while the rhetoric of &apos;Bap&apos; operates by dismantling boundaries to draw individuals into a deeply interdependent shared sphere, &apos;Tea&apos; operates by constructing a shared but regulated space, establishing a polite buffer that allows for social connection while preserving individual autonomy.</p>
                                    <p>This divergence in how interpersonal distance is modulated extends naturally into how speakers orient themselves in basic question-and-answer interactions (Martin, 1992)<sup>3</sup>. Just as culinary rituals establish different social boundaries, the way interlocutors respond to questions reflects their reference point for conversational coordination.</p>
                                    <p>When answering a negative question (e.g., &quot;Didn&apos;t you do it?&quot;), English and Korean speakers tend to adopt contrasting points of orientation. In English discourse, the answer is typically oriented toward the objective reality of the speaker&apos;s own action, regardless of the grammatical framing of the question. If the action did not occur, the answer is consistently &quot;No.&quot; The response prioritizes reporting an autonomous factual state centered on the speaker, keeping the answer cleanly separate from the listener&apos;s phrasing. In Korean discourse, the answer tends to evaluate whether the speaker agrees with the listener&apos;s assumption first. To the question &quot;안 했어?&quot; (Didn&apos;t you do it?), the conventional answer is &quot;응, 안 했어&quot; (Right, I didn&apos;t), where &quot;응&quot; functions as an initial validation of the listener&apos;s premise (&quot;Your assumption that I did not do it is correct&quot;). The speaker prioritizes aligning conversational perspective with the other person before confirming the factual detail. Consequently, the contrast between preserving individual autonomy and fostering collective alignment observed in social rituals finds a structural parallel in the communicative stance taken during question-and-answer exchanges.</p>
                                </div>
                                <div className={`${styles.note} ${styles.enNote}`}>
                                    <sup>1</sup> Malinowski, B. (1923). &quot;The problem of meaning in primitive languages&quot;, in The Meaning of Meaning, Harcourt, Brace &amp; Company (p.199).<br />
                                    <sup>2</sup> Fox, K. (2004). &quot;Watching the English: The Hidden Rules of English Behaviour&quot;, Hodder &amp; Stoughton.<br />
                                    <sup>3</sup> Martin, S. E. (1992). &quot;A Reference Grammar of Korean&quot;, Charles E. Tuttle Company.
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.krCol}>
                                    <h3>대화 의례와 소통의 관점</h3>
                                    <p>영국과 한국 문화에서 가장 보편적인 대화 의례는 각각 &apos;차(Tea)&apos;와 &apos;밥&apos;이라는 특정 식음 매개물에 뿌리를 두는 경향이 있습니다. 언어적 차원에서 이 항목들이 지배적인 위치를 차지하게 된 공통점은 이들이 과거 물리적 생존 및 안위와 직결된 필수재로 기능했다는 역사적 배경에서 기인하는 것으로 보입니다. 식량 부족을 겪었던 한국의 전통적 농경 사회에서 &apos;밥&apos;은 안위를 가늠하는 중요한 지표로 작용하는 편이었습니다. 따라서 식사를 나누고 끼니를 묻는 행위는 사회적 돌봄과 유대감을 확인하는 일차적 수단으로 진화했습니다. 마찬가지로 영국에서 차는 산업혁명기를 거치며 대중적 필수재로 변화했습니다. 노동 계층에게 안전한 식수와 온기, 열량을 제공하던 차는 사회적 위안을 주는 보편적 매개체로 자리 잡았습니다. 결과적으로 두 문화 모두 물리적 필수재가 심리적 온기와 사회적 거리를 조율하는 친교적 언어(Phatic communion)의 은유로 승화되었다는 공통점을 공유합니다(Malinowski, 1923)<sup>1</sup>.</p>
                                    <p>이러한 공통된 화용론적 토대 위에서도, 두 매개물은 각기 다른 사회역사적 환경에 따라 상이한 기능적 지향점을 형성하는 편입니다. 한국의 &apos;밥&apos;은 공동 노동(품앗이)을 중시하는 농경 문화에 기원을 둡니다. 이 환경에서 한 솥의 밥을 나누어 먹는 행위는 &apos;너&apos;와 &apos;나&apos;의 경계를 완화하고 하나의 공동체(식구)로 병합하는 의례로 작용하는 편이었습니다. 개인의 안위가 집단의 생존과 직결되어 있었기 때문에, &apos;밥&apos;을 매개로 한 대화는 상대방을 상호 의존적이고 밀착된 감정적 공간 안으로 연결하려는 성격을 띠기 쉽습니다.</p>
                                    <p>반면 영국의 &apos;차&apos; 문화는 복잡한 계급 구조와 개인의 사생활을 중시하는 산업화된 도시 환경 속에서 발전했습니다. 이러한 사회에서는 개인의 경계를 직접적으로 침범하지 않으면서도 타인과 교류할 수 있는 완충 수단이 필요했습니다. 인류학자 케이트 폭스(Kate Fox, 2004)<sup>2</sup>가 지적하듯 차를 끓이고 권하는 행위는 일종의 &apos;전위 행동&apos;으로서, 시선과 주의를 찻잔이라는 중립적 사물로 분산시키는 역할을 합니다. 이를 통해 양측은 내밀한 감정 표출에 대한 부담을 덜고 물리적 공간을 공유하는 편입니다. 결과적으로 &apos;밥&apos;을 활용한 화법이 개인 간의 경계를 완화하여 상호 의존적인 공유 공간을 형성하는 데 기여한다면, &apos;차&apos;는 정중한 거리를 유지한 채 개별적 자율성을 보호하는 완충재 역할을 수행한다고 해석할 수 있습니다.</p>
                                    <p>식음 매개물을 통해 거리를 조율하는 이러한 태도는 일상적인 질문과 대답 속에서 화자와 청자가 시점을 맞추는 방식과도 자연스럽게 이어집니다(Martin, 1992)<sup>3</sup>. 일상의 의례가 대인 관계의 거리를 설정하듯, 질문에 응답하는 언어적 준거점 역시 문화적 지향점을 반영하는 경향이 있습니다.</p>
                                    <p>부정의문문에 응답할 때 두 언어권은 서로 다른 기준점을 취하는 편입니다. 영미권 화법에서는 질문의 긍정·부정 형식과 무관하게 화자 자신의 객관적인 사실 상태를 독립적인 기준으로 삼는 경향이 있습니다. 행동을 하지 않았다면 답변은 일관되게 &quot;No&quot;가 되며, 질문자의 표현 형식에 얽매이지 않고 개인의 독립된 사실을 전달하는 데 초점을 둡니다. 반면 한국어 화법에서는 상대방이 제시한 생각이나 추측에 동의하는지 여부를 우선적인 기준으로 삼는 편입니다. &quot;안 했어?&quot;라는 물음에 &quot;응, 안 했어&quot;라고 답할 때, &apos;응&apos;은 상대방의 전제가 맞다는 점을 먼저 인정하고 시점을 일치시키는 역할을 합니다. 즉, 사실 관계를 보고하기에 앞서 대화 상대와의 관점 동기화를 먼저 거치는 셈입니다. 결과적으로 대화 의례에서 나타나는 자율적 거리 유지와 상호의존적 결속의 차이는, 질의응답 속에서 사실을 독립적으로 보고하는 태도와 상대의 관점에 먼저 동기화하는 태도의 차이와 구조적 일관성을 형성한다고 볼 수 있습니다.</p>
                                </div>
                                <div className={`${styles.note} ${styles.krNote}`}>
                                    <sup>1</sup> 말리노프스키, B. (1923). 「원시 언어에서의 의미의 문제」, C. K. 오그던 &amp; I. A. 리처즈 (편), 「의미의 의미」, 하코트 브레이스 &amp; 월드, 199쪽.<br />
                                    <sup>2</sup> 폭스, K. (2004). 「영국인 관찰기」, 호더 앤 스토우턴.<br />
                                    <sup>3</sup> 마틴, S. E. (1992). 「한국어 참조 문법」, 찰스 E. 터틀 출판사.
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>
                        {lang === "en"
                            ? "2. Differences and Examples & Visual Experiment and Practice"
                            : "2. 차이와 예시 & 시각 실험과 실천"}
                    </h2>

                    {/* Chapter 4 Interactive Conversational Rituals & Dialogue Perspectives Simulator */}
                    <Chapter4Instrument lang={lang} />
                </div>
            </section>

            {/* Chapter 5: Appendix */}
            <section id="chapter-5" className={styles.chapterHeroSection} style={{ backgroundColor: "#583884" }} />

            <section className={styles.contentSection}>
                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>{lang === "en" ? "1. Acknowledgements" : "1. 감사의 글"}</h2>
                    <div className={styles.flexRow}>
                        {lang === "en" ? (
                            <div className={styles.enCol}>
                                <p>This project has been profoundly shaped by the discussions surrounding language, identity, and the translation of cultural experience. The author extends gratitude to the scholars whose foundational work in linguistic typology and social semiotics provided the backbone for this visual inquiry.</p>
                            </div>
                        ) : (
                            <div className={styles.krCol}>
                                <p>이 프로젝트는 언어, 정체성, 그리고 문화적 경험의 번역을 둘러싼 논의들에 의해 형성되었습니다. 저자는 언어 유형론 및 사회 기호학의 기초적인 작업이 이 시각적 탐구의 뼈대를 제공해 주신 학자분들께 감사를 표합니다.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>{lang === "en" ? "2. Methodology Notes" : "2. 방법론"}</h2>
                    <div className={styles.flexRow}>
                        {lang === "en" ? (
                            <div className={styles.enCol}>
                                <h3>1. Literature Analysis</h3>
                                <p>Analyzes foundational literature in sociolinguistics, cross-cultural pragmatics, and linguistic anthropology to establish theoretical baselines. It excludes value judgments and objectively extracts structural mechanisms such as relational coordinates, politeness buffering, and affective boundaries.</p>
                                <h3>2. Qualitative Lexical &amp; Discourse Corpus Analysis</h3>
                                <p>Examines empirical usage data collected from spoken discourse, contemporary media, address systems, and pragmatic markers. It systematically contrasts lexical derivation networks (active, passive, causative), 4-stage phatic conversation trajectories, and perspective-alignment mechanics in question-answer interactions.</p>
                                <h3>3. Diagrammatic Information Structuring</h3>
                                <p>Translates the researched linguistic data into geometric nodes, 2D coordinate grids, layered syntactic buffers, and directional vectors. Rather than functioning as decorative illustration, this process structures abstract relational dynamics and interpersonal distance mechanisms into legible, objective visual diagrams.</p>
                            </div>
                        ) : (
                            <div className={styles.krCol}>
                                <h3>1. 학술 문헌 분석</h3>
                                <p>사회언어학, 비교화용론, 인류학 문헌을 분석하여 두 언어가 대인 관계를 규정하는 이론적 틀을 확립합니다. 문화적 우열 평가를 배제하고, 언어 유형론에 근거하여 관계적 좌표, 공손성 완충재, 정서적 경계선 등의 구조적 차이를 객관적으로 추출합니다.</p>
                                <h3>2. 질적 어휘 및 담화 용례 분석</h3>
                                <p>일상 구어, 대중 매체, 호칭 체계, 담화 표지 등 실제 발화 맥락에서 수집된 용례 데이터를 기반으로 작동 양상을 분석합니다. 어휘의 파생 형태(능동·피동·사동), 4단계 식음 의례 발화 패턴, 부정의문문 질의응답의 시점 일치 메커니즘을 사실 기반으로 대조합니다.</p>
                                <h3>3. 다이어그램 기반 정보 구조화</h3>
                                <p>1단계와 2단계에서 도출된 언어학적 데이터를 기하학적 요소, 2차원 좌표 그리드, 레이어 구조, 방향성 벡터로 매핑하여 시각 정보로 체계화합니다. 이는 장식적 묘사를 배제하고, 언어의 추상적인 관계 역학과 거리 조율 메커니즘을 객관적으로 판독 가능한 시각 다이어그램으로 구조화하는 작업입니다.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className={`${styles.reveal} ${styles.sectionBlock}`}>
                    <h2 className={styles.sectionTitle}>{lang === "en" ? "3. Bibliography" : "3. 참고문헌"}</h2>
                    <div className={styles.flexRow}>
                        {lang === "en" ? (
                            <div className={styles.enCol}>
                                <h3>Chapter 1. Addressing and Social Hierarchy</h3>
                                <p>Kim, H. K. (1967). &quot;Korean Kinship Terminology: A Semantic Analysis&quot;, Language Research, Language Education Institute, Seoul National University, 3(1), 70–81.</p>
                                <p>Radcliffe-Brown, A. R. (1952). Structure and Function in Primitive Society, Free Press.</p>
                                <p>Sohn, H.-M. (Ed.). (2006). Korean Language in Culture and Society, University of Hawaii Press.</p>
                                <p>Brown, R., &amp; Gilman, A. (1960). &quot;The Pronouns of Power and Solidarity&quot;, In: Style in Language, MIT Press.</p>
                                <p>Agha, A. (2007). Language and Social Relations, Cambridge University Press.</p>
                                <p>Hofstede, G. (2001). Culture&apos;s Consequences: Comparing Values, Behaviors, Institutions and Organizations Across Nations, Sage Publications.</p>

                                <h3>Chapter 2. Grammatical Politeness and Social Distance</h3>
                                <p>Greenberg, J. H. (1960). &quot;A Quantitative Approach to the Morphological Typology of Language&quot;, International Journal of American Linguistics, 26(3), 178–194.</p>
                                <p>Ide, S. (1989). &quot;Formal forms and discernment: Two neglected aspects of universals of linguistic politeness&quot;, Multilingua, 8(2-3), 223–248.</p>
                                <p>Brown, L. (2011). Korean honorifics and politeness in second language learning, John Benjamins.</p>
                                <p>Sohn, H. M. (1999). The Korean Language, Cambridge University Press.</p>

                                <h3>Chapter 3. Situational Perception and Affective Norms</h3>
                                <p>Hall, E. T. (1976). Beyond Culture, Anchor Books.</p>
                                <p>Ide, S. (1989). &quot;Formal forms and discernment: Two neglected aspects of universals of linguistic politeness&quot;, Multilingua, 8(2-3), 223–248.</p>
                                <p>Lim, T. S. (1994). &quot;A Study on the Structure of Chemyon and the Determinants of Chemyon Needs&quot;, Korean Journal of Journalism &amp; Communication Studies, 30, 207–247.</p>

                                <h3>Chapter 4. Conversational Rituals and Dialogue Perspectives</h3>
                                <p>Malinowski, B. (1923). &quot;The problem of meaning in primitive languages&quot;, In: C. K. Ogden &amp; I. A. Richards (Eds.), The Meaning of Meaning, Harcourt, Brace &amp; World, 296–336.</p>
                                <p>Fox, K. (2004). Watching the English: The Hidden Rules of English Behaviour, Hodder &amp; Stoughton.</p>
                                <p>Martin, S. E. (1992). A Reference Grammar of Korean, Charles E. Tuttle Company.</p>
                            </div>
                        ) : (
                            <div className={styles.krCol}>
                                <h3>Chapter 1. 호칭과 사회적 위계</h3>
                                <p>김한곤 (1967). 「한국 친족 어휘의 의미 분석」, 『어학연구』, 서울대학교 언어교육원, 3(1), 70–81쪽.</p>
                                <p>레드클리프-브라운, A. R. (1952). 『원시사회의 구조와 기능』, 프리 프레스.</p>
                                <p>손호민 (편). (2006). 『문화와 사회 속의 한국어』, 하와이 대학교 출판부.</p>
                                <p>브라운, R., &amp; 길먼, A. (1960). 「권력과 연대의 대명사」, 『언어 속의 스타일』, MIT 출판부.</p>
                                <p>아가, A. (2007). 『언어와 사회적 관계』, 케임브리지 대학교 출판부.</p>
                                <p>홉스테드, G. (2001). 『문화의 결과: 가치, 행동, 제도 및 조직의 비교』, 세이지 출판사.</p>

                                <h3>Chapter 2. 문법적 경어와 사회적 거리</h3>
                                <p>그린버그, J. H. (1960). 「언어의 형태론적 유형론에 대한 양적 접근」, 『International Journal of American Linguistics』, 26(3), 178–194.</p>
                                <p>이데, S. (1989). 「격식 표현과 분별: 언어 공손성 보편론의 두 가지 측면」, 『Multilingua』, 8(2-3), 223–248.</p>
                                <p>브라운, L. (2011). 『제2언어 학습에서의 한국어 경어법과 공손성』, 존 벤자민스.</p>
                                <p>손호민 (1999). 『한국어』, 케임브리지 대학교 출판부.</p>

                                <h3>Chapter 3. 상황 인지와 정서적 규범</h3>
                                <p>홀, E. T. (1976). 『문화를 넘어서』, 앵커 북스.</p>
                                <p>이데, S. (1989). 「격식 표현과 분별: 언어 공손성 보편론의 두 가지 측면」, 『Multilingua』, 8(2-3), 223–248.</p>
                                <p>임태섭 (1994). 「체면의 구조와 체면욕구의 결정인자에 관한 연구」, 『한국언론학보』, 30, 207–247.</p>

                                <h3>Chapter 4. 대화 의례와 소통의 관점</h3>
                                <p>말리노프스키, B. (1923). 「원시 언어에서의 의미의 문제」, C. K. 오그던 &amp; I. A. 리처즈 (편), 『의미의 의미』, 하코트 브레이스 &amp; 월드, 296–336.</p>
                                <p>폭스, K. (2004). 『영국인 관찰기』, 호더 앤 스토우턴.</p>
                                <p>마틴, S. E. (1992). 『한국어 참조 문법』, 찰스 E. 터틀 출판사.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

