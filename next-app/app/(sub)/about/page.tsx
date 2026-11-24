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

            {/* Column 2: Profile, Education, Contact, Experience, Exhibitions & Workshops, Licence & Awards */}
            <div className={styles.infoColumn}>
                <div>
                    <span className={styles.sectionTitle}>Profile</span>
                    <div>
                        Yoonhyeok Kim<br />
                        From Seoul, Republic of Korea
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
                    <span className={styles.sectionTitle}>Education</span>
                    <div className={styles.entryItem}>
                        2020–2027 (expected) · <Link href="/inu-score" className={styles.textLink}>Incheon National University (INU)</Link>
                        <ul className={styles.entrySubList}>
                            <li>B.F.A. in Visual Design (Double Major, Division of Design)</li>
                            <li>B.A. in Fashion Industry (First Major, Department of Fashion Industry)</li>
                            <li>GPA: 3.61 / 4.5</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Experience</span>
                    <div className={styles.entryGroup}>
                        <div className={styles.entryItem}>
                            Oct 2022 – Present · Freelance Visual Designer
                            <ul className={styles.entrySubList}>
                                <li>Completed over 50 commissioned projects for performance, music, exhibition and brand clients.</li>
                            </ul>
                        </div>
                        <div className={styles.entryItem}>
                            Oct 2022 – Feb 2023 · Some&amp;Company (Glosome Design Team), Visual Design Intern
                            <ul className={styles.entrySubList}>
                                <li>Assisted with promotional graphics and product packaging design.</li>
                            </ul>
                        </div>
                        <div className={styles.entryItem}>
                            Mar 2021 – Jan 2023 · Myo (State-Funded Startup Project), Founder &amp; Creative Lead
                            <ul className={styles.entrySubList}>
                                <li>Selected for a government startup support programme; founded and led a university-based startup team and ran its year-long project.</li>
                                <li>Led branding and the publication of a printed archive book; ran two crowdfunding campaigns (KRW 5.11M, 102% of target; KRW 1.07M, 214% of target) and held two exhibitions.</li>
                            </ul>
                        </div>
                        <div className={styles.entryItem}>
                            Mar 2021 – Dec 2022 · O.F.F. (Nationwide Intercollegiate Fashion Association), 27th Cohort, Design Team
                            <ul className={styles.entrySubList}>
                                <li>Took part in the annual fashion show, planning concepts and designing and making a garment collection.</li>
                                <li>Designed layout systems and graphic content for the association&apos;s magazine.</li>
                            </ul>
                        </div>
                        <div className={styles.entryItem}>
                            Mar 2020 – Aug 2021 · LET.S Magazine, Editorial Designer
                            <ul className={styles.entrySubList}>
                                <li>Designed the layout and typography system for the first print issue, <em>LET.S: Vintage</em>.</li>
                                <li>Produced printed copies for 155 backers; the crowdfunding campaign raised KRW 5.49M (109% of target).</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Exhibitions &amp; Workshops</span>
                    <div className={styles.entryGroup}>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>Jan 2026 ·</span><span><em>Looping In The Box</em>, ARTKOREALAB, Seoul (Group Exhibition)</span></div>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>Nov 2025 ·</span><span><em>INU x ISU Project</em>, exchange exhibition between Illinois State University and Incheon National University (Group Exhibition)</span></div>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>Sep 2025 ·</span><span><em>Dadakdadak Market: Baeksanghoe</em>, Suwon Paldal Cultural Center, Suwon (Organised by Kyung Hee University &amp; Ministry of SMEs and Startups)</span></div>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>Jan 2025 ·</span><span>TouchDesigner Workshop, <em>Connecting Hand to Circle: Kinetic Art via MediaPipe</em>, Seoul</span></div>
                    </div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Licence &amp; Awards</span>
                    <div className={styles.entryGroup}>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>2024 ·</span><span>National Technical Qualification, Craftsman Photography</span></div>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>2022 ·</span><span>Honourable Mention, 11th International Digital Fashion Contest, The Society of Fashion and Textile Industry (SFTI)</span></div>
                    </div>
                </div>
            </div>

            {/* Column 3: Selected Projects */}
            <div className={styles.infoColumn}>
                <div>
                    <span className={styles.sectionTitle}>Selected Projects (Freelance Visual Designer)</span>
                    <div className={styles.entryGroup}>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>2026 ·</span><span>Wald Ensemble x SAL, <em>Apollo</em> (Seosomun Shrine History Museum), Performance Visual Identity (Programme Leaflet, Main Poster, Banner Design)</span></div>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>2026 ·</span><span>Seungyoon Lee, 4th Studio Album <em>0</em> (Mareumo Entertainment), Physical Album Package Design (3 Editions, 2 Booklets, 2 CDs, Merchandise)</span></div>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>2026 ·</span><span><em>Divergent Consequences With Single Image</em> (Non-Commercial Research), Main Poster, Web Design &amp; Development</span></div>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>2026 ·</span><span>SKETCHED SPACE (SKETCHED), Website Design Lead, Initial Front-End Development (<a href="https://sketched.space/" target="_blank" rel="noopener noreferrer" className={styles.textLink}>sketched.space</a>)</span></div>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>2026 ·</span><span>Subverted Anatomical Landscape, <em>X</em> (ARKO Arts Theater), Performance Visual Identity (Programme Book, Main Poster, Extended-Format Poster, Banner Design)</span></div>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>2026 ·</span><span>Coffee Collage, F&amp;B Brand Identity System (Brand Guidelines, Packaging, Menus, Bean Information Cards)</span></div>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>2025 ·</span><span>Sangmyung University 53rd Graduation Exhibition, Visual Identity Design (Catalogue Cover, Poster, Banner Design)</span></div>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>2025 ·</span><span>Korea Research Institute of Contemporary Art (KoRICA), Website Design (<a href="https://korica.org/" target="_blank" rel="noopener noreferrer" className={styles.textLink}>korica.org</a>)</span></div>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>2024 ·</span><span>Subverted Anatomical Landscape, <em>KILL</em> (LG Arts Center), Performance Visual Identity (Programme Book, Main Poster, Banners, Merchandise Design)</span></div>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>2024 ·</span><span>Annpaak Special Exhibition <em>Scene and Alienation</em> (Annpaak), Exhibition Visual Identity (Main Poster, Mobile Leaflet, Digital Promotional Materials)</span></div>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>2024 ·</span><span>THE BOYZ, 2nd Full Album Pt.3 <em>Love Letter</em> (IST Entertainment), Album Artwork &amp; Promotional Design, Photography for Design Assets</span></div>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>2023 ·</span><span>Ubomanli, <em>Knock</em> (National Theater of Korea), Performance Visual Identity (Programme Leaflet, Main Poster Design)</span></div>
                        <div className={styles.infoListItem}><span className={styles.yearLabel}>2023 ·</span><span>Doosan x Vlook Pop-up Store, Spatial Identity &amp; Pop-up Store Graphic Design</span></div>
                    </div>
                </div>
            </div>

            {/* Column 4: Tools, Clients */}
            <div className={styles.infoColumn}>
                <div>
                    <span className={styles.sectionTitle}>Tools</span>
                    <div className={styles.entryGroup}>
                        <div className={styles.entryItem}>Graphic &amp; Editorial · InDesign, Illustrator, Photoshop, Lightroom, Lightroom Classic, XD, DaVinci Resolve</div>
                        <div className={styles.entryItem}>Motion &amp; 3D · After Effects, Cinema 4D</div>
                        <div className={styles.entryItem}>Web &amp; Interactive · TouchDesigner, React, Next.js, HTML/CSS</div>
                    </div>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Clients / Collaboration</span>
                    <div className={styles.infoListItem}>
                        Wald Ensemble, Seosomun Shrine History Museum, Mound Media, Mareumo Entertainment, Seungyoon Lee, HOBIN Film, SAA, LG ART CENTER, SKETCHED SPACE, Coffee Collage, Arko Selection, Arko Theater, Sangmyung Univ., MSS, KOSME, Kyung Hee Univ., NA1, Bobu Office, Minchan Lee, Sumin Kim, KoRICA, LWY, Sunoa, Bongkak Choi, Seodaemun-Gu, SWYFT, Lobby/St, Kodo Coffee, Annpaak, Subverted
                        Anatomical Landscape (SAL), IST Entertainment, THE BOYZ,
                        Glaspress, Beigebongbong, Ubomanli, Janggo Chum Network Of Yunseeon Sung, Jeom Store, Wonhyuck
                        Choi, Bite Poets, Garb, Templethebongbong, Gihong Jeon, Inho Cho, Chelon Archive Co., Cidae Mag,
                        Miammiam Liberal, Oboae, Sanctuary, Nneed Coffee, Each Differ, Doosan Corp., Vlook Inc., Jiyoung
                        Kim, Glosome, The Society of Fashion and Textile Industry, Seoul Fashion Hub, Bfrog Vintage, Higher
                        Coffee, Off Seoul, LET.S Magazine, Sungkyul Univ., Lotteimall •••
                    </div>
                </div>
            </div>
        </div>
    );
}
