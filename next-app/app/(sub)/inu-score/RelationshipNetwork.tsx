'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FONT = '"Pretendard Variable", "Pretendard", sans-serif';

interface Person {
    id: string;
    name: string;
    faction: 'wei' | 'shu' | 'wu' | 'neutral';
    x: number;
    y: number;
    role: string;
}

interface Relation {
    from: string;
    to: string;
    type: 'rivalry' | 'alliance' | 'strategist' | 'loyalty';
}

const COLORS: Record<string, string> = {
    wei: '#2962ff',
    shu: '#d50000',
    wu: '#00c853',
    neutral: '#78909c',
};

const EDGE_STYLES: Record<string, { color: string; dash: string; label: string }> = {
    rivalry: { color: '#e53935', dash: 'none', label: 'Rivalry' },
    alliance: { color: '#43a047', dash: 'none', label: 'Alliance' },
    strategist: { color: '#1565c0', dash: '6 3', label: 'Strategist for' },
    loyalty: { color: '#8e24aa', dash: '3 3', label: 'Loyalty' },
};

const PEOPLE: Person[] = [
    { "id": "caocao", "name": "Cao Cao", "faction": "wei", "x": 682, "y": 99, "role": "Warlord / King of Wei" },
    { "id": "caopi", "name": "Cao Pi", "faction": "wei", "x": 828, "y": 56, "role": "First Emperor of Wei" },
    { "id": "caorui", "name": "Cao Rui", "faction": "wei", "x": 937, "y": 85, "role": "Second Emperor of Wei" },
    { "id": "simayi", "name": "Sima Yi", "faction": "wei", "x": 773, "y": 200, "role": "Grand Commander / Final Victor" },
    { "id": "simashi", "name": "Sima Shi", "faction": "wei", "x": 864, "y": 257, "role": "General / Power Broker" },
    { "id": "simazhao", "name": "Sima Zhao", "faction": "wei", "x": 955, "y": 285, "role": "King of Jin / Conqueror of Shu" },
    { "id": "xunyu", "name": "Xun Yu", "faction": "wei", "x": 500, "y": 56, "role": "Chief Strategist" },
    { "id": "xunyou", "name": "Xun You", "faction": "wei", "x": 409, "y": 85, "role": "Tactical Advisor" },
    { "id": "jiaxu", "name": "Jia Xu", "faction": "wei", "x": 464, "y": 2, "role": "Pragmatic Strategist" },
    { "id": "guojia", "name": "Guo Jia", "faction": "wei", "x": 591, "y": 14, "role": "Brilliant Advisor" },
    { "id": "chengyu", "name": "Cheng Yu", "faction": "wei", "x": 355, "y": 28, "role": "Resolute Advisor" },
    { "id": "xiahoudun", "name": "Xiahou Dun", "faction": "wei", "x": 828, "y": 2, "role": "Trusted General" },
    { "id": "xiahouyuan", "name": "Xiahou Yuan", "faction": "wei", "x": 755, "y": -13, "role": "Western Commander" },
    { "id": "zhangliao", "name": "Zhang Liao", "faction": "wei", "x": 646, "y": -13, "role": "Hero of Hefei" },
    { "id": "xuhuang", "name": "Xu Huang", "faction": "wei", "x": 901, "y": -13, "role": "Disciplined General" },
    { "id": "zhanghe", "name": "Zhang He", "faction": "wei", "x": 974, "y": 14, "role": "Adaptable General" },
    { "id": "dianwei", "name": "Dian Wei", "faction": "wei", "x": 537, "y": -13, "role": "Bodyguard" },
    { "id": "dengai", "name": "Deng Ai", "faction": "wei", "x": 1046, "y": 142, "role": "Conqueror of Shu" },
    { "id": "zhonghui", "name": "Zhong Hui", "faction": "wei", "x": 1083, "y": 214, "role": "Commander against Shu" },
    { "id": "zhongyao", "name": "Zhong Yao", "faction": "wei", "x": 591, "y": -13, "role": "Administrator / Calligrapher" },
    { "id": "liubei", "name": "Liu Bei", "faction": "shu", "x": 227, "y": 385, "role": "Founder of Shu Han" },
    { "id": "liushan", "name": "Liu Shan", "faction": "shu", "x": 100, "y": 428, "role": "Second Emperor of Shu" },
    { "id": "zhugeliang", "name": "Zhuge Liang", "faction": "shu", "x": 409, "y": 428, "role": "Chancellor / Strategist" },
    { "id": "guanyu", "name": "Guan Yu", "faction": "shu", "x": 45, "y": 343, "role": "God of War / Sworn Brother" },
    { "id": "zhangfei", "name": "Zhang Fei", "faction": "shu", "x": 100, "y": 300, "role": "Fierce General / Sworn Brother" },
    { "id": "zhaoyun", "name": "Zhao Yun", "faction": "shu", "x": -9, "y": 385, "role": "Loyal General" },
    { "id": "machao", "name": "Ma Chao", "faction": "shu", "x": -82, "y": 343, "role": "Western Cavalry Commander" },
    { "id": "huangzhong", "name": "Huang Zhong", "faction": "shu", "x": -46, "y": 285, "role": "Veteran General" },
    { "id": "weiyan", "name": "Wei Yan", "faction": "shu", "x": 282, "y": 486, "role": "Vanguard General" },
    { "id": "jiangwei", "name": "Jiang Wei", "faction": "shu", "x": 355, "y": 528, "role": "Zhuge Liang's Successor" },
    { "id": "pangtong", "name": "Pang Tong", "faction": "shu", "x": 318, "y": 314, "role": "Fledgling Phoenix" },
    { "id": "fazheng", "name": "Fa Zheng", "faction": "shu", "x": 173, "y": 285, "role": "Master Tactician" },
    { "id": "feiyi", "name": "Fei Yi", "faction": "shu", "x": 227, "y": 528, "role": "Administrator" },
    { "id": "jiangwan", "name": "Jiang Wan", "faction": "shu", "x": 136, "y": 528, "role": "Administrator" },
    { "id": "maliang", "name": "Ma Liang", "faction": "shu", "x": 464, "y": 486, "role": "Diplomat / Advisor" },
    { "id": "sunjian", "name": "Sun Jian", "faction": "wu", "x": 1137, "y": 428, "role": "Tiger of Jiangdong" },
    { "id": "sunce", "name": "Sun Ce", "faction": "wu", "x": 1228, "y": 371, "role": "Little Conqueror" },
    { "id": "sunquan", "name": "Sun Quan", "faction": "wu", "x": 1046, "y": 343, "role": "Emperor of Wu" },
    { "id": "zhouyu", "name": "Zhou Yu", "faction": "wu", "x": 901, "y": 385, "role": "Grand Commander / Red Cliffs" },
    { "id": "lusu", "name": "Lu Su", "faction": "wu", "x": 955, "y": 457, "role": "Diplomat / Strategist" },
    { "id": "lumeng", "name": "Lu Meng", "faction": "wu", "x": 1083, "y": 486, "role": "Commander / Captor of Guan Yu" },
    { "id": "luxun", "name": "Lu Xun", "faction": "wu", "x": 1192, "y": 486, "role": "Victor of Yiling" },
    { "id": "ganning", "name": "Gan Ning", "faction": "wu", "x": 1265, "y": 314, "role": "Fierce Vanguard" },
    { "id": "taishici", "name": "Taishi Ci", "faction": "wu", "x": 1319, "y": 371, "role": "Loyal Warrior" },
    { "id": "huanggai", "name": "Huang Gai", "faction": "wu", "x": 1335, "y": 428, "role": "Veteran of Red Cliffs" },
    { "id": "zhangzhao", "name": "Zhang Zhao", "faction": "wu", "x": 1010, "y": 285, "role": "Chief Civil Minister" },
    { "id": "lukang", "name": "Lu Kang", "faction": "wu", "x": 1265, "y": 535, "role": "Last Great Commander" },
    { "id": "dongzhuo", "name": "Dong Zhuo", "faction": "neutral", "x": 45, "y": 99, "role": "Tyrant" },
    { "id": "lbu", "name": "Lü Bu", "faction": "neutral", "x": -95, "y": 142, "role": "Flying General" },
    { "id": "yuanshao", "name": "Yuan Shao", "faction": "neutral", "x": 318, "y": -11, "role": "Lord of Hebei" }
];

