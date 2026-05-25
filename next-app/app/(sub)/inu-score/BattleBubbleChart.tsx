'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FONT = '"Pretendard Variable", "Pretendard", sans-serif';

interface BattleData {
    name: string;
    year: number;
    historical: { side1: number; side2: number; side1Label: string; side2Label: string };
    fiction: { side1: number; side2: number; side1Label: string; side2Label: string };
    winner: string;
    color: string;
}

const BATTLES: BattleData[] = [
    {
        name: 'Battle of Guandu',
        year: 200,
        historical: { side1: 110000, side2: 40000, side1Label: 'Yuan Shao', side2Label: 'Cao Cao' },
        fiction: { side1: 700000, side2: 70000, side1Label: 'Yuan Shao', side2Label: 'Cao Cao' },
        winner: 'Cao Cao',
        color: '#2962ff',
    },
    {
        name: 'Battle of Red Cliffs',
        year: 208,
        historical: { side1: 200000, side2: 50000, side1Label: 'Cao Cao', side2Label: 'Sun-Liu Alliance' },
        fiction: { side1: 830000, side2: 50000, side1Label: 'Cao Cao', side2Label: 'Sun-Liu Alliance' },
        winner: 'Sun-Liu Alliance',
        color: '#d50000',
    },
    {
        name: 'Battle of Yiling',
        year: 222,
        historical: { side1: 100000, side2: 50000, side1Label: 'Liu Bei', side2Label: 'Lu Xun' },
        fiction: { side1: 750000, side2: 50000, side1Label: 'Liu Bei', side2Label: 'Lu Xun' },
        winner: 'Lu Xun',
        color: '#00c853',
    },
    {
        name: 'Wuzhangyuan',
        year: 234,
        historical: { side1: 100000, side2: 200000, side1Label: 'Zhuge Liang', side2Label: 'Sima Yi' },
        fiction: { side1: 340000, side2: 400000, side1Label: 'Zhuge Liang', side2Label: 'Sima Yi' },
        winner: 'Stalemate (Zhuge dies)',
        color: '#ff6d00',
    },
];

const maxTroops = 830000; // fiction max for scaling

