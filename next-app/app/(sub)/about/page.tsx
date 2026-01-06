import styles from "./about.module.css";

export default function AboutPage() {
    return (
        <div className={styles.informationGrid}>
            {/* Column 1: Introduction */}
            <div className={styles.infoColumn}>
                <div>
                    <span className={styles.sectionTitle}>Introduction</span>
                    <div className={styles.infoText}>
                        Yoonhyeok Kim is a graphic designer based in Seoul. I focus on developing visual languages that
                        mediate various elements based on form. I mainly work on printed matter such as posters, books,
                        and other publications, as well as brand-related identities. Ultimately, I strive to be someone
                        who contemplates what message to convey through the tool of design.
                        <span className={styles.introDivider}></span>
                        김윤혁은 서울을 기반으로 활동하는 그래픽 디자이너입니다. 조형성을 바탕으로 다양한 요소들을 매개하는 시각 언어로 개발하는 데에 집중하고 있습니다. 주로 포스터와 책, 기타
                        발행물 같은 지류 작업과 브랜드와 관련된 아이덴티티를 개발하는 작업을 하고 있습니다. 궁극적으로 디자인이라는 도구를 통해 어떤 메시지를 전할지 고민하는 사람이 되고자
                        합니다.
                    </div>
                </div>
            </div>

            {/* Column 2: Profile, Education, Contact... */}
            <div className={styles.infoColumn}>
                <div>
                    <span className={styles.sectionTitle}>Profile</span>
                    <div>
                        Yoonhyeok Kim<br />
                        From Seoul, Republic of Korea
                    </div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Education</span>
                    <div className={styles.infoListItem}>
                        <span className={styles.yearLabel}>2020-27,</span><span>Incheon National University(INU),B.F.A. In Visual Design, Double Major In
                            Fashion Industry</span>
                    </div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Contact</span>
                    <div>
                        <a href="https://www.instagram.com/hyeok.info/" target="_blank" rel="noopener noreferrer"
                            className={styles.textLink}>hyeok.info</a><br />
                        +82 10 2458 0187<br />
                        <a href="mailto:hyeok.info@gmail.com" className={styles.textLink} target="_blank" rel="noopener noreferrer">hyeok.info@gmail.com</a>
                    </div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Exhibition</span>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2026,</span><span>≪LOOPING IN THE BOX≫, ARTKOREALAB, Seoul</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>≪INU x ISO Project≫, Illinois State Univ.(ISO), Incheon Nat'l Univ.(INU)</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2022,</span><span>≪Maximalism≫, Anpak Space, Seoul</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2022,</span><span>≪Maximalism≫, ArtsxStay, Seoul</span></div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Career</span>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2022–Present,</span><span>Freelance Visual Designer</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2022–2023,</span><span>Visual Design Intern, Glosome Design Team, Some&Company Co.,
                        Ltd.</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2021–2023,</span><span>Founder & President, Myo (Government Startup Project
                        Collective)</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2021–2023,</span><span>Member, 27th Class, O.F.F (National University Student
                        Fashion Association)</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2021,</span><span>Editorial Design Team, Lets Magazine</span></div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Awards</span>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2022,</span><span>Honorable Mention, 11th International Digital Fashion Contest,
                        Korean Society Of Clothing And Textiles (KSCT)</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2022,</span><span>Selected For The Seoul Fashion Hub Digital Design Showcase</span></div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>License</span>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>National Technical Qualification, Certified Photographer</span></div>
                </div>
            </div>

            {/* Column 3: Work */}
            <div className={styles.infoColumn}>
                <div>
                    <span className={styles.sectionTitle}>Work</span>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2026,</span><span>｢Subverted Anatomical Landscape｣ ≪X≫ 아르코대극장, 프로그램 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢상명대학교 53회 졸업전시｣ 아이덴티티 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢곰시선 프로젝트｣ ≪재활용? 제활용!≫ 아르코 대학로예술극장 소극장, 프로그램 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢Single Origin｣ 웹사이트 디자인 및 개발</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢다닥다닥 마켓 백상회(百象會)｣ 경희대학교 로컬콘텐츠 중점대학 주최, 참여 작가 30인 포스터 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢Coffee Collage｣ 아이덴티티 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢Subverted Anatomical Landscape｣ ≪GAMMA≫ 아르코 대학로대극장, 프로그램 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢성윤선의 장고춤 네트워크｣ ≪동행≫ Ⅱ 전통공연창작마루 광무대, 프로그램 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢Minchan Lee｣ ≪GLIDE≫ 앨범 자켓 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢미디어 아티스트 김수민｣ 명함 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢한국근현대미술연구재단(Korica)｣ 웹사이트 디자인 및 개발</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢한국근현대미술연구재단(Korica)｣ 로고 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢LWY X SUNOA｣ ≪20≫ 앨범 자켓 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢LWY X SUNOA｣ ≪Loving You≫ 앨범 자켓 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢Subverted Anatomical Landscape｣ 명함 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢Subverted Anatomical Landscape｣ ≪β≫ 서강대메리홀, 프로그램 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢최봉각 작가 X 피트니스 이상｣ 프로그램 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢GoiiGoii｣ 로고 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢신촌글로벌대학문화제(SWYFT)｣ 제 2회 페스티벌 아이덴티티 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢Kodo.Jeong｣ 패키지 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢Ubomanli｣ 로고 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢Ubomanli｣ ≪서양극장 속 한옥≫ 아르코 · 대학로예술극장, 프로그램 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢Subverted Anatomical Landscape｣ ≪KILL≫ LG 아트센터, 프로그램 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢Annpaak｣ 기획전 ≪장면과 소외≫ 프로그램 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢THE BOYZ｣ 2nd Full Pt.3 ≪Love Letter≫ 앨범 자켓 및 프로모션 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Beigebongbong｣ 아이덴티티 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢성윤선의 장고춤 네트워크｣ 성균소극장 12월 상설공연 ≪동행≫ 프로그램 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Jeom Store｣ 1st Anniversary 굿즈 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢TTB X Garb X Bite Poets｣ ≪Extra Ordinary≫ 프로그램 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Ubomanli｣명함 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢전기홍 작가｣ ≪Buckwild≫ 에디토리얼 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Ubomanli｣ ≪Knock≫ 국립극장, 프로그램 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Chelon Archive Co.｣ 아이덴티티 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Mumu｣ 아이덴티티 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Cidae.Co｣ 에디토리얼 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Miammiam X 최원혁 작가｣ 프로그램 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Oboae｣ 쇼룸 엽서 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Info X Cidae.Co｣ 굿즈 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Nneed Coffee｣ 아이덴티티 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Each Differ｣ 23f/W 아트워크 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢최원혁 작가｣ ≪Open Studio In Seoul≫ 프로그램 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Each Differ｣ 로고 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢최원혁 작가｣ ≪Open Studio In Jeju≫ 프로그램 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Doosan X Vlook｣ 아이덴티티 및 팝업스토어 매장 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢AAO｣ 월별 3D 아트워크 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Viewfinder｣ 연력 포스터 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Viewfinder｣ 로고 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2022,</span><span>｢Bfrog｣ 쇼룸 로고 디자인</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2022,</span><span>｢Higher Coffee｣ 행사 포스터 디자인</span></div>
                </div>
            </div>

            {/* Column 4: Tools, Clients */}
            <div className={styles.infoColumn}>
                <div>
                    <span className={styles.sectionTitle}>Tools</span>
                    <div>
                        Indesign, Illustrator, Photoshop, Lightroom, LightroomClassic, AfterEffects, Cinema4D, Redshift,
                        TouchDesigner, XD, React, Next.js, SCSS, HTML/CSS
                    </div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Clients / Collaboration</span>
                    <div className={styles.infoListItem}>
                        Arko Theater, Sangmyung Univ., MSS, KOSME, Kyung Hee Univ., NA1, Bobu Office, Michan Lee, Sumin Kim, Korica, Lwy, Sunoa, Bongak Choi, Seodaemun-Gu, SWYFT, Lobby/St, Kodo Coffee, Annpaak, Subverted
                        Anatomical Landscape (SAL), Ist Entertainment, Theboyz,
                        Glaspress, Beigebongbong, Ubomanli, Janggo Chum Network Of Yunseeon Sung, Jeom Store, Wonhyuck
                        Choi, Bite Poets, Garb, Templethebongbong, Gihong Jeon, Inho Cho, Chelon Archive Co., Cidae Mag,
                        Miammiam Liberal, Oboae, Sanctuary, Nneed Coffee, Each Differ, Doosan Corp., Vlook Inc., Jiyoung
                        Kim, Glosome, The Societ Of Fashoin & Textile Industry, Seoul Fashion Hub, Bfrog Vintage, Higher
                        Coffee, Off Seoul, Magazine Lets, Sungkyul Univ., Lotteimall •••
                    </div>
                </div>
            </div>
        </div>
    );
}
