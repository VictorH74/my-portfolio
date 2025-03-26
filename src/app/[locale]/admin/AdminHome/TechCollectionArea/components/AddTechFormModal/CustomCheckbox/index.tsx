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
                'p-2 rounded-md w-full font-semibold bg-gray-300 cursor-pointer',
                props.checked && `bg-gray-500 text-white`
            )}
            onClick={() => props.onToggle(!props.checked)}
        >
            {props.label}
        </button>
    );
}
