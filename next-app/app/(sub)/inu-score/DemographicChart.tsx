'use client';

import React from 'react';
import { motion } from 'framer-motion';

const FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const KINGDOMS = [
    { id: 'wei', label: 'Wei', households: 4370000, troops: '400k–500k', year: '263 AD', color: '#333333' },
    { id: 'shu', label: 'Shu', households: 280000, troops: '102k', year: '263 AD', color: '#777777' },
    { id: 'wu', label: 'Wu', households: 523000, troops: '230k', year: '280 AD', color: '#bbbbbb' },
];

const maxH = KINGDOMS[0].households;

export default function DemographicChart({ isPoster = false, fixedMode = 'historical' }: { isPoster?: boolean, fixedMode?: 'historical' | 'fiction' }) {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: FONT, boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: isPoster ? '10px' : '2rem' }}>
                {KINGDOMS.map((k, i) => {
                    let pct = (k.households / maxH) * 100;
                    
                    // In fiction mode, we equalize Shu's visual representation
                    if (fixedMode === 'fiction' && k.id === 'shu') {
                        pct = 95; // Inflate Shu bar for fiction
                    } else if (fixedMode === 'fiction' && k.id === 'wei') {
                        pct = 45; // Deflate Wei slightly
                    }

                    const isActive = fixedMode === 'historical' ? k.id === 'wei' : k.id === 'shu';
                    const opacity = isActive ? 1 : 0.3;
                    const labelInside = pct > 40;

                    return (
                        <div key={k.id} style={{ display: 'flex', alignItems: 'center', gap: isPoster ? '0.75rem' : '1.5rem' }}>
                            <div style={{ width: isPoster ? '40px' : '80px', textAlign: 'left' }}>
                                <span style={{ fontSize: isPoster ? '11px' : '1rem', fontWeight: 500, color: '#333', fontFamily: FONT }}>{k.label}</span>
                            </div>
                            <div style={{ flex: 1, position: 'relative', height: isPoster ? '20px' : '40px' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 1.2, delay: i * 0.3, ease: 'easeOut' }}
                                    style={{
                                        height: '100%',
                                        background: k.color,
                                        borderRadius: '2px',
                                        opacity: opacity,
                                        position: 'relative',
                                    }}
                                >
                                    {labelInside && (
                                        <span style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', fontSize: isPoster ? '9px' : '0.8rem', color: '#fff', fontWeight: 400, whiteSpace: 'nowrap' }}>
                                            {isPoster ? `${k.households.toLocaleString()} hh` : `${k.households.toLocaleString()} households`}
                                        </span>
                                    )}
                                </motion.div>
                                {!labelInside && (
                                    <span style={{ position: 'absolute', left: `calc(${pct}% + 6px)`, top: '50%', transform: 'translateY(-50%)', fontSize: isPoster ? '9px' : '0.8rem', color: '#555', fontWeight: 400, whiteSpace: 'nowrap' }}>
                                        {isPoster ? `${k.households.toLocaleString()} hh` : `${k.households.toLocaleString()} households`}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
