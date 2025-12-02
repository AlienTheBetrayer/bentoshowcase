import React, { useRef } from 'react';
import '../ui/Button/components/Button.css';
import './FileInput.css';

type Props = {
    label?: string;
    onSelect?: (files: FileList | null) => void;
    isEnabled?: boolean;
    children?: React.ReactNode;
};

export const FileInput = ({
    label = 'Select files',
    onSelect,
    isEnabled = true,
    children,
}: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <input
                ref={inputRef}
                type='file'
                id='file-upload'
                className='file-input'
                onClick={() => {
                    if (inputRef.current) {
                        inputRef.current.value = '';
                    }
                }}
                onChange={(e) => {
                    onSelect?.(e.target.files);
                }}
                multiple
            />
            <label
                htmlFor='file-upload'
                className={`button ${!isEnabled ? 'button-disabled' : ''}`}
            >
                {children}
                {label}
            </label>
        </>
    );
};
