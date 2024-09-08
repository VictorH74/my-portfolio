import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface NavListItemProps {
    className?: string;
    id: string;
    onClick?: () => void;
    onMouseOver?: (_e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
    children?: React.ReactNode;
    onPageTop: boolean;
    onFocused: boolean;
}

export default function NavListItem(props: NavListItemProps) {
    return (
        <li
            className={twMerge(
                'cursor-pointer list-none font-semibold text-sm uppercase select-none duration-150 text-gray-800 dark:text-white',
                props.className,
                props.onFocused &&
                    'text-[var(--theme-color)] dark:text-[var(--theme-color)]'
            )}
            id={props.id}
            onClick={props.onClick}
            onMouseOver={props.onMouseOver}
        >
            {props.children}
        </li>
    );
}
