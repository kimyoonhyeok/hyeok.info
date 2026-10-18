"use client";
import React from 'react';
import styles from './Chapter1Diagrams.module.css';

export const CoordinateMatrix = () => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

    const getStyle = (index: number) => {
        const isHovered = hoveredIndex === index;
        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
        return {
            opacity: isOtherHovered ? 0.25 : 1,
            transform: isHovered ? 'scale(1.075)' : 'scale(1)',
            transition: 'all 0.3s ease-in-out',
            cursor: 'pointer',
            zIndex: isHovered ? 10 : 1,
            position: 'relative' as const
        };
    };

    const cells = [
        { bg: '#b3b3b3', labels: ['Distance(X): Low', 'Hierarchy(Y): High'] },
        { bg: '#999999', labels: ['Distance(X): Mid', 'Hierarchy(Y): High'] },
        { bg: '#808080', labels: ['Distance(X): High', 'Hierarchy(Y): High'] },
        { bg: '#cccccc', labels: ['Distance(X): Low', 'Hierarchy(Y): Mid'] },
        { bg: '#b3b3b3', labels: ['Distance(X): Mid', 'Hierarchy(Y): Mid'] },
        { bg: '#999999', labels: ['Distance(X): High', 'Hierarchy(Y): Mid'] },
        { bg: '#e6e6e6', labels: ['Distance(X): Low', 'Hierarchy(Y): Low'] },
        { bg: '#cccccc', labels: ['Distance(X): Mid', 'Hierarchy(Y): Low'] },
        { bg: '#b3b3b3', labels: ['Distance(X): High', 'Hierarchy(Y): Low'] }
    ];

    return (
        <div className={styles.matrixWrapper}>
            <div className={styles.yLabel}>y-axis: Hierarchy</div>
            <div className={styles.matrixContainer}>
                {cells.map((cell, idx) => (
                    <div 
                        key={idx} 
                        className={styles.matrixCell} 
                        style={{ backgroundColor: cell.bg, ...getStyle(idx) }}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => setHoveredIndex(prev => prev === idx ? null : idx)}
                    >
                        <span>{cell.labels[0]}</span><span>{cell.labels[1]}</span>
                    </div>
                ))}
            </div>
            <div className={styles.xLabel}>x-axis: Distance</div>
        </div>
    );
};

