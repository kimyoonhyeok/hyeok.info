"use client";

import { useRouter } from "next/navigation";
import ColorVisionSimulator from "../ColorVisionSimulator";

export default function InuScoreAppPage() {
    const router = useRouter();

    return (
        <ColorVisionSimulator onClose={() => router.push("/inu-score")} />
    );
}
