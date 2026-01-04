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
                    <div>
                        2020-27(expected), Incheon National University(INU),B.F.A. in Visual Design, Double Major in
                        Fashion Industry
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
                    <div className={styles.infoListItem}>2022, ≪Maximalism≫, Anpak Space, Seoul</div>
                    <div className={styles.infoListItem}>2022, ≪Maximalism≫, ArtsxStay, Seoul</div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Career</span>
                    <div className={styles.infoListItem}>2022–Present, Freelance Visual Designer</div>
                    <div className={styles.infoListItem}>2022–2023, Visual Design Intern, Glosome Design Team, Some&Company Co.,
                        Ltd.</div>
                    <div className={styles.infoListItem}>2021–2023, Founder & President, Myo (Government Startup Project
                        Collective)</div>
                    <div className={styles.infoListItem}>2021–2023, Member, 27th Class, O.F.F (National University Student
                        Fashion Association)</div>
                    <div className={styles.infoListItem}>2021, Editorial Design Team, Lets Magazine</div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Awards</span>
                    <div className={styles.infoListItem}>2022, Honorable Mention, 11th International Digital Fashion Contest,
                        Korean Society of Clothing and Textiles (KSCT)</div>
                    <div className={styles.infoListItem}>2022, Selected for the Seoul Fashion Hub Digital Design Showcase</div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>License</span>
                    <div className={styles.infoListItem}>2024, National Technical Qualification, Certified Photographer</div>
                </div>
            </div>

            {/* Column 3: Work */}
            <div className={styles.infoColumn}>
                <div>
                    <span className={styles.sectionTitle}>Work</span>
                    <div className={styles.infoListItem}>2025, ｢한국근현대미술연구재단(korica)｣ 로고 디자인</div>
                    <div className={styles.infoListItem}>2025, ｢한국근현대미술연구재단(korica)｣ 웹사이트 디자인 및 개발</div>
                    <div className={styles.infoListItem}>2024, ｢LWY x SUNOA｣ ≪20≫ 앨범 자켓 디자인</div>
                    <div className={styles.infoListItem}>2024, ｢LWY x SUNOA｣ ≪Loving You≫ 앨범 자켓 디자인</div>
                    <div className={styles.infoListItem}>2024, ｢Subverted Anatomical Landscape｣ 명함 디자인</div>
                    <div className={styles.infoListItem}>2024, ｢Subverted Anatomical Landscape｣ ≪β≫ 서강대메리홀, 프로그램 디자인</div>
                    <div className={styles.infoListItem}>2024, ｢최봉각 작가 x 피트니스 이상｣ 프로그램 디자인</div>
                    <div className={styles.infoListItem}>2024, ｢GoiiGoii｣ 로고 디자인</div>
                    <div className={styles.infoListItem}>2024, ｢신촌글로벌대학문화제(SWYFT)｣ 제 2회 페스티벌 아이덴티티 디자인</div>
                    <div className={styles.infoListItem}>2024, ｢Kodo.jeong｣ 패키지 디자인</div>
                    <div className={styles.infoListItem}>2024, ｢Ubomanli｣ 로고 디자인</div>
                    <div className={styles.infoListItem}>2024, ｢Ubomanli｣ ≪서양극장 속 한옥≫ 아르코 · 대학로예술극장, 프로그램 디자인</div>
                    <div className={styles.infoListItem}>2024, ｢Subverted Anatomical Landscape｣ ≪KILL≫ LG 아트센터, 프로그램 디자인</div>
                    <div className={styles.infoListItem}>2024, ｢Annpaak｣ 기획전 ≪장면과 소외≫ 프로그램 디자인</div>
                    <div className={styles.infoListItem}>2024, ｢THE BOYZ｣ 2nd full Pt.3 ≪Love Letter≫ 앨범 자켓 및 프로모션 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢beigebongbong｣ 아이덴티티 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢성윤선의 장고춤 네트워크｣ 성균소극장 12월 상설공연 ≪동행≫ 프로그램 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢Jeom store｣ 1st anniversary 굿즈 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢TTB x garb x bite poets｣ ≪extra ordinary≫ 프로그램 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢Ubomanli｣명함 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢전기홍 작가｣ ≪buckwild≫ 에디토리얼 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢Ubomanli｣ ≪Knock≫ 국립극장, 프로그램 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢chelon archive co.｣ 아이덴티티 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢Mumu｣ 아이덴티티 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢Cidae.co｣ 에디토리얼 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢Miammiam x 최원혁 작가｣ 프로그램 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢Oboae｣ 쇼룸 엽서 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢Info x cidae.co｣ 굿즈 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢Nneed coffee｣ 아이덴티티 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢Each differ｣ 23f/w 아트워크 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢최원혁 작가｣ ≪open studio in seoul≫ 프로그램 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢Each differ｣ 로고 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢최원혁 작가｣ ≪open studio in jeju≫ 프로그램 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢Doosan x vlook｣ 아이덴티티 및 팝업스토어 매장 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢AAO｣ 월별 3D 아트워크 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢Viewfinder｣ 연력 포스터 디자인</div>
                    <div className={styles.infoListItem}>2023, ｢Viewfinder｣ 로고 디자인</div>
                    <div className={styles.infoListItem}>2022, ｢Bfrog｣ 쇼룸 로고 디자인</div>
                    <div className={styles.infoListItem}>2022, ｢Higher coffee｣ 행사 포스터 디자인</div>
                </div>
            </div>

            {/* Column 4: Tools, Clients */}
            <div className={styles.infoColumn}>
                <div>
                    <span className={styles.sectionTitle}>Tools</span>
                    <div>
                        Indesign, Illustrator, Photoshop, Lightroom, LightroomClassic, AfterEffects, Cinema4D, Redshift,
                        TouchDesigner, XD, HTML/CSS
                    </div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Clients / Collaboration</span>
                    <div className={styles.infoListItem}>
                        korica, lwy, sunoa, bongak choi, Seodaemun-gu, SWYFT, lobby/st, kodo coffee, annpaak, Subverted
                        Anatomical Landscape (SAL), ist entertainment, theboyz, Incheon National University (INU),
                        glaspress, beigebongbong, ubomanli, janggo chum network of yunseeon sung, jeom store, wonhyuck
                        choi, bite poets, garb, templethebongbong, gihong jeon, inho cho, chelon archive Co., cidae mag,
                        miammiam liberal, oboae, sanctuary, nneed coffee, each differ, doosan Corp., vlook Inc., jiyoung
                        kim, glosome, the societ of fashoin & textile industry, seoul fashion hub, bfrog vintage, higher
                        coffee, off seoul, magazine lets, sungkyul univ., lotteimall •••
                    </div>
                </div>
            </div>
        </div>
    );
}
