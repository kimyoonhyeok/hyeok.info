'use client';

import React, { useState, useRef, useEffect } from 'react';

import DynamicTimelineChart from './DynamicTimelineChart';
import DemographicChart from './DemographicChart';
import WarlordFlowChart from './WarlordFlowChart';
import TerritorialMap from './TerritorialMap';
import BattleBubbleChart from './BattleBubbleChart';

const LINE = '#1a1a1a';
const BG = '#ffffff';

// Poster Typography Strategy
// Main Title size: 20px
// Subtitle / Descriptions size: 9px (exactly 9px with 14.56px line-height for visual neatness)
const POSTER_TITLE_FONT = {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: '20px',
    fontWeight: 500,
    color: LINE,
    letterSpacing: '-0.02em'
};

const POSTER_DESC_FONT = {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: '9px',
    lineHeight: '14.56px',
    fontWeight: 400,
    color: '#444444',
    letterSpacing: '-0.01em'
};

export default function InfographicMainPoster({ onClose }: { onClose?: () => void }) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomScale, setZoomScale] = useState(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Dynamic trackpad pinch-to-zoom capture with non-passive event listener
    useEffect(() => {
        if (!isZoomed) return;
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault(); // Stop default browser zoom and page scroll inside modal

            if (e.ctrlKey) {
                // Pinch zoom gesture
                setZoomScale(prev => {
                    const nextScale = Math.max(1, Math.min(8, prev - e.deltaY * 0.015));
                    return nextScale;
                });
            } else {
                // Trackpad two-finger swipe translates to panning when zoomed in
                if (zoomScale > 1) {
                    setPanOffset(prev => ({
                        x: prev.x - e.deltaX * 0.75,
                        y: prev.y - e.deltaY * 0.75
                    }));
                }
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, [isZoomed, zoomScale]);

    // Reset offset when scale goes back to 1x
    useEffect(() => {
        if (zoomScale === 1) {
            setPanOffset({ x: 0, y: 0 });
        }
    }, [zoomScale]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoomScale <= 1) return;
        setIsDragging(true);
        setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setPanOffset({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleDoubleClick = () => {
        if (zoomScale > 1) {
            setZoomScale(1);
            setPanOffset({ x: 0, y: 0 });
        } else {
            setZoomScale(2.5);
        }
    };

    return (
        <div style={{
            width: '100%',
            height: 'calc(100vh - 120px)',
            minHeight: 'calc(100vh - 120px)',
            backgroundColor: BG,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4vh 4vw',
            boxSizing: 'border-box',
            fontFamily: '"IBM Plex Sans", sans-serif',
            position: 'relative'
        }}>
            {/* Google Fonts & Custom CSS Import */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
                
                @media print {
                    .poster-card { box-shadow: none !important; }
                    .back-btn { display: none !important; }
                }
                
                .chart-container {
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                    background: transparent;
                }

                .chart-container > div {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                }
                `
            }} />

            {/* Back Button */}
            {onClose && (
                <button
                    className="back-btn"
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '2rem',
                        left: '50px',
                        zIndex: 50,
                        background: 'transparent',
                        border: 'none',
                        padding: '0',
                        fontSize: '18px',
                        cursor: 'pointer',
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#111'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                >
                    &larr; Back
                </button>
            )}

            {/* ═══ POSTER CANVAS ═══ */}
            <div 
                className="poster-card" 
                onClick={() => setIsZoomed(true)}
                style={{
                    width: 'calc(min(100vw - 8vw, (100vh - 120px - 8vh) * 1.4146))',
                    height: 'calc(min(100vw - 8vw, (100vh - 120px - 8vh) * 1.4146) * (1189 / 1682))',
                    backgroundColor: BG,
                    boxShadow: '0 8px 48px 0 rgba(0,0,0,0.13), 0 2px 8px 0 rgba(0,0,0,0.07)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    color: LINE,
                    cursor: 'zoom-in',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.01)';
                    e.currentTarget.style.boxShadow = '0 12px 60px 0 rgba(0,0,0,0.18), 0 4px 16px 0 rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 8px 48px 0 rgba(0,0,0,0.13), 0 2px 8px 0 rgba(0,0,0,0.07)';
                }}
            >
                {/* --- TITLE --- */}
                <div style={{
                    width: '100%',
                    padding: '32px 32px 0 32px',
                    boxSizing: 'border-box',
                    zIndex: 10
                }}>
                    <span style={POSTER_TITLE_FONT}>
                        Final Project Theme : Three Kingdoms Period (184-280 AD)
                    </span>
                </div>

                {/* --- TOP HALF (Romance) --- */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '32px 32px 16px',
                    position: 'relative',
                }}>
                    <div style={{ ...POSTER_DESC_FONT, marginBottom: '8px' }}>
                        Romance — Luo Guanzhong (c. 1330–1400), <i>Sanguo Yanyi</i> (三國演義), 14th c.
                    </div>

                    <div style={{ flex: 1, display: 'flex', gap: '24px' }}>
                        <div className="chart-container">
                            <DynamicTimelineChart isPoster={true} fixedMode="fiction" />
                        </div>
                        <div className="chart-container">
                            <BattleBubbleChart isPoster={true} fixedMode="fiction" />
                        </div>
                        <div className="chart-container">
                            <WarlordFlowChart isPoster={true} />
                        </div>
                        <div className="chart-container" style={{ flex: 1.5 }}>
                            <TerritorialMap isPoster={true} />
                        </div>
                        <div className="chart-container">
                            <DemographicChart isPoster={true} />
                        </div>
                    </div>
                </div>

                {/* --- CENTRAL DIVIDER HAIRLINE --- */}
                <div style={{ width: '100%', height: '1px', backgroundColor: LINE, opacity: 0.2 }} />

                {/* --- BOTTOM HALF (Historic) --- */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '32px 32px 20px',
                    position: 'relative',
                }}>
                    <div style={{ ...POSTER_DESC_FONT, marginBottom: '8px' }}>
                        Historic — Chen Shou (233–297), <i>Sanguozhi</i> (三國志), 289 AD.
                    </div>

                    <div style={{ flex: 1, display: 'flex', gap: '24px' }}>
                        <div className="chart-container">
                            <DynamicTimelineChart isPoster={true} fixedMode="historical" />
                        </div>
                        <div className="chart-container">
                            <BattleBubbleChart isPoster={true} fixedMode="historical" />
                        </div>
                        <div className="chart-container">
                            <WarlordFlowChart isPoster={true} />
                        </div>
                        <div className="chart-container" style={{ flex: 1.5 }}>
                            <TerritorialMap isPoster={true} />
                        </div>
                        <div className="chart-container">
                            <DemographicChart isPoster={true} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ ZOOMED FULLSCREEN OVERLAY ═══ */}
            {isZoomed && (
                <div 
                    ref={containerRef}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(30px)',
                        padding: '24px',
                        overflow: 'hidden',
                        userSelect: 'none'
                    }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsZoomed(false);
                        }
                    }}
                >
                    {/* Elegant Close Button */}
                    <button
                        onClick={() => setIsZoomed(false)}
                        style={{
                            position: 'fixed',
                            top: '24px',
                            right: '24px',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.2s',
                            zIndex: 1010
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        ✕
                    </button>

                    {/* Floating Controls Information Overlay */}
                    <div 
                        style={{
                            position: 'fixed',
                            bottom: '24px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '30px',
                            padding: '10px 20px',
                            color: '#ffffff',
                            fontFamily: '"IBM Plex Sans", sans-serif',
                            fontSize: '11px',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                            zIndex: 1010,
                            pointerEvents: 'none'
                        }}
                    >
                        <span>Pinch trackpad to Zoom ({Math.round(zoomScale * 100)}%)</span>
                        <span style={{ opacity: 0.4 }}>|</span>
                        <span>Drag to Pan</span>
                        <span style={{ opacity: 0.4 }}>|</span>
                        <span>Double-click to Reset</span>
                    </div>

                    {/* Zoomed Poster Content */}
                    <div 
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onDoubleClick={handleDoubleClick}
                        style={{
                            width: '92vw',
                            maxWidth: '1800px',
                            height: 'calc(min(92vw, 1800px) * (1189 / 1682))',
                            backgroundColor: BG,
                            boxShadow: '0 24px 70px rgba(0,0,0,0.45)',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            overflow: 'hidden',
                            color: LINE,
                            borderRadius: '4px',
                            cursor: zoomScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-out',
                            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
                            transformOrigin: 'center center',
                            transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent close on clicking poster content
                    >
                        {/* --- ZOOMED TITLE --- */}
                        <div style={{
                            width: '100%',
                            padding: '36px 36px 0 36px',
                            boxSizing: 'border-box',
                            zIndex: 10
                        }}>
                            <span style={POSTER_TITLE_FONT}>
                                Final Project Theme : Three Kingdoms Period (184-280 AD)
                            </span>
                        </div>

                        {/* --- ZOOMED TOP HALF (Romance) --- */}
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '36px 36px 16px',
                            position: 'relative',
                        }}>
                            <div style={{ ...POSTER_DESC_FONT, marginBottom: '8px' }}>
                                Romance — Luo Guanzhong (c. 1330–1400), <i>Sanguo Yanyi</i> (三國演義), 14th c.
                            </div>

                            <div style={{ flex: 1, display: 'flex', gap: '28px' }}>
                                <div className="chart-container">
                                    <DynamicTimelineChart isPoster={true} fixedMode="fiction" />
                                </div>
                                <div className="chart-container">
                                    <BattleBubbleChart isPoster={true} fixedMode="fiction" />
                                </div>
                                <div className="chart-container">
                                    <WarlordFlowChart isPoster={true} />
                                </div>
                                <div className="chart-container" style={{ flex: 1.5 }}>
                                    <TerritorialMap isPoster={true} />
                                </div>
                                <div className="chart-container">
                                    <DemographicChart isPoster={true} />
                                </div>
                            </div>
                        </div>

                        {/* --- ZOOMED CENTRAL DIVIDER HAIRLINE --- */}
                        <div style={{ width: '100%', height: '1px', backgroundColor: LINE, opacity: 0.2 }} />

                        {/* --- ZOOMED BOTTOM HALF (Historic) --- */}
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '36px 36px 20px',
                            position: 'relative',
                        }}>
                            <div style={{ ...POSTER_DESC_FONT, marginBottom: '8px' }}>
                                Historic — Chen Shou (233–297), <i>Sanguozhi</i> (三國志), 289 AD.
                            </div>

                            <div style={{ flex: 1, display: 'flex', gap: '28px' }}>
                                <div className="chart-container">
                                    <DynamicTimelineChart isPoster={true} fixedMode="historical" />
                                </div>
                                <div className="chart-container">
                                    <BattleBubbleChart isPoster={true} fixedMode="historical" />
                                </div>
                                <div className="chart-container">
                                    <WarlordFlowChart isPoster={true} />
                                </div>
                                <div className="chart-container" style={{ flex: 1.5 }}>
                                    <TerritorialMap isPoster={true} />
                                </div>
                                <div className="chart-container">
                                    <DemographicChart isPoster={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
