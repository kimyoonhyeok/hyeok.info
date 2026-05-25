'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Colors based on infographic_data.md
const COLORS = {
    wei: '#1a237e',
    shu: '#1b5e20',
    wu: '#b71c1c',
    base: '#e0e0e0',
    text: '#333'
};

// Key Events
const EVENTS = [
    { year: 184, name: 'Yellow Turban Rebellion', desc: 'Outbreak of Chaos', faction: 'base', yOffset: 0 },
    { year: 200, name: 'Battle of Guandu', desc: 'Cao Cao unifies the North (110k vs 40k)', faction: 'wei', yOffset: -30 },
    { year: 208, name: 'Battle of Red Cliffs', desc: 'Allied victory, tripartite division (200k vs 50k)', faction: 'wu', yOffset: 40 },
    { year: 222, name: 'Battle of Yiling', desc: 'Lu Xun victory, Shu decline (100k vs 50k)', faction: 'shu', yOffset: -50 },
    { year: 234, name: 'Wuzhangyuan', desc: 'Death of Zhuge Liang', faction: 'shu', yOffset: 60 },
    { year: 263, name: 'Fall of Shu', desc: 'Wei conquers Shu', faction: 'wei', yOffset: -40 },
    { year: 280, name: 'Fall of Wu', desc: 'Jin unification, end of era', faction: 'base', yOffset: 0 }
];

