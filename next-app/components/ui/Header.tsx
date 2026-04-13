"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`global-header ${scrolled ? "scrolled" : ""}`}>
            <nav className="header-hyeok">
                <ul>
                    <li>
                        <Link href="/">Info</Link>
                    </li>
                </ul>
            </nav>
            <nav className="header-works">
                <ul>
                    <li>
                        <Link href="/works">Works</Link>
                    </li>
                </ul>
            </nav>
            <nav className="header-about">
                <ul>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                </ul>
            </nav>
            <nav className="header-cv">
                <ul>
                    <li>
                        <Link href="/brief">↗ Brief</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
