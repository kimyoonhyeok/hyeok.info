"use client";

import { useState, useEffect } from 'react';
import styles from './portfolio.module.css';

export default function PortfolioIndex() {
    const [leftGradient, setLeftGradient] = useState('');
    const [rightGradient, setRightGradient] = useState('');

    // State for viewing PDF
    const [viewingPdf, setViewingPdf] = useState<string | null>(null);

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

    // URLs (Relative paths in public folder)
    const portfolioUrl = "/Yoonhyeok%20Portfolio(~25.11).pdf";
    const resumeUrl = "/Yoonhyeok%20Resume(~25.11).pdf";

    const handleViewPdf = (url: string) => {
        // Append #toolbar=0 to discourage download
        setViewingPdf(`${url}#toolbar=0&navpanes=0`);
    };

    const closePdf = () => {
        setViewingPdf(null);
    };

    return (
        <div className={styles.container}>
            {/* Animation Overlay */}
            <div className={styles.animationOverlay}>
                <div className={styles.clickHint}>
                    <div className={styles.clickText}>CLICK THE CIRCLE</div>
                </div>
            </div>

            {/* Left: Portfolio (Click opens viewer) */}
            <div
                onClick={() => handleViewPdf(portfolioUrl)}
                className={styles.circleLink}
                style={{ background: leftGradient, cursor: 'pointer' }}
            >
                <div className={styles.circleContent}>
                    Portfolio<br />~25.11
                </div>
            </div>

            {/* Right: Resume (Click opens viewer) */}
            <div
                onClick={() => handleViewPdf(resumeUrl)}
                className={styles.circleLink}
                style={{ background: rightGradient, cursor: 'pointer' }}
            >
                <div className={styles.circleContent}>
                    Resume<br />~25.11
                </div>
            </div>

            {/* PDF Viewer Overlay */}
            {viewingPdf && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        zIndex: 100,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onClick={closePdf} // Close on backdrop click
                >
                    <div
                        style={{
                            width: '90%',
                            height: '90%',
                            position: 'relative',
                            backgroundColor: '#fff'
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
                        onContextMenu={(e) => e.preventDefault()} // Block right click
                    >
                        <iframe
                            src={viewingPdf}
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            title="PDF Viewer"
                        />
                        <button
                            onClick={closePdf}
                            style={{
                                position: 'absolute',
                                top: '-40px',
                                right: '0',
                                color: 'white',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer'
                            }}
                        >
                            Close ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
