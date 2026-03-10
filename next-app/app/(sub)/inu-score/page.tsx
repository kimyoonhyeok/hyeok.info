"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import styles from "./ishihara-score.module.css";

// ─────────────────────────────────────────────────────────
// 1. DATA STRUCTURES
// ─────────────────────────────────────────────────────────

type DotCategory = "STAFF_LINE" | "NOTE_HEAD" | "NOISE";

interface DotNode {
    x: number;
    y: number;
    radius: number;
    color: string;
    category: DotCategory;
    note: string;
    lastPlayed: number;
    seed: number;
    isPlayed?: boolean;
}

type ViewMode = "NORMAL" | "COLORBLIND";

// ─────────────────────────────────────────────────────────
// 2. COLOR PALETTES — 2 modes × 3 categories = 6 arrays
// ─────────────────────────────────────────────────────────

// Option 1: COLORBLIND (Abnormal Vision)
// Everything is the same autumn confusion palette — camouflage
const CB_STAFF_COLORS = ["#C4A35A", "#B8976E", "#A89060", "#9E8855", "#B5A06A"];
const CB_NOTE_COLORS = ["#C9AB6B", "#BDA270", "#A69058", "#B0985E", "#C1A862"];
const CB_NOISE_COLORS = ["#D4B87D", "#C8AD73", "#BCA068", "#D0B478", "#C5AA6E"];

// Option 2 & 3: NORMAL
// Staff = bold red/dark orange (prominent trap lines)
// Notes = bright yellow/orange (targets, visible but embedded)
// Noise = green/khaki (background)
const NORMAL_STAFF_COLORS = ["#E74C3C", "#C0392B", "#D35400", "#A93226"];
const NORMAL_NOTE_COLORS = ["#F1C40F", "#F39C12", "#E67E22", "#D35400"];
const NORMAL_NOISE_COLORS = ["#8FAF6B", "#9DB863", "#7D9E58", "#8BA85E", "#96B066"];

// ─────────────────────────────────────────────────────────
// 3. AUDIO SCALES & FREQUENCIES
// ─────────────────────────────────────────────────────────

// Pentatonic for NOTE_HEAD (Type C Melody)
const MELODY_SCALE = [
    "C4", "D#4", "F4", "G4", "A#4",
    "C5", "D#5", "F5", "G5", "A#5",
];

// Type A Noise: Chaotic random chromatic cluster (Abnormal View / NOISE dots)
const CHAOS_NOTES = [
    "A1", "C2", "D#2", "F#2", "A2",
    "C#3", "E3", "G3", "A#3",
    "D4", "F#4", "A4",
    "C#5", "E5", "G#5", "B5",
    "D6", "F6", "A6", "C7",
];

// Type B Noise: Diminished 7th cycle (STAFF_LINE trap dots)
const DIM7_CYCLE = ["C4", "Eb4", "Gb4", "A4"];

const NOTE_DEBOUNCE = 300;

// ─────────────────────────────────────────────────────────
// 4/5. DENSE CIRCLE PACKING (High-Res Image Tracing)
// ─────────────────────────────────────────────────────────

function denseCirclePack(
    w: number, h: number,
    classifier: (x: number, y: number) => DotCategory
): DotNode[] {
    const dots: DotNode[] = [];
    const passes = [
        { minR: 12, maxR: 22, maxFails: 2000 },
        { minR: 8, maxR: 14, maxFails: 4000 },
        { minR: 4, maxR: 8, maxFails: 8000 },
        { minR: 3, maxR: 5, maxFails: 10000 },
    ];
    const GAP = 1.2;

    for (const pass of passes) {
        let fails = 0;
        while (fails < pass.maxFails) {
            const r = pass.minR + Math.random() * (pass.maxR - pass.minR);
            const x = r + Math.random() * (w - 2 * r);
            const y = r + Math.random() * (h - 2 * r);
            let overlaps = false;
            for (let i = 0; i < dots.length; i++) {
                const d = dots[i];
                const dx = d.x - x;
                const dy = d.y - y;
                if (dx * dx + dy * dy < (d.radius + r + GAP) ** 2) { overlaps = true; break; }
            }
            if (!overlaps) {
                const category = classifier(x, y);

                dots.push({
                    x, y, radius: r, color: "",
                    category,
                    note: "", lastPlayed: 0,
                    seed: Math.random() * Math.PI * 2,
                });
                fails = 0;
            } else { fails++; }
        }
    }
    return dots;
}

