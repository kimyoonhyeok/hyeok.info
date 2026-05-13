'use client';

import { useRouter } from 'next/navigation';
import PresentationInfographic from '../inu-score/PresentationInfographic';

export default function InfographicPage() {
    const router = useRouter();

    return (
        <PresentationInfographic onClose={() => router.push('/works')} />
    );
}
