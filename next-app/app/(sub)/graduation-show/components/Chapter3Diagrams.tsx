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
      marginBottom: '4rem',
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


interface ImageLoopProps {
  images: string[];
  bgColor?: string;
  interval?: number;
}

export const Chapter3ImageLoop: React.FC<ImageLoopProps> = ({ 
  images, 
  bgColor = 'transparent', 
  interval = 1200 
}) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const strongEase = 'cubic-bezier(0.76, 0, 0.24, 1)';

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh',
      marginLeft: 'calc(-50vw + 50%)',
      marginRight: 'calc(-50vw + 50%)',
      marginBottom: '4rem',
      marginTop: '4rem',
      backgroundColor: bgColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'relative',
        width: '75vh',
        height: '75vh',
        maxWidth: '90%',
        maxHeight: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt=""
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: step === idx ? 1 : 0,
              transition: `opacity 0.6s ${strongEase}`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const BiwiAnimatedDiagram = () => (
  <Chapter3ImageLoop images={["/ch3_figures/biwi_0.jpeg", "/ch3_figures/biwi_1.jpeg"]} bgColor="#85712a" />
);

export const ChaemyeonAnimatedDiagram = () => (
  <Chapter3ImageLoop images={["/ch3_figures/chaemyeon_0.jpeg", "/ch3_figures/chaemyeon_1.jpeg"]} bgColor="transparent" />
);

export const YeomchiAnimatedDiagram = () => (
  <Chapter3ImageLoop images={["/ch3_figures/yeomchi_0.jpeg", "/ch3_figures/yeomchi_1.jpeg", "/ch3_figures/yeomchi_2.jpeg"]} bgColor="transparent" />
);

export const DoriAnimatedDiagram = () => (
  <Chapter3ImageLoop images={["/ch3_figures/dori_0.jpeg", "/ch3_figures/dori_1.jpeg"]} bgColor="#85712a" />
);

export const OjilapAnimatedDiagram = () => (
  <Chapter3ImageLoop images={["/ch3_figures/ojilap_0.jpeg", "/ch3_figures/ojilap_1.jpeg"]} bgColor="transparent" />
);

export const AssertiveAnimatedDiagram = () => (
  <Chapter3ImageLoop images={["/ch3_figures/assertive_0.jpeg", "/ch3_figures/assertive_1.png", "/ch3_figures/assertive_2.jpeg"]} bgColor="transparent" />
);

export const TactAnimatedDiagram = () => (
  <Chapter3ImageLoop images={["/ch3_figures/tact_0.jpeg", "/ch3_figures/tact_1.jpeg", "/ch3_figures/tact_2.jpeg"]} bgColor="transparent" />
);

export const NosyAnimatedDiagram = () => (
  <Chapter3ImageLoop images={["/ch3_figures/nosy_0.jpeg", "/ch3_figures/nosy_1.jpeg"]} bgColor="#583884" />
);

export const EntitledAnimatedDiagram = () => (
  <Chapter3ImageLoop images={["/ch3_figures/entitled_0.jpeg", "/ch3_figures/entitled_1.jpeg", "/ch3_figures/entitled_2.jpeg"]} bgColor="transparent" />
);
