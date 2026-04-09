import React from 'react';

const ColorConfusionGraphic = () => {
  return (
    <div style={{
      width: '100%',
      backgroundColor: '#E8E8E8',
      borderRadius: '8px',
      padding: '3rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2.5rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      fontFamily: '"Pretendard", "Noto Sans KR", sans-serif',
      color: '#333'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '0.8rem' }}>
          Gestalt Theory in Epistemic Imbalance
        </h3>
        <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto', wordBreak: 'keep-all' }}>
          정상 시력에서는 명확한 색상 대비(Red/Green)로 인해 인물들이 <strong>&apos;분리된 두 객체&apos;</strong>로 인지되지만,<br/>
          색맹 시뮬레이션(Color Confusion)에서는 색상 경계가 무너져 게슈탈트 원리(Gestalt form)에 의해 즉각적으로 <strong>&apos;하나의 완벽한 하트 형태&apos;</strong>로 통합 인식됩니다.
        </p>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '900px',
        justifyContent: 'space-around',
        gap: '3rem',
        flexWrap: 'wrap'
      }}>
        {/* NORMAL VISION */}
        <div style={{ flex: 1, minWidth: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.05em', color: '#555', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            정상 시력 (Normal Vision)
          </span>
          <svg viewBox="0 20 210 180" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.08))' }}>
            
            {/* Left Figure: Male (Red) */}
            <g fill="none" stroke="#D73027" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="78" cy="72" r="13" />
              {/* Outer arm/back (left contour of heart) */}
              <path d="M 105,60 C 90,40 50,50 50,90 C 50,120 75,140 105,165" />
              {/* Inner shoulder */}
              <path d="M 50,90 C 65,85 85,90 105,110" />
              {/* Lower inner V-line */}
              <path d="M 58,110 L 105,165" />
              {/* Lower Arch */}
              <path d="M 75,165 C 75,120 95,120 95,165" strokeWidth="8" />
            </g>

            {/* Right Figure: Female (Green) */}
            <g fill="none" stroke="#1A9850" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="132" cy="72" r="13" />
              {/* Outer arm/back (right contour of heart) */}
              <path d="M 105,60 C 120,40 160,50 160,90 C 160,120 135,140 105,165" />
              {/* Inner shoulder */}
              <path d="M 160,90 C 145,85 125,90 105,110" />
              {/* Lower inner V-line */}
              <path d="M 152,110 L 105,165" />
              {/* Lower Arch */}
              <path d="M 135,165 C 135,120 115,120 115,165" strokeWidth="8" />
            </g>

            <text x="75" y="193" fontSize="7" fill="#D73027" textAnchor="middle" fontWeight="bold">남 (#D73027)</text>
            <text x="135" y="193" fontSize="7" fill="#1A9850" textAnchor="middle" fontWeight="bold">여 (#1A9850)</text>
          </svg>
        </div>

        {/* DEUTERANOPIA SIMULATION */}
        <div style={{ flex: 1, minWidth: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.05em', color: '#555', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            색맹 시뮬레이션 (Deuteranopia)
          </span>
          <svg viewBox="0 20 210 180" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.08))' }}>
            
            {/* Outline highlight defining the Gestalt macro-shape */ }
            <path d="M 105,60 C 90,40 50,50 50,90 C 50,120 75,140 105,165 C 135,140 160,120 160,90 C 160,50 120,40 105,60 Z" 
                  fill="#8B7355" fillOpacity="0.08" stroke="none" />
                  
            {/* The Unified Form (Gestalt) - Both Brown #8B7355 */}
            {/* Left Figure */}
            <g fill="none" stroke="#8B7355" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="78" cy="72" r="13" />
              <path d="M 105,60 C 90,40 50,50 50,90 C 50,120 75,140 105,165" />
              <path d="M 50,90 C 65,85 85,90 105,110" />
              <path d="M 58,110 L 105,165" />
              <path d="M 75,165 C 75,120 95,120 95,165" strokeWidth="8" />
            </g>
            {/* Right Figure */}
            <g fill="none" stroke="#8B7355" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="132" cy="72" r="13" />
              <path d="M 105,60 C 120,40 160,50 160,90 C 160,120 135,140 105,165" />
              <path d="M 160,90 C 145,85 125,90 105,110" />
              <path d="M 152,110 L 105,165" />
              <path d="M 135,165 C 135,120 115,120 115,165" strokeWidth="8" />
            </g>
            
            <text x="105" y="193" fontSize="7" fill="#8B7355" textAnchor="middle" fontWeight="bold">통합된 단일 형태 (하트만 보임)</text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ColorConfusionGraphic;
