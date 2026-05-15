import fs from 'fs';
import path from 'path';
import LeeseungyoonClient from './LeeseungyoonClient';

export default function LeeseungyoonPage() {
    const publicDir = path.join(process.cwd(), 'public');
    const baseDir = '/project_images/leeseungyoon/Lyric(3:3).Cover(0:3)';
    
    const coverDir = path.join(publicDir, baseDir, 'Cover');
    const bodyDir = path.join(publicDir, baseDir, 'Body');
    
    let covers: string[] = [];
    let bodies: string[] = [];
    
    const getNum = (f: string) => {
        const match = f.match(/(\d+)\.jpg$/i);
        if (match && match[1]) return parseInt(match[1], 10);
        return 999;
    };

    try {
        covers = fs.readdirSync(coverDir).filter(f => f.endsWith('.jpg')).sort((a,b) => getNum(a) - getNum(b));
        bodies = fs.readdirSync(bodyDir).filter(f => f.endsWith('.jpg')).sort((a, b) => getNum(a) - getNum(b));
    } catch (e) {
        console.error(e);
    }

    const coverUrls = covers.map(f => `${baseDir}/Cover/${f}`);
    const bodyUrls = bodies.map(f => `${baseDir}/Body/${f}`);

    return <LeeseungyoonClient coverUrls={coverUrls} bodyUrls={bodyUrls} />;
}
