'use client';

import React from 'react';

const FONT_SANS = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const FONT_SERIF = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const LINE = '#666666';
const BG = '#FBFBF9';

interface BattleData {
    name: string;
    year: number;
    historical: { side1: number; side2: number; side1Label: string; side2Label: string };
    fiction: { side1: number; side2: number; side1Label: string; side2Label: string };
    winner: string;
}

const BATTLES: BattleData[] = [
    {
        name: 'Battle of Guandu',
        year: 200,
        historical: { side1: 110000, side2: 40000, side1Label: 'Yuan Shao', side2Label: 'Cao Cao' },
        fiction: { side1: 700000, side2: 70000, side1Label: 'Yuan Shao', side2Label: 'Cao Cao' },
        winner: 'Cao Cao',
    },
    {
        name: 'Battle of Red Cliffs',
        year: 208,
        historical: { side1: 200000, side2: 50000, side1Label: 'Cao Cao', side2Label: 'Sun-Liu' },
        fiction: { side1: 830000, side2: 50000, side1Label: 'Cao Cao', side2Label: 'Sun-Liu' },
        winner: 'Sun-Liu',
    },
    {
        name: 'Battle of Yiling',
        year: 222,
        historical: { side1: 100000, side2: 50000, side1Label: 'Liu Bei', side2Label: 'Lu Xun' },
        fiction: { side1: 750000, side2: 50000, side1Label: 'Liu Bei', side2Label: 'Lu Xun' },
        winner: 'Lu Xun',
    }
];

const maxTroops = 830000;

export default function BattleBubbleChart({ isPoster = false }: { isPoster?: boolean; fixedMode?: string }) {
    
    const getRadius = (troops: number) => Math.sqrt(troops / maxTroops) * 60; // 최대 반지름 60px

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: FONT_SANS,
            backgroundColor: 'transparent',
            boxSizing: 'border-box'
        }}>
            {BATTLES.map((battle, i) => {
                const rFiction1 = getRadius(battle.fiction.side1);
                const rHistory1 = getRadius(battle.historical.side1);
                const exaggeration = (battle.fiction.side1 / battle.historical.side1).toFixed(1);

                return (
                    <div key={battle.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                        <div style={{ textAlign: 'center', marginBottom: '16px', borderBottom: `0.5px solid ${LINE}`, paddingBottom: '8px' }}>
                            <div style={{ fontFamily: FONT_SERIF, fontSize: '10pt', fontWeight: 500, color: '#222', lineHeight: '1.2' }}>{battle.name}</div>
                            <div style={{ fontFamily: FONT_SANS, fontSize: '9pt', color: '#888', marginTop: '4px' }}>{battle.year} AD</div>
                        </div>

                        <svg viewBox="0 -10 160 220" style={{ width: '100%', maxWidth: '160px', height: 'auto', overflow: 'visible' }}>
                            {/* 중심을 가로지르는 와이어프레임 가이드 라인 */}
                            <line x1="80" y1="-10" x2="80" y2="210" stroke={LINE} strokeWidth="0.5" strokeDasharray="2 2" />
                            <line x1="0" y1="100" x2="160" y2="100" stroke={LINE} strokeWidth="0.5" strokeDasharray="2 2" />

                            {/* Fiction Bubble (Hollow) */}
                            <circle cx="80" cy="100" r={rFiction1} fill="none" stroke={LINE} strokeWidth="0.5" />
                            <text x="80" y={100 - rFiction1 - 8} textAnchor="middle" fill="#222" fontSize="12" fontFamily={FONT_SERIF}>
                                {(battle.fiction.side1 / 10000).toFixed(0)}0k
                            </text>

                            {/* Historical Bubble (Solid/Filled) */}
                            <circle cx="80" cy="100" r={rHistory1} fill="#e0e0e0" stroke={LINE} strokeWidth="0.5" />
                            <text x="80" y={100 + rHistory1 + 16} textAnchor="middle" fill="#222" fontSize="12" fontFamily={FONT_SERIF}>
                                {(battle.historical.side1 / 10000).toFixed(0)}0k
                            </text>

                            {/* 배율 표시 */}
                            <rect x="110" y="20" width="40" height="20" fill={BG} stroke={LINE} strokeWidth="0.5" />
                            <text x="130" y="34" textAnchor="middle" fill="#222" fontSize="12" fontFamily={FONT_SANS}>{exaggeration}x</text>

                            {/* Label */}
                            <text x="80" y={180} textAnchor="middle" fill="#222" fontSize="12" fontFamily={FONT_SANS}>
                                {battle.historical.side1Label}
                            </text>
                        </svg>
                    </div>
                );
            })}
        </div>
    );
}