export default function BattleBubbleChart({ isPoster = false, fixedMode }: { isPoster?: boolean; fixedMode?: 'historical' | 'fiction' }) {
    const [viewMode, setViewMode] = useState<'historical' | 'fiction'>(fixedMode || 'historical');
    const [hoveredBattle, setHoveredBattle] = useState<number | null>(null);

    // When fixedMode is set, lock the viewMode
    const effectiveMode = fixedMode || viewMode;

    const getRadius = (troops: number) => Math.sqrt(troops / maxTroops) * (isPoster ? 50 : 80);

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
            
            {/* Header and Toggle positioned at bottom left */}
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
                            fontFamily: FONT, fontSize: isPoster ? '9px' : '0.9rem', lineHeight: isPoster ? '14.56px' : 'normal', fontWeight: 500,
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
                            fontFamily: FONT, fontSize: isPoster ? '9px' : '0.9rem', lineHeight: isPoster ? '14.56px' : 'normal', fontWeight: 500,
                            color: effectiveMode === 'fiction' ? '#E74C3C' : '#888', cursor: 'pointer', transition: 'all 0.3s'
                        }}
                    >
                        Romance Exaggeration
                    </button>
                </div>
                )}
                {/* Fixed mode label for poster */}
                {fixedMode && isPoster && (
                    <span style={{
                        fontFamily: FONT,
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
                    <h3 style={{ fontFamily: FONT, fontSize: isPoster ? '11px' : '1.2rem', margin: 0, fontWeight: 400, color: '#3e3129' }}>
                        Major Battles: Troop Comparison
                    </h3>
                    {!isPoster && (
                        <p style={{ fontFamily: FONT, fontSize: '0.85rem', color: '#6a5a4a', margin: '0.5rem 0 0 0', fontWeight: 400 }}>
                            Circle area proportional to troop estimates
                        </p>
                    )}
                </div>
            </div>

            {/* Bubbles grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: isPoster ? '0.5rem' : '1rem',
                alignItems: 'center',
                width: '100%',
                maxWidth: '1200px',
                flex: isPoster ? 1 : undefined,
                minHeight: 0
            }}>
                {BATTLES.map((battle, i) => {
                    const data = effectiveMode === 'historical' ? battle.historical : battle.fiction;
                    const r1 = getRadius(data.side1);
                    const r2 = getRadius(data.side2);
                    const isHovered = hoveredBattle === i;
                    const exaggeration = effectiveMode === 'fiction'
                        ? `${(battle.fiction.side1 / battle.historical.side1).toFixed(1)}x`
                        : null;

                    return (
                        <div
                            key={battle.name}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isPoster ? '0.2rem' : '0.5rem',
                                cursor: 'pointer', padding: isPoster ? '4px' : '1rem', borderRadius: '12px',
                                background: isHovered ? '#fafafa' : 'transparent', transition: 'background 0.3s',
                            }}
                            onMouseEnter={() => setHoveredBattle(i)}
                            onMouseLeave={() => setHoveredBattle(null)}
                        >
                            {/* Battle name */}
                            <div style={{ textAlign: 'center', marginBottom: isPoster ? '0.2rem' : '0.5rem' }}>
                                <div style={{ fontSize: isPoster ? '9px' : '0.85rem', lineHeight: isPoster ? '14.56px' : 'normal', fontWeight: 400, color: isHovered ? battle.color : '#333', transition: 'color 0.3s', fontFamily: FONT }}>
                                    {battle.name}
                                </div>
                                <div style={{ fontSize: isPoster ? '9px' : '10px', lineHeight: isPoster ? '14.56px' : 'normal', color: '#aaa', fontFamily: FONT, fontWeight: 400 }}>
                                    {battle.year} AD
                                </div>
                            </div>

                            {/* Bubble pair */}
                            <svg 
                                viewBox="0 0 240 240" 
                                style={{ 
                                    width: '100%', 
                                    maxWidth: isPoster ? '130px' : '240px', 
                                    height: 'auto', 
                                    overflow: 'visible' 
                                }}
                            >
                                {/* Side 1 (larger usually) */}
                                <motion.circle
                                    cx={100} cy={120}
                                    initial={{ r: 0 }}
                                    animate={{ r: r1 }}
                                    transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                                    fill={battle.color} opacity={0.2}
                                    stroke={battle.color} strokeWidth={1}
                                />
                                <text x={100} y={118} textAnchor="middle" fill={battle.color} fontSize={isPoster ? "9" : "9"} fontFamily={FONT} fontWeight="400">
                                    {data.side1Label}
                                </text>
                                <text x={100} y={130} textAnchor="middle" fill={battle.color} fontSize={isPoster ? "9" : "8"} fontFamily={FONT} fontWeight="400" opacity={0.7}>
                                    {(data.side1 / 1000).toFixed(0)}k
                                </text>

                                {/* Side 2 (smaller usually) */}
                                <motion.circle
                                    cx={140} cy={120}
                                    initial={{ r: 0 }}
                                    animate={{ r: r2 }}
                                    transition={{ duration: 0.8, delay: i * 0.15 + 0.2, ease: 'easeOut' }}
                                    fill="#78909c" opacity={0.2}
                                    stroke="#78909c" strokeWidth={1}
                                />
                                <text x={140} y={118} textAnchor="middle" fill="#555" fontSize={isPoster ? "9" : "9"} fontFamily={FONT} fontWeight="400">
                                    {data.side2Label}
                                </text>
                                <text x={140} y={130} textAnchor="middle" fill="#555" fontSize={isPoster ? "9" : "8"} fontFamily={FONT} fontWeight="400" opacity={0.7}>
                                    {(data.side2 / 1000).toFixed(0)}k
                                </text>

                                {/* Exaggeration badge */}
                                {exaggeration && (
                                    <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + i * 0.15 }}>
                                        <circle cx={200} cy={40} r={18} fill="#f57f17" opacity={0.15} />
                                        <text x={200} y={44} textAnchor="middle" fill="#f57f17" fontSize={isPoster ? "9" : "11"} fontFamily={FONT} fontWeight="400">
                                            {exaggeration}
                                        </text>
                                    </motion.g>
                                )}
                            </svg>

                            {/* Winner */}
                            <div style={{ fontSize: isPoster ? '9px' : '10px', lineHeight: isPoster ? '14.56px' : 'normal', color: '#999', fontFamily: FONT, fontWeight: 400, textAlign: 'center' }}>
                                Winner: {battle.winner}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
