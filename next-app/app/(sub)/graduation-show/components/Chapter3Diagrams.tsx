"use client";
import React, { useState, useEffect } from 'react';

const COLORS = {
  purple: '#583884',
  gray: '#e7e7e7',
  green: '#00fb49',
  brown: '#85712a',
  cyan: '#00b7eb',
  lightGray: '#f5f5f5',
};

export const NunchiAnimatedDiagram = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 4 stages, speed increased by 125% (4000ms / 1.25 = 3200ms interval)
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // step 0: Fig 1 (Independent Individual) -> Blue circle only
  // step 1: Fig 2 (Situational Space) -> Gold BG only
  // step 2: Fig 1+2 (Embedded Individual) -> Blue circle inside Gold BG (normal size)
  // step 3: Fig 3 (Atmospheric Alignment) -> Gold BG expands to 100vw, Blue circle color changes (overlay)

  const isFullWidth = step === 3;
  const showCircle = step === 0 || step === 2 || step === 3;
  const showSquare = step >= 1;
  
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '800px',
      marginBottom: '4rem'
    }}>
      {/* Container that animates its width and margin to break out of parent padding */}
      <div style={{
        position: 'relative',
        width: isFullWidth ? '100vw' : '800px',
        maxWidth: isFullWidth ? '100vw' : '100%',
        height: isFullWidth ? '100vh' : '800px',
        maxHeight: isFullWidth ? '100vh' : '800px',
        marginLeft: isFullWidth ? 'calc(-50vw + 50%)' : '0',
        marginRight: isFullWidth ? 'calc(-50vw + 50%)' : '0',
        backgroundColor: showSquare ? COLORS.brown : 'transparent',
        transition: 'all 1.6s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* The Blue Circle */}
        <div style={{
          width: isFullWidth ? '75vh' : '600px',
          height: isFullWidth ? '75vh' : '600px',
          maxWidth: '90%',
          maxHeight: '90%',
          borderRadius: '50%',
          backgroundColor: step === 3 ? 'rgba(255, 255, 255, 0.15)' : COLORS.cyan,
          mixBlendMode: step === 3 ? 'overlay' : 'normal',
          opacity: showCircle ? 1 : 0,
          transform: showCircle ? 'scale(1)' : 'scale(0.5)',
          transition: 'all 1.6s ease-in-out'
        }} />
      </div>
    </div>
  );
};
