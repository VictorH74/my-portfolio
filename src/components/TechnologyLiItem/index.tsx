import React, { LiHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TechnologyLiItemProps extends LiHTMLAttributes<HTMLLIElement> {}

export default function TechnologyLiItem({
    className,
    ...rest
}: TechnologyLiItemProps) {
    return (
        <li
            className={twMerge(
                'shadow-xl flex flex-col items-center justify-center gap-2 max-sm:w-[100px] sm:w-[200px] sm:min-w-[200px] aspect-square select-none duration-200 backdrop-blur-md',
                className
            )}
            {...rest}
        />
    );
}
