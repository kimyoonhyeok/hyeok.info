'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Colors based on infographic_data.md
const COLORS = {
    wei: '#1a237e',
    shu: '#b71c1c',
    wu: '#1b5e20',
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

export default function DynamicTimelineChart() {
    const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
    const [viewMode, setViewMode] = useState<'historical' | 'fiction'>('historical');

    const width = 1000;
    const height = 400;
    const padX = 50;
    const padY = 50;

    // Time Mapping: 180 ~ 285 AD
    const mapX = (year: number) => padX + ((year - 180) / 105) * (width - padX * 2);

    // Flow Paths (representing population/power decay)
    // 157 AD: 10.6M -> 280 AD: 2.45M (Overall drastic decline)
    // We'll use bezier curves to visualize the splitting and shrinking
    
    // Wei (Navy): Starts to grow after 200, peaks around 260, absorbs Shu
    const pathWei = `M ${mapX(190)} 200 C ${mapX(210)} 100, ${mapX(250)} 80, ${mapX(265)} 100 S ${mapX(280)} 180, ${mapX(280)} 180`;
    
    // Shu (Red): Forms after 208, small, declines after 222, ends 263
    const pathShu = `M ${mapX(208)} 250 C ${mapX(215)} 280, ${mapX(234)} 300, ${mapX(263)} 250`;
    
    // Wu (Green): Forms after 200, steady, ends 280
    const pathWu = `M ${mapX(200)} 300 C ${mapX(220)} 350, ${mapX(260)} 350, ${mapX(280)} 220`;

    // Main chaotic trunk (180 to 210)
    const pathBase = `M ${mapX(180)} 200 Q ${mapX(195)} 200, ${mapX(205)} 250`;

    const getEventColor = (faction: string) => {
        if (faction === 'wei') return COLORS.wei;
        if (faction === 'shu') return COLORS.shu;
        if (faction === 'wu') return COLORS.wu;
        return '#7f8c8d';
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4vh 4vw', backgroundColor: 'transparent' }}>
            
            {/* Header & Controls positioned at bottom left */}
            <div style={{ position: 'absolute', bottom: '4vh', left: '4vw', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', zIndex: 10 }}>
                {/* Mode Toggle */}
                <div style={{ display: 'flex', gap: '1rem', padding: '0.3rem 0' }}>
                    <button
                        onClick={() => setViewMode('historical')}
                        style={{
                            padding: '0 0 0.2rem 0', border: 'none', background: 'transparent',
                            borderBottom: viewMode === 'historical' ? '2px solid #111' : '2px solid transparent',
                            fontFamily: '"Pretendard Variable", "Pretendard", sans-serif', fontSize: '0.9rem', fontWeight: 500,
                            color: viewMode === 'historical' ? '#111' : '#888', cursor: 'pointer', transition: 'all 0.3s'
                        }}
                    >
                        Historical Records
                    </button>
                    <button
                        onClick={() => setViewMode('fiction')}
                        style={{
                            padding: '0 0 0.2rem 0', border: 'none', background: 'transparent',
                            borderBottom: viewMode === 'fiction' ? '2px solid #E74C3C' : '2px solid transparent',
                            fontFamily: '"Pretendard Variable", "Pretendard", sans-serif', fontSize: '0.9rem', fontWeight: 500,
                            color: viewMode === 'fiction' ? '#E74C3C' : '#888', cursor: 'pointer', transition: 'all 0.3s'
                        }}
                    >
                        Romance Exaggeration
                    </button>
                </div>

                <div style={{ textAlign: 'left' }}>
                    <h3 style={{ fontFamily: '"Pretendard Variable", "Pretendard", sans-serif', fontSize: '1.2rem', margin: 0, fontWeight: 400, color: '#3e3129' }}>
                        Demographic Dynamics & Key Battles (180 AD – 280 AD)
                    </h3>
                    <p style={{ fontFamily: '"Pretendard Variable", "Pretendard", sans-serif', fontSize: '0.85rem', color: '#6a5a4a', margin: '0.5rem 0 0 0', fontWeight: 400 }}>
                        * Based on Historical Census (Y-Axis) and Chronology (X-Axis)
                    </p>
                </div>
            </div>

            <div style={{ width: '100%', maxWidth: '1200px', height: '500px', position: 'relative', overflow: 'visible', background: 'transparent', zIndex: 1 }}>
                <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
                    
                    {/* Grid Lines */}
                    {[180, 200, 220, 240, 260, 280].map(year => (
                        <g key={year}>
                            <line x1={mapX(year)} y1={padY} x2={mapX(year)} y2={height - padY} stroke="#f0f0f0" strokeDasharray="4 4" strokeWidth="1" />
                            <text x={mapX(year)} y={height - 20} textAnchor="middle" fill="#aaa" fontSize="12" fontFamily='"Helvetica Neue", sans-serif' letterSpacing="0.05em">
                                {year}
                            </text>
                        </g>
                    ))}

                    {/* Flow Paths */}
                    <motion.path d={pathBase} fill="none" stroke={COLORS.base} strokeWidth="12" strokeLinecap="round" 
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                    
                    <motion.path d={pathWei} fill="none" stroke={COLORS.wei} strokeWidth={viewMode === 'historical' ? 24 : 18} strokeLinecap="round" opacity={0.8}
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }} />
                    
                    <motion.path d={pathShu} fill="none" stroke={COLORS.shu} strokeWidth={viewMode === 'historical' ? 8 : 28} strokeLinecap="round" opacity={0.8}
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }} />
                    
                    <motion.path d={pathWu} fill="none" stroke={COLORS.wu} strokeWidth={viewMode === 'historical' ? 14 : 20} strokeLinecap="round" opacity={0.8}
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: 0.8, ease: "easeInOut" }} />

                    {/* Event Nodes */}
                    {EVENTS.map((ev, i) => {
                        const cx = mapX(ev.year);
                        const cy = 200 + ev.yOffset;
                        const isHovered = hoveredEvent === i;
                        const isFictionExaggerated = viewMode === 'fiction' && (ev.year === 200 || ev.year === 208 || ev.year === 222);

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
                                    <motion.circle cx={cx} cy={cy} r="16" fill="none" stroke="#f57f17" strokeWidth="2"
                                        animate={{ scale: [1, 1.8], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
                                    />
                                )}

                                {/* Main Node */}
                                <motion.circle cx={cx} cy={cy} r={isHovered ? 8 : 5} fill={getEventColor(ev.faction)} stroke="#fff" strokeWidth="2" 
                                    whileHover={{ scale: 1.2 }}
                                />

                                {/* Event Label */}
                                <text x={cx} y={cy - 15} textAnchor="middle" fill={isHovered ? '#111' : '#555'} fontSize={isHovered ? 14 : 12} fontWeight={isHovered ? 400 : 400} fontFamily='"Pretendard Variable", "Pretendard", sans-serif'
                                    style={{ transition: 'all 0.2s ease' }}
                                >
                                    {ev.name}
                                </text>

                                {/* Tooltip Background (SVG) */}
                                {isHovered && (
                                    <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                        <rect x={cx - 125} y={cy + 15} width="250" height="40" rx="6" fill="#fff" stroke="#eee" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
                                        <text x={cx} y={cy + 30} textAnchor="middle" fill="#666" fontSize="11" fontFamily='"Pretendard Variable", "Pretendard", sans-serif' fontWeight="400">
                                            {viewMode === 'fiction' && isFictionExaggerated ? 'Exaggerated Force: 5-7x Inflation' : ev.desc}
                                        </text>
                                        <text x={cx} y={cy + 45} textAnchor="middle" fill="#999" fontSize="9" fontFamily='"Pretendard Variable", "Pretendard", sans-serif' fontWeight="400">
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
