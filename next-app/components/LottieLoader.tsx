"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function SplashLoader() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Reset visibility to true whenever pathname changes (navigation)
        setIsVisible(true);

        // Reduced delay to 0.5s for snappier feel
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [pathname]); // Trigger on every route change

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        width: '100vw',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        backgroundColor: '#ffffff',
                        zIndex: 9999,
                        pointerEvents: 'none'
                    }}
                />
            )}
        </AnimatePresence>
    );
}
