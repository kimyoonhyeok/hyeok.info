import type { RelationalDiagramProps, BoundaryType } from "./Chapter1Diagrams";

/**
 * Chapter 1 — single source of truth for the 10 address terms.
 * `variants` holds the exact RelationalDiagram props used by the detail sections (001–010)
 * and by the Term Index preview panel. Summaries are verbatim excerpts of each term's
 * existing "Definition / 정의" paragraph (no new claims).
 */

export type DiagramVariant = Omit<RelationalDiagramProps, "autoHint" | "compact">;

export interface TermEntry {
  id: string;
  anchor: string;
  en: string;
  kr: string;
  boundary: BoundaryType;
  summaryEn: string;
  summaryKr: string;
  variants: DiagramVariant[];
}

const BL_IN = "In-group : 내집단";
const BL_OUT = "Out-group : 외집단";
const BL_KIN = "Kinship Boundary : Closed / 친족경계 : 닫힘";
const S_NEUTRAL = "Speaker : Gender-Neutral\n화자 : 성별 무관";
const T_NEUTRAL = "Target : Gender-Neutral\n청자 : 성별 무관";

export const CH1_TERMS: TermEntry[] = [
  {
    id: "001",
    anchor: "term-001",
    en: "Eoreun",
    kr: "어른",
    boundary: "none",
    summaryEn:
      "It refers to an elder who commands social respect through accumulated experience and moral integrity.",
    summaryKr: "오랜 경험과 도덕적 품성을 갖추어 사회적 존경을 받아야 하는 연장자를 의미합니다.",
    variants: [
      {
        speakerGender: "neutral",
        targetGender: "neutral",
        targetX: 3,
        targetY: 3,
        boundary: "none",
        speakerLabel: S_NEUTRAL,
        targetLabel: T_NEUTRAL,
        distanceLabel: "Distance(X): High\nHierarchy(Y): High",
      },
    ],
  },
  {
    id: "002",
    anchor: "term-002",
    en: "Hyeong / Oppa",
    kr: "형 / 오빠",
    boundary: "ingroup",
    summaryEn:
      "Hyeong is used by male speakers to address an older male; oppa is used by female speakers to address an older male.",
    summaryKr:
      "형은 남성이 자신보다 나이가 많은 남성을 부르는 호칭이고, 오빠는 여성이 자신보다 나이가 많은 남성을 부르는 호칭입니다.",
    variants: [
      {
        speakerGender: "neutral",
        targetGender: "neutral",
        targetX: 3,
        targetY: 3,
        boundary: "ingroup",
        boundaryLabel: BL_IN,
        speakerLabel: S_NEUTRAL,
        targetLabel: T_NEUTRAL,
        distanceLabel: "Distance(X): High\nHierarchy(Y): High",
      },
      {
        speakerGender: "female",
        targetGender: "male",
        targetX: 1,
        targetY: 1,
        boundary: "ingroup",
        boundaryLabel: BL_IN,
        speakerLabel: "Speaker : Female\n화자 : 여성",
        targetLabel: "Target : Male\n청자 : 남성",
        distanceLabel: "Distance(X): Low\nHierarchy(Y): Low",
      },
    ],
  },
  {
    id: "003",
    anchor: "term-003",
    en: "Nuna / Eonni",
    kr: "누나 / 언니",
    boundary: "ingroup",
    summaryEn:
      "Nuna is used by male speakers to address an older female; eonni is used by female speakers to address an older female.",
    summaryKr:
      "누나는 남성이 자신보다 나이가 많은 여성을 부르는 호칭이고, 언니는 여성이 자신보다 나이가 많은 여성을 부르는 호칭입니다.",
    variants: [
      {
        speakerGender: "neutral",
        targetGender: "neutral",
        targetX: 2,
        targetY: 2,
        boundary: "ingroup",
        boundaryLabel: BL_IN,
        speakerLabel: S_NEUTRAL,
        targetLabel: T_NEUTRAL,
        distanceLabel: "Distance(X): Mid\nHierarchy(Y): Mid",
      },
      {
        speakerGender: "female",
        targetGender: "female",
        targetX: 1,
        targetY: 1,
        boundary: "none",
        speakerLabel: "Speaker : Female\n화자 : 여성",
        targetLabel: "Target : Female\n청자 : 여성",
        distanceLabel: "Distance(X): Low\nHierarchy(Y): Low",
      },
      {
        speakerGender: "male",
        targetGender: "female",
        targetX: 1,
        targetY: 1,
        boundary: "none",
        speakerLabel: "Speaker : Male\n화자 : 남성",
        targetLabel: "Target : Female\n청자 : 여성",
        distanceLabel: "Distance(X): Low\nHierarchy(Y): Low",
      },
    ],
  },
  {
    id: "004",
    anchor: "term-004",
    en: "Witsaram",
    kr: "윗사람",
    boundary: "ingroup",
    summaryEn:
      "A person occupying a higher position within any shared social hierarchy — professional, academic, or familial — to whom deference is considered obligatory regardless of context.",
    summaryKr: "직장, 학교, 가족 등 특정 위계 구조 안에서 자신보다 높은 위치에 있는 사람을 가리킵니다.",
    variants: [
      {
        speakerGender: "neutral",
        targetGender: "neutral",
        targetX: 3,
        targetY: 3,
        boundary: "ingroup",
        boundaryLabel: BL_IN,
        speakerLabel: S_NEUTRAL,
        targetLabel: T_NEUTRAL,
        distanceLabel: "Distance(X): High\nHierarchy(Y): High",
      },
    ],
  },
  {
    id: "005",
    anchor: "term-005",
    en: "Seonbae / Hubae",
    kr: "선후배",
    boundary: "ingroup",
    summaryEn:
      "A relational category denoting those who entered the same institution earlier (seonbae) and those who entered later (hubae), independent of chronological age.",
    summaryKr: "같은 기관 안에서 먼저 들어온 사람(선배)과 나중에 들어온 사람(후배)의 관계를 나타냅니다.",
    variants: [
      {
        speakerGender: "neutral",
        targetGender: "neutral",
        targetX: 2,
        targetY: 2,
        boundary: "ingroup",
        boundaryLabel: BL_IN,
        speakerLabel: S_NEUTRAL,
        targetLabel: T_NEUTRAL,
        distanceLabel: "Distance(X): Mid\nHierarchy(Y): Mid",
      },
    ],
  },
  {
    id: "006",
    anchor: "term-006",
    en: "You",
    kr: "당신, 너",
    boundary: "none",
    summaryEn:
      "A universal second-person pronoun that addresses the listener purely as a conversational participant position, establishing symmetry regardless of age, status, or kinship.",
    summaryKr: "나이, 지위, 혈연에 관계없이 모든 대화 상대를 대칭적 위치에 놓는 보편적 2인칭 대명사입니다.",
    variants: [
      {
        speakerGender: "combined",
        targetGender: "combined",
        targetX: 3,
        targetY: 0,
        boundary: "none",
        speakerLabel: "combined",
        distanceLabel: "Distance(X): N/A\nHierarchy(Y): N/A",
      },
    ],
  },
  {
    id: "007",
    anchor: "term-007",
    en: "First Name",
    kr: "이름 부르기",
    boundary: "ingroup",
    summaryEn:
      "The convention of addressing an individual by their given name across social domains, placing individual identity over institutional rank, generational age, or kinship titles.",
    summaryKr:
      "조직 내 직급, 세대적 나이, 친족 호칭보다 개인의 정체성을 우선하여 고유명사(이름)로 상대를 지칭하는 방식입니다.",
    variants: [
      {
        speakerGender: "combined",
        targetGender: "combined",
        targetX: 2,
        targetY: 0,
        boundary: "ingroup",
        boundaryLabel: BL_IN,
        speakerLabel: "combined",
        distanceLabel: "Distance(X): Mid\nHierarchy(Y): N/A",
      },
    ],
  },
  {
    id: "008",
    anchor: "term-008",
    en: "Brother / Sister",
    kr: "친형제 / 친자매",
    boundary: "kinship",
    summaryEn: "Terms strictly bound to biological or legal family relations.",
    summaryKr: "생물학적·법적 혈연 관계에만 적용되는 호칭입니다.",
    variants: [
      {
        speakerGender: "neutral",
        targetGender: "neutral",
        targetX: 1,
        targetY: 2,
        boundary: "kinship",
        boundaryLabel: BL_KIN,
        speakerLabel: S_NEUTRAL,
        targetLabel: S_NEUTRAL,
        distanceLabel: "Distance(X): Low\nHierarchy(Y): Mid",
      },
      {
        speakerGender: "female",
        targetGender: "female",
        targetX: 1,
        targetY: 2,
        boundary: "kinship",
        boundaryLabel: BL_KIN,
        speakerLabel: "Speaker : Female\n화자 : 여성",
        targetLabel: "Target : Female\n청자: 여성",
        distanceLabel: "Distance(X): Low\nHierarchy(Y): Mid",
      },
      {
        speakerGender: "male",
        targetGender: "male",
        targetX: 1,
        targetY: 2,
        boundary: "kinship",
        boundaryLabel: BL_KIN,
        speakerLabel: "Speaker : Male\n화자 : 남성",
        targetLabel: "Target : Male\n청자: 남성",
        distanceLabel: "Distance(X): Low\nHierarchy(Y): Mid",
      },
      {
        speakerGender: "female",
        targetGender: "male",
        targetX: 1,
        targetY: 2,
        boundary: "kinship",
        boundaryLabel: BL_KIN,
        speakerLabel: "Speaker : Female\n화자 : 여성",
        targetLabel: "Target : Male\n청자: 남성",
        distanceLabel: "Distance(X): Low\nHierarchy(Y): Mid",
      },
    ],
  },
  {
    id: "009",
    anchor: "term-009",
    en: "Mr. / Ms.",
    kr: "~씨, 선생님",
    boundary: "outgroup",
    summaryEn:
      "Public honorifics that signal basic social respect without carrying information about the interpersonal intimacy, hierarchy, or solidarity between the speakers.",
    summaryKr: "화자 간의 친밀도, 위계, 연대감에 대한 정보 없이 기본적인 사회적 존중을 나타내는 공적 존칭입니다.",
    variants: [
      {
        speakerGender: "combined",
        targetGender: "neutral",
        targetX: 3,
        targetY: 0,
        boundary: "outgroup",
        boundaryLabel: BL_OUT,
        speakerLabel: "combined",
        distanceLabel: "Distance(X): High\nHierarchy(Y): N/A",
      },
    ],
  },
  {
    id: "010",
    anchor: "term-010",
    en: "Sir / Ma'am",
    kr: "손님 / 선생님",
    boundary: "outgroup",
    summaryEn:
      "Informal honorifics used in public out-group contexts to signal basic deference without encoding personal intimacy or sustained relational commitment.",
    summaryKr:
      "지속적 관계 결속이나 개인적 친밀도를 부호화하지 않으면서, 공적 외집단 맥락에서 기본적 경의를 표시하는 비공식 존칭입니다.",
    variants: [
      {
        speakerGender: "neutral",
        targetGender: "neutral",
        targetX: 2.5,
        targetY: 1.5,
        boundary: "outgroup",
        boundaryLabel: BL_OUT,
        speakerLabel: S_NEUTRAL,
        targetLabel: T_NEUTRAL,
        distanceLabel: "Distance(X): High\nHierarchy(Y): Mid",
      },
      {
        speakerGender: "neutral",
        targetGender: "male",
        targetX: 2.1,
        targetY: 1.5,
        target2Gender: "female",
        target2X: 2.9,
        target2Y: 1.5,
        target2Label: "Target : Female\n청자: 여성",
        boundary: "outgroup",
        boundaryLabel: BL_OUT,
        speakerLabel: S_NEUTRAL,
        targetLabel: "Target : Male\n청자: 남성",
        distanceLabel: "Distance(X): High\nHierarchy(Y) : Mid",
      },
    ],
  },
];

/** Lookup by id for the detail sections in page.tsx */
export const T = Object.fromEntries(CH1_TERMS.map((t) => [t.id, t])) as Record<string, TermEntry>;
