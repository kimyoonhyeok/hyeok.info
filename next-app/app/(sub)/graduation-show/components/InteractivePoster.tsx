"use client";

import React from "react";
import styles from "./InteractivePoster.module.css";

interface InteractivePosterProps {
  lang?: "en" | "kr";
  onToggleLang?: (lang: "en" | "kr") => void;
}

export default function InteractivePoster({
  lang = "en",
}: InteractivePosterProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let rafId = 0;
    let targetX = 52;
    let targetY = 36;
    let currentX = 52;
    let currentY = 36;
    let scrollProg = 0;

    const updateVars = () => {
      currentX += (targetX - currentX) * 0.32;
      currentY += (targetY - currentY) * 0.32;

      const dx = (currentX - 50) / 50; // -1 .. 1
      const dy = (currentY - 50) / 50; // -1 .. 1
      const angle = 118 + dx * 32 - dy * 20 + scrollProg * 58;
      const bandShift = (dx * 22 + dy * 26 + scrollProg * 75).toFixed(2);

      el.style.setProperty("--pointer-x", `${currentX.toFixed(2)}%`);
      el.style.setProperty("--pointer-y", `${currentY.toFixed(2)}%`);
      el.style.setProperty("--foil-angle", `${angle.toFixed(1)}deg`);
      el.style.setProperty("--foil-band-shift", `${bandShift}%`);
      el.style.setProperty(
        "--scroll-sweep",
        `${(scrollProg * 110 - 5).toFixed(2)}%`
      );
      el.style.setProperty("--scroll-progress", scrollProg.toFixed(3));

      if (
        Math.abs(targetX - currentX) > 0.02 ||
        Math.abs(targetY - currentY) > 0.02
      ) {
        rafId = requestAnimationFrame(updateVars);
      } else {
        rafId = 0;
      }
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateVars);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      targetX = Math.max(
        0,
        Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
      );
      targetY = Math.max(
        0,
        Math.min(100, ((e.clientY - rect.top) / rect.height) * 100)
      );
      scheduleUpdate();
    };

    const handlePointerLeave = () => {
      targetX = 52;
      targetY = 36;
      scheduleUpdate();
    };

    const handleScroll = () => {
      const vh = window.innerHeight || 1;
      scrollProg = Math.max(0, Math.min(1, window.scrollY / vh));
      targetX = 52 + Math.sin(scrollProg * Math.PI * 1.4) * 28;
      targetY = 28 + scrollProg * 54;
      scheduleUpdate();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    el.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const prefix = lang === "en" ? "en" : "kr";
  const combinedSrc = `/graduation-show/poster/svg/${prefix}_combined.svg`;
  const goldSrc = `/graduation-show/poster/svg/${prefix}_gold.svg`;
  const cyanSrc = `/graduation-show/poster/svg/${prefix}_cyan.svg`;
  const graySrc = `/graduation-show/poster/svg/${prefix}_gray.svg`;

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {/* SVG Filter Definitions for Physical Foil Micro-Grain & Paper Tooth */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="foilMetallicGrain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="1"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="
                0 0 0 0 0.88
                0 0 0 0 0.78
                0 0 0 0 0.42
                0 0 0 0.24 0"
              in="noise"
              result="coloredNoise"
            />
            <feComposite
              operator="in"
              in="coloredNoise"
              in2="SourceGraphic"
              result="maskedNoise"
            />
            <feBlend
              mode="overlay"
              in="maskedNoise"
              in2="SourceGraphic"
              result="grainedFoil"
            />
          </filter>

          <filter id="cyanInkGrain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="1"
              stitchTiles="stitch"
              result="inkNoise"
            />
            <feColorMatrix
              type="matrix"
              values="
                0 0 0 0 0.16
                0 0 0 0 0.68
                0 0 0 0 0.82
                0 0 0 0.19 0"
              in="inkNoise"
              result="coloredInkNoise"
            />
            <feComposite
              operator="in"
              in="coloredInkNoise"
              in2="SourceGraphic"
              result="maskedInkNoise"
            />
            <feBlend
              mode="overlay"
              in="maskedInkNoise"
              in2="SourceGraphic"
              result="grainedCyan"
            />
          </filter>
        </defs>
      </svg>

      {/* Subtle Matte Paper Stock Texture Overlay */}
      <div className={styles.paperStockTexture} aria-hidden="true" />

      <div className={styles.graphicContainer}>
        <div className={styles.posterStage}>
          {/* Invisible sizing reference matching exact SVG aspect ratio */}
          <img
            src={combinedSrc}
            alt=""
            aria-hidden="true"
            className={
              lang === "en" ? styles.sizingPosterEn : styles.sizingPosterKr
            }
          />

          {/* Layer 1: Gold Foil Base + Physical Metallic Foil Luster & Grain (금박) */}
          <div className={styles.goldLayerGroup}>
            <img
              src={goldSrc}
              alt=""
              aria-hidden="true"
              className={styles.plateImg}
            />
            <div
              className={styles.goldFoilShimmer}
              style={{
                WebkitMaskImage: `url("${goldSrc}")`,
                maskImage: `url("${goldSrc}")`,
              }}
            />
            <div
              className={styles.goldFoilGrain}
              style={{
                WebkitMaskImage: `url("${goldSrc}")`,
                maskImage: `url("${goldSrc}")`,
              }}
            />
          </div>

          {/* Layer 2: Cyan Ink Plate + Tactile Print Grain Texture */}
          <div className={styles.cyanLayerGroup}>
            <img
              src={cyanSrc}
              alt={lang === "en" ? "The Shapes of Language" : "언어의 형태"}
              className={`${styles.plateImg} ${styles.cyanBaseImg}`}
            />
            <div
              className={styles.cyanInkTexture}
              style={{
                WebkitMaskImage: `url("${cyanSrc}")`,
                maskImage: `url("${cyanSrc}")`,
              }}
            />
          </div>

          {/* Layer 3: Title Gray Plate (#bcbcbc matching background paper) */}
          <img
            src={graySrc}
            alt=""
            aria-hidden="true"
            className={`${styles.plateImg} ${styles.grayLayer}`}
          />
        </div>
      </div>
    </div>
  );
}
