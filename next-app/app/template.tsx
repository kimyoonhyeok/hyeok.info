"use client";

import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        // Determine if it's a soft nav or full load, we just fade in
        const timeout = setTimeout(() => setOpacity(1), 50);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div style={{ opacity: opacity, transition: "opacity 0.3s ease-in-out" }}>
            {children}
        </div>
    );
}
