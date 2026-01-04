import "../globals.css";
import styles from "./home.module.css";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.container}>
            {/* Home Page has NO Header */}

            {children}

            {/* 
        Legacy Home Footer (Grid Based). 
        Using CSS Module classes explicitly.
      */}
            {/* 
        Legacy Home Footer (Grid Based). 
        Using CSS Module classes explicitly.
      */}
            <footer className={styles.footerWrapper}>
                <div className={styles.footerRight}>(c) 2025. Yoonhyeok Kim. all rights reserved.</div>
                <div className={styles.footerLeft}>
                    <ul>
                        <li>Contact |
                            <a href="https://www.instagram.com/hyeok.info/" target="_blank" rel="noopener noreferrer">@hyeok.info /</a>
                            <a href="mailto:hyeok.info@gmail.com" target="_blank" rel="noopener noreferrer">hyeok.info@gmail.com</a>
                        </li>
                    </ul>
                </div>
            </footer>

            {/* Mobile Footer (minWidth320) */}
            <div className={styles.minWidth320}>
                <footer className={styles.footerWrapper}>
                    <div className={styles.footerAll}>
                        <ul>
                            <li>Contact |
                                <a href="mailto:hyeok.info@gmail.com" target="_blank" rel="noopener noreferrer">hyeok.info@gmail.com</a>
                            </li>
                        </ul>
                        <h1>(c) 2025. Yoonhyeok Kim. all rights reserved.</h1>
                    </div>
                </footer>
            </div>

            <div className={styles.minWidth768}>
                <footer className={styles.footerWrapper}>
                    <div className={styles.footerRight}>(c) 2025. Yoonhyeok Kim. all rights reserved.</div>
                    <div className={styles.footerLeft}>
                        <ul>
                            <li>Contact |
                                <a href="https://www.instagram.com/hyeok.info/" target="_blank" rel="noopener noreferrer">@hyeok.info /</a>
                                <a href="mailto:hyeok.info@gmail.com" target="_blank" rel="noopener noreferrer">hyeok.info@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>

        </div>
    );
}
