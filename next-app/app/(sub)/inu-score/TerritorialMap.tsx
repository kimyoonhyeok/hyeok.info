'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const CHINA_PATH = 'M 150,50 L 280,30 L 380,40 L 450,80 L 500,60 L 550,70 L 600,50 L 650,80 L 680,120 L 700,180 L 720,230 L 710,280 L 680,320 L 650,340 L 600,360 L 550,380 L 500,390 L 450,380 L 400,370 L 350,380 L 300,390 L 250,380 L 200,350 L 170,310 L 140,260 L 120,200 L 100,160 L 110,120 L 130,80 Z';

// Removed colors, using grayscale
const REGIONS = [
    {
        id: 'wei',
        label: 'WEI',
        sub: '12 Provinces · 4.37M hh',
        color: '#333333',
        path: 'M 150,50 L 280,30 L 380,40 L 450,80 L 500,60 L 550,70 L 600,50 L 650,80 L 680,120 L 700,180 L 650,200 L 600,210 L 500,220 L 400,230 L 300,210 L 200,180 L 140,160 L 120,130 L 130,80 Z',
        labelPos: { x: 400, y: 70 },
        troops: '400k–500k',
    },
    {
        id: 'shu',
        label: 'SHU',
        sub: '1 Province · 280k hh',
        color: '#777777',
        path: 'M 140,160 L 200,180 L 300,210 L 350,230 L 300,280 L 260,310 L 220,330 L 190,310 L 160,270 L 130,220 L 120,180 Z',
        labelPos: { x: 220, y: 250 },
        troops: '102k',
    },
    {
        id: 'wu',
        label: 'WU',
        sub: '3 Provinces · 523k hh',
        color: '#bbbbbb',
        path: 'M 350,230 L 400,230 L 500,220 L 600,210 L 650,200 L 700,180 L 720,230 L 710,280 L 680,320 L 650,340 L 600,360 L 550,380 L 500,390 L 450,380 L 400,360 L 350,340 L 300,310 L 300,280 Z',
        labelPos: { x: 530, y: 290 },
        troops: '230k',
    },
];

const BATTLES_ON_MAP = [
    { name: 'Guandu', year: 200, x: 420, y: 140 },
    { name: 'Red Cliffs', year: 208, x: 480, y: 215 },
    { name: 'Yiling', year: 222, x: 380, y: 260 },
];

export default function TerritorialMap({ isPoster = false }: { isPoster?: boolean }) {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, backgroundColor: 'transparent', boxSizing: 'border-box' }}>
            <div style={{ width: '100%', maxWidth: '1200px', height: isPoster ? 'auto' : '500px', flex: isPoster ? 1 : undefined, minHeight: 0, position: 'relative', overflow: 'visible', background: 'transparent', zIndex: 1 }}>
                <svg width="100%" height="100%" viewBox="0 0 850 430" preserveAspectRatio="xMidYMid meet">
                    <path d={CHINA_PATH} fill="none" stroke="#ddd" strokeWidth="1.5" />
                    {REGIONS.map((region, i) => {
                        return (
                            <g key={region.id}>
                                <motion.path
                                    d={region.path}
                                    fill={region.color}
                                    opacity={0.2}
                                    stroke={region.color}
                                    strokeWidth={1}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.2 }}
                                    transition={{ duration: 0.8, delay: i * 0.3 }}
                                />
                                <text x={region.labelPos.x} y={region.labelPos.y} textAnchor="middle" fill={region.color} fontSize={20} fontFamily={FONT} fontWeight="400" opacity={0.8}>
                                    {region.label}
                                </text>
                                <text x={region.labelPos.x} y={region.labelPos.y + 18} textAnchor="middle" fill={region.color} fontSize="9" fontFamily={FONT} fontWeight="400" opacity={0.6}>
                                    {region.sub}
                                </text>
                            </g>
                        );
                    })}
                    {BATTLES_ON_MAP.map((battle, i) => {
                        return (
                            <g key={battle.name}>
                                <motion.circle cx={battle.x} cy={battle.y} r={6} fill="none" stroke="#333" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 2 + i * 0.2 }} />
                                <text x={battle.x} y={battle.y - 14} textAnchor="middle" fill="#333" fontSize="9" fontFamily={FONT} fontWeight="400">
                                    {battle.name} ({battle.year})
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
