import { twMerge } from 'tailwind-merge';

interface DiviserProps {
    className?: string;
}

export const Divider = (props: DiviserProps) => {
    return (
        <div
            className={twMerge(
                'h-[2px] my-6 bg-[var(--theme-color)]',
                props.className
            )}
        />
    );
};
