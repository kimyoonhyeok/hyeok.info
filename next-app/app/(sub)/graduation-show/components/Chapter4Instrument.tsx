"use client";

import React, { useState, useEffect } from "react";
import styles from "./Chapter3Instrument.module.css";

type Ch4ConceptKey = "bap" | "tea" | "yes_no_en" | "yes_no_kr";

interface Ch4PhaseSpec {
  phaseId: number;
  labelEn: string;
  labelKr: string;
  descEn: string;
  descKr: string;
  cardBg?: string;
  cardTitle?: string;
  cardTextEn?: string;
  cardTextKr?: string;
}

interface Ch4ConceptData {
  key: Ch4ConceptKey;
  num: string;
  sectionBadge: string;
  nameKr: string;
  nameEn: string;
  bookPageSpan: string;
  geometryKeyEn: string;
  geometryKeyKr: string;
  phases: Ch4PhaseSpec[];
  enText: string;
  krText: string;
  definitionEn: string;
  definitionKr: string;
  svgUrls: string[];
  bgColors: string[];
}

const CHAPTER4_CONCEPTS: Ch4ConceptData[] = [
  {
    key: "bap",
    num: "01",
    sectionBadge: "2-1",
    nameKr: "밥",
    nameEn: "Bap",
    bookPageSpan: "P. 206–211",
    geometryKeyEn: "Rice Grains (Origin) → Trapezoidal Bowl (Sustenance) → Shared Spoons (Sharing) → Circular Communal Table (Sik-gu)",
    geometryKeyKr: "벼 낱알(Origin) → 사다리꼴 밥그릇(Sustenance) → 수저의 공유(Sharing) → 식구 원형 공동체(Communal Table)",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1 (Origin)",
        labelKr: "Fig 1 (기원: 벼와 농경)",
        descEn: "The vertical stem and clustered spherical grains represent rice, the staple crop characterizing an agrarian society.",
        descKr: "수직의 줄기와 군집된 원형 낱알은 농경 사회를 대표하는 작물인 벼의 형태를 의미합니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2 (Sustenance)",
        labelKr: "Fig 2 (생존: 밥그릇)",
        descEn: "The spherical nodes gathered in a trapezoidal vessel represent rice cooked and served in a bowl. In an agrarian-centered society, this symbolizes that the grains harvested through labor serve as the most fundamental element for sustaining survival.",
        descKr: "사다리꼴 그릇에 모인 원형들은 쌀이 밥으로 조리되어 그릇에 담겨있는 형태를 의미합니다. 이는 농경 중심 사회에서 노동을 통해 수확한 곡물이 생존을 유지하는 가장 핵심적인 요소임을 상징합니다.",
      },
      {
        phaseId: 3,
        labelEn: "Fig 3 (Sharing)",
        labelKr: "Fig 3 (공유: 한 솥밥과 수저)",
        descEn: "The image illustrates multiple spoons reaching into a single bowl. This visualizes how an individual's livelihood and personal well-being are inextricably bound to collective life, sharing the physical act of eating from a common source.",
        descKr: "하나의 그릇에 함께 수저를 대는 행위를 시각화한 형태입니다. 이는 한 솥의 밥을 공유하는 신체적 행위를 통해 개인의 생활과 안위가 집단적 삶 및 공동체의 생존과 긴밀히 연관되어 있음을 나타냅니다.",
      },
      {
        phaseId: 4,
        labelEn: "Fig 4 (Communal Table)",
        labelKr: "Fig 4 (식구: 경계를 허무는 원형 식탁)",
        descEn: "The circular boundary enclosing human forms facing a common center illustrates the formation of Sik-gu—a collective unit that dissolves individual boundaries through shared meals.",
        descKr: "공통의 중심을 향해 배치된 인물들과 원형 평면은 한 식탁을 공유하며 개인 간의 경계를 허무는 '식구(食口)' 공동체의 형성을 나타냅니다.",
      },
    ],
    enText:
      "In Korea, the agrarian tradition of collective labor (Pumasi) meant that survival was inherently communal. Eating from the same pot actively dissolved the boundary between 'you' and 'me,' merging individuals into a singular collective unit (Sik-gu). Across a 4-stage trajectory—Entry ('Have you eaten?'), Maintenance ('Let's grab a meal sometime'), Disapproval ('Lose one's appetite'), and Exclusion ('No broth for you')—'Bap' pulls interlocutors into an interdependent shared sphere.",
    krText:
      "한국의 '밥'은 공동 노동(품앗이)을 중시하는 농경 문화에 기원을 둡니다. 한 솥의 밥을 나누어 먹는 행위는 '너'와 '나'의 경계를 완화하고 하나의 공동체(식구)로 병합하는 의례로 작동합니다. 진입('밥 먹었어?') → 유지('언제 밥 한번 먹자') → 거부('밥맛 떨어져') → 파국('국물도 없다')의 4단계 발화 궤적을 통해 상대방을 상호 의존적이고 밀착된 공간 안으로 연결합니다.",
    definitionEn:
      "Bap Ritual: A boundary-dissolving conversational ritual rooted in communal agrarian survival that merges interlocutors into an interdependent collective unit (Sik-gu).",
    definitionKr:
      "밥 의례 (Bap Ritual): 공동 농경 문화의 생존 확인에서 기원하여, 개인 간의 경계를 완화하고 상호 의존적인 공동체(식구)로 결속시키는 대화 의례.",
    svgUrls: [
      "/ch4_svgs/bap_1.svg",
      "/ch4_svgs/bap_2.svg",
      "/ch4_svgs/bap_3.svg",
      "/ch4_svgs/bap_4.svg",
    ],
    bgColors: ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  },
  {
    key: "tea",
    num: "02",
    sectionBadge: "2-1",
    nameKr: "차",
    nameEn: "Tea",
    bookPageSpan: "P. 212–215",
    geometryKeyEn: "Tea Leaves (Origin) → Separate Cups Distribution (Sharing) → Spatial Buffer Structure (Structure) → Partitioned Autonomous Planes (Autonomy)",
    geometryKeyKr: "찻잎(Origin) → 개별 찻잔 분배(Sharing) → 간격과 완충 구조(Structure) → 분할된 자율 평면(Autonomy)",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1 (Origin)",
        labelKr: "Fig 1 (기원: 차나무와 소비재)",
        descEn: "The branching leaves represent the tea plant. Unlike rice cultivated through communal agrarian labor for immediate survival, tea originated as a commercially distributed commodity that was later integrated into daily life.",
        descKr: "가지에서 뻗어나온 찻잎 형태는 차나무를 의미합니다. 공동의 농경 노동을 통해 생존용으로 생산되던 쌀과 달리, 차는 상업적 유통망을 거쳐 일상에 정착된 소비재로서의 출발점을 지닙니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2 (Sharing)",
        labelKr: "Fig 2 (분배: 사회적 전위 행동)",
        descEn: "The flow pouring from the kettle into separate cups illustrates distribution. Unlike sharing a meal where eating directly determines physical sustenance, offering tea serves as a non-essential social gesture, acting as a displacement activity that eases tension without demanding collective involvement.",
        descKr: "주전자에서 개별 찻잔으로 음료를 따르는 행위를 시각화한 형태입니다. 생존에 직결되는 밥의 나눔과 달리, 기호품인 차를 권하는 행위는 상대방을 집단적 의무로 묶지 않은 채 대면의 어색함을 완화하는 사회적 전위 행동으로 작동합니다.",
      },
      {
        phaseId: 3,
        labelEn: "Fig 3 (Structure)",
        labelKr: "Fig 3 (구조: 물리적 거리와 완충)",
        descEn: "The discrete cups positioned across a surface illustrate the relational structure of tea drinking. Rather than dissolving individual boundaries into an interdependent collective, this ritual connects participants while maintaining measurable spatial distance and personal autonomy.",
        descKr: "일정한 간격을 두고 배치된 개별 찻잔들은 차 문화가 형성하는 관계적 구조를 나타냅니다. 개인 간의 경계를 해체하여 상호 의존적 집단으로 병합하는 식음 문화와 달리, 차는 참여자들의 물리적 거리와 사적 자율성을 보존한 상태에서 관계를 형성합니다.",
      },
      {
        phaseId: 4,
        labelEn: "Fig 4 (Autonomy)",
        labelKr: "Fig 4 (자율성: 분할된 직사각형 영역)",
        descEn: "The partitioned rectangular planes enclosing human figures in separate sections illustrate the structure of personal autonomy. Rather than merging into a collective whole, individuals face each other while remaining centered within their distinct, independent domains.",
        descKr: "분할된 직사각형 평면 안에서 개별 영역을 점유한 인물들은 개인의 자율성을 보존하는 구조를 나타냅니다. 하나의 공동체로 묶이기보다, 각자의 독립된 공간을 중심으로 자리 잡은 상태에서 마주 보며 관계를 형성함을 시각화합니다.",
      },
    ],
    enText:
      "The British 'Tea' ritual developed within an industrialized urban society emphasizing personal privacy. Tea-making serves as a 'displacement activity' (Fox, 2004) that provides a neutral focal point. Across its 4-stage trajectory—Entry ('Fancy a cuppa?'), Maintenance ('We must get together for a tea'), Disapproval ('Not my cup of tea'), and Exclusion ('No tea for you')—'Tea' constructs a regulated buffer that preserves individual autonomy.",
    krText:
      "영국의 '차' 문화는 개인의 사생활을 중시하는 산업화된 도시 환경 속에서 발전했습니다. 차를 끓이고 권하는 행위는 시선과 주의를 찻잔이라는 중립적 사물로 분산시키는 '전위 행동(Displacement activity)'으로 기능합니다. 진입('Fancy a cuppa?') → 유지('We must get together for a tea') → 거부('Not my cup of tea') → 파국('No tea for you')의 궤적을 통해 정중한 거리를 유지한 채 개별적 자율성을 보호합니다.",
    definitionEn:
      "Tea Ritual: A boundary-preserving conversational ritual that uses a neutral physical medium as a polite buffer, enabling social connection while safeguarding individual autonomy.",
    definitionKr:
      "차 의례 (Tea Ritual): 중립적 사물을 매개로 대면의 긴장을 완화하고, 정중한 완충 거리를 유지한 채 개인의 자율성과 사적 경계를 보호하는 대화 의례.",
    svgUrls: [
      "/ch4_svgs/tea_1.svg",
      "/ch4_svgs/tea_2.svg",
      "/ch4_svgs/tea_3.svg",
      "/ch4_svgs/tea_4.svg",
    ],
    bgColors: ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  },
  {
    key: "yes_no_en",
    num: "03",
    sectionBadge: "2-2",
    nameKr: "Yes and No",
    nameEn: "Yes and No",
    bookPageSpan: "P. 216–225",
    geometryKeyEn: "Baseline Polarity (Yes/No) → Downward Negative Question Vector → Autonomous Factual State Reporting",
    geometryKeyKr: "기본 극성(Yes/No) → 부정 질문 하강 벡터 → 화자 중심의 독립적 사실 상태 보고(Autonomous Factual State)",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 1 (Affirmation)",
        labelKr: "Fig 1 (긍정 기준점: Yes / 응)",
        descEn: "The blue node and text denote affirmation. They visualize the baseline where both English 'Yes' and Korean '응' correspond to positive factual states and agreement, indicating the occurrence and confirmation of an action or state.",
        descKr: "청색(Blue) 노드와 텍스트는 긍정을 나타냅니다. 영어의 'Yes'와 한국어의 '응'이 모두 긍정적인 사실 상태 및 동의에 대응하는 기준점을 시각화하며, 행위나 상태의 발생 및 확인을 표시합니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 2 (Negation)",
        labelKr: "Fig 2 (부정 기준점: No / 아니)",
        descEn: "The red node and text denote negation. They visualize the baseline where both English 'No' and Korean '아니' correspond to negative factual states and denial, indicating the non-occurrence and absence of an action or state.",
        descKr: "적색(Red) 노드와 텍스트는 부정을 나타냅니다. 영어의 'No'와 한국어의 '아니'가 모두 부정적인 사실 상태 및 부인에 대응하는 기준점을 시각화하며, 행위나 상태의 미발생 및 결여를 표시합니다.",
      },
      {
        phaseId: 3,
        labelEn: "Fig 3-1 (Question Initiation)",
        labelKr: "Fig 3-1 (부정 질문 발화)",
        descEn: "The downward arrow from the questioner (upper node) to the respondent (lower node) signifies the transmission of a question containing a negative premise (\"Haven't had a coffee yet, have you?\").",
        descKr: "질문자(상단 노드)에서 응답자(하단 노드)로 향하는 화살표는 부정의 전제를 담은 질문(\"Haven't had a coffee yet, have you?\")의 전송을 의미합니다.",
      },
      {
        phaseId: 4,
        labelEn: "Fig 3-2 (Factual State Branching)",
        labelKr: "Fig 3-2 (객관적 사실 상태 분기)",
        descEn: "From the respondent node, evaluation branches into two objective factual states: \"Coffee has been drunk\" (left cyan node) and \"Coffee has not been drunk\" (right pink node).",
        descKr: "응답자 노드에서 행위의 실제 발생 여부에 따라 \"Coffee has been drunk\"(좌측 청록 노드)와 \"Coffee has not been drunk\"(우측 분홍 노드)의 두 객관적 사실 상태로 분기합니다.",
      },
      {
        phaseId: 5,
        labelEn: "Fig 4 (Factual Affirmative Response)",
        labelKr: "Fig 4 (사실 긍정 응답: Yes, I have)",
        descEn: "A response path based on the factual state of an action being performed (\"Coffee has been drunk\"). Independent of the negative grammatical form of the question, it connects to the affirmative \"Yes, I have\" (Blue) based on the speaker's autonomous factual state.",
        descKr: "행위가 수행된 사실 상태(\"Coffee has been drunk\")에 따른 응답 경로입니다. 질문의 부정 문법 형식에 구애받지 않고, 화자 자신의 독립적인 사실 상태에 근거하여 긍정인 \"Yes, I have\"(Blue)로 연결됩니다.",
        cardBg: "#004296",
        cardTitle: "응 Yes",
        cardTextEn:
          "While 'Yes' and '응' fundamentally function as affirmative markers, their reference points diverge in negative questions. English 'Yes' affirms the factual occurrence of the action (\"I have\") independently of the question's polarity.",
        cardTextKr:
          "한국어 화자는 \"안 마셨지?\"라는 부정 질문에 커피를 마셨을 경우, 상대방의 추측을 반박하기 위해 직관적으로 \"아니(마셨어)\"라고 답하기 쉽습니다. 그러나 영어 화법은 질문의 부정 문법 형식이나 상대의 전제와 무관하게, 오직 화자 자신의 사실 상태(\"커피를 마셨음\")만을 독립된 기준으로 삼습니다. 질문자의 추측에 얽매이지 않고 행위가 실제로 발생했으므로 긍정인 \"Yes, I have\"로 연결됩니다.",
      },
      {
        phaseId: 6,
        labelEn: "Fig 5 (Factual Negative Response)",
        labelKr: "Fig 5 (사실 부정 응답: No, I haven't)",
        descEn: "A response path based on the factual state of an action not being performed (\"Coffee has not been drunk\"). Objectively reporting the factual absence within the speaker, it connects to the negative \"No, I haven't\" (Red).",
        descKr: "행위가 미수행된 사실 상태(\"Coffee has not been drunk\")에 따른 응답 경로입니다. 화자 내면의 사실적 결여 상태를 객관적으로 보고하며, 부정인 \"No, I haven't\"(Red)로 연결됩니다.",
        cardBg: "#8c0009",
        cardTitle: "아니 No",
        cardTextEn:
          "While 'No' and '아니' conventionally denote negative refusal, English 'No' reports the absence of action (\"I haven't\") as an autonomous factual state, regardless of the questioner's negative framing.",
        cardTextKr:
          "한국어 화자는 \"안 마셨지?\"라는 물음에 실제로 안 마셨을 경우, 상대방의 부정적 전제가 옳다는 의미에서 직관적으로 \"응(안 마셨어)\"이라고 동의하기 쉽습니다. 그러나 영어 화법은 상대의 생각에 관점을 동기화하지 않고, 화자 내면에 행위가 존재하지 않는다는 사실적 결여 상태(\"커피를 안 마셨음\")를 객관적으로 보고합니다. 질문자의 문장 형식과 상관없이 사실 자체가 부재하므로 부정인 \"No, I haven't\"로 연결됩니다.",
      },
    ],
    enText:
      "In English discourse, answering a negative question (\"Haven't had a coffee yet, have you?\") is oriented toward the objective reality of the speaker's own action, regardless of the grammatical framing of the question. The response prioritizes reporting an autonomous factual state centered on the speaker.",
    krText:
      "영미권 화법에서는 질문의 긍정·부정 형식과 무관하게 화자 자신의 객관적인 사실 상태를 독립적인 기준으로 삼습니다. 질문자의 표현 형식에 얽매이지 않고 개인의 독립된 사실('마셨으면 Yes', '안 마셨으면 No')을 전달하는 데 초점을 둡니다.",
    definitionEn:
      "Autonomous Factual Orientation (English): A response mechanism that anchors 'Yes' and 'No' strictly to the positive or negative polarity of the speaker's factual action.",
    definitionKr:
      "독립적 사실 기준 응답 (영어): 질문자의 전제나 문법적 부정 형식과 무관하게, 화자 자신의 실제 행위 발생 유무만을 기준으로 'Yes'와 'No'를 결정하는 응답 체계.",
    svgUrls: [
      "/ch4_svgs/yes_1.svg",
      "/ch4_svgs/no_2.svg",
      "/ch4_svgs/en_q_3a.svg",
      "/ch4_svgs/en_q_3b.svg",
      "/ch4_svgs/en_yes_4.svg",
      "/ch4_svgs/en_no_5.svg",
    ],
    bgColors: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  },
  {
    key: "yes_no_kr",
    num: "04",
    sectionBadge: "2-2",
    nameKr: "응과 아니",
    nameEn: "Eung and Ani",
    bookPageSpan: "P. 226–231",
    geometryKeyEn: "Downward Negative Question Vector (\"커피 안 마셨지?\") → Premise Validity Evaluation → Perspective-Aligned Response",
    geometryKeyKr: "부정 질문 하강 벡터(\"커피 안 마셨지?\") → 상대방의 전제 타당성 검증 → 관점 동기화 응답(Premise Alignment)",
    phases: [
      {
        phaseId: 1,
        labelEn: "Fig 6-1 (Question Initiation)",
        labelKr: "Fig 6-1 (부정 질문 발화: 커피 안 마셨지?)",
        descEn: "The downward arrow from the questioner (upper node) to the respondent (lower node) signifies the transmission of a question containing a negative premise (\"커피 안 마셨지?\").",
        descKr: "질문자(상단 노드)에서 응답자(하단 노드)로 향하는 화살표는 부정의 전제를 담은 질문(\"커피 안 마셨지?\")의 전송을 의미합니다.",
      },
      {
        phaseId: 2,
        labelEn: "Fig 6-2 (Premise Evaluation Branching)",
        labelKr: "Fig 6-2 (상대 전제와 사실의 대조 분기)",
        descEn: "From the respondent node, evaluation compares the interlocutor's negative premise against the factual branches (\"Coffee has been drunk\" vs \"Coffee has not been drunk\").",
        descKr: "응답자 노드에서 상대방이 제시한 부정 전제를 두 가지 실제 사실 상태(\"Coffee has been drunk\" vs \"Coffee has not been drunk\")와 대조합니다.",
      },
      {
        phaseId: 3,
        labelEn: "Fig 7 (Premise Denial Response)",
        labelKr: "Fig 7 (전제 부정 응답: 아니 / Wrong, I have)",
        descEn: "A response path based on the factual state of an action being performed (\"Coffee has been drunk\"). Unlike English, which responds with \"Yes\" based purely on the speaker's fact, Korean prioritizes the interlocutor's negative premise; rejecting the premise as incorrect leads to \"아니 (Wrong, I have)\" (Blue).",
        descKr: "행위가 수행된 사실 상태(\"커피 마심\")에 따른 응답 경로입니다. 자신의 사실에만 근거해 \"Yes\"로 응답하는 영어와 달리, 한국어는 상대의 부정 전제를 우선하여 그 가설이 틀렸음을 지적하는 반대 방향의 부정어 \"아니 (Wrong, I have)\"(Blue)로 연결됩니다.",
        cardBg: "#8c0009",
        cardTitle: "아니 No",
        cardTextEn:
          "While 'No' and '아니' conventionally denote negative refusal, English 'No' reports the absence of action (\"I haven't\") as an autonomous factual state. In contrast, Korean '아니' rejects the interlocutor's negative premise (\"Wrong, I did\"), thereby indicating that the action indeed occurred. Thus, the identical negative marker signals the absence of an action in one language, but its positive realization in the other.",
        cardTextKr:
          "'No'와 '아니'는 기본적으로 부정을 뜻하지만, 영어의 'No'가 행위의 부재(\"안 마셨다\")를 독립된 사실로 보고하는 반면, 한국어의 '아니'는 상대방의 부정 전제가 틀렸음(\"아니, 마셨어\")을 반박하여 오히려 행위가 실제로 발생했음을 나타냅니다. 결과적으로 동일한 부정 표지가 한 언어에서는 행위의 부재를, 다른 언어에서는 행위의 긍정적 실현을 가리킵니다.",
      },
      {
        phaseId: 4,
        labelEn: "Fig 8 (Premise Validation Response)",
        labelKr: "Fig 8 (전제 긍정 응답: 응 / Right, I haven't)",
        descEn: "A response path based on the factual state of an action not being performed (\"Coffee has not been drunk\"). Unlike English, which responds with \"No\" to report the absence of fact, Korean aligns with the interlocutor's negative premise; confirming the premise as correct leads to the affirmative \"응 (Right, I haven't)\" (Red).",
        descKr: "행위가 미수행된 사실 상태(\"커피 안 마심\")에 따른 응답 경로입니다. 사실의 부재를 \"No\"로 응답하는 영어와 달리, 한국어는 상대의 부정 추측이 맞았음을 승인하는 상대 동조의 관점을 취해 긍정어인 \"응 (Right, I haven't)\"(Red)으로 연결됩니다.",
        cardBg: "#004296",
        cardTitle: "응 Yes",
        cardTextEn:
          "While 'Yes' and '응' fundamentally function as affirmative markers, their reference points diverge in negative questions. English 'Yes' affirms the factual occurrence of the action (\"I have\") independently of the question's polarity. Conversely, Korean '응' validates that the interlocutor's negative assumption is correct (\"Right, I haven't\"). Consequently, the identical affirmative marker corresponds to opposite factual states.",
        cardTextKr:
          "'Yes'와 '응'은 기본적으로 긍정의 표지로 기능하지만, 부정의문문에서는 그 준거점이 갈라집니다. 영어의 'Yes'가 질문의 극성과 무관하게 행위의 실제 발생(\"마셨다\")을 긍정하는 반면, 한국어의 '응'은 상대방의 부정적 추측이 맞았음(\"응, 안 마셨어\")을 승인합니다. 결과적으로 동일한 긍정 표지가 정반대의 사실 상태에 대응합니다.",
      },
    ],
    enText:
      "In Korean discourse, the answer evaluates whether the speaker agrees with the listener's assumption first. To the question \"커피 안 마셨지?\" (Haven't had a coffee yet?), the conventional answer when one hasn't drunk coffee is \"응, 안 마셨어\" (Right, I haven't), prioritizing perspective synchronization with the interlocutor before confirming the factual detail.",
    krText:
      "한국어 화법에서는 상대방이 제시한 생각이나 추측에 동의하는지 여부를 우선적인 기준으로 삼습니다. \"커피 안 마셨지?\"라는 물음에 \"응, 안 마셨어\"라고 답할 때, '응'은 상대방의 전제가 맞다는 점을 먼저 인정하고 시점을 일치시키는 역할을 합니다. 사실 관계를 보고하기에 앞서 대화 상대와의 관점 동기화를 먼저 거치는 구조입니다.",
    definitionEn:
      "Interlocutor Premise Alignment (Korean): A relational response mechanism that anchors '응 (Yes)' and '아니 (No)' to the validity of the questioner's assumption rather than isolated factual polarity.",
    definitionKr:
      "상대 전제 동조 기준 응답 (한국어): 사실 관계를 단독으로 보고하기에 앞서, 질문자가 제시한 전제(추측)에 동의하는지 여부를 기준으로 '응'과 '아니'를 결정하는 관계 중심적 응답 체계.",
    svgUrls: [
      "/ch4_svgs/kr_q_6a.svg",
      "/ch4_svgs/kr_q_6b.svg",
      "/ch4_svgs/kr_no_7.svg",
      "/ch4_svgs/kr_yes_8.svg",
    ],
    bgColors: ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  },
];