// ─────────────────────────────────────────────────────────
// 6. HELPERS
// ─────────────────────────────────────────────────────────

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function assignColors(dots: DotNode[], mode: ViewMode): void {
    let staffPalette: string[], notePalette: string[], noisePalette: string[];

    switch (mode) {
        case "COLORBLIND":
            staffPalette = CB_STAFF_COLORS;
            notePalette = CB_NOTE_COLORS;
            noisePalette = CB_NOISE_COLORS;
            break;
        case "NORMAL":
            staffPalette = NORMAL_STAFF_COLORS;
            notePalette = NORMAL_NOTE_COLORS;
            noisePalette = NORMAL_NOISE_COLORS;
            break;
    }

    for (const dot of dots) {
        switch (dot.category) {
            case "STAFF_LINE": dot.color = pickRandom(staffPalette); break;
            case "NOTE_HEAD": dot.color = pickRandom(notePalette); break;
            case "NOISE": dot.color = pickRandom(noisePalette); break;
        }
    }
}

function assignNotes(dots: DotNode[]): void {
    const noteDots = dots.filter((d) => d.category === "NOTE_HEAD").sort((a, b) => a.x - b.x);
    noteDots.forEach((d, i) => { d.note = MELODY_SCALE[i % MELODY_SCALE.length]; });
}

// ─────────────────────────────────────────────────────────
// 7. DRAWING — organic floating ±1px
// ─────────────────────────────────────────────────────────

function drawFrame(
    ctx: CanvasRenderingContext2D,
    dots: DotNode[],
    w: number, h: number,
    t: number,
    hoveredIdx: number
): void {
    ctx.fillStyle = "#F5F0E8";
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const ox = Math.sin(t * 0.6 + dot.seed) * 1.0;
        const oy = Math.cos(t * 0.8 + dot.seed * 1.3) * 1.0;

        ctx.beginPath();
        ctx.arc(dot.x + ox, dot.y + oy, dot.radius, 0, Math.PI * 2);

        if (dot.isPlayed) {
            ctx.fillStyle = "#F1C40F"; // Bright Gold
            ctx.shadowColor = "rgba(241, 196, 15, 0.8)";
            ctx.shadowBlur = 15;
            ctx.fill();
            // Reset shadows for next items
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
        } else {
            ctx.fillStyle = dot.color;
            if (i === hoveredIdx) {
                ctx.shadowColor = "rgba(0,0,0,0.3)";
                ctx.shadowBlur = 12;
            } else {
                ctx.shadowColor = "transparent";
                ctx.shadowBlur = 0;
            }
            ctx.fill();
        }
    }
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
}

// ─────────────────────────────────────────────────────────
// 8. COMPONENTS (Node UI & Footnotes)
// ─────────────────────────────────────────────────────────

