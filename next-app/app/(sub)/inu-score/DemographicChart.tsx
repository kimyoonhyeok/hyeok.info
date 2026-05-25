'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FONT = '"Pretendard Variable", "Pretendard", sans-serif';

// Historical census data
const TOTAL_HAN = 10670000; // 157 AD: ~10.67M households
const TOTAL_JIN = 2450000;  // 280 AD: ~2.45M households

const KINGDOMS = [
    { id: 'wei', label: 'Wei (魏)', households: 4370000, troops: '400k–500k', color: '#2962ff', year: '263 AD' },
    { id: 'shu', label: 'Shu (蜀)', households: 280000, troops: '102k', color: '#00c853', year: '263 AD' },
    { id: 'wu', label: 'Wu (吳)', households: 523000, troops: '230k', color: '#d50000', year: '280 AD' },
];

const maxH = KINGDOMS[0].households;

export default function DemographicChart({ isPoster = false }: { isPoster?: boolean }) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: isPoster ? 'flex-start' : 'center',
            padding: isPoster ? '0px' : '4vh 4vw',
            fontFamily: FONT,
            backgroundColor: 'transparent',
            boxSizing: 'border-box'
        }}>
            
            {/* Header / Text */}
            <div style={isPoster ? {
                width: '100%',
                padding: '4px 8px 12px 8px',
                boxSizing: 'border-box',
                zIndex: 10
            } : {
                position: 'absolute', bottom: '4vh', left: '4vw', textAlign: 'left', zIndex: 10
            }}>
                <h3 style={{ fontFamily: FONT, fontSize: isPoster ? '11px' : '1.2rem', margin: 0, fontWeight: 400, color: '#3e3129' }}>
                    Household Census Comparison
                </h3>
                {!isPoster && (
                    <>
                        <p style={{ fontFamily: FONT, fontSize: '0.85rem', color: '#6a5a4a', margin: '0.5rem 0 0 0', fontWeight: 400 }}>
                            Y-Axis metric for infographic — based on historical records
                        </p>
                        <div style={{ marginTop: '1rem', fontSize: '0.7rem', color: '#998f82', fontFamily: FONT, fontWeight: 400 }}>
                            * Wei held ~85% of total Three Kingdoms population.<br/>
                            Data from Rafe de Crespigny (2007) & Mark Edward Lewis (2009).
                        </div>
                    </>
                )}
                {isPoster && (
                    <p style={{ fontFamily: FONT, fontSize: '9px', lineHeight: '14.56px', color: '#6a5a4a', margin: '4px 0 0 0', fontWeight: 400 }}>
                        * Wei held ~85% of total population
                    </p>
                )}
            </div>

            {/* Content Container */}
            <div style={{
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                flexDirection: 'column',
                gap: isPoster ? '12px' : '3rem',
                flex: isPoster ? 1 : undefined,
                minHeight: 0,
                justifyContent: isPoster ? 'space-around' : 'center',
                zIndex: 1
            }}>

            {/* Decline overview */}
            <div style={{ marginBottom: isPoster ? '0px' : '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: isPoster ? '6px' : '0.75rem' }}>
                    <span style={{ fontSize: isPoster ? '9px' : '0.75rem', lineHeight: isPoster ? '14.56px' : 'normal', color: '#999', fontWeight: 400, width: isPoster ? '50px' : '80px', fontFamily: FONT }}>157 AD</span>
                    <div style={{ flex: 1, position: 'relative', height: isPoster ? '18px' : '28px' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            style={{ height: '100%', background: 'linear-gradient(90deg, #e8e8e8, #d0d0d0)', borderRadius: '4px' }}
                        />
                        <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: isPoster ? '9px' : '0.75rem', lineHeight: isPoster ? '14.56px' : 'normal', color: '#666', fontWeight: 400, fontFamily: FONT }}>
                            {isPoster ? '10.67M households (Late Han)' : '10,670,000 households (Late Han)'}
                        </span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: isPoster ? '9px' : '0.75rem', lineHeight: isPoster ? '14.56px' : 'normal', color: '#999', fontWeight: 400, width: isPoster ? '50px' : '80px', fontFamily: FONT }}>280 AD</span>
                    <div style={{ flex: 1, position: 'relative', height: isPoster ? '18px' : '28px' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(TOTAL_JIN / TOTAL_HAN) * 100}%` }}
                            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                            style={{ height: '100%', background: 'linear-gradient(90deg, #bbb, #999)', borderRadius: '4px' }}
                        />
                        <span style={{ position: 'absolute', left: `${(TOTAL_JIN / TOTAL_HAN) * 100 + 1}%`, top: '50%', transform: 'translateY(-50%)', fontSize: isPoster ? '9px' : '0.75rem', lineHeight: isPoster ? '14.56px' : 'normal', color: '#666', fontWeight: 400, fontFamily: FONT, whiteSpace: 'nowrap' }}>
                            {isPoster ? '2.45M (Jin) · -77% decline' : '2,450,000 households (Jin) — 77% decline'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Three Kingdoms comparison */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: isPoster ? '10px' : '2rem' }}>
                {KINGDOMS.map((k, i) => {
                    const pct = (k.households / maxH) * 100;
                    const isHovered = hoveredId === k.id;
                    const labelInside = pct > 40;
                    return (
                        <div
                            key={k.id}
                            style={{ display: 'flex', alignItems: 'center', gap: isPoster ? '0.75rem' : '1.5rem', cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredId(k.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div style={{ width: isPoster ? '60px' : '80px', textAlign: 'left' }}>
                                <span style={{ fontSize: isPoster ? '9px' : '1rem', lineHeight: isPoster ? '14.56px' : 'normal', fontWeight: 400, color: isHovered ? k.color : '#333', transition: 'color 0.3s', fontFamily: FONT }}>
                                    {k.label}
                                </span>
                                <br />
                                <span style={{ fontSize: isPoster ? '9px' : '0.7rem', lineHeight: isPoster ? '14.56px' : 'normal', color: '#aaa', fontFamily: FONT, fontWeight: 400 }}>{k.year}</span>
                            </div>
                            <div style={{ flex: 1, position: 'relative', height: isPoster ? '20px' : '40px' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 1.2, delay: 0.3 + i * 0.3, ease: 'easeOut' }}
                                    style={{
                                        height: '100%',
                                        background: k.color,
                                        borderRadius: '4px',
                                        opacity: isHovered ? 1 : 0.75,
                                        transition: 'opacity 0.3s',
                                        position: 'relative',
                                    }}
                                >
                                    {labelInside && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1 + i * 0.3 }}
                                            style={{
                                                position: 'absolute',
                                                right: isPoster ? '6px' : '12px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                fontSize: isPoster ? '9px' : '0.8rem',
                                                lineHeight: isPoster ? '14.56px' : 'normal',
                                                color: '#fff',
                                                fontWeight: 400,
                                                fontFamily: FONT,
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {isPoster ? `${k.households.toLocaleString()} hh · ${k.troops}` : `${k.households.toLocaleString()} households · troops ${k.troops}`}
                                        </motion.span>
                                    )}
                                </motion.div>
                                {!labelInside && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 + i * 0.3 }}
                                        style={{
                                            position: 'absolute',
                                            left: `calc(${pct}% + ${isPoster ? '6px' : '12px'})`,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            fontSize: isPoster ? '9px' : '0.8rem',
                                            lineHeight: isPoster ? '14.56px' : 'normal',
                                            color: '#555',
                                            fontWeight: 400,
                                            fontFamily: FONT,
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {isPoster ? `${k.households.toLocaleString()} hh · ${k.troops}` : `${k.households.toLocaleString()} households · troops ${k.troops}`}
                                    </motion.span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            </div>
        </div>
    );
}
