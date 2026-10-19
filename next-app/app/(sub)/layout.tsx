"use client";

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { usePathname } from 'next/navigation';

export default function SubLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isGraduationShow = pathname?.includes("graduation-show");

    return (
        <div className={`works-container ${isGraduationShow ? "graduation-show-layout" : ""}`}>
            <Header />
            {children}
            {!isGraduationShow && <Footer />}
        </div>
    );
}
