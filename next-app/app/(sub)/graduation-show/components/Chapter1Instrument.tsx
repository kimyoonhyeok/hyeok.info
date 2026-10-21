"use client";

import React, { useState } from "react";
import styles from "./Chapter1Instrument.module.css";
import { RelationalDiagram, type RelationalDiagramProps } from "./Chapter1Diagrams";

interface TermVariantData extends Omit<RelationalDiagramProps, "autoHint" | "compact"> {
  titleEn: string;
  titleKr: string;
  formulaEn: string;
  formulaKr: string;
}

interface TermSpec {
  id: string;
  nameEn: string;
  nameKr: string;
  bookPage: string;
  coordX: number;
  coordY: number;
  boundary: "none" | "ingroup" | "outgroup" | "kinship";
  boundaryLabelEn: string;
  boundaryLabelKr: string;
  distanceLabel: string;
  variants: TermVariantData[];
  logicEn: string;
  logicKr: string;
  approxLabelEn: string;
  approxEn: string;
  approxLabelKr: string;
  approxKr: string;
  definitionEn: string;
  definitionKr: string;
  usageEn: string;
  usageKr: string;
  noteEn?: string[];
  noteKr?: string[];
}

const PRIMARY_TERMS: TermSpec[] = [
  {
    id: "001",
    nameEn: "001. Eoreun",
    nameKr: "001. 어른",
    bookPage: "P. 32–33",
    coordX: 3,
    coordY: 3,
    boundary: "none",
    boundaryLabelEn: "No boundary",
    boundaryLabelKr: "경계 없음",
    distanceLabel: "Distance(X): High · Hierarchy(Y): High",
    variants: [
      {
        titleEn: "Standard (Gender-Neutral)",
        titleKr: "기본형 (성별 무관)",
        speakerGender: "neutral",
        targetGender: "neutral",
        targetX: 3,
        targetY: 3,
        boundary: "none",
        speakerLabel: "Speaker : Gender-Neutral\n화자 : 성별 무관",
        targetLabel: "Target : Gender-Neutral\n청자 : 성별 무관",
        distanceLabel: "Distance(X): High\nHierarchy(Y): High",
        formulaEn: "(Speaker: Any) + (Target: Any) + (Hierarchy: Absolute Senior) + (Power Distance: Maximized) + (Social Domain: Unlimited)",
        formulaKr: "(화자: 무관) + (청자: 무관) + (위계: 절대적 연장자) + (권력 거리: 극대화) + (적용 영역: 무제한)",
      },
    ],
    logicEn: "The power distance variable is maximized, establishing a strong vertical distance between the speaker and the target. Without relying on fictive kinship extension, this term tends to demand vertical deference across all social domains.",
    logicKr: "권력 거리 변수가 극대화되어, 화자와 청자 사이에 강한 수직적 거리감이 발생하는 구조입니다. 가족 호칭을 빌려오는 가상 친족 확장 없이도 사회의 모든 영역에서 수직적 존경을 요구하는 경향이 있습니다.",
    approxLabelEn: "Korean Approximation:",
    approxEn: "adult, elder",
    approxLabelKr: "영문 유사어:",
    approxKr: "adult, elder",
    definitionEn: "This term does not simply refer to a person who has reached legal adulthood. It refers to an elder who commands social respect through accumulated experience and moral integrity. The presence of an eoreun tends to set a different standard of conduct in any given social setting.",
    definitionKr: "단순히 법적으로 성인이 된 사람을 가리키는 것이 아니라, 오랜 경험과 도덕적 품성을 갖추어 사회적 존경을 받아야 하는 연장자를 의미합니다. 이 존재가 있는 자리에서는 행동의 기준이 달라지는 경향이 있습니다.",
    usageEn: "\"Do not cross your legs in the presence of an eoreun.\" In this context, eoreun does not refer to a specific individual, but functions as a behavioral reference point across all social settings.",
    usageKr: "\"어른 앞에서 다리를 꼬지 마라.\" 이 문장에서 '어른'은 특정한 개인이 아니라, 모든 사회적 장면에서 행동 규범의 기준점으로 작용하는 존재입니다.",
  },
  {
    id: "002",
    nameEn: "002. Hyeong / Oppa",
    nameKr: "002. 형 / 오빠",
    bookPage: "P. 34–37",
    coordX: 1,
    coordY: 1,
    boundary: "ingroup",
    boundaryLabelEn: "Kinship: Fictive Extension",
    boundaryLabelKr: "친족 경계: 가상 확장",
    distanceLabel: "Distance(X): Low · Hierarchy(Y): Low",
    variants: [
      {
        titleEn: "Hyeong (M→M)",
        titleKr: "형 (남→남)",
        speakerGender: "male",
        targetGender: "male",
        targetX: 1,
        targetY: 1,
        boundary: "ingroup",
        boundaryLabel: "In-group : 내집단",
        speakerLabel: "Speaker : Male\n화자 : 남성",
        targetLabel: "Target : Male\n청자 : 남성",
        distanceLabel: "Distance(X): Low\nHierarchy(Y): Low",
        formulaEn: "(Speaker: Male) + (Target: Male) + (Hierarchy: Older) + (Social Solidarity: High) + (Kinship Boundary: Fictive Extension)",
        formulaKr: "(화자: 남성) + (청자: 남성) + (위계: 연상) + (사회적 연대: 친밀함) + (친족 경계: 가상 확장)",
      },
      {
        titleEn: "Oppa (F→M)",
        titleKr: "오빠 (여→남)",
        speakerGender: "female",
        targetGender: "male",
        targetX: 1,
        targetY: 1,
        boundary: "ingroup",
        boundaryLabel: "In-group : 내집단",
        speakerLabel: "Speaker : Female\n화자 : 여성",
        targetLabel: "Target : Male\n청자 : 남성",
        distanceLabel: "Distance(X): Low\nHierarchy(Y): Low",
        formulaEn: "(Speaker: Female) + (Target: Male) + (Hierarchy: Older) + (Social Solidarity: High) + (Kinship Boundary: Fictive Extension)",
        formulaKr: "(화자: 여성) + (청자: 남성) + (위계: 연상) + (사회적 연대: 친밀함) + (친족 경계: 가상 확장)",
      },
      {
        titleEn: "Overview",
        titleKr: "통합 구조",
        speakerGender: "neutral",
        targetGender: "neutral",
        targetX: 3,
        targetY: 3,
        boundary: "ingroup",
        boundaryLabel: "In-group : 내집단",
        speakerLabel: "Speaker : Gender-Neutral\n화자 : 성별 무관",
        targetLabel: "Target : Gender-Neutral\n청자 : 성별 무관",
        distanceLabel: "Distance(X): High\nHierarchy(Y): High",
        formulaEn: "(Speaker: Male/Female) + (Target: Male) + (Hierarchy: Older) + (Social Solidarity: High) + (Kinship Boundary: Fictive Extension)",
        formulaKr: "(화자: 남성/여성) + (청자: 남성) + (위계: 연상) + (사회적 연대: 친밀함) + (친족 경계: 가상 확장)",
      },
    ],
    logicEn: "This is the address term in which the mechanism of fictive kinship extension — expanding the boundary of biological family into the public domain — tends to operate most centrally. A clear hierarchy (the target being older than the speaker) exists, while simultaneously expressing a strong sense of social solidarity and closeness.",
    logicKr: "생물학적 가족의 경계를 공적 영역으로 확장하는 가상 친족 확장 메커니즘이 가장 핵심적으로 작동하는 호칭입니다. 뚜렷한 위계(나보다 나이가 많음)가 존재하면서도 동시에 강한 사회적 연대감과 친밀함을 표현하는 경향이 있습니다.",
    approxLabelEn: "Korean Approximation:",
    approxEn: "no direct equivalent",
    approxLabelKr: "영문 유사어:",
    approxKr: "직접적 대응어 없음",
    definitionEn: "Hyeong is used by male speakers to address an older male; oppa is used by female speakers to address an older male. Both terms can be used regardless of actual blood relations.",
    definitionKr: "형은 남성이 자신보다 나이가 많은 남성을 부르는 호칭이고, 오빠는 여성이 자신보다 나이가 많은 남성을 부르는 호칭입니다. 두 호칭 모두 실제 혈연관계와 무관하게 사용될 수 있습니다.",
    usageEn: "A male student who enrolled one year earlier is addressed as hyeong within a university club. A close friend's boyfriend may also be addressed as oppa.",
    usageKr: "대학 동아리에서 1년 먼저 입학한 남학생을 \"형\"이라고 부릅니다. 친한 친구의 남자친구를 \"오빠\"라고 부르는 경우도 있습니다.",
  },
  {
    id: "003",
    nameEn: "003. Nuna / Eonni",
    nameKr: "003. 누나 / 언니",
    bookPage: "P. 38–41",
    coordX: 1,
    coordY: 1.5,
    boundary: "ingroup",
    boundaryLabelEn: "Kinship: Fictive Extension",
    boundaryLabelKr: "친족 경계: 가상 확장",
    distanceLabel: "Distance(X): Low · Hierarchy(Y): Low",
    variants: [
      {
        titleEn: "Nuna (M→F)",
        titleKr: "누나 (남→여)",
        speakerGender: "male",
        targetGender: "female",
        targetX: 1,
        targetY: 1,
        boundary: "none",
        speakerLabel: "Speaker : Male\n화자 : 남성",
        targetLabel: "Target : Female\n청자 : 여성",
        distanceLabel: "Distance(X): Low\nHierarchy(Y): Low",
        formulaEn: "(Speaker: Male) + (Target: Female) + (Hierarchy: Older) + (Social Solidarity: High) + (Kinship Boundary: Fictive Extension)",
        formulaKr: "(화자: 남성) + (청자: 여성) + (위계: 연상) + (사회적 연대: 친밀함) + (친족 경계: 가상 확장)",
      },
      {
        titleEn: "Eonni (F→F)",
        titleKr: "언니 (여→여)",
        speakerGender: "female",
        targetGender: "female",
        targetX: 1,
        targetY: 1,
        boundary: "none",
        speakerLabel: "Speaker : Female\n화자 : 여성",
        targetLabel: "Target : Female\n청자 : 여성",
        distanceLabel: "Distance(X): Low\nHierarchy(Y): Low",
        formulaEn: "(Speaker: Female) + (Target: Female) + (Hierarchy: Older) + (Social Solidarity: High) + (Kinship Boundary: Fictive Extension)",
        formulaKr: "(화자: 여성) + (청자: 여성) + (위계: 연상) + (사회적 연대: 친밀함) + (친족 경계: 가상 확장)",
      },
      {
        titleEn: "Overview",
        titleKr: "통합 구조",
        speakerGender: "neutral",
        targetGender: "neutral",
        targetX: 2,
        targetY: 2,
        boundary: "ingroup",
        boundaryLabel: "In-group : 내집단",
        speakerLabel: "Speaker : Gender-Neutral\n화자 : 성별 무관",
        targetLabel: "Target : Gender-Neutral\n청자 : 성별 무관",
        distanceLabel: "Distance(X): Mid\nHierarchy(Y): Mid",
        formulaEn: "(Speaker: Male/Female) + (Target: Female) + (Hierarchy: Older) + (Social Solidarity: High) + (Kinship Boundary: Fictive Extension)",
        formulaKr: "(화자: 남성/여성) + (청자: 여성) + (위계: 연상) + (사회적 연대: 친밀함) + (친족 경계: 가상 확장)",
      },
    ],
    logicEn: "Structurally identical to the Hyeong/Oppa system, with the target gender variable substituted from male to female. The mechanism of fictive kinship extension — encoding both hierarchy and social solidarity simultaneously — remains the same.",
    logicKr: "형/오빠와 동일한 가상 친족 확장 메커니즘이 작동하며, 청자의 성별 변수만 여성으로 치환된 구조로 해석할 수 있습니다. 위계와 사회적 연대가 동시에 형성되는 방식을 공유합니다.",
    approxLabelEn: "Korean Approximation:",
    approxEn: "no direct equivalent",
    approxLabelKr: "영문 유사어:",
    approxKr: "직접적 대응어 없음",
    definitionEn: "Nuna is used by male speakers to address an older female; eonni is used by female speakers to address an older female. Both terms apply beyond biological kinship and carry a sense of relational warmth alongside hierarchy.",
    definitionKr: "누나는 남성이 자신보다 나이가 많은 여성을 부르는 호칭이고, 언니는 여성이 자신보다 나이가 많은 여성을 부르는 호칭입니다. 두 호칭 모두 실제 혈연관계와 무관하게 사용될 수 있습니다.",
    usageEn: "A female colleague two years senior may be addressed as eonni within the workplace. The term can equally extend to an unfamiliar female vendor encountered in a market.",
    usageKr: "직장에서 2년 먼저 입사한 여성 선배를 \"언니\"라고 부르는 경우가 있습니다. 시장에서 처음 만나는 여성 상인에게도 동일하게 사용될 수 있습니다.",
  },
  {
    id: "004",
    nameEn: "004. Witsaram",
    nameKr: "004. 윗사람",
    bookPage: "P. 42–43",
    coordX: 2,
    coordY: 3,
    boundary: "ingroup",
    boundaryLabelEn: "In-group : Relational",
    boundaryLabelKr: "내집단: 관계적",
    distanceLabel: "Distance(X): Mid · Hierarchy(Y): High",
    variants: [
      {
        titleEn: "Institutional Superior",
        titleKr: "관계적 상위자",
        speakerGender: "neutral",
        targetGender: "neutral",
        targetX: 3,
        targetY: 3,
        boundary: "ingroup",
        boundaryLabel: "In-group : 내집단",
        speakerLabel: "Speaker : Gender-Neutral\n화자 : 성별 무관",
        targetLabel: "Target : Gender-Neutral\n청자 : 성별 무관",
        distanceLabel: "Distance(X): High\nHierarchy(Y): High",
        formulaEn: "(Speaker: Any) + (Target: Any) + (Hierarchy: Absolute Superior) + (Power Distance: Maximized) + (Social Domain: Unlimited) + (In-group: Relational)",
        formulaKr: "(화자: 무관) + (청자: 무관) + (위계: 절대적 상위) + (권력 거리: 극대화) + (적용 영역: 무제한) + (내집단: 관계적)",
      },
    ],
    logicEn: "Like eoreun, this term maximizes the power distance variable without invoking fictive kinship. However, whereas eoreun applies universally to any generational senior, witsaram tends to presuppose an existing relational hierarchy — such as a professional, academic, or familial network — in which the speaker is already positioned as a subordinate.",
    logicKr: "권력 거리 변수가 극대화된다는 점에서 '어른'과 구조를 공유하지만, '어른'이 보편적으로 적용되는 것과 달리 '윗사람'은 화자가 이미 특정 위계 관계망(직장, 학교, 가족 등) 안에 속해 있을 때 작동하는 경향이 있습니다.",
    approxLabelEn: "English Approximation:",
    approxEn: "superior, senior",
    approxLabelKr: "영문 유사어:",
    approxKr: "superior, senior",
    definitionEn: "A person occupying a higher position within any shared social hierarchy — professional, academic, or familial — to whom deference is considered obligatory regardless of context.",
    definitionKr: "직장, 학교, 가족 등 특정 위계 구조 안에서 자신보다 높은 위치에 있는 사람을 가리킵니다. 해당 관계망 안에서는 공적·사적 구분 없이 복종이 전제되는 경향이 있습니다.",
    usageEn: "\"When a witsaram instructs you, you act first.\" The term tends to operate across professional and familial settings alike, without distinction between public and private domains.",
    usageKr: "\"윗사람이 시키면 일단 해.\" 직장·가정 등 영역에 관계없이 적용되는 경향이 있습니다.",
  },
  {
    id: "005",
    nameEn: "005. Seonbae / Hubae",
    nameKr: "005. 선배 / 후배",
    bookPage: "P. 44–45",
    coordX: 2,
    coordY: 2,
    boundary: "ingroup",
    boundaryLabelEn: "In-group : Institutional",
    boundaryLabelKr: "내집단: 제도적·조직적",
    distanceLabel: "Distance(X): Mid · Hierarchy(Y): Mid",
    variants: [
      {
        titleEn: "Cohort Senior / Junior",
        titleKr: "기수제 선후배",
        speakerGender: "neutral",
        targetGender: "neutral",
        targetX: 2,
        targetY: 2,
        boundary: "ingroup",
        boundaryLabel: "In-group : 내집단",
        speakerLabel: "Speaker : Gender-Neutral\n화자 : 성별 무관",
        targetLabel: "Target : Gender-Neutral\n청자 : 성별 무관",
        distanceLabel: "Distance(X): Mid\nHierarchy(Y): Mid",
        formulaEn: "(Speaker: Any) + (Target: Any) + (Hierarchy: Institutional) + (Basis of Hierarchy: Entrance Year) + (In-group Boundary: Institutional)",
        formulaKr: "(화자: 무관) + (청자: 무관) + (위계: 제도적) + (위계 기준: 입학·입사 기수) + (내집단: 제도적·조직적)",
      },
    ],
    logicEn: "This term substitutes biological age with institutional entrance year as the basis for hierarchy. Rather than invoking fictive kinship, it draws the boundary from shared institutional membership — such as a school or workplace — making seniority a structural rather than biological category.",
    logicKr: "나이라는 생물학적 위계 기준 대신 기수(입학·입사 순서)를 위계의 기준으로 삼습니다. 가상 친족 확장 대신 동일 기관이라는 제도적 경계를 기반으로 관계가 설정되는 구조로 해석할 수 있습니다.",
    approxLabelEn: "English Approximation:",
    approxEn: "senior / junior",
    approxLabelKr: "영문 유사어:",
    approxKr: "senior / junior",
    definitionEn: "A relational category denoting those who entered the same institution earlier (seonbae) and those who entered later (hubae), independent of chronological age. It tends to govern conduct and forms of address within shared organizations.",
    definitionKr: "같은 기관 안에서 먼저 들어온 사람(선배)과 나중에 들어온 사람(후배)의 관계를 나타냅니다. 나이와는 독립적으로 작동하는 경향이 있습니다.",
    usageEn: "Even when older in chronological age, a person who enrolled one year later tends to assume the role of hubae and use formal speech toward their seonbae.",
    usageKr: "나이가 더 많더라도 입학 연도가 늦으면 후배가 되며, 선배에게 존댓말을 사용하는 경향이 있습니다.",
  },
  {
    id: "006",
    nameEn: "006. You",
    nameKr: "006. 당신, 너",
    bookPage: "P. 46–47",
    coordX: 2,
    coordY: 0.3,
    boundary: "none",
    boundaryLabelEn: "No boundary",
    boundaryLabelKr: "경계 없음",
    distanceLabel: "Distance(X): N/A · Hierarchy(Y): Zero",
    variants: [
      {
        titleEn: "Universal Pronoun (Symmetrical)",
        titleKr: "보편 대명사 (수평적 대칭)",
        speakerGender: "combined",
        targetGender: "combined",
        targetX: 3,
        targetY: 0,
        boundary: "none",
        speakerLabel: "combined",
        distanceLabel: "Distance(X): N/A\nHierarchy(Y): N/A",
        formulaEn: "(Speaker: Any) + (Target: Any) + (Hierarchy: Neutralized, Zero) + (Relational Symmetry: Symmetrical) + (Address Type: Deictic Pronoun)",
        formulaKr: "(화자: 무관) + (청자: 무관) + (위계: 0, 무력화) + (관계 대칭성: 대칭적) + (지칭 방식: 직시 대명사)",
      },
    ],
    logicEn: "Grounded in Brown & Gilman (1960),⁶ this universal pronoun structurally neutralizes the hierarchy variable, placing both speaker and target on a symmetrical horizontal plane. It does not encode the target's age, status, or relational closeness — only their structural position as the listener in the conversational situation.",
    logicKr: "수직적 위계 변수를 소거하고 화자와 청자를 1:1 대칭 구도로 놓는 보편적 장치로 해석할 수 있습니다.⁶ 이 단어는 실제 사회적 지위를 평등하게 만드는 것이 아니라, 언어 구조 안에서 위계 변수 자체를 비활성화하는 방식으로 작동합니다.",
    approxLabelEn: "Korean Approximation:",
    approxEn: "당신, 너 (no exact structural equivalent)",
    approxLabelKr: "국문 유사어:",
    approxKr: "당신, 너 (직접적 대응어 없음)",
    definitionEn: "A universal second-person pronoun that addresses the listener purely as a conversational participant position, establishing symmetry regardless of age, status, or kinship. It does not encode social hierarchy between speakers.",
    definitionKr: "나이, 지위, 혈연에 관계없이 모든 대화 상대를 대칭적 위치에 놓는 보편적 2인칭 대명사입니다. 상대방의 이름이나 개별 정체성에 대한 사전 정보 없이도 사용할 수 있습니다.",
    usageEn: "Addressing a grandparent or a corporate executive as \"You\" is the default mode in English. This does not indicate disrespect — it reflects a structure that places both parties on a horizontal plane regardless of their actual social relationship.",
    usageKr: "조부모나 기업 임원을 \"You\"라고 부르는 것이 영어의 기본 방식입니다. 이는 실례를 범하는 것이 아니라, 두 화자를 언어 구조상 수평적 위치에 놓는 방식으로 볼 수 있습니다.",
    noteEn: ["⁶ Brown, R., & Gilman, A. (1960). \"The Pronouns of Power and Solidarity,\" Style in Language."],
    noteKr: ["⁶ 브라운, R., & 길먼, A. (1960). 「권력과 연대의 대명사」,「언어 속의 스타일」"],
  },
  {
    id: "007",
    nameEn: "007. First Name",
    nameKr: "007. 이름 부르기",
    bookPage: "P. 48–51",
    coordX: 1,
    coordY: 0.3,
    boundary: "ingroup",
    boundaryLabelEn: "In-group : Required",
    boundaryLabelKr: "내집단: 필요",
    distanceLabel: "Distance(X): Mid · Hierarchy(Y): N/A",
    variants: [
      {
        titleEn: "Proper Noun Index",
        titleKr: "고유명사 인덱스",
        speakerGender: "combined",
        targetGender: "combined",
        targetX: 2,
        targetY: 0,
        boundary: "ingroup",
        boundaryLabel: "In-group : 내집단",
        speakerLabel: "combined",
        distanceLabel: "Distance(X): Mid\nHierarchy(Y): N/A",
        formulaEn: "(Speaker: Any) + (Target: Any) + (Hierarchy: Neutralized, Zero) + (Relational Symmetry: Symmetrical) + (Address Type: Proper Noun Index) + (In-group: Required)",
        formulaKr: "(화자: 무관) + (청자: 무관) + (위계: 0, 무력화) + (관계 대칭성: 대칭적) + (지칭 방식: 고유명사 인덱스) + (내집단: 필요)",
      },
    ],
    logicEn: "Grounded in socio-linguistic indexicality⁷ and cultural individualism,⁸ addressing someone by their given name operates as a proper noun index that directly invokes individual personhood. Unlike \"You,\" which requires no prior information, \"First Name\" presupposes that the speaker already holds the target's name — placing it within an in-group boundary. It can be understood as a symmetrical device that bypasses generational age, institutional rank, and kinship titles to address the individual on a horizontal plane.⁹",
    logicKr: "기호학적 인덱스성 이론⁷ 및 개인주의 문화 지수⁸에 기반한 지칭 방식으로 해석할 수 있습니다. 대화 상황에서 청자의 구조적 위치를 지칭하는 'You'와 달리, 이름 부르기는 상대방의 고유명사를 통해 개별 정체성을 직접 지칭합니다. 사전에 상대의 이름 정보를 가지고 있어야 발화가 가능하다는 점에서 최소한의 내집단 경계가 전제되며, 직급이나 나이를 넘어 개별 주체를 수평적으로 지칭하는 대칭적 언어 장치로 볼 수 있습니다.⁹",
    approxLabelEn: "Korean Approximation:",
    approxEn: "이름 부르기 (no direct structural equivalent)",
    approxLabelKr: "국문 유사어:",
    approxKr: "이름 부르기 (직접적 대응어 없음)",
    definitionEn: "The convention of addressing an individual by their given name across social domains, placing individual identity over institutional rank, generational age, or kinship titles.",
    definitionKr: "조직 내 직급, 세대적 나이, 친족 호칭보다 개인의 정체성을 우선하여 고유명사(이름)로 상대를 지칭하는 방식입니다.",
    usageEn: "Friends, family members, colleagues, and even organizational seniors tend to be addressed by given names. In contrast, using a given name to address an older person or senior is generally not accepted in Korean across public and private domains alike.",
    usageKr: "친구, 가족, 동료, 나아가 직장 상사에게도 이름으로 부르는 것이 일반적입니다. 반면 한국어에서는 공적·사적 영역 모두에서 손위 연장자에게 이름을 직접 사용하는 것이 받아들여지지 않는 경향이 있습니다.",
    noteEn: [
      "⁷ Agha, A. (2007). Language and Social Relations, Cambridge University Press.",
      "⁸ Hofstede, G. (2001). Culture's Consequences: Comparing Values, Behaviors, Institutions and Organizations Across Nations, Sage Publications.",
      "⁹ Brown, R., & Gilman, A. (1960). \"The Pronouns of Power and Solidarity,\" Style in Language.",
    ],
    noteKr: [
      "⁷ 아가, A. (2007).「언어와 사회적 관계」, 케임브리지 대학교 출판부.",
      "⁸ 홉스테드, G. (2001).「문화의 결과: 가치, 행동, 제도 및 조직의 비교」, 세이지 출판사.",
      "⁹ 브라운, R., & 길먼, A. (1960). 「권력과 연대의 대명사」,「언어 속의 스타일」",
    ],
  },
  {
    id: "008",
    nameEn: "008. Brother / Sister",
    nameKr: "008. 친형제 / 친자매",
    bookPage: "P. 52–57",
    coordX: 0.5,
    coordY: 0.5,
    boundary: "kinship",
    boundaryLabelEn: "Kinship Boundary : Closed",
    boundaryLabelKr: "친족 경계 : 닫힘",
    distanceLabel: "Distance(X): Low · Hierarchy(Y): Mid",
    variants: [
      {
        titleEn: "Overview",
        titleKr: "기본형",
        speakerGender: "neutral",
        targetGender: "neutral",
        targetX: 1,
        targetY: 2,
        boundary: "kinship",
        boundaryLabel: "Kinship Boundary : Closed / 친족경계 : 닫힘",
        speakerLabel: "Speaker : Gender-Neutral\n화자 : 성별 무관",
        targetLabel: "Target : Gender-Neutral\n청자 : 성별 무관",
        distanceLabel: "Distance(X): Low\nHierarchy(Y): Mid",
        formulaEn: "(Speaker: Any) + (Target: Gendered) + (Hierarchy: Neutralized) + (Social Solidarity: Biological Kinship) + (Kinship Boundary: Closed)",
        formulaKr: "(화자: 무관) + (청자: 성별 구분) + (위계: 무력화, 나이 미구분) + (사회적 연대: 생물학적 결속) + (친족 경계: 닫힘)",
      },
      {
        titleEn: "F→F",
        titleKr: "여→여",
        speakerGender: "female",
        targetGender: "female",
        targetX: 1,
        targetY: 2,
        boundary: "kinship",
        boundaryLabel: "Kinship Boundary : Closed / 친족경계 : 닫힘",
        speakerLabel: "Speaker : Female\n화자 : 여성",
        targetLabel: "Target : Female\n청자 : 여성",
        distanceLabel: "Distance(X): Low\nHierarchy(Y): Mid",
        formulaEn: "(Speaker: Female) + (Target: Female) + (Hierarchy: Neutralized) + (Social Solidarity: Biological Kinship) + (Kinship Boundary: Closed)",
        formulaKr: "(화자: 여성) + (청자: 여성) + (위계: 무력화, 나이 미구분) + (사회적 연대: 생물학적 결속) + (친족 경계: 닫힘)",
      },
      {
        titleEn: "M→M",
        titleKr: "남→남",
        speakerGender: "male",
        targetGender: "male",
        targetX: 1,
        targetY: 2,
        boundary: "kinship",
        boundaryLabel: "Kinship Boundary : Closed / 친족경계 : 닫힘",
        speakerLabel: "Speaker : Male\n화자 : 남성",
        targetLabel: "Target : Male\n청자 : 남성",
        distanceLabel: "Distance(X): Low\nHierarchy(Y): Mid",
        formulaEn: "(Speaker: Male) + (Target: Male) + (Hierarchy: Neutralized) + (Social Solidarity: Biological Kinship) + (Kinship Boundary: Closed)",
        formulaKr: "(화자: 남성) + (청자: 남성) + (위계: 무력화, 나이 미구분) + (사회적 연대: 생물학적 결속) + (친족 경계: 닫힘)",
      },
      {
        titleEn: "F→M",
        titleKr: "여→남",
        speakerGender: "female",
        targetGender: "male",
        targetX: 1,
        targetY: 2,
        boundary: "kinship",
        boundaryLabel: "Kinship Boundary : Closed / 친족경계 : 닫힘",
        speakerLabel: "Speaker : Female\n화자 : 여성",
        targetLabel: "Target : Male\n청자 : 남성",
        distanceLabel: "Distance(X): Low\nHierarchy(Y): Mid",
        formulaEn: "(Speaker: Female) + (Target: Male) + (Hierarchy: Neutralized) + (Social Solidarity: Biological Kinship) + (Kinship Boundary: Closed)",
        formulaKr: "(화자: 여성) + (청자: 남성) + (위계: 무력화, 나이 미구분) + (사회적 연대: 생물학적 결속) + (친족 경계: 닫힘)",
      },
    ],
    logicEn: "This term denotes a strong biological bond without encoding relative age within the sibling hierarchy. Unlike the Korean terms hyeong or nuna, these English terms do not extend fictively to non-relatives in standard public settings — maintaining a closed categorical boundary.",
    logicKr: "강한 생물학적 연대를 나타내지만 나이에 따른 위계의 차이를 언어적으로 반영하지는 않습니다. 한국어의 형·누나·오빠·언니와 달리, 비혈연 타인에게 경계가 확장되지 않는 닫힌 구조로 해석할 수 있습니다.",
    approxLabelEn: "Korean Approximation:",
    approxEn: "친형제, 친자매",
    approxLabelKr: "국문 유사어:",
    approxKr: "친형제, 친자매",
    definitionEn: "Terms strictly bound to biological or legal family relations. They are closed categories that do not extend to non-relatives in public settings, and they not specify the relative age or seniority of siblings.",
    definitionKr: "생물학적·법적 혈연 관계에만 적용되는 호칭입니다. 형제 사이의 상대적인 나이 서열을 단어 자체에 포함하지 않으며, 공적 영역의 비혈연 타인에게 확장되지 않습니다.",
    usageEn: "Unlike the Korean terms hyeong or nuna, an older male colleague is not addressed as \"brother\" in standard professional settings.",
    usageKr: "한국어의 \"형\"이나 \"누나\"와 달리, 직장 환경에서 연상의 남성 동료를 \"brother\"라고 부르지 않습니다.",
  },
  {
    id: "009",
    nameEn: "009. Mr. / Ms.",
    nameKr: "009. ~씨, 선생님",
    bookPage: "P. 58–59",
    coordX: 2.5,
    coordY: 1.2,
    boundary: "outgroup",
    boundaryLabelEn: "Out-group",
    boundaryLabelKr: "외집단",
    distanceLabel: "Distance(X): High · Hierarchy(Y): N/A",
    variants: [
      {
        titleEn: "Formal Flat Padding",
        titleKr: "평면적 격식 완충재",
        speakerGender: "combined",
        targetGender: "neutral",
        targetX: 3,
        targetY: 0,
        boundary: "outgroup",
        boundaryLabel: "Out-group : 외집단",
        speakerLabel: "combined",
        distanceLabel: "Distance(X): High\nHierarchy(Y): N/A",
        formulaEn: "(Speaker: Any) + (Target: Gendered, English / Gender-Neutral, Korean) + (Hierarchy: Neutral) + (Formality: Flat Padding) + (Relational Permanence: Situational) + (Name Required: Surname/Given Name) + (In-group: Out-group)",
        formulaKr: "(화자: 무관) + (청자: 성별 구분, 영문 / 성별 무관, 국문) + (위계: 중립) + (격식성: 평면적 완충재) + (관계 지속성: 상황적) + (이름 보유성: 필수) + (내집단: 외집단)",
      },
    ],
    logicEn: "Functionally similar to Korean public honorifics such as ~ssi or seonsaengnim in serving as a flat layer of formal respect. However, English mandates target gender encoding (Mr. vs. Ms.), whereas Korean equivalents neutralize gender entirely.",
    logicKr: "한국어의 공적 존칭(~씨, 선생님)과 평면적 완충재로서의 기능을 공유하는 구조로 해석할 수 있습니다. 단, 영어는 청자의 성별 변수(Mr. vs. Ms.)를 필수로 구분하는 반면, 한국어 대응어는 성별 변수를 소거하는 점에서 차이가 있습니다.",
    approxLabelEn: "Korean Approximation:",
    approxEn: "~씨, 선생님 (functional equivalent; Korean terms are gender-neutral)",
    approxLabelKr: "국문 유사어:",
    approxKr: "~씨, 선생님 (기능적 유사어)",
    definitionEn: "Public honorifics that signal basic social respect without carrying information about the interpersonal intimacy, hierarchy, or solidarity between the speakers.",
    definitionKr: "화자 간의 친밀도, 위계, 연대감에 대한 정보 없이 기본적인 사회적 존중을 나타내는 공적 존칭입니다.",
    usageEn: "Used equally for a 20-year-old client and a 60-year-old neighbor, tending to function as a flat formal layer rather than a relational marker.",
    usageKr: "20대 고객과 60대 이웃 모두에게 동일하게 사용되며, 관계적 좌표라기보다 평면적인 형식적 완충재로 작용하는 경향이 있습니다.",
  },
  {
    id: "010",
    nameEn: "010. Sir / Ma'am",
    nameKr: "010. 선생님 / 사장님",
    bookPage: "P. 60–63",
    coordX: 3,
    coordY: 1.5,
    boundary: "outgroup",
    boundaryLabelEn: "Out-group : Anonymous",
    boundaryLabelKr: "외집단: 익명",
    distanceLabel: "Distance(X): High · Hierarchy(Y): Mid",
    variants: [
      {
        titleEn: "Korean (Gender-Neutral)",
        titleKr: "국문 (성별 무관)",
        speakerGender: "neutral",
        targetGender: "neutral",
        targetX: 2.5,
        targetY: 1.5,
        boundary: "outgroup",
        boundaryLabel: "Out-group : 외집단",
        speakerLabel: "Speaker : Gender-Neutral\n화자 : 성별 무관",
        targetLabel: "Target : Gender-Neutral\n청자 : 성별 무관",
        distanceLabel: "Distance(X): High\nHierarchy(Y): Mid",
        formulaEn: "(Speaker: Gender-Neutral) + (Target: Gender-Neutral) + (Hierarchy: Mid) + (Social Distance: High) + (Relational Boundary: Out-group)",
        formulaKr: "(화자: 성별 무관) + (청자: 성별 무관) + (위계: 중간) + (사회적 거리: 높음) + (관계 경계: 외집단)",
      },
      {
        titleEn: "English (Sir / Ma'am)",
        titleKr: "영문 (성별 구분)",
        speakerGender: "neutral",
        targetGender: "male",
        targetX: 2.1,
        targetY: 1.5,
        target2Gender: "female",
        target2X: 2.9,
        target2Y: 1.5,
        target2Label: "Target : Female\n청자: 여성",
        boundary: "outgroup",
        boundaryLabel: "Out-group : 외집단",
        speakerLabel: "Speaker : Gender-Neutral\n화자 : 성별 무관",
        targetLabel: "Target : Male\n청자: 남성",
        distanceLabel: "Distance(X): High\nHierarchy(Y): Mid",
        formulaEn: "(Speaker: Any) + (Target: Gendered, English / Gender-Neutral, Korean) + (Hierarchy: Situational Respect) + (Relational Permanence: Transactional) + (Name Required: None, Anonymous Target) + (In-group: Out-group, Anonymous)",
        formulaKr: "(화자: 무관) + (청자: 성별 구분, 영문 / 성별 무관, 국문) + (위계: 상황적 존중) + (관계 지속성: 일회성·거래적) + (이름 보유성: 없음, 익명 청자) + (내집단: 외집단, 익명)",
      },
    ],
    logicEn: "A generic honorific used in face-to-face transactional or service-oriented contexts, where the hierarchy of the target is acknowledged but the relational bond remains impersonal. Unlike Mr./Ms., neither the English nor Korean variants require strict gender encoding in everyday usage.",
    logicKr: "대면적 거래 또는 서비스 맥락에서 청자의 위계를 인정하면서도 비개인적 관계 내에서 사용하는 일반적 존칭입니다. Mr./Ms.와 달리 성별 변수를 언어에 강제적으로 부호화하지 않는 구조적 특징을 공유합니다.",
    approxLabelEn: "Korean Approximation:",
    approxEn: "선생님, 사장님 (context-dependent titles)",
    approxLabelKr: "국문 유사어:",
    approxKr: "선생님, 사장님 (맥락 의존적 호칭)",
    definitionEn: "Informal honorifics used in public out-group contexts to signal basic deference without encoding personal intimacy or sustained relational commitment.",
    definitionKr: "지속적 관계 결속이나 개인적 친밀도를 부호화하지 않으면서, 공적 외집단 맥락에서 기본적 경의를 표시하는 비공식 존칭입니다.",
    usageEn: "A customer addressing a shop owner as 사장님 in Korean, or a subordinate addressing a senior colleague as Sir in formal English settings.",
    usageKr: "한국어에서 상점 주인을 \"사장님\"이라고 부르거나, 영어의 공식적 맥락에서 상급자를 \"Sir\"로 호칭하는 경우에 해당합니다.",
  },
];

