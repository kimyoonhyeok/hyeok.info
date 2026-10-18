"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "./ChapterNavigation.module.css";

export interface ChapterNavItem {
  id: string;
  num: string;
  titleEn: string;
  titleKr: string;
  color: string;
  contrastColor: string; // Adjusted HSB (low/high brightness) for high contrast on its matching hero background
}

export const CHAPTERS: ChapterNavItem[] = [
  {
    id: "chapter-0",
    num: "00",
    titleEn: "Introduction",
    titleKr: "서론",
    color: "#03c1e5", // Cyan
    contrastColor: "#003844",
  },
  {
    id: "chapter-1",
    num: "01",
    titleEn: "Addressing and Social Hierarchy",
    titleKr: "호칭과 사회적 위계",
    color: "#ff560d", // Orange
    contrastColor: "#420c00", // Same hue (18°), low B / deep dark rust
  },
  {
    id: "chapter-2",
    num: "02",
    titleEn: "Grammatical Politeness and Social Distance",
    titleKr: "문법적 경어와 사회적 거리",
    color: "#85712a", // Gold/Olive
    contrastColor: "#fff2bf", // Same hue (46°), high B (100%) pale bright gold
  },
  {
    id: "chapter-3",
    num: "03",
    titleEn: "Situational Perception and Affective Norms",
    titleKr: "상황 인지와 정서적 규범",
    color: "#02fb49", // Vivid Green
    contrastColor: "#00380f", // Same hue (137°), low B deep forest green
  },
  {
    id: "chapter-4",
    num: "04",
    titleEn: "Conversational Rituals and Dialogue Perspectives",
    titleKr: "대화 의례와 소통의 관점",
    color: "#03c1e5", // Cyan
    contrastColor: "#003844", // Same hue (190°), low B deep navy teal
  },
  {
    id: "chapter-5",
    num: "05",
    titleEn: "Appendix",
    titleKr: "부록",
    color: "#583884", // Purple
    contrastColor: "#ebd9ff", // Same hue (266°), high B light lavender
  },
];

interface ChapterNavigationProps {
  lang?: "en" | "kr";
  onToggleLang?: (lang: "en" | "kr") => void;
  onVisibilityChange?: (visible: boolean) => void;
}

