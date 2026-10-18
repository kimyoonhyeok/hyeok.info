import React from 'react';

const COLORS = {
  purple: '#583884',
  gray: '#e7e7e7',
  green: '#00fb49',
  brown: '#85712a'
};

const blockStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.5rem',
  minHeight: '3.5rem',
  fontSize: '2.75rem',
  fontWeight: 'bold',
  fontFamily: 'Pretendard, sans-serif',
  color: '#ffffff',
  margin: '0',
  lineHeight: 1,
};

// Text word with color (Give 1)
export const ColoredText = ({ text, color }: { text: string; color: string }) => (
  <span style={{ color: color, fontWeight: 'bold' }}>{text}</span>
);

export const SplitText = ({ text, topColor, bottomColor, splitAt = '59%' }: { text: string; topColor: string; bottomColor: string; splitAt?: string }) => (
  <span style={{ 
    background: `linear-gradient(to bottom, ${topColor} 0%, ${topColor} ${splitAt}, ${bottomColor} ${splitAt}, ${bottomColor} 100%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700,
    display: 'inline-block',
    lineHeight: 1,
  }}>{text}</span>
);


export const GhostBlock = ({ text }: { text: string }) => (
    <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '3.5rem',
        height: '3.5rem',
        fontSize: '2.75rem',
        fontWeight: 'bold',
        fontFamily: 'Pretendard, sans-serif',
        color: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        margin: '0',
        lineHeight: 1,
    }}>
        {text}
    </div>
);

export const LegoBlock = ({ text, type, width = 1 }: { text: string; type: 'purple' | 'gray' | 'green' | 'brown' | 'purple-green' | 'brown-green'; width?: number }) => {
    let background = COLORS.purple;
    let color = '#ffffff';
    
    if (type === 'gray') {
      background = COLORS.gray;
      color = '#7c7c7c'; // Gray blocks have dark gray text
    }
    if (type === 'green') background = COLORS.green;
    if (type === 'brown') background = COLORS.brown;
    
    if (type === 'purple-green') {
        background = `linear-gradient(to bottom, ${COLORS.purple} 0%, ${COLORS.purple} 59%, ${COLORS.green} 59%, ${COLORS.green} 100%)`;
    }
    if (type === 'brown-green') {
        background = `linear-gradient(to bottom, ${COLORS.brown} 0%, ${COLORS.brown} 59%, ${COLORS.green} 59%, ${COLORS.green} 100%)`;
    }

    return (
        <div style={{ ...blockStyle, background, color, width: `${3.5 * width}rem` }}>
            {text}
        </div>
    );
};

export const Chapter2Diagrams = () => null; // placeholder export if needed


export type Chapter2VerbKey = 'give' | 'ask' | 'stay' | 'eat';

type BlockCell = {
  text: string;
  bg: string;
};

const BG_PURPLE = '#583884';
const BG_GRAY = '#e7e7e7';
const BG_GREEN = '#00fb49';
const BG_BROWN = '#85712a';
const BG_PURPLE_GREEN = 'linear-gradient(to bottom, #583884 0%, #583884 59%, #00fb49 59%, #00fb49 100%)';
const BG_BROWN_GREEN = 'linear-gradient(to bottom, #85712a 0%, #85712a 59%, #00fb49 59%, #00fb49 100%)';

interface VerbTileConfig {
  key: Chapter2VerbKey;
  num: string;
  baseEn: string;
  labelEn: string;
  baseKrRoot: string;
  baseKrSuffix: string;
  labelKr: string;
  enVariations: React.ReactNode;
  krTopRow: BlockCell[];
  krSplitRows: { left: BlockCell[]; right: BlockCell[] }[];
}

export const CHAPTER2_VERB_TILE_CONFIGS: VerbTileConfig[] = [
  {
    key: 'give',
    num: '01',
    baseEn: 'give',
    labelEn: '01. Give',
    baseKrRoot: '주',
    baseKrSuffix: '다',
    labelKr: '01. 주다',
    enVariations: (
      <>
        <div><span style={{ color: '#00fb49', fontWeight: 700 }}>Could you</span> <span style={{ color: '#583884', fontWeight: 700 }}>give</span></div>
        <div><span style={{ color: '#00fb49', fontWeight: 700 }}>Do you mind</span> <span style={{ color: '#583884', fontWeight: 700 }}>giv</span><span style={{ color: '#7c7c7c' }}>ing</span></div>
        <div><span style={{ color: '#00fb49', fontWeight: 700 }}>I was wondering if you would mind</span> <span style={{ color: '#583884', fontWeight: 700 }}>giv</span><span style={{ color: '#7c7c7c' }}>ing</span></div>
      </>
    ),
    krTopRow: [
      { text: '주', bg: BG_PURPLE },
      { text: 'ㅡ', bg: BG_PURPLE },
    ],
    krSplitRows: [
      {
        left: [
          { text: '주', bg: BG_PURPLE },
          { text: '다', bg: BG_GRAY },
        ],
        right: [
          { text: '줍', bg: BG_PURPLE_GREEN },
          { text: '니', bg: BG_GRAY },
          { text: '다', bg: BG_GRAY },
        ],
      },
      {
        left: [
          { text: '주', bg: BG_PURPLE },
          { text: '시', bg: BG_GREEN },
          { text: '다', bg: BG_GRAY },
        ],
        right: [
          { text: '주', bg: BG_PURPLE },
          { text: '십', bg: BG_GREEN },
          { text: '시', bg: BG_GREEN },
          { text: '오', bg: BG_GRAY },
        ],
      },
      {
        left: [
          { text: '드', bg: BG_PURPLE },
          { text: '리', bg: BG_BROWN },
          { text: '다', bg: BG_GRAY },
        ],
        right: [
          { text: '드', bg: BG_PURPLE },
          { text: '립', bg: BG_BROWN_GREEN },
          { text: '니', bg: BG_GRAY },
          { text: '다', bg: BG_GRAY },
        ],
      },
    ],
  },
  {
    key: 'ask',
    num: '02',
    baseEn: 'ask',
    labelEn: '02. Ask',
    baseKrRoot: '묻',
    baseKrSuffix: '다',
    labelKr: '02. 묻다',
    enVariations: (
      <>
        <div><span style={{ color: '#00fb49', fontWeight: 700 }}>can you</span> <span style={{ color: '#583884', fontWeight: 700 }}>ask</span></div>
        <div><span style={{ color: '#00fb49', fontWeight: 700 }}>would you</span> <span style={{ color: '#583884', fontWeight: 700 }}>ask</span> / <span style={{ color: '#00fb49', fontWeight: 700 }}>could you</span> <span style={{ color: '#583884', fontWeight: 700 }}>ask</span></div>
        <div><span style={{ color: '#00fb49', fontWeight: 700 }}>would you mind</span> <span style={{ color: '#583884', fontWeight: 700 }}>ask</span><span style={{ color: '#7c7c7c' }}>ing</span></div>
        <div><span style={{ color: '#00fb49', fontWeight: 700 }}>I was wondering if you could possibly</span> <span style={{ color: '#583884', fontWeight: 700 }}>ask</span></div>
      </>
    ),
    krTopRow: [
      { text: '묻', bg: BG_PURPLE },
      { text: 'ㅡ', bg: BG_PURPLE },
    ],
    krSplitRows: [
      {
        left: [
          { text: '묻', bg: BG_PURPLE },
          { text: '다', bg: BG_GRAY },
        ],
        right: [
          { text: '묻', bg: BG_PURPLE },
          { text: '습', bg: BG_GRAY },
          { text: '니', bg: BG_GRAY },
          { text: '다', bg: BG_GRAY },
        ],
      },
      {
        left: [
          { text: '물', bg: BG_PURPLE },
          { text: '으', bg: BG_GREEN },
          { text: '시', bg: BG_GREEN },
          { text: '다', bg: BG_GRAY },
        ],
        right: [
          { text: '물', bg: BG_PURPLE },
          { text: '으', bg: BG_GREEN },
          { text: '십', bg: BG_GREEN },
          { text: '시', bg: BG_GREEN },
          { text: '오', bg: BG_GRAY },
        ],
      },
      {
        left: [
          { text: '여', bg: BG_BROWN },
          { text: '쭙', bg: BG_BROWN },
          { text: '다', bg: BG_GRAY },
        ],
        right: [
          { text: '여', bg: BG_BROWN },
          { text: '쭙', bg: BG_BROWN },
          { text: '습', bg: BG_GRAY },
          { text: '니', bg: BG_GRAY },
          { text: '다', bg: BG_GRAY },
        ],
      },
    ],
  },
  {
    key: 'stay',
    num: '03',
    baseEn: 'stay',
    labelEn: '03. Stay',
    baseKrRoot: '있',
    baseKrSuffix: '다',
    labelKr: '03. 있다',
    enVariations: (
      <>
        <div><span style={{ color: '#00fb49', fontWeight: 700 }}>can you</span> <span style={{ color: '#583884', fontWeight: 700 }}>stay</span></div>
        <div><span style={{ color: '#00fb49', fontWeight: 700 }}>would you</span> <span style={{ color: '#583884', fontWeight: 700 }}>stay</span> / <span style={{ color: '#00fb49', fontWeight: 700 }}>could you</span> <span style={{ color: '#583884', fontWeight: 700 }}>stay</span></div>
        <div><span style={{ color: '#00fb49', fontWeight: 700 }}>would you mind</span> <span style={{ color: '#583884', fontWeight: 700 }}>stay</span><span style={{ color: '#7c7c7c' }}>ing</span></div>
        <div><span style={{ color: '#00fb49', fontWeight: 700 }}>I was wondering if you could possibly</span> <span style={{ color: '#583884', fontWeight: 700 }}>stay</span></div>
      </>
    ),
    krTopRow: [
      { text: '있', bg: BG_PURPLE },
      { text: 'ㅡ', bg: BG_PURPLE },
    ],
    krSplitRows: [
      {
        left: [
          { text: '있', bg: BG_PURPLE },
          { text: '다', bg: BG_GRAY },
        ],
        right: [
          { text: '있', bg: BG_PURPLE },
          { text: '습', bg: BG_GRAY },
          { text: '니', bg: BG_GRAY },
          { text: '다', bg: BG_GRAY },
        ],
      },
      {
        left: [
          { text: '있', bg: BG_PURPLE },
          { text: '으', bg: BG_GREEN },
          { text: '시', bg: BG_GREEN },
          { text: '다', bg: BG_GRAY },
        ],
        right: [
          { text: '있', bg: BG_PURPLE },
          { text: '으', bg: BG_GREEN },
          { text: '십', bg: BG_GREEN },
          { text: '시', bg: BG_GREEN },
          { text: '오', bg: BG_GRAY },
        ],
      },
      {
        left: [
          { text: '계', bg: BG_BROWN },
          { text: '시', bg: BG_BROWN },
          { text: '다', bg: BG_GRAY },
        ],
        right: [
          { text: '계', bg: BG_BROWN },
          { text: '십', bg: BG_BROWN_GREEN },
          { text: '니', bg: BG_GRAY },
          { text: '다', bg: BG_GRAY },
        ],
      },
    ],
  },
  {
    key: 'eat',
    num: '04',
    baseEn: 'eat',
    labelEn: '04. Eat',
    baseKrRoot: '먹',
    baseKrSuffix: '다',
    labelKr: '04. 먹다',
    enVariations: (
      <>
        <div><span style={{ color: '#00fb49', fontWeight: 700 }}>can you</span> <span style={{ color: '#583884', fontWeight: 700 }}>eat</span></div>
        <div><span style={{ color: '#00fb49', fontWeight: 700 }}>would you</span> <span style={{ color: '#583884', fontWeight: 700 }}>eat</span> / <span style={{ color: '#00fb49', fontWeight: 700 }}>could you</span> <span style={{ color: '#583884', fontWeight: 700 }}>eat</span></div>
        <div><span style={{ color: '#00fb49', fontWeight: 700 }}>would you mind</span> <span style={{ color: '#583884', fontWeight: 700 }}>eat</span><span style={{ color: '#7c7c7c' }}>ing</span></div>
        <div><span style={{ color: '#00fb49', fontWeight: 700 }}>I was wondering if you could possibly</span> <span style={{ color: '#583884', fontWeight: 700 }}>eat</span></div>
      </>
    ),
    krTopRow: [
      { text: '먹', bg: BG_PURPLE },
      { text: 'ㅡ', bg: BG_PURPLE },
    ],
    krSplitRows: [
      {
        left: [
          { text: '먹', bg: BG_PURPLE },
          { text: '다', bg: BG_GRAY },
        ],
        right: [
          { text: '먹', bg: BG_PURPLE },
          { text: '습', bg: BG_GRAY },
          { text: '니', bg: BG_GRAY },
          { text: '다', bg: BG_GRAY },
        ],
      },
      {
        left: [
          { text: '드', bg: BG_BROWN },
          { text: '시', bg: BG_BROWN },
          { text: '다', bg: BG_GRAY },
        ],
        right: [
          { text: '드', bg: BG_BROWN },
          { text: '십', bg: BG_BROWN_GREEN },
          { text: '니', bg: BG_GRAY },
          { text: '다', bg: BG_GRAY },
        ],
      },
    ],
  },
];

export const VerbTilePairInteractive = ({
  config,
  onActivateVerb,
  onLeaveVerb,
}: {
  config: VerbTileConfig;
  onActivateVerb?: (key: Chapter2VerbKey) => void;
  onLeaveVerb?: () => void;
}) => {
  const [hoveredSide, setHoveredSide] = React.useState<'en' | 'kr' | null>(null);
  const [pinnedEn, setPinnedEn] = React.useState(false);
  const [pinnedKr, setPinnedKr] = React.useState(false);

  const isEnActive = hoveredSide === 'en' || pinnedEn;
  const isKrActive = hoveredSide === 'kr' || pinnedKr;

  const bSize = '2.05rem';
  const bFont = '1.375rem'; // 110% of 1.25rem

  const maxLeftCols = Math.max(...config.krSplitRows.map((r) => r.left.length));
  const maxRightCols = Math.max(...config.krSplitRows.map((r) => r.right.length));

  // Optical vertical offset for lowercase English words inside the circle
  const enOpticalOffsetY =
    config.key === 'give' || config.key === 'stay' ? '-0.05em' : '-0.03em';

  return (
    <div
      onMouseEnter={() => onActivateVerb?.(config.key)}
      onMouseLeave={() => {
        setHoveredSide(null);
        onLeaveVerb?.();
      }}
      style={{
        display: 'flex',
        width: '100%',
        maxWidth: '820px',
        gap: 0,
        margin: '0 auto',
        fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Left Square: English Base & Halo Variation ── */}
      <div
        onMouseEnter={() => {
          setHoveredSide('en');
          onActivateVerb?.(config.key);
        }}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => {
          setPinnedEn((prev) => !prev);
          onActivateVerb?.(config.key);
        }}
        style={{
          flex: '1 1 0',
          aspectRatio: '1 / 1',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
        role="button"
        tabIndex={0}
        aria-label={`English verb ${config.baseEn} base form and halo gradation variation`}
      >
        {isEnActive ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              background: 'transparent',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '12rem',
                height: '12rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, #583884 0%, #583884 32%, rgba(88,56,132,0.3) 38%, rgba(255,255,255,0.85) 45%, #00fb49 58%, #00fb49 76%, rgba(0,251,73,0) 100%)',
                }}
              />
              <span
                style={{
                  position: 'relative',
                  zIndex: 10,
                  color: '#ffffff',
                  fontSize: '2.25rem',
                  fontWeight: 700,
                  lineHeight: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `translateY(${enOpticalOffsetY})`,
                }}
              >
                {config.baseEn}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.15rem',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.35,
                color: '#000000',
                marginTop: '0.65rem',
              }}
            >
              {config.enVariations}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              background: 'transparent',
            }}
          >
            <div
              style={{
                width: '6.5rem',
                height: '6.5rem',
                borderRadius: '50%',
                backgroundColor: '#583884',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  color: '#ffffff',
                  fontSize: '2rem',
                  fontWeight: 700,
                  lineHeight: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `translateY(${enOpticalOffsetY})`,
                }}
              >
                {config.baseEn}
              </span>
            </div>
          </div>
        )}

        <div style={{ position: 'absolute', bottom: '16px', left: '16px', pointerEvents: 'none', zIndex: 10 }}>
          <span style={{ fontSize: '16px', fontWeight: 400, color: '#7c7c7c', lineHeight: 1 }}>
            {config.labelEn}
          </span>
        </div>
      </div>

      {/* ── Right Square: Korean Base & Stacked Lego Variation ── */}
      <div
        onMouseEnter={() => {
          setHoveredSide('kr');
          onActivateVerb?.(config.key);
        }}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => {
          setPinnedKr((prev) => !prev);
          onActivateVerb?.(config.key);
        }}
        style={{
          flex: '1 1 0',
          aspectRatio: '1 / 1',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
        role="button"
        tabIndex={0}
        aria-label={`Korean verb ${config.labelKr} base form and stacked Lego blocks variation`}
      >
        {isKrActive ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              background: 'transparent',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center', lineHeight: 1 }}>
              {/* Top Root Row */}
              <div style={{ display: 'flex', gap: 0 }}>
                {config.krTopRow.map((cell, idx) => (
                  <div
                    key={idx}
                    style={{
                      ...blockStyle,
                      width: bSize,
                      minHeight: bSize,
                      height: bSize,
                      fontSize: bFont,
                      background: cell.bg,
                      color: '#ffffff',
                    }}
                  >
                    {cell.text}
                  </div>
                ))}
              </div>
              {/* Split Rows: Left (Intimate) & Right (Formal) */}
              {config.krSplitRows.map((row, rIdx) => (
                <div key={rIdx} style={{ display: 'flex', gap: bSize, alignItems: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      width: `calc(${maxLeftCols} * ${bSize})`,
                    }}
                  >
                    {row.left.map((cell, cIdx) => (
                      <div
                        key={cIdx}
                        style={{
                          ...blockStyle,
                          width: bSize,
                          minHeight: bSize,
                          height: bSize,
                          fontSize: bFont,
                          background: cell.bg,
                          color: '#ffffff',
                        }}
                      >
                        {cell.text}
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      width: `calc(${maxRightCols} * ${bSize})`,
                    }}
                  >
                    {row.right.map((cell, cIdx) => (
                      <div
                        key={cIdx}
                        style={{
                          ...blockStyle,
                          width: bSize,
                          minHeight: bSize,
                          height: bSize,
                          fontSize: bFont,
                          background: cell.bg,
                          color: '#ffffff',
                        }}
                      >
                        {cell.text}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              background: 'transparent',
            }}
          >
            <div style={{ display: 'flex', gap: 0 }}>
              <div
                style={{
                  ...blockStyle,
                  width: '3.25rem',
                  minHeight: '3.25rem',
                  height: '3.25rem',
                  fontSize: '2.2rem',
                  background: '#583884',
                  color: '#ffffff',
                }}
              >
                {config.baseKrRoot}
              </div>
              <div
                style={{
                  ...blockStyle,
                  width: '3.25rem',
                  minHeight: '3.25rem',
                  height: '3.25rem',
                  fontSize: '2.2rem',
                  background: '#e7e7e7',
                  color: '#ffffff',
                }}
              >
                {config.baseKrSuffix}
              </div>
            </div>
          </div>
        )}

        <div style={{ position: 'absolute', bottom: '16px', left: '16px', pointerEvents: 'none', zIndex: 10 }}>
          <span style={{ fontSize: '16px', fontWeight: 400, color: '#7c7c7c', lineHeight: 1 }}>
            {config.labelKr}
          </span>
        </div>
      </div>
    </div>
  );
};

export const AllChapter2VerbTilesInteractive = ({
  onSelectVerb,
}: {
  onSelectVerb?: (key: Chapter2VerbKey) => void;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '820px',
      gap: 0,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}
  >
    {CHAPTER2_VERB_TILE_CONFIGS.map((cfg) => (
      <VerbTilePairInteractive key={cfg.key} config={cfg} onActivateVerb={onSelectVerb} />
    ))}
  </div>
);

export const GiveBaseVariationInteractive = () => (
  <VerbTilePairInteractive config={CHAPTER2_VERB_TILE_CONFIGS[0]} />
);

export const Give1Diagram = GiveBaseVariationInteractive;

export const Give2Diagram = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8rem', padding: '0', fontFamily: 'Pretendard, sans-serif' }}>
      {/* Left: English Halo */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '30rem', height: '30rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, #583884 0%, #583884 25%, rgba(255,255,255,1) 45%, rgba(255,255,255,1) 55%, #00fb49 75%, #00fb49 100%)' }} />
          <div style={{ position: 'relative', zIndex: 10, color: '#ffffff', fontSize: '4rem', fontWeight: 700 }}>give</div>
        </div>
      </div>

      {/* Right: Korean Lego */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 3.5rem)', gridTemplateRows: 'repeat(4, 3.5rem)', gap: 0 }}>
            {/* Row 1 */}
            <div style={{ gridColumn: '3 / span 2', display: 'flex' }}>
                <LegoBlock text="주" type="purple" />
                <LegoBlock text="ㅡ" type="purple" />
            </div>
            {/* Row 2 */}
            <div style={{ gridColumn: '2 / span 2', display: 'flex' }}>
                <LegoBlock text="주" type="purple" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 3', display: 'flex' }}>
                <LegoBlock text="줍" type="purple-green" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
            {/* Row 3 */}
            <div style={{ gridColumn: '1 / span 3', display: 'flex' }}>
                <LegoBlock text="주" type="purple" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 4', display: 'flex' }}>
                <LegoBlock text="주" type="purple" />
                <LegoBlock text="십" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="오" type="gray" />
            </div>
            {/* Row 4 */}
            <div style={{ gridColumn: '1 / span 3', display: 'flex' }}>
                <LegoBlock text="드" type="purple" />
                <LegoBlock text="리" type="brown" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 4', display: 'flex' }}>
                <LegoBlock text="드" type="purple" />
                <LegoBlock text="립" type="brown-green" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
      </div>
    </div>
);

export const Give3Diagram = () => (
    <div style={{ display: 'flex', width: '100%', height: '35rem', fontFamily: 'Pretendard, sans-serif' }}>
        <div style={{ flex: 1, backgroundColor: '#70ebd7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#83cabe' }}>
                <span style={{ fontSize: '1.05rem', color: '#83cabe' }}><span style={{ fontWeight: 'bold', color: '#83cabe' }}>친밀한/비격식적 청자</span><br/>Intimate/Casual Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start', width: '10.5rem' }}>
                <div style={{ display: 'flex' }}>
                    <GhostBlock text="주" />
                    <LegoBlock text="주" type="purple" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="주" type="purple" />
                    <LegoBlock text="시" type="green" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="드" type="purple" />
                    <LegoBlock text="리" type="brown" />
                    <LegoBlock text="다" type="gray" />
                </div>
            </div>
        </div>
        
        <div style={{ flex: 1, backgroundColor: '#7a0927', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#833448' }}>
                <span style={{ fontSize: '1.05rem', color: '#833448' }}><span style={{ fontWeight: 'bold', color: '#833448' }}>격식적 청자</span><br/>Formal/Polite Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start', width: '14rem' }}>
                <div style={{ display: 'flex' }}>
                    <GhostBlock text="주" />
                    <LegoBlock text="줍" type="purple-green" />
                    <LegoBlock text="니" type="gray" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="주" type="purple" />
                    <LegoBlock text="십" type="green" />
                <LegoBlock text="시" type="green" />
                    <LegoBlock text="오" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="드" type="purple" />
                    <LegoBlock text="립" type="brown-green" />
                    <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
                </div>
            </div>
        </div>
    </div>
);

export const Give4Diagram = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', fontFamily: 'Pretendard, sans-serif' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#e6e4d7', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#9d9990', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>중립(Neutral)
            </div>
            <div style={{ display: 'flex' }}>
                <GhostBlock text="주" />
                <GhostBlock text="시" />
                <LegoBlock text="주" type="purple" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="줍" type="purple-green" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#c1b897', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#978e6c', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>주체 높임(Honor Subject)
            </div>
            <div style={{ display: 'flex' }}>
                <LegoBlock text="주" type="purple" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="주" type="purple" />
                <LegoBlock text="십" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="오" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#9e8f5d', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#7a6a3b', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>객체 높임(Honor Object/Recipient)
            </div>
            <div style={{ display: 'flex' }}>
                <LegoBlock text="드" type="purple" />
                <LegoBlock text="리" type="brown" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="드" type="purple" />
                <LegoBlock text="립" type="brown-green" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
    </div>
);




export const Ask1Diagram = () => (
    <div style={{ display: 'flex', width: '100%', gap: '4rem', padding: '0', fontFamily: 'Pretendard, sans-serif', fontSize: '2.25rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          <div><span style={{ fontWeight: 700, color: '#7c7c7c' }}>ask</span><br/><span style={{ fontWeight: 700, color: '#00fb49' }}>can you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>ask</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>would you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>ask</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>could you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>ask</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>would you mind</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>ask<span style={{ color: '#00fb49' }}>ing</span></span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>I was wondering if you could possibly</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>ask</span></div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5rem', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#583884' }}>묻</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#583884' }}>물</span><span style={{ fontWeight: 700, color: '#00fb49' }}>으시</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>여쭙</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>여쭙</span><span style={{ fontWeight: 700, color: '#00fb49' }}>습니</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
      </div>
    </div>
);

export const Ask2Diagram = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8rem', padding: '0', fontFamily: 'Pretendard, sans-serif' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '30rem', height: '30rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, #583884 0%, #583884 25%, rgba(255,255,255,1) 45%, rgba(255,255,255,1) 55%, #00fb49 75%, #00fb49 100%)' }} />
          <div style={{ position: 'relative', zIndex: 10, color: '#ffffff', fontSize: '4rem', fontWeight: 700 }}>ask</div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 3.5rem)', gridTemplateRows: 'repeat(4, 3.5rem)', gap: 0 }}>
            <div style={{ gridColumn: '2 / span 2', display: 'flex' }}>
                <LegoBlock text="묻" type="purple" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 3', display: 'flex' }}>
                <LegoBlock text="묻" type="purple" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '1 / span 3', display: 'flex' }}>
                <LegoBlock text="물" type="purple" />
                <LegoBlock text="으" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 4', display: 'flex' }}>
                <LegoBlock text="물" type="purple" />
                <LegoBlock text="으" type="green" />
                <LegoBlock text="십" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="오" type="gray" />
            </div>
            <div style={{ gridColumn: '1 / span 3', display: 'flex' }}>
                <LegoBlock text="여" type="brown" />
                <LegoBlock text="쭙" type="brown" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 4', display: 'flex' }}>
                <LegoBlock text="여" type="brown" />
                <LegoBlock text="쭙" type="brown" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
      </div>
    </div>
);

export const Ask3Diagram = () => (
    <div style={{ display: 'flex', width: '100%', height: '35rem', fontFamily: 'Pretendard, sans-serif' }}>
        <div style={{ flex: 1, backgroundColor: '#70ebd7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#83cabe' }}>
                <span style={{ fontSize: '1.05rem', color: '#83cabe' }}><span style={{ fontWeight: 'bold', color: '#83cabe' }}>친밀한/비격식적 청자</span><br/>Intimate/Casual Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-end', width: '14rem' }}>
                <div style={{ display: 'flex' }}>
                                        <LegoBlock text="묻" type="purple" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="물" type="purple" />
                    <LegoBlock text="으" type="green" />
                    <LegoBlock text="시" type="green" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="여" type="brown" />
                    <LegoBlock text="쭙" type="brown" />
                    <LegoBlock text="다" type="gray" />
                </div>
            </div>
        </div>
        <div style={{ flex: 1, backgroundColor: '#7a0927', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#833448' }}>
                <span style={{ fontSize: '1.05rem', color: '#833448' }}><span style={{ fontWeight: 'bold', color: '#833448' }}>격식적 청자</span><br/>Formal/Polite Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-end', width: '14rem' }}>
                <div style={{ display: 'flex' }}>
                                        <LegoBlock text="묻" type="purple" />
                    <LegoBlock text="습" type="gray" />
                    <LegoBlock text="니" type="gray" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="물" type="purple" />
                    <LegoBlock text="으" type="green" />
                    <LegoBlock text="십" type="green" />
                    <LegoBlock text="시" type="green" />
                    <LegoBlock text="오" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="여" type="brown" />
                    <LegoBlock text="쭙" type="brown" />
                    <LegoBlock text="습" type="gray" />
                    <LegoBlock text="니" type="gray" />
                    <LegoBlock text="다" type="gray" />
                </div>
            </div>
        </div>
    </div>
);

export const Ask4Diagram = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', fontFamily: 'Pretendard, sans-serif' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#e6e4d7', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#9d9990', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>중립(Neutral)
            </div>
            <div style={{ display: 'flex' }}>
                                                <LegoBlock text="묻" type="purple" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="묻" type="purple" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#c1b897', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#978e6c', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>주체 높임(Honor Subject)
            </div>
            <div style={{ display: 'flex' }}>
                <LegoBlock text="물" type="purple" />
                <LegoBlock text="으" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="물" type="purple" />
                <LegoBlock text="으" type="green" />
                <LegoBlock text="십" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="오" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#9e8f5d', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#7a6a3b', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>객체 높임(Honor Object)
            </div>
            <div style={{ display: 'flex' }}>
                <LegoBlock text="여" type="brown" />
                <LegoBlock text="쭙" type="brown" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="여" type="brown" />
                <LegoBlock text="쭙" type="brown" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
    </div>
);


export const Stay1Diagram = () => (
    <div style={{ display: 'flex', width: '100%', gap: '4rem', padding: '0', fontFamily: 'Pretendard, sans-serif', fontSize: '2.25rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          <div><span style={{ fontWeight: 700, color: '#7c7c7c' }}>stay</span><br/><span style={{ fontWeight: 700, color: '#00fb49' }}>can you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>stay</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>would you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>stay</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>could you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>stay</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>would you mind</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>stay<span style={{ color: '#00fb49' }}>ing</span></span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>I was wondering if you could possibly</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>stay</span></div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5rem', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#583884' }}>있</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#583884' }}>있</span><span style={{ fontWeight: 700, color: '#00fb49' }}>으시</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>계시</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>계십</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>니다</span></div>
      </div>
    </div>
);

export const Stay2Diagram = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8rem', padding: '0', fontFamily: 'Pretendard, sans-serif' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '30rem', height: '30rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, #583884 0%, #583884 25%, rgba(255,255,255,1) 45%, rgba(255,255,255,1) 55%, #00fb49 75%, #00fb49 100%)' }} />
          <div style={{ position: 'relative', zIndex: 10, color: '#ffffff', fontSize: '4rem', fontWeight: 700 }}>stay</div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 3.5rem)', gridTemplateRows: 'repeat(4, 3.5rem)', gap: 0 }}>
            <div style={{ gridColumn: '2 / span 2', display: 'flex' }}>
                <LegoBlock text="있" type="purple" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 3', display: 'flex' }}>
                <LegoBlock text="있" type="purple" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '1 / span 3', display: 'flex' }}>
                <LegoBlock text="있" type="purple" />
                <LegoBlock text="으" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 4', display: 'flex' }}>
                <LegoBlock text="있" type="purple" />
                <LegoBlock text="으" type="green" />
                <LegoBlock text="십" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="오" type="gray" />
            </div>
            <div style={{ gridColumn: '1 / span 3', display: 'flex' }}>
                <LegoBlock text="계" type="brown" />
                <LegoBlock text="시" type="brown" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 4', display: 'flex' }}>
                <LegoBlock text="계" type="brown" />
                <LegoBlock text="십" type="brown-green" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
      </div>
    </div>
);

export const Stay3Diagram = () => (
    <div style={{ display: 'flex', width: '100%', height: '35rem', fontFamily: 'Pretendard, sans-serif' }}>
        <div style={{ flex: 1, backgroundColor: '#70ebd7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#83cabe' }}>
                <span style={{ fontSize: '1.05rem', color: '#83cabe' }}><span style={{ fontWeight: 'bold', color: '#83cabe' }}>친밀한/비격식적 청자</span><br/>Intimate/Casual Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-end', width: '14rem' }}>
                <div style={{ display: 'flex' }}>
                                        <LegoBlock text="있" type="purple" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="있" type="purple" />
                    <LegoBlock text="으" type="green" />
                    <LegoBlock text="시" type="green" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="계" type="brown" />
                    <LegoBlock text="시" type="brown" />
                    <LegoBlock text="다" type="gray" />
                </div>
            </div>
        </div>
        <div style={{ flex: 1, backgroundColor: '#7a0927', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#833448' }}>
                <span style={{ fontSize: '1.05rem', color: '#833448' }}><span style={{ fontWeight: 'bold', color: '#833448' }}>격식적 청자</span><br/>Formal/Polite Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-end', width: '14rem' }}>
                <div style={{ display: 'flex' }}>
                                        <LegoBlock text="있" type="purple" />
                    <LegoBlock text="습" type="gray" />
                    <LegoBlock text="니" type="gray" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="있" type="purple" />
                    <LegoBlock text="으" type="green" />
                    <LegoBlock text="십" type="green" />
                    <LegoBlock text="시" type="green" />
                    <LegoBlock text="오" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="계" type="brown" />
                    <LegoBlock text="십" type="brown-green" />
                    <LegoBlock text="니" type="gray" />
                    <LegoBlock text="다" type="gray" />
                </div>
            </div>
        </div>
    </div>
);

export const Stay4Diagram = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', fontFamily: 'Pretendard, sans-serif' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#e6e4d7', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#9d9990', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>중립(Neutral)
            </div>
            <div style={{ display: 'flex' }}>
                                                <LegoBlock text="있" type="purple" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="있" type="purple" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#c1b897', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#978e6c', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>간접 주체 높임(Indirect Subject)
            </div>
            <div style={{ display: 'flex' }}>
                <LegoBlock text="있" type="purple" />
                <LegoBlock text="으" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="있" type="purple" />
                <LegoBlock text="으" type="green" />
                <LegoBlock text="십" type="green" />
                <LegoBlock text="시" type="green" />
                <LegoBlock text="오" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#9e8f5d', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#7a6a3b', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>직접 주체 높임(Direct Subject)
            </div>
            <div style={{ display: 'flex' }}>
                <LegoBlock text="계" type="brown" />
                <LegoBlock text="시" type="brown" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="계" type="brown" />
                <LegoBlock text="십" type="brown-green" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
    </div>
);


export const Eat1Diagram = () => (
    <div style={{ display: 'flex', width: '100%', gap: '4rem', padding: '0', fontFamily: 'Pretendard, sans-serif', fontSize: '2.25rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          <div><span style={{ fontWeight: 700, color: '#7c7c7c' }}>eat</span><br/><span style={{ fontWeight: 700, color: '#00fb49' }}>can you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>eat</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>would you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>eat</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>could you</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>eat</span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>would you mind</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>eat<span style={{ color: '#00fb49' }}>ing</span></span></div>
          <div><span style={{ fontWeight: 700, color: '#00fb49' }}>I was wondering if you could possibly</span> <span style={{ fontWeight: 700, color: '#7c7c7c' }}>eat</span></div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5rem', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#583884' }}>먹</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>드시</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>다</span></div>
          <div style={{ display: 'flex', gap: '0' }}><span style={{ fontWeight: 700, color: '#85712a' }}>드십</span><span style={{ fontWeight: 700, color: '#7c7c7c' }}>니다</span></div>
      </div>
    </div>
);

export const Eat2Diagram = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8rem', padding: '0', fontFamily: 'Pretendard, sans-serif' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '30rem', height: '30rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, #583884 0%, #583884 25%, rgba(255,255,255,1) 45%, rgba(255,255,255,1) 55%, #00fb49 75%, #00fb49 100%)' }} />
          <div style={{ position: 'relative', zIndex: 10, color: '#ffffff', fontSize: '4rem', fontWeight: 700 }}>eat</div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 3.5rem)', gridTemplateRows: 'repeat(4, 3.5rem)', gap: 0 }}>
            <div style={{ gridColumn: '2 / span 2', display: 'flex' }}>
                <LegoBlock text="먹" type="purple" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 3', display: 'flex' }}>
                <LegoBlock text="먹" type="purple" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '1 / span 3', display: 'flex' }}>
                <LegoBlock text="드" type="brown" />
                <LegoBlock text="시" type="brown" />
                <LegoBlock text="다" type="gray" />
            </div>
            <div style={{ gridColumn: '5 / span 4', display: 'flex' }}>
                <LegoBlock text="드" type="brown" />
                <LegoBlock text="십" type="brown-green" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
      </div>
    </div>
);

export const Eat3Diagram = () => (
    <div style={{ display: 'flex', width: '100%', height: '35rem', fontFamily: 'Pretendard, sans-serif' }}>
        <div style={{ flex: 1, backgroundColor: '#70ebd7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#83cabe' }}>
                <span style={{ fontSize: '1.05rem', color: '#83cabe' }}><span style={{ fontWeight: 'bold', color: '#83cabe' }}>친밀한/비격식적 청자</span><br/>Intimate/Casual Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-end', width: '10.5rem' }}>
                <div style={{ display: 'flex' }}>
                                        <LegoBlock text="먹" type="purple" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="드" type="brown" />
                    <LegoBlock text="시" type="brown" />
                    <LegoBlock text="다" type="gray" />
                </div>
            </div>
        </div>
        <div style={{ flex: 1, backgroundColor: '#7a0927', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#833448' }}>
                <span style={{ fontSize: '1.05rem', color: '#833448' }}><span style={{ fontWeight: 'bold', color: '#833448' }}>격식적 청자</span><br/>Formal/Polite Listener</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-end', width: '14rem' }}>
                <div style={{ display: 'flex' }}>
                                        <LegoBlock text="먹" type="purple" />
                    <LegoBlock text="습" type="gray" />
                    <LegoBlock text="니" type="gray" />
                    <LegoBlock text="다" type="gray" />
                </div>
                <div style={{ display: 'flex' }}>
                    <LegoBlock text="드" type="brown" />
                    <LegoBlock text="십" type="brown-green" />
                    <LegoBlock text="니" type="gray" />
                    <LegoBlock text="다" type="gray" />
                </div>
            </div>
        </div>
    </div>
);

export const Eat4Diagram = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', fontFamily: 'Pretendard, sans-serif' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#e6e4d7', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#9d9990', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>중립(Neutral)
            </div>
            <div style={{ display: 'flex' }}>
                                                <LegoBlock text="먹" type="purple" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="먹" type="purple" />
                <LegoBlock text="습" type="gray" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#c1b897', minHeight: '3.5rem' }}>
            <div style={{ flex: 1, padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '1.4rem', color: '#978e6c', position: 'relative', zIndex: 10, fontWeight: 'bold' }}>
                주체 및 객체 높임 / Referent Coordinate<br/>주체 높임(Honor Subject)
            </div>
            <div style={{ display: 'flex' }}>
                <LegoBlock text="드" type="brown" />
                <LegoBlock text="시" type="brown" />
                <LegoBlock text="다" type="gray" />
                <LegoBlock text="드" type="brown" />
                <LegoBlock text="십" type="brown-green" />
                <LegoBlock text="니" type="gray" />
                <LegoBlock text="다" type="gray" />
            </div>
        </div>
    </div>
);
