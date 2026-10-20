"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isHoveredTop, setIsHoveredTop] = useState(false);
    const pathname = usePathname();

    const isGraduationShow = pathname?.includes("graduation-show");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Safari & Cross-browser hover detection for top-reveal header
    useEffect(() => {
        if (!isGraduationShow) return;

        let hideTimer: NodeJS.Timeout | null = null;

        const handleMouseMove = (e: MouseEvent) => {
            // Trigger reveal when mouse is near the top of the viewport (within top 60px)
            if (e.clientY <= 60) {
                if (hideTimer) {
                    clearTimeout(hideTimer);
                    hideTimer = null;
                }
                setIsHoveredTop(true);
            } else if (e.clientY > 80) {
                if (!hideTimer) {
                    hideTimer = setTimeout(() => {
                        setIsHoveredTop(false);
                        hideTimer = null;
                    }, 150);
                }
            }
        };

        const handleMouseLeave = () => {
            setIsHoveredTop(false);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            if (hideTimer) clearTimeout(hideTimer);
        };
    }, [isGraduationShow]);

    const showWorks = !pathname?.includes("/inu-score");

    return (
        <header
            className={`global-header ${scrolled ? "scrolled" : ""} ${isGraduationShow ? "header-hover-only" : ""} ${isHoveredTop ? "is-visible" : ""}`}
            onMouseEnter={() => {
                if (isGraduationShow) setIsHoveredTop(true);
            }}
            onMouseLeave={() => {
                if (isGraduationShow) setIsHoveredTop(false);
            }}
        >
            <nav className="header-hyeok">
                <ul>
                    <li>
                        <Link href="/">Info</Link>
                    </li>
                </ul>
            </nav>
            {showWorks && (
                <nav className="header-works">
                    <ul>
                        <li>
                            <Link href="/works">Works</Link>
                        </li>
                    </ul>
                </nav>
            )}
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

