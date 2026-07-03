'use client';

import React from 'react';
import DynamicTimelineChart from './DynamicTimelineChart';
import BattleBubbleChart from './BattleBubbleChart';
import WarlordFlowChart from './WarlordFlowChart';
import DemographicChart from './DemographicChart';
import TerritorialMap from './TerritorialMap';

const LINE = '#666666'; // 얇고 연한 회색 선 (레퍼런스의 와이어프레임 느낌)
const BG = '#FBFBF9'; // 따뜻한 느낌의 오프화이트/종이 질감 배경

const POSTER_TITLE_FONT = {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: '19pt',
    fontWeight: 400,
    color: '#222222',
    letterSpacing: '-0.02em',
    marginBottom: '16px'
};

const POSTER_DESC_FONT = {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: '10pt', // 80% of 12pt
    lineHeight: '1.6',
    fontWeight: 300,
    color: '#444444',
    letterSpacing: '-0.01em'
};

const SECTION_TITLE_FONT = {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: '13pt', // 80% of 16pt
    fontWeight: 400,
    color: '#222222',
    marginBottom: '12px',
    borderBottom: `0.5px solid ${LINE}`,
    paddingBottom: '8px',
    display: 'inline-block'
};

export default function InfographicMainPoster({ onClose }: { onClose?: () => void }) {
    // 인쇄용 고정 사이즈 (1189px x 841px)
    const POSTER_WIDTH = 1189;
    const POSTER_HEIGHT = 841;

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#e5e5e5', 
            overflow: 'auto',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            position: 'relative',
            padding: '40px 0', // Add padding so it doesn't touch the edges when scrolling
            boxSizing: 'border-box'
        }}>
            {/* Google Fonts */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;1,300&family=IBM+Plex+Serif:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
                
                @media print {
                    .back-btn { display: none !important; }
                    body { background-color: white !important; }
                }
                
                .chart-container {
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                    background: transparent;
                    box-shadow: none !important; 
                }
                
                /* 와이어프레임 스타일 공통 선형 요소 */
                .wireframe-box {
                    border: 0.5px solid ${LINE};
                    background: transparent;
                }
                `
            }} />

            {/* Back Button */}
            {onClose && (
                <button
                    className="back-btn"
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        top: '24px',
                        left: '24px',
                        zIndex: 50,
                        background: 'white',
                        border: '1px solid #ddd',
                        padding: '8px 16px',
                        fontSize: '12pt',
                        cursor: 'pointer',
                        color: '#222',
                        borderRadius: '4px'
                    }}
                >
                    &larr; Back
                </button>
            )}

            {/* ═══ POSTER CANVAS ═══ */}
            <div 
                className="poster-card" 
                style={{
                    width: `${POSTER_WIDTH}px`,
                    height: `${POSTER_HEIGHT}px`,
                    minWidth: `${POSTER_WIDTH}px`,
                    minHeight: `${POSTER_HEIGHT}px`,
                    margin: '0 auto', // Standard block centering prevents top clipping
                    backgroundColor: BG,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    color: '#222',
                    boxShadow: 'none', // 모든 그림자 제거
                    border: '0.5px solid #ccc',
                    padding: '32px', // Reduced from 48px
                    boxSizing: 'border-box'
                }}
            >
                {/* --- HEADER --- */}
                <div style={{ width: '100%', marginBottom: '24px', display: 'flex', gap: '48px', alignItems: 'flex-start', borderBottom: `0.5px solid ${LINE}`, paddingBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ ...POSTER_TITLE_FONT, marginBottom: 0, lineHeight: 1.1 }}>
                            Differences between History and Romance<br/>
                            <span style={{ fontSize: '15pt', color: '#666' }}>The Three Kingdoms (184-280 AD)</span>
                        </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', textAlign: 'left', paddingTop: '6px' }}>
                        <div style={{ ...POSTER_DESC_FONT, textAlign: 'left', maxWidth: '400px', lineHeight: '1.2' }}>
                            A comparative structural analysis between Luo Guanzhong's novel <i>Sanguo Yanyi</i> and Chen Shou's historical record <i>Sanguozhi</i>.
                            <br/>
                            <span style={{ color: '#888', fontSize: '9pt' }}>Visualizing Fiction vs Reality  |  Scale: 184–280 AD</span>
                        </div>
                    </div>
                </div>

                {/* --- MAIN LAYOUT (1 + 3) --- */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: '24px', minHeight: 0 }}>
                    
                    {/* [Phase 1] 공통점: 난세의 시작 (Left Column) */}
                    <div style={{ 
                        flex: '0 0 16%', 
                        borderRight: `0.5px solid ${LINE}`, 
                        paddingRight: '32px',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 0
                    }}>
                        <div style={SECTION_TITLE_FONT}>01. The Root</div>
                        <div style={{ ...POSTER_DESC_FONT, flexShrink: 0 }}>
                            <strong>Core Narrative & Irony</strong><br/><br/>
                            184-280 AD. A century of chaos initiated by the Yellow Turban Rebellion. While Wei, Shu, and Wu fought for supremacy, the ultimate victor was the Sima clan's Jin Dynasty. This irony highlights the fleeting nature of power.<br/><br/>
                            <span style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '11pt', display: 'block', marginTop: '16px' }}>56,486,856</span>
                            <span style={{ fontSize: '8pt', color: '#888' }}>Han Dynasty Census (157 AD)</span>
                        </div>
                        {/* 다이어그램 노드 느낌의 장식 */}
                        <div style={{ flex: 1, marginTop: '32px', position: 'relative', display: 'flex', justifyContent: 'flex-start', minHeight: 0 }}>
                            <div style={{ width: '0.5px', height: '100%', backgroundColor: LINE, position: 'absolute', left: '7.5px' }}></div>
                            
                            {[
                                { y: '5%', label: '157 AD: 56.4M Pop.\n(Late Han Peak)' },
                                { y: '20%', label: '184 AD: Yellow Turban\nRebellion' },
                                { y: '35%', label: '200 AD: Battle of\nGuandu' },
                                { y: '50%', label: '208 AD: Battle of\nRed Cliffs' },
                                { y: '65%', label: '220 AD: Wei Established' },
                                { y: '80%', label: '263 AD: Fall of Shu' },
                                { y: '95%', label: '280 AD: Jin Unification\n(16.1M Pop.)' },
                            ].map((node, i) => (
                                <div key={i} style={{ position: 'absolute', top: node.y, display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-start' }}>
                                    <div style={{ width: '16px', height: '16px', border: `0.5px solid ${LINE}`, borderRadius: '50%', backgroundColor: BG, zIndex: 2 }}></div>
                                    <div style={{ marginLeft: '12px', ...POSTER_DESC_FONT, fontSize: '8pt', color: '#666', maxWidth: '120px', whiteSpace: 'pre-line', lineHeight: '1.2' }}>
                                        {node.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Columns (Set 1, Set 2, Set 3) */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: '24px', minHeight: 0 }}>
                        
                        {/* 02. Characters */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', minHeight: 0 }}>
                            <div style={SECTION_TITLE_FONT}>02. Characters</div>
                            
                            {/* Top: Romance */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderBottom: `0.5px solid ${LINE}`, paddingBottom: '12px', marginBottom: '12px', minHeight: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexShrink: 0 }}>
                                    <span style={{ fontSize: '10pt', fontWeight: 500, color: '#222', borderBottom: '1px solid #222' }}>Romance</span>
                                </div>
                                <div style={{ ...POSTER_DESC_FONT, flexShrink: 0, marginBottom: '16px' }}>
                                    <i>Romance</i> elevates figures like Liu Bei into virtuous paragons, Cao Cao into a ruthless villain, and Zhuge Liang into a mystical strategist.
                                </div>
                                <div className="chart-container" style={{ minHeight: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <WarlordFlowChart isPoster={true} mode="fiction" />
                                </div>
                            </div>

                            {/* Bottom: History */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexShrink: 0 }}>
                                    <span style={{ fontSize: '10pt', fontWeight: 500, color: '#666', borderBottom: '1px solid #666' }}>History</span>
                                </div>
                                <div style={{ ...POSTER_DESC_FONT, flexShrink: 0, marginBottom: '16px' }}>
                                    Historically, leaders were pragmatists. Liu Bei was an opportunistic warlord, Cao Cao a pragmatic reformer, and Zhuge Liang a brilliant administrator.
                                </div>
                                <div className="chart-container" style={{ minHeight: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <WarlordFlowChart isPoster={true} mode="historical" />
                                </div>
                            </div>
                        </div>

                        {/* 03. State Power */}
                        <div className="wireframe-box" style={{ flex: 1, padding: '0 24px 0 24px', display: 'flex', flexDirection: 'column', position: 'relative', borderTop: 'none', borderBottom: 'none', minHeight: 0 }}>
                            <div style={SECTION_TITLE_FONT}>03. State Power</div>
                            
                            {/* Top: Romance */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderBottom: `0.5px solid ${LINE}`, paddingBottom: '12px', marginBottom: '12px', minHeight: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexShrink: 0 }}>
                                    <span style={{ fontSize: '10pt', fontWeight: 500, color: '#222', borderBottom: '1px solid #222' }}>Romance</span>
                                </div>
                                <div className="chart-container" style={{ minHeight: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <DynamicTimelineChart isPoster={true} fixedMode="fiction" />
                                </div>
                                <div className="chart-container" style={{ minHeight: 0, flex: 0.6, display: 'flex', flexDirection: 'column', marginTop: '8px' }}>
                                    <DemographicChart isPoster={true} fixedMode="fiction" />
                                </div>
                            </div>

                            {/* Bottom: History */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexShrink: 0 }}>
                                    <span style={{ fontSize: '10pt', fontWeight: 500, color: '#666', borderBottom: '1px solid #666' }}>History</span>
                                </div>
                                <div className="chart-container" style={{ minHeight: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <DynamicTimelineChart isPoster={true} fixedMode="historical" />
                                </div>
                                <div className="chart-container" style={{ minHeight: 0, flex: 0.6, display: 'flex', flexDirection: 'column', marginTop: '8px' }}>
                                    <DemographicChart isPoster={true} fixedMode="historical" />
                                </div>
                            </div>
                        </div>

                        {/* 04. Geopolitics & Battles */}
                        <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', position: 'relative', minHeight: 0 }}>
                            <div style={SECTION_TITLE_FONT}>04. Geopolitics & Battles</div>
                            
                            {/* Top: Map */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderBottom: `0.5px solid ${LINE}`, paddingBottom: '12px', marginBottom: '12px', minHeight: 0 }}>
                                <div className="chart-container" style={{ minHeight: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <TerritorialMap isPoster={true} />
                                </div>
                                <div style={{ ...POSTER_DESC_FONT, flexShrink: 0, marginTop: '8px' }}>
                                    Territorial overview of Wei, Shu, and Wu (c. 220–260 AD), marking the locations of the three major battles that defined the era.
                                </div>
                            </div>

                            {/* Bottom: Troop Exaggeration */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexShrink: 0 }}>
                                    <span style={{ fontSize: '10pt', fontWeight: 500, color: '#222', borderBottom: '1px solid #222' }}>Troop Exaggeration (Romance vs History)</span>
                                </div>
                                <div style={{ ...POSTER_DESC_FONT, flexShrink: 0, marginBottom: '8px' }}>
                                    <i>Romance</i> (top dashed circles) inflates troop counts by 4x to 7x to amplify dramatic tension, compared to Historical facts (bottom solid circles).
                                </div>
                                <div className="chart-container" style={{ minHeight: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <BattleBubbleChart isPoster={true} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
