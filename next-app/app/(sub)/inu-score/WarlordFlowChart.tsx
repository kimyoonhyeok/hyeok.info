'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FONT = '"Pretendard Variable", "Pretendard", sans-serif';

const COLORS = {
    wei: '#2962ff',
    shu: '#d50000',
    wu: '#00c853',
    jin: '#aa00ff',
    chaos: '#78909c',
};

// Warlords that eventually merge into the three kingdoms
const WARLORDS = [
    { name: 'Dong Zhuo', fate: 'eliminated', y: 30, color: '#546e7a', endMsg: 'Assassinated (192 AD)' },
    { name: 'Yuan Shao', fate: 'wei_early', y: 65, color: '#fbc02d', endMsg: 'Defeated at Guandu' },
    { name: 'Gongsun Zan', fate: 'yuanshao', y: 100, color: '#8e24aa', endMsg: 'Destroyed by Yuan Shao' },
    { name: 'Cao Cao', fate: 'wei', y: 135, color: COLORS.wei, endMsg: '' },
    { name: 'Lü Bu', fate: 'eliminated', y: 170, color: '#d81b60', endMsg: 'Executed (199 AD)' },
    { name: 'Liu Biao', fate: 'divided', y: 205, color: '#00897b', endMsg: 'Jing Province Divided' },
    { name: 'Liu Bei', fate: 'shu', y: 240, color: COLORS.shu, endMsg: '' },
    { name: 'Sun Jian', fate: 'wu', y: 275, color: COLORS.wu, endMsg: '' },
    { name: 'Yuan Shu', fate: 'eliminated', y: 310, color: '#f57c00', endMsg: 'Destroyed (199 AD)' },
    { name: 'Ma Teng', fate: 'shu_late', y: 345, color: '#6d4c41', endMsg: 'Ma Chao joins Shu' },
];

const KINGDOMS_Y: Record<string, number> = { wei: 85, shu: 210, wu: 290 };
const JIN_Y = 190;

