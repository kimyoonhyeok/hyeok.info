"use client";
import React, { useState, useEffect } from 'react';

const COLORS = {
  purple: '#583884',
  gray: '#e7e7e7',
  green: '#00fb49',
  brown: '#867229', // Exact Gold from Illustrator
  lightBrown: '#98843f', // Assimilated Gold Circle from Illustrator
  cyan: '#00c1e5', // Exact Cyan from Illustrator
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

// Global cache for fetched SVGs to avoid re-fetching across re-renders
const svgCache: Record<string, string> = {};

interface SvgLoopProps {
  svgs: string[];
  bgColor?: string | string[];
  interval?: number;
  aspectRatio?: string;
}

export const Chapter3SvgLoop: React.FC<SvgLoopProps> = ({ 
  svgs, 
  bgColor = 'transparent', 
  interval = 1200,
  aspectRatio = '666.142 / 701.575'
}) => {
  const [step, setStep] = useState(0);
  const [svgData, setSvgData] = useState<string[]>(() => {
    return svgs.map((url) => svgCache[url] || '');
  });

  useEffect(() => {
    let isMounted = true;
    Promise.all(
      svgs.map(async (url) => {
        if (svgCache[url]) return svgCache[url];
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const text = await res.text();
          svgCache[url] = text;
          return text;
        } catch (e) {
          console.error(`Error loading SVG from ${url}:`, e);
          return '';
        }
      })
    ).then((results) => {
      if (isMounted) {
        setSvgData(results);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [svgs]);

  useEffect(() => {
    if (svgs.length <= 1) return;
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % svgs.length);
    }, interval);
    return () => clearInterval(timer);
  }, [svgs.length, interval]);

  const strongEase = 'cubic-bezier(0.76, 0, 0.24, 1)';
  const currentBg = Array.isArray(bgColor) ? bgColor[step] || 'transparent' : bgColor;
  const isInstant = Array.isArray(bgColor) && step === 0;

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh',
      marginLeft: 'calc(-50vw + 50%)',
      marginRight: 'calc(-50vw + 50%)',
      marginBottom: '4rem',
      marginTop: '4rem',
      backgroundColor: currentBg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      transition: isInstant ? 'none' : `background-color 0.6s ${strongEase}`
    }}>
      <div style={{
        position: 'relative',
        height: '75vh',
        width: 'auto',
        aspectRatio: aspectRatio,
        maxWidth: '90vw',
        maxHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible'
      }}>
        {svgData.map((rawSvg, idx) => (
          <div
            key={svgs[idx] || idx}
            dangerouslySetInnerHTML={{ __html: rawSvg }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: step === idx ? 1 : 0,
              transition: `opacity 0.6s ${strongEase}`,
              pointerEvents: 'none',
              overflow: 'visible'
            }}
          />
        ))}
      </div>
    </div>
  );
};

const CH3_V = '20260930_v5';

export const BiwiAnimatedDiagram = () => (
  <Chapter3SvgLoop svgs={[`/ch3_svgs/artboard_19.svg?v=${CH3_V}`, `/ch3_svgs/artboard_20.svg?v=${CH3_V}`]} bgColor="#867229" />
);

export const ChaemyeonAnimatedDiagram = () => (
  <Chapter3SvgLoop svgs={[`/ch3_svgs/artboard_21.svg?v=${CH3_V}`, `/ch3_svgs/artboard_22.svg?v=${CH3_V}`]} bgColor="transparent" />
);

export const YeomchiAnimatedDiagram = () => (
  <Chapter3SvgLoop svgs={[`/ch3_svgs/artboard_26.svg?v=${CH3_V}`, `/ch3_svgs/artboard_27.svg?v=${CH3_V}`, `/ch3_svgs/artboard_28.svg?v=${CH3_V}`]} bgColor="transparent" />
);

export const DoriAnimatedDiagram = () => (
  <Chapter3SvgLoop svgs={[`/ch3_svgs/artboard_18.svg?v=${CH3_V}`, `/ch3_svgs/artboard_17.svg?v=${CH3_V}`]} bgColor="#867229" />
);

export const OjilapAnimatedDiagram = () => (
  <Chapter3SvgLoop 
    svgs={[`/ch3_svgs/artboard_23.svg?v=${CH3_V}`, `/ch3_svgs/artboard_24.svg?v=${CH3_V}`]} 
    bgColor="transparent" 
    aspectRatio="820 / 720"
  />
);

export const AssertiveAnimatedDiagram = () => (
  <Chapter3SvgLoop svgs={[`/ch3_svgs/artboard_10.svg?v=${CH3_V}`, `/ch3_svgs/artboard_11.svg?v=${CH3_V}`, `/ch3_svgs/artboard_12.svg?v=${CH3_V}`]} bgColor={["transparent", "#867229", "#867229"]} />
);

export const TactAnimatedDiagram = () => (
  <Chapter3SvgLoop svgs={[`/ch3_svgs/artboard_7.svg?v=${CH3_V}`, `/ch3_svgs/artboard_8.svg?v=${CH3_V}`, `/ch3_svgs/artboard_9.svg?v=${CH3_V}`]} bgColor="transparent" />
);

export const NosyAnimatedDiagram = () => (
  <Chapter3SvgLoop svgs={[`/ch3_svgs/artboard_1.svg?v=${CH3_V}`, `/ch3_svgs/artboard_2.svg?v=${CH3_V}`]} bgColor="#583884" />
);

export const EntitledAnimatedDiagram = () => (
  <Chapter3SvgLoop 
    svgs={[`/ch3_svgs/artboard_5.svg?v=${CH3_V}`, `/ch3_svgs/artboard_4.svg?v=${CH3_V}`, `/ch3_svgs/artboard_6.svg?v=${CH3_V}`]} 
    bgColor="transparent" 
    aspectRatio="830 / 840"
  />
);
