"use client";

import { useState, useRef } from 'react';
import styles from './brief.module.css';

export default function BriefPage() {

    // -- Form State --
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [fileLabel, setFileLabel] = useState('+ Add Project Files');
    const [filesSelected, setFilesSelected] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // -- Handlers --

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFileLabel(`${files.length} files attached`);
            setFilesSelected(true);
        } else {
            setFileLabel('+ Add Project Files');
            setFilesSelected(false);
        }
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
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
            setFileLabel('+ Add Project Files');
            setFilesSelected(false);
            
            setTimeout(() => {
                setStatus('idle');
            }, 3000);

        } catch (err: unknown) {
            console.error(err);
            setStatus('error');
            const errorMessage = err instanceof Error ? err.message : String(err);
            alert(`전송 실패 (오류 상세): ${errorMessage}`);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form ref={formRef} onSubmit={handleSubmit} style={{ width: '100%' }}>

                    <DynamicInput
                        label="Project Title"
                        name="projectTitle"
                        required
                        placeholder="Title of your project"
                    />

                    <DynamicInput
                        label="Project Content"
                        name="projectContent"
                        required
                        placeholder="Detailed description of what you are building"
                    />

                    <div className={styles.formGroup}>
                        <div className={styles.infoLeft}>
                            <label className={styles.label}>
                                * Project Files
                            </label>
                        </div>
                        <div className={styles.infoRight}>
                            <div className={styles.fileTrigger} onClick={handleFileClick} style={{ opacity: filesSelected ? 1 : 0.8 }}>
                                {fileLabel}
                            </div>
                            <input
                                className={styles.fileInputHidden}
                                type="file" multiple name="files"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <DynamicInput
                        label="Introduction"
                        name="userIntro"
                        required
                        placeholder="Brief intro about yourself or your team"
                    />

                    <DynamicInput
                        label="E-mail"
                        name="email"
                        required
                        type="email"
                        placeholder="Contact email address"
                    />

                    <DynamicInput
                        label="Phone"
                        name="phone"
                        type="tel"
                        placeholder="Contact phone number"
                    />

                    <DynamicInput
                        label="Project Type"
                        name="projectType"
                        placeholder="e.g., Branding, Web Design, Editorial Design"
                    />

                    <DynamicInput
                        label="Schedule"
                        name="schedule"
                        placeholder="Expected start and end dates"
                    />

                    <DynamicInput
                        label="Budget"
                        name="budget"
                        placeholder="Estimated project budget"
                    />

                    <div className={styles.submitWrapper}>
                        <div className={styles.submitLeft}></div>
                        <div className={styles.submitRight}>
                            <button 
                                type="submit" 
                                className={styles.submitButton} 
                                disabled={status === 'submitting' || status === 'success'}
                            >
                                {status === 'submitting' ? 'Sending...' : 
                                 status === 'success' ? 'Successfully Sent' :
                                 status === 'error' ? 'Failed to send. Try again' :
                                 'Submit Inquiry'}
                            </button>
                        </div>
                    </div>
                </form>
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

const DynamicInput = ({ label, name, placeholder, required }: DynamicInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        if (inputRef.current) {
            inputRef.current.value = e.currentTarget.innerText;
        }
    };

    return (
        <div className={styles.formGroup}>
            <div className={styles.infoLeft}>
                <label className={styles.label}>
                    * {label}
                </label>
            </div>
            <div className={styles.infoRight}>
                <div
                    className={styles.editableDiv}
                    contentEditable
                    onInput={handleInput}
                    data-placeholder={placeholder}
                    spellCheck={false}
                    suppressContentEditableWarning={true}
                />
                <input type="hidden" name={name} ref={inputRef} required={required} />
            </div>
        </div>
    );
};
