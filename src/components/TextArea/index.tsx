import React, { TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextAreaProps
    extends Omit<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        'onChange' | 'value' | 'rows'
    > {
    onChange(_value: string): void;
    value: string;
}

export default function TextArea({
    className,
    onChange,
    ...textAreaAttrs
}: TextAreaProps) {
    const ref = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        const textarea = ref.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight + 2}px`;
        }
    }, [textAreaAttrs.value]);

    return (
        <textarea
            ref={ref}
            className={twMerge(
                'shadow-lg bg-[#444444] p-2 rounded-md outline-blue-500 autofill:none resize-none overflow-hidden',
                className
            )}
            rows={1}
            onChange={(e) => {
                onChange(e.currentTarget.value);
            }}
            {...textAreaAttrs}
        />
    );
}