export default function WarlordFlowChart() {
    const [hoveredWarlord, setHoveredWarlord] = useState<string | null>(null);

    const w = 1000;
    const h = 400;
    const leftX = 80;
    const midX = 500;
    const rightX = 750;
    const farRightX = 920;

    const getFlowPath = (warlord: typeof WARLORDS[0]) => {
        const startY = warlord.y;
        
        if (warlord.fate === 'eliminated') {
            const endX = leftX + 130;
            const endY = startY + (Math.random() - 0.5) * 20;
            return `M ${leftX} ${startY} C ${leftX + 60} ${startY}, ${endX - 60} ${endY}, ${endX} ${endY}`;
        }
        if (warlord.fate === 'yuanshao') {
            const endX = leftX + 110;
            const endY = 65; // Yuan Shao Y
            return `M ${leftX} ${startY} C ${leftX + 60} ${startY}, ${endX - 60} ${endY}, ${endX} ${endY}`;
        }
        if (warlord.fate === 'wei_early') {
            const endX = leftX + 220; // Guandu (200 AD)
            const endY = KINGDOMS_Y.wei;
            return `M ${leftX} ${startY} C ${leftX + 100} ${startY}, ${endX - 100} ${endY}, ${endX} ${endY}`;
        }
        if (warlord.fate === 'shu_late') {
            const endX = midX;
            const endY = KINGDOMS_Y.shu;
            return `M ${leftX} ${startY} C ${leftX + 150} ${startY}, ${endX - 150} ${endY}, ${endX} ${endY}`;
        }
        if (warlord.fate === 'divided') {
            const splitX = leftX + 260; // Red Cliffs (208 AD)
            const splitY = startY;
            const pathMain = `M ${leftX} ${startY} C ${leftX + 100} ${startY}, ${splitX - 100} ${splitY}, ${splitX} ${splitY}`;
            const pathWei = `M ${splitX} ${splitY} C ${splitX + 60} ${splitY}, ${midX - 100} ${KINGDOMS_Y.wei}, ${midX} ${KINGDOMS_Y.wei}`;
            const pathShu = `M ${splitX} ${splitY} C ${splitX + 60} ${splitY}, ${midX - 100} ${KINGDOMS_Y.shu}, ${midX} ${KINGDOMS_Y.shu}`;
            const pathWu  = `M ${splitX} ${splitY} C ${splitX + 60} ${splitY}, ${midX - 100} ${KINGDOMS_Y.wu}, ${midX} ${KINGDOMS_Y.wu}`;
            return `${pathMain} ${pathWei} ${pathShu} ${pathWu}`;
        }
        
        const kingdomY = KINGDOMS_Y[warlord.fate] || KINGDOMS_Y.wei;
        return `M ${leftX} ${startY} C ${leftX + 150} ${startY}, ${midX - 150} ${kingdomY}, ${midX} ${kingdomY}`;
    };

    const getKingdomToJinPath = (kingdom: string) => {
        const ky = KINGDOMS_Y[kingdom];
        return `M ${rightX} ${ky} C ${rightX + 60} ${ky}, ${farRightX - 60} ${JIN_Y}, ${farRightX} ${JIN_Y}`;
    };

    const getTargetColor = (fate: string) => {
        if (fate === 'wei' || fate === 'wei_early') return COLORS.wei;
        if (fate === 'shu' || fate === 'shu_late') return COLORS.shu;
        if (fate === 'wu') return COLORS.wu;
        if (fate === 'yuanshao') return '#fbc02d';
        if (fate === 'divided') return '#00897b';
        return COLORS.chaos;
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4vh 4vw', fontFamily: FONT, backgroundColor: 'transparent' }}>
            
            {/* Header / Text positioned at bottom left */}
            <div style={{ position: 'absolute', bottom: '4vh', left: '4vw', textAlign: 'left', zIndex: 10 }}>
                <h3 style={{ fontFamily: FONT, fontSize: '1.2rem', margin: 0, fontWeight: 400, color: '#3e3129' }}>
                    Warlord Convergence: Late Han → Three Kingdoms → Jin
                </h3>
                <p style={{ fontFamily: FONT, fontSize: '0.85rem', color: '#6a5a4a', margin: '0.5rem 0 0 0', fontWeight: 400 }}>
                    Flow of power from multiple warlords (184 AD) through tripartite division to unification (280 AD)
                </p>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.7rem', color: '#998f82', fontFamily: FONT, fontWeight: 400, alignItems: 'flex-start' }}>
                    <span>— Lines show independent warlords gradually absorbed into Wei (Blue)</span>
                </div>
            </div>

            <div style={{ width: '100%', maxWidth: '1200px', height: '500px', position: 'relative', overflow: 'visible', zIndex: 1 }}>
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
                    {/* Era Labels */}
                    <text x={leftX} y={h - 10} textAnchor="middle" fill="#ccc" fontSize="10" fontFamily={FONT} fontWeight="400">c. 184 AD</text>
                    
                    {/* Time Markers */}
                    <g opacity={0.3}>
                        <line x1={leftX + 220} y1={20} x2={leftX + 220} y2={h - 30} stroke="#999" strokeWidth="1" strokeDasharray="4 4" />
                        <text x={leftX + 220} y={h - 10} textAnchor="middle" fill="#ccc" fontSize="10" fontFamily={FONT} fontWeight="400">Guandu (200 AD)</text>
                        
                        <line x1={leftX + 260} y1={20} x2={leftX + 260} y2={h - 30} stroke="#999" strokeWidth="1" strokeDasharray="4 4" />
                        <text x={leftX + 260} y={15} textAnchor="middle" fill="#ccc" fontSize="10" fontFamily={FONT} fontWeight="400">Red Cliffs (208 AD)</text>
                    </g>

                    <text x={midX + 60} y={h - 10} textAnchor="middle" fill="#ccc" fontSize="10" fontFamily={FONT} fontWeight="400">c. 220 AD</text>
                    <text x={farRightX} y={h - 10} textAnchor="middle" fill="#ccc" fontSize="10" fontFamily={FONT} fontWeight="400">280 AD</text>

                    <defs>
                        {WARLORDS.map(wl => (
                            <linearGradient key={`grad-${wl.name}`} id={`grad-${wl.name.replace(/\s+/g, '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor={wl.color} />
                                <stop offset="100%" stopColor={getTargetColor(wl.fate)} />
                            </linearGradient>
                        ))}
                    </defs>

                    {/* Warlord → Kingdom flow paths */}
                    {WARLORDS.map((wl, i) => (
                        <motion.path
                            key={wl.name}
                            d={getFlowPath(wl)}
                            fill="none"
                            stroke={`url(#grad-${wl.name.replace(/\s+/g, '')})`}
                            strokeWidth={hoveredWarlord === wl.name ? 5 : 3}
                            strokeLinecap="round"
                            opacity={hoveredWarlord === wl.name ? 1 : 0.7}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeInOut' }}
                            style={{ transition: 'opacity 0.3s, stroke-width 0.3s' }}
                        />
                    ))}

                    {/* Warlord labels and End Messages */}
                    {WARLORDS.map(wl => (
                        <g key={`label-g-${wl.name}`}>
                            <text
                                x={leftX - 10}
                                y={wl.y + 4}
                                textAnchor="end"
                                fill={hoveredWarlord === wl.name ? '#111' : (wl.fate === 'eliminated' ? '#bbb' : '#666')}
                                fontSize="11"
                                fontFamily={FONT}
                                fontWeight="400"
                                style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
                                onMouseEnter={() => setHoveredWarlord(wl.name)}
                                onMouseLeave={() => setHoveredWarlord(null)}
                            >
                                {wl.name}
                            </text>
                            
                            {/* Short end messages for eliminated/early fated warlords */}
                            {wl.endMsg && (
                                <motion.text
                                    x={
                                        wl.fate === 'eliminated' ? leftX + 135 : 
                                        wl.fate === 'yuanshao' ? leftX + 115 : 
                                        wl.fate === 'wei_early' ? leftX + 220 : 
                                        wl.fate === 'divided' ? leftX + 260 :
                                        leftX + 200
                                    }
                                    y={wl.fate === 'wei_early' || wl.fate === 'divided' ? wl.y - 8 : wl.y + 3}
                                    textAnchor="start"
                                    fill="#aaa"
                                    fontSize="8"
                                    fontFamily={FONT}
                                    fontWeight="400"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredWarlord === wl.name || !hoveredWarlord ? 0.7 : 0.2 }}
                                    transition={{ duration: 0.3, delay: 1 }}
                                >
                                    {wl.endMsg}
                                </motion.text>
                            )}
                        </g>
                    ))}

                    {/* Kingdom boxes */}
                    {([
                        { id: 'wei', label: 'WEI', sub: 'Cao Cao / Cao Pi', color: COLORS.wei },
                        { id: 'shu', label: 'SHU', sub: 'Liu Bei / Shan', color: COLORS.shu },
                        { id: 'wu', label: 'WU', sub: 'Sun Quan', color: COLORS.wu },
                    ] as const).map(k => (
                        <g key={k.id}>
                            <motion.rect
                                x={midX} y={KINGDOMS_Y[k.id] - 30} width={rightX - midX} height={60} rx={6}
                                fill={k.color} opacity={0.1}
                                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
                                style={{ transformOrigin: `${midX}px ${KINGDOMS_Y[k.id]}px` }}
                            />
                            <text x={midX + (rightX - midX) / 2} y={KINGDOMS_Y[k.id] - 5} textAnchor="middle" fill={k.color} fontSize="16" fontFamily={FONT} fontWeight="400">
                                {k.label}
                            </text>
                            <text x={midX + (rightX - midX) / 2} y={KINGDOMS_Y[k.id] + 14} textAnchor="middle" fill="#999" fontSize="9" fontFamily={FONT} fontWeight="400">
                                {k.sub}
                            </text>
                        </g>
                    ))}

                    {/* Kingdom → Jin paths */}
                    {(['wei', 'shu', 'wu'] as const).map((k, i) => (
                        <motion.path
                            key={`jin-${k}`}
                            d={getKingdomToJinPath(k)}
                            fill="none"
                            stroke={COLORS.jin}
                            strokeWidth={3}
                            strokeLinecap="round"
                            opacity={0.4}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 2.5 + i * 0.2, ease: 'easeInOut' }}
                        />
                    ))}

                    {/* Jin label */}
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}>
                        <rect x={farRightX - 5} y={JIN_Y - 25} width={70} height={50} rx={6} fill={COLORS.jin} opacity={0.1} />
                        <text x={farRightX + 30} y={JIN_Y - 2} textAnchor="middle" fill={COLORS.jin} fontSize="16" fontFamily={FONT} fontWeight="400">JIN</text>
                        <text x={farRightX + 30} y={JIN_Y + 15} textAnchor="middle" fill="#999" fontSize="9" fontFamily={FONT} fontWeight="400">Sima Yan</text>
                    </motion.g>

                    {/* Conquest annotations */}
                    <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}
                        x={rightX + 100} y={KINGDOMS_Y.shu + 15} textAnchor="middle" fill="#999" fontSize="9" fontFamily={FONT} fontWeight="400">
                        263 (Wei conquers Shu)
                    </motion.text>
                    <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
                        x={rightX + 100} y={KINGDOMS_Y.wu + 25} textAnchor="middle" fill="#999" fontSize="9" fontFamily={FONT} fontWeight="400">
                        280 (Jin conquers Wu)
                    </motion.text>
                </svg>
            </div>
        </div>
    );
}
