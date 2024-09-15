import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface CustomCheckboxProps {
    checked: boolean;
    onToggle(_newValue: boolean): void;
    label: React.ReactNode;
}

export default function CustomCheckbox(props: CustomCheckboxProps) {
    return (
        <button
            type="button"
            className={twMerge(
                'p-2 rounded-md w-full font-semibold border border-white bg-gray-200 dark:bg-[#3f3f3f]',
                props.checked &&
                    `border-[var(--theme-color)] text-[var(--theme-color)]`
            )}
            onClick={() => props.onToggle(!props.checked)}
        >
            {props.label}
        </button>
    );
}
