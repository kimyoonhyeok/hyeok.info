"use client";

import React, { useEffect, useRef } from 'react';

const KoricaThumbnail = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Colors: Red, Green, Blue
    // We will use 'lighter' (Additive) blending on the Canvas.
    // Red + Green = Yellow
    // Green + Blue = Cyan
    // Blue + Red = Magenta
    const circles = useRef([
        { x: 50, y: 50, dx: 1.5, dy: 1.2, color: '#ff0000' }, // Red
        { x: 150, y: 80, dx: -1.2, dy: 1.5, color: '#00ff00' }, // Green
        { x: 100, y: 150, dx: 1.0, dy: -1.3, color: '#0000ff' } // Blue
    ]);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;

        const animate = () => {
            if (!container || !canvas) return;
            const { clientWidth, clientHeight } = container;

            if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
                canvas.width = clientWidth;
                canvas.height = clientHeight;
            }

            const circleRadius = clientWidth * 0.25;
            const offset = circleRadius;
            const diameter = circleRadius * 2;

            // 1. Clear Canvas (Transparent)
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 2. Enable Additive Mixing for Circles
            ctx.globalCompositeOperation = 'lighter';

            // Update positions and Draw Circles
            circles.current.forEach((c, i) => {
                // Wall bouncing
                if (c.x <= 0 || c.x + diameter >= clientWidth) c.dx *= -1;
                if (c.y <= 0 || c.y + diameter >= clientHeight) c.dy *= -1;

                c.x += c.dx;
                c.y += c.dy;
                c.x = Math.max(0, Math.min(c.x, clientWidth - diameter));
                c.y = Math.max(0, Math.min(c.y, clientHeight - diameter));

                // Draw Circle on Canvas
                ctx.beginPath();
                ctx.arc(c.x + offset, c.y + offset, circleRadius, 0, Math.PI * 2);
                ctx.fillStyle = c.color;
                ctx.fill();

                // Update DOM Element (Invisible, just for structure if needed, or remove? 
                // We are drawing on canvas now, do we need divs? 
                // KoricaThumbnail logic was Hybrid. 
                // If we draw on Canvas, we don't strictly need the Divs for visual.
                // BUT the Divs were used for 'mix-blend-mode'. 
                // Since we do blending in Canvas now, we can hide the divs or remove them.
                // I will keep them but fully transparent just in case we need them for layout/debug, 
                // but actually 'lighter' on canvas replaces the CSS blend mode need.
                // For performance and cleanliness, I'll rely on Canvas for the circles.
                const el = circleRefs.current[i];
                if (el) {
                    el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
                }
            });

            // 3. Reset Composite for Lines/Dots (Source Over)
            ctx.globalCompositeOperation = 'source-over';

            // Draw Lines
            ctx.beginPath();
            ctx.strokeStyle = "rgba(0, 0, 0, 1)"; // Black Lines
            ctx.lineWidth = 1;

            circles.current.forEach((c, i) => {
                const next = circles.current[(i + 1) % 3];
                const cx = c.x + offset;
                const cy = c.y + offset;
                const nx = next.x + offset;
                const ny = next.y + offset;

                if (i === 0) ctx.moveTo(cx, cy);
                ctx.lineTo(nx, ny);
            });
            const first = circles.current[0];
            ctx.lineTo(first.x + offset, first.y + offset);
            ctx.stroke();

            // Draw Dots
            circles.current.forEach((c) => {
                const cx = c.x + offset;
                const cy = c.y + offset;
                ctx.fillStyle = "black";
                ctx.fillRect(cx - 3, cy - 3, 6, 6);
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#ffffff' // White Background
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1
                }}
            />
            {/* Divs are logically present but visually hidden compared to Canvas. 
                They could be removed if Canvas handles everything. 
                Keeping them as 'opacity: 0' to avoid ghost interactions or confusion.
            */}
            {circles.current.map((c, i) => (
                <div
                    key={i}
                    ref={el => { circleRefs.current[i] = el; }}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '50%',
                        paddingBottom: '50%',
                        borderRadius: '50%',
                        backgroundColor: c.color,
                        opacity: 0, // Hidden, Canvas draws the circles
                        zIndex: 2,
                        pointerEvents: 'none'
                    }}
                />
            ))}
        </div>
    );
};

export default KoricaThumbnail;
