"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PresentationGraduation2 from "../../PresentationGraduation2";

export default function GraduationSecondPTPage() {
    const router = useRouter();

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    return (
        <PresentationGraduation2 onClose={() => router.push("/inu-score")} />
    );
}
