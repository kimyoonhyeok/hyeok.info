import React from 'react';

const COLORS = {
  purple: '#583884',
  gray: '#e7e7e7',
  green: '#00fb49',
  brown: '#85712a'
};

const blockStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.5rem',
  minHeight: '3.5rem',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  fontFamily: 'Pretendard, sans-serif',
  color: '#ffffff',
  margin: '0', 
};

// Text word with color (Give 1)
export const ColoredText = ({ text, color }: { text: string; color: string }) => (
  <span style={{ color: color, fontWeight: 'bold' }}>{text}</span>
);

export const SplitText = ({ text, topColor, bottomColor, splitAt = '55%' }: { text: string; topColor: string; bottomColor: string; splitAt?: string }) => (
  <span style={{ 
    background: `linear-gradient(to bottom, ${topColor} 0%, ${topColor} ${splitAt}, ${bottomColor} ${splitAt}, ${bottomColor} 100%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700,
    display: 'inline-block',
    lineHeight: 1,
  }}>{text}</span>
);


export const GhostBlock = ({ text }: { text: string }) => (
    <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '3.5rem',
        height: '3.5rem',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        fontFamily: 'Pretendard, sans-serif',
        color: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        margin: '0',
    }}>
        {text}
    </div>
);

export const LegoBlock = ({ text, type, width = 1 }: { text: string; type: 'purple' | 'gray' | 'green' | 'brown' | 'purple-green' | 'brown-green'; width?: number }) => {
    let background = COLORS.purple;
    let color = '#ffffff';
    
    if (type === 'gray') {
      background = COLORS.gray;
      color = '#7c7c7c'; // Gray blocks have dark gray text
    }
    if (type === 'green') background = COLORS.green;
    if (type === 'brown') background = COLORS.brown;
    
    if (type === 'purple-green') {
        background = `linear-gradient(to bottom, ${COLORS.purple} 0%, ${COLORS.purple} 55%, ${COLORS.green} 55%, ${COLORS.green} 100%)`;
    }
    if (type === 'brown-green') {
        background = `linear-gradient(to bottom, ${COLORS.brown} 0%, ${COLORS.brown} 55%, ${COLORS.green} 55%, ${COLORS.green} 100%)`;
    }

    return (
        <div style={{ ...blockStyle, background, color, width: `${3.5 * width}rem` }}>
            {text}
        </div>
    );
};

export const Chapter2Diagrams = () => null; // placeholder export if needed


export const Give1Diagram = () => (
    <div style={{ display: 'flex', width: '100%', gap: '4rem', padding: '0', fontFamily: 'Pretendard, sans-serif', fontSize: '2.25rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
        <div>
          <ColoredText text="give" color={COLORS.purple} />
        </div>
        <div>
          <ColoredText text="Could you " color={COLORS.green} />
          <ColoredText text="give" color={COLORS.purple} />
        </div>
        <div>
          <ColoredText text="Do you mind " color={COLORS.green} />
          <ColoredText text="giv" color={COLORS.purple} />
          <ColoredText text="ing" color='#7c7c7c' />
        </div>
        <div>
          <ColoredText text="I was wondering" color={COLORS.green} /><br/>
          <ColoredText text="if you would mind " color={COLORS.green} />
          <ColoredText text="giv" color={COLORS.purple} />
          <ColoredText text="ing" color='#7c7c7c' />
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5rem', alignItems: 'flex-start' }}>
        <div>
          <ColoredText text="주" color={COLORS.purple} /><ColoredText text="다" color='#7c7c7c' />
        </div>
        <div>
          <ColoredText text="주" color={COLORS.purple} /><ColoredText text="시" color={COLORS.green} /><ColoredText text="다" color='#7c7c7c' />
        </div>
        <div>
          <SplitText text="줍" topColor={COLORS.purple} bottomColor={COLORS.green} />
          <ColoredText text="니다" color='#7c7c7c' />
        </div>
        <div>
          <ColoredText text="주" color={COLORS.purple} />
          <ColoredText text="십시" color={COLORS.green} />
          <ColoredText text="오" color='#7c7c7c' />
        </div>
        <div>
          <ColoredText text="드" color={COLORS.brown} />
          <SplitText text="립" topColor={COLORS.brown} bottomColor={COLORS.green} />
          <ColoredText text="니다" color='#7c7c7c' />
        </div>
        <div>
          <ColoredText text="드리" color={COLORS.brown} /><ColoredText text="다" color='#7c7c7c' />
        </div>
      </div>
    </div>
);

export const Give2Diagram = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8rem', padding: '0', fontFamily: 'Pretendard, sans-serif' }}>
      {/* Left: English Halo */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '30rem', height: '30rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, #583884 0%, #583884 25%, rgba(255,255,255,1) 45%, rgba(255,255,255,1) 55%, #00fb49 75%, #00fb49 100%)' }} />
          <div style={{ position: 'relative', zIndex: 10, color: '#ffffff', fontSize: '4rem', fontWeight: 700 }}>give</div>
        </div>
      </div>

      {/* Right: Korean Lego */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 3.5rem)', gridTemplateRows: 'repeat(4, 3.5rem)', gap: 0 }}>
            {/* Row 1 */}
            <div style={{ gridColumn: '3 / span 2', display: 'flex' }}>
                <LegoBlock text="주" type="purple" />
                <LegoBlock text="ㅡ" type="purple" />
            </div>
            {/* Row 2 */}
            <div style={{ gridColumn: '2 / span 2', display: 'flex' }}>
                <LegoBlock text="주" type="purple" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 3', display: 'flex' }}>
                <LegoBlock text="줍" type="purple-green" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
            {/* Row 3 */}
            <div style={{ gridColumn: '1 / span 3', display: 'flex' }}>
                <LegoBlock text="주" type="purple" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 4', display: 'flex' }}>
                <LegoBlock text="주" type="purple" />
                <LegoBlock text="십" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="오" type="gray" />
            </div>
            {/* Row 4 */}
            <div style={{ gridColumn: '1 / span 3', display: 'flex' }}>
                <LegoBlock text="드" type="purple" />
                <LegoBlock text="리" type="brown" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 4', display: 'flex' }}>
                <LegoBlock text="드" type="purple" />
                <LegoBlock text="립" type="brown-green" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
      </div>
    </div>
);

export const Give3Diagram = () => (
    <div style={{ display: 'flex', width: '100%', height: '35rem', fontFamily: 'Pretendard, sans-serif' }}>
        <div style={{ flex: 1, backgroundColor: '#70ebd7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#83cabe' }}>
                <span style={{ fontSize: '1.05rem', color: '#83cabe' }}><span style={{ fontWeight: 'bold', color: '#83cabe' }}>친밀한/비격식적 청자</span><br/>Intimate/Casual Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start', width: '10.5rem' }}>
                <div style={{ display: 'flex' }}>
                    <GhostBlock text="주" />
                    <LegoBlock text="주" type="purple" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="주" type="purple" />
                    <LegoBlock text="시" type="green" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="드" type="purple" />
                    <LegoBlock text="리" type="brown" />
                    <LegoBlock text="다" type="gray" />
                </div>
            </div>
        </div>
        
        <div style={{ flex: 1, backgroundColor: '#7a0927', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#833448' }}>
                <span style={{ fontSize: '1.05rem', color: '#833448' }}><span style={{ fontWeight: 'bold', color: '#833448' }}>격식적 청자</span><br/>Formal/Polite Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start', width: '14rem' }}>
                <div style={{ display: 'flex' }}>
                    <GhostBlock text="주" />
                    <LegoBlock text="줍" type="purple-green" />
                    <LegoBlock text="니" type="gray" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="주" type="purple" />
                    <LegoBlock text="십" type="green" />
                <LegoBlock text="시" type="green" />
                    <LegoBlock text="오" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="드" type="purple" />
                    <LegoBlock text="립" type="brown-green" />
                    <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
                </div>
            </div>
        </div>
    </div>
);

export const Give4Diagram = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', fontFamily: 'Pretendard, sans-serif' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#e6e4d7', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#9d9990', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>중립(Neutral)
            </div>
            <div style={{ display: 'flex' }}>
                <GhostBlock text="주" />
                <GhostBlock text="시" />
                <LegoBlock text="주" type="purple" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="줍" type="purple-green" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#c1b897', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#978e6c', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>주체 높임(Honor Subject)
            </div>
            <div style={{ display: 'flex' }}>
                <LegoBlock text="주" type="purple" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="주" type="purple" />
                <LegoBlock text="십" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="오" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#9e8f5d', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#7a6a3b', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>객체 높임(Honor Object/Recipient)
            </div>
            <div style={{ display: 'flex' }}>
                <LegoBlock text="드" type="purple" />
                <LegoBlock text="리" type="brown" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="드" type="purple" />
                <LegoBlock text="립" type="brown-green" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
    </div>
);




export const Ask1Diagram = () => (
    <div style={{ display: 'flex', width: '100%', gap: '4rem', padding: '0', fontFamily: 'Pretendard, sans-serif', fontSize: '2.25rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          <div><span style={{ fontWeight: 700, color: '#7c7c7c' }}>ask</span><br/><span style={{ fontWeight: 700, color: '#00fb49' }}>can you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>ask</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>would you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>ask</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>could you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>ask</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>would you mind</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>ask<span style={{ color: '#00fb49' }}>ing</span></span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>I was wondering if you could possibly</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>ask</span></div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5rem', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#583884' }}>묻</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#583884' }}>물</span><span style={{ fontWeight: 700, color: '#00fb49' }}>으시</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>여쭙</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>여쭙</span><span style={{ fontWeight: 700, color: '#00fb49' }}>습니</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
      </div>
    </div>
);

export const Ask2Diagram = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8rem', padding: '0', fontFamily: 'Pretendard, sans-serif' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '30rem', height: '30rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, #583884 0%, #583884 25%, rgba(255,255,255,1) 45%, rgba(255,255,255,1) 55%, #00fb49 75%, #00fb49 100%)' }} />
          <div style={{ position: 'relative', zIndex: 10, color: '#ffffff', fontSize: '4rem', fontWeight: 700 }}>ask</div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 3.5rem)', gridTemplateRows: 'repeat(4, 3.5rem)', gap: 0 }}>
            <div style={{ gridColumn: '2 / span 2', display: 'flex' }}>
                <LegoBlock text="묻" type="purple" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 3', display: 'flex' }}>
                <LegoBlock text="묻" type="purple" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '1 / span 3', display: 'flex' }}>
                <LegoBlock text="물" type="purple" />
                <LegoBlock text="으" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 4', display: 'flex' }}>
                <LegoBlock text="물" type="purple" />
                <LegoBlock text="으" type="green" />
                <LegoBlock text="십" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="오" type="gray" />
            </div>
            <div style={{ gridColumn: '1 / span 3', display: 'flex' }}>
                <LegoBlock text="여" type="brown" />
                <LegoBlock text="쭙" type="brown" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 4', display: 'flex' }}>
                <LegoBlock text="여" type="brown" />
                <LegoBlock text="쭙" type="brown" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
      </div>
    </div>
);

export const Ask3Diagram = () => (
    <div style={{ display: 'flex', width: '100%', height: '35rem', fontFamily: 'Pretendard, sans-serif' }}>
        <div style={{ flex: 1, backgroundColor: '#70ebd7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#83cabe' }}>
                <span style={{ fontSize: '1.05rem', color: '#83cabe' }}><span style={{ fontWeight: 'bold', color: '#83cabe' }}>친밀한/비격식적 청자</span><br/>Intimate/Casual Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-end', width: '10.5rem' }}>
                <div style={{ display: 'flex' }}>
                                        <LegoBlock text="묻" type="purple" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="물" type="purple" />
                    <LegoBlock text="으" type="green" />
                    <LegoBlock text="시" type="green" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="여" type="brown" />
                    <LegoBlock text="쭙" type="brown" />
                    <LegoBlock text="다" type="gray" />
                </div>
            </div>
        </div>
        <div style={{ flex: 1, backgroundColor: '#7a0927', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#833448' }}>
                <span style={{ fontSize: '1.05rem', color: '#833448' }}><span style={{ fontWeight: 'bold', color: '#833448' }}>격식적 청자</span><br/>Formal/Polite Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-end', width: '14rem' }}>
                <div style={{ display: 'flex' }}>
                                        <LegoBlock text="묻" type="purple" />
                    <LegoBlock text="습" type="gray" />
                    <LegoBlock text="니" type="gray" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="물" type="purple" />
                    <LegoBlock text="으" type="green" />
                    <LegoBlock text="십" type="green" />
                    <LegoBlock text="시" type="green" />
                    <LegoBlock text="오" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="여" type="brown" />
                    <LegoBlock text="쭙" type="brown" />
                    <LegoBlock text="습" type="gray" />
                    <LegoBlock text="니" type="gray" />
                    <LegoBlock text="다" type="gray" />
                </div>
            </div>
        </div>
    </div>
);

export const Ask4Diagram = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', fontFamily: 'Pretendard, sans-serif' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#e6e4d7', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#9d9990', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>중립(Neutral)
            </div>
            <div style={{ display: 'flex' }}>
                                                <LegoBlock text="묻" type="purple" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="묻" type="purple" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#c1b897', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#978e6c', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>주체 높임(Honor Subject)
            </div>
            <div style={{ display: 'flex' }}>
                <LegoBlock text="물" type="purple" />
                <LegoBlock text="으" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="물" type="purple" />
                <LegoBlock text="으" type="green" />
                <LegoBlock text="십" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="오" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#9e8f5d', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#7a6a3b', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>객체 높임(Honor Object)
            </div>
            <div style={{ display: 'flex' }}>
                <LegoBlock text="여" type="brown" />
                <LegoBlock text="쭙" type="brown" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="여" type="brown" />
                <LegoBlock text="쭙" type="brown" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
    </div>
);


export const Stay1Diagram = () => (
    <div style={{ display: 'flex', width: '100%', gap: '4rem', padding: '0', fontFamily: 'Pretendard, sans-serif', fontSize: '2.25rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          <div><span style={{ fontWeight: 700, color: '#7c7c7c' }}>stay</span><br/><span style={{ fontWeight: 700, color: '#00fb49' }}>can you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>stay</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>would you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>stay</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>could you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>stay</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>would you mind</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>stay<span style={{ color: '#00fb49' }}>ing</span></span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>I was wondering if you could possibly</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>stay</span></div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5rem', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#583884' }}>있</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#583884' }}>있</span><span style={{ fontWeight: 700, color: '#00fb49' }}>으시</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>계시</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>계십</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>니다</span></div>
      </div>
    </div>
);

export const Stay2Diagram = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8rem', padding: '0', fontFamily: 'Pretendard, sans-serif' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '30rem', height: '30rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, #583884 0%, #583884 25%, rgba(255,255,255,1) 45%, rgba(255,255,255,1) 55%, #00fb49 75%, #00fb49 100%)' }} />
          <div style={{ position: 'relative', zIndex: 10, color: '#ffffff', fontSize: '4rem', fontWeight: 700 }}>stay</div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 3.5rem)', gridTemplateRows: 'repeat(4, 3.5rem)', gap: 0 }}>
            <div style={{ gridColumn: '2 / span 2', display: 'flex' }}>
                <LegoBlock text="있" type="purple" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 3', display: 'flex' }}>
                <LegoBlock text="있" type="purple" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '1 / span 3', display: 'flex' }}>
                <LegoBlock text="있" type="purple" />
                <LegoBlock text="으" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 4', display: 'flex' }}>
                <LegoBlock text="있" type="purple" />
                <LegoBlock text="으" type="green" />
                <LegoBlock text="십" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="오" type="gray" />
            </div>
            <div style={{ gridColumn: '1 / span 3', display: 'flex' }}>
                <LegoBlock text="계" type="brown" />
                <LegoBlock text="시" type="brown" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 4', display: 'flex' }}>
                <LegoBlock text="계" type="brown" />
                <LegoBlock text="십" type="brown-green" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
      </div>
    </div>
);

export const Stay3Diagram = () => (
    <div style={{ display: 'flex', width: '100%', height: '35rem', fontFamily: 'Pretendard, sans-serif' }}>
        <div style={{ flex: 1, backgroundColor: '#70ebd7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#83cabe' }}>
                <span style={{ fontSize: '1.05rem', color: '#83cabe' }}><span style={{ fontWeight: 'bold', color: '#83cabe' }}>친밀한/비격식적 청자</span><br/>Intimate/Casual Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-end', width: '10.5rem' }}>
                <div style={{ display: 'flex' }}>
                                        <LegoBlock text="있" type="purple" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="있" type="purple" />
                    <LegoBlock text="으" type="green" />
                    <LegoBlock text="시" type="green" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="계" type="brown" />
                    <LegoBlock text="시" type="brown" />
                    <LegoBlock text="다" type="gray" />
                </div>
            </div>
        </div>
        <div style={{ flex: 1, backgroundColor: '#7a0927', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#833448' }}>
                <span style={{ fontSize: '1.05rem', color: '#833448' }}><span style={{ fontWeight: 'bold', color: '#833448' }}>격식적 청자</span><br/>Formal/Polite Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-end', width: '14rem' }}>
                <div style={{ display: 'flex' }}>
                                        <LegoBlock text="있" type="purple" />
                    <LegoBlock text="습" type="gray" />
                    <LegoBlock text="니" type="gray" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="있" type="purple" />
                    <LegoBlock text="으" type="green" />
                    <LegoBlock text="십" type="green" />
                    <LegoBlock text="시" type="green" />
                    <LegoBlock text="오" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="계" type="brown" />
                    <LegoBlock text="십" type="brown-green" />
                    <LegoBlock text="니" type="gray" />
                    <LegoBlock text="다" type="gray" />
                </div>
            </div>
        </div>
    </div>
);

export const Stay4Diagram = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', fontFamily: 'Pretendard, sans-serif' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#e6e4d7', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#9d9990', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>중립(Neutral)
            </div>
            <div style={{ display: 'flex' }}>
                                                <LegoBlock text="있" type="purple" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="있" type="purple" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#c1b897', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#978e6c', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>간접 주체 높임(Indirect Subject)
            </div>
            <div style={{ display: 'flex' }}>
                <LegoBlock text="있" type="purple" />
                <LegoBlock text="으" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="있" type="purple" />
                <LegoBlock text="으" type="green" />
                <LegoBlock text="십" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="오" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#9e8f5d', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#7a6a3b', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>직접 주체 높임(Direct Subject)
            </div>
            <div style={{ display: 'flex' }}>
                <LegoBlock text="계" type="brown" />
                <LegoBlock text="시" type="brown" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="계" type="brown" />
                <LegoBlock text="십" type="brown-green" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
    </div>
);


export const Eat1Diagram = () => (
    <div style={{ display: 'flex', width: '100%', gap: '4rem', padding: '0', fontFamily: 'Pretendard, sans-serif', fontSize: '2.25rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          <div><span style={{ fontWeight: 700, color: '#7c7c7c' }}>eat</span><br/><span style={{ fontWeight: 700, color: '#00fb49' }}>can you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>eat</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>would you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>eat</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>could you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>eat</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>would you mind</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>eat<span style={{ color: '#00fb49' }}>ing</span></span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>I was wondering if you could possibly</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>eat</span></div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5rem', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#583884' }}>먹</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>드시</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>드십</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>니다</span></div>
      </div>
    </div>
);

export const Eat2Diagram = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8rem', padding: '0', fontFamily: 'Pretendard, sans-serif' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '30rem', height: '30rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, #583884 0%, #583884 25%, rgba(255,255,255,1) 45%, rgba(255,255,255,1) 55%, #00fb49 75%, #00fb49 100%)' }} />
          <div style={{ position: 'relative', zIndex: 10, color: '#ffffff', fontSize: '4rem', fontWeight: 700 }}>eat</div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 3.5rem)', gridTemplateRows: 'repeat(4, 3.5rem)', gap: 0 }}>
            <div style={{ gridColumn: '2 / span 2', display: 'flex' }}>
                <LegoBlock text="먹" type="purple" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 3', display: 'flex' }}>
                <LegoBlock text="먹" type="purple" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '1 / span 3', display: 'flex' }}>
                <LegoBlock text="드" type="brown" />
                <LegoBlock text="시" type="brown" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 4', display: 'flex' }}>
                <LegoBlock text="드" type="brown" />
                <LegoBlock text="십" type="brown-green" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
      </div>
    </div>
);

export const Eat3Diagram = () => (
    <div style={{ display: 'flex', width: '100%', height: '35rem', fontFamily: 'Pretendard, sans-serif' }}>
        <div style={{ flex: 1, backgroundColor: '#70ebd7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#83cabe' }}>
                <span style={{ fontSize: '1.05rem', color: '#83cabe' }}><span style={{ fontWeight: 'bold', color: '#83cabe' }}>친밀한/비격식적 청자</span><br/>Intimate/Casual Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-end', width: '10.5rem' }}>
                <div style={{ display: 'flex' }}>
                                        <LegoBlock text="먹" type="purple" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="드" type="brown" />
                    <LegoBlock text="시" type="brown" />
                    <LegoBlock text="다" type="gray" />
                </div>
            </div>
        </div>
        <div style={{ flex: 1, backgroundColor: '#7a0927', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#833448' }}>
                <span style={{ fontSize: '1.05rem', color: '#833448' }}><span style={{ fontWeight: 'bold', color: '#833448' }}>격식적 청자</span><br/>Formal/Polite Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-end', width: '14rem' }}>
                <div style={{ display: 'flex' }}>
                                        <LegoBlock text="먹" type="purple" />
                    <LegoBlock text="습" type="gray" />
                    <LegoBlock text="니" type="gray" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="드" type="brown" />
                    <LegoBlock text="십" type="brown-green" />
                    <LegoBlock text="니" type="gray" />
                    <LegoBlock text="다" type="gray" />
                </div>
            </div>
        </div>
    </div>
);

export const Eat4Diagram = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', fontFamily: 'Pretendard, sans-serif' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#e6e4d7', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#9d9990', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>중립(Neutral)
            </div>
            <div style={{ display: 'flex' }}>
                                                <LegoBlock text="먹" type="purple" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="먹" type="purple" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#c1b897', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#978e6c', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>주체 높임(Honor Subject)
            </div>
            <div style={{ display: 'flex' }}>
                <LegoBlock text="드" type="brown" />
                <LegoBlock text="시" type="brown" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="드" type="brown" />
                <LegoBlock text="십" type="brown-green" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
    </div>
);
