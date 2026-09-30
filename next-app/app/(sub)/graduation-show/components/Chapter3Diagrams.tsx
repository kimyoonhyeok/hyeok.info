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
    // 4 stages. Speed increased to 1200ms (faster than 1500ms).
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // step 0: Fig 1 (Independent Individual) -> Blue circle only
  // step 1: Fig 2 (Situational Space) -> Gold BG only
  // step 2: Fig 1+2 (Embedded Individual) -> Blue circle inside Gold BG
  // step 3: Fig 3 (Atmospheric Alignment) -> Blue circle color changes

  const showCircle = step === 0 || step === 2 || step === 3;
  const showSquare = step >= 1;
  
  // Custom cubic-bezier for a more pronounced ("선명한") ease-in-out effect
  const strongEase = 'cubic-bezier(0.76, 0, 0.24, 1)';
  // Transition duration set to 0.6s to make the distinct easing curve clearly visible
  const containerTransition = `background-color 0.6s ${strongEase}`;
  const circleTransition = `opacity 0.6s ${strongEase}, background-color 0.6s ${strongEase}`;
  
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
      transition: containerTransition
    }}>
      <div style={{
        width: '75vh',
        height: '75vh',
        maxWidth: '90%',
        maxHeight: '90%',
        borderRadius: '50%',
        backgroundColor: step === 3 ? 'rgba(255, 255, 255, 0.15)' : COLORS.cyan,
        mixBlendMode: step === 3 ? 'overlay' : 'normal',
        opacity: showCircle ? 1 : 0,
        transform: 'scale(1)',
        transition: circleTransition
      }} />
    </div>
  );
};
