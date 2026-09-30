import React from 'react';

const COLORS = {
  purple: '#583884',
  gray: '#e7e7e7',
  green: '#00fb49',
  brown: '#85712a',
  cyan: '#00b7eb',
  lightGray: '#f5f5f5',
};

// Nunchi Visuals ONLY
// To fill the screen like the PDF, we set width: '100%' and aspect-ratio: '1/1'.
export const NunchiFig1 = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', aspectRatio: '1/1' }}>
    <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: COLORS.cyan }} />
  </div>
);

export const NunchiFig2 = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', aspectRatio: '1/1' }}>
    <div style={{ width: '100%', height: '100%', backgroundColor: COLORS.brown }} />
  </div>
);

export const NunchiFig1_2 = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', aspectRatio: '1/1' }}>
    <div style={{ width: '100%', height: '100%', backgroundColor: COLORS.brown, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '75%', height: '75%', borderRadius: '50%', backgroundColor: COLORS.cyan }} />
    </div>
  </div>
);

export const NunchiFig3 = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', aspectRatio: '1/1' }}>
    <div style={{ width: '100%', height: '100%', backgroundColor: COLORS.brown, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '75%', height: '75%', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.15)', mixBlendMode: 'overlay' }} />
    </div>
  </div>
);
