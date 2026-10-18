"use client";

import React, { useState } from "react";
import styles from "./Chapter2Instrument.module.css";
import {
  Give1Diagram,
  Give2Diagram,
  Give3Diagram,
  Give4Diagram,
  Ask1Diagram,
  Ask2Diagram,
  Ask3Diagram,
  Ask4Diagram,
  Stay1Diagram,
  Stay2Diagram,
  Stay3Diagram,
  Stay4Diagram,
  Eat1Diagram,
  Eat2Diagram,
  Eat3Diagram,
  Eat4Diagram,
  CHAPTER2_VERB_TILE_CONFIGS,
  VerbTilePairInteractive,
} from "./Chapter2Diagrams";

type VerbKey = "give" | "ask" | "stay" | "eat";

interface StageInfo {
  stageId: number;
  lensEn: string;
  lensKr: string;
  figureCaption: string;
  bookPageOffset: string;
  enText: string;
  krText: string;
  summary: string;
  component: React.ComponentType;
}

interface VerbData {
  key: VerbKey;
  num: string;
  nameKr: string;
  nameEn: string;
  bookPageSpan: string;
  stages: [StageInfo, StageInfo, StageInfo, StageInfo];
}

const CHAPTER2_VERBS: VerbData[] = [
  {
    key: "give",
    num: "01",
    nameKr: "주다",
    nameEn: "Give",
    bookPageSpan: "P. 76–81",
    stages: [
      {
        stageId: 1,
        lensEn: "Morphological Contrast",
        lensKr: "형태론적 대조",
        figureCaption: "Fig 2. Give 1 — Morphological contrast",
        bookPageOffset: "P. 76–77",
        enText:
          "English secures politeness by maintaining the core verb (give) and attaching syntactic padding—like modals—outside the clause to widen the psychological distance between speaker and listener.",
        krText:
          "반면 한국어는 문장 외부가 아닌 동사 내부로 침투하여, 어간 자체를 전면 교체하거나 여러 문법 형태소를 엄격한 순서대로 겹겹이 쌓아 올리는 형태론적 변환을 통해 수직적 위계와 격식을 표현합니다.",
        summary: "외부 통사적 패딩 (Syntactic Padding) vs 동사 내부 형태론적 변환 (Internal Morphology)",
        component: Give1Diagram,
      },
      {
        stageId: 2,
        lensEn: "Structural Metaphor",
        lensKr: "구조적 은유",
        figureCaption: "Fig 3. Give 2 — Visual metaphor",
        bookPageOffset: "P. 78–79",
        enText:
          "This graphic metaphorizes English's strategic politeness structure, where a soft cushion (green) expands flexibly like a round halo around an unchanging semantic core (purple) to mitigate interpersonal impact.",
        krText:
          "어근, 문법 형태소, 공손 표지가 각기 다른 기능의 레고 블록처럼 기계적으로 조립 및 교체됩니다. 이는 파악된 위계와 격식에 따라 결합 방식이 강제로 통제되는 교착어 특유의 엄격한 규범적 압력으로 표현될 수 있습니다.",
        summary: "둥근 후광 완충재 (Round Halo Cushion) vs 규범적 레고 조립 (Normative Lego Assembly)",
        component: Give2Diagram,
      },
      {
        stageId: 3,
        lensEn: "Listener Formality (X-axis)",
        lensKr: "청자 격식 (X축)",
        figureCaption: "Fig 4. Give 3 — Listener formality",
        bookPageOffset: "P. 80",
        enText:
          "The horizontal social distance from the listener can be expressed along the X-axis. It illustrates how sentence-ending blocks are replaced horizontally based on the distance between an intimate listener (cyan) and a formal listener (maroon).",
        krText:
          "청자와의 수평적인 사회 거리를 X축으로 표현할 수 있습니다. 구체적으로, 사적으로 친밀한 청자(청록색)와 공적으로 격식을 갖춰야 하는 청자(자주색)라는 거리감의 차이에 따라 종결 어미 블록이 수평적으로 교체되는 양상을 보여줍니다.",
        summary: "청록색 친밀 청자 (Intimate) vs 자주색 격식 청자 (Formal) 종결 블록 치환",
        component: Give3Diagram,
      },
      {
        stageId: 4,
        lensEn: "Referent Coordinate (Y-axis)",
        lensKr: "주체 및 객체 높임 (Y축)",
        figureCaption: "Fig 5. Give 4 — Referent coordinate",
        bookPageOffset: "P. 81",
        enText:
          "The vertical hierarchy of the referent can be expressed along the Y-axis. Starting from a neutral layer, it step-by-step demonstrates the vertical layer expansion triggered by a subject-honoring suffix (-si-) and an object-honoring suppletive (deurida).",
        krText:
          "언급되는 대상의 수직적 위계를 Y축을 통해 표현할 수 있습니다. 구체적으로, 중립 층위에서 출발해, 주체를 높이는 어미(-시-)와 객체를 높이는 보충 어휘(드리다)가 개입하여 일으키는 수직적인 층위 확장을 단계적으로 보여줍니다.",
        summary: "중립 층위 → 주체 높임(-시-) → 객체 높임(드리다) 3단계 수직 확장",
        component: Give4Diagram,
      },
    ],
  },
  {
    key: "ask",
    num: "02",
    nameKr: "묻다",
    nameEn: "Ask",
    bookPageSpan: "P. 82–87",
    stages: [
      {
        stageId: 1,
        lensEn: "Morphological Contrast",
        lensKr: "형태론적 대조",
        figureCaption: "Fig 6. Ask 1 — Morphological contrast",
        bookPageOffset: "P. 82–83",
        enText:
          "English secures politeness by maintaining the core verb (ask) and attaching syntactic padding outside the clause to widen the psychological distance between speaker and listener.",
        krText:
          "영어는 핵심 동사(ask)의 형태를 고정시킨 채, 조동사나 완곡 표현 등 문장 바깥의 통사적 완충재를 덧붙여 화자와 청자 사이의 심리적 거리를 벌리고 공손성을 확보합니다. 반면 한국어는 문장 외부가 아닌 동사 내부로 침투하여, 문법 형태소(-시-)를 엄격한 순서대로 쌓아 올리거나 어근 자체를 전면 교체(여쭙-)하는 형태론적 변환을 통해 수직적 위계와 격식을 표현합니다.",
        summary: "고정된 ask + 외부 완충 vs 묻- / 물으시- / 여쭙- 형태소 전면 교체",
        component: Ask1Diagram,
      },
      {
        stageId: 2,
        lensEn: "Structural Metaphor",
        lensKr: "구조적 은유",
        figureCaption: "Fig 7. Ask 2 — Structural metaphor",
        bookPageOffset: "P. 84–85",
        enText:
          "This graphic metaphorizes English’s strategic politeness structure, where a soft cushion expands flexibly like a round halo around an unchanging semantic core (purple) to mitigate interpersonal impact. In Korean, roots, grammatical morphemes, and politeness markers are mechanically assembled like Lego blocks. This reflects the strict normative pressure of agglutinative languages, where combinations are forcibly controlled by hierarchy and formality.",
        krText:
          "변하지 않는 의미의 핵(보라색)을 중심으로, 부드러운 완충재(초록색)가 마치 둥근 후광처럼 유연하게 팽창하며 대인적 충격을 완화해 나가는 영어 특유의 전략적인 공손성 구조를 은유한 그래픽입니다. 반면 한국어는 어근, 문법 형태소, 공손 표지가 각기 다른 기능의 레고 블록처럼 기계적으로 조립·교체됩니다. 이는 파악된 위계와 격식에 따라 결합 방식이 강제로 통제되는 교착어 특유의 엄격한 규범적 압력을 시각화한 것입니다.",
        summary: "후광형 완충 팽창 vs 어근-접사 기계적 결합",
        component: Ask2Diagram,
      },
      {
        stageId: 3,
        lensEn: "Listener Formality (X-axis)",
        lensKr: "청자 격식 (X축)",
        figureCaption: "Fig 8. Ask 3 — Listener formality",
        bookPageOffset: "P. 86",
        enText:
          "The horizontal social distance from the listener is expressed along the X-axis. It illustrates how sentence-ending blocks are replaced horizontally based on the distance between an intimate listener (cyan) and a formal listener (maroon).",
        krText:
          "청자와의 수평적인 사회 거리를 나타내는 좌표계의 X축 시각화입니다. 사적으로 친밀한 청자(청록색)와 공적으로 격식을 갖춰야 하는 청자(자주색)라는 거리감의 차이에 따라 종결 어미 블록이 수평적으로 교체되는 양상을 보여줍니다.",
        summary: "묻다/물으시다/여쭙다 (친밀) → 묻습니다/물으십시오/여쭙습니다 (격식)",
        component: Ask3Diagram,
      },
      {
        stageId: 4,
        lensEn: "Referent Coordinate (Y-axis)",
        lensKr: "주체 및 객체 높임 (Y축)",
        figureCaption: "Fig 9. Ask 4 — Referent coordinate",
        bookPageOffset: "P. 87",
        enText:
          "The vertical hierarchy of the referent can be expressed along the Y-axis. Starting from a neutral layer, it demonstrates the vertical layer expansion triggered by a subject-honoring suffix (-si-) and an object-honoring suppletive (yeojjupda).",
        krText:
          "언급되는 대상의 수직적 위계를 나타내는 좌표계의 Y축 시각화입니다. 중립 층위에서 출발해, 주체를 높이는 어미(-시-)와 객체를 높이는 보충 어휘(여쭙다)가 개입하여 일으키는 수직적인 층위 확장을 단계적으로 보여줍니다.",
        summary: "중립(묻다/묻습니다) → 주체(물으시다/물으십시오) → 객체(여쭙다/여쭙습니다)",
        component: Ask4Diagram,
      },
    ],
  },
  {
    key: "stay",
    num: "03",
    nameKr: "있다",
    nameEn: "Stay",
    bookPageSpan: "P. 88–93",
    stages: [
      {
        stageId: 1,
        lensEn: "Morphological Contrast",
        lensKr: "형태론적 대조",
        figureCaption: "Fig 10. Stay 1 — Morphological contrast",
        bookPageOffset: "P. 88–89",
        enText:
          "English secures politeness by maintaining the core verb (stay) and attaching syntactic padding outside the clause to widen the psychological distance between speaker and listener.",
        krText:
          "영어는 핵심 동사(stay)의 형태를 고정시킨 채, 조동사나 가정법 등 문장 바깥의 통사적 완충재를 덧붙여 화자와 청자 사이의 심리적 거리를 벌리고 공손성을 확보합니다. 반면 한국어는 문장 외부가 아닌 동사 내부로 침투하여, 문법 형태소를 엄격하게 결합(있으시다)하거나 어근 자체를 완전히 전면 교체(계시다)하는 형태론적 변환을 통해 수직적 위계와 격식을 표현합니다.",
        summary: "stay 고정 + 통사적 완곡어 vs 있다 / 있으시다 / 계시다 어휘적 분화",
        component: Stay1Diagram,
      },
      {
        stageId: 2,
        lensEn: "Structural Metaphor",
        lensKr: "구조적 은유",
        figureCaption: "Fig 11. Stay 2 — Structural metaphor",
        bookPageOffset: "P. 90–91",
        enText:
          "This graphic metaphorizes English’s strategic politeness structure, where a soft cushion expands flexibly like a round halo around an unchanging semantic core (purple) to mitigate interpersonal impact. In Korean, roots, grammatical morphemes, and politeness markers are mechanically assembled like Lego blocks. This reflects the strict normative pressure of agglutinative languages, where combinations are forcibly controlled by hierarchy and formality.",
        krText:
          "변하지 않는 의미의 핵(보라색)을 중심으로, 부드러운 완충재(초록색)가 마치 둥근 후광처럼 유연하게 팽창하며 대인적 충격을 완화해 나가는 영어 특유의 전략적인 공손성 구조를 은유한 그래픽입니다. 어근, 문법 형태소, 공손 표지가 각기 다른 기능의 레고 블록처럼 기계적으로 조립·교체됩니다. 이는 파악된 위계와 격식에 따라 결합 방식이 강제로 통제되는 교착어 특유의 엄격한 규범적 압력을 시각화한 것입니다.",
        summary: "유연한 후광 완충 vs 어근 교체 및 블록 재조립",
        component: Stay2Diagram,
      },
      {
        stageId: 3,
        lensEn: "Listener Formality (X-axis)",
        lensKr: "청자 격식 (X축)",
        figureCaption: "Fig 12. Stay 3 — Listener formality",
        bookPageOffset: "P. 92",
        enText:
          "The horizontal social distance from the listener is expressed along the X-axis. It illustrates how sentence-ending blocks are replaced horizontally based on the distance between an intimate listener (cyan) and a formal listener (maroon).",
        krText:
          "청자와의 수평적인 사회 거리를 나타내는 좌표계의 X축 시각화입니다. 사적으로 친밀한 청자(청록색)와 공적으로 격식을 갖춰야 하는 청자(자주색)라는 거리감의 차이에 따라 종결 어미 블록이 수평적으로 교체되는 양상을 보여줍니다.",
        summary: "있다/계시다 (친밀) → 있습니다/계십니다 (격식)",
        component: Stay3Diagram,
      },
      {
        stageId: 4,
        lensEn: "Referent Coordinate (Y-axis)",
        lensKr: "주체 및 객체 높임 (Y축)",
        figureCaption: "Fig 13. Stay 4 — Referent coordinate",
        bookPageOffset: "P. 93",
        enText:
          "The vertical hierarchy of the referent can be expressed along the Y-axis. Starting from a neutral layer, it shows the layer expansion triggered by an indirect subject-honoring suffix (-usi-) and a direct subject-honoring suppletive (gyesida).",
        krText:
          "언급되는 대상의 수직적 위계를 나타내는 좌표계의 Y축 시각화입니다. 중립 층위에서 출발해, 주체를 간접적으로 높이는 방식(있으시다)과 직접적으로 높이는 보충 어휘(계시다)가 개입하며 일으키는 층위 확장을 보여줍니다.",
        summary: "중립(있다) → 간접 주체 높임(있으시다) → 직접 주체 높임(계시다)",
        component: Stay4Diagram,
      },
    ],
  },
  {
    key: "eat",
    num: "04",
    nameKr: "먹다",
    nameEn: "Eat",
    bookPageSpan: "P. 94–99",
    stages: [
      {
        stageId: 1,
        lensEn: "Morphological Contrast",
        lensKr: "형태론적 대조",
        figureCaption: "Fig 14. Eat 1 — Morphological contrast",
        bookPageOffset: "P. 94–95",
        enText:
          "English secures politeness by maintaining the core verb (eat) and attaching syntactic padding outside the clause to widen the psychological distance between speaker and listener. Conversely, Korean expresses vertical hierarchy and formality through morphological transformations—penetrating the verb to replace the base stem (meok-) entirely with a suppletive form (deusi-).",
        krText:
          "영어는 핵심 동사(eat)의 형태를 고정시킨 채, 조동사나 완곡 표현 등 문장 바깥의 통사적 완충재를 덧붙여 화자와 청자 사이의 심리적 거리를 벌리고 공손성을 확보합니다. 반면 한국어는 문장 외부가 아닌 동사 내부로 침투하여, 기본 어근(먹-)을 특수 어휘(드시-)로 완전히 전면 교체하는 극단적인 형태론적 변환을 통해 화자와 청자 사이의 수직적 위계와 격식을 표현합니다.",
        summary: "핵심 동사 eat 불변 vs 먹다 → 드시다 / 잡수시다 어휘 전면 대체",
        component: Eat1Diagram,
      },
      {
        stageId: 2,
        lensEn: "Structural Metaphor",
        lensKr: "구조적 은유",
        figureCaption: "Fig 15. Eat 2 — Structural metaphor",
        bookPageOffset: "P. 96–97",
        enText:
          "This graphic metaphorizes English’s strategic politeness structure, where a soft cushion expands flexibly like a round halo around an unchanging semantic core (purple) to mitigate interpersonal impact. This shows the mechanical assembly of a suppletive form (brown block) replacing the base root. It visualizes how agglutinative languages strictly control and alter base word forms based on perceived hierarchy.",
        krText:
          "변하지 않는 의미의 핵(보라색)을 중심으로, 부드러운 완충재(초록색)가 마치 둥근 후광처럼 유연하게 팽창하며 대인적 충격을 완화해 나가는 영어 특유의 전략적인 공손성 구조를 은유한 그래픽입니다. 어근을 완전히 전면 교체하는 보충 어휘(갈색 블록)의 기계적인 조립 양상을 보여줍니다. 이는 파악된 위계에 따라 기본 어형이 파괴되고 강제로 통제되는 교착어 특유의 엄격한 규범적 압력을 시각화한 것입니다.",
        summary: "후광 쿠션 확장 vs 보충 어휘 블록(갈색) 전면 치환",
        component: Eat2Diagram,
      },
      {
        stageId: 3,
        lensEn: "Listener Formality (X-axis)",
        lensKr: "청자 격식 (X축)",
        figureCaption: "Fig 16. Eat 3 — Listener formality",
        bookPageOffset: "P. 98",
        enText:
          "The horizontal social distance from the listener is expressed along the X-axis. It illustrates how sentence-ending blocks are replaced horizontally based on the distance between an intimate listener (cyan) and a formal listener (maroon).",
        krText:
          "청자와의 수평적인 사회 거리를 나타내는 좌표계의 X축 시각화입니다. 사적으로 친밀한 청자(청록색)와 공적으로 격식을 갖춰야 하는 청자(자주색)라는 거리감의 차이에 따라 종결 어미 블록이 수평적으로 교체되는 양상을 보여줍니다.",
        summary: "먹다/드시다 (친밀) → 먹습니다/드십니다 (격식)",
        component: Eat3Diagram,
      },
      {
        stageId: 4,
        lensEn: "Referent Coordinate (Y-axis)",
        lensKr: "주체 및 객체 높임 (Y축)",
        figureCaption: "Fig 17. Eat 4 — Referent coordinate",
        bookPageOffset: "P. 99",
        enText:
          "The vertical hierarchy of the referent can be expressed along the Y-axis. Since the object of eating (food) cannot be socially elevated, the vertical layer expansion is strictly limited to the subject-honoring suppletive (deusida) without an object-honoring tier.",
        krText:
          "언급되는 대상의 수직적 위계를 나타내는 Y축 시각화입니다. 취식의 대상(음식)은 사회적으로 높일 수 없어 객체 높임이 성립하지 않으므로, 주체 높임(드시다)으로만 수직적인 층위 확장이 제한되는 엄격한 규칙을 보여줍니다.",
        summary: "중립(먹다/먹습니다) → 주체 높임 보충 어휘(드시다/잡수시다)",
        component: Eat4Diagram,
      },
    ],
  },
];

