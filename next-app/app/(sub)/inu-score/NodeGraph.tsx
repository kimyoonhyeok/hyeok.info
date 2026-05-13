import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type NodeGraphProps = {
    onOpenSideProject: () => void;
    onOpenSideProject2: () => void;
    onOpenMainPoster: () => void;
    onOpenApp: () => void;
    onOpenGraduation: () => void;
    onOpenInfographic: () => void;
    connectedNodes: string[];
    setConnectedNodes: React.Dispatch<React.SetStateAction<string[]>>;
};

type NodeItem = {
    id: string;
    label: string;
    isRoot?: boolean;
    clickable?: boolean;
    children?: NodeItem[];
};

const nodesData: NodeItem[] = [
    { id: 'root', label: '4-1', isRoot: true },
    { id: 'n1', label: 'Design of Level' },
    { id: 'n2', label: 'Infographic', children: [{ id: 'infographic_pt1', label: '1st PT', clickable: true }] },
    { id: 'n3', label: 'Layout Design' },
    { id: 'n4', label: 'Typo and Image' },
    { id: 'n5', label: 'Contemporary\nFashion Contents' },
    {
        id: 'vcd', label: 'Visual Communication\nDesign Project',
        children: [
            {
                id: 'sp',
                label: 'SideProject',
                children: [
                    { id: 'main', label: 'MainPoster', clickable: true },
                    { id: 'app', label: 'App.', clickable: true },
                    {
                        id: 'pt', label: 'PT',
                        children: [
                            { id: 'week1', label: 'Week 1~4', clickable: true },
                            { id: 'week2', label: 'Week 5~8', clickable: true },
                        ]
                    },
                ]
            },
            {
                id: 'gp',
                label: 'Graduation Project',
                children: [
                    { id: 'gp_pt1', label: '1st PT', clickable: true },
                ]
            },
        ]
    },
];

type Pos = { x: number, y: number };

