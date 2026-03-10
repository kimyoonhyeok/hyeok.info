"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import styles from "./ishihara-score.module.css";

// ─────────────────────────────────────────────────────────
// 1. DATA STRUCTURES
// ─────────────────────────────────────────────────────────

interface DotNode {
    x: number;
    y: number;
    radius: number;
    color: string;
    isPath: boolean;
    note: string;
    lastPlayed: number;
    seed: number;
}

type ViewMode = "NORMAL" | "COLORBLIND";

// ─────────────────────────────────────────────────────────
// 2. COLOR PALETTES — Strict Ishihara plate logic
//
//    NORMAL  = "Vanishing Plate"  → red path visible to normal, invisible to CVD
//    CVD     = "Hidden Digit Plate" → confusion colors invisible to normal,
//              path visible only to Deuteranopes
// ─────────────────────────────────────────────────────────

// Mode 1: NORMAL (Vanishing Plate) — high Red-Green contrast
const NORMAL_PATH_COLORS = ["#E74C3C", "#E67E22", "#C0392B", "#D35400"];
const NORMAL_NOISE_COLORS = ["#2ECC71", "#27AE60", "#95A5A6", "#BDC3C7", "#7F8C8D"];

// Mode 2: COLORBLIND (Hidden Digit Plate) — confusion colors
// Normal eyes see random autumn mix; Deuteranopes see dark path on khaki ground
const CVD_PATH_COLORS = ["#E06B3E", "#798A58", "#B55A33", "#8C986A"];
const CVD_NOISE_COLORS = ["#F2AB55", "#9DB863", "#E8CC7D", "#B0A374", "#D4C08B"];

// ─────────────────────────────────────────────────────────
// 3. MELODY & NOISE AUDIO
// ─────────────────────────────────────────────────────────

const MELODY_SCALE = [
    "C4", "D#4", "F4", "G4", "A#4",
    "C5", "D#5", "F5", "G5", "A#5",
];
const NOISE_FREQS = [87, 93, 131, 139, 1760, 1865, 2093, 2349];
const NOTE_DEBOUNCE = 300;

// ─────────────────────────────────────────────────────────
// 4. NUMBER "4" PATH
// ─────────────────────────────────────────────────────────

function createNumber4Path(w: number, h: number) {
    const cx = w * 0.5;
    const cy = h * 0.5;
    const scale = Math.min(w, h) * 0.6;

    const segments: [number, number, number, number][] = [
        [0.10, -0.40, -0.25, 0.06],   // diagonal
        [-0.25, 0.06, 0.25, 0.06],    // crossbar
        [0.10, -0.40, 0.10, 0.42],    // stem
    ];

    const canvasSegments = segments.map(([x1, y1, x2, y2]) => ({
        x1: cx + x1 * scale, y1: cy + y1 * scale,
        x2: cx + x2 * scale, y2: cy + y2 * scale,
    }));

    const strokeWidth = scale * 0.12;

    return (x: number, y: number): boolean => {
        for (const seg of canvasSegments) {
            const dx = seg.x2 - seg.x1;
            const dy = seg.y2 - seg.y1;
            const lenSq = dx * dx + dy * dy;
            let t = 0;
            if (lenSq > 0) {
                t = Math.max(0, Math.min(1,
                    ((x - seg.x1) * dx + (y - seg.y1) * dy) / lenSq
                ));
            }
            const px = seg.x1 + t * dx;
            const py = seg.y1 + t * dy;
            const dist = Math.sqrt((x - px) * (x - px) + (y - py) * (y - py));
            if (dist < strokeWidth) return true;
        }
        return false;
    };
}

// ─────────────────────────────────────────────────────────
// 5. DENSE CIRCLE PACKING
// ─────────────────────────────────────────────────────────

