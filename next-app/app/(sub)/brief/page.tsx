"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './brief.module.css';

export default function BriefPage() {

    // -- State --
    const [viewMode, setViewMode] = useState<'initial' | 'form'>('initial');
    const [isClosing, setIsClosing] = useState(false);
    const [gradients, setGradients] = useState({ left: '', right: '' });

    // -- Form State --
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [fileLabel, setFileLabel] = useState('파일 선택');
    const [filesSelected, setFilesSelected] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isDirtyRef = useRef(false);

    // -- Color Logic (Preserved) --
    useEffect(() => {
        const interval = setInterval(() => {
            // Use Date.now() for continuous time to avoid jumps at 0 seconds
            const now = Date.now();
            // Slow speed: Divide by larger number to slow down the hue shift
            // Previous speed was roughly 9 deg/sec. 
            // 1000ms = 1 sec. now / 100 = 10 steps per sec.
            // Let's adjust to match roughly 1.5x speed requested earlier but smooth.
            const timeBase = now / 50;

            const generateColors = (isLeft: boolean) => {
                const colors = [];
                const offset = isLeft ? 0 : 1;
                for (let i = 0; i < 7; i++) {
                    const slotIndex = (i * 2) + offset;
                    // Adjust hue spread (Opposite colors for Right circle)
                    const phaseShift = isLeft ? 0 : 180;
                    const hue = (timeBase + (slotIndex * 25.7) + phaseShift) % 360;
                    colors.push(`hsl(${hue}, 70%, 50%)`);
                }
                return colors;
            };

            const leftColors = generateColors(true);
            const rightColors = generateColors(false);

            // Solid Ratio 0.7
            const makeGradient = (colors: string[]) => {
                const step = 100 / 7;
                const solidRatio = 0.7;

                let stops = '';

                colors.forEach((c, i) => {
                    const start = i * step;
                    const solidEnd = start + (step * solidRatio);

                    if (i === 0) {
                        stops += `${c} 0%, ${c} ${solidEnd.toFixed(2)}%`;
                    } else {
                        stops += `, ${c} ${start.toFixed(2)}%, ${c} ${solidEnd.toFixed(2)}%`;
                    }
                });

                stops += `, transparent 100%`;
                return `radial-gradient(circle closest-side, ${stops})`;
            };

            setGradients({
                left: makeGradient(leftColors),
                right: makeGradient(rightColors)
            });

        }, 50);
        return () => clearInterval(interval);
    }, []);

    // -- Inactivity Timer --
    const startTimeRef = useRef<number>(0);

    const handleInteraction = () => {
        isDirtyRef.current = true;
    };

    useEffect(() => {
        if (viewMode !== 'form') return;

        // Reset dirty state and start time on open
        isDirtyRef.current = false;
        startTimeRef.current = Date.now();

        const timer = setInterval(() => {
            // If dirty, do nothing (never close)
            if (isDirtyRef.current) return;

            // If 10s passed without dirty
            if (Date.now() - startTimeRef.current > 10000) {
                setIsClosing(true);
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [viewMode]);

    // Effect to handle close animation completion
    useEffect(() => {
        if (isClosing) {
            const timeout = setTimeout(() => {
                setViewMode('initial');
                setStatus('idle');
                setIsClosing(false); // Reset closing state
            }, 2500); // 2.5 seconds match CSS
            return () => clearTimeout(timeout);
        }
    }, [isClosing]);

    // -- Handlers --
    const handlePortfolioClick = () => {
        window.open('/portfolio', '_blank');
    };

    const handleFileClick = () => {
        handleInteraction();
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleInteraction();
        const files = e.target.files;
        if (files && files.length > 0) {
            setFileLabel(`${files.length}개의 파일이 선택됨`);
            setFilesSelected(true);
        } else {
            setFileLabel('파일 선택');
            setFilesSelected(false);
        }
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleInteraction();
        const form = e.currentTarget; // Capture form reference immediately
        setStatus('submitting');

        const formData = new FormData(form);
        try {
            const res = await fetch('/api/send-mail', {
                method: 'POST',
                body: formData
            });

            // If API returns 500/400, handle error.
            if (!res.ok) throw new Error('Failed to send');

            setStatus('success');

            // Reset Form Code using captured reference
            form.reset();
            const editableDivs = document.querySelectorAll('[contenteditable]');
            editableDivs.forEach(div => div.textContent = '');
            if (fileInputRef.current) fileInputRef.current.value = '';
            setFileLabel('파일 선택');
            setFilesSelected(false);

            // Revert view mode immediately
            setTimeout(() => {
                setStatus('idle');
                setViewMode('initial');
            }, 500);

        } catch (err: unknown) {
            console.error(err);
            setStatus('error');
            const errorMessage = err instanceof Error ? err.message : String(err);
            alert(`전송 실패 (오류 상세): ${errorMessage}`);
        }
    }

    // -- Render --
    return (
        <div className={styles.container}>
            {viewMode === 'initial' ? (
                <div
                    className={styles.box}
                    style={{ background: gradients.left }}
                    onClick={() => setViewMode('form')}
                >
                    <span className={styles.boxTitle}>Brief</span>
                </div>
            ) : (
                <div className={`${styles.formContainer} ${isClosing ? styles.fadeOut : ''}`}>
                    <form ref={formRef} onSubmit={handleSubmit}>

                        <DynamicInput
                            label="Project Title"
                            name="projectTitle"
                            required
                            placeholder="프로젝트의 제목을 입력해주세요."
                            onInteract={handleInteraction}
                        />

                        <DynamicInput
                            label="Project Content"
                            name="projectContent"
                            required
                            placeholder="프로젝트에 대해 최대한 상세한 설명을 작성해주세요."
                            onInteract={handleInteraction}
                        />

                        {/* Custom File Input */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Project Files
                            </label>
                            <div className={styles.spacer}></div>

                            <div className={styles.inputWrapper}>
                                <div className={styles.verticalLine}></div>
                                <div className={styles.inputContent} onClick={handleFileClick} style={{ cursor: 'pointer' }}>
                                    <div className={styles.fileTrigger} style={{ opacity: filesSelected ? 1 : 0.5 }}>
                                        {fileLabel}
                                    </div>
                                    <input
                                        className={styles.fileInputHidden}
                                        type="file" multiple name="files"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div className={styles.verticalLine}></div>
                            </div>
                        </div>

                        <DynamicInput
                            label="Introduction"
                            name="userIntro"
                            required
                            placeholder="본인 또는 팀에 대한 간단한 소개를 부탁드립니다."
                            onInteract={handleInteraction}
                        />

                        <DynamicInput
                            label="E-mail"
                            name="email"
                            required
                            type="email"
                            placeholder="연락 가능한 이메일 주소를 입력해주세요."
                            onInteract={handleInteraction}
                        />

                        <DynamicInput
                            label="Phone"
                            name="phone"
                            type="tel"
                            placeholder="연락 가능한 전화번호를 입력해주세요."
                            onInteract={handleInteraction}
                        />

                        <DynamicInput
                            label="Project Type"
                            name="projectType"
                            placeholder="예: 브랜딩, 웹 디자인, 편집 디자인 등"
                            onInteract={handleInteraction}
                        />

                        <DynamicInput
                            label="Schedule"
                            name="schedule"
                            placeholder="희망하시는 시작일과 마감일을 입력해주세요."
                            onInteract={handleInteraction}
                        />

                        <DynamicInput
                            label="Budget"
                            name="budget"
                            placeholder="예상하시는 프로젝트 예산을 입력해주세요."
                            onInteract={handleInteraction}
                        />

                        <div className={styles.submitWrapper}>
                            <div className={styles.verticalLine}></div>
                            <button type="submit" className={styles.submitButton} disabled={status === 'submitting'}>
                                {status === 'submitting' ? 'Sending...' : 'Submit'}
                            </button>
                            <div className={styles.verticalLine}></div>
                        </div>
                    </form>
                </div>
            )}

            <div
                className={styles.box}
                style={{ background: gradients.right, cursor: 'default' }}
            // onClick={handlePortfolioClick} // Disabled per user request
            >
                <span className={styles.boxTitle}>Portfolio · Process</span>
            </div>
        </div>
    );
}

interface DynamicInputProps {
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    onInteract?: () => void;
}

const DynamicInput = ({ label, name, placeholder, required, onInteract }: DynamicInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        onInteract?.();
        if (inputRef.current) {
            inputRef.current.value = e.currentTarget.innerText;
        }
    };

    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>
                {label}
            </label>
            <div className={styles.spacer}></div>

            <div className={styles.inputWrapper}>
                <div className={styles.verticalLine}></div>
                <div className={styles.inputContent}>
                    <div
                        className={styles.editableDiv}
                        contentEditable
                        onInput={handleInput}
                        onFocus={() => onInteract?.()}
                        data-placeholder={placeholder}
                        spellCheck={false}
                        suppressContentEditableWarning={true}
                    />
                    <input type="hidden" name={name} ref={inputRef} required={required} />
                </div>
                <div className={styles.verticalLine}></div>
            </div>
        </div>
    );
};
