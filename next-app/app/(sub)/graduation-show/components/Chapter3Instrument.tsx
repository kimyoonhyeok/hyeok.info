"use client";

import React, { useState, useEffect } from "react";
import styles from "./Chapter3Instrument.module.css";

type ConceptKey =
  | "nunchi"
  | "biwi"
  | "chaemyeon"
  | "yeomchi"
  | "dori"
  | "ojilap"
  | "assertive"
  | "tact"
  | "nosy"
  | "entitled"
  | "nangman"
  | "ulkeok"
  | "jeong"
  | "han"
  | "seopseophada";

interface PhaseSpec {
  phaseId: number;
  labelEn: string;
  labelKr: string;
  descEn: string;
  descKr: string;
}

interface ConceptData {
  key: ConceptKey;
  num: string;
  nameKr: string;
  nameEn: string;
  bookPageSpan: string;
  geometryKey: string;
  phases: PhaseSpec[];
  enText: string;
  krText: string;
  definitionEn: string;
  definitionKr: string;
  svgUrls?: string[];
  bgColors?: string[];
}

const CHAPTER3_CONCEPTS: ConceptData[] = [
  {
    key: "nunchi",
    num: "01",
    nameKr: "눈치",
    nameEn: "Nunchi",
    bookPageSpan: "P. 111–116",
    geometryKey: "정원(Circle: 독립 주체) + 사각형(Square: 상황적 공간) → 시각적 동조(Assimilation)",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1: Individual Node",
        labelKr: "Fig 1: 독립 주체",
        descEn: "The circular geometric node represents an independent individual embedded within a given social interaction.",
        descKr: "다이어그램 내의 정원(Circle) 형태는 주어진 사회적 상호작용 속에 위치한 독립된 개별 주체를 의미합니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2: Situational Domain",
        labelKr: "Fig 2: 상황적 공간",
        descEn: "The square background defines a bounded situational space or specific relational environment in which interaction occurs.",
        descKr: "사각형의 배경 평면은 상호작용이 이뤄지는 제한된 특정 상황이나 관계적 공간의 경계를 정의합니다.",
      },
      {
        phaseId: 3,
        labelEn: "Fig 1+2: Relational Boundary",
        labelKr: "Fig 1+2: 인지적 경계 유지",
        descEn: "The combination of a circular node positioned inside a square plane symbolizes an individual embedded within a specific situational context.",
        descKr: "사각형(상황적 공간) 내부 중심에 위치한 정원(개인)의 결합은 특정 사회적 맥락이나 환경 속에 고정된 주체를 의미합니다.",
      },
      {
        phaseId: 4,
        labelEn: "Fig 3: Atmospheric Assimilation",
        labelKr: "Fig 3: 분위기 동조 (눈치)",
        descEn: "The overlapping and subtle tonal transitions between geometric elements map the active process of reading and aligning with the surrounding atmosphere.",
        descKr: "기하학적 요소 간의 중첩과 톤 변화는 주변 분위기를 능동적으로 읽어내고 그에 맞춰 자신을 정렬하는 맥락 해독 과정을 도식화합니다.",
      },
    ],
    enText:
      "In cross-cultural pragmatics, managing unstated situational atmosphere and social face is configured with differing cultural weights. Rather than remaining an isolated evaluative trait, 'nunchi' expands into an active relational grammar that systematically coordinates interpersonal boundaries.",
    krText:
      "한국어권에서는 맥락 해독의 인지적 부담이 청자에게 더 크게 배분되어, 분위기 감지('눈치')가 상호작용 속에서 준수해야 할 규범적 분별(Discernment)의 의무로 제도화되어 왔습니다.",
    definitionEn:
      "Nunchi: The subtle capacity or tact to evaluate others' unstated feelings, intentions, and atmospheric cues through immediate context.",
    definitionKr:
      "눈치 (Nunchi): 남의 마음이나 무언의 분위기를 그때그때 상황적 맥락으로 미루어 알아내는 낌새, 또는 그러한 감각적 능력.",
  },
  {
    key: "biwi",
    num: "02",
    nameKr: "비위",
    nameEn: "Biwi",
    bookPageSpan: "P. 117–120",
    geometryKey: "크기가 다른 두 정원(Self & Other) + 사각형(조직적 상황) → 방향성 동조(Directional Alignment)",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1: Hierarchical Context",
        labelKr: "Fig 1: 직급·조직적 상황",
        descEn: "Circles of different sizes represent 'self' and 'other', while the square plane defines a hierarchical organizational context.",
        descKr: "크기가 다른 두 정원(Circle)은 '나'와 '상대방'을 각각 상징하며, 사각형 평면은 상급자가 존재하는 직급·조직적 상황을 정의합니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2: Directional Synchronization",
        labelKr: "Fig 2: 상급자에 대한 능동적 동조",
        descEn: "The directional alignment of the forms visualizes the act of subordinating one's personal values to synchronize with a superior's stance.",
        descKr: "도형의 기하학적 궤적과 방향성은 자신의 개인적 선호와 별개로 상급자의 생각이나 상황에 능동적으로 동조하는 상태를 시각화합니다.",
      },
    ],
    enText:
      "In hierarchical organizational settings, 'biwi' operates as an active alignment mechanism where an individual calibrates their outward expression to match a superior's mood or stance.",
    krText:
      "수직적 위계가 작동하는 조직 맥락에서 '비위'는 개인의 내적 선호보다 상급자의 기분이나 입장에 맞춰 방향성을 일치시키는 관계적 조율 기제로 작동합니다.",
    definitionEn:
      "Biwi: The accommodating disposition or behavioral tendency to align with another's mood, feelings, or situational preferences.",
    definitionKr:
      "비위 (Biwi): 다른 사람의 기분이나 마음을 맞춰주고 상황적으로 호응하는 태도나 행동적 성향.",
    svgUrls: ["/ch3_svgs/artboard_19.svg", "/ch3_svgs/artboard_20.svg"],
    bgColors: ["#867229", "#867229"],
  },
  {
    key: "chaemyeon",
    num: "03",
    nameKr: "체면",
    nameEn: "Chaemyeon",
    bookPageSpan: "P. 121–124",
    geometryKey: "파편화된 원(Scattered Nodes) → 보호막 외곽 링(Protective Boundary)",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1: Autonomous Individuals",
        labelKr: "Fig 1: 파편화된 주체",
        descEn: "Non-overlapping, scattered circular nodes represent autonomous individuals before entering direct social contact.",
        descKr: "접점이 없이 파편화된 정원(Circle)들은 직접적인 사회적 접촉이 이뤄지기 이전의 독립된 개별 주체들을 나타냅니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2: Social Dignity Barrier",
        labelKr: "Fig 2: 품위와 보호 장벽",
        descEn: "The overlapping boundaries and outer protective ring visualize 'chaemyeon' as a social barrier that preserves individual dignity during interpersonal contact.",
        descKr: "도형 간의 접촉면과 외곽을 둘러싼 보호막 형태는 상호작용 속에서 각 개인의 품위와 자존심을 지켜주는 사회적 장벽(체면)을 시각화합니다.",
      },
    ],
    enText:
      "While English frames dignity preservation around individual face-saving tactics, Korean institutionalizes 'chaemyeon' as a shared social norm—a defensive buffer that safeguards personal worth within reciprocal hierarchies.",
    krText:
      "영어가 개인의 체면 유지 전략(Saving Face)을 중심으로 품위를 다룬다면, 한국어는 '체면'을 관계 속에서 마땅히 지켜야 할 사회적 의무이자 상호작용의 방어 장벽으로 규정합니다.",
    definitionEn:
      "Chaemyeon: The social face, dignity, or moral self-respect one must maintain to stand honorably before others within social interactions.",
    definitionKr:
      "체면 (Chaemyeon): 타인을 대할 때 사회적 관계 속에서 마땅히 지켜야 할 도덕적 품격, 자존심, 혹은 떳떳한 도리와 체면.",
    svgUrls: ["/ch3_svgs/artboard_21.svg", "/ch3_svgs/artboard_22.svg"],
    bgColors: ["#ffffff", "#ffffff"],
  },
  {
    key: "yeomchi",
    num: "04",
    nameKr: "염치",
    nameEn: "Yeomchi",
    bookPageSpan: "P. 125–130",
    geometryKey: "사각형 영역 내 절제(Restraint) vs 경계 이탈 및 침범(Breach)",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1: Having Yeomchi",
        labelKr: "Fig 1: 염치가 있는 상태",
        descEn: "Circular nodes remaining strictly within their respective square domains symbolize 'having yeomchi'—behaving responsibly inside one's implicit relational boundaries without encroaching on others.",
        descKr: "정원(개인)들이 각자의 사각형 영역 내부에 절제되어 위치한 구도는 타인에게 피해를 주지 않고 마땅한 한계선 내에서 행동하는 '염치가 있는' 상태를 의미합니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2: Boundary Restraint",
        labelKr: "Fig 2: 경계 내부 절제",
        descEn: "Circular nodes remaining strictly within their respective square domains symbolize 'having yeomchi'—behaving responsibly inside one's implicit relational boundaries without encroaching on others.",
        descKr: "정원(개인)들이 각자의 사각형 영역 내부에 절제되어 위치한 구도는 타인에게 피해를 주지 않고 마땅한 한계선 내에서 행동하는 '염치가 있는' 상태를 의미합니다.",
      },
      {
        phaseId: 3,
        labelEn: "Fig 3: Lacking Yeomchi",
        labelKr: "Fig 3: 염치가 없는 상태",
        descEn: "Nodes breaching and spilling past the square boundaries depict 'lacking yeomchi'—shamelessly overstepping appropriate limits to impose burdens or harm on others.",
        descKr: "정원이 사각형의 경계를 넘어 외부로 이탈하고 침범하는 구도는 적절한 한계를 넘어 타인에게 부담과 손해를 주면서도 부끄러워할 줄 모르는 '염치가 없는' 상태를 대조적으로 보여줍니다.",
      },
    ],
    enText:
      "Yeomchi functions as an internal moral compass regulating self-restraint. It defines whether an individual respects relational boundaries or shamelessly oversteps them to extract unreciprocated advantages.",
    krText:
      "염치는 관계적 경계 내에서 자신의 행동을 스스로 절제하는 도덕적 자의식입니다. 타인에게 부담을 주지 않는 한계선을 준수하는지 여부를 엄격하게 판별합니다.",
    definitionEn:
      "Yeomchi: Sense of shame, decency, or moral self-restraint that prevents one from causing burden, harm, or embarrassment to others across relational boundaries.",
    definitionKr:
      "염치 (Yeomchi): 체면을 차릴 줄 알고 부끄러움을 아는 마음으로, 다양한 관계 속에서 타인에게 피해나 부담을 주지 않도록 스스로 행동을 자제하는 도덕적 자의식.",
    svgUrls: ["/ch3_svgs/artboard_26.svg", "/ch3_svgs/artboard_27.svg", "/ch3_svgs/artboard_28.svg"],
    bgColors: ["#ffffff", "#ffffff", "#ffffff"],
  },
  {
    key: "dori",
    num: "05",
    nameKr: "도리",
    nameEn: "Dori",
    bookPageSpan: "P. 131–134",
    geometryKey: "세 정원의 교차 중첩(Relational Overlap) vs 공백화된 원형 궤적(Mechanical Duty)",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1: Relational Overlap (Dori)",
        labelKr: "Fig 1: 상호적 도덕 규범 (도리)",
        descEn: "Three intersecting circular nodes on a situational plane represent 'dori' as a moral responsibility emerging from the relational overlap between people.",
        descKr: "세 정원(사람)이 상황 평면 위에서 교차하며 만들어내는 중첩 구도는 강제적 의무가 아닌, 관계적 얽힘 속에서 피어나는 상호적 도덕 규범인 '도리'를 나타냅니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2: Institutional Duty",
        labelKr: "Fig 2: 기계적·제도적 의무 (Duty)",
        descEn: "An empty circular void within a rigid situational plane visualizes 'duty' as a standardized, role-based obligation to be fulfilled regardless of interpersonal closeness.",
        descKr: "사각형 평면 내부에 비어있는 정원(Void) 공간은 대인적 친밀도와 무관하게 개인이 마땅히 수행해야 하는 제도적 '의무'의 규범적 자리를 의미합니다.",
      },
    ],
    enText:
      "Unlike legal or contractual 'duty' enforced by external institutions, 'dori' arises organically from the intersection of human bonds as a voluntary moral standard.",
    krText:
      "법률이나 제도에 의해 외부에서 강제되는 기계적 '의무(Duty)'와 달리, '도리'는 인간관계의 교차점 속에서 자연스럽게 발생하는 상호적 도덕 기준입니다.",
    definitionEn:
      "Dori: Moral principles and proper behavioral standards rooted naturally in interpersonal relationships and shared human bonds.",
    definitionKr:
      "도리 (Dori): 인간관계와 상호적 맥락 속에서 마땅히 지켜야 할 자발적 도덕 규범이자 행동적 기준.",
    svgUrls: ["/ch3_svgs/artboard_18.svg", "/ch3_svgs/artboard_17.svg"],
    bgColors: ["#867229", "#867229"],
  },
  {
    key: "ojilap",
    num: "06",
    nameKr: "오지랖",
    nameEn: "Ojilap",
    bookPageSpan: "P. 135–138",
    geometryKey: "중심 주체(Center Node) 둘러싸기 → 수렴하는 간섭 압력(Converging Pressure)",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1: Boundary Encroachment",
        labelKr: "Fig 1: 경계 침범",
        descEn: "External nodes surrounding and encroaching upon the central subject visualize 'ojilap' as an uninvited invasion of personal boundaries by single or multiple others.",
        descKr: "중심의 '나'(청록색)를 수많은 타인(주황색)이 둘러싸며 경계를 침범하는 구도는 사적 영역에 대한 타인의 일방적인 관여와 참견을 시각화합니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2: Relational Pressure",
        labelKr: "Fig 2: 집중된 간섭 압력",
        descEn: "The cascading convergence of external nodes onto a single point depicts the heavy, coercive pressure felt when one's relational boundaries are forcibly breached.",
        descKr: "하단으로 집중되는 타인들의 수직적·수렴적 궤적은 발화자의 '염치'와 달리, 청자가 자신의 개인적 경계를 강제로 침해당할 때 느끼는 중압감을 나타냅니다.",
      },
    ],
    enText:
      "Unlike targeted curiosity (such as English 'nosiness'), 'ojilap' represents a pervasive intrusion into an individual's personal life as a whole, metaphorized as the wide, overlapping front hem of traditional clothing.",
    krText:
      "국소적인 사실을 캐묻는 서구의 'nosy'와 달리, 한국어의 '오지랖'은 개인의 삶 전반에 걸쳐 넓은 옷깃처럼 일방적으로 개입하고 간섭하는 관계적 피로도를 포괄합니다.",
    definitionEn:
      "Ojilap: A figurative term referring to the behavior or disposition of excessively intruding into others' private affairs without invitation.",
    definitionKr:
      "오지랖 (Ojilap): 쓸데없이 남의 일에 지나치게 관여하고 참견하는 행동이나 성향을 뜻하는 비유적 어휘.",
    svgUrls: ["/ch3_svgs/artboard_23.svg", "/ch3_svgs/artboard_24.svg"],
    bgColors: ["#ffffff", "#ffffff"],
  },
  {
    key: "assertive",
    num: "07",
    nameKr: "소신",
    nameEn: "Assertive",
    bookPageSpan: "P. 139–144",
    geometryKey: "보라색 독립 화자(Autonomous Speaker) + 사각형 상황 평면 → 동화되지 않는 경계 유지",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1: Autonomous Speaker",
        labelKr: "Fig 1: 독립적인 화자",
        descEn: "The purple circular node represents an autonomous speaker who possesses their own clear identity and communicative intention.",
        descKr: "보라색 정원(Circle)은 독립적인 말하는 이(화자)를 상징합니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2: Social Situation",
        labelKr: "Fig 2: 사회적 상황 평면",
        descEn: "The square background plane defines the social situation.",
        descKr: "사각형의 배경 평면은 사회적 상황을 정의합니다.",
      },
      {
        phaseId: 3,
        labelEn: "Fig 3: Unyielding Boundary",
        labelKr: "Fig 3: 동화되지 않는 경계 유지",
        descEn: "Unlike 'nunchi', where the circle assimilates into the background color, the purple circle maintains its color and boundary within the situation. It shows an individual holding their position without being absorbed by others.",
        descKr: "배경색에 동화되었던 '눈치'와 달리, 보라색 정원은 상황 안에서 자신의 색과 경계를 유지합니다. 주변 분위기에 흡수되지 않고 자신의 입장을 지키는 태도를 나타냅니다.",
      },
    ],
    enText:
      "In contrast to atmospheric assimilation ('nunchi'), 'sosin' (assertiveness) prioritizes explicit self-expression and boundary maintenance without being absorbed by surrounding situational pressures.",
    krText:
      "주변 분위기에 자신을 맞추는 '눈치'와 대조적으로, '소신·단호함(Sosin / Assertive)'은 사회적 상황 속에서도 자신의 고유한 색채와 경계를 허물지 않고 명확히 유지하는 태도를 보여줍니다.",
    definitionEn:
      "Sosin (Assertive): The attitude of expressing one's opinions and boundaries clearly without yielding to others.",
    definitionKr:
      "소신, 단호함 (Sosin): 타인에게 맞추어 굽히지 않고 자신의 의견과 경계를 명확하게 전달하는 태도입니다.",
    svgUrls: ["/ch3_svgs/artboard_10.svg", "/ch3_svgs/artboard_11.svg", "/ch3_svgs/artboard_12.svg"],
    bgColors: ["#ffffff", "#867229", "#867229"],
  },
  {
    key: "tact",
    num: "08",
    nameKr: "재치",
    nameEn: "Tact",
    bookPageSpan: "P. 145–150",
    geometryKey: "화자·청자 정원(Speaker & Listener) + 금색 화제(Topic) → 감정을 고려한 우회 궤적",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1: Speaker and Listener",
        labelKr: "Fig 1: 화자와 청자",
        descEn: "The purple and cyan circular nodes represent the speaker and the listener.",
        descKr: "보라색과 청록색 정원(Circle)은 대화의 화자와 청자를 상징합니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2: Conversational Topic",
        labelKr: "Fig 2: 전달할 화제(주제)",
        descEn: "The gold element represents the topic to be conveyed in the conversation.",
        descKr: "금색 요소는 대화에서 전달하고자 하는 화제(주제)를 상징합니다.",
      },
      {
        phaseId: 3,
        labelEn: "Fig 3: Indirect Trajectory",
        labelKr: "Fig 3: 청자를 고려한 우회 전달",
        descEn: "The trajectory curves through the gold node rather than moving in a straight line, visualizing indirect communication adjusted to the listener.",
        descKr: "직선 대신 각도를 꺾어 청자에게 도달하는 궤적은, 직설적인 화법 대신 상대를 고려하여 대화를 우회 전달하는 방식을 나타냅니다.",
      },
    ],
    enText:
      "Whereas 'nunchi' centers on decoding unstated situational atmosphere, 'jaechi / tact' operates as a strategic communicative skill that bends the delivery trajectory to convey a topic without offending the listener.",
    krText:
      "무언의 분위기를 감지하는 데 초점을 두는 '눈치'와 달리, '재치(Tact)'는 전달하려는 주제를 직선적으로 부딪히지 않고 상대방의 감정을 고려해 전략적으로 우회하여 전달하는 화자의 소통 기술입니다.",
    definitionEn:
      "Jaechi (Tact): The ability to deliver a message without causing offense to the listener.",
    definitionKr:
      "재치 (Jaechi / Tact): 청자의 감정을 상하게 하지 않고 대화의 주제를 전달하는 소통 능력입니다.",
    svgUrls: ["/ch3_svgs/artboard_7.svg", "/ch3_svgs/artboard_8.svg", "/ch3_svgs/artboard_9.svg"],
    bgColors: ["#ffffff", "#ffffff", "#ffffff"],
  },
  {
    key: "nosy",
    num: "09",
    nameKr: "참견",
    nameEn: "Nosy",
    bookPageSpan: "P. 151–154",
    geometryKey: "사각형 내 개인 영역(Private Domain) + 쐐기형 침투(Targeted Wedge Intrusion)",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1: Private Domain",
        labelKr: "Fig 1: 개인과 사적 영역",
        descEn: "The circular node inside the square plane represents an individual and their private domain.",
        descKr: "사각형 평면 안의 정원(Circle)은 개인과 사적 영역을 정의합니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2: Targeted Intrusion",
        labelKr: "Fig 2: 특정 사적 정보 침범",
        descEn: "Unlike 'ojilap', which intervenes in a person's life as a whole, the wedge penetrating the boundary represents an intrusion limited to specific private information.",
        descKr: "삶 전반에 개입하는 '오지랖'과 달리, 경계를 파고드는 형태는 특정 사적 정보에 한정된 침범을 나타냅니다.",
      },
    ],
    enText:
      "The Korean word '참견' (參見) combines 참 (參), meaning 'to take part,' and 견 (見), meaning 'to see' or 'to observe.' It originally referred to participating in and observing something, but its meaning later developed into interfering in other people's affairs or giving unwanted advice.",
    krText:
      "'참견(參見)'은 '참여할 참(參)'과 '볼 견(見)'이 결합한 한자어로, 본래는 어떤 일에 참여하여 살펴본다는 의미에서 출발했습니다. 이후 의미가 변하여, 오늘날에는 자기와 관계없는 남의 일에 끼어들어 이래라저래라 하는 행동을 의미합니다.",
    definitionEn:
      "Chamgyeon (Nosy): Interfering in other people's affairs or giving unwanted advice beyond one's relational boundary.",
    definitionKr:
      "참견 (Chamgyeon): 자기와 관계없는 남의 일에 끼어들어 간섭하거나 불필요한 조언을 하는 행동.",
    svgUrls: ["/ch3_svgs/artboard_1.svg", "/ch3_svgs/artboard_2.svg"],
    bgColors: ["#583884", "#583884"],
  },
  {
    key: "entitled",
    num: "10",
    nameKr: "특권 의식",
    nameEn: "Entitled",
    bookPageSpan: "P. 155–160",
    geometryKey: "공유된 사회적 공간(Shared Space) → 중심 원형의 경계 팽창 및 타인 영역 압박",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1: Shared Social Space",
        labelKr: "Fig 1: 공유된 사회적 공간",
        descEn: "The circular nodes represent individuals coexisting within a shared social space.",
        descKr: "원형들은 공유된 사회적 공간 안의 개인들을 상징합니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2: Boundary Encroachment",
        labelKr: "Fig 2: 주변 개인 공간 침범",
        descEn: "The central node expands beyond its boundary, encroaching on the space of surrounding individuals.",
        descKr: "중심 원형이 자신의 경계를 넘어 팽창하며 주변 개인들의 공간을 침범합니다.",
      },
      {
        phaseId: 3,
        labelEn: "Fig 3: Spatial Compression",
        labelKr: "Fig 3: 타인 영역 압박과 침해",
        descEn: "The layered expansion of the central node compresses the boundaries of others. It visualizes entitlement as an inflated claim of rights overriding the space of others.",
        descKr: "중심 원형의 팽창은 주변 개인들의 경계를 압박합니다. 비대해진 권리의식이 타인의 영역을 침해하는 상태를 나타냅니다.",
      },
    ],
    enText:
      "Whereas 'lacking yeomchi' refers to breaching moral restraint across boundaries, 'entitlement' depicts the self-centered inflation of an individual's domain that compresses the shared space of others.",
    krText:
      "경계선 내의 도덕적 자제를 잃는 '염치 없음'과 비교할 때, '특권 의식(Entitled)'은 자기 영역을 과도하게 팽창시켜 주변 개인들의 경계를 압박하고 침해하는 상태를 나타냅니다.",
    definitionEn:
      "Entitled (Teukgwon Uisik): The belief that one naturally deserves special privileges or treatment over others.",
    definitionKr:
      "특권 의식 (Teukgwon Uisik): 자신이 타인보다 특별한 권리나 대우를 받을 자격이 당연히 있다고 믿는 태도입니다.",
    svgUrls: ["/ch3_svgs/artboard_5.svg", "/ch3_svgs/artboard_4.svg", "/ch3_svgs/artboard_6.svg"],
    bgColors: ["#ffffff", "#ffffff", "#ffffff"],
  },
  {
    key: "nangman",
    num: "11",
    nameKr: "낭만",
    nameEn: "Nangman",
    bookPageSpan: "P. 161–169",
    geometryKey: "두 독립 원형의 교집합(Romantic: 관계적 유대) vs 규범 평면 상단 경계 이탈(Nangman: 탈맥락적 정서 여백)",
    phases: [
      {
        phaseId: 1,
        labelEn: "Romantic Fig 1: Autonomous Individual",
        labelKr: "로맨틱 Fig 1: 독립된 개인",
        descEn: "The dark red circular node represents an autonomous individual entering an interpersonal relationship with their identity.",
        descKr: "붉은색 원형은 고유한 정체성을 지닌 채 대인 관계를 가지는 독립된 개인을 상징합니다.",
      },
      {
        phaseId: 2,
        labelEn: "Romantic Fig 2: Dyadic Counterpart",
        labelKr: "로맨틱 Fig 2: 관계의 상대방",
        descEn: "The orange circular node represents another autonomous individual forming a counterpart in the dyadic relationship.",
        descKr: "주황색 원형은 관계를 마주하는 또 다른 독립된 개체로서의 상대를 상징합니다.",
      },
      {
        phaseId: 3,
        labelEn: "Romantic Fig 3: Interpersonal Bond",
        labelKr: "로맨틱 Fig 3: 상호적 감정 유대",
        descEn: "The overlapping intersection of the two circular nodes visualizes the formation of a shared emotional bond between two individuals, defining romance as an interpersonal connection rather than a situational escape.",
        descKr: "두 원형이 겹치며 형성되는 교집합은 두 개인 간에 형성된 감정적 유대와 결속을 나타냅니다. 환경적 탈피가 아닌 두 주체 간의 상호작용으로 성립하는 관계적 속성을 시각화합니다.",
      },
      {
        phaseId: 4,
        labelEn: "Nangman Fig 1: Situational Constraint",
        labelKr: "낭만 Fig 1: 현실적 제약 속의 개인",
        descEn: "The square background plane defines the social situation governed by norms and efficiency, within which the circular node represents an individual positioned under real-world constraints.",
        descKr: "사각형의 배경 평면은 규범과 효율성이 요구되는 사회적 상황을 정의하며, 내부의 원형은 현실적 제약 속에 놓인 개인을 상징합니다.",
      },
      {
        phaseId: 5,
        labelEn: "Nangman Fig 2: Breaching Constraints",
        labelKr: "낭만 Fig 2: 환경의 한계 이탈",
        descEn: "The circular node breaches the upper boundary of the situation plane, visualizing an individual actively moving beyond structural constraints rather than conforming or adapting to the environment.",
        descKr: "원형이 사각형 평면의 상단 경계를 뚫고 벗어나는 모습은, 주어진 상황에 순응하거나 적응하기보다 환경의 한계를 벗어나 자신만의 정서적 가치를 추구하는 태도를 나타냅니다.",
      },
      {
        phaseId: 6,
        labelEn: "Nangman Fig 3: Affective Buffer Zone",
        labelKr: "낭만 Fig 3: 심리적 완충 지대와 정서 공간",
        descEn: "The empty background plane left behind as the node departs illustrates the psychological breathing room and poetic distance carved out completely beyond situational demands.",
        descKr: "원형이 상황의 경계를 완전히 벗어나 남겨진 사각 평면은, 규범적 제약에서 벗어남으로써 비로소 획득되는 심리적 완충 지대와 탈맥락적 정서 공간을 시각화합니다.",
      },
    ],
    enText:
      "While 'Romantic' denotes an idealized emotional bond and affective intimacy formed mutually between two autonomous individuals, Korean 'Nangman' represents an affective buffer zone and psychological breathing room pursued by breaking away from rigid social conformity and economic efficiency.",
    krText:
      "서구의 '로맨틱(Romantic)'이 두 독립된 개인 사이에서 상호적으로 형성되는 이상적인 애정 관계나 정서적 유대를 의미한다면, 한국어의 '낭만(Nangman)'은 효율성과 규범이 요구되는 현실적 제약에 순응하거나 안주하지 않고 주어진 환경을 벗어나 주체적으로 정서적 여백을 추구하는 태도로 해석할 수 있습니다.",
    definitionEn:
      "Nangman: An affective buffer zone and psychological breathing room pursued by breaking away from rigid social conformity and economic efficiency.",
    definitionKr:
      "낭만 (Nangman): 효율성과 규범이 요구되는 현실적 제약에 순응하거나 안주하지 않고, 주어진 환경을 벗어나 주체적으로 정서적 여백을 추구하는 태도.",
    svgUrls: [
      "/ch3_svgs/artboard_31.svg",
      "/ch3_svgs/artboard_32.svg",
      "/ch3_svgs/artboard_33.svg",
      "/ch3_svgs/artboard_34.svg",
      "/ch3_svgs/artboard_35.svg",
      "/ch3_svgs/artboard_36.svg",
    ],
    bgColors: ["#ffffff", "#ffffff", "#ffffff", "#867229", "#867229", "#867229"],
  },
  {
    key: "ulkeok",
    num: "12",
    nameKr: "울컥",
    nameEn: "Ulkeok",
    bookPageSpan: "P. 171–175",
    geometryKey: "내면의 억제된 백색 원(Latent Emotion) + 외부 계기 접촉(Catalyst) → 수직 분출(Upward Surge)",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1: Suppressed Emotion",
        labelKr: "Fig 1: 내면에 억제된 감정",
        descEn: "The inner white circle represents suppressed emotion held latent within the individual before encountering an external trigger.",
        descKr: "원형 내부의 흰색 원은 외부 계기를 마주하기 전 개체의 내면에 억제되어 있는 감정을 상징합니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2: External Catalyst",
        labelKr: "Fig 2: 외부 계기와의 접촉",
        descEn: "The blue circular form entering from below represents an encounter with an external catalyst, such as a person or an event, which contacts the internalized emotion.",
        descKr: "하단에서 접촉하는 파란색 원형은 사건이나 인물과 같은 외부 계기와의 만남을 나타내며, 내재된 감정을 자극합니다.",
      },
      {
        phaseId: 3,
        labelEn: "Fig 3: Affective Rupture",
        labelKr: "Fig 3: 통제를 넘어선 수직 분출",
        descEn: "The upward surge of the white form visualizes the sudden rupture where the suppressed emotion breaks through the boundary of rational composure.",
        descKr: "흰색 형태가 수직으로 경계를 뚫고 나오는 구조는, 억제되었던 감정이 통제를 넘어 분출되는 상태를 시각화합니다.",
      },
    ],
    enText:
      "Suppressing emotional expression in accordance with public norms and interpersonal expectations leads to a sudden vertical release when triggered by an external catalyst.",
    krText:
      "공적 규범과 대인 관계를 고려하여 감정 표현을 절제하다가, 외부의 특정한 계기를 마주했을 때 억누르던 감정이 이성적 통제를 넘어 순간적으로 표출되는 정서적 반응입니다.",
    definitionEn:
      "Ulkeok: A sudden affective surge where suppressed emotion breaches rational composure upon encountering an external catalyst.",
    definitionKr:
      "울컥 (Ulkeok): 억제되어 있던 감정이 외부의 계기를 마주했을 때 이성적 통제를 넘어 순간적으로 표출되는 정서적 반응입니다.",
    svgUrls: ["/ch3_svgs/artboard_37.svg", "/ch3_svgs/artboard_38.svg", "/ch3_svgs/artboard_39.svg"],
    bgColors: ["#ffffff", "#ffffff", "#ffffff"],
  },
  {
    key: "jeong",
    num: "13",
    nameKr: "정",
    nameEn: "Jeong",
    bookPageSpan: "P. 177–181",
    geometryKey: "독립된 적색·청색 원형(Autonomous Nodes) → 시계방향 4단계(1~4) 시간 누적과 교집합 확장",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1: Autonomous Individual",
        labelKr: "Fig 1: 독립된 개인",
        descEn: "The red circular node represents an individual with an autonomous identity.",
        descKr: "빨간색 원형은 고유한 정체성을 지닌 독립된 개인을 상징합니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2: Coexisting Individual",
        labelKr: "Fig 2: 관계 공간의 상대 개인",
        descEn: "The blue circular node represents another individual coexisting in the relational space.",
        descKr: "파란색 원형은 관계적 공간에 공존하는 또 다른 개인을 상징합니다.",
      },
      {
        phaseId: 3,
        labelEn: "Fig 3: Four-Step Temporal Progression (1–4)",
        labelKr: "Fig 3: 시계방향 4단계(1~4) 교집합 확장",
        descEn: "The four-step clockwise progression (1 to 4) shows the gradual expansion of the intersection between the two nodes as shared time and interactions accumulate, visualizing the formation of 'jeong'.",
        descKr: "시계방향으로 진행되는 4단계(1~4) 과정은 공유된 시간과 상호작용이 누적됨에 따라 두 원형의 교집합이 점진적으로 확장되는 구조를 통해 '정'의 형성을 시각화합니다.",
      },
    ],
    enText:
      "Unlike selective contractual affinity, 'jeong' deepens involuntarily over time as shared temporal experiences and continuous interactions expand the overlapping relational space between individuals.",
    krText:
      "선택적 호감이나 계약적 유대와 달리, '정'은 장기간 공유된 시간과 상호작용이 축적됨에 따라 두 주체 사이의 교집합이 점진적으로 넓어지는 비선택적 대인 결속입니다.",
    definitionEn:
      "Jeong: A durable interpersonal attachment and affective bond accumulated through shared time and continuous interaction.",
    definitionKr:
      "정 (Jeong): 장기간 공유된 시간과 상호작용을 통해 누적되는 비선택적 대인 결속입니다.",
    svgUrls: ["/ch3_svgs/artboard_46.svg", "/ch3_svgs/artboard_47.svg", "/ch3_svgs/artboard_48.svg"],
    bgColors: ["#ffffff", "#ffffff", "#ffffff"],
  },
  {
    key: "han",
    num: "14",
    nameKr: "한",
    nameEn: "Han",
    bookPageSpan: "P. 183–187",
    geometryKey: "하단 초기 침전 원(Initial Sediment) → 상단으로 중첩·누적되는 다층 동심원 구조(Concentric Layering)",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1: Initial Unexpressed Emotion",
        labelKr: "Fig 1: 초기 침전 감정",
        descEn: "The purple circular node represents an individual, with the small inner circle at the base indicating the initial occurrence of unexpressed emotion.",
        descKr: "보라색 원형은 개인을 나타내며, 하단부의 작은 내측 원은 표출되지 않고 침전된 초기 감정을 상징합니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2: Internalized Accumulation",
        labelKr: "Fig 2: 내면의 다층 축적",
        descEn: "The concentric layering expanding upward within the circle visualizes the unresolved emotion accumulating over time rather than being discharged externally.",
        descKr: "원형 내부에서 상단으로 중첩되며 확장되는 층위는, 감정이 외부로 발산되지 못하고 내면에 축적되는 과정을 나타냅니다.",
      },
      {
        phaseId: 3,
        labelEn: "Fig 3: Embedded Sedimentation",
        labelKr: "Fig 3: 내면에 침착된 다층 응어리",
        descEn: "The dense layered structure occupying the internal volume visualizes 'han' as a state where cumulative emotion becomes deeply embedded within the individual.",
        descKr: "내부 영역의 대부분을 채우며 누적된 다층 구조는, 장기간 축적된 정서적 응어리가 개인의 내면에 침착된 '한'의 상태를 시각화합니다.",
      },
    ],
    enText:
      "Rather than discharging outward like 'ulkeok', 'han' sediments inward over time, forming dense concentric strata of unvoiced grief and frustration within the individual.",
    krText:
      "외부 계기를 통해 수직 분출되는 '울컥'과 대조적으로, '한'은 외부로 발산되지 못한 슬픔과 좌절이 시간의 경과에 따라 내면 깊은 곳에 다층적으로 침착되는 정서 구조를 보여줍니다.",
    definitionEn:
      "Han: An internalized psychological state formed through unvoiced sorrow, grief, or frustration accumulated over time.",
    definitionKr:
      "한 (Han): 해소되지 못한 슬픔이나 정서적 응어리가 내면에 장기간 축적되어 형성된 심리적 상태입니다.",
    svgUrls: ["/ch3_svgs/artboard_51.svg", "/ch3_svgs/artboard_50.svg", "/ch3_svgs/artboard_49.svg"],
    bgColors: ["#ffffff", "#ffffff", "#ffffff"],
  },
  {
    key: "seopseophada",
    num: "15",
    nameKr: "섭섭하다",
    nameEn: "Seopseophada",
    bookPageSpan: "P. 189–195",
    geometryKey: "기대 교집합(Filled Expectation) → 공백 결손(Disappointed) vs 흐릿하게 번진 정서 잔여물(Seopseophada)",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1: Individual Holding Expectation",
        labelKr: "Fig 1: 기대를 형성하는 개인",
        descEn: "The brown circular node represents an individual holding a specific expectation.",
        descKr: "갈색 원형은 특정한 기대를 형성하는 한 개인을 상징합니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2: Counterpart of Expectation",
        labelKr: "Fig 2: 기대의 대상이 되는 상대방",
        descEn: "The yellow circular node represents the counterpart toward whom the expectation is directed.",
        descKr: "노란색 원형은 기대의 대상이 되는 상대방을 상징합니다.",
      },
      {
        phaseId: 3,
        labelEn: "Fig 3: Situational Expectation",
        labelKr: "Fig 3: 상황적 기대와 요구 조건",
        descEn: "The filled intersection between the two circular nodes represents the situational expectation or desired outcome placed on the other party.",
        descKr: "두 원형 사이에 채워진 교집합은 상대방에게 바라는 상황적 기대나 요구 조건을 나타냅니다.",
      },
      {
        phaseId: 4,
        labelEn: "Fig 4: Disappointed (실망하다)",
        labelKr: "Fig 4: 실망하다 (결손 공백 상태)",
        descEn: "The unfilled overlapping area visualizes 'disappointment' as a deficit state where the expected outcome is not fulfilled.",
        descKr: "채워지지 않은 중첩 영역은 기대했던 조건이 충족되지 못한 결손 상태를 나타내며, 이를 통해 '실망'을 시각화합니다.",
      },
      {
        phaseId: 5,
        labelEn: "Fig 5: Seopseophada (섭섭하다)",
        labelKr: "Fig 5: 섭섭하다 (흐릿하게 번진 정서적 잔여물)",
        descEn: "Unlike 'disappointment' where the overlapping region remains completely vacant, the blurred and diffused intersection visualizes 'seopseophada' as a lingering emotional deficit and regret sustained within the relationship without severance.",
        descKr: "공백으로 비워졌던 '실망'과 달리, 두 원형의 중첩 영역이 흐릿한 경계로 번져 있는 구조는 관계를 단절하지 않은 채 상호 간에 남겨진 아쉬움과 정서적 잔여물을 시각화합니다.",
      },
    ],
    enText:
      "While 'Disappointed (실망하다)' is an emotional reaction occurring when a specific situational expectation or desired outcome fails to materialize (leaving a vacant void), 'Seopseophada (섭섭하다)' is an internalized emotional ache arising from unfulfilled interpersonal consideration in a sustained relationship.",
    krText:
      "상대방이나 상황에 대해 설정했던 기대나 요구 조건이 충족되지 않았을 때 발생하는 '실망하다(Disappointed)'가 완전한 공백 상태라면, '섭섭하다(Seopseophada)'는 기대했던 정서적 배려가 충족되지 않았을 때 관계를 단절하지 않은 채 내면에 남는 아쉬움의 정서입니다.",
    definitionEn:
      "Seopseophada: An internalized emotional ache arising from unfulfilled interpersonal consideration in a sustained relationship, distinct from the complete void of disappointment.",
    definitionKr:
      "섭섭하다 (Seopseophada): 기대했던 정서적 배려가 충족되지 않았을 때 발생하며, 관계의 단절이나 완전한 결손(실망)과 달리 관계를 유지한 채 내면에 남는 아쉬움의 정서입니다.",
    svgUrls: [
      "/ch3_svgs/artboard_40.svg",
      "/ch3_svgs/artboard_45.svg",
      "/ch3_svgs/artboard_42.svg",
      "/ch3_svgs/artboard_41.svg",
      "/ch3_svgs/artboard_43.svg",
    ],
    bgColors: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  },
];

