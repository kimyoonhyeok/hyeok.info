import styles from "./about.module.css";
import Link from "next/link";

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
                        <div className={styles.introKorean}>
                            김윤혁은 서울을 기반으로 활동하는 그래픽 디자이너입니다. 조형성을 바탕으로 다양한 요소들을 매개하는 시각 언어로 개발하는 데에 집중하고 있습니다. 주로 포스터와 책, 기타
                            발행물 같은 지류 작업과 브랜드와 관련된 아이덴티티를 개발하는 작업을 하고 있습니다. 궁극적으로 디자인이라는 도구를 통해 어떤 메시지를 전할지 고민하는 사람이 되고자
                            합니다.
                        </div>
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
                        <span className={styles.yearLabel}>2020-27,</span><Link href="/inu-score" className={styles.textLink}>Incheon National University(INU),B.F.A. In Visual Design, Double Major In
                            Fashion Industry</Link>
                    </div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Stay in touch</span>
                    <div>
                        Instagram, <a href="https://www.instagram.com/hyeok.info/" target="_blank" rel="noopener noreferrer"
                            className={styles.textLink}>hyeok.info</a><br />
                        Mobile, +82 10 2458 0187<br />
                        E-mail, <a href="mailto:hyeok.info@gmail.com" className={styles.textLink} target="_blank" rel="noopener noreferrer">hyeok.info@gmail.com</a>
                    </div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Exhibition</span>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2026,</span><span>≪LOOPING IN THE BOX≫, ARTKOREALAB, Seoul</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>≪INU x ISO Project≫, Illinois State Univ.(ISO), Incheon Nat&apos;l Univ.(INU)</span></div>
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
                <div>
                    <span className={styles.sectionTitle}>Workshops / Seminars</span>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2026,</span><span>Notefolio WorkShop 6-week course ≪Workshop for Beginners≫, 1F, 3-10 Donggyo-ro 27-gil, Mapo-gu, Seoul(03993)</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>TouchDesigner WorkShop, ≪Connecting Hand to Circle: Kinetic art via MediaPipe≫, 83 Uisadang-daero, Yeongdeungpo-gu, Seoul(07325)</span></div>
                </div>
            </div>

            {/* Column 3: Work */}
            <div className={styles.infoColumn}>
                <div>
                    <span className={styles.sectionTitle}>Work</span>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2026,</span><span>｢Ubomanli｣ ≪Coexistence of the Incompatible≫, ARKO Arts Theater, Poster Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2026,</span><span>｢Wald Ensemble x Subverted Anatomical Landscape｣ ≪Apollo≫ Seosomun Shrine History Museum, Program Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2026,</span><span>｢Seungyoon Lee｣ 4th Full-length Studio Album ≪0≫, Physical Album Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2026,</span><span>｢SKETCHED SPACE｣ Website Design & Development</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2026,</span><span>｢Subverted Anatomical Landscape｣ ≪X≫ ARKO Arts Theater, Program Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢Sangmyung Univ. 53rd Graduation Exhibition｣ Identity Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢Gomsiseon Project｣ ≪Recycling? Re-cycling!≫ ARKO Arts Theater Small Hall, Program Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢Single Origin｣ Website Design & Development</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢Dadakdadak Market Baeksanghoe(百象會)｣ Hosted by Kyung Hee Univ., Participating 30 Artists Poster Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢Coffee Collage｣ Identity Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢Subverted Anatomical Landscape｣ ≪GAMMA≫ ARKO Arts Theater, Program Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢Seong Yoon-seon&apos;s Janggu Dance Network｣ ≪Companion≫ Ⅱ Traditional Performing Arts Creation Maru Gwangmudae, Program Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢Minchan Lee｣ ≪GLIDE≫ Album Jacket Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢Media Artist Sumin Kim｣ Business Card Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢Korea Research Institute of Contemporary Art (KoRICA)｣ Website Design & Development</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2025,</span><span>｢Korea Research Institute of Contemporary Art (KoRICA)｣ Logo Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢LWY X SUNOA｣ ≪20≫ Album Jacket Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢LWY X SUNOA｣ ≪Loving You≫ Album Jacket Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢Subverted Anatomical Landscape｣ Business Card Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢Subverted Anatomical Landscape｣ ≪β≫ Sogang Univ. Mary Hall, Program Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢Bongkak Choi X Fitness Ideal｣ Program Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢GoiiGoii｣ Logo Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢Sinchon Global University Culture Festival (SWYFT)｣ 2nd Festival Identity Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢Kodo.Jeong｣ Package Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢Ubomanli｣ Logo Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢Ubomanli｣ ≪Hanok Within a Western Theater≫ ARKO Arts Theater, Program Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢Subverted Anatomical Landscape｣ ≪KILL≫ LG Arts Center, Program Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢Annpaak｣ Special Exhibition ≪Scene and Alienation≫ Program Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2024,</span><span>｢THE BOYZ｣ 2nd Full Pt.3 ≪Love Letter≫ Album Jacket & Promotion Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Beigebongbong｣ Identity Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Seong Yoon-seon&apos;s Janggu Dance Network｣ Sungkyun Small Theater Dec Regular Performance ≪Companion≫ Program Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Jeom Store｣ 1st Anniversary Goods Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢TTB X Garb X Bite Poets｣ ≪Extra Ordinary≫ Program Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Ubomanli｣ Business Card Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Gihong Jeon｣ ≪Buckwild≫ Editorial Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Ubomanli｣ ≪Knock≫ National Theater of Korea, Program Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Chelon Archive Co.｣ Identity Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Mumu｣ Identity Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Cidae.Co｣ Editorial Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Miammiam X Wonhyuck Choi｣ Program Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Oboae｣ Showroom Postcard Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Info X Cidae.Co｣ Goods Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Nneed Coffee｣ Identity Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Each Differ｣ 23f/W Artwork Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Wonhyuck Choi｣ ≪Open Studio In Seoul≫ Program Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Each Differ｣ Logo Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Wonhyuck Choi｣ ≪Open Studio In Jeju≫ Program Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Doosan X Vlook｣ Identity & Pop-up Store Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢AAO｣ Monthly 3D Artwork Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Viewfinder｣ Calendar Poster Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2023,</span><span>｢Viewfinder｣ Logo Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2022,</span><span>｢Bfrog｣ Showroom Logo Design</span></div>
                    <div className={styles.infoListItem}><span className={styles.yearLabel}>2022,</span><span>｢Higher Coffee｣ Event Poster Design</span></div>
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
                        Wald Ensemble, Seosomun Shrine History Museum, Mound Media, Mareumo Entertainment, Seungyoon Lee, HOBIN Film, SAA, LG ART CENTER, SKETCHED SPACE, Coffee Collage, Arko Selection, Arko Theater, Sangmyung Univ., MSS, KOSME, Kyung Hee Univ., NA1, Bobu Office, Michan Lee, Sumin Kim, Korica, Lwy, Sunoa, Bongak Choi, Seodaemun-Gu, SWYFT, Lobby/St, Kodo Coffee, Annpaak, Subverted
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