const RELATIONS: Relation[] = [
    {
        "from": "caocao",
        "to": "liubei",
        "type": "rivalry"
    },
    {
        "from": "caocao",
        "to": "sunquan",
        "type": "rivalry"
    },
    {
        "from": "caocao",
        "to": "yuanshao",
        "type": "rivalry"
    },
    {
        "from": "liubei",
        "to": "sunquan",
        "type": "alliance"
    },
    {
        "from": "simayi",
        "to": "zhugeliang",
        "type": "rivalry"
    },
    {
        "from": "zhouyu",
        "to": "zhugeliang",
        "type": "rivalry"
    },
    {
        "from": "guanyu",
        "to": "lumeng",
        "type": "rivalry"
    },
    {
        "from": "liubei",
        "to": "luxun",
        "type": "rivalry"
    },
    {
        "from": "lbu",
        "to": "dongzhuo",
        "type": "loyalty"
    },
    {
        "from": "lbu",
        "to": "liubei",
        "type": "rivalry"
    },
    {
        "from": "lbu",
        "to": "caocao",
        "type": "rivalry"
    },
    {
        "from": "xunyu",
        "to": "caocao",
        "type": "strategist"
    },
    {
        "from": "guojia",
        "to": "caocao",
        "type": "strategist"
    },
    {
        "from": "jiaxu",
        "to": "caocao",
        "type": "strategist"
    },
    {
        "from": "xunyou",
        "to": "caocao",
        "type": "strategist"
    },
    {
        "from": "simayi",
        "to": "caopi",
        "type": "strategist"
    },
    {
        "from": "zhugeliang",
        "to": "liubei",
        "type": "strategist"
    },
    {
        "from": "pangtong",
        "to": "liubei",
        "type": "strategist"
    },
    {
        "from": "fazheng",
        "to": "liubei",
        "type": "strategist"
    },
    {
        "from": "zhouyu",
        "to": "sunquan",
        "type": "strategist"
    },
    {
        "from": "lusu",
        "to": "sunquan",
        "type": "strategist"
    },
    {
        "from": "lumeng",
        "to": "sunquan",
        "type": "loyalty"
    },
    {
        "from": "luxun",
        "to": "sunquan",
        "type": "strategist"
    },
    {
        "from": "guanyu",
        "to": "liubei",
        "type": "loyalty"
    },
    {
        "from": "zhangfei",
        "to": "liubei",
        "type": "loyalty"
    },
    {
        "from": "zhaoyun",
        "to": "liubei",
        "type": "loyalty"
    },
    {
        "from": "machao",
        "to": "liubei",
        "type": "loyalty"
    },
    {
        "from": "huangzhong",
        "to": "liubei",
        "type": "loyalty"
    },
    {
        "from": "weiyan",
        "to": "liubei",
        "type": "loyalty"
    },
    {
        "from": "jiangwei",
        "to": "zhugeliang",
        "type": "loyalty"
    },
    {
        "from": "xiahoudun",
        "to": "caocao",
        "type": "loyalty"
    },
    {
        "from": "xiahouyuan",
        "to": "caocao",
        "type": "loyalty"
    },
    {
        "from": "zhangliao",
        "to": "caocao",
        "type": "loyalty"
    },
    {
        "from": "dianwei",
        "to": "caocao",
        "type": "loyalty"
    },
    {
        "from": "zhanghe",
        "to": "caocao",
        "type": "loyalty"
    },
    {
        "from": "xuhuang",
        "to": "caocao",
        "type": "loyalty"
    },
    {
        "from": "sunce",
        "to": "sunjian",
        "type": "loyalty"
    },
    {
        "from": "sunquan",
        "to": "sunce",
        "type": "loyalty"
    },
    {
        "from": "ganning",
        "to": "sunquan",
        "type": "loyalty"
    },
    {
        "from": "huanggai",
        "to": "sunquan",
        "type": "loyalty"
    },
    {
        "from": "taishici",
        "to": "sunce",
        "type": "loyalty"
    },
    {
        "from": "zhangzhao",
        "to": "sunquan",
        "type": "strategist"
    },
    {
        "from": "lukang",
        "to": "sunquan",
        "type": "loyalty"
    },
    {
        "from": "dengai",
        "to": "simazhao",
        "type": "loyalty"
    },
    {
        "from": "zhonghui",
        "to": "simazhao",
        "type": "loyalty"
    }
];

