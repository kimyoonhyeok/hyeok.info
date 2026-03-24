'use client';

import React, { useEffect, useState } from 'react';
import styles from './holbein-score.module.css';

type ViewState = 'FRONT' | 'ANAMORPHIC';

const HolbeinComponent: React.FC = () => {
    const [viewState, setViewState] = useState<ViewState>('FRONT');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowRight' || e.code === 'ArrowDown') {
                e.preventDefault();
                setViewState(prev => prev === 'FRONT' ? 'ANAMORPHIC' : 'FRONT');
            } else if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
                e.preventDefault();
                setViewState(prev => prev === 'ANAMORPHIC' ? 'FRONT' : 'ANAMORPHIC');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleClick = () => {
        setViewState(prev => prev === 'FRONT' ? 'ANAMORPHIC' : 'FRONT');
    };

    return (
        <div className={styles.holbeinContainer} onClick={handleClick}>
            <div className={`${styles.canvasWrapper} ${viewState === 'ANAMORPHIC' ? styles.anamorphic : ''}`}>
                <img 
                    src="/inu-score/01.jpg" 
                    alt="The Ambassadors by Hans Holbein" 
                    className={styles.painting} 
                />
            </div>
        </div>
    );
};

export default HolbeinComponent;
