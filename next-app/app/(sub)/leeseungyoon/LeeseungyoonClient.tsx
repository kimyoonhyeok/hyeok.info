'use client';

import React, { useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Link from 'next/link';

type LeeseungyoonClientProps = {
    coverUrls: string[];
    bodyUrls: string[];
};

const BookPage = React.forwardRef<HTMLDivElement, { bgImage: string; bgPosition: string; bgSize: string }>((props, ref) => {
    return (
        <div className="demoPage" ref={ref} style={{ padding: 0 }}>
            <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#fff',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.05)',
                backgroundImage: props.bgImage ? `url("${props.bgImage}")` : 'none',
                backgroundPosition: props.bgPosition,
                backgroundSize: props.bgSize,
                backgroundRepeat: 'no-repeat',
            }} />
        </div>
    );
});
BookPage.displayName = 'BookPage';

export default function LeeseungyoonClient({ coverUrls, bodyUrls }: LeeseungyoonClientProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!mounted) return null;

    const renderBookPages = () => {
        const pages = [];

        // --- SPREAD 1 (Front Cover, showCover=true handles it as a single Right page) ---
        pages.push(
            <BookPage key="cover_front" bgImage={coverUrls[0] || ""} bgPosition="center" bgSize="cover" />
        );

        // --- SPREAD 2 (Inside Front Cover & 00.jpg) ---
        // Left side: Blank (Inside front cover)
        pages.push(
            <BookPage key="p_blank_start" bgImage="" bgPosition="center" bgSize="cover" />
        );
        // Right side: 00.jpg (bodyUrls[0])
        if (bodyUrls.length > 0) {
            pages.push(
                <BookPage key={`body_first`} bgImage={bodyUrls[0]} bgPosition="center" bgSize="cover" />
            );

            // --- SPREADS 3 to N-1 (Body spreads 2.jpg ~ 36.jpg) ---
            for (let i = 1; i < bodyUrls.length - 1; i++) {
                const imgPath = bodyUrls[i];
                pages.push(
                    <BookPage key={`body_${i}_left`} bgImage={imgPath} bgPosition="left center" bgSize="200% 100%" />
                );
                pages.push(
                    <BookPage key={`body_${i}_right`} bgImage={imgPath} bgPosition="right center" bgSize="200% 100%" />
                );
            }

            // --- SPREAD N (37.jpg & Inside Back Cover) ---
            // Left side: 37.jpg
            if (bodyUrls.length > 1) {
                pages.push(
                    <BookPage key={`body_last`} bgImage={bodyUrls[bodyUrls.length - 1]} bgPosition="center" bgSize="cover" />
                );
            }
        }

        // Right side: Blank (Inside back cover)
        pages.push(
            <BookPage key="p_blank_end" bgImage="" bgPosition="center" bgSize="cover" />
        );

        // --- SPREAD N+1 (Back Cover, showCover=true handles it as a single Left page) ---
        pages.push(
            <BookPage key="cover_back" bgImage={coverUrls[1] || coverUrls[0] || ""} bgPosition="center" bgSize="cover" />
        );

        return pages;
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: '#fafafa',
            zIndex: 9999,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
            <Link
                href="/about"
                style={{
                    position: 'absolute', top: '5.625rem', left: '50px',
                    background: 'transparent', border: 'none', fontSize: '18px',
                    cursor: 'pointer', color: '#666', display: 'flex',
                    alignItems: 'center', gap: '8px', transition: 'color 0.2s ease',
                    zIndex: 10000,
                    textDecoration: 'none'
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#111')}
                onMouseLeave={e => (e.currentTarget.style.color = '#666')}
            >
                &larr; Back
            </Link>

            <div style={{
                position: 'absolute', top: '40px', color: '#999',
                fontSize: '12px', letterSpacing: '0.5px'
            }}>
                Drag corners or click to turn pages
            </div>

            <div style={{ width: '90%', maxWidth: '1200px', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* @ts-expect-error - react-pageflip types are incomplete */}
                <HTMLFlipBook
                    width={500}
                    height={500}
                    size="stretch"
                    minWidth={315}
                    maxWidth={800}
                    minHeight={315}
                    maxHeight={800}
                    maxShadowOpacity={0.4}
                    showCover={true}
                    mobileScrollSupport={true}
                    className="demo-book"
                    style={{ margin: '0 auto', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
                >
                    {renderBookPages()}
                </HTMLFlipBook>
            </div>
        </div>
    );
}