export default function DynamicTimelineChart({ isPoster = false, fixedMode }: { isPoster?: boolean; fixedMode?: 'historical' | 'fiction' }) {
    const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
    const [viewMode, setViewMode] = useState<'historical' | 'fiction'>(fixedMode || 'historical');

    // When fixedMode is set, lock the viewMode
    const effectiveMode = fixedMode || viewMode;

    const width = 1000;
    const height = 400;
    const padX = 50;
    const padY = 50;

    // Time Mapping: 180 ~ 285 AD
    const mapX = (year: number) => padX + ((year - 180) / 105) * (width - padX * 2);

    // Path Data Definitions
    const PATHS = {
        historical: {
            wei: [
                { x: 190, y: 200 }, { x: 210, y: 100 }, { x: 250, y: 80 }, { x: 265, y: 100 }, { x: 280, y: 180 }
            ],
            shu: [
                { x: 208, y: 250 }, { x: 215, y: 280 }, { x: 234, y: 300 }, { x: 263, y: 250 }
            ],
            wu: [
                { x: 200, y: 300 }, { x: 220, y: 350 }, { x: 260, y: 350 }, { x: 280, y: 220 }
            ]
        },
        fiction: {
            wei: [
                { x: 190, y: 200 }, { x: 210, y: 180 }, { x: 250, y: 200 }, { x: 265, y: 220 }, { x: 280, y: 250 }
            ],
            shu: [
                { x: 208, y: 200 }, { x: 215, y: 120 }, { x: 234, y: 100 }, { x: 263, y: 150 }
            ],
            wu: [
                { x: 200, y: 280 }, { x: 220, y: 230 }, { x: 260, y: 210 }, { x: 280, y: 210 }
            ]
        }
    };

    const pathBase = `M ${mapX(180)} 200 Q ${mapX(195)} 200, ${mapX(205)} 250`;

    // Tapered Path Generator
    const renderTaperedPath = (faction: 'wei' | 'shu' | 'wu', baseWidth: number) => {
        const data = effectiveMode === 'historical' ? PATHS.historical[faction] : PATHS.fiction[faction];
        const segments = 15;
        const result = [];
        
        for (let i = 0; i < segments; i++) {
            const t1 = i / segments;
            const t2 = (i + 1) / segments;
            
            // Cubic Bezier interpolation (simplified for segments)
            // Since we have multiple points, we'll just lerp between points for segments
            const pIndex1 = Math.floor(t1 * (data.length - 1));
            const pIndex2 = Math.min(pIndex1 + 1, data.length - 1);
            const subT1 = (t1 * (data.length - 1)) % 1;
            
            const pIndex3 = Math.floor(t2 * (data.length - 1));
            const pIndex4 = Math.min(pIndex3 + 1, data.length - 1);
            const subT2 = (t2 * (data.length - 1)) % 1;

            const x1 = mapX(data[pIndex1].x + (data[pIndex2].x - data[pIndex1].x) * subT1);
            const y1 = data[pIndex1].y + (data[pIndex2].y - data[pIndex1].y) * subT1;
            const x2 = mapX(data[pIndex3].x + (data[pIndex4].x - data[pIndex3].x) * subT2);
            const y2 = data[pIndex3].y + (data[pIndex4].y - data[pIndex3].y) * subT2;

            const year = data[pIndex1].x + (data[pIndex2].x - data[pIndex1].x) * subT1;
            const widthScale = 0.2 + 0.8 * ((year - 180) / 100);
            const width = baseWidth * widthScale;

            result.push(
                <motion.line
                    key={`${faction}-${i}`}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={COLORS[faction]}
                    strokeWidth={width}
                    strokeLinecap="round"
                    opacity={0.8}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, x1, y1, x2, y2 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                />
            );
        }
        return result;
    };

    const getEventColor = (faction: string) => {
        if (faction === 'wei') return COLORS.wei;
        if (faction === 'shu') return COLORS.shu;
        if (faction === 'wu') return COLORS.wu;
        return '#7f8c8d';
    };

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isPoster ? '0px' : '4vh 4vw',
            backgroundColor: 'transparent',
            boxSizing: 'border-box'
        }}>
            
            {/* Header & Controls */}
            <div style={isPoster ? {
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '4px 8px 12px 8px',
                boxSizing: 'border-box',
                zIndex: 10
            } : {
                position: 'absolute', bottom: '4vh', left: '4vw', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', zIndex: 10
            }}>
                {/* Mode Toggle — hidden when fixedMode is set (poster split view) */}
                {!fixedMode && (
                <div style={{ display: 'flex', gap: '1rem', padding: isPoster ? '0' : '0.3rem 0' }}>
                    <button
                        onClick={() => setViewMode('historical')}
                        style={{
                            padding: '0 0 0.2rem 0', border: 'none', background: 'transparent',
                            borderBottom: effectiveMode === 'historical' ? '2px solid #111' : '2px solid transparent',
                            fontFamily: '"Pretendard Variable", "Pretendard", sans-serif', fontSize: isPoster ? '9px' : '0.9rem', lineHeight: isPoster ? '14.56px' : 'normal', fontWeight: 500,
                            color: effectiveMode === 'historical' ? '#111' : '#888', cursor: 'pointer', transition: 'all 0.3s'
                        }}
                    >
                        Historical Records
                    </button>
                    <button
                        onClick={() => setViewMode('fiction')}
                        style={{
                            padding: '0 0 0.2rem 0', border: 'none', background: 'transparent',
                            borderBottom: effectiveMode === 'fiction' ? '2px solid #E74C3C' : '2px solid transparent',
                            fontFamily: '"Pretendard Variable", "Pretendard", sans-serif', fontSize: isPoster ? '9px' : '0.9rem', lineHeight: isPoster ? '14.56px' : 'normal', fontWeight: 500,
                            color: effectiveMode === 'fiction' ? '#E74C3C' : '#888', cursor: 'pointer', transition: 'all 0.3s'
                        }}
                    >
                        Romance Exaggeration
                    </button>
                </div>
                )}
                {fixedMode && isPoster && (
                    <span style={{
                        fontFamily: '"Pretendard Variable", "Pretendard", sans-serif',
                        fontSize: '9px',
                        lineHeight: '14.56px',
                        fontWeight: 500,
                        color: fixedMode === 'fiction' ? '#E74C3C' : '#111',
                        borderBottom: `2px solid ${fixedMode === 'fiction' ? '#E74C3C' : '#111'}`,
                        paddingBottom: '0.2rem'
                    }}>
                        {fixedMode === 'fiction' ? 'Romance Exaggeration' : 'Historical Records'}
                    </span>
                )}

                <div style={{ textAlign: 'left' }}>
                    <h3 style={{ fontFamily: '"Pretendard Variable", "Pretendard", sans-serif', fontSize: isPoster ? '10px' : '1.2rem', margin: 0, fontWeight: 400, color: '#3e3129' }}>
                        Demographic Dynamics & Key Battles (180 AD – 280 AD)
                    </h3>
                    {!isPoster && (
                        <p style={{ fontFamily: '"Pretendard Variable", "Pretendard", sans-serif', fontSize: '0.85rem', color: '#6a5a4a', margin: '0.5rem 0 0 0', fontWeight: 400 }}>
                            * Based on Historical Census (Y-Axis) and Chronology (X-Axis)
                        </p>
                    )}
                </div>
            </div>

            <div style={{
                width: '100%',
                maxWidth: '1200px',
                height: isPoster ? 'auto' : '500px',
                flex: isPoster ? 1 : undefined,
                minHeight: 0,
                position: 'relative',
                overflow: 'visible',
                background: 'transparent',
                zIndex: 1
            }}>
                <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
                    
                    {/* Grid Lines */}
                    {[180, 200, 220, 240, 260, 280].map(year => (
                        <g key={year}>
                            <line x1={mapX(year)} y1={padY} x2={mapX(year)} y2={height - padY} stroke="#f0f0f0" strokeDasharray="4 4" strokeWidth="1" />
                            <text x={mapX(year)} y={height - 20} textAnchor="middle" fill="#aaa" fontSize={isPoster ? 9 : 12} fontFamily='"Helvetica Neue", sans-serif' letterSpacing="0.05em">
                                {year}
                            </text>
                        </g>
                    ))}

                    {/* Flow Paths */}
                    <motion.path d={pathBase} fill="none" stroke={COLORS.base} strokeWidth="12" strokeLinecap="round" 
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                    
                    {renderTaperedPath('wei', effectiveMode === 'historical' ? 24 : 18)}
                    {renderTaperedPath('shu', effectiveMode === 'historical' ? 8 : 42)}
                    {renderTaperedPath('wu', effectiveMode === 'historical' ? 14 : 26)}

                    {/* Event Nodes */}
                    {EVENTS.map((ev, i) => {
                        const cx = mapX(ev.year);
                        const cy = 200 + ev.yOffset;
                        const isHovered = hoveredEvent === i;
                        const isFictionExaggerated = effectiveMode === 'fiction' && (ev.year === 200 || ev.year === 208 || ev.year === 222);

                        return (
                            <g key={i} 
                               onMouseEnter={() => setHoveredEvent(i)} 
                               onMouseLeave={() => setHoveredEvent(null)}
                               style={{ cursor: 'pointer' }}
                            >
                                {/* Connecting line to X-axis */}
                                <line x1={cx} y1={cy} x2={cx} y2={height - padY} stroke={getEventColor(ev.faction)} strokeWidth="1" strokeDasharray="2 2" opacity={isHovered ? 0.6 : 0.2} />
                                
                                {/* Node Pulse (Fiction Mode) */}
                                {isFictionExaggerated && (
                                    <motion.circle cx={cx} cy={cy} r="20" fill="none" stroke={getEventColor(ev.faction)} strokeWidth="3"
                                        animate={{ scale: [1, 2.5], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 1 }}
                                    />
                                )}

                                {/* Main Node */}
                                <motion.circle cx={cx} cy={cy} r={isHovered ? 8 : 5} fill={getEventColor(ev.faction)} stroke="#fff" strokeWidth="2" 
                                    whileHover={{ scale: 1.2 }}
                                />

                                {/* Event Label */}
                                <text x={cx} y={cy - 15} textAnchor="middle" fill={isHovered ? '#111' : '#555'} fontSize={isPoster ? 9 : (isHovered ? 14 : 12)} fontWeight={isHovered ? 400 : 400} fontFamily='"Pretendard Variable", "Pretendard", sans-serif'
                                    style={{ transition: 'all 0.2s ease' }}
                                >
                                    {ev.name}
                                </text>

                                {/* Tooltip Background (SVG) */}
                                {isHovered && (
                                    <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                        <rect x={cx - 125} y={cy + 15} width="250" height="40" rx="6" fill="#fff" stroke="#eee" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
                                        <text x={cx} y={cy + 30} textAnchor="middle" fill="#666" fontSize={isPoster ? 9 : 11} fontFamily='"Pretendard Variable", "Pretendard", sans-serif' fontWeight="400">
                                            {effectiveMode === 'fiction' && isFictionExaggerated ? 'Exaggerated Force: 5-7x Inflation' : ev.desc}
                                        </text>
                                        <text x={cx} y={cy + 45} textAnchor="middle" fill="#999" fontSize={isPoster ? 9 : 9} fontFamily='"Pretendard Variable", "Pretendard", sans-serif' fontWeight="400">
                                            {ev.year} AD
                                        </text>
                                    </motion.g>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