// All 10 coordinate points matching the book quadrants.
// Positions are flexibly adjusted inside their quadrant (see footnote 5) so that
// labels do not collide inside the shared plot box; `label` sets the label side.
type LabelSide = "below" | "above" | "right";
const MATRIX_POINTS: { id: string; nameKr: string; nameEn: string; x: number; y: number; color: string; label: LabelSide }[] = [
  { id: "001", nameKr: "어른", nameEn: "Eoreun", x: 3, y: 3, color: "#ff5500", label: "below" },
  { id: "002", nameKr: "형/오빠", nameEn: "Hyeong/Oppa", x: 1, y: 1.0, color: "#4a3b8c", label: "right" },
  { id: "003", nameKr: "누나/언니", nameEn: "Nuna/Eonni", x: 0.85, y: 1.5, color: "#998833", label: "above" },
  { id: "004", nameKr: "윗사람", nameEn: "Witsaram", x: 2, y: 3, color: "#ff5500", label: "below" },
  { id: "005", nameKr: "선후배", nameEn: "Seonhuba", x: 2, y: 2, color: "#ff5500", label: "below" },
  { id: "006", nameKr: "당신/너", nameEn: "Dangsin/Neo", x: 2.35, y: 0.6, color: "#ff5500", label: "right" },
  { id: "007", nameKr: "이름 부르기", nameEn: "First Name", x: 1.62, y: 0.6, color: "#ff5500", label: "below" },
  { id: "008", nameKr: "친형제/자매", nameEn: "Siblings", x: 0.56, y: 0.6, color: "#4a3b8c", label: "below" },
  { id: "009", nameKr: "~씨/선생님", nameEn: "-ssi / Teacher", x: 2.6, y: 1.3, color: "#ff5500", label: "right" },
  { id: "010", nameKr: "손님/선생님", nameEn: "Customer", x: 3, y: 1.65, color: "#ff5500", label: "right" },
];

