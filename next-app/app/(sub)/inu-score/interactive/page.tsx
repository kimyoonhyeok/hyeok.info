"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import styles from "../ishihara-score.module.css";

// 1. DATA STRUCTURES
type DotCategory = "STAFF_LINE" | "NOTE_HEAD" | "NOISE";
interface DotNode {
    x: number; y: number; radius: number; color: string;
    category: DotCategory; note: string; lastPlayed: number; seed: number; isPlayed?: boolean;
}
type ViewMode = "NORMAL" | "COLORBLIND";

// 2. PALETTES
const CB_STAFF_COLORS = ["#C4A35A", "#B8976E", "#A89060", "#9E8855", "#B5A06A"];
const CB_NOTE_COLORS = ["#C9AB6B", "#BDA270", "#A69058", "#B0985E", "#C1A862"];
const CB_NOISE_COLORS = ["#D4B87D", "#C8AD73", "#BCA068", "#D0B478", "#C5AA6E"];
const NORMAL_STAFF_COLORS = ["#E74C3C", "#C0392B", "#D35400", "#A93226"];
const NORMAL_NOTE_COLORS = ["#F1C40F", "#F39C12", "#E67E22", "#D35400"];
const NORMAL_NOISE_COLORS = ["#8FAF6B", "#9DB863", "#7D9E58", "#8BA85E", "#96B066"];

// 3. SCALES
const MELODY_SCALE = ["C4", "D#4", "F4", "G4", "A#4", "C5", "D#5", "F5", "G5", "A#5"];
const CHAOS_NOTES = ["A1", "C2", "D#2", "F#2", "A2", "C#3", "E3", "G3", "A#3", "D4", "F#4", "A4", "C#5", "E5", "G#5", "B5", "D6", "F6", "A6", "C7"];
const DIM7_CYCLE = ["C4", "Eb4", "Gb4", "A4"];
const NOTE_DEBOUNCE = 300;

// 4. PACKING
function denseCirclePack(w: number, h: number, classifier: (x: number, y: number) => DotCategory): DotNode[] {
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
                const dx = d.x - x; const dy = d.y - y;
                if (dx * dx + dy * dy < (d.radius + r + GAP) ** 2) { overlaps = true; break; }
            }
            if (!overlaps) {
                const category = classifier(x, y);
                dots.push({ x, y, radius: r, color: "", category, note: "", lastPlayed: 0, seed: Math.random() * Math.PI * 2 });
                fails = 0;
            } else { fails++; }
        }
    }
    return dots;
}

function assignColors(dots: DotNode[], mode: ViewMode): void {
    let s: string[], n: string[], b: string[];
    if (mode === "COLORBLIND") { s = CB_STAFF_COLORS; n = CB_NOTE_COLORS; b = CB_NOISE_COLORS; }
    else { s = NORMAL_STAFF_COLORS; n = NORMAL_NOTE_COLORS; b = NORMAL_NOISE_COLORS; }
    dots.forEach(d => {
        if (d.category === "STAFF_LINE") d.color = s[Math.floor(Math.random() * s.length)];
        else if (d.category === "NOTE_HEAD") d.color = n[Math.floor(Math.random() * n.length)];
        else d.color = b[Math.floor(Math.random() * b.length)];
    });
}

function drawFrame(ctx: CanvasRenderingContext2D, dots: DotNode[], w: number, h: number, t: number, hoveredIdx: number): void {
    ctx.fillStyle = "#F5F0E8"; ctx.fillRect(0, 0, w, h);
    dots.forEach((dot, i) => {
        const ox = Math.sin(t * 0.6 + dot.seed) * 1.0;
        const oy = Math.cos(t * 0.8 + dot.seed * 1.3) * 1.0;
        ctx.beginPath(); ctx.arc(dot.x + ox, dot.y + oy, dot.radius, 0, Math.PI * 2);
        if (dot.isPlayed) {
            ctx.fillStyle = "#F1C40F"; ctx.shadowColor = "rgba(241, 196, 15, 0.8)"; ctx.shadowBlur = 15; ctx.fill();
            ctx.shadowColor = "transparent"; ctx.shadowBlur = 0;
        } else {
            ctx.fillStyle = dot.color;
            if (i === hoveredIdx) { ctx.shadowColor = "rgba(0,0,0,0.3)"; ctx.shadowBlur = 12; }
            ctx.fill(); ctx.shadowBlur = 0;
        }
    });
}

