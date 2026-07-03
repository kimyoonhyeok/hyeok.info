'use client';

import React from 'react';

const FONT_SANS = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const FONT_SERIF = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const LINE = '#666666';
const BG = '#FBFBF9';
const RED_LINE = '#c0392b';

export default function WarlordFlowChart({ isPoster = false, mode = 'historical' }: { isPoster?: boolean, mode?: 'fiction' | 'historical' }) {
    const w = 360;
    const h = 280;
    
    const x1 = 80;  // 184 AD
    const x2 = 200; // 220 AD
    const x3 = 300; // 280 AD

    const KINGDOMS = [
        { name: 'Wei', y: 100 },
        { name: 'Shu', y: 180 },
        { name: 'Wu', y: 240 }
    ];

    const isFiction = mode === 'fiction';

    return (
        <div style={{
            position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', fontFamily: FONT_SANS, boxSizing: 'border-box'
        }}>
            <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'visible' }}>
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
                    {/* Vertical Guidelines */}
                    <line x1={x1} y1="20" x2={x1} y2={h-20} stroke={LINE} strokeWidth="0.5" strokeDasharray="2 2" opacity={0.5} />
                    <line x1={x2} y1="20" x2={x2} y2={h-20} stroke={LINE} strokeWidth="0.5" strokeDasharray="2 2" opacity={0.5} />
                    <line x1={x3} y1="20" x2={x3} y2={h-20} stroke={LINE} strokeWidth="0.5" strokeDasharray="2 2" opacity={0.5} />

                    {isFiction ? (
                        /* ================= FICTION MODE ================= */
                        <g>
                            {/* Dramatic Fiction Lines */}
                            <line x1={x1} y1={60} x2={x1} y2={30} stroke={RED_LINE} strokeWidth="1" strokeDasharray="3 3" />
                            <line x1={x1} y1={60} x2={x1} y2={90} stroke={RED_LINE} strokeWidth="1" strokeDasharray="3 3" />
                            <text x={x1 + 6} y={63} fill={RED_LINE} fontSize="8" fontFamily={FONT_SANS} fontStyle="italic">Discord</text>

                            <line x1={x1} y1={200} x2={x1} y2={230} stroke={RED_LINE} strokeWidth="1" strokeDasharray="3 3" />
                            <text x={x1 + 6} y={218} fill={RED_LINE} fontSize="8" fontFamily={FONT_SANS} fontStyle="italic">Fatal Rivalry</text>

                            {/* Warlord to Kingdom Lines */}
                            <line x1={x1} y1={130} x2={x2} y2={100} stroke={LINE} strokeWidth="0.5" />
                            <line x1={x1} y1={160} x2={x2} y2={180} stroke="#222" strokeWidth="2.5" /> {/* Orthodoxy */}
                            <line x1={x1} y1={260} x2={x2} y2={240} stroke={LINE} strokeWidth="0.5" />
                            
                            {/* Defeat Lines */}
                            <line x1={x1} y1={30} x2={x1+30} y2={30} stroke={LINE} strokeWidth="0.5" strokeDasharray="2 2" />
                            <line x1={x1} y1={90} x2={x1+30} y2={130} stroke={LINE} strokeWidth="0.5" strokeDasharray="2 2" />

                            {/* Nodes */}
                            {[
                                { name: 'Dong Zhuo', y: 30 },
                                { name: 'Diaochan', y: 60, fill: '#fdf2e9', stroke: RED_LINE },
                                { name: 'Lu Bu', y: 90 },
                                { name: 'Cao Cao', y: 130 },
                                { name: 'Liu Bei', y: 160, bold: true },
                                { name: 'Zhuge Liang', y: 200, fill: '#fdf2e9', stroke: RED_LINE },
                                { name: 'Zhou Yu', y: 230 },
                                { name: 'Sun Quan', y: 260 }
                            ].map(node => (
                                <g key={node.name}>
                                    <circle cx={x1} cy={node.y} r="4" fill={node.fill || BG} stroke={node.stroke || LINE} strokeWidth="1" />
                                    <text x={x1 - 10} y={node.y + 3} textAnchor="end" fill="#222" fontSize="11" fontWeight={node.bold ? 600 : 400} fontFamily={FONT_SERIF}>
                                        {node.name}
                                    </text>
                                </g>
                            ))}
                        </g>
                    ) : (
                        /* ================= HISTORICAL MODE ================= */
                        <g>
                            {/* Warlord to Kingdom Lines */}
                            <line x1={x1} y1={60} x2={x1+40} y2={100} stroke={LINE} strokeWidth="0.5" /> {/* Yuan Shao defeated by Cao */}
                            <line x1={x1} y1={100} x2={x2} y2={100} stroke={LINE} strokeWidth="0.5" />
                            <line x1={x1} y1={160} x2={x2} y2={180} stroke={LINE} strokeWidth="0.5" />
                            <line x1={x1} y1={240} x2={x2} y2={240} stroke={LINE} strokeWidth="0.5" />

                            {/* Nodes */}
                            {[
                                { name: 'Yuan Shao', y: 60 },
                                { name: 'Cao Cao', y: 100 },
                                { name: 'Liu Bei', y: 160 },
                                { name: 'Sun Jian', y: 240 }
                            ].map(node => (
                                <g key={node.name}>
                                    <circle cx={x1} cy={node.y} r="4" fill={BG} stroke={LINE} strokeWidth="1" />
                                    <text x={x1 - 10} y={node.y + 3} textAnchor="end" fill="#222" fontSize="11" fontFamily={FONT_SERIF}>
                                        {node.name}
                                    </text>
                                </g>
                            ))}
                        </g>
                    )}

                    {/* Kingdoms to Jin (Shared) */}
                    {KINGDOMS.map((k) => (
                        <g key={k.name}>
                            <line x1={x2} y1={k.y} x2={x3} y2={180} stroke={LINE} strokeWidth="0.5" />
                            <circle cx={x2} cy={k.y} r="5" fill={BG} stroke={LINE} strokeWidth="1" />
                            <text x={x2} y={k.y - 12} textAnchor="middle" fill="#222" fontSize="11" fontFamily={FONT_SERIF}>{k.name}</text>
                        </g>
                    ))}

                    {/* Final Jin Node */}
                    <circle cx={x3} cy={180} r="6" fill={BG} stroke={LINE} strokeWidth="1.5" />
                    <text x={x3 + 12} y={184} textAnchor="start" fill="#222" fontSize="13" fontFamily={FONT_SERIF}>Jin</text>

                    {/* Timeline labels */}
                    <text x={x1} y="14" textAnchor="middle" fill={LINE} fontSize="9" fontFamily={FONT_SANS}>184 AD</text>
                    <text x={x2} y="14" textAnchor="middle" fill={LINE} fontSize="9" fontFamily={FONT_SANS}>220 AD</text>
                    <text x={x3} y="14" textAnchor="middle" fill={LINE} fontSize="9" fontFamily={FONT_SANS}>280 AD</text>
                </svg>
            </div>
        </div>
    );
}
