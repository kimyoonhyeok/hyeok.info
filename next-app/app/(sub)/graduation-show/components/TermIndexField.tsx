"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RelationalDiagram, type GenderType, type BoundaryType } from "./Chapter1Diagrams";
import { CH1_TERMS, type TermEntry, type DiagramVariant } from "./chapter1Terms.data";
import styles from "./TermIndexField.module.css";

/* ── Coordinate → field position ──────────────────────────────────────────────
   Same orientation as Fig 1: X (Distance) grows to the right, Y (Hierarchy) grows upward.
   Y = 0 (N/A) sits on the baseline. Terms sharing a coordinate are spread on a small,
   deterministic ring so positions never change between renders. */
const X_MIN = 10, X_SPAN = 76;   // % of field width   (x: 0 → 10%, x: 3 → 86%)
const Y_BASE = 86, Y_SPAN = 70;  // % of field height  (y: 0 → 86%, y: 3 → 16%)
const RING_X = 9, RING_Y = 10;   // cluster ring radius in %

interface PositionedTerm extends TermEntry {
  left: number;
  top: number;
  x: number;
  y: number;
}

function layoutTerms(terms: TermEntry[]): PositionedTerm[] {
  const groups = new Map<string, TermEntry[]>();
  terms.forEach((t) => {
    const v = t.variants[0];
    const key = `${v.targetX},${v.targetY}`;
    groups.set(key, [...(groups.get(key) ?? []), t]);
  });

  return terms.map((t) => {
    const v = t.variants[0];
    const group = groups.get(`${v.targetX},${v.targetY}`)!;
    const n = group.length;
    const i = group.indexOf(t);
    let dx = 0, dy = 0;
    if (n > 1) {
      // n = 2 → left / right; n = 3 → top-left / top-right / bottom
      const angle = (n === 2 ? Math.PI : -Math.PI / 2 - Math.PI / n) + (i * 2 * Math.PI) / n;
      dx = Math.cos(angle) * RING_X;
      dy = Math.sin(angle) * RING_Y;
    }
    return {
      ...t,
      x: v.targetX,
      y: v.targetY,
      left: X_MIN + (v.targetX / 3) * X_SPAN + dx,
      top: Y_BASE - (v.targetY / 3) * Y_SPAN + dy,
    };
  });
}

const GENDER_EN: Record<GenderType, string> = { neutral: "Neutral", female: "Female", male: "Male", combined: "Neutral" };
const GENDER_KR: Record<GenderType, string> = { neutral: "성별 무관", female: "여성", male: "남성", combined: "성별 무관" };
const BOUNDARY_TEXT: Record<BoundaryType, string> = {
  kinship: "Kinship / 친족",
  ingroup: "In-group / 내집단",
  outgroup: "Out-group / 외집단",
  none: "No boundary / 경계 없음",
};

function variantCaption(v: DiagramVariant) {
  const t2en = v.target2Gender ? ` / ${GENDER_EN[v.target2Gender]}` : "";
  const t2kr = v.target2Gender ? ` / ${GENDER_KR[v.target2Gender]}` : "";
  return {
    en: `${GENDER_EN[v.speakerGender]} → ${GENDER_EN[v.targetGender]}${t2en}`,
    kr: `${GENDER_KR[v.speakerGender]} → ${GENDER_KR[v.targetGender]}${t2kr}`,
  };
}

const fmt = (n: number) => (n === 0 ? "N/A" : n.toFixed(1));

