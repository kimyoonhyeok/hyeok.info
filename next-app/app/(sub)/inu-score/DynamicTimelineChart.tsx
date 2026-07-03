'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// All colors removed, using grayscale for opacity-based distinction
const COLORS = {
    wei: '#333333',
    shu: '#777777',
    wu: '#bbbbbb',
    base: '#e0e0e0',
    text: '#333'
};

const EVENTS = [
    { year: 184, name: 'Yellow Turban Rebellion', desc: 'Outbreak of Chaos', faction: 'base', yOffset: 0 },
    { year: 200, name: 'Battle of Guandu', desc: 'Cao Cao unifies the North', faction: 'wei', yOffset: -30 },
    { year: 208, name: 'Battle of Red Cliffs', desc: 'Allied victory', faction: 'wu', yOffset: 40 },
    { year: 222, name: 'Battle of Yiling', desc: 'Lu Xun victory', faction: 'shu', yOffset: -50 },
    { year: 234, name: 'Wuzhangyuan', desc: 'Death of Zhuge Liang', faction: 'shu', yOffset: 60 },
    { year: 263, name: 'Fall of Shu', desc: 'Wei conquers Shu', faction: 'wei', yOffset: -40 },
    { year: 280, name: 'Fall of Wu', desc: 'Jin unification', faction: 'base', yOffset: 0 }
];

export default function DynamicTimelineChart({ isPoster = false, fixedMode }: { isPoster?: boolean; fixedMode?: 'historical' | 'fiction' }) {
    const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
    const viewMode = fixedMode || 'historical';

    const width = 1000;
    const height = 400;
    const padX = 50;
    const padY = 50;

    const mapX = (year: number) => padX + ((year - 180) / 105) * (width - padX * 2);

    const PATHS = {
        historical: {
            wei: [{ x: 190, y: 200 }, { x: 210, y: 100 }, { x: 250, y: 80 }, { x: 265, y: 100 }, { x: 280, y: 180 }],
            shu: [{ x: 208, y: 250 }, { x: 215, y: 280 }, { x: 234, y: 300 }, { x: 263, y: 250 }],
            wu:  [{ x: 200, y: 300 }, { x: 220, y: 350 }, { x: 260, y: 350 }, { x: 280, y: 220 }]
        },
        fiction: {
            wei: [{ x: 190, y: 200 }, { x: 210, y: 180 }, { x: 250, y: 200 }, { x: 265, y: 220 }, { x: 280, y: 250 }],
            shu: [{ x: 208, y: 200 }, { x: 215, y: 120 }, { x: 234, y: 100 }, { x: 263, y: 150 }],
            wu:  [{ x: 200, y: 280 }, { x: 220, y: 230 }, { x: 260, y: 210 }, { x: 280, y: 210 }]
        }
    };

    const pathBase = `M ${mapX(180)} 200 Q ${mapX(195)} 200, ${mapX(205)} 250`;

    const renderTaperedPath = (faction: 'wei' | 'shu' | 'wu', baseWidth: number) => {
        const data = PATHS[viewMode][faction];
        const segments = 15;
        const result = [];
        
        for (let i = 0; i < segments; i++) {
            const t1 = i / segments;
            const t2 = (i + 1) / segments;
            
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
            const w = baseWidth * widthScale;

            result.push(
                <motion.line
                    key={`${faction}-${i}`}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={COLORS[faction]}
                    strokeWidth={w}
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

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'visible' }}>
                <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
                    {[180, 200, 220, 240, 260, 280].map(year => (
                        <g key={year}>
                            <line x1={mapX(year)} y1={padY} x2={mapX(year)} y2={height - padY} stroke="#f0f0f0" strokeDasharray="4 4" strokeWidth="1" />
                            <text x={mapX(year)} y={height - 20} textAnchor="middle" fill="#aaa" fontSize="12" fontFamily='"Helvetica Neue", Helvetica, Arial, sans-serif'>{year}</text>
                        </g>
                    ))}
                    <motion.path d={pathBase} fill="none" stroke={COLORS.base} strokeWidth="12" strokeLinecap="round" />
                    
                    {/* Render order depends on mode to put emphasized faction on top */}
                    {viewMode === 'fiction' ? (
                        <>
                            {renderTaperedPath('wu', 20)}
                            {renderTaperedPath('wei', 20)}
                            {renderTaperedPath('shu', 40)} {/* Shu thickest and on top */}
                        </>
                    ) : (
                        <>
                            {renderTaperedPath('shu', 10)}
                            {renderTaperedPath('wu', 15)}
                            {renderTaperedPath('wei', 30)} {/* Wei thickest and on top */}
                        </>
                    )}

                    {EVENTS.map((ev, i) => {
                        const cx = mapX(ev.year);
                        const cy = 200 + ev.yOffset;
                        const isFictionExaggerated = viewMode === 'fiction' && (ev.year === 200 || ev.year === 208 || ev.year === 222);
                        const eventColor = ev.faction === 'wei' ? COLORS.wei : ev.faction === 'shu' ? COLORS.shu : ev.faction === 'wu' ? COLORS.wu : '#888';

                        return (
                            <g key={i}>
                                <line x1={cx} y1={cy} x2={cx} y2={height - padY} stroke={eventColor} strokeWidth="1" strokeDasharray="2 2" opacity={0.3} />
                                {isFictionExaggerated && (
                                    <circle cx={cx} cy={cy} r="14" fill="none" stroke={eventColor} strokeWidth="1.5" strokeDasharray="2 2" opacity={0.6} />
                                )}
                                <circle cx={cx} cy={cy} r="6" fill={eventColor} stroke="#fff" strokeWidth="2" />
                                <text x={cx} y={cy - 12} textAnchor="middle" fill="#444" fontSize="11" fontFamily='"Helvetica Neue", Helvetica, Arial, sans-serif'>{ev.name}</text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