// Shared plot geometry — identical to RelationalDiagram (Chapter1Diagrams.tsx):
// leftPad 130, topPad 90, axisLen 540 inside an 890-wide viewBox. The right diagram's
// 890×850 viewBox is vertically centred in a square frame (+20 units), so a square
// 890×890 box with origin (130, 650) yields the same on-screen plot box size/position.
const PLOT_VB = 890;
const PLOT_LEFT = 130;
const PLOT_AXIS = 540;
const PLOT_UNIT = PLOT_AXIS / 3;
const PLOT_ORIGIN_Y = 650;
const PLOT_TOP = PLOT_ORIGIN_Y - PLOT_AXIS;

function formatGenderName(g: string, l: "en" | "kr"): string {
  if (l === "kr") {
    if (g === "male") return "남성";
    if (g === "female") return "여성";
    return "성별 무관";
  }
  if (g === "male") return "Male";
  if (g === "female") return "Female";
  return "Gender-Neutral";
}

function formatDistanceLabel(label: string | undefined, l: "en" | "kr"): string {
  if (!label) return "";
  const parts = label.split(/[\n·]/).map((p) => p.trim()).filter(Boolean);
  const normalized = parts.join(" / ");
  if (l === "kr") {
    return normalized
      .replace(/Distance\(X\)/g, "거리(X)")
      .replace(/Hierarchy\(Y\)/g, "위계(Y)")
      .replace(/High/g, "높음")
      .replace(/Mid/g, "중간")
      .replace(/Low/g, "낮음")
      .replace(/Zero/g, "동등")
      .replace(/N\/A/g, "해당 없음");
  }
  return normalized;
}

