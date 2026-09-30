"use client";
import React, { useState, useEffect } from 'react';

const COLORS = {
  purple: '#583884',
  gray: '#e7e7e7',
  green: '#00fb49',
  brown: '#85712a', // Gold BG
  lightBrown: '#ad9643', // Assimilated Gold Circle
  cyan: '#00b7eb',
  lightGray: '#f5f5f5',
};

export const NunchiAnimatedDiagram = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 4 stages. 1200ms interval.
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const showCircle = step === 0 || step === 2 || step === 3;
  const showSquare = step >= 1;
  
  const strongEase = 'cubic-bezier(0.76, 0, 0.24, 1)';
  
  // Step 0 (Reset) and Step 1 (BG instantly appears, circle instantly removed) should have NO transitions.
  // Step 2 and Step 3 should have transitions for fading in and color morphing.
  const isInstant = step === 0 || step === 1;
  const containerTransition = isInstant ? 'none' : `background-color 0.6s ${strongEase}`;
  const circleTransition = isInstant ? 'none' : `opacity 0.6s ${strongEase}, background-color 0.6s ${strongEase}`;
  
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
        backgroundColor: step === 3 ? COLORS.lightBrown : COLORS.cyan,
        opacity: showCircle ? 1 : 0,
        transform: 'scale(1)',
        transition: circleTransition
      }} />
    </div>
  );
};