function NodeUI(
    { mode, setMode, hasKnowledge, setHasKnowledge }:
        { mode: ViewMode, setMode: (m: ViewMode) => void, hasKnowledge: boolean, setHasKnowledge: (k: boolean) => void }
) {
    const wireEndY = mode === "COLORBLIND" ? 11 : (hasKnowledge ? 87 : 49);

    return (
        <div className={styles.nodeUiContainer}>
            <svg className={styles.nodeSvg}>
                <path
                    className={styles.nodeWire}
                    d={`M 0 11 C 30 11, 30 ${wireEndY}, 60 ${wireEndY}`}
                />
            </svg>

            <div className={styles.nodesWrapper}>
                <button
                    className={`${styles.nodeOption} ${mode === "COLORBLIND" ? styles.nodeOptionActive : ""}`}
                    onClick={() => { setMode("COLORBLIND"); setHasKnowledge(false); }}
                >
                    ABNORMAL
                </button>

                <button
                    className={`${styles.nodeOption} ${mode === "NORMAL" && !hasKnowledge ? styles.nodeOptionActive : ""}`}
                    onClick={() => { setMode("NORMAL"); setHasKnowledge(false); }}
                >
                    NORMAL But No Know~
                </button>

                <button
                    className={`${styles.nodeOption} ${mode === "NORMAL" && hasKnowledge ? styles.nodeOptionActive : ""}`}
                    onClick={() => { setMode("NORMAL"); setHasKnowledge(true); }}
                >
                    NORMAL Knowledge
                </button>
            </div>
        </div>
    );
}

const FOOTNOTES: Record<number, string> = {
    1: 'Squire, T. J., et al. (2014). "Occupational color vision standards: new prospects." Journal of the Optical Society of America A.',
    2: 'Henshaw, et al. (2024). "ADCT: Improving Robustness and Calibration of Pattern Recognition Models Against Visual Illusions." MDPI.',
    3: 'Sabatella, M. (2016). "Graphic Score on Trial: The Utility and Emergence of a Transdisciplinary Linguistic." UC Irvine.',
    4: 'Hope, C., et al. (2025). "An Uncertain Perception." Gesellschaft für Musiktheorie.',
    5: 'Fricker, M. (2007). Epistemic Injustice: Power and the Ethics of Knowing. Oxford University Press.',
    6: 'Schweiger, G. (2016). "Epistemic Injustice and Powerlessness in the Context of Global Justice". Wagadu.'
};

function FootnoteRef({ id, onHover }: { id: number, onHover: (id: number | null, x: number, y: number) => void }) {
    return (
        <span
            className={styles.footnoteRef}
            onMouseEnter={(e) => onHover(id, e.clientX, e.clientY)}
            onMouseLeave={() => onHover(null, 0, 0)}
        >
            [{id}]
        </span>
    );
}

// ─────────────────────────────────────────────────────────
// 9. REACT COMPONENT
// ─────────────────────────────────────────────────────────

