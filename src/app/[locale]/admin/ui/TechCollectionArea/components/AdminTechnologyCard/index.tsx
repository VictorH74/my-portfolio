import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface AdminTechnologyCardProps extends PropsWithChildren {
    className?: string;
}

export const AdminTechnologyCard: React.FC<AdminTechnologyCardProps> = (
    props
) => {
    return (
        <li
            className={twMerge(
                'relative rounded-md shadow-xl flex flex-col items-center justify-center gap-2 max-sm:w-[100px] sm:w-[180px] sm:min-w-[180px] aspect-square select-none duration-200 backdrop-blur-md',
                props.className
            )}
        >
            {props.children}
        </li>
    );
};