export default function Chapter2Instrument({ lang = "en" }: { lang?: "en" | "kr" }) {
  const [hoveredVerbKey, setHoveredVerbKey] = useState<VerbKey | null>(null);

  const activeVerb = hoveredVerbKey
    ? CHAPTER2_VERBS.find((v) => v.key === hoveredVerbKey) || null
    : null;

  return (
    <div className={styles.instrumentWrapper}>
      {/* ── Top Bar: Title ───────────────────────────── */}
      <div className={styles.topBar}>
        <div className={styles.titleRow}>
          <div className={styles.instrumentMeta}>
            <span className={styles.instrumentCategory}>Chapter 02 / Instrument</span>
            <h3 className={styles.instrumentTitle}>
              {lang === "en"
                ? "Morphological Mechanisms & Verb Assembler"
                : "형태론적 기제 및 동사 조립기"}
            </h3>
          </div>
        </div>
      </div>

      {/* ── Main Stage: Vertical Flow (Above / 4-Verb 2-Square Tiles with Inline Hover Accordion) ─── */}
      <div className={styles.verticalStage}>
        {/* Footnote-style consistent caption bar: only figure caption and book page reference */}
        <div className={styles.stageHeader}>
          <div className={styles.captionBar}>
            <span className={styles.figureCaption}>
              {activeVerb
                ? lang === "en"
                  ? `Fig 2–17. Morphological Contrast & Structural Metaphor (${activeVerb.num}. ${activeVerb.nameEn} / ${activeVerb.nameKr})`
                  : `그림 2–17. 형태론적 대조 및 구조적 은유 (${activeVerb.num}. ${activeVerb.nameKr} / ${activeVerb.nameEn})`
                : lang === "en"
                ? "Fig 2–17. Morphological Contrast & Structural Metaphor"
                : "그림 2–17. 형태론적 대조 및 구조적 은유"}
            </span>
            <span className={styles.bookRefBadge}>
              Ref. book {activeVerb ? activeVerb.bookPageSpan : "P. 76–99"}
            </span>
          </div>
        </div>

        {/* Center: All 4 Verbs as 2-Square Joined Tiles; hovering a verb expands its explanation directly below it */}
        <div className={styles.diagramArea}>
          <div className={styles.diagramInnerCanvas}>
            {CHAPTER2_VERBS.map((verb) => {
              const tileConfig =
                CHAPTER2_VERB_TILE_CONFIGS.find((c) => c.key === verb.key) ||
                CHAPTER2_VERB_TILE_CONFIGS[0];
              const isOpen = hoveredVerbKey === verb.key;

              return (
                <div
                  key={verb.key}
                  className={styles.verbAccordionItem}
                  onMouseEnter={() => setHoveredVerbKey(verb.key)}
                  onMouseLeave={() => setHoveredVerbKey(null)}
                >
                  <VerbTilePairInteractive config={tileConfig} />

                  <div
                    className={`${styles.verbAccordionPanel} ${
                      isOpen ? styles.verbAccordionPanelOpen : ""
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div className={styles.verbAccordionPanelInner}>
                      <div className={styles.stageFooter}>
                        <div className={styles.colorKeyBar}>
                          <div className={styles.keyItem}>
                            <span
                              className={styles.keyBlock}
                              style={{ backgroundColor: "#583884" }}
                            />
                            <span>{lang === "en" ? "Root" : "어근"}</span>
                          </div>
                          <div className={styles.keyItem}>
                            <span
                              className={styles.keyBlock}
                              style={{ backgroundColor: "#e7e7e7" }}
                            />
                            <span>{lang === "en" ? "Morpheme" : "문법 형태소"}</span>
                          </div>
                          <div className={styles.keyItem}>
                            <span
                              className={styles.keyBlock}
                              style={{ backgroundColor: "#00fb49" }}
                            />
                            <span>{lang === "en" ? "Politeness" : "공손 표지"}</span>
                          </div>
                          <div className={styles.keyItem}>
                            <span
                              className={styles.keyBlock}
                              style={{ backgroundColor: "#85712a" }}
                            />
                            <span>{lang === "en" ? "Suppletive" : "보충 어휘"}</span>
                          </div>
                        </div>

                        <div className={styles.summaryBox}>
                          <span className={styles.summaryLabel}>
                            {lang === "en"
                              ? `${verb.num}. ${verb.nameEn} (${verb.nameKr}) — Key Mechanism`
                              : `${verb.num}. ${verb.nameKr} (${verb.nameEn}) — 핵심 구조`}
                          </span>
                          <span className={styles.summaryText}>
                            {verb.stages[0].summary}
                          </span>
                        </div>

                        {verb.stages.map((st) => (
                          <div key={st.stageId} className={styles.textSection}>
                            <span className={styles.sectionLabel}>
                              {lang === "en"
                                ? `${st.figureCaption} (${st.bookPageOffset})`
                                : `${st.figureCaption} — ${st.lensKr} (${st.bookPageOffset})`}
                            </span>
                            <p
                              className={
                                lang === "en" ? styles.analysisEn : styles.analysisKr
                              }
                            >
                              {lang === "en" ? st.enText : st.krText}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