export default function IshiharaScorePage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [viewMode, setViewMode] = useState<ViewMode>("NORMAL");
    const [hasKnowledge, setHasKnowledge] = useState<boolean>(true);
    const [audioReady, setAudioReady] = useState(false);
    const [samplerLoaded, setSamplerLoaded] = useState(false);
    const [hoveredFootnote, setHoveredFootnote] = useState<{ id: number, x: number, y: number } | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const samplerRef = useRef<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const electronicSynthRef = useRef<any>(null);
    const melodyIndexRef = useRef(0);
    const dim7IndexRef = useRef(0);
    const dotsRef = useRef<DotNode[]>([]);
    const sizeRef = useRef({ w: 0, h: 0 });
    const hoveredRef = useRef(-1);
    const rafRef = useRef<number>(0);
    const viewModeRef = useRef<ViewMode>("NORMAL");
    const hasKnowledgeRef = useRef<boolean>(true);

    useEffect(() => { viewModeRef.current = viewMode; }, [viewMode]);
    useEffect(() => { hasKnowledgeRef.current = hasKnowledge; }, [hasKnowledge]);

    const generateAndStart = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const w = rect.width;
        const h = rect.height;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        sizeRef.current = { w, h };

        // ══════════════════════════════════════════════════════════
        // DRAW SCORE PROGRAMMATICALLY (no external images!)
        // This is 100% synchronous — getImageData will always work.
        // ══════════════════════════════════════════════════════════
        const offCanvas = document.createElement("canvas");
        offCanvas.width = w;
        offCanvas.height = h;
        const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
        if (!offCtx) return;

        // Clear to white (transparent areas = NOISE)
        offCtx.fillStyle = "white";
        offCtx.fillRect(0, 0, w, h);

        // Draw a single large filled circle in the center
        const cx = w / 2;
        const cy = h / 2;
        const radius = Math.min(w, h) * 0.38;

        offCtx.fillStyle = "black";
        offCtx.beginPath();
        offCtx.arc(cx, cy, radius, 0, Math.PI * 2);
        offCtx.fill();

        // ══════════════════════════════════════════════════════════
        // PIXEL SAMPLING (synchronous — data guaranteed to exist)
        // ══════════════════════════════════════════════════════════
        const imgData = offCtx.getImageData(0, 0, w, h).data;

        const classifier = (x: number, y: number): DotCategory => {
            if (x < 0 || x >= w || y < 0 || y >= h) return "NOISE";
            const idx = (Math.floor(y) * w + Math.floor(x)) * 4;
            const brightness = (imgData[idx] + imgData[idx + 1] + imgData[idx + 2]) / 3;

            // Dark pixel (inside the circle) → NOTE_HEAD
            if (brightness < 128) return "NOTE_HEAD";
            return "NOISE";
        };

        const packed = denseCirclePack(w, h, classifier);
        assignNotes(packed);
        assignColors(packed, viewModeRef.current);
        dotsRef.current = packed;

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const animate = () => {
            const t = performance.now() / 1000;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            drawFrame(ctx, dotsRef.current, w, h, t, hoveredRef.current);
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        generateAndStart();
        const handleResize = () => generateAndStart();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [generateAndStart]);

    useEffect(() => {
        if (dotsRef.current.length === 0) return;
        assignColors(dotsRef.current, viewMode);
        melodyIndexRef.current = 0;
        dim7IndexRef.current = 0;
    }, [viewMode]);

    // ── Audio ──
    const initAudio = useCallback(async () => {
        if (audioReady) return;
        try {
            const Tone = await import("tone");
            await Tone.start();
            const sampler = new Tone.Sampler({
                urls: {
                    A0: "A0.mp3", C1: "C1.mp3", "D#1": "Ds1.mp3", "F#1": "Fs1.mp3",
                    A1: "A1.mp3", C2: "C2.mp3", "D#2": "Ds2.mp3", "F#2": "Fs2.mp3",
                    A2: "A2.mp3", C3: "C3.mp3", "D#3": "Ds3.mp3", "F#3": "Fs3.mp3",
                    A3: "A3.mp3", C4: "C4.mp3", "D#4": "Ds4.mp3", "F#4": "Fs4.mp3",
                    A4: "A4.mp3", C5: "C5.mp3", "D#5": "Ds5.mp3", "F#5": "Fs5.mp3",
                    A5: "A5.mp3", C6: "C6.mp3", "D#6": "Ds6.mp3", "F#6": "Fs6.mp3",
                    A6: "A6.mp3", C7: "C7.mp3", "D#7": "Ds7.mp3", "F#7": "Fs7.mp3",
                    A7: "A7.mp3", C8: "C8.mp3",
                },
                release: 1,
                baseUrl: "https://tonejs.github.io/audio/salamander/",
                onload: () => setSamplerLoaded(true),
            }).toDestination();
            samplerRef.current = sampler;

            const electronicSynth = new Tone.PolySynth(Tone.FMSynth).toDestination();
            electronicSynthRef.current = electronicSynth;

            setAudioReady(true);
        } catch (e) { console.error("Audio init failed:", e); }
    }, [audioReady]);

    // ── Audio Mappings ──

    const playChaos = useCallback(() => {
        // Type A Noise (Abnormal View / NOISE dots) -> Chaotic cluster (Electronic)
        if (electronicSynthRef.current) {
            try {
                const note = CHAOS_NOTES[Math.floor(Math.random() * CHAOS_NOTES.length)];
                electronicSynthRef.current.triggerAttackRelease(note, "32n");
            } catch { /* */ }
        }
    }, []);

    const playDim7 = useCallback(() => {
        // Type B Noise (STAFF_LINE dots) -> Diminished 7th chord cycle (Acoustic Piano)
        if (samplerRef.current && samplerLoaded) {
            try {
                const note = DIM7_CYCLE[dim7IndexRef.current % DIM7_CYCLE.length];
                dim7IndexRef.current++;
                samplerRef.current.triggerAttackRelease(note, "8n");
            } catch { /* */ }
        }
    }, [samplerLoaded]);

    const playMelody = useCallback((note: string) => {
        // Type C Melody (NOTE_HEAD dots) -> Clean sequential asian pentatonic note (Acoustic Piano)
        if (samplerRef.current && samplerLoaded) {
            try { samplerRef.current.triggerAttackRelease(note, "8n"); } catch { /* */ }
        }
    }, [samplerLoaded]);

    // ── Pointer handling ──
    const handlePointerMove = useCallback(
        (e: React.PointerEvent<HTMLCanvasElement>) => {
            if (!audioReady) return;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            const now = performance.now();
            const t = now / 1000;
            const dots = dotsRef.current;

            const currentMode = viewModeRef.current;

            let hitIdx = -1;
            for (let i = 0; i < dots.length; i++) {
                const dot = dots[i];
                const ox = Math.sin(t * 0.6 + dot.seed) * 1.0;
                const oy = Math.cos(t * 0.8 + dot.seed * 1.3) * 1.0;
                const dx = (dot.x + ox) - mx;
                const dy = (dot.y + oy) - my;
                if (dx * dx + dy * dy < dot.radius * dot.radius) { hitIdx = i; break; }
            }
            hoveredRef.current = hitIdx;

            if (hitIdx >= 0) {
                const dot = dots[hitIdx];
                if (now - dot.lastPlayed > NOTE_DEBOUNCE) {
                    dot.lastPlayed = now;
                    // Rule A & B separation for hover
                    if (currentMode === "COLORBLIND" || dot.category === "NOISE" || dot.category === "NOTE_HEAD") {
                        playChaos(); // Electronic Synth (NOISE/NOTE/COLORBLIND)
                    } else if (dot.category === "STAFF_LINE") {
                        playDim7();  // Acoustic Piano Dissonance (STAFF_LINE)
                    }
                }
            }
        },
        [audioReady, playChaos]
    );

    const handlePointerDown = useCallback(
        (e: React.PointerEvent<HTMLCanvasElement>) => {
            if (!audioReady) return;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            const t = performance.now() / 1000;
            const dots = dotsRef.current;
            const currentMode = viewModeRef.current;
            const currentKnowledge = hasKnowledgeRef.current;

            let hitIdx = -1;
            for (let i = 0; i < dots.length; i++) {
                const dot = dots[i];
                const ox = Math.sin(t * 0.6 + dot.seed) * 1.0;
                const oy = Math.cos(t * 0.8 + dot.seed * 1.3) * 1.0;
                const dx = (dot.x + ox) - mx;
                const dy = (dot.y + oy) - my;
                // Forgiveness radius for clicking notes (+ 6px)
                if (dx * dx + dy * dy < (Math.max(dot.radius, 10) + 6) ** 2) {
                    hitIdx = i; break;
                }
            }

            if (hitIdx >= 0) {
                const dot = dots[hitIdx];
                // Click (Target): Master behavior requires hitting a specific Note Head in NORMAL mode with Knowledge
                if (currentMode === "NORMAL" && currentKnowledge && dot.category === "NOTE_HEAD" && !dot.isPlayed) {
                    dot.isPlayed = true;
                    playMelody(MELODY_SCALE[melodyIndexRef.current % MELODY_SCALE.length]);
                    melodyIndexRef.current++;
                }
            }
        },
        [audioReady, playMelody]
    );

    const handlePointerLeave = useCallback(() => { hoveredRef.current = -1; }, []);

    const handleFootnoteHover = (id: number | null, x: number, y: number) => {
        if (id !== null) {
            setHoveredFootnote({ id, x, y });
        } else {
            setHoveredFootnote(null);
        }
    };

    // ─────────────────────────────────────────────────────
    // JSX
    // ─────────────────────────────────────────────────────

    return (
        <div className={styles.wrapper}>
            {/* ── Canvas: 70vh area ── */}
            <div className={styles.canvasSection}>
                <canvas
                    ref={canvasRef}
                    onPointerMove={handlePointerMove}
                    onPointerDown={handlePointerDown}
                    onPointerLeave={handlePointerLeave}
                />
                {!audioReady && (
                    <div className={styles.audioInit} onClick={initAudio}>
                        <span className={styles.audioInitText}>Click to enable audio</span>
                    </div>
                )}
                {audioReady && !samplerLoaded && (
                    <div className={styles.audioInit}>
                        <span className={styles.audioInitText}>Loading piano samples…</span>
                    </div>
                )}
            </div>

            {/* ── Text section below ── */}
            <div className={styles.textSection}>
                <div className={styles.contentGrid}>
                    {/* Column 1: Title */}
                    <div className={styles.titleColumn}>
                        <div className={styles.titleRow}>
                            <h1>0. Ishihara and Score</h1>
                        </div>
                    </div>

                    {/* Column 2: Node UI (State transition) */}
                    <div className={styles.nodeUiColumn}>
                        <NodeUI
                            mode={viewMode} setMode={setViewMode}
                            hasKnowledge={hasKnowledge} setHasKnowledge={setHasKnowledge}
                        />
                    </div>

                    {/* Column 3: Body Text */}
                    <div className={styles.bodyColumn}>
                        <h2>1. 주제 및 목적</h2>
                        <p>
                            본 프로젝트는 선천적 생물학 기호인 &lsquo;이시하라 색맹 검사표(Ishihara pseudoisochromatic plates)&rsquo;와
                            후천적 학습 기호인 &lsquo;악보&rsquo;를 결합한 웹 기반의 인터랙티브 시각물입니다. 본 작업의 핵심 목적은 악보를 해독할 수 있는 사람과
                            그렇지 못한 사람, 그리고 정상 시야(Normal view)와 색각 이상 시야(Abnormal view)의 대비를 통해,
                            선천적&middot;후천적 권력이 실제로 어떤 기능을 하며 개인에게 어떤 영향을 미치는가를 시각화하는 데 있습니다.
                            악보는 학습을 통해 획득하는 &lsquo;후천적 권력&rsquo;이며, 이시하라 검사표는 생물학적 조건에 의해
                            배타적으로 부여되는 &lsquo;선천적 권력&rsquo;입니다.
                        </p>
                        <p>
                            본 작업은 이 두 가지 기호를 교차하여, 정상 시력을 가진 사용자에게만 뚜렷한 음표의 경로를 노출해
                            온전한 펜타토닉 스케일의 선율을 연주할 수 있도록 허락합니다. 반면, 색을 구분할 수 없는 색약자의 시야에서는
                            경로가 은폐된 노이즈로만 인지되어 정상적인 연주가 원천적으로 불가능해지며, 무작위 드래그에 의한 불협화음만이 발생합니다.
                            이를 통해 무언가를 &lsquo;볼 수 있고 읽을 수 있는&rsquo; 정보 해독 권한의 결핍이 어떻게 개인을 구조적으로 배제시키고,
                            실질적인 소외와 무력감이라는 결과로 직결되는지를 직관적으로 증명할 수 있다고 생각합니다.
                        </p>

                        <h2>2. 타겟 소비자 혹은 사용자</h2>
                        <p>누구나</p>

                        <h2>3. 자료 조사</h2>
                        <p>
                            이시하라 색맹 검사표는 색채 위장(Color camouflage) 원리를 통해 시각적 노이즈 속에서 특정 정보를
                            은폐하거나 노출하는 대표적인 의학 기호입니다. 광학 및 색채 인지 연구에 따르면, 이시하라 검사표는
                            &lsquo;소실&rsquo; 및 &lsquo;숨겨진 숫자&rsquo; 디자인을 활용하여 정상 삼원색 시각과
                            색각 이상자가 서로 다른 정보를 판독하도록 정교하게 설계되었습니다.
                            <FootnoteRef id={1} onHover={handleFootnoteHover} /> 또한, 이러한 위장성 점묘
                            패턴은 형태 인지를 교란하여 인공지능의 시각 인식 모델마저 기만할 수 있는 강력한 착시 및 암호화 기제로 작용합니다.
                            <FootnoteRef id={2} onHover={handleFootnoteHover} />
                        </p>
                        <p>
                            음악 기보법의 관점에서 본 작업은 전통적인 오선보의 관습을 탈피한 &lsquo;그래픽 악보&rsquo;의 맥락에 놓여 있습니다.
                            현대 음악 기호학 연구들은 그래픽 악보가 단순한 음표의 흑백 배열을 넘어, 추상적인 시각 기호와 색상,
                            형태의 충돌을 통해 연주자에게 새로운 청각적 해석을 유도하는 매체임을 강조합니다.
                            <FootnoteRef id={3} onHover={handleFootnoteHover} /> 기존의 사운드 인터랙션 작업들이 대체로 시각이
                            청각을 직관적으로 보조하는 데 머물렀다면, 본 프로젝트는 &lsquo;정상 색각&rsquo;이라는 신체적 조건을 악보 해독의 필수 암호 키(Key)로
                            기능하게 만들었다는 점에서 차별점을 갖습니다.
                            <FootnoteRef id={4} onHover={handleFootnoteHover} />
                        </p>
                        <p>
                            무언가를 알 수 있는 사람(정보 소유자)과 그렇지 않은 사람(정보 소외자) 사이에서 발생하는 권력 문제가 개인의 삶에 미치는 실제적 영향을
                            규명하기 위해 인문사회학적 관점의 연구를 참조했습니다. 영국 철학자 미란다 프리커(Miranda Fricker)의 &lsquo;인식론적 부정의&rsquo;
                            이론에 따르면, 지식과 정보를 해독할 수 있는 권한의 비대칭성은 단순한 앎의 차이를 넘어 해독 권한이 없는 특정 집단의 사회적 주체성을
                            훼손하고 구조적인 배제를 재생산하는 결과를 낳습니다.
                            <FootnoteRef id={5} onHover={handleFootnoteHover} /> 또한, 정보 비대칭성과 권력의 상관관계를 분석한 사회학 연구들은,
                            특정 기호나 지식에 접근하지 못하는 상태가 곧 개인을 의사결정 과정에서 소외시키고 실질적인 무력감으로 직결시킴을 실증하고 있습니다.
                            <FootnoteRef id={6} onHover={handleFootnoteHover} /> 본 프로젝트는 이러한 인문학적 근거를 바탕으로, 시청각적 기호를
                            해독하지 못할 때 겪게 되는 연주 불가능성과 불협화음을 통해 지식 권력의 비대칭성이 초래하는 실제적 폭력성을 인터랙션으로 구현하려 노력했습니다.
                        </p>
                    </div>
                </div>

                {/* Footnote Popup Overlay */}
                {hoveredFootnote && (
                    <div
                        className={styles.footnotePopup}
                        style={{
                            left: hoveredFootnote.x,
                            top: hoveredFootnote.y
                        }}
                    >
                        {FOOTNOTES[hoveredFootnote.id]}
                    </div>
                )}
            </div>
        </div>
    );
}
