'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FONT = '"Pretendard Variable", "Pretendard", sans-serif';

// Simplified China outline (very simplified polygon for SVG)
// This is a stylized representation
const CHINA_PATH = 'M 150,50 L 280,30 L 380,40 L 450,80 L 500,60 L 550,70 L 600,50 L 650,80 L 680,120 L 700,180 L 720,230 L 710,280 L 680,320 L 650,340 L 600,360 L 550,380 L 500,390 L 450,380 L 400,370 L 350,380 L 300,390 L 250,380 L 200,350 L 170,310 L 140,260 L 120,200 L 100,160 L 110,120 L 130,80 Z';

// Approximate regional boundaries
const REGIONS = [
    {
        id: 'wei',
        label: 'WEI',
        sub: '12 Provinces · 4,370,000 households',
        color: '#2962ff',
        path: 'M 150,50 L 280,30 L 380,40 L 450,80 L 500,60 L 550,70 L 600,50 L 650,80 L 680,120 L 700,180 L 650,200 L 600,210 L 500,220 L 400,230 L 300,210 L 200,180 L 140,160 L 120,130 L 130,80 Z',
        labelPos: { x: 400, y: 70 },
        troops: '400k–500k',
        desc: 'North · Legal Pragmatism · Tuntian System',
    },
    {
        id: 'shu',
        label: 'SHU',
        sub: '1 Province (Yi) · 280,000 households',
        color: '#00c853',
        path: 'M 140,160 L 200,180 L 300,210 L 350,230 L 300,280 L 260,310 L 220,330 L 190,310 L 160,270 L 130,220 L 120,180 Z',
        labelPos: { x: 220, y: 250 },
        troops: '102k',
        desc: 'Southwest · Confucian Legitimacy · Frequent Northern Expeditions',
    },
    {
        id: 'wu',
        label: 'WU',
        sub: '3 Provinces · 523,000 households',
        color: '#d50000',
        path: 'M 350,230 L 400,230 L 500,220 L 600,210 L 650,200 L 700,180 L 720,230 L 710,280 L 680,320 L 650,340 L 600,360 L 550,380 L 500,390 L 450,380 L 400,360 L 350,340 L 300,310 L 300,280 Z',
        labelPos: { x: 530, y: 290 },
        troops: '230k',
        desc: 'Southeast · Clan Coalition · Naval Superiority on Yangtze',
    },
];

const BATTLES_ON_MAP = [
    { name: 'Guandu', year: 200, x: 420, y: 140 },
    { name: 'Red Cliffs', year: 208, x: 480, y: 215 },
    { name: 'Yiling', year: 222, x: 380, y: 260 },
];

