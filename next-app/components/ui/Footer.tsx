export default function Footer() {
    return (
        <>
            <footer>
                <div className="footer-left">
                    <ul>
                        <li>
                            Contact |
                            <a href="https://www.instagram.com/hyeok.info/" target="_blank" rel="noopener noreferrer">
                                @hyeok.info /
                            </a>
                            <a href="mailto:hyeok.info@gmail.com" target="_blank" rel="noopener noreferrer">
                                hyeok.info@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-right">
                    (c) 2025. Yoonhyeok Kim. all rights reserved.
                </div>
            </footer>

            {/* Mobile Footer (minWidth320) */}
            <footer className="minWidth320">
                <ul>
                    <li>
                        Contact |
                        <a href="mailto:hyeok.info@gmail.com" target="_blank" rel="noopener noreferrer">
                            hyeok.info@gmail.com
                        </a>
                    </li>
                </ul>
                <h1>(c) 2025. Yoonhyeok Kim. all rights reserved.</h1>
            </footer>
        </>
    );
}