export default function NodeGraph({ onOpenSideProject, onOpenSideProject2, onOpenMainPoster, onOpenApp, onOpenGraduation, onOpenInfographic, connectedNodes, setConnectedNodes }: NodeGraphProps) {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [dragLine, setDragLine] = useState<{ active: boolean, x: number, y: number, sourceId: string } | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [positions, setPositions] = useState<Record<string, Pos>>({});

    const updatePositions = () => {
        if (!wrapperRef.current) return;
        const containerRect = wrapperRef.current.getBoundingClientRect();
        const newPos: Record<string, Pos> = {};

        const elements = wrapperRef.current.querySelectorAll('[data-id]');
        elements.forEach((el) => {
            const id = el.getAttribute('data-id');
            if (id) {
                const rect = el.getBoundingClientRect();
                newPos[id] = {
                    x: rect.left + rect.width / 2 - containerRect.left,
                    y: rect.top + rect.height / 2 - containerRect.top,
                };
            }
        });
        setPositions(newPos);
    };

    useLayoutEffect(() => {
        updatePositions();
    }, [connectedNodes]);

    useEffect(() => {
        const timer = setTimeout(updatePositions, 100);
        window.addEventListener('resize', updatePositions);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updatePositions);
        };
    }, []);

    // Pointer events for dragging wires
    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (dragLine?.active && wrapperRef.current) {
                const rect = wrapperRef.current.getBoundingClientRect();
                setDragLine(prev => prev ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top } : null);

                // Check if hovering near target for visual feedback
                const mx = e.clientX - rect.left;
                const my = e.clientY - rect.top;
                let foundHover = null;

                // Possible targets depending on source
                const possibleTargets = dragLine.sourceId === 'vcd' ? ['sp', 'gp'] :
                    dragLine.sourceId === 'sp' ? ['main', 'app', 'pt'] :
                        dragLine.sourceId === 'pt' ? ['week1', 'week2'] :
                            dragLine.sourceId === 'gp' ? ['gp_pt1'] :
                                dragLine.sourceId === 'n2' ? ['infographic_pt1'] : [];

                possibleTargets.forEach((id) => {
                    const target = positions[id];
                    if (target) {
                        const dist = Math.hypot(target.x - mx, target.y - my);
                        if (dist < 60) foundHover = id;
                    }
                });
                if (foundHover) {
                    if (hoveredNode !== foundHover) setHoveredNode(foundHover);
                } else if (hoveredNode !== dragLine.sourceId) {
                    setHoveredNode(dragLine.sourceId);
                }
            }
        };

        const handlePointerUp = (e: PointerEvent) => {
            if (dragLine?.active && wrapperRef.current) {
                let targetId: string | null = null;

                const possibleTargets = dragLine.sourceId === 'vcd' ? ['sp', 'gp'] :
                    dragLine.sourceId === 'sp' ? ['main', 'app', 'pt'] :
                        dragLine.sourceId === 'pt' ? ['week1', 'week2'] :
                            dragLine.sourceId === 'gp' ? ['gp_pt1'] :
                                dragLine.sourceId === 'n2' ? ['infographic_pt1'] : [];

                if (hoveredNode && possibleTargets.includes(hoveredNode)) {
                    targetId = hoveredNode;
                } else {
                    const rect = wrapperRef.current.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;
                    let closestDist = 200; // Increased to 200px for max UX leniency

                    possibleTargets.forEach((id) => {
                        const target = positions[id];
                        if (target) {
                            const dist = Math.hypot(target.x - mouseX, target.y - mouseY);
                            if (dist < closestDist) {
                                closestDist = dist;
                                targetId = id;
                            }
                        }
                    });
                }

                if (targetId) {
                    if (!connectedNodes.includes(targetId)) {
                        setConnectedNodes(prev => {
                            const next = [...prev, targetId!];
                            // auto-connect gp when gp_pt1 is connected
                            if (targetId === 'gp_pt1' && !prev.includes('gp')) {
                                next.push('gp');
                            }
                            if (targetId === 'infographic_pt1' && !prev.includes('n2')) {
                                next.push('n2');
                            }
                            return next;
                        });
                    }
                    if (targetId === 'week1') {
                        setTimeout(() => onOpenSideProject(), 400);
                    } else if (targetId === 'week2') {
                        setTimeout(() => onOpenSideProject2(), 400);
                    } else if (targetId === 'main') {
                        setTimeout(() => onOpenMainPoster(), 400);
                    } else if (targetId === 'app') {
                        setTimeout(() => onOpenApp(), 400);
                    } else if (targetId === 'gp_pt1') {
                        setTimeout(() => onOpenGraduation(), 400);
                    } else if (targetId === 'infographic_pt1') {
                        setTimeout(() => onOpenInfographic(), 400);
                    }
                }

                setDragLine(null);
                setHoveredNode(null);
            }
        };

        if (dragLine?.active) {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        }
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dragLine?.active, dragLine?.sourceId, positions, connectedNodes]);

    const handleDragStart = (e: React.PointerEvent, sourceId: string) => {
        // Only left mouse or touch
        if (e.button !== 0 && e.nativeEvent.type !== 'touchstart') return;

        // Ensure source node itself is connected or is root/vcd/gp/n2! 
        if (sourceId !== 'vcd' && sourceId !== 'gp' && sourceId !== 'n2' && !connectedNodes.includes(sourceId)) return;

        e.preventDefault();

        if (!wrapperRef.current) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        setDragLine({ active: true, sourceId, x: e.clientX - rect.left, y: e.clientY - rect.top });
        setHoveredNode(sourceId);
    };

    const renderLink = (sourceId: string, targetId: string) => {
        const source = positions[sourceId];
        const target = positions[targetId];
        if (!source || !target) return null;

        const isParentHovered = hoveredNode === sourceId;
        const isTargetHovered = hoveredNode === targetId;
        const isRootHovered = hoveredNode === 'root';
        const isVcdHovered = hoveredNode === 'vcd' && (targetId === 'sp' || targetId === 'gp');
        const isSpHovered = hoveredNode === 'sp' && ['main', 'app', 'pt'].includes(targetId);
        const isPtHovered = hoveredNode === 'pt' && ['week1', 'week2'].includes(targetId);
        const isGpHovered = hoveredNode === 'gp' && ['gp_pt1'].includes(targetId);
        const isN2Hovered = hoveredNode === 'n2' && ['infographic_pt1'].includes(targetId);

        const isHighlighted = isParentHovered || isTargetHovered || isRootHovered || isVcdHovered || isSpHovered || isPtHovered || isGpHovered || isN2Hovered;

        // TouchDesigner Style Smooth Cubic Bezier Curve (Vertical flowing)
        const dY = Math.abs(target.y - source.y) * 0.5;
        const d = `M ${source.x} ${source.y} C ${source.x} ${source.y + dY}, ${target.x} ${target.y - dY}, ${target.x} ${target.y}`;

        return (
            <motion.path
                key={`${sourceId}-${targetId}`}
                d={d}
                fill="none"
                stroke={isHighlighted ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.15)'}
                strokeWidth={isHighlighted ? 1.5 : 1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            />
        );
    };

    const renderDragWire = () => {
        if (!dragLine?.active) return null;
        const source = positions[dragLine.sourceId];
        if (!source) return null;

        const dY = Math.abs(dragLine.y - source.y) * 0.5;
        const d = `M ${source.x} ${source.y} C ${source.x} ${source.y + dY}, ${dragLine.x} ${dragLine.y - dY}, ${dragLine.x} ${dragLine.y}`;

        return (
            <motion.path
                d={d}
                fill="none"
                stroke="#E74C3C"
                strokeWidth={2}
                strokeDasharray="5,5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
            />
        );
    };

    return (
        <div ref={wrapperRef} style={{
            flex: 1,
            width: '100%',
            minHeight: 'calc(100vh - 120px)',
            background: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: '"Pretendard", sans-serif',
            color: '#111',
            padding: '4rem 50px', // Exact lateral padding matching works-detail infoSection
            boxSizing: 'border-box',
            touchAction: 'none' // Prevent scrolling while dragging wire
        }}>
            {/* SVG overlay */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                {Object.keys(positions).length > 0 && (
                    <AnimatePresence>
                        {/* Root to second level */}
                        {nodesData.slice(1).map((node) => renderLink('root', node.id))}

                        {/* VCD to its children (only if connected) */}
                        {connectedNodes.includes('sp') && renderLink('vcd', 'sp')}
                        {connectedNodes.includes('gp') && renderLink('vcd', 'gp')}

                        {/* SP to its children (only if connected) */}
                        {connectedNodes.includes('main') && renderLink('sp', 'main')}
                        {connectedNodes.includes('app') && renderLink('sp', 'app')}
                        {connectedNodes.includes('pt') && renderLink('sp', 'pt')}

                        {/* PT to its children (only if connected) */}
                        {connectedNodes.includes('week1') && renderLink('pt', 'week1')}
                        {connectedNodes.includes('week2') && renderLink('pt', 'week2')}

                        {/* GP to its children (only if connected) */}
                        {connectedNodes.includes('gp_pt1') && renderLink('gp', 'gp_pt1')}

                        {/* n2 to its children */}
                        {connectedNodes.includes('infographic_pt1') && renderLink('n2', 'infographic_pt1')}

                        {/* Interactive Drag Wire */}
                        {renderDragWire()}
                    </AnimatePresence>
                )}
            </svg>

            {/* DOM Content */}
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>

                {/* Level 1: Root */}
                <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center', paddingTop: '2vh' }}>
                    <div
                        data-id="root"
                        onMouseEnter={() => setHoveredNode('root')}
                        onMouseLeave={() => setHoveredNode(null)}
                        style={{
                            fontSize: '20px',
                            fontWeight: 400,
                            lineHeight: 1.2,
                            padding: '4px 8px',
                            background: '#fff',
                            cursor: 'default',
                            transition: 'color 0.3s'
                        }}
                    >
                        4-1
                    </div>
                </div>

                {/* Level 2: 6 items */}
                <div style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', paddingTop: '10vh' }}>
                    {nodesData.slice(1).map((node: NodeItem) => {
                        const isHovered = hoveredNode === node.id;
                        const dim = hoveredNode && hoveredNode !== node.id && hoveredNode !== 'root';
                        const isLastNode = node.id === 'vcd';
                        const hasChildren = !!node.children;

                        return (
                            <div key={node.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isLastNode ? 'flex-end' : 'center', position: 'relative' }}>
                                <motion.div
                                    data-id={node.id}
                                    onMouseEnter={() => setHoveredNode(node.id)}
                                    onMouseLeave={() => setHoveredNode(null)}
                                    onPointerDown={(e) => hasChildren && handleDragStart(e, node.id)}
                                    style={{
                                        fontSize: '20px',
                                        lineHeight: 1.2,
                                        fontWeight: 400,
                                        textAlign: isLastNode ? 'right' : 'center',
                                        whiteSpace: 'pre-line',
                                        padding: '4px 8px',
                                        background: '#fff',
                                        cursor: hasChildren ? 'grab' : 'default',
                                        opacity: dim ? 0.3 : 1,
                                        color: isHovered || (node.id === 'n2' && hoveredNode === 'infographic_pt1') ? '#E74C3C' : '#111',
                                        transition: 'opacity 0.3s, color 0.3s',
                                        userSelect: 'none',
                                        position: 'relative',
                                        zIndex: 2,
                                    }}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: dim ? 0.3 : 1 }}
                                    transition={{ duration: 0.5, type: 'spring' }}
                                >
                                    {node.label}
                                </motion.div>

                                {/* Level 3: Children (Visually dimmed until connected) */}
                                {node.children && (
                                    <div style={{ display: 'flex', gap: '3rem', paddingTop: '10vh', position: 'relative', zIndex: 1 }}>
                                        {node.children?.map((child: NodeItem) => {
                                            const childHovered = hoveredNode === child.id;
                                            const isConnected = connectedNodes.includes(child.id);
                                            const isDimmed = !isConnected || (hoveredNode && hoveredNode !== child.id && hoveredNode !== 'root' && hoveredNode !== 'vcd' && hoveredNode !== 'n2');
                                            const hasSubChildren = !!child.children;
                                            const isSpHovered = child.id === 'sp' && ['main', 'app', 'pt'].includes(hoveredNode || '');
                                            const isGpChildHovered = child.id === 'gp' && ['gp_pt1'].includes(hoveredNode || '');
                                            const isSpHighlighted = childHovered || isSpHovered || isGpChildHovered;

                                            return (
                                                <div key={child.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                                                    <motion.div
                                                        data-id={child.id}
                                                        onMouseEnter={() => setHoveredNode(child.id)}
                                                        onMouseLeave={() => setHoveredNode(null)}
                                                        onClick={() => {
                                                            if (isConnected && child.clickable) {
                                                                if (child.id === 'infographic_pt1') onOpenInfographic();
                                                                else onOpenSideProject();
                                                            }
                                                        }}
                                                        onPointerDown={(e) => hasSubChildren && handleDragStart(e, child.id)}
                                                        style={{
                                                            fontSize: '20px',
                                                            lineHeight: 1.2,
                                                            fontWeight: (child.clickable || hasSubChildren) && isConnected ? 500 : 400,
                                                            textAlign: 'center',
                                                            whiteSpace: 'pre-line',
                                                            padding: '4px 8px',
                                                            background: '#fff',
                                                            cursor: isConnected && child.clickable ? 'pointer' : (hasSubChildren && isConnected ? 'grab' : 'default'),
                                                            opacity: isDimmed ? 0.2 : 1, // Visibly dimmed if disconnected
                                                            color: isSpHighlighted && isConnected ? '#E74C3C' : '#111',
                                                            transition: 'opacity 0.4s ease, color 0.3s',
                                                            userSelect: 'none',
                                                            position: 'relative',
                                                            zIndex: 2,
                                                        }}
                                                        initial={{ y: 20, opacity: 0 }}
                                                        animate={{ y: 0, opacity: isDimmed ? 0.2 : 1 }}
                                                        transition={{ duration: 0.5, type: 'spring', delay: 0.2 }}
                                                    >
                                                        {child.label}
                                                    </motion.div>

                                                    {/* Level 4: Sub-Children of SideProject (Absolute positioned so they don't break flex layout) */}
                                                    {child.children && (
                                                        <div style={{
                                                            display: 'flex',
                                                            gap: '2rem',
                                                            position: 'absolute',
                                                            top: '100%',
                                                            marginTop: '8vh',
                                                            left: '50%',
                                                            transform: 'translateX(-50%)',
                                                            whiteSpace: 'nowrap',
                                                            opacity: isConnected ? 1 : 0, // 100% opacity ONCE SideProject connects
                                                            pointerEvents: isConnected ? 'auto' : 'none',
                                                            transition: 'opacity 0.6s ease',
                                                            zIndex: 1,
                                                        }}>
                                                            {child.children?.map((sub: NodeItem) => {
                                                                const subHovered = hoveredNode === sub.id;
                                                                const isSubConnected = connectedNodes.includes(sub.id);
                                                                const isSubDimmed = hoveredNode && hoveredNode !== sub.id && hoveredNode !== 'root' && hoveredNode !== 'sp' && hoveredNode !== 'gp' && hoveredNode !== 'vcd';
                                                                const hasSubChildren = !!sub.children;
                                                                const isPtSubHovered = sub.id === 'pt' && ['week1', 'week2'].includes(hoveredNode || '');
                                                                const isSubHighlighted = subHovered || isPtSubHovered;

                                                                return (
                                                                    <div key={sub.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                                                                        <motion.div
                                                                            data-id={sub.id}
                                                                            onMouseEnter={() => setHoveredNode(sub.id)}
                                                                            onMouseLeave={() => setHoveredNode(null)}
                                                                            onPointerDown={(e) => hasSubChildren && isSubConnected && handleDragStart(e, sub.id)}
                                                                            onClick={() => {
                                                                                if (isSubConnected && sub.clickable) {
                                                                                    if (sub.id === 'main') onOpenMainPoster();
                                                                                    else if (sub.id === 'app') onOpenApp();
                                                                                    else if (sub.id === 'gp_pt1') onOpenGraduation();
                                                                                }
                                                                            }}
                                                                            style={{
                                                                                fontSize: '18px',
                                                                                lineHeight: 1.2,
                                                                                fontWeight: (sub.clickable || hasSubChildren) && isSubConnected ? 500 : 400,
                                                                                textAlign: 'center',
                                                                                whiteSpace: 'pre-line',
                                                                                padding: '4px 8px',
                                                                                background: '#fff',
                                                                                cursor: isSubConnected && sub.clickable ? 'pointer' : (hasSubChildren && isSubConnected ? 'grab' : 'default'),
                                                                                opacity: isSubDimmed ? 0.3 : 1,
                                                                                color: isSubHighlighted && isSubConnected ? '#E74C3C' : '#111',
                                                                                transition: 'opacity 0.4s ease, color 0.3s',
                                                                                userSelect: 'none',
                                                                            }}
                                                                        >
                                                                            {sub.label}
                                                                        </motion.div>

                                                                        {/* Level 5: PT children (week1, week2) */}
                                                                        {sub.children && (
                                                                            <div style={{
                                                                                display: 'flex',
                                                                                gap: '1.5rem',
                                                                                position: 'absolute',
                                                                                top: '100%',
                                                                                marginTop: '8vh',
                                                                                left: '50%',
                                                                                transform: 'translateX(-50%)',
                                                                                whiteSpace: 'nowrap',
                                                                                opacity: isSubConnected ? 1 : 0,
                                                                                pointerEvents: isSubConnected ? 'auto' : 'none',
                                                                                transition: 'opacity 0.6s ease',
                                                                                zIndex: 1,
                                                                            }}>
                                                                                {sub.children?.map((leaf: NodeItem) => {
                                                                                    const leafHovered = hoveredNode === leaf.id;
                                                                                    const isLeafConnected = connectedNodes.includes(leaf.id);
                                                                                    const isLeafDimmed = hoveredNode && hoveredNode !== leaf.id && hoveredNode !== 'root' && hoveredNode !== 'sp' && hoveredNode !== 'vcd' && hoveredNode !== 'pt';

                                                                                    return (
                                                                                        <motion.div
                                                                                            key={leaf.id}
                                                                                            data-id={leaf.id}
                                                                                            onMouseEnter={() => setHoveredNode(leaf.id)}
                                                                                            onMouseLeave={() => setHoveredNode(null)}
                                                                                            onClick={() => {
                                                                                                if (isLeafConnected && leaf.clickable) {
                                                                                                    if (leaf.id === 'week1') onOpenSideProject();
                                                                                                    else if (leaf.id === 'week2') onOpenSideProject2();
                                                                                                }
                                                                                            }}
                                                                                            style={{
                                                                                                fontSize: '16px',
                                                                                                lineHeight: 1.2,
                                                                                                fontWeight: leaf.clickable && isLeafConnected ? 500 : 400,
                                                                                                textAlign: 'center',
                                                                                                whiteSpace: 'pre-line',
                                                                                                padding: '4px 8px',
                                                                                                background: '#fff',
                                                                                                cursor: isLeafConnected && leaf.clickable ? 'pointer' : 'default',
                                                                                                opacity: isLeafDimmed ? 0.3 : 1,
                                                                                                color: leafHovered && leaf.clickable && isLeafConnected ? '#E74C3C' : '#111',
                                                                                                transition: 'opacity 0.4s ease, color 0.3s',
                                                                                                userSelect: 'none',
                                                                                            }}
                                                                                        >
                                                                                            {leaf.label}
                                                                                        </motion.div>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
