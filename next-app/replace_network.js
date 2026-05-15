const fs = require('fs');

const people = [
    { id: 'caocao', name: 'Cao Cao', faction: 'wei', x: 600, y: 150, role: 'Warlord / King of Wei' },
    { id: 'caopi', name: 'Cao Pi', faction: 'wei', x: 680, y: 120, role: 'First Emperor of Wei' },
    { id: 'caorui', name: 'Cao Rui', faction: 'wei', x: 740, y: 140, role: 'Second Emperor of Wei' },
    { id: 'simayi', name: 'Sima Yi', faction: 'wei', x: 650, y: 220, role: 'Grand Commander / Final Victor' },
    { id: 'simashi', name: 'Sima Shi', faction: 'wei', x: 700, y: 260, role: 'General / Power Broker' },
    { id: 'simazhao', name: 'Sima Zhao', faction: 'wei', x: 750, y: 280, role: 'King of Jin / Conqueror of Shu' },
    { id: 'xunyu', name: 'Xun Yu', faction: 'wei', x: 500, y: 120, role: 'Chief Strategist' },
    { id: 'xunyou', name: 'Xun You', faction: 'wei', x: 450, y: 140, role: 'Tactical Advisor' },
    { id: 'jiaxu', name: 'Jia Xu', faction: 'wei', x: 480, y: 80, role: 'Pragmatic Strategist' },
    { id: 'guojia', name: 'Guo Jia', faction: 'wei', x: 550, y: 90, role: 'Brilliant Advisor' },
    { id: 'chengyu', name: 'Cheng Yu', faction: 'wei', x: 420, y: 100, role: 'Resolute Advisor' },
    { id: 'xiahoudun', name: 'Xiahou Dun', faction: 'wei', x: 680, y: 80, role: 'Trusted General' },
    { id: 'xiahouyuan', name: 'Xiahou Yuan', faction: 'wei', x: 640, y: 60, role: 'Western Commander' },
    { id: 'zhangliao', name: 'Zhang Liao', faction: 'wei', x: 580, y: 50, role: 'Hero of Hefei' },
    { id: 'xuhuang', name: 'Xu Huang', faction: 'wei', x: 720, y: 60, role: 'Disciplined General' },
    { id: 'zhanghe', name: 'Zhang He', faction: 'wei', x: 760, y: 90, role: 'Adaptable General' },
    { id: 'dianwei', name: 'Dian Wei', faction: 'wei', x: 520, y: 60, role: 'Bodyguard' },
    { id: 'dengai', name: 'Deng Ai', faction: 'wei', x: 800, y: 180, role: 'Conqueror of Shu' },
    { id: 'zhonghui', name: 'Zhong Hui', faction: 'wei', x: 820, y: 230, role: 'Commander against Shu' },
    { id: 'zhongyao', name: 'Zhong Yao', faction: 'wei', x: 550, y: 50, role: 'Administrator / Calligrapher' },
    { id: 'liubei', name: 'Liu Bei', faction: 'shu', x: 350, y: 350, role: 'Founder of Shu Han' },
    { id: 'liushan', name: 'Liu Shan', faction: 'shu', x: 280, y: 380, role: 'Second Emperor of Shu' },
    { id: 'zhugeliang', name: 'Zhuge Liang', faction: 'shu', x: 450, y: 380, role: 'Chancellor / Strategist' },
    { id: 'guanyu', name: 'Guan Yu', faction: 'shu', x: 250, y: 320, role: 'God of War / Sworn Brother' },
    { id: 'zhangfei', name: 'Zhang Fei', faction: 'shu', x: 280, y: 290, role: 'Fierce General / Sworn Brother' },
    { id: 'zhaoyun', name: 'Zhao Yun', faction: 'shu', x: 220, y: 350, role: 'Loyal General' },
    { id: 'machao', name: 'Ma Chao', faction: 'shu', x: 180, y: 320, role: 'Western Cavalry Commander' },
    { id: 'huangzhong', name: 'Huang Zhong', faction: 'shu', x: 200, y: 280, role: 'Veteran General' },
    { id: 'weiyan', name: 'Wei Yan', faction: 'shu', x: 380, y: 420, role: 'Vanguard General' },
    { id: 'jiangwei', name: 'Jiang Wei', faction: 'shu', x: 420, y: 450, role: 'Zhuge Liang\'s Successor' },
    { id: 'pangtong', name: 'Pang Tong', faction: 'shu', x: 400, y: 300, role: 'Fledgling Phoenix' },
    { id: 'fazheng', name: 'Fa Zheng', faction: 'shu', x: 320, y: 280, role: 'Master Tactician' },
    { id: 'feiyi', name: 'Fei Yi', faction: 'shu', x: 350, y: 450, role: 'Administrator' },
    { id: 'jiangwan', name: 'Jiang Wan', faction: 'shu', x: 300, y: 450, role: 'Administrator' },
    { id: 'maliang', name: 'Ma Liang', faction: 'shu', x: 480, y: 420, role: 'Diplomat / Advisor' },
    { id: 'sunjian', name: 'Sun Jian', faction: 'wu', x: 850, y: 380, role: 'Tiger of Jiangdong' },
    { id: 'sunce', name: 'Sun Ce', faction: 'wu', x: 900, y: 340, role: 'Little Conqueror' },
    { id: 'sunquan', name: 'Sun Quan', faction: 'wu', x: 800, y: 320, role: 'Emperor of Wu' },
    { id: 'zhouyu', name: 'Zhou Yu', faction: 'wu', x: 720, y: 350, role: 'Grand Commander / Red Cliffs' },
    { id: 'lusu', name: 'Lu Su', faction: 'wu', x: 750, y: 400, role: 'Diplomat / Strategist' },
    { id: 'lumeng', name: 'Lu Meng', faction: 'wu', x: 820, y: 420, role: 'Commander / Captor of Guan Yu' },
    { id: 'luxun', name: 'Lu Xun', faction: 'wu', x: 880, y: 420, role: 'Victor of Yiling' },
    { id: 'ganning', name: 'Gan Ning', faction: 'wu', x: 920, y: 300, role: 'Fierce Vanguard' },
    { id: 'taishici', name: 'Taishi Ci', faction: 'wu', x: 950, y: 340, role: 'Loyal Warrior' },
    { id: 'huanggai', name: 'Huang Gai', faction: 'wu', x: 960, y: 380, role: 'Veteran of Red Cliffs' },
    { id: 'zhangzhao', name: 'Zhang Zhao', faction: 'wu', x: 780, y: 280, role: 'Chief Civil Minister' },
    { id: 'lukang', name: 'Lu Kang', faction: 'wu', x: 920, y: 460, role: 'Last Great Commander' },
    { id: 'dongzhuo', name: 'Dong Zhuo', faction: 'neutral', x: 250, y: 150, role: 'Tyrant' },
    { id: 'lbu', name: 'Lü Bu', faction: 'neutral', x: 150, y: 180, role: 'Flying General' },
    { id: 'yuanshao', name: 'Yuan Shao', faction: 'neutral', x: 400, y: 50, role: 'Lord of Hebei' }
];

