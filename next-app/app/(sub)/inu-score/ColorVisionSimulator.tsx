'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useCallback } from 'react';

type FilterType = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia';

type ColorVisionSimulatorProps = {
    onClose: () => void;
};

// TouchDesigner-style: Sight node on left, target nodes stacked on right
// SVG coordinate space: 320 × 260
const SVG_W = 320;
const SVG_H = 280;

const NODE_W = 80;
const NODE_H = 26;

// Sight node center
const SIGHT = { x: 60, y: SVG_H / 2 };

// Target nodes — stacked vertically to the right
const TARGETS: { id: FilterType; label: string; desc: string; y: number }[] = [
    { id: 'normal',       label: 'C',  desc: 'Normal',       y: 70  },
    { id: 'protanopia',   label: 'P',  desc: 'Protanopia',   y: 120 },
    { id: 'deuteranopia', label: 'D',  desc: 'Deuteranopia', y: 170 },
    { id: 'tritanopia',   label: 'T',  desc: 'Tritanopia',   y: 220 },
];
const TARGET_X = 210; // center-x of target nodes

// Port positions
const sightOutputPort = { x: SIGHT.x + NODE_W / 2, y: SIGHT.y };
const targetInputX = TARGET_X - NODE_W / 2;

// Bezier from source to target: horizontal S-curve (TouchDesigner style)
function bezier(x1: number, y1: number, x2: number, y2: number) {
    const cx = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
}

