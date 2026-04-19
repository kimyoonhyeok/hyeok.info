'use client';
import React, { useRef, useState, useEffect } from 'react';

export default function ColorMirroring() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const startMirroring = async () => {
        try {
            setErrorMsg('');
            // Ensure the browser supports screen capture
            if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
                setErrorMsg('Screen sharing is not supported in this browser.');
                return;
            }

            const displayStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    displaySurface: 'window', // hint to pick a window (like QuickTime)
                },
                audio: false,
            });

            setStream(displayStream);

            // Handle when the user stops sharing via browser UI
            displayStream.getVideoTracks()[0].onended = () => {
                stopMirroring();
            };
        } catch (err: unknown) {
            console.error('Error accessing display media:', err);
            setErrorMsg('Failed to start screen mirroring. Please check browser permissions or try again.');
        }
    };

    const stopMirroring = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        setStream(null);
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    };

    // Cleanup stream effectively to prevent memory leaks if component unmounts
    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    // Attach stream to video element when it's rendered
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fafafa',
            borderRadius: '4px',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {stream ? (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            backgroundColor: '#000' // Better contrast for video frames
                        }}
                    />
                    <button
                        onClick={stopMirroring}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            padding: '8px 16px',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontFamily: '"Pretendard", sans-serif',
                            backdropFilter: 'blur(4px)',
                            transition: 'background-color 0.2s ease',
                            zIndex: 10
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(231, 76, 60, 0.8)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'}
                    >
                        Stop Sharing
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={startMirroring}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'transparent',
                            border: 'none',
                            color: '#111',
                            fontSize: '18px',
                            fontWeight: 400,
                            fontFamily: '"Pretendard", sans-serif',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'color 0.2s ease',
                            zIndex: 10
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#111'}
                    >
                        &rarr; Initialize Mobile Mirroring
                    </button>

                    <div style={{
                        position: 'absolute',
                        bottom: '2rem',
                        left: '2rem',
                        color: '#666',
                        fontFamily: '"Pretendard", sans-serif',
                        fontSize: '18px',
                        fontWeight: 400,
                        lineHeight: 1.6,
                        textAlign: 'left',
                        zIndex: 10
                    }}>
                        <div style={{ marginBottom: '16px', color: '#111' }}>
                            Mirror iPhone Screen (CVS Simulate)
                        </div>
                        <div>
                            1. Connect iPhone via USB and open QuickTime Player<br />
                            2. File &gt; New Movie Recording &gt; Select iPhone<br />
                            3. Click the button in the center, go to Window and select QuickTime.
                        </div>
                    </div>

                    {errorMsg && (
                        <div style={{
                            position: 'absolute',
                            bottom: '8rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: '#E74C3C',
                            fontSize: '16px',
                            maxWidth: '400px',
                            lineHeight: 1.4,
                            textAlign: 'center',
                            zIndex: 10
                        }}>
                            {errorMsg}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