export const SymbolLegend = () => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

    const getStyle = (index: number) => {
        const isHovered = hoveredIndex === index;
        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
        return {
            opacity: isOtherHovered ? 0.25 : 1,
            transform: isHovered ? 'scale(1.075)' : 'scale(1)',
            transition: 'all 0.3s ease-in-out',
            cursor: 'pointer',
            zIndex: isHovered ? 10 : 1,
            position: 'relative' as const
        };
    };

    return (
        <div className={styles.legendContainer}>
            <div className={styles.legendRow}>
                <div 
                    className={styles.legendItem}
                    style={getStyle(0)}
                    onMouseEnter={() => setHoveredIndex(0)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setHoveredIndex(prev => prev === 0 ? null : 0)}
                >
                    <div className={`${styles.circle} ${styles.neutralBorder}`}></div>
                    <strong style={{ color: '#ff5500' }}>Gender-Neutral : 성별 무관</strong>
                    <p>Indicates a condition that applies universally without distinguishing the gender of the speaker or the listener.</p>
                    <p className={styles.legendKr}>화자 또는 청자의 성별 조건을 구별하지 않고 보편적으로 적용되는 상태를 나타냅니다.</p>
                </div>
                <div 
                    className={styles.legendItem}
                    style={getStyle(1)}
                    onMouseEnter={() => setHoveredIndex(1)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setHoveredIndex(prev => prev === 1 ? null : 1)}
                >
                    <div className={styles.square} style={{ backgroundColor: '#fdf4f4' }}></div>
                    <strong style={{ color: '#8b0000' }}>Kinship Boundary : Closed / 친족 경계 : 닫힘</strong>
                    <p>Defines a domain strictly limited to biological or legal kinship, without extending to non-kin others.</p>
                    <p className={styles.legendKr}>생물학적 혹은 법적 혈연관계 내부로만 사용이 제한되며, 비혈연 타인에게 확장되지 않는 영역을 정의합니다.</p>
                </div>
            </div>
            <div className={styles.legendRow}>
                <div 
                    className={styles.legendItem}
                    style={getStyle(2)}
                    onMouseEnter={() => setHoveredIndex(2)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setHoveredIndex(prev => prev === 2 ? null : 2)}
                >
                    <div className={`${styles.circle} ${styles.femaleBorder}`}></div>
                    <strong style={{ color: '#998833' }}>Female : 여성</strong>
                    <p>Indicates a condition where the speaker or the target of the address term is restricted to females.</p>
                    <p className={styles.legendKr}>호칭 사용의 주체 또는 대상이 여성으로 한정되는 조건을 나타냅니다.</p>
                </div>
                <div 
                    className={styles.legendItem}
                    style={getStyle(3)}
                    onMouseEnter={() => setHoveredIndex(3)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setHoveredIndex(prev => prev === 3 ? null : 3)}
                >
                    <div className={styles.square} style={{ backgroundColor: '#f0fbfb' }}></div>
                    <strong style={{ color: '#40e0d0' }}>In-group : 내집단</strong>
                    <p>Defines a domain within a group that shares a specific institution, organization or sustained private network.</p>
                    <p className={styles.legendKr}>특정 기관, 조직, 또는 지속적인 사적 관계망을 공유하는 집단 내부의 영역을 정의합니다.</p>
                </div>
            </div>
            <div className={styles.legendRow}>
                <div 
                    className={styles.legendItem}
                    style={getStyle(4)}
                    onMouseEnter={() => setHoveredIndex(4)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setHoveredIndex(prev => prev === 4 ? null : 4)}
                >
                    <div className={`${styles.circle} ${styles.maleBorder}`}></div>
                    <strong style={{ color: '#4a3b8c' }}>Male : 남성</strong>
                    <p>Indicates a condition where the speaker or the target of the address term is restricted to males.</p>
                    <p className={styles.legendKr}>호칭 사용의 주체 또는 대상이 남성으로 한정되는 조건을 나타냅니다.</p>
                </div>
                <div 
                    className={styles.legendItem}
                    style={getStyle(5)}
                    onMouseEnter={() => setHoveredIndex(5)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setHoveredIndex(prev => prev === 5 ? null : 5)}
                >
                    <div className={styles.square} style={{ backgroundColor: '#fdfde8' }}></div>
                    <strong style={{ color: '#808000' }}>Out-group : 외집단</strong>
                    <p>Defines a relational domain characterized by public spaces, one-time transactional exchanges, or unfamiliar strangers with whom no private boundary is shared.</p>
                    <p className={styles.legendKr}>사적인 경계를 공유하지 않는 공적 영역, 일회성 거래 관계, 또는 낯선 타인과의 관계 영역을 정의합니다.</p>
                </div>
            </div>
        </div>
    );
};

export type GenderType = 'neutral' | 'female' | 'male' | 'combined';
export type BoundaryType = 'kinship' | 'ingroup' | 'outgroup' | 'none';

export interface RelationalDiagramProps {
    speakerGender: GenderType;
    targetGender: GenderType;
    targetX: number; // 0 to 3 (0=None/N/A, 1=Low, 2=Mid, 3=High)
    targetY: number; // 0 to 3 (0=None/N/A, 1=Low, 2=Mid, 3=High)
    target2Gender?: GenderType;
    target2X?: number;
    target2Y?: number;
    target2Label?: string;
    boundary: BoundaryType;
    speakerLabel: string;
    targetLabel?: string;
    distanceLabel: string;
    boundaryLabel?: string;
    autoHint?: boolean;
    /** Thumbnail mode: crops to the plot area (1:1), hides text, thickens strokes, disables interaction. */
    compact?: boolean;
}