export default function Chapter1Instrument({ lang = "en" }: { lang?: "en" | "kr" }) {
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [hoveredTermId, setHoveredTermId] = useState<string | null>(null);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  const activeTermId = hoveredTermId || selectedTermId;
  const activeTerm = activeTermId ? PRIMARY_TERMS.find((t) => t.id === activeTermId) || null : null;
  const activeVariant = activeTerm ? (activeTerm.variants[activeVariantIndex] || activeTerm.variants[0]) : null;

  const handleNodeClick = (termId: string) => {
    if (selectedTermId === termId) {
      setSelectedTermId(null);
    } else {
      setSelectedTermId(termId);
    }
    setHoveredTermId(null);
    setActiveVariantIndex(0);
  };

  const handleNodeHover = (termId: string) => {
    setHoveredTermId(termId);
    setActiveVariantIndex(0);
  };

  const handleNodeLeave = () => {
    setHoveredTermId(null);
  };

  const handleCloseInspector = () => {
    setSelectedTermId(null);
    setHoveredTermId(null);
  };

  return (
    <div className={styles.instrumentWrapper}>
      {/* ── Main Stage: Stable 2-Column Grid (Zero layout shift on hover) ─ */}
      <div className={styles.mainStage}>
        {/* Left Column: 2D Relational Matrix Field (Main View) */}
        <div className={styles.matrixCol}>
          <div className={styles.matrixHeader}>
            <span className={styles.matrixCaption}>
              {lang === "en" ? "Fig 1. Relational Matrix Field" : "그림 1. 관계 매트릭스 필드"}
            </span>
          </div>

          <div className={styles.matrixCanvasWrapper}>
            <div
              className={styles.axisLabelY}
              style={{
                left: `${(PLOT_LEFT / PLOT_VB) * 100}%`,
                top: `${(PLOT_TOP / PLOT_VB) * 100}%`,
              }}
            >
              {lang === "en" ? "Y: Hierarchy ↑" : "Y: 위계 ↑"}
            </div>
            <div
              className={styles.axisLabelX}
              style={{
                right: `${100 - ((PLOT_LEFT + PLOT_AXIS) / PLOT_VB) * 100}%`,
                top: `${(PLOT_ORIGIN_Y / PLOT_VB) * 100}%`,
              }}
            >
              {lang === "en" ? "X: Distance →" : "X: 사회적 거리 →"}
            </div>

            <svg className={styles.gridLinesSvg} viewBox={`0 0 ${PLOT_VB} ${PLOT_VB}`}>
              {/* 3x3 Dashed grid (same stroke spec as RelationalDiagram) */}
              {[1, 2, 3].map((i) => (
                <line
                  key={`h${i}`}
                  x1={PLOT_LEFT}
                  y1={PLOT_ORIGIN_Y - i * PLOT_UNIT}
                  x2={PLOT_LEFT + PLOT_AXIS}
                  y2={PLOT_ORIGIN_Y - i * PLOT_UNIT}
                  stroke="#c8c8c8"
                  strokeDasharray="8,8"
                  strokeWidth="1"
                />
              ))}
              {[1, 2, 3].map((i) => (
                <line
                  key={`v${i}`}
                  x1={PLOT_LEFT + i * PLOT_UNIT}
                  y1={PLOT_ORIGIN_Y}
                  x2={PLOT_LEFT + i * PLOT_UNIT}
                  y2={PLOT_TOP}
                  stroke="#c8c8c8"
                  strokeDasharray="8,8"
                  strokeWidth="1"
                />
              ))}

              {/* Axes lines */}
              <line x1={PLOT_LEFT} y1={PLOT_ORIGIN_Y} x2={PLOT_LEFT + PLOT_AXIS} y2={PLOT_ORIGIN_Y} stroke="#aaa" strokeWidth="1.5" />
              <line x1={PLOT_LEFT} y1={PLOT_ORIGIN_Y} x2={PLOT_LEFT} y2={PLOT_TOP} stroke="#aaa" strokeWidth="1.5" />
            </svg>

            {/* Render Matrix Nodes */}
            {MATRIX_POINTS.map((pt) => {
              const isActive = pt.id === activeTermId;
              const isSelected = pt.id === selectedTermId;
              const leftPercent = ((PLOT_LEFT + pt.x * PLOT_UNIT) / PLOT_VB) * 100;
              const topPercent = ((PLOT_ORIGIN_Y - pt.y * PLOT_UNIT) / PLOT_VB) * 100;
              const labelSideClass =
                pt.label === "above" ? styles.nodeLabelAbove : pt.label === "right" ? styles.nodeLabelRight : "";

              return (
                <div
                  key={pt.id}
                  className={`${styles.nodeItem} ${isActive ? styles.activeNode : ""}`}
                  style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                  onMouseEnter={() => handleNodeHover(pt.id)}
                  onMouseLeave={handleNodeLeave}
                  onClick={() => handleNodeClick(pt.id)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                >
                  <div className={styles.nodeCircle} style={{ borderColor: pt.color }}>
                    <div className={styles.nodeDot} style={{ backgroundColor: pt.color }} />
                  </div>
                  <span className={`${styles.nodeLabel} ${labelSideClass}`}>
                    {lang === "en" ? pt.nameEn : pt.nameKr}
                  </span>
                </div>
              );
            })}
          </div>

          {activeTerm && activeVariant && (
            <div className={styles.coordBar}>
              <div>Coord: X={activeVariant.targetX.toFixed(1)} / Y={activeVariant.targetY.toFixed(1)}</div>
              <div>Level: {formatDistanceLabel(activeTerm.distanceLabel, lang)}</div>
              <div>Boundary: {lang === "en" ? activeTerm.boundaryLabelEn : activeTerm.boundaryLabelKr}</div>
            </div>
          )}

          <div className={styles.legendBar}>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ borderColor: "#ff5500", backgroundColor: "#fff" }} />
              <span>{lang === "en" ? "Gender-Neutral" : "성별 무관"}</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ borderColor: "#4a3b8c", backgroundColor: "#fff" }} />
              <span>{lang === "en" ? "Male" : "남성"}</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ borderColor: "#998833", backgroundColor: "#fff" }} />
              <span>{lang === "en" ? "Female" : "여성"}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Always occupies its grid slot; visible only when active */}
        <div className={`${styles.termCol} ${activeTerm && activeVariant ? styles.termColActive : styles.termColHidden}`}>
          {activeTerm && activeVariant ? (
            <>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderTopRow}>
                  <div className={styles.termTitleBlock}>
                    <h4 className={styles.termMainTitle}>
                      {lang === "en" ? activeTerm.nameEn : activeTerm.nameKr}
                    </h4>
                  </div>
                  <div className={styles.cardHeaderRight}>
                    <span className={styles.bookRefBadge}>
                      Ref: Book {activeTerm.bookPage}
                    </span>
                    {selectedTermId && (
                      <button
                        type="button"
                        onClick={handleCloseInspector}
                        className={styles.closeBtn}
                        aria-label="Close inspector"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
                {activeTerm.variants.length > 1 && (
                  <div className={styles.variantToggleRow}>
                    {activeTerm.variants.map((v, vIdx) => (
                      <button
                        key={vIdx}
                        type="button"
                        className={`${styles.variantBtn} ${vIdx === activeVariantIndex ? styles.variantBtnActive : ""}`}
                        onClick={() => setActiveVariantIndex(vIdx)}
                      >
                        {lang === "en" ? v.titleEn : v.titleKr}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Center: Vector Diagram */}
              <div className={styles.diagramFrame}>
                <div
                  className={styles.axisLabelY}
                  style={{
                    left: `${(PLOT_LEFT / PLOT_VB) * 100}%`,
                    top: `${(PLOT_TOP / PLOT_VB) * 100}%`,
                  }}
                >
                  {lang === "en" ? "Y: Hierarchy ↑" : "Y: 위계 ↑"}
                </div>
                <div
                  className={styles.axisLabelX}
                  style={{
                    right: `${100 - ((PLOT_LEFT + PLOT_AXIS) / PLOT_VB) * 100}%`,
                    top: `${(PLOT_ORIGIN_Y / PLOT_VB) * 100}%`,
                  }}
                >
                  {lang === "en" ? "X: Distance →" : "X: 사회적 거리 →"}
                </div>
                <RelationalDiagram
                  lang={lang}
                  speakerGender={activeVariant.speakerGender}
                  targetGender={activeVariant.targetGender}
                  targetX={activeVariant.targetX}
                  targetY={activeVariant.targetY}
                  target2Gender={activeVariant.target2Gender}
                  target2X={activeVariant.target2X}
                  target2Y={activeVariant.target2Y}
                  target2Label={
                    activeVariant.target2Label
                      ? (lang === "en"
                          ? `Target : ${formatGenderName(activeVariant.target2Gender || "female", "en")}`
                          : `청자 : ${formatGenderName(activeVariant.target2Gender || "female", "kr")}`)
                      : undefined
                  }
                  boundary={activeVariant.boundary}
                  speakerLabel={
                    activeVariant.speakerLabel === "combined"
                      ? "combined"
                      : (lang === "en"
                          ? `Speaker :\n${formatGenderName(activeVariant.speakerGender, "en")}`
                          : `화자 :\n${formatGenderName(activeVariant.speakerGender, "kr")}`)
                  }
                  targetLabel={
                    activeVariant.speakerLabel === "combined"
                      ? undefined
                      : (lang === "en"
                          ? `Target : ${formatGenderName(activeVariant.targetGender, "en")}`
                          : `청자 : ${formatGenderName(activeVariant.targetGender, "kr")}`)
                  }
                  boundaryLabel={
                    activeVariant.boundary !== "none"
                      ? (lang === "en" ? activeTerm.boundaryLabelEn : activeTerm.boundaryLabelKr)
                      : undefined
                  }
                  autoHint={false}
                />
              </div>

              {/* Below Diagram: XY Level notation outside graph */}
              <div className={styles.diagramLevelRow}>
                {formatDistanceLabel(activeVariant.distanceLabel, lang)}
              </div>

              {/* Below Diagram: Formula, Logic, Approximation, Definition, Usage, Notes */}
              <div className={styles.specDetails}>
                <div className={styles.specFormula}>
                  <span className={styles.formulaMath}>
                    {lang === "en" ? activeVariant.formulaEn : activeVariant.formulaKr}
                  </span>
                </div>

                <div className={styles.specTexts}>
                  <p className={lang === "en" ? styles.specEn : styles.specKr}>
                    <strong>{lang === "en" ? "Logic:" : "특징:"}</strong>{" "}
                    {lang === "en" ? activeTerm.logicEn : activeTerm.logicKr}
                  </p>
                </div>

                <div className={styles.specTexts}>
                  <p className={lang === "en" ? styles.specEn : styles.specKr}>
                    <strong>{lang === "en" ? activeTerm.approxLabelEn : activeTerm.approxLabelKr}</strong>{" "}
                    {lang === "en" ? activeTerm.approxEn : activeTerm.approxKr}
                  </p>
                </div>

                <div className={styles.specTexts}>
                  <p className={lang === "en" ? styles.specEn : styles.specKr}>
                    <strong>{lang === "en" ? "Definition:" : "정의:"}</strong>{" "}
                    {lang === "en" ? activeTerm.definitionEn : activeTerm.definitionKr}
                  </p>
                </div>

                <div className={styles.specTexts}>
                  <p className={lang === "en" ? styles.specEn : styles.specKr}>
                    <strong>{lang === "en" ? "Contextual Usage:" : "상황적 용례:"}</strong>{" "}
                    {lang === "en" ? activeTerm.usageEn : activeTerm.usageKr}
                  </p>
                </div>

                {((lang === "en" && activeTerm.noteEn && activeTerm.noteEn.length > 0) ||
                  (lang === "kr" && activeTerm.noteKr && activeTerm.noteKr.length > 0)) && (
                  <div className={styles.specTexts}>
                    {(lang === "en" ? activeTerm.noteEn! : activeTerm.noteKr!).map((noteLine, nIdx) => (
                      <p key={nIdx} className={lang === "en" ? styles.specEn : styles.specKr}>
                        {noteLine}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