const rels = [
    { from: 'caocao', to: 'liubei', type: 'rivalry' },
    { from: 'caocao', to: 'sunquan', type: 'rivalry' },
    { from: 'caocao', to: 'yuanshao', type: 'rivalry' },
    { from: 'liubei', to: 'sunquan', type: 'alliance' },
    { from: 'simayi', to: 'zhugeliang', type: 'rivalry' },
    { from: 'zhouyu', to: 'zhugeliang', type: 'rivalry' },
    { from: 'guanyu', to: 'lumeng', type: 'rivalry' },
    { from: 'liubei', to: 'luxun', type: 'rivalry' },
    { from: 'lbu', to: 'dongzhuo', type: 'loyalty' },
    { from: 'lbu', to: 'liubei', type: 'rivalry' },
    { from: 'lbu', to: 'caocao', type: 'rivalry' },
    { from: 'xunyu', to: 'caocao', type: 'strategist' },
    { from: 'guojia', to: 'caocao', type: 'strategist' },
    { from: 'jiaxu', to: 'caocao', type: 'strategist' },
    { from: 'xunyou', to: 'caocao', type: 'strategist' },
    { from: 'simayi', to: 'caopi', type: 'strategist' },
    { from: 'zhugeliang', to: 'liubei', type: 'strategist' },
    { from: 'pangtong', to: 'liubei', type: 'strategist' },
    { from: 'fazheng', to: 'liubei', type: 'strategist' },
    { from: 'zhouyu', to: 'sunquan', type: 'strategist' },
    { from: 'lusu', to: 'sunquan', type: 'strategist' },
    { from: 'lumeng', to: 'sunquan', type: 'loyalty' },
    { from: 'luxun', to: 'sunquan', type: 'strategist' },
    { from: 'guanyu', to: 'liubei', type: 'loyalty' },
    { from: 'zhangfei', to: 'liubei', type: 'loyalty' },
    { from: 'zhaoyun', to: 'liubei', type: 'loyalty' },
    { from: 'machao', to: 'liubei', type: 'loyalty' },
    { from: 'huangzhong', to: 'liubei', type: 'loyalty' },
    { from: 'weiyan', to: 'liubei', type: 'loyalty' },
    { from: 'jiangwei', to: 'zhugeliang', type: 'loyalty' },
    { from: 'xiahoudun', to: 'caocao', type: 'loyalty' },
    { from: 'xiahouyuan', to: 'caocao', type: 'loyalty' },
    { from: 'zhangliao', to: 'caocao', type: 'loyalty' },
    { from: 'dianwei', to: 'caocao', type: 'loyalty' },
    { from: 'zhanghe', to: 'caocao', type: 'loyalty' },
    { from: 'xuhuang', to: 'caocao', type: 'loyalty' },
    { from: 'sunce', to: 'sunjian', type: 'loyalty' },
    { from: 'sunquan', to: 'sunce', type: 'loyalty' },
    { from: 'ganning', to: 'sunquan', type: 'loyalty' },
    { from: 'huanggai', to: 'sunquan', type: 'loyalty' },
    { from: 'taishici', to: 'sunce', type: 'loyalty' },
    { from: 'zhangzhao', to: 'sunquan', type: 'strategist' },
    { from: 'lukang', to: 'sunquan', type: 'loyalty' },
    { from: 'dengai', to: 'simazhao', type: 'loyalty' },
    { from: 'zhonghui', to: 'simazhao', type: 'loyalty' }
];

let fileStr = fs.readFileSync('app/(sub)/inu-score/RelationshipNetwork.tsx', 'utf8');

const peopleStr = "const PEOPLE: Person[] = " + JSON.stringify(people, null, 4) + ";";
const relsStr = "const RELATIONS: Relation[] = " + JSON.stringify(rels, null, 4) + ";";

let newStr = fileStr.replace(/const PEOPLE: Person\[\] = \[[\s\S]*?\];/, peopleStr);
newStr = newStr.replace(/const RELATIONS: Relation\[\] = \[[\s\S]*?\];/, relsStr);

// Also update chart size
newStr = newStr.replace(/const w = 900;/, 'const w = 1200;');
newStr = newStr.replace(/const h = 400;/, 'const h = 550;');

fs.writeFileSync('app/(sub)/inu-score/RelationshipNetwork.tsx', newStr);