function NodeUI({ mode, setMode, hasKnowledge, setHasKnowledge }: any) {
    const wireEndY = mode === "COLORBLIND" ? 11 : (hasKnowledge ? 87 : 49);
    return (
        <div className={styles.nodeUiContainer}>
            <svg className={styles.nodeSvg}><path className={styles.nodeWire} d={`M 0 11 C 30 11, 30 ${wireEndY}, 60 ${wireEndY}`} /></svg>
            <div className={styles.nodesWrapper}>
                <button className={`${styles.nodeOption} ${mode === "COLORBLIND" ? styles.nodeOptionActive : ""}`} onClick={() => { setMode("COLORBLIND"); setHasKnowledge(false); }}>ABNORMAL</button>
                <button className={`${styles.nodeOption} ${mode === "NORMAL" && !hasKnowledge ? styles.nodeOptionActive : ""}`} onClick={() => { setMode("NORMAL"); setHasKnowledge(false); }}>NORMAL But No Know~</button>
                <button className={`${styles.nodeOption} ${mode === "NORMAL" && hasKnowledge ? styles.nodeOptionActive : ""}`} onClick={() => { setMode("NORMAL"); setHasKnowledge(true); }}>NORMAL Knowledge</button>
            </div>
        </div>
    );
}

const FOOTNOTES: any = {
    1: 'Squire, et al. (2014). "Occupational color vision standards." JOSA A.',
    2: 'Henshaw, et al. (2024). "ADCT: Improving Robustness..." MDPI.',
    3: 'Sabatella, M. (2016). "Graphic Score on Trial." UC Irvine.',
    4: 'Hope, C., et al. (2025). "An Uncertain Perception." GMT.',
    5: 'Fricker, M. (2007). Epistemic Injustice. Oxford.',
    6: 'Schweiger, G. (2016). "Epistemic Injustice..." Wagadu.'
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

export default function IshiharaScoreInteractivePage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [viewMode, setViewMode] = useState<ViewMode>("NORMAL");
    const [hasKnowledge, setHasKnowledge] = useState<boolean>(true);
    const [audioReady, setAudioReady] = useState(false);
    const [samplerLoaded, setSamplerLoaded] = useState(false);
    const [hoveredFootnote, setHoveredFootnote] = useState<{ id: number, x: number, y: number } | null>(null);

    const samplerRef = useRef<any>(null);
    const synthRef = useRef<any>(null);
    const melodyIndexRef = useRef(0);
    const dim7IndexRef = useRef(0);
    const dotsRef = useRef<DotNode[]>([]);
    const hoveredRef = useRef(-1);
    const rafRef = useRef<number>(0);
    const viewModeRef = useRef<ViewMode>("NORMAL");
    const hasKnowledgeRef = useRef<boolean>(true);

    useEffect(() => { viewModeRef.current = viewMode; }, [viewMode]);
    useEffect(() => { hasKnowledgeRef.current = hasKnowledge; }, [hasKnowledge]);

    const generateAndStart = useCallback(() => {
        const canvas = canvasRef.current; if (!canvas) return;
        const rect = canvas.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1;
        const w = rect.width; const h = rect.height;
        canvas.width = w * dpr; canvas.height = h * dpr;
        const offCanvas = document.createElement("canvas"); offCanvas.width = w; offCanvas.height = h;
        const offCtx = offCanvas.getContext("2d", { willReadFrequently: true }); if (!offCtx) return;
        offCtx.fillStyle = "white"; offCtx.fillRect(0, 0, w, h);
        offCtx.fillStyle = "black"; offCtx.beginPath(); offCtx.arc(w / 2, h / 2, Math.min(w, h) * 0.38, 0, Math.PI * 2); offCtx.fill();
        const imgData = offCtx.getImageData(0, 0, w, h).data;
        const classifier = (x: number, y: number): DotCategory => {
            const idx = (Math.floor(y) * w + Math.floor(x)) * 4;
            return imgData[idx] < 128 ? "NOTE_HEAD" : "NOISE";
        };
        const packed = denseCirclePack(w, h, classifier);
        packed.filter(d => d.category === "NOTE_HEAD").sort((a, b) => a.x - b.x).forEach((d, i) => d.note = MELODY_SCALE[i % MELODY_SCALE.length]);
        assignColors(packed, viewModeRef.current);
        dotsRef.current = packed;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        const ctx = canvas.getContext("2d"); if (!ctx) return;
        const animate = () => { ctx.setTransform(dpr, 0, 0, dpr, 0, 0); drawFrame(ctx, dotsRef.current, w, h, performance.now() / 1000, hoveredRef.current); rafRef.current = requestAnimationFrame(animate); };
        rafRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        generateAndStart();
        window.addEventListener("resize", generateAndStart);
        return () => { window.removeEventListener("resize", generateAndStart); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [generateAndStart]);

    useEffect(() => { if (dotsRef.current.length > 0) assignColors(dotsRef.current, viewMode); }, [viewMode]);

    const initAudio = async () => {
        if (audioReady) return;
        const Tone = await import("tone"); await Tone.start();
        samplerRef.current = new Tone.Sampler({
            urls: { A1: "A1.mp3", C2: "C2.mp3", "D#2": "Ds2.mp3", "F#2": "Fs2.mp3", A2: "A2.mp3", C3: "C3.mp3", "D#3": "Ds3.mp3", "F#3": "Fs3.mp3", A3: "A3.mp3", C4: "C4.mp3", "D#4": "Ds4.mp3", "F#4": "Fs4.mp3", A4: "A4.mp3", C5: "C5.mp3" },
            baseUrl: "https://tonejs.github.io/audio/salamander/",
            onload: () => setSamplerLoaded(true),
        }).toDestination();
        synthRef.current = new Tone.PolySynth(Tone.FMSynth).toDestination();
        setAudioReady(true);
    };

    const handlePointerMove = (e: any) => {
        if (!audioReady) return;
        const rect = canvasRef.current!.getBoundingClientRect();
        const mx = e.clientX - rect.left; const my = e.clientY - rect.top;
        const t = performance.now() / 1000;
        let hitIdx = -1;
        for (let i = 0; i < dotsRef.current.length; i++) {
            const d = dotsRef.current[i];
            const dx = (d.x + Math.sin(t * 0.6 + d.seed)) - mx; const dy = (d.y + Math.cos(t * 0.8 + d.seed * 1.3)) - my;
            if (dx * dx + dy * dy < d.radius * d.radius) { hitIdx = i; break; }
        }
        hoveredRef.current = hitIdx;
        if (hitIdx >= 0) {
            const d = dotsRef.current[hitIdx];
            if (performance.now() - d.lastPlayed > NOTE_DEBOUNCE) {
                d.lastPlayed = performance.now();
                if (viewModeRef.current === "COLORBLIND" || d.category === "NOISE") synthRef.current.triggerAttackRelease(CHAOS_NOTES[Math.floor(Math.random() * CHAOS_NOTES.length)], "32n");
                else if (d.category === "STAFF_LINE" && samplerLoaded) { samplerRef.current.triggerAttackRelease(DIM7_CYCLE[dim7IndexRef.current++ % 4], "8n"); }
            }
        }
    };

    const handlePointerDown = (e: any) => {
        if (!audioReady || viewModeRef.current !== "NORMAL" || !hasKnowledgeRef.current) return;
        const rect = canvasRef.current!.getBoundingClientRect();
        const mx = e.clientX - rect.left; const my = e.clientY - rect.top;
        dotsRef.current.forEach(d => {
            const dx = d.x - mx; const dy = d.y - my;
            if (dx * dx + dy * dy < (d.radius + 6) ** 2 && d.category === "NOTE_HEAD" && !d.isPlayed && samplerLoaded) {
                d.isPlayed = true; samplerRef.current.triggerAttackRelease(MELODY_SCALE[melodyIndexRef.current++ % 10], "8n");
            }
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.canvasSection}>
                <canvas ref={canvasRef} onPointerMove={handlePointerMove} onPointerDown={handlePointerDown} onPointerLeave={() => hoveredRef.current = -1} />
                {!audioReady && <div className={styles.audioInit} onClick={initAudio}><span className={styles.audioInitText}>Click to enable audio</span></div>}
            </div>
            <div className={styles.textSection}>
                <div className={styles.contentGrid}>
                    <div className={styles.titleColumn}><div className={styles.titleRow}><h1>0. Ishihara and Score</h1></div></div>
                    <div className={styles.nodeUiColumn}><NodeUI mode={viewMode} setMode={setViewMode} hasKnowledge={hasKnowledge} setHasKnowledge={setHasKnowledge} /></div>
                    <div className={styles.bodyColumn}>
                        <h2>1. 주제 및 목적</h2>
                        <p>
                            본 프로젝트는 선천적 생물학 기호인 ‘이시하라 색맹 검사표(Ishihara pseudoisochromatic plates)’와
                            후천적 학습 기호인 ‘악보’를 결합한 웹 기반의 인터랙티브 시각물입니다. 본 작업의 핵심 목적은 악보를 해독할 수 있는 사람과
                            그렇지 못한 사람, 그리고 정상 시야(Normal view)와 색각 이상 시야(Abnormal view)의 대비를 통해,
                            선천적&middot;후천적 권력이 실제로 어떤 기능을 하며 개인에게 어떤 영향을 미치는가를 시각화하는 데 있습니다.
                            악보는 학습을 통해 획득하는 ‘후천적 권력’이며, 이시하라 검사표는 생물학적 조건에 의해
                            배타적으로 부여되는 ‘선천적 권력’입니다.
                        </p>
                        <p>
                            본 작업은 이 두 가지 기호를 교차하여, 정상 시력을 가진 사용자에게만 뚜렷한 음표의 경로를 노출해
                            온전한 펜타토닉 스케일의 선율을 연주할 수 있도록 허락합니다. 반면, 색을 구분할 수 없는 색약자의 시야에서는
                            경로가 은폐된 노이즈로만 인지되어 정상적인 연주가 원천적으로 불가능해지며, 무작위 드래그에 의한 불협화음만이 발생합니다.
                            이를 통해 무언가를 ‘볼 수 있고 읽을 수 있는’ 정보 해독 권한의 결핍이 어떻게 개인을 구조적으로 배제시키고,
                            실질적인 소외와 무력감이라는 결과로 직결되는지를 직관적으로 증명할 수 있다고 생각합니다.
                        </p>

                        <h2>2. 타겟 소비자 혹은 사용자</h2>
                        <p>누구나</p>

                        <h2>3. 자료 조사</h2>
                        <p>
                            이시하라 색맹 검사표는 색채 위장(Color camouflage) 원리를 통해 시각적 노이즈 속에서 특정 정보를
                            은폐하거나 노출하는 대표적인 의학 기호입니다. 광학 및 색채 인지 연구에 따르면, 이시하라 검사표는
                            ‘소실’ 및 ‘숨겨진 숫자’ 디자인을 활용하여 정상 삼원색 시각과
                            색각 이상자가 서로 다른 정보를 판독하도록 정교하게 설계되었습니다.
                            <FootnoteRef id={1} onHover={(id, x, y) => setHoveredFootnote(id !== null ? { id, x, y } : null)} /> 또한, 이러한 위장성 점묘
                            패턴은 형태 인지를 교란하여 인공지능의 시각 인식 모델마저 기만할 수 있는 강력한 착시 및 암호화 기제로 작용합니다.
                            <FootnoteRef id={2} onHover={(id, x, y) => setHoveredFootnote(id !== null ? { id, x, y } : null)} />
                        </p>
                        <p>
                            음악 기보법의 관점에서 본 작업은 전통적인 오선보의 관습을 탈피한 ‘그래픽 악보’의 맥락에 놓여 있습니다.
                            현대 음악 기호학 연구들은 그래픽 악보가 단순한 음표의 흑백 배열을 넘어, 추상적인 시각 기호와 색상,
                            형태의 충돌을 통해 연주자에게 새로운 청각적 해석을 유도하는 매체임을 강조합니다.
                            <FootnoteRef id={3} onHover={(id, x, y) => setHoveredFootnote(id !== null ? { id, x, y } : null)} /> 기존의 사운드 인터랙션 작업들이 대체로 시각이
                            청각을 직관적으로 보조하는 데 머물렀다면, 본 프로젝트는 &lsquo;정상 색각&rsquo;이라는 신체적 조건을 악보 해독의 필수 암호 키(Key)로
                            기능하게 만들었다는 점에서 차별점을 갖습니다.
                            <FootnoteRef id={4} onHover={(id, x, y) => setHoveredFootnote(id !== null ? { id, x, y } : null)} />
                        </p>
                        <p>
                            무언가를 알 수 있는 사람(정보 소유자)과 그렇지 않은 사람(정보 소외자) 사이에서 발생하는 권력 문제가 개인의 삶에 미치는 실제적 영향을
                            규명하기 위해 인문사회학적 관점의 연구를 참조했습니다. 영국 철학자 미란다 프리커(Miranda Fricker)의 &lsquo;인식론적 부정의&rsquo;
                            이론에 따르면, 지식과 정보를 해독할 수 있는 권한의 비대칭성은 단순한 앎의 차이를 넘어 해독 권한이 없는 특정 집단의 사회적 주체성을
                            훼손하고 구조적인 배제를 재생산하는 결과를 낳습니다.
                            <FootnoteRef id={5} onHover={(id, x, y) => setHoveredFootnote(id !== null ? { id, x, y } : null)} /> 또한, 정보 비대칭성과 권력의 상관관계를 분석한 사회학 연구들은,
                            특정 기호나 지식에 접근하지 못하는 상태가 곧 개인을 의사결정 과정에서 소외시키고 실질적인 무력감으로 직결시킴을 실증하고 있습니다.
                            <FootnoteRef id={6} onHover={(id, x, y) => setHoveredFootnote(id !== null ? { id, x, y } : null)} /> 본 프로젝트는 이러한 인문학적 근거를 바탕으로, 시청각적 기호를
                            해독하지 못할 때 겪게 되는 연주 불가능성과 불협화음을 통해 지식 권력의 비대칭성이 초래하는 실제적 폭력성을 인터랙션으로 구현하려 노력했습니다.
                        </p>
                    </div>
                </div>
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
