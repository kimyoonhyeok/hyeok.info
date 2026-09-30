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
    // 4 stages, interval exactly 500ms
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // step 0: Fig 1 (Independent Individual) -> Blue circle only
  // step 1: Fig 2 (Situational Space) -> Gold BG only
  // step 2: Fig 1+2 (Embedded Individual) -> Blue circle inside Gold BG
  // step 3: Fig 3 (Atmospheric Alignment) -> Blue circle color changes

  const showCircle = step === 0 || step === 2 || step === 3;
  const showSquare = step >= 1;
  
  // No transitions at all (instant changes)
  const transitionStyle = 'none';
  
  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh',
      marginLeft: 'calc(-50vw + 50%)',
      marginRight: 'calc(-50vw + 50%)',
      marginBottom: '8rem',
      marginTop: '4rem',
      backgroundColor: showSquare ? COLORS.brown : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      transition: transitionStyle
    }}>
      <div style={{
        width: '75vh', // Circle size is proportional to viewport height
        height: '75vh',
        maxWidth: '90%',
        maxHeight: '90%',
        borderRadius: '50%',
        backgroundColor: step === 3 ? 'rgba(255, 255, 255, 0.15)' : COLORS.cyan,
        mixBlendMode: step === 3 ? 'overlay' : 'normal',
        opacity: showCircle ? 1 : 0,
        // When hidden, we can just leave it as scale(1) with opacity 0 since there's no transition
        transform: 'scale(1)',
        transition: transitionStyle
      }} />
    </div>
  );
};