/* ── Preview panel ──────────────────────────────────────────────────────────── */
const PreviewPanel = React.memo(function PreviewPanel({
  term,
  pinned,
  visible,
  onClose,
}: {
  term: PositionedTerm | null;
  pinned: boolean;
  visible: boolean;
  onClose: () => void;
}) {
  if (!term) return <aside className={styles.panel} aria-hidden="true" />;
  const count = term.variants.length;

  return (
    <aside
      className={`${styles.panel} ${visible ? styles.panelVisible : ""}`}
      aria-live="polite"
      aria-label={`${term.en} / ${term.kr}`}
    >
      <header className={styles.panelHeader}>
        <span className={styles.panelId}>{term.id}</span>
        <span className={styles.panelTitle}>
          {term.en} <span className={styles.panelTitleKr}>{term.kr}</span>
        </span>
        {pinned && (
          <button type="button" className={styles.panelClose} onClick={onClose} aria-label="Close">
            ×
          </button>
        )}
      </header>

      {/* Equal-size figure grid: identical cell size regardless of figure count */}
      <div className={styles.figGrid} data-count={count}>
        {term.variants.map((v, i) => {
          const cap = variantCaption(v);
          return (
            <figure key={i} className={styles.figCell}>
              <div className={styles.figFrame}>
                <RelationalDiagram {...v} compact />
              </div>
              <figcaption className={styles.figCaption}>
                {count > 1 && <span className={styles.figIndex}>{`${i + 1}/${count}`}</span>}
                <span>{cap.en}</span>
                <span>{cap.kr}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <p className={styles.panelMeta}>
        X {fmt(term.x)}&nbsp;&nbsp;Y {fmt(term.y)}&nbsp;&nbsp;·&nbsp;&nbsp;{BOUNDARY_TEXT[term.boundary]}
      </p>
      <p className={styles.panelSummary}>{term.summaryEn}</p>
      <p className={styles.panelSummary}>{term.summaryKr}</p>

      {pinned && (
        <a className={styles.panelLink} href={`#${term.anchor}`}>
          Read more / 상세 보기 →
        </a>
      )}
    </aside>
  );
});

/* ── Field ──────────────────────────────────────────────────────────────────── */
export default function TermIndexField() {
  const terms = useMemo(() => layoutTerms(CH1_TERMS), []);
  const fieldRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  // Keeps the last shown term mounted during the fade-out
  const [lastId, setLastId] = useState<string | null>(null);

  const activeId = hoveredId ?? pinnedId;

  useEffect(() => {
    if (activeId) setLastId(activeId);
  }, [activeId]);

  useEffect(() => {
    const el = fieldRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Leaving the field (scroll) clears the selection so the panel never lingers over other sections
  useEffect(() => {
    if (!inView) {
      setHoveredId(null);
      setPinnedId(null);
    }
  }, [inView]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPinnedId(null);
        setHoveredId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const togglePin = useCallback((id: string) => {
    setPinnedId((prev) => (prev === id ? null : id));
  }, []);

  const panelTerm = terms.find((t) => t.id === (activeId ?? lastId)) ?? null;

  return (
    <div className={styles.wrapper}>
      <p className={styles.figLabel}>Fig 2. Address Term Index (호칭 색인)</p>
      <p className={styles.hint}>Hover or select a term · 단어에 마우스를 올리거나 선택하세요</p>

      <div
        ref={fieldRef}
        className={styles.field}
        onMouseLeave={() => setHoveredId(null)}
        data-active={activeId ? "true" : "false"}
      >
        {/* Axes (same orientation as Fig 1) */}
        <div className={styles.axisY} aria-hidden="true">
          <span className={styles.axisLabelY}>Hierarchy ↑</span>
        </div>
        <div className={styles.axisX} aria-hidden="true">
          <span className={styles.axisLabelX}>Distance →</span>
        </div>

        {terms.map((t) => {
          const isActive = activeId === t.id;
          return (
            <button
              key={t.id}
              type="button"
              className={`${styles.term} ${isActive ? styles.termActive : ""} ${pinnedId === t.id ? styles.termPinned : ""}`}
              style={{ left: `${t.left}%`, top: `${t.top}%` }}
              onMouseEnter={() => setHoveredId(t.id)}
              onFocus={() => setHoveredId(t.id)}
              onBlur={() => setHoveredId(null)}
              onClick={() => togglePin(t.id)}
              aria-pressed={pinnedId === t.id}
            >
              <span className={styles.termId}>{t.id}</span>
              <span className={styles.termEn}>{t.en}</span>
              <span className={styles.termKr}>{t.kr}</span>
            </button>
          );
        })}
      </div>

      <PreviewPanel
        term={panelTerm}
        pinned={!!pinnedId && pinnedId === activeId}
        visible={inView && !!activeId}
        onClose={() => setPinnedId(null)}
      />
    </div>
  );
}
