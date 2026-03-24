'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './ishihara-score.module.css';

type ViewState = 'SINGLE' | 'GRID' | 'FILTERED';

interface RGB { r: number; g: number; b: number; }

interface DotNode {
    nx: number;
    ny: number;
    nr: number;
    currentColor: RGB;
    targetColor: RGB;
}

interface Plate {
    id: number;
    numberStr: string;
    dots: DotNode[];
    currentX: number;
    currentY: number;
    currentScale: number;
    targetX: number;
    targetY: number;
    targetScale: number;
}

// Colors closely matching actual Ishihara plates
const ISHIHARA_COLORS = {
    bg: ["#91b8a5", "#a6c7b3", "#b9cbad", "#c0d0af", "#d4d8b6", "#e4deb9", "#d0c99a", "#a2b18a", "#8cb090", "#e8e1bc"],
    num: ["#f29c6b", "#e6734d", "#d95c41", "#cf6d4e", "#b5523b", "#e88054", "#d36544", "#f4a679"]
};

function hexToRgb(hex: string): RGB {
    const bigint = parseInt(hex.slice(1), 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function getRandomColor(type: 'bg' | 'num'): RGB {
    const list = type === 'bg' ? ISHIHARA_COLORS.bg : ISHIHARA_COLORS.num;
    return hexToRgb(list[Math.floor(Math.random() * list.length)]);
}

function getMask(text: string) {
    const size = 400; // Increased resolution
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    if (!ctx) return () => false;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = 'white';
    // Very thick/bold font to ensure dots cover the numbers clearly
    ctx.font = '900 240px "Pretendard", "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, size / 2, size / 2 + 15);
    
    const imgData = ctx.getImageData(0, 0, size, size).data;
    return (nx: number, ny: number) => {
        const px = Math.floor((nx + 1) / 2 * size);
        const py = Math.floor((ny + 1) / 2 * size);
        if (px < 0 || px >= size || py < 0 || py >= size) return false;
        const idx = (py * size + px) * 4;
        return imgData[idx] > 128; // white pixel check
    };
}

function generateUnitCirclePack(count = 3500) {
    const dots: { x: number, y: number, r: number }[] = [];
    const passes = [
        { minR: 0.04, maxR: 0.08, maxFails: 500 },
        { minR: 0.02, maxR: 0.04, maxFails: 1000 },
        { minR: 0.01, maxR: 0.02, maxFails: 2000 },
        { minR: 0.005, maxR: 0.01, maxFails: 5000 }
    ];
    passes.forEach(pass => {
        let fails = 0;
        while (fails < pass.maxFails && dots.length < count) {
            const r = pass.minR + Math.random() * (pass.maxR - pass.minR);
            const maxDist = 1 - r;
            const dist = Math.sqrt(Math.random()) * maxDist;
            const angle = Math.random() * Math.PI * 2;
            const x = Math.cos(angle) * dist;
            const y = Math.sin(angle) * dist;
            
            let overlaps = false;
            for (let i = 0; i < dots.length; i++) {
                const dx = dots[i].x - x;
                const dy = dots[i].y - y;
                if (dx * dx + dy * dy < (dots[i].r + r + 0.003) ** 2) {
                    overlaps = true;
                    break;
                }
            }
            if (!overlaps) {
                dots.push({ x, y, r });
                fails = 0;
            } else {
                fails++;
            }
        }
    });
    return dots;
}

const IshiharaComponent: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [viewState, setViewState] = useState<ViewState>('SINGLE');
    
    const platesRef = useRef<Plate[]>([]);
    const rafRef = useRef<number>(0);

    const initPlates = useCallback(() => {
        const unitDots = generateUnitCirclePack(3500);
        const initialPlates: Plate[] = [];
        for (let i = 0; i < 10; i++) {
            const num = Math.floor(Math.random() * 90 + 10).toString();
            const isInside = getMask(num);
            
            const angleOffset = Math.random() * Math.PI * 2;
            const cosA = Math.cos(angleOffset);
            const sinA = Math.sin(angleOffset);
            
            const plateDots: DotNode[] = unitDots.map(d => {
                const nx = d.x * cosA - d.y * sinA;
                const ny = d.x * sinA + d.y * cosA;
                const inNum = isInside(nx, ny);
                const color = inNum ? getRandomColor('num') : getRandomColor('bg');
                
                return {
                    nx, ny, nr: d.r,
                    currentColor: { ...color },
                    targetColor: { ...color }
                };
            });
            
            initialPlates.push({
                id: i,
                numberStr: num,
                dots: plateDots,
                currentX: 700, currentY: 400, currentScale: 0,
                targetX: 700, targetY: 400, targetScale: i === 0 ? 380 : 0
            });
        }
        platesRef.current = initialPlates;
    }, []);

    // Handle viewState layout targets
    useEffect(() => {
        if (!platesRef.current.length) return;
        const w = 1400; 
        const h = 800;
        
        platesRef.current.forEach((plate, i) => {
            if (viewState === 'SINGLE') {
                plate.targetX = w / 2;
                plate.targetY = h / 2;
                // Diameter will be 380 * 2 = 760, which fits inside height 800 safely
                plate.targetScale = i === 0 ? 380 : 0; 
            } else if (viewState === 'GRID' || viewState === 'FILTERED') {
                const col = i % 5;
                const row = Math.floor(i / 5);
                plate.targetX = 140 + col * 280; 
                plate.targetY = 200 + row * 400; 
                // Grid spacing and 125% scale applied correctly
                plate.targetScale = 125; 
            }
        });
    }, [viewState]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        platesRef.current.forEach((plate) => {
            plate.currentX += (plate.targetX - plate.currentX) * 0.08;
            plate.currentY += (plate.targetY - plate.currentY) * 0.08;
            plate.currentScale += (plate.targetScale - plate.currentScale) * 0.08;
            
            if (plate.currentScale < 1) return; // optimization
            
            plate.dots.forEach(d => {
                d.currentColor.r += (d.targetColor.r - d.currentColor.r) * 0.1;
                d.currentColor.g += (d.targetColor.g - d.currentColor.g) * 0.1;
                d.currentColor.b += (d.targetColor.b - d.currentColor.b) * 0.1;
                
                const px = plate.currentX + d.nx * plate.currentScale;
                const py = plate.currentY + d.ny * plate.currentScale;
                const pr = d.nr * plate.currentScale;
                
                if (pr >= 0.5) {
                    ctx.beginPath();
                    ctx.arc(px, py, pr, 0, Math.PI * 2);
                    ctx.fillStyle = `rgb(${Math.round(d.currentColor.r)},${Math.round(d.currentColor.g)},${Math.round(d.currentColor.b)})`;
                    ctx.fill();
                }
            });
        });
        
        rafRef.current = requestAnimationFrame(draw);
    }, []);

    useEffect(() => {
        initPlates();
        rafRef.current = requestAnimationFrame(draw);
        return () => { cancelAnimationFrame(rafRef.current); };
    }, [draw, initPlates]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowRight' || e.code === 'ArrowDown') {
                e.preventDefault();
                setViewState(prev => {
                    if (prev === 'SINGLE') return 'GRID';
                    if (prev === 'GRID') return 'FILTERED';
                    return 'SINGLE';
                });
            } else if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
                e.preventDefault();
                setViewState(prev => {
                    if (prev === 'FILTERED') return 'GRID';
                    if (prev === 'GRID') return 'SINGLE';
                    return 'FILTERED';
                });
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div 
            className={`${styles.ishiharaContainer} ${viewState === 'FILTERED' ? styles.filtered : ''}`} 
        >
            <canvas 
                ref={canvasRef} 
                width={1400} 
                height={800} 
                className={styles.ishiharaCanvas}
            />
            
            <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
                <filter id="deuteranopia">
                    <feColorMatrix type="matrix" values="
                        0.625 0.375 0 0 0
                        0.7 0.3 0 0 0
                        0 0.3 0.7 0 0
                        0 0 0 1 0" />
                </filter>
            </svg>
        </div>
    );
};

export default IshiharaComponent;