export default function TerritorialMap({ isPoster = false }: { isPoster?: boolean }) {
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
    const [hoveredBattle, setHoveredBattle] = useState<string | null>(null);

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
            fontFamily: FONT,
            backgroundColor: 'transparent',
            boxSizing: 'border-box'
        }}>
            
            {/* Header / Text positioned at bottom left */}
            <div style={isPoster ? {
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '4px 8px 12px 8px',
                boxSizing: 'border-box',
                zIndex: 10
            } : {
                position: 'absolute', bottom: '4vh', left: '4vw', textAlign: 'left', zIndex: 10
            }}>
                <div style={{ textAlign: 'left' }}>
                    <h3 style={{ fontFamily: FONT, fontSize: isPoster ? '11px' : '1.2rem', margin: 0, fontWeight: 400, color: '#3e3129' }}>
                        Territorial Overview (c. 220–260 AD)
                    </h3>
                    {!isPoster && (
                        <p style={{ fontFamily: FONT, fontSize: '0.85rem', color: '#6a5a4a', margin: '0.5rem 0 0 0', fontWeight: 400 }}>
                            Hover regions for details — battle markers show key turning points
                        </p>
                    )}
                </div>

                {/* Legend */}
                <div style={isPoster ? {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '9px',
                    lineHeight: '14.56px',
                    fontFamily: FONT,
                    fontWeight: 400
                } : {
                    marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.7rem', fontFamily: FONT, fontWeight: 400
                }}>
                    {REGIONS.map(r => (
                        <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: 8, height: 8, borderRadius: 2, background: r.color, opacity: 0.5 }} />
                            <span style={{ color: '#998f82' }}>{r.label}</span>
                        </div>
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <svg width="8" height="8"><circle cx="4" cy="4" r="3" fill="none" stroke="#e65100" strokeWidth="1" /></svg>
                        <span style={{ color: '#998f82' }}>Battle</span>
                    </div>
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
                <svg width="100%" height="100%" viewBox="0 0 850 430" preserveAspectRatio="xMidYMid meet">
                    {/* China outline */}
                    <path d={CHINA_PATH} fill="none" stroke="#ddd" strokeWidth="1.5" />

                    {/* Territory regions */}
                    {REGIONS.map((region, i) => {
                        const isHovered = hoveredRegion === region.id;
                        return (
                            <g key={region.id}
                                onMouseEnter={() => setHoveredRegion(region.id)}
                                onMouseLeave={() => setHoveredRegion(null)}
                                style={{ cursor: 'pointer' }}
                            >
                                <motion.path
                                    d={region.path}
                                    fill={region.color}
                                    opacity={isHovered ? 0.25 : 0.1}
                                    stroke={region.color}
                                    strokeWidth={isHovered ? 2 : 1}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isHovered ? 0.25 : 0.1 }}
                                    transition={{ duration: 0.8, delay: i * 0.3 }}
                                    style={{ transition: 'opacity 0.3s, stroke-width 0.3s' }}
                                />
                                <text
                                    x={region.labelPos.x} y={region.labelPos.y}
                                    textAnchor="middle" fill={region.color}
                                    fontSize={isHovered ? 20 : 16} fontFamily={FONT} fontWeight="400"
                                    opacity={isHovered ? 1 : 0.6}
                                    style={{ transition: 'all 0.3s' }}
                                >
                                    {region.label}
                                </text>
                                <text
                                    x={region.labelPos.x} y={region.labelPos.y + 18}
                                    textAnchor="middle" fill={region.color}
                                    fontSize="9" fontFamily={FONT} fontWeight="400"
                                    opacity={isHovered ? 0.8 : 0.4}
                                    style={{ transition: 'opacity 0.3s' }}
                                >
                                    {region.sub}
                                </text>

                                {/* Details panel on hover */}
                                {isHovered && (
                                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <text
                                            x={region.labelPos.x} y={region.labelPos.y + 35}
                                            textAnchor="middle" fill="#666"
                                            fontSize="9" fontFamily={FONT} fontWeight="400"
                                        >
                                            Troops: {region.troops} · {region.desc}
                                        </text>
                                    </motion.g>
                                )}
                            </g>
                        );
                    })}

                    {/* Battle markers */}
                    {BATTLES_ON_MAP.map((battle, i) => {
                        const isHovered = hoveredBattle === battle.name;
                        return (
                            <g key={battle.name}
                                onMouseEnter={() => setHoveredBattle(battle.name)}
                                onMouseLeave={() => setHoveredBattle(null)}
                                style={{ cursor: 'pointer' }}
                            >
                                <motion.circle
                                    cx={battle.x} cy={battle.y} r={isHovered ? 10 : 6}
                                    fill="none" stroke="#e65100" strokeWidth="2"
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 2 + i * 0.2 }}
                                    style={{ transition: 'r 0.3s' }}
                                />
                                {/* Pulse on hover */}
                                {isHovered && (
                                    <motion.circle
                                        cx={battle.x} cy={battle.y} r={6}
                                        fill="none" stroke="#e65100" strokeWidth="1"
                                        animate={{ r: [6, 20], opacity: [0.6, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.2 }}
                                    />
                                )}
                                <text
                                    x={battle.x} y={battle.y - 14}
                                    textAnchor="middle" fill={isHovered ? '#e65100' : '#999'}
                                    fontSize="9" fontFamily={FONT} fontWeight="400"
                                    style={{ transition: 'fill 0.3s' }}
                                >
                                    {battle.name} ({battle.year})
                                </text>
                            </g>
                        );
                    })}

                    {/* Compass */}
                    <text x={770} y={60} textAnchor="middle" fill="#ccc" fontSize={isPoster ? "9" : "14"} fontFamily={FONT} fontWeight="400">N</text>
                    <text x={770} y={380} textAnchor="middle" fill="#ccc" fontSize={isPoster ? "9" : "14"} fontFamily={FONT} fontWeight="400">S</text>
                    <text x={810} y={220} textAnchor="middle" fill="#ccc" fontSize={isPoster ? "9" : "14"} fontFamily={FONT} fontWeight="400">E</text>
                    <text x={730} y={220} textAnchor="middle" fill="#ccc" fontSize={isPoster ? "9" : "14"} fontFamily={FONT} fontWeight="400">W</text>
                </svg>
            </div>
        </div>
    );
}
