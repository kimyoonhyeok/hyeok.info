"use client";

import { useState, useEffect } from 'react';
import styles from './portfolio.module.css';

export default function PortfolioIndex() {
    const [leftGradient, setLeftGradient] = useState('');
    const [rightGradient, setRightGradient] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const timeBase = now / 50;

            const generateColors = (isLeft: boolean) => {
                const colors = [];
                const offset = isLeft ? 0 : 1;
                for (let i = 0; i < 7; i++) {
                    const slotIndex = (i * 2) + offset;
                    const phaseShift = isLeft ? 0 : 180;
                    const hue = (timeBase + (slotIndex * 25.7) + phaseShift) % 360;
                    colors.push(`hsl(${hue}, 70%, 50%)`);
                }
                return colors;
            };

            const makeGradient = (colors: string[]) => {
                const step = 100 / 7;
                const solidRatio = 0.7;
                let stops = '';
                colors.forEach((c, i) => {
                    const start = i * step;
                    const solidEnd = start + (step * solidRatio);
                    if (i === 0) stops += `${c} 0%, ${c} ${solidEnd.toFixed(2)}%`;
                    else stops += `, ${c} ${start.toFixed(2)}%, ${c} ${solidEnd.toFixed(2)}%`;
                });
                stops += `, transparent 100%`;
                return `radial-gradient(circle closest-side, ${stops})`;
            };

            setLeftGradient(makeGradient(generateColors(true)));
            setRightGradient(makeGradient(generateColors(false)));

        }, 50);
        return () => clearInterval(interval);
    }, []);

    // URLs (Relative paths in public folder) asking browser to hide toolbar
    const portfolioUrl = "/Yoonhyeok%20Portfolio(~25.11).pdf#toolbar=0&navpanes=0&scrollbar=0";
    const resumeUrl = "/Yoonhyeok%20Resume(~25.11).pdf#toolbar=0&navpanes=0&scrollbar=0";

    const preventRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
    };

    return (
        <div className={styles.container}>
            {/* Animation Overlay */}
            <div className={styles.animationOverlay}>
                <div className={styles.clickHint}>
                    <div className={styles.clickText}>CLICK THE CIRCLE</div>
                </div>
            </div>

            {/* Left: Portfolio */}
            <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.circleLink}
                style={{ background: leftGradient }}
                onContextMenu={preventRightClick}
            >
                <div className={styles.circleContent}>
                    Portfolio<br />~25.11
                </div>
            </a>

            {/* Right: Resume */}
            <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.circleLink}
                style={{ background: rightGradient }}
                onContextMenu={preventRightClick}
            >
                <div className={styles.circleContent}>
                    Resume<br />~25.11
                </div>
            </a>
        </div>
    );
}