const svgCache: Record<string, string> = {};

export default function Chapter3Instrument({ lang = "en" }: { lang?: "en" | "kr" }) {
  const [selectedConceptKey, setSelectedConceptKey] = useState<ConceptKey>("nunchi");
  const [tick, setTick] = useState(0);
  const [manualPhaseIndex, setManualPhaseIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [cachedSvgs, setCachedSvgs] = useState<Record<string, string>>({});

  const concept = CHAPTER3_CONCEPTS.find((c) => c.key === selectedConceptKey) || CHAPTER3_CONCEPTS[0];
  const activePhaseIndex = manualPhaseIndex !== null ? manualPhaseIndex : (tick % concept.phases.length);
  const currentPhase = concept.phases[activePhaseIndex] || concept.phases[0];

  // Pre-fetch SVGs for all concepts
  useEffect(() => {
    let isMounted = true;
    const allUrls = CHAPTER3_CONCEPTS.flatMap((c) => c.svgUrls || []);
    Promise.all(
      allUrls.map(async (url) => {
        if (svgCache[url]) return { url, data: svgCache[url] };
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const text = await res.text();
          svgCache[url] = text;
          return { url, data: text };
        } catch {
          return { url, data: "" };
        }
      })
    ).then((items) => {
      if (!isMounted) return;
      const map: Record<string, string> = {};
      items.forEach((item) => {
        map[item.url] = item.data;
      });
      setCachedSvgs((prev) => ({ ...prev, ...map }));
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Continuous auto-loop interval across phases
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const handleSelectPhase = (idx: number) => {
    setManualPhaseIndex(idx);
  };

  const handleTileClick = (key: ConceptKey) => {
    setSelectedConceptKey(key);
    setManualPhaseIndex(null);
    setIsExpanded(true);
  };

  const getTileBgColor = (c: ConceptData, phaseIdx: number) => {
    if (c.key === "nunchi") {
      const idx = phaseIdx % 4;
      return idx >= 1 ? "#867229" : "#ffffff";
    }
    if (c.bgColors && c.bgColors.length > 0) {
      return c.bgColors[phaseIdx % c.bgColors.length];
    }
    return "#ffffff";
  };

  const renderConceptDiagram = (c: ConceptData, phaseIdx: number, inTile = false) => {
    if (c.key === "nunchi") {
      const idx = phaseIdx % 4;
      const showCircle = idx !== 1;
      const circleColor = idx === 3 ? "#98843f" : "#00c1e5";
      const circleSize = inTile ? "70%" : "78%";

      return (
        <div
          className={styles.phaseContentWrapper}
          style={{
            backgroundColor: "transparent",
          }}
        >
          <div
            style={{
              width: circleSize,
              height: circleSize,
              borderRadius: "50%",
              backgroundColor: circleColor,
              opacity: showCircle ? 1 : 0,
              transition: "all 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
              boxShadow: idx === 0 ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
            }}
          />
        </div>
      );
    }

    if (c.svgUrls && c.svgUrls.length > 0) {
      const activeIdx = phaseIdx % c.svgUrls.length;
      return (
        <div
          className={styles.phaseContentWrapper}
          style={{
            backgroundColor: "transparent",
          }}
        >
          {c.svgUrls.map((url, idx) => {
            const rawSvg = cachedSvgs[url] || "";
            return (
              <div
                key={url}
                className={styles.svgWrapper}
                style={{
                  opacity: activeIdx === idx ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}
                dangerouslySetInnerHTML={{ __html: rawSvg }}
              />
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.instrumentWrapper}>
      {/* ── Top Bar: Title ───────────────────── */}
      <div className={styles.topBar}>
        <div className={styles.titleRow}>
          <div className={styles.instrumentMeta}>
            <span className={styles.instrumentCategory}>Chapter 03 / Instrument</span>
            <h3 className={styles.instrumentTitle}>
              {lang === "en"
                ? "Situational Perception & Affective Norms"
                : "상황 인지와 정서적 규범"}
            </h3>
          </div>
        </div>
      </div>

      {/* ── Main Stage: 80vh Diagram Area with Text Below ────────── */}
      <div className={styles.mainStage}>
        {/* Caption bar above diagram */}
        <div className={styles.stageHeader}>
          <div className={styles.captionBar}>
            <div className={styles.captionLeft}>
              <span className={styles.figureCaption}>
                {isExpanded
                  ? `${concept.num}. ${lang === "en" ? concept.nameEn : concept.nameKr} — ${lang === "en" ? currentPhase.labelEn : currentPhase.labelKr}`
                  : (lang === "en"
                      ? "01–15. Situational Perception & Affective Norms"
                      : "01–15. 상황 인지와 정서적 규범")}
              </span>
              <span className={styles.bookRefBadge}>
                Ref. book {isExpanded ? concept.bookPageSpan : "P. 111–195"}
              </span>
            </div>
            <div className={styles.captionRight}>
              <button
                type="button"
                className={styles.viewModeToggle}
                onClick={() => setIsExpanded((prev) => !prev)}
              >
                {isExpanded
                  ? (lang === "en" ? "View all tiles" : "전체 타일 보기")
                  : (lang === "en" ? "Expand slide" : "슬라이드 확대")}
              </button>
            </div>
          </div>
        </div>

        {/* Center: Diagram Area (Seamless 15-concept tiles overview OR Expanded slide) */}
        <div className={styles.diagramArea}>
          {!isExpanded ? (
            <div className={styles.tilesContainer}>
              {CHAPTER3_CONCEPTS.map((c) => {
                const curPhase = tick % c.phases.length;
                const bg = getTileBgColor(c, curPhase);
                const isDarkBg = bg !== "#ffffff";
                return (
                  <div
                    key={c.key}
                    className={styles.tileItem}
                    style={{
                      backgroundColor: bg,
                      boxShadow: isDarkBg ? `0 0 0 1px ${bg}` : "none",
                      transition:
                        "background-color 0.5s cubic-bezier(0.76, 0, 0.24, 1), box-shadow 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
                    }}
                    onClick={() => handleTileClick(c.key)}
                    role="button"
                    tabIndex={0}
                    title={`${lang === "en" ? c.nameEn : c.nameKr} (Click to expand)`}
                  >
                    <div
                      className={styles.tileInner}
                      style={c.key === "ulkeok" ? { transform: "translateY(-6%) scale(0.84)" } : undefined}
                    >
                      {renderConceptDiagram(c, curPhase, true)}
                    </div>
                    <div className={styles.tileLabel}>
                      <span
                        className={styles.tileLabelText}
                        style={{
                          color: isDarkBg ? "#dcd8cc" : "#7c7c7c",
                        }}
                      >
                        {c.num}. {lang === "en" ? c.nameEn : c.nameKr}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={styles.expandedSlide}
              style={{
                backgroundColor: getTileBgColor(concept, activePhaseIndex),
                transition: "background-color 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
              }}
              onClick={() => setIsExpanded(false)}
              role="button"
              tabIndex={0}
              title={lang === "en" ? "Click to return to all tiles" : "클릭하여 전체 타일로 복귀"}
            >
              {renderConceptDiagram(concept, activePhaseIndex)}
              <div className={styles.collapseHint}>
                <span>{lang === "en" ? "View all tiles" : "전체 타일 보기"}</span>
              </div>
            </div>
          )}
        </div>

        {/* Below Image: All text descriptions run cleanly below only when expanded into an individual concept ── */}
        {isExpanded && (
          <div className={styles.stageFooter}>
            <div className={styles.conceptTitleBlock}>
              <h4 className={styles.mainConceptTitle}>
                {lang === "en" ? concept.nameEn : concept.nameKr}
              </h4>
              <div className={styles.phaseSubheadingRow}>
                <h5 className={styles.phaseSubtitle}>
                  {lang === "en" ? currentPhase.labelEn : currentPhase.labelKr}
                </h5>
                <div className={styles.stepButtonGroup}>
                  {concept.phases.map((ph, idx) => (
                    <button
                      key={ph.phaseId}
                      type="button"
                      className={`${styles.stepNumberBtn} ${idx === activePhaseIndex ? styles.stepNumberBtnActive : ""}`}
                      onClick={() => handleSelectPhase(idx)}
                      title={lang === "en" ? ph.labelEn : ph.labelKr}
                    >
                      0{ph.phaseId}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.geometryKeyBlock}>
              <span className={styles.geometryKeyLabel}>
                {lang === "en" ? "Geometry mapping" : "도형 기하 구조"}
              </span>
              <span>{concept.geometryKey}</span>
            </div>

            {/* Active Phase Rationale */}
            <div className={styles.textSection}>
              <span className={styles.sectionLabel}>
                {lang === "en" ? "Active phase rationale" : "단계별 기제"}
              </span>
              <p className={lang === "en" ? styles.descEn : styles.descKr}>
                {lang === "en" ? currentPhase.descEn : currentPhase.descKr}
              </p>
            </div>

            {/* Pragmatic Context */}
            <div className={styles.textSection}>
              <span className={styles.sectionLabel}>
                {lang === "en" ? "Pragmatic context" : "비교화용론적 맥락"}
              </span>
              <p className={lang === "en" ? styles.contextEn : styles.contextKr}>
                {lang === "en" ? concept.enText : concept.krText}
              </p>
            </div>

            {/* Definition */}
            <div className={styles.definitionBlock}>
              <div>
                <strong>{lang === "en" ? "Definition" : "정의"}</strong>{" "}
                {lang === "en" ? concept.definitionEn : concept.definitionKr}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
