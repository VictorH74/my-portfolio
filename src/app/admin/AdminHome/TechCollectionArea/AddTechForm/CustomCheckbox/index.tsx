import { twMerge } from 'tailwind-merge';

interface CustomCheckboxProps {
    value: boolean;
    onToggle(_newValue: boolean): void;
    label: string;
}

export default function CustomCheckbox(props: CustomCheckboxProps) {
    return (
        <button
            type="button"
            className={twMerge(
                'p-2 rounded-md w-full font-semibold max-w-[180px] border border-white',
                props.value
                    ? `bg-[var(--theme-color)]`
                    : 'bg-gray-200 dark:bg-[#3f3f3f]'
            )}
            onClick={() => props.onToggle(!props.value)}
        >
            {props.label}
        </button>
    );
}
