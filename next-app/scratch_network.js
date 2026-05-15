const fs = require('fs');

const wei = ['Cao Cao', 'Cao Pi', 'Cao Rui', 'Sima Yi', 'Sima Shi', 'Sima Zhao', 'Xun Yu', 'Xun You', 'Jia Xu', 'Guo Jia', 'Cheng Yu', 'Xiahou Dun', 'Xiahou Yuan', 'Zhang Liao', 'Xu Huang', 'Zhang He', 'Dian Wei', 'Deng Ai', 'Zhong Hui', 'Zhong Yao'];
const shu = ['Liu Bei', 'Liu Shan', 'Zhuge Liang', 'Guan Yu', 'Zhang Fei', 'Zhao Yun', 'Ma Chao', 'Huang Zhong', 'Wei Yan', 'Jiang Wei', 'Pang Tong', 'Fa Zheng', 'Fei Yi', 'Jiang Wan', 'Ma Liang'];
const wu = ['Sun Jian', 'Sun Ce', 'Sun Quan', 'Zhou Yu', 'Lu Su', 'Lu Meng', 'Lu Xun', 'Gan Ning', 'Taishi Ci', 'Huang Gai', 'Zhang Zhao', 'Lu Kang'];
const other = ['Dong Zhuo', 'Lü Bu', 'Yuan Shao'];

const people = [];

function addNodes(list, faction, cx, cy, rX, rY) {
    list.forEach((name, i) => {
        const id = name.toLowerCase().replace(/[^a-z]/g, '');
        const angle = (i / list.length) * Math.PI * 2;
        const x = Math.round(cx + Math.cos(angle) * rX + (Math.random() * 20 - 10));
        const y = Math.round(cy + Math.sin(angle) * rY + (Math.random() * 20 - 10));
        people.push(`    { id: '${id}', name: '${name}', faction: '${faction}', x: ${x}, y: ${y}, role: '' }`);
    });
}

// Center Wei top, Shu bottom left, Wu bottom right
addNodes(wei, 'wei', 600, 150, 400, 100);
addNodes(shu, 'shu', 300, 350, 200, 100);
addNodes(wu, 'wu', 900, 350, 200, 100);
addNodes(other, 'neutral', 600, 250, 80, 40);

console.log(people.join(',\n'));
