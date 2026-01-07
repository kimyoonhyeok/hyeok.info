"use client";

import { motion } from "framer-motion";
import LottieLoader from "@/components/LottieLoader";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            <LottieLoader />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
            >
                {children}
            </motion.div>
        </>
    );
}