function denseCirclePack(
    w: number, h: number,
    pathFn: (x: number, y: number) => boolean
): DotNode[] {
    const dots: DotNode[] = [];
    const passes = [
        { minR: 18, maxR: 30, maxFails: 5000 },
        { minR: 12, maxR: 20, maxFails: 5000 },
        { minR: 7, maxR: 14, maxFails: 6000 },
        { minR: 4, maxR: 9, maxFails: 8000 },
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
                dots.push({
                    x, y, radius: r, color: "",
                    isPath: pathFn(x, y),
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
    const pp = mode === "NORMAL" ? NORMAL_PATH_COLORS : CVD_PATH_COLORS;
    const np = mode === "NORMAL" ? NORMAL_NOISE_COLORS : CVD_NOISE_COLORS;
    for (const dot of dots) {
        dot.color = dot.isPath ? pickRandom(pp) : pickRandom(np);
    }
}

function assignNotes(dots: DotNode[]): void {
    const pathDots = dots.filter((d) => d.isPath).sort((a, b) => a.x - b.x);
    pathDots.forEach((d, i) => { d.note = MELODY_SCALE[i % MELODY_SCALE.length]; });
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
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
}

// ─────────────────────────────────────────────────────────
// 8. REACT COMPONENT
// ─────────────────────────────────────────────────────────

export default function IshiharaScorePage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [viewMode, setViewMode] = useState<ViewMode>("NORMAL");
    const [audioReady, setAudioReady] = useState(false);
    const [samplerLoaded, setSamplerLoaded] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const samplerRef = useRef<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const noiseSynthRef = useRef<any>(null);
    const melodyIndexRef = useRef(0);
    const dotsRef = useRef<DotNode[]>([]);
    const sizeRef = useRef({ w: 0, h: 0 });
    const hoveredRef = useRef(-1);
    const rafRef = useRef<number>(0);
    const viewModeRef = useRef<ViewMode>("NORMAL");

    useEffect(() => { viewModeRef.current = viewMode; }, [viewMode]);

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

        const pathFn = createNumber4Path(w, h);
        const packed = denseCirclePack(w, h, pathFn);
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
            const noiseSynth = new Tone.Synth({
                oscillator: { type: "sawtooth" },
                envelope: { attack: 0.005, decay: 0.1, sustain: 0.05, release: 0.15 },
                volume: -12,
            }).toDestination();
            noiseSynthRef.current = noiseSynth;
            setAudioReady(true);
        } catch (e) { console.error("Audio init failed:", e); }
    }, [audioReady]);

    const playMelody = useCallback((note: string) => {
        if (samplerRef.current && samplerLoaded) {
            try { samplerRef.current.triggerAttackRelease(note, "8n"); } catch (_e) { /* */ }
        }
    }, [samplerLoaded]);

    const playNoise = useCallback(() => {
        if (noiseSynthRef.current) {
            try {
                const freq = NOISE_FREQS[Math.floor(Math.random() * NOISE_FREQS.length)];
                noiseSynthRef.current.triggerAttackRelease(freq, "32n");
            } catch (_e) { /* */ }
        }
    }, []);

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
                    if (dot.isPath) {
                        playMelody(MELODY_SCALE[melodyIndexRef.current % MELODY_SCALE.length]);
                        melodyIndexRef.current++;
                    } else {
                        playNoise();
                    }
                }
            }
        },
        [audioReady, playMelody, playNoise]
    );

    const handlePointerLeave = useCallback(() => { hoveredRef.current = -1; }, []);

    // ─────────────────────────────────────────────────────
    // JSX
    // ─────────────────────────────────────────────────────

    return (
        <div className={styles.wrapper}>
            {/* ── Canvas: 100vh ── */}
            <div className={styles.canvasSection}>
                <canvas
                    ref={canvasRef}
                    onPointerMove={handlePointerMove}
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

            {/* ── Text section below fold ── */}
            <div className={styles.textSection}>
                <div className={styles.titleRow}>
                    <h1>Ishihara × Score</h1>
                </div>

                <div className={styles.toggleArea}>
                    <button
                        className={`${styles.toggleBtn} ${viewMode === "NORMAL" ? styles.toggleBtnActive : ""}`}
                        onClick={() => setViewMode("NORMAL")}
                    >
                        Normal Vision
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${viewMode === "COLORBLIND" ? styles.toggleBtnActive : ""}`}
                        onClick={() => setViewMode("COLORBLIND")}
                    >
                        Deuteranopia
                    </button>
                </div>

                <div className={styles.contentGrid}>
                    {/* Left: body text */}
                    <div className={styles.bodyColumn}>
                        <h2>1. 주제 및 목적</h2>
                        <p>
                            본 프로젝트는 선천적 생물학 기호인 &lsquo;이시하라 색맹 검사표(Ishihara pseudoisochromatic plates)&rsquo;의
                            원리와 후천적 학습 기호인 &lsquo;악보(Musical score)&rsquo;를 결합한 웹 기반의 인터랙티브 시각물입니다.
                            본 작업의 목적은 정보를 시각적으로 인지하고 해독하는 &lsquo;권력&rsquo;이 누구에게 주어지는지 역설적으로
                            질문하는 데 있습니다. 이를 위해 캔버스 상에 다양한 크기의 원을 빽빽하게 밀집시키는
                            알고리즘(Dense Circle Packing)을 구현하여, 일반 시력자의 눈에는 단순한 시각적 노이즈로 보여 드래그 시
                            불협화음을 내지만, 특정 색약자의 시야에서는 뚜렷한 경로가 드러나 아시안 펜타토닉 스케일의 서정적인
                            피아노 선율을 연주할 수 있도록 설계했습니다. 이는 의학적으로 결핍이라 여겨지던 특성을 아름다운 정보를
                            해독하는 유일한 특권으로 전복시키는 새로운 내러티브를 창출합니다.
                        </p>

                        <h2>2. 타겟 소비자 혹은 사용자</h2>
                        <p>
                            주요 타겟은 시각 예술과 청각 예술의 경계, 그리고 다감각적 인터랙션에 흥미를 느끼는 관람객과
                            정보 디자인 및 타이포그래피에 관심이 있는 디자이너들입니다. 나아가 사회적으로 &lsquo;정상&rsquo;과 &lsquo;비정상&rsquo;을
                            규정하는 기준이나 정보의 비대칭성에 대해 비판적으로 사유하고자 하는 대중을 포괄합니다.
                            타겟 사용자들은 100vh로 가득 찬 동일한 웹 브라우저 화면을 보면서도 본인의 생물학적 색각 능력에 따라
                            완전히 상반된 청각적 결과물을 경험하게 됩니다.
                        </p>

                        <h2>3. 자료 조사</h2>
                        <p>
                            이시하라 색맹 검사표는 색채 위장(Color camouflage) 원리를 통해 시각적 노이즈 속에서 특정 정보를
                            은폐하거나 노출하는 대표적인 의학 기호입니다. 광학 및 색채 인지 연구에 따르면, 이시하라 검사표는
                            &lsquo;소실(Vanishing)&rsquo; 및 &lsquo;숨겨진 숫자(Hidden Digit)&rsquo; 디자인을 활용하여 정상 삼원색 시각(Trichromats)과
                            색각 이상자가 서로 다른 정보를 판독하도록 정교하게 설계되었습니다.¹ 또한, 이러한 위장성 점묘
                            패턴(Pseudoisochromatic dot camouflage)은 형태 인지를 교란하여 인공지능의 시각 인식 모델마저
                            기만할 수 있는 강력한 착시 및 암호화 기제로 작용합니다.²
                        </p>
                        <p>
                            음악 기보법(Musical notation)의 관점에서 본 작업은 전통적인 오선보의 관습을 탈피한
                            &lsquo;그래픽 악보(Graphic score)&rsquo;의 맥락에 놓여 있습니다. 현대 음악 기호학 연구들은 그래픽 악보가
                            단순한 음표의 흑백 배열을 넘어, 추상적인 시각 기호와 색상, 형태의 충돌을 통해 연주자에게 새로운
                            청각적 해석을 유도하는 매체임을 강조합니다.³ 기존의 공감각(Synesthesia) 기반 미디어 아트나
                            사운드 인터랙션 유사 작업들이 대체로 시각이 청각을 직관적으로 보조하거나 단순 동기화하는 데
                            머물렀다면, 본 프로젝트는 &lsquo;색각 이상&rsquo;이라는 신체적 조건을 악보 해독의 필수 암호 키(Key)로
                            기능하게 만들었다는 점에서 차별화된 경쟁력을 갖습니다.⁴
                        </p>
                    </div>

                    {/* Right: footnotes at 50% size */}
                    <div className={styles.footnotesColumn}>
                        <p>
                            [1] Squire, T. J., et al. (2014). &ldquo;Occupational color vision standards: new prospects.&rdquo;
                            Journal of the Optical Society of America A. (이시하라 검사표의 소실 및 변형 디자인과 색채 위장 원리)
                        </p>
                        <p>
                            [2] Henshaw, et al. (2024). &ldquo;ADCT: Improving Robustness and Calibration of Pattern
                            Recognition Models Against Visual Illusions.&rdquo; MDPI. (위장성 점묘 패턴이 시각 인지에 미치는 교란 및 암호화 효과)
                        </p>
                        <p>
                            [3] Sabatella, M. (2016). &ldquo;Graphic Score on Trial: The Utility and Emergence of a
                            Transdisciplinary Linguistic.&rdquo; UC Irvine. (그래픽 악보의 추상적 기호 체계와 시청각적 해석)
                        </p>
                        <p>
                            [4] Hope, C., et al. (2025). &ldquo;An Uncertain Perception.&rdquo; Gesellschaft für Musiktheorie.
                            (현대 그래픽 악보의 형태적 충돌과 상호작용적 기보법)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
