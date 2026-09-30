import re

with open('app/(sub)/graduation-show/components/Chapter2Diagrams.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# I will define Ask, Stay, and Eat diagrams.

ask_diagrams = """
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
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#583884' }}>묻</span><span style={{ fontWeight: 700, color: '#e7e7e7', backgroundColor: '#e7e7e7', color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#583884' }}>물</span><span style={{ fontWeight: 700, color: '#00fb49', backgroundColor: '#00fb49', color: '#7c7c7c' }}>으시</span><span style={{ fontWeight: 700, color: '#e7e7e7', backgroundColor: '#e7e7e7', color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>여쭙</span><span style={{ fontWeight: 700, color: '#e7e7e7', backgroundColor: '#e7e7e7', color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>여쭙</span><span style={{ fontWeight: 700, color: '#00fb49', backgroundColor: '#00fb49', color: '#7c7c7c' }}>습니</span><span style={{ fontWeight: 700, color: '#e7e7e7', backgroundColor: '#e7e7e7', color: '#7c7c7c' }}>다</span></div>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start', width: '10.5rem' }}>
                <div style={{ display: 'flex' }}>
                    <GhostBlock text="주" />
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start', width: '14rem' }}>
                <div style={{ display: 'flex' }}>
                    <GhostBlock text="주" />
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
        <div style={{ display: 'flex', backgroundColor: '#e6e4d7', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#9d9990', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>중립(Neutral)
            </div>
            <div style={{ display: 'flex' }}>
                <GhostBlock text="주" />
                <GhostBlock text="시" />
                <LegoBlock text="묻" type="purple" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="묻" type="purple" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', backgroundColor: '#c1b897', minHeight: '3.5rem' }}>
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
        <div style={{ display: 'flex', backgroundColor: '#9e8f5d', minHeight: '3.5rem' }}>
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
"""

stay_diagrams = """
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
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#583884' }}>있</span><span style={{ fontWeight: 700, color: '#e7e7e7', backgroundColor: '#e7e7e7', color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#583884' }}>있</span><span style={{ fontWeight: 700, color: '#00fb49', backgroundColor: '#00fb49', color: '#7c7c7c' }}>으시</span><span style={{ fontWeight: 700, color: '#e7e7e7', backgroundColor: '#e7e7e7', color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>계시</span><span style={{ fontWeight: 700, color: '#e7e7e7', backgroundColor: '#e7e7e7', color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>계십</span><span style={{ fontWeight: 700, color: '#e7e7e7', backgroundColor: '#e7e7e7', color: '#7c7c7c' }}>니다</span></div>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start', width: '10.5rem' }}>
                <div style={{ display: 'flex' }}>
                    <GhostBlock text="주" />
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start', width: '14rem' }}>
                <div style={{ display: 'flex' }}>
                    <GhostBlock text="주" />
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
        <div style={{ display: 'flex', backgroundColor: '#e6e4d7', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#9d9990', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>중립(Neutral)
            </div>
            <div style={{ display: 'flex' }}>
                <GhostBlock text="주" />
                <GhostBlock text="시" />
                <LegoBlock text="있" type="purple" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="있" type="purple" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', backgroundColor: '#c1b897', minHeight: '3.5rem' }}>
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
        <div style={{ display: 'flex', backgroundColor: '#9e8f5d', minHeight: '3.5rem' }}>
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
"""

eat_diagrams = """
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
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#583884' }}>먹</span><span style={{ fontWeight: 700, color: '#e7e7e7', backgroundColor: '#e7e7e7', color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>드시</span><span style={{ fontWeight: 700, color: '#e7e7e7', backgroundColor: '#e7e7e7', color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>드십</span><span style={{ fontWeight: 700, color: '#e7e7e7', backgroundColor: '#e7e7e7', color: '#7c7c7c' }}>니다</span></div>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start', width: '10.5rem' }}>
                <div style={{ display: 'flex' }}>
                    <GhostBlock text="주" />
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
        <div style={{ flex 1, backgroundColor: '#7a0927', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#833448' }}>
                <span style={{ fontSize: '1.05rem', color: '#833448' }}><span style={{ fontWeight: 'bold', color: '#833448' }}>격식적 청자</span><br/>Formal/Polite Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start', width: '14rem' }}>
                <div style={{ display: 'flex' }}>
                    <GhostBlock text="주" />
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
        <div style={{ display: 'flex', backgroundColor: '#e6e4d7', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#9d9990', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>중립(Neutral)
            </div>
            <div style={{ display: 'flex' }}>
                <GhostBlock text="주" />
                <GhostBlock text="시" />
                <LegoBlock text="먹" type="purple" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="먹" type="purple" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', backgroundColor: '#c1b897', minHeight: '3.5rem' }}>
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
"""

if "export const Ask1Diagram" not in content:
    with open('app/(sub)/graduation-show/components/Chapter2Diagrams.tsx', 'a', encoding='utf-8') as f:
        f.write("\n" + ask_diagrams + "\n" + stay_diagrams + "\n" + eat_diagrams)