const ch4SvgCache: Record<string, string> = {};

export default function Chapter4Instrument({ lang = "en" }: { lang?: "en" | "kr" }) {
  const [selectedKey, setSelectedKey] = useState<Ch4ConceptKey>("bap");
  const [tick, setTick] = useState(0);
  const [manualPhaseIndex, setManualPhaseIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [cachedSvgs, setCachedSvgs] = useState<Record<string, string>>({});

  const concept = CHAPTER4_CONCEPTS.find((c) => c.key === selectedKey) || CHAPTER4_CONCEPTS[0];
  const activePhaseIndex = manualPhaseIndex !== null ? manualPhaseIndex : (tick % concept.phases.length);
  const currentPhase = concept.phases[activePhaseIndex] || concept.phases[0];

  useEffect(() => {
    let isMounted = true;
    const allUrls = CHAPTER4_CONCEPTS.flatMap((c) => c.svgUrls);
    Promise.all(
      allUrls.map(async (url) => {
        if (ch4SvgCache[url]) return { url, data: ch4SvgCache[url] };
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const text = await res.text();
          ch4SvgCache[url] = text;
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const handleTileClick = (key: Ch4ConceptKey) => {
    setSelectedKey(key);
    setManualPhaseIndex(null);
    setIsExpanded(true);
  };

  const renderDiagram = (c: Ch4ConceptData, phaseIdx: number) => {
    const activeIdx = phaseIdx % c.svgUrls.length;
    return (
      <div className={styles.phaseContentWrapper} style={{ backgroundColor: "transparent" }}>
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
  };

  return (
    <div className={styles.instrumentWrapper}>
      {/* ── Top Bar: Title ───────────────────── */}
      <div className={styles.topBar}>
        <div className={styles.titleRow}>
          <div className={styles.instrumentMeta}>
            <span className={styles.instrumentCategory}>Chapter 04 / Instrument</span>
            <h3 className={styles.instrumentTitle}>
              {lang === "en"
                ? "Conversational Rituals & Dialogue Perspectives"
                : "대화 의례와 소통의 관점"}
            </h3>
          </div>
        </div>
      </div>

      {/* ── Main Stage: 80vh Diagram Area with Text Below ────────── */}
      <div className={styles.mainStage}>
        <div className={styles.stageHeader}>
          <div className={styles.captionBar}>
            <div className={styles.captionLeft}>
              <span className={styles.figureCaption}>
                {isExpanded
                  ? `${concept.sectionBadge}. ${lang === "en" ? concept.nameEn : concept.nameKr} — ${lang === "en" ? currentPhase.labelEn : currentPhase.labelKr}`
                  : (lang === "en"
                      ? "2-1 & 2-2. Culinary Rituals (Bap/Tea) & Answering Perspectives (Yes/No)"
                      : "2-1 & 2-2. 식음 의례(밥/차)와 대답의 관점(응/아니)")}
              </span>
              <span className={styles.bookRefBadge}>
                Ref. book {isExpanded ? concept.bookPageSpan : "P. 206–231"}
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

        {/* Center: Diagram Area (Seamless 4-concept tiles overview OR Expanded 80vh slide) */}
        <div className={styles.diagramArea}>
          {!isExpanded ? (
            <div className={styles.tilesContainer}>
              {CHAPTER4_CONCEPTS.map((c) => {
                const curPhase = tick % c.phases.length;
                const isYesNo = c.key === "yes_no_en" || c.key === "yes_no_kr";
                return (
                  <div
                    key={c.key}
                    className={styles.tileItem}
                    style={{
                      backgroundColor: "#ffffff",
                    }}
                    onClick={() => handleTileClick(c.key)}
                    role="button"
                    tabIndex={0}
                    title={`${lang === "en" ? c.nameEn : c.nameKr} (Click to expand)`}
                  >
                    <div
                      className={styles.tileInner}
                      style={isYesNo ? { transform: "scale(0.75) translateY(-4%)" } : undefined}
                    >
                      {renderDiagram(c, curPhase)}
                    </div>
                    <div className={styles.tileLabel}>
                      <span className={styles.tileLabelText} style={{ color: "#7c7c7c" }}>
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
              style={{ backgroundColor: "#ffffff" }}
              onClick={() => setIsExpanded(false)}
              role="button"
              tabIndex={0}
              title={lang === "en" ? "Click to return to all tiles" : "클릭하여 전체 타일로 복귀"}
            >
              {renderDiagram(concept, activePhaseIndex)}
              <div className={styles.collapseHint}>
                <span>{lang === "en" ? "View all tiles" : "전체 타일 보기"}</span>
              </div>
            </div>
          )}
        </div>

        {/* Below Image: Detailed explanation & PDF polarity comparison card when expanded */}
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
                      onClick={() => setManualPhaseIndex(idx)}
                      title={lang === "en" ? ph.labelEn : ph.labelKr}
                    >
                      0{ph.phaseId}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {currentPhase.cardBg && (
              <div
                style={{
                  backgroundColor: currentPhase.cardBg,
                  color: "#ffffff",
                  padding: "1.5rem 1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  lineHeight: 1.45,
                }}
              >
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#70a7ff" }}>
                  {currentPhase.cardTitle}
                </div>
                <p style={{ margin: 0, fontSize: "16px", fontWeight: 400, color: "#dcdcdc", lineHeight: 1.45 }}>
                  {lang === "en" ? currentPhase.cardTextEn : currentPhase.cardTextKr}
                </p>
              </div>
            )}

            <div className={styles.geometryKeyBlock}>
              <span className={styles.geometryKeyLabel}>
                {lang === "en" ? "Geometry mapping" : "도형 기하 구조"}
              </span>
              <span>{lang === "en" ? concept.geometryKeyEn : concept.geometryKeyKr}</span>
            </div>

            <div className={styles.textSection}>
              <span className={styles.sectionLabel}>
                {lang === "en" ? "Active phase rationale" : "단계별 기제"}
              </span>
              <p className={lang === "en" ? styles.descEn : styles.descKr}>
                {lang === "en" ? currentPhase.descEn : currentPhase.descKr}
              </p>
            </div>

            <div className={styles.textSection}>
              <span className={styles.sectionLabel}>
                {lang === "en" ? "Pragmatic context" : "비교화용론적 맥락"}
              </span>
              <p className={lang === "en" ? styles.contextEn : styles.contextKr}>
                {lang === "en" ? concept.enText : concept.krText}
              </p>
            </div>

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
