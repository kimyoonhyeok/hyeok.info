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
    // 4 stages, interval 2560ms
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2560);
    return () => clearInterval(interval);
  }, []);

  // step 0: Fig 1 (Independent Individual) -> Blue circle only
  // step 1: Fig 2 (Situational Space) -> Gold BG only (100vw instantly)
  // step 2: Fig 1+2 (Embedded Individual) -> Blue circle fades in inside Gold BG
  // step 3: Fig 3 (Atmospheric Alignment) -> Blue circle color changes

  const isFullWidth = step >= 1;
  const showCircle = step === 0 || step === 2 || step === 3;
  const showSquare = step >= 1;
  
  // Instantly reset on step 0, instantly appear/disappear on step 1
  const transitionStyle = (step === 1 || step === 0) ? 'none' : 'all 1.28s ease-in-out';
  
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
      <div style={{
        position: 'relative',
        width: isFullWidth ? '100vw' : '800px',
        maxWidth: isFullWidth ? '100vw' : '100%',
        height: '800px',
        maxHeight: '800px',
        marginLeft: isFullWidth ? 'calc(-50vw + 50%)' : '0',
        marginRight: isFullWidth ? 'calc(-50vw + 50%)' : '0',
        backgroundColor: showSquare ? COLORS.brown : 'transparent',
        transition: transitionStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '600px',
          height: '600px',
          maxWidth: '90%',
          maxHeight: '90%',
          borderRadius: '50%',
          backgroundColor: step === 3 ? 'rgba(255, 255, 255, 0.15)' : COLORS.cyan,
          mixBlendMode: step === 3 ? 'overlay' : 'normal',
          opacity: showCircle ? 1 : 0,
          transform: showCircle ? 'scale(1)' : 'scale(1)',
          transition: transitionStyle
        }} />
      </div>
    </div>
  );
};
