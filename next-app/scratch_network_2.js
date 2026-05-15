const fs = require('fs');

let content = fs.readFileSync('app/(sub)/inu-score/RelationshipNetwork.tsx', 'utf-8');
const match = content.match(/const PEOPLE: Person\[\] = (\[[\s\S]*?\]);/);
if (match) {
    let people = eval(match[1]);
    
    // Original bounding box center is ~570, 260
    // We want to spread them horizontally more than vertically
    // Let's stretch X by 1.3, Y by 1.1 from the center
    const cx = 570;
    const cy = 260;
    
    people = people.map(p => {
        return {
            ...p,
            x: Math.round(cx + (p.x - cx) * 1.3),
            y: Math.round(cy + (p.y - cy) * 1.1)
        };
    });
    
    // To ensure they don't hit the caption at bottom left, we'll shift the whole graph right by a bit (e.g. +50px)
    people = people.map(p => ({ ...p, x: p.x + 50 }));

    // Now recalculate new bounding box
    const xs = people.map(p => p.x);
    const ys = people.map(p => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    console.log({minX, maxX, minY, maxY});
    
    // Format back to string
    const peopleStr = '[\n' + people.map(p => `    { "id": "${p.id}", "name": "${p.name}", "faction": "${p.faction}", "x": ${p.x}, "y": ${p.y}, "role": "${p.role}" }`).join(',\n') + '\n]';
    
    content = content.replace(/const PEOPLE: Person\[\] = \[[\s\S]*?\];/, `const PEOPLE: Person[] = ${peopleStr};`);
    
    // Update viewBox to fit the new minX, maxX, minY, maxY with padding
    const vX = minX - 40;
    const vY = minY - 40;
    const vW = (maxX - minX) + 80;
    const vH = (maxY - minY) + 80;
    
    content = content.replace(/viewBox="[^"]+"/, `viewBox="${vX} ${vY} ${vW} ${vH}"`);
    
    fs.writeFileSync('app/(sub)/inu-score/RelationshipNetwork.tsx', content);
    console.log("Updated RelationshipNetwork.tsx");
}