export default function ChapterNavigation({
  lang = "en",
  onToggleLang,
  onVisibilityChange,
}: ChapterNavigationProps) {
  const [progress, setProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [containerHeight, setContainerHeight] = useState(800);
  const [activeHeroId, setActiveHeroId] = useState<string | null>(null);

  const scrollTimer = useRef<NodeJS.Timeout | null>(null);
  const rafId = useRef<number | null>(null);

  // Measure container height (80vh)
  useEffect(() => {
    const updateSize = () => {
      if (typeof window !== "undefined") {
        setContainerHeight(window.innerHeight * 0.8);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Calculate smooth scroll progress across the 6 chapters
  const calculateProgress = useCallback(() => {
    if (typeof window === "undefined") return;

    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    // Detect if navigation is currently over a chapter's colored 100vh hero section
    let matchedHero: string | null = null;
    const heroIds = ["chapter-1", "chapter-2", "chapter-3", "chapter-4", "chapter-5"];
    for (const hid of heroIds) {
      const el = document.getElementById(hid);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.7 && rect.bottom > vh * 0.3) {
          matchedHero = hid;
          break;
        }
      }
    }
    setActiveHeroId(matchedHero);

    const positions = CHAPTERS.map((ch) => {
      const el = document.getElementById(ch.id);
      if (!el) return null;
      return el.getBoundingClientRect().top + scrollY;
    });

    let currentProgress = 0;
    const triggerOffset = vh * 0.45;

    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      if (pos === null) continue;

      if (scrollY >= pos - triggerOffset) {
        if (i === positions.length - 1) {
          currentProgress = i;
        } else {
          const nextPos = positions[i + 1];
          if (nextPos !== null) {
            const segment = nextPos - pos;
            const t = Math.min(
              1,
              Math.max(0, (scrollY - (pos - triggerOffset)) / Math.max(segment, 1))
            );
            currentProgress = i + t;
          } else {
            currentProgress = i;
          }
        }
      }
    }

    setProgress(currentProgress);
  }, []);

  // Scroll visibility handler: fade in while scrolling, fade out after idle pause
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
      scrollTimer.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1200);

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      rafId.current = requestAnimationFrame(calculateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [calculateProgress]);

  const scrollToChapter = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isVisible = isScrolling || isHovered;

  useEffect(() => {
    onVisibilityChange?.(isVisible);
  }, [isVisible, onVisibilityChange]);

  // Semicircular dial geometry (occupies 80vh vertically, curves outward to the right)
  const centerY = containerHeight / 2;
  const stepY = Math.max(76, Math.min(108, containerHeight * 0.135));

  return (
    <>
      {/* ── Semicircular Rotating Wheel Navigation (80vh × 25~30vw) ── */}
      <nav
        className={`${styles.dialNav} ${isVisible ? styles.dialNavVisible : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Semicircular Dial Navigation"
      >
        {/* Semicircular SVG Track */}
        <div className={styles.arcSvgWrapper}>
          <svg
            viewBox="0 0 280 800"
            className={styles.arcSvg}
            preserveAspectRatio="none"
          >
            {/* Curved dashed guideline matching item arc */}
            <path
              d="M 16 80 C 185 220, 185 580, 16 720"
              fill="none"
              stroke={
                activeHeroId
                  ? activeHeroId === "chapter-5"
                    ? "rgba(255, 255, 255, 0.25)"
                    : "rgba(0, 0, 0, 0.2)"
                  : "#dedede"
              }
              strokeWidth="1.5"
              strokeDasharray="3 4"
            />
          </svg>
        </div>

        {/* Dynamic Chapter Items rotating along the Semicircular Arc */}
        <div className={styles.dialAnchor}>
          {CHAPTERS.map((ch, idx) => {
            const m = idx - progress;
            const p = Math.abs(m);

            // Uniform vertical spacing to eliminate bunching / twisting
            const y = centerY + m * stepY;

            // Cosine arc peaking outward to the right at active center (m = 0)
            const x = Math.max(
              16,
              140 * Math.cos(Math.min(Math.PI / 2, p * 0.52))
            );

            const scale = Math.max(0.78, 1 - p * 0.08);
            const opacity = Math.max(0, 1 - p * 0.38);
            const isActive = p < 0.45;
            const isClickable = opacity > 0.15;

            // When entering a hero section whose background matches the chapter color,
            // adjust HSB (contrastColor) so text is clearly distinguishable
            const isOverMatchingHero = activeHeroId === ch.id;
            const itemColor = isActive
              ? isOverMatchingHero
                ? ch.contrastColor
                : ch.color
              : activeHeroId
              ? activeHeroId === "chapter-5"
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(0, 0, 0, 0.35)"
              : "#dedede";

            return (
              <button
                key={ch.id}
                type="button"
                className={`${styles.dialItem} ${isActive ? styles.dialItemActive : ""}`}
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                  opacity,
                  visibility: opacity > 0.01 ? "visible" : "hidden",
                  pointerEvents: isClickable ? "auto" : "none",
                  zIndex: isActive ? 10 : 1,
                }}
                onClick={() => scrollToChapter(ch.id)}
              >
                {/* Chapter Title: 18px font size, 700 when active, 400 when inactive */}
                <span
                  className={styles.dialTitle}
                  style={{
                    color: itemColor,
                    fontWeight: isActive ? 700 : 400,
                    fontSize: "18px",
                  }}
                >
                  {lang === "en" ? ch.titleEn : ch.titleKr}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── Boxless Language Toggle at Bottom Right ── */}
      <div className={styles.bottomLangToggle} aria-label="Language Toggle">
        <button
          type="button"
          className={`${styles.langBtn} ${lang === "en" ? styles.langBtnActive : ""}`}
          onClick={() => onToggleLang?.("en")}
        >
          EN
        </button>
        <span className={styles.langDivider}>/</span>
        <button
          type="button"
          className={`${styles.langBtn} ${lang === "kr" ? styles.langBtnActive : ""}`}
          onClick={() => onToggleLang?.("kr")}
        >
          KR
        </button>
      </div>
    </>
  );
}
