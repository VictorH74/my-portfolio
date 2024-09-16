import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TextAreaProps {
    value: string;
    placeholder?: string;
    id?: string;
    className?: string;
    onChange(_value: string): void;
    required?: boolean;
    onFocus?: (_: React.FocusEvent<HTMLTextAreaElement, Element>) => void;
    onBlur?: (_: React.FocusEvent<HTMLTextAreaElement, Element>) => void;
}

export default function TextArea(props: TextAreaProps) {
    const ref = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        const textarea = ref.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight + 2}px`;
        }
    }, [props.value]);

    return (
        <textarea
            required={props.required}
            id={props.id}
            ref={ref}
            className={twMerge(
                'shadow-lg bg-[#444444] p-2 rounded-md outline-blue-500 autofill:none resize-none overflow-hidden',
                props.className
            )}
            rows={1}
            placeholder={props.placeholder}
            value={props.value}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            onChange={(e) => {
                props.onChange(e.currentTarget.value);
            }}
        />
    );
}