export default function ColorVisionSimulator({ onClose }: ColorVisionSimulatorProps) {
    const [activeFilter, setActiveFilter] = useState<FilterType>('normal');
    const [dragging, setDragging] = useState(false);
    const [dragPos, setDragPos] = useState({ x: sightOutputPort.x, y: sightOutputPort.y });
    const [hoveredNode, setHoveredNode] = useState<FilterType | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const getFilterStyle = (filter: FilterType) => {
        switch (filter) {
            case 'protanopia':   return 'url(#protanopia)';
            case 'deuteranopia': return 'url(#deuteranopia)';
            case 'tritanopia':   return 'url(#tritanopia)';
            default:             return 'none';
        }
    };

    const toSVGCoords = useCallback((clientX: number, clientY: number) => {
        const svg = svgRef.current;
        if (!svg) return { x: clientX, y: clientY };
        const rect = svg.getBoundingClientRect();
        return {
            x: (clientX - rect.left) * (SVG_W / rect.width),
            y: (clientY - rect.top)  * (SVG_H / rect.height),
        };
    }, []);

    const onPortDown = (e: React.PointerEvent<SVGCircleElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
        setDragPos(toSVGCoords(e.clientX, e.clientY));
    };

    const onSVGPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
        if (!dragging) return;
        const pos = toSVGCoords(e.clientX, e.clientY);
        setDragPos(pos);

        let hit: FilterType | null = null;
        for (const t of TARGETS) {
            const dx = pos.x - TARGET_X;
            const dy = pos.y - t.y;
            if (Math.abs(dx) < NODE_W / 2 + 16 && Math.abs(dy) < NODE_H / 2 + 12) {
                hit = t.id;
                break;
            }
        }
        setHoveredNode(hit);
    }, [dragging, toSVGCoords]);

    const onSVGPointerUp = useCallback(() => {
        if (dragging && hoveredNode) setActiveFilter(hoveredNode);
        setDragging(false);
        setHoveredNode(null);
        setDragPos({ x: sightOutputPort.x, y: sightOutputPort.y });
    }, [dragging, hoveredNode]);

    return (
        <div style={{ width: '100%', backgroundColor: '#fff', overflowY: 'auto' }}>
            {/* Color matrix filters */}
            <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
                <defs>
                    <filter id="protanopia">
                        <feColorMatrix type="matrix" values="
                            0.152286  1.052583 -0.204868  0  0
                            0.114503  0.786281  0.099216  0  0
                           -0.003882 -0.048116  1.051998  0  0
                            0         0         0         1  0" />
                    </filter>
                    <filter id="deuteranopia">
                        <feColorMatrix type="matrix" values="
                            0.367322  0.860646 -0.227968  0  0
                            0.280085  0.672501  0.047413  0  0
                           -0.011820  0.042940  0.968881  0  0
                            0         0         0         1  0" />
                    </filter>
                    <filter id="tritanopia">
                        <feColorMatrix type="matrix" values="
                            0.9500  0.0500  0.0000  0  0
                            0.0000  0.8000  0.2000  0  0
                            0.0000  0.8000  0.2000  0  0
                            0       0       0       1  0" />
                    </filter>
                </defs>
            </svg>

            {/* Poster Viewer */}
            <div style={{
                width: '100%',
                height: 'calc(100vh - 120px)',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem 50px',
                boxSizing: 'border-box',
            }}>
                {/* Back Button */}
                <div style={{ position: 'absolute', top: '2rem', left: '50px', zIndex: 10 }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent', border: 'none', fontSize: '18px',
                            cursor: 'pointer', color: '#666', display: 'flex',
                            alignItems: 'center', gap: '8px', transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#111'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                        &larr; Back
                    </button>
                </div>

                {/* Poster Image */}
                <img
                    src="/inu-score/sideproject_poster.jpg"
                    alt="Main Poster — Color Vision Simulation"
                    style={{
                        maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
                        filter: getFilterStyle(activeFilter),
                        transition: 'filter 0.35s ease-out',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                        borderRadius: '4px',
                    }}
                />

                {/* ── TouchDesigner-style Node Graph (bottom-left, aligned to poster bottom) ── */}
                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50px',
                    width: `${SVG_W}px`,
                    zIndex: 100,
                    userSelect: 'none',
                }}>
                    <svg
                        ref={svgRef}
                        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                        style={{ width: '100%', height: `${SVG_H}px`, overflow: 'visible', cursor: dragging ? 'grabbing' : 'default' }}
                        onPointerMove={onSVGPointerMove}
                        onPointerUp={onSVGPointerUp}
                        onPointerLeave={onSVGPointerUp}
                    >
                        {/* Static bezier connections to each target */}
                        {TARGETS.map(t => {
                            const isActive = activeFilter === t.id;
                            return (
                                <path
                                    key={`conn-${t.id}`}
                                    d={bezier(sightOutputPort.x, sightOutputPort.y, targetInputX, t.y)}
                                    fill="none"
                                    stroke="#111"
                                    strokeWidth={1}
                                    opacity={isActive ? 1 : 0.18}
                                />
                            );
                        })}

                        {/* Live drag line */}
                        {dragging && (
                            <path
                                d={bezier(sightOutputPort.x, sightOutputPort.y, dragPos.x, dragPos.y)}
                                fill="none"
                                stroke="#111"
                                strokeWidth={1}
                                strokeLinecap="round"
                            />
                        )}

                        {/* Sight: text + output port only */}
                        <text
                            x={SIGHT.x - NODE_W / 2 + 4} y={SIGHT.y}
                            textAnchor="start" dominantBaseline="central"
                            fontSize="12" fontFamily="Helvetica Neue, sans-serif" fill="#111"
                            style={{ pointerEvents: 'none' }}
                        >
                            Sight
                        </text>
                        {/* Output port */}
                        <circle
                            cx={sightOutputPort.x} cy={sightOutputPort.y}
                            r={4}
                            fill="#111"
                            style={{ cursor: 'crosshair' }}
                            onPointerDown={onPortDown}
                        />

                        {/* Target nodes: input dot + text, opacity-controlled */}
                        {TARGETS.map(t => {
                            const isActive = activeFilter === t.id;
                            const isHovered = hoveredNode === t.id;
                            return (
                                <g key={t.id} opacity={isActive ? 1 : 0.5}>
                                    {/* Input port */}
                                    <circle
                                        cx={targetInputX} cy={t.y}
                                        r={4}
                                        fill={isHovered ? '#555' : '#111'}
                                        style={{ pointerEvents: 'none' }}
                                    />
                                    {/* Label */}
                                    <text
                                        x={targetInputX + 12} y={t.y}
                                        textAnchor="start" dominantBaseline="central"
                                        fontSize="12" fontFamily="Helvetica Neue, sans-serif"
                                        fill="#111"
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        {t.label} — {t.desc}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>

            {/* ── Info Section ── */}
            <div style={{
                display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
                padding: '6rem 50px', gap: '4rem', width: '100%', boxSizing: 'border-box',
            }}>
                {/* Left: Metadata */}
                <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '20px', lineHeight: 1.2 }}>
                    <div>Project Name : Divergent Consequences With Single Image</div>
                    <div>Task Scope : Poster Design, Web Design and Development</div>
                    <div>Category : Non-Commercial</div>
                    <div>Completion : Apr. 2026</div>
                </div>

                {/* Right: Description */}
                <div style={{ flex: 1, fontSize: '20px', lineHeight: 1.6, wordBreak: 'keep-all', color: '#111' }}>
                    <p style={{ margin: 0, marginBottom: '1rem' }}>
                        This project was conceived to explore the concept of &lsquo;different outcomes from the same image.&rsquo; Approximately 80 to 85% of human perceptual activity is mediated through vision, and color operates as a particularly powerful cognitive tool.
                    </p>
                    <p style={{ margin: 0, marginBottom: '1rem' }}>
                        According to a study published in Management Decision by Singh (2006), individuals make judgements about an object within 90 S, and 62 to 90% of that assessment is based solely on color. Color Vision Deficiency (CVD) is a condition in which specific hues cannot be distinguished due to a functional abnormality of the cone cells in the retina, and it is broadly classified into three types.
                    </p>
                    <p style={{ margin: 0 }}>
                        By demonstrating that the identical image is reconstructed into entirely different images depending on the specific type of color vision deficiency, this work reveals how scalable and unequal the visual images we take for granted truly are. Depending on each individual&rsquo;s biological conditions, the identical stimulus is translated into profoundly different perceptual realities. Ultimately, this project fosters an awareness of the relativity of the concept of &lsquo;normal vision&rsquo; and raises fundamental questions regarding perceptual diversity and visual equity.
                    </p>

                    {/* EN Footnotes (no #4) */}
                    <div style={{ marginTop: '4rem', lineHeight: 1.6 }}>
                        1. Protanopia: characterized by the absence of long-wavelength sensitive cone cells; results in the inability to distinguish red from green. Approximately 1% of male population is affected.<br />
                        2. Deuteranopia: caused by missing medium-wavelength (green) cones. The most common form of color blindness; affects roughly 1% of males.<br />
                        3. Tritanopia: a rare form caused by absent short-wavelength (blue) cones; individuals confuse blue with green and yellow with violet.
                    </div>

                    {/* KO Description */}
                    <style>{`
                        [data-ko-desc] { font-family: "Pretendard Variable", "Pretendard", sans-serif !important; }
                        [data-ko-desc] * { font-family: inherit; }
                    `}</style>
                    <div data-ko-desc="true" style={{ marginTop: '8rem', lineHeight: 1.6, wordBreak: 'keep-all' }}>
                        <p style={{ margin: 0, marginBottom: '1rem' }}>
                            본 작업은 &ldquo;같은 이미지로부터 다른 결과&rdquo;라는 개념을 탐구하기 위해 진행되었다. 인간의 지각 활동의 80~85%가 시각을 통해 매개되며, 색은 특히 강력한 인지적 도구로 작동한다. Singh(2006)의 Management Decision에 게재된 연구에 따르면 인간은 90초 이내에 대상에 대한 판단을 내리며, 그 중 62~90%가 색에만 기반한다.
                        </p>
                        <p style={{ margin: 0, marginBottom: '1rem' }}>
                            색각 결함(Color Vision Deficiency, CVD)은 망막의 원추세포 기능 이상으로 특정 색을 구별하지 못하는 상태로, 크게 세 가지로 분류된다. Protanopia(제1색맹)는 장파장 감수성 원추세포(L-cone)가 결손되어 적색 스펙트럼 지각이 불가능하며, 남성의 약 1%, 여성의 약 0.01%가 경험한다. Deuteranopia(제2색맹)는 중파장 감수성 원추세포(M-cone)가 결손된 가장 흔한 형태로, 역시 남성의 약 1%, 여성의 약 0.01%가 이에 해당한다. Tritanopia(제3색맹)는 단파장 감수성 원추세포(S-cone)가 결손되어 청색-황색 구별에 어려움을 겪는 매우 희귀한 형태로, 약 0.01%가 경험한다.
                        </p>
                        <p style={{ margin: 0, marginBottom: '4rem' }}>
                            본 작업은 동일한 이미지가 각 색각 결함 유형에 따라 전혀 다른 이미지로 재구성됨을 보여줌으로써, 우리가 당연시하는 시각적 이미지가 얼마나 불안정하고 불평등한 것인지를 드러낸다. 각 개인의 생물학적 조건에 따라 동일한 자극이 전혀 다른 지각적 현실로 번역되며, 이 작업은 &ldquo;정상 시각&rdquo;이라는 개념의 상대성을 인식하게 하고 지각적 다양성과 시각적 형평성에 관한 근본적 질문을 제기한다.
                        </p>
                        {/* KO Footnotes (no #4) */}
                        <div style={{ lineHeight: 1.6 }}>
                            1. Protanopia(제1색맹): 장파장 감수성 원추세포(L-cone)가 결손되어 적색 계열의 색 지각이 불가능한 상태로, 남성 인구의 약 1%가 이에 해당한다.<br />
                            2. Deuteranopia(제2색맹): 중파장 감수성 원추세포(M-cone)가 결손된 가장 흔한 색각 결함 유형으로, 남성의 약 1%가 경험한다.<br />
                            3. Tritanopia(제3색맹): 단파장 감수성 원추세포(S-cone)가 결손되어 청색-황색 구별에 어려움을 겪는 매우 희귀한 형태로, 전체 인구의 약 0.01%가 해당한다.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