export default function RelationshipNetwork() {
    const [hoveredPerson, setHoveredPerson] = useState<string | null>(null);

    const personMap = Object.fromEntries(PEOPLE.map(p => [p.id, p]));

    const isConnected = (personId: string) => {
        if (!hoveredPerson) return true;
        if (personId === hoveredPerson) return true;
        return RELATIONS.some(r =>
            (r.from === hoveredPerson && r.to === personId) ||
            (r.to === hoveredPerson && r.from === personId)
        );
    };

    const isEdgeConnected = (rel: Relation) => {
        if (!hoveredPerson) return true;
        return rel.from === hoveredPerson || rel.to === hoveredPerson;
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4vh 4vw', fontFamily: FONT, backgroundColor: 'transparent' }}>
            
            {/* Header / Text positioned at bottom left */}
            <div style={{ position: 'absolute', bottom: '4vh', left: '4vw', textAlign: 'left', zIndex: 10 }}>
                <h3 style={{ fontFamily: FONT, fontSize: '1.2rem', margin: 0, fontWeight: 400, color: '#3e3129' }}>
                    Character Relationship Network
                </h3>
                <p style={{ fontFamily: FONT, fontSize: '0.85rem', color: '#6a5a4a', margin: '0.5rem 0 0 0', fontWeight: 400 }}>
                    Hover to highlight connections — alliances, rivalries, and strategist ties
                </p>
                {/* Legend */}
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.7rem', fontFamily: FONT, fontWeight: 400 }}>
                    {Object.entries(EDGE_STYLES).map(([key, val]) => (
                        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="20" height="10"><line x1="0" y1="5" x2="20" y2="5" stroke={val.color} strokeWidth="2" strokeDasharray={val.dash} /></svg>
                            <span style={{ color: '#998f82' }}>{val.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ width: '100%', maxWidth: '1000px', height: '600px', position: 'relative', overflow: 'visible', background: 'transparent', zIndex: 1 }}>
                <svg width="100%" height="100%" viewBox="-150 -100 1600 750" preserveAspectRatio="xMidYMid meet">
                    {/* Edges */}
                    {RELATIONS.map((rel, i) => {
                        const from = personMap[rel.from];
                        const to = personMap[rel.to];
                        if (!from || !to) return null;
                        const style = EDGE_STYLES[rel.type];
                        const connected = isEdgeConnected(rel);
                        return (
                            <motion.line
                                key={i}
                                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                                stroke={style.color}
                                strokeWidth={connected && hoveredPerson ? 2.5 : 1.5}
                                strokeDasharray={style.dash}
                                opacity={connected ? (hoveredPerson ? 0.8 : 0.3) : 0.05}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: i * 0.05 }}
                                style={{ transition: 'opacity 0.3s, stroke-width 0.3s' }}
                            />
                        );
                    })}

                    {/* Nodes */}
                    {PEOPLE.map((person, i) => {
                        const connected = isConnected(person.id);
                        const isHovered = hoveredPerson === person.id;
                        return (
                            <g
                                key={person.id}
                                style={{ cursor: 'pointer' }}
                                onMouseEnter={() => setHoveredPerson(person.id)}
                                onMouseLeave={() => setHoveredPerson(null)}
                            >
                                <motion.circle
                                    cx={person.x} cy={person.y}
                                    r={isHovered ? 18 : 14}
                                    fill={COLORS[person.faction]}
                                    opacity={connected ? (isHovered ? 1 : 0.7) : 0.1}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    style={{ transition: 'opacity 0.3s' }}
                                />
                                <text
                                    x={person.x} y={person.y + 30}
                                    textAnchor="middle" fill={connected ? '#333' : '#ddd'}
                                    fontSize="11" fontFamily={FONT} fontWeight="400"
                                    style={{ transition: 'fill 0.3s' }}
                                >
                                    {person.name}
                                </text>

                                {/* Role tooltip on hover */}
                                {isHovered && (
                                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <rect x={person.x - 80} y={person.y - 40} width="160" height="22" rx="4" fill="#fff" stroke="#eee" />
                                        <text x={person.x} y={person.y - 25} textAnchor="middle" fill="#666" fontSize="9" fontFamily={FONT} fontWeight="400">
                                            {person.role}
                                        </text>
                                    </motion.g>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