export const RelationalDiagram: React.FC<RelationalDiagramProps> = ({
    speakerGender,
    targetGender,
    targetX,
    targetY,
    target2Gender,
    target2X,
    target2Y,
    target2Label,
    boundary,
    speakerLabel,
    targetLabel,
    distanceLabel,
    boundaryLabel,
    autoHint: autoHintProp = false,
    compact = false
}) => {
    const autoHint = autoHintProp && !compact;
    const [hoveredNode, setHoveredNode] = React.useState<'speaker' | 'target' | 'target2' | null>(null);
    const [hintNode, setHintNode] = React.useState<'speaker' | 'target' | 'target2' | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = React.useState(false);

    const isSamePos = targetX === 0 && targetY === 0;
    const hasTarget2 = target2Gender !== undefined && target2X !== undefined && target2Y !== undefined;

    React.useEffect(() => {
        if (!containerRef.current || !autoHint) return;
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0.5 });
        
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [autoHint]);

    React.useEffect(() => {
        if (!autoHint || !isVisible) {
            setHintNode(null);
            return;
        }

        let timeoutId: NodeJS.Timeout;
        let intervalId: NodeJS.Timeout;

        if (hoveredNode === null) {
            // Idle for 2.5s -> start animation
            timeoutId = setTimeout(() => {
                setHintNode('speaker');
                intervalId = setInterval(() => {
                    setHintNode(prev => {
                        if (isSamePos) return prev === 'speaker' ? null : 'speaker';
                        if (hasTarget2) {
                            if (prev === 'speaker') return 'target';
                            if (prev === 'target') return 'target2';
                            return 'speaker';
                        }
                        return prev === 'speaker' ? 'target' : 'speaker';
                    });
                }, 1500); // toggle every 1.5s
            }, 2500);
        } else {
            // User interacted -> clear hint
            setHintNode(null);
        }

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [autoHint, hoveredNode, isSamePos, isVisible]);

    const genderColors: Record<GenderType, string> = {
        neutral: '#ff5500',
        female: '#998833',
        male: '#4a3b8c',
        combined: '#ff5500'
    };

    const boundaryColors: Record<BoundaryType, { bg: string; text: string }> = {
        kinship: { bg: '#faf4f4', text: '#8b0000' },
        ingroup:  { bg: '#eef8f8', text: '#2ecfbf' },
        outgroup: { bg: '#f8f8ea', text: '#7a7a00' },
        none:     { bg: 'transparent', text: 'transparent' }
    };

    const bColor = boundaryColors[boundary];

    // ── SVG coordinate system ──────────────────────────────────────────────────
    // viewBox: "0 0 W H"  where W=750, H=920
    // The axis frame (plotArea) sits inside with padding so nodes partially
    // outside the frame still render (SVG overflow is visible).
    //
    //  leftPad  = 130  (room for y-axis label + speaker circle half + speaker label)
    //  topPad   = 60   (room for boundary label)
    //  axisLen  = 540  (length of each axis, divided into 3 equal segments = 180 per unit)
    //  botPad   = 220  (room for speaker circle half + speaker label below axis)
    //  rightPad = 80   (room for x-axis label)
    //
    //  Total W = leftPad + axisLen + rightPad = 130 + 540 + 80  = 750
    //  Total H = topPad  + axisLen + botPad   =  60 + 540 + 220 = 820
    // ──────────────────────────────────────────────────────────────────────────
    const leftPad = 130;
    const topPad  = 90;
    const axisLen = 540;
    const unit    = axisLen / 3; // 180
    const botPad  = 220;
    const rightPad = 220;

    const VW = leftPad + axisLen + rightPad; // 890
    const VH = topPad + axisLen + botPad;   // 850

    // Origin (0,0) of the relational coordinate system (bottom-left of the plot box)
    const ox = leftPad;
    const oy = topPad + axisLen; // = 630

    // Helper: convert relational coords → SVG coords
    const toSVG = (rx: number, ry: number) => ({
        x: ox + rx * unit,
        y: oy - ry * unit
    });

    const speakerPt  = toSVG(0, 0);          // always at origin
    const targetPt   = toSVG(targetX, targetY);
    const target2Pt  = hasTarget2 ? toSVG(target2X!, target2Y!) : { x: 0, y: 0 };

    const circleR    = 44;  // px in viewBox units — matches PDF proportion
    const dotR       = 4;

    const speakerColor = genderColors[speakerGender === 'combined' ? 'neutral' : speakerGender];
    const targetColor  = genderColors[targetGender];
    const target2Color = target2Gender ? genderColors[target2Gender] : '#7c7c7c';

    const activeNode = hoveredNode || hintNode;

    const getStyle = (node: 'speaker' | 'target' | 'target2') => {
        const isHovered = activeNode === node;
        const isOtherHovered = activeNode !== null && activeNode !== node;
        let pt = speakerPt;
        if (node === 'target') pt = targetPt;
        if (node === 'target2') pt = target2Pt;
        
        return {
            opacity: isOtherHovered ? 0.25 : 1,
            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
            transformOrigin: `${pt.x}px ${pt.y}px`,
            transition: 'all 0.3s ease-in-out',
            cursor: 'pointer'
        };
    };

    // Is "combined" mode (single label for both)?
    const isCombined = speakerLabel === 'combined';

    return (
        <div ref={containerRef} className={compact ? styles.diagramCompact : styles.diagramWrapper}>
            <svg
                viewBox={compact ? `${leftPad - 60} ${topPad - 60} ${axisLen + 120} ${axisLen + 120}` : `0 0 ${VW} ${VH}`}
                className={compact ? styles.compactSvg : undefined}
                style={{ width: '100%', height: '100%', overflow: 'visible' }}
                aria-hidden={compact ? true : undefined}
            >
                {/* ── Background Boundary ────────────────────────────────────── */}
                {boundary !== 'none' && (
                    <rect
                        x={ox}
                        y={topPad}
                        width={axisLen}
                        height={axisLen}
                        fill={bColor.bg}
                    />
                )}

                {/* ── Boundary Label (top-center of plot area) ───────────────── */}
                {boundary !== 'none' && boundaryLabel && (
                    <text
                        x={ox + axisLen / 2}
                        y={topPad - 22}
                        textAnchor="middle"
                        fill={bColor.text}
                        fontSize="18"
                        fontWeight="bold"
                        fontFamily="'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif"
                    >
                        {boundaryLabel}
                    </text>
                )}

                {/* ── Dashed grid lines ──────────────────────────────────────── */}
                {[1, 2, 3].map(i => (
                    <line
                        key={`hy${i}`}
                        x1={ox}         y1={oy - i * unit}
                        x2={ox + axisLen} y2={oy - i * unit}
                        stroke="#c8c8c8" strokeDasharray="8,8" strokeWidth="1"
                    />
                ))}
                {[1, 2, 3].map(i => (
                    <line
                        key={`vx${i}`}
                        x1={ox + i * unit} y1={oy}
                        x2={ox + i * unit} y2={oy - axisLen}
                        stroke="#c8c8c8" strokeDasharray="8,8" strokeWidth="1"
                    />
                ))}

                {/* ── Axes ───────────────────────────────────────────────────── */}
                {/* X axis */}
                <line x1={ox} y1={oy} x2={ox + axisLen} y2={oy} stroke="#aaa" strokeWidth="1.5" />
                {/* Y axis */}
                <line x1={ox} y1={oy} x2={ox} y2={oy - axisLen} stroke="#aaa" strokeWidth="1.5" />

                {/* ── Axis Labels ────────────────────────────────────────────── */}
                {/* x-axis label: right of x-axis */}
                <text
                    x={ox + axisLen + 12}
                    y={oy + 5}
                    fill="#000000"
                    fontSize="16"
                    fontWeight="400"
                    fontFamily="'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif"
                    dominantBaseline="middle"
                >
                    x-axis: Distance
                </text>

                {/* y-axis label: rotated, left of y-axis */}
                <text
                    x={ox - 72}
                    y={topPad + axisLen / 2}
                    fill="#000000"
                    fontSize="16"
                    fontWeight="400"
                    fontFamily="'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif"
                    textAnchor="middle"
                    transform={`rotate(-90, ${ox - 72}, ${topPad + axisLen / 2})`}
                >
                    y-axis: Hierarchy
                </text>

                {/* ── Connection Line ────────────────────────────────────────── */}
                <line
                    x1={speakerPt.x} y1={speakerPt.y}
                    x2={targetPt.x}  y2={targetPt.y}
                    stroke="#999" strokeWidth="1.5"
                    style={{
                        opacity: activeNode ? 0.25 : 1,
                        transition: 'opacity 0.3s ease-in-out'
                    }}
                />

                {/* ── Speaker Group ─────────────────────────────────────────── */}
                <g
                    onMouseEnter={() => setHoveredNode('speaker')}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => setHoveredNode(prev => prev === 'speaker' ? null : 'speaker')}
                    style={getStyle('speaker')}
                >
                    <circle cx={speakerPt.x} cy={speakerPt.y} r={circleR} fill="transparent" stroke={speakerColor} strokeWidth="2.5" />
                    <circle cx={speakerPt.x} cy={speakerPt.y} r={dotR} fill="#7c7c7c" />

                    {!isCombined && (
                        <text
                            x={speakerPt.x}
                            y={speakerPt.y + circleR + 18}
                            fill={speakerColor}
                            fontSize="18"
                            fontWeight="bold"
                            fontFamily="'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif"
                            textAnchor="middle"
                        >
                            {speakerLabel.split('\n').map((line, i) => (
                                <tspan x={speakerPt.x} dy={i === 0 ? 0 : 24} key={i}>{line}</tspan>
                            ))}
                        </text>
                    )}
                </g>

                {/* ── Target Group (only if different position) ─────────────── */}
                {!isSamePos && (
                    <g
                        onMouseEnter={() => setHoveredNode('target')}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => setHoveredNode(prev => prev === 'target' ? null : 'target')}
                        style={getStyle('target')}
                    >
                        <circle cx={targetPt.x} cy={targetPt.y} r={circleR} fill="transparent" stroke={targetColor} strokeWidth="2.5" />
                        <circle cx={targetPt.x} cy={targetPt.y} r={dotR} fill="#7c7c7c" />

                        {!isCombined && targetLabel && (
                            <text
                                x={hasTarget2 ? targetPt.x : targetPt.x + circleR + 10}
                                y={hasTarget2 ? targetPt.y - circleR - 34 : targetPt.y - circleR - 10}
                                fill={targetColor}
                                fontSize="18"
                                fontWeight="bold"
                                fontFamily="'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif"
                                textAnchor={hasTarget2 ? "middle" : "start"}
                            >
                                {targetLabel.split('\n').map((line, i) => (
                                    <tspan x={hasTarget2 ? targetPt.x : targetPt.x + circleR + 10} dy={i === 0 ? 0 : 24} key={i}>{line}</tspan>
                                ))}
                            </text>
                        )}

                    </g>
                )}

                {/* ── Target2 Group ─────────────── */}
                {hasTarget2 && (
                    <g
                        onMouseEnter={() => setHoveredNode('target2')}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => setHoveredNode(prev => prev === 'target2' ? null : 'target2')}
                        style={getStyle('target2')}
                    >
                        <circle cx={target2Pt.x} cy={target2Pt.y} r={circleR} fill="transparent" stroke={target2Color} strokeWidth="2.5" />
                        <circle cx={target2Pt.x} cy={target2Pt.y} r={dotR} fill="#7c7c7c" />

                        {target2Label && (
                            <text
                                x={target2Pt.x}
                                y={target2Pt.y - circleR - 34}
                                fill={target2Color}
                                fontSize="18"
                                fontWeight="bold"
                                fontFamily="'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif"
                                textAnchor="middle"
                            >
                                {target2Label.split('\n').map((line, i) => (
                                    <tspan x={target2Pt.x} dy={i === 0 ? 0 : 24} key={i}>{line}</tspan>
                                ))}
                            </text>
                        )}
                    </g>
                )}

                {/* ── Distance Label Group ─────────────── */}
                {!isSamePos && (
                    <g
                        style={{
                            opacity: activeNode === 'speaker' ? 0.25 : 1,
                            transition: 'opacity 0.3s ease-in-out'
                        }}
                    >
                        {!isCombined && (
                            <text
                                x={hasTarget2 ? (targetPt.x + target2Pt.x) / 2 : targetPt.x + circleR + 10}
                                y={hasTarget2 ? targetPt.y + circleR + 18 : targetPt.y + circleR - 10}
                                fill="#7c7c7c"
                                fontSize="16"
                                fontWeight="bold"
                                fontFamily="'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif"
                                textAnchor={hasTarget2 ? "middle" : "start"}
                                dominantBaseline="hanging"
                            >
                                {distanceLabel.split('\n').map((line, i) => (
                                    <tspan x={hasTarget2 ? (targetPt.x + target2Pt.x) / 2 : targetPt.x + circleR + 10} dy={i === 0 ? 0 : 22} key={i}>{line}</tspan>
                                ))}
                            </text>
                        )}
                        {isCombined && (
                            <text
                                x={targetPt.x - circleR - 10}
                                y={targetPt.y - circleR * 0.5}
                                fill="#7c7c7c"
                                fontSize="16"
                                fontWeight="bold"
                                fontFamily="'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif"
                                textAnchor="end"
                            >
                                {distanceLabel.split('\n').map((line, i) => (
                                    <tspan x={targetPt.x - circleR - 10} dy={i === 0 ? 0 : 22} key={i}>{line}</tspan>
                                ))}
                            </text>
                        )}
                    </g>
                )}

                {/* ── Connection Line (Target2) ─────────────────────────────── */}
                {hasTarget2 && (
                    <line
                        x1={speakerPt.x} y1={speakerPt.y}
                        x2={target2Pt.x} y2={target2Pt.y}
                        stroke="#999" strokeWidth="1.5"
                        style={{
                            opacity: activeNode ? 0.25 : 1,
                            transition: 'opacity 0.3s ease-in-out'
                        }}
                    />
                )}

                {/* ── Combined Label (centered between two circles on same y=0) */}
                {isCombined && (
                    <text
                        x={(speakerPt.x + targetPt.x) / 2}
                        y={Math.max(speakerPt.y, targetPt.y) + circleR + 18}
                        fill="#ff5500"
                        fontSize="18"
                        fontWeight="bold"
                        fontFamily="'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif"
                        textAnchor="middle"
                        style={{
                            opacity: 1,
                            transition: 'opacity 0.3s ease-in-out'
                        }}
                    >
                        <tspan x={(speakerPt.x + targetPt.x) / 2} dy="0">Speaker / Target :</tspan>
                        <tspan x={(speakerPt.x + targetPt.x) / 2} dy="24">Gender-Neutral</tspan>
                        <tspan x={(speakerPt.x + targetPt.x) / 2} dy="24">화자 / 청자 : 성별 무관</tspan>
                    </text>
                )}
            </svg>
        </div>
    );
};
