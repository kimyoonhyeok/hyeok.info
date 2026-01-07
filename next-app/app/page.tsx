import Link from "next/link";
import Image from "next/image";
import styles from "./home.module.css";

export default function HomePage() {

    return (
        <div className={styles.container}>
            {/* 
         Structure mimics main/index.html responsive divs.
         But we use CSS Modules to toggle visibility or grid placement.
         The legacy CSS used .mobile-only classes (minWidth320).
         We will use a single implementation and use CSS Modules media queries 
         to resize/reposition the image.
      */}
            <div className={styles.enterance}>
                <Link href="/works">
                    {/* Legacy had id="enterance01" on img */}
                    {/* Using unoptimized to prevent Next.js adding span wrappers that break grid centering if not careful */}
                    <Image
                        id="enterance01"
                        src="/enternace.01.jpg"
                        alt="no image"
                        width={800}
                        height={600}
                        priority
                        unoptimized // For strict CSS compliance with legacy
                    />
                </Link>
            </div>

            {/* Footer Styles (Ported from legacy style.css) */}
            <div className={styles.footerWrapper}>
                <div className={styles.footerLeft}>
                    <ul>
                        <li>
                            Contact |&nbsp;
                            <a href="https://www.instagram.com/hyeok.info/" target="_blank" rel="noopener noreferrer">
                                @hyeok.info /&nbsp;
                            </a>
                            <a href="mailto:hyeok.info@gmail.com" target="_blank" rel="noopener noreferrer">
                                hyeok.info@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={styles.footerRight}>
                    (c) 2026. Yoonhyeok Kim. all rights reserved.
                </div>
            </div>

            {/* Mobile Footer (minWidth320) */}
            <div className={styles.minWidth320}>
                <div className={styles.footerAll}>
                    <ul>
                        <li>
                            Contact |&nbsp;
                            <a href="mailto:hyeok.info@gmail.com" target="_blank" rel="noopener noreferrer">
                                hyeok.info@gmail.com
                            </a>
                        </li>
                    </ul>
                    <h1>(c) 2026. Yoonhyeok Kim. all rights reserved.</h1>
                </div>
            </div>
        </div>
    );
}
