import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { BtnAttrType } from '@/types';
import { twMerge } from 'tailwind-merge';

export const CloseButton: React.FC<BtnAttrType> = ({ className, ...props }) => {
    return (
        <button
            {...props}
            className={twMerge(
                'p-2 cursor-pointer hover:shadow-lg duration-200',
                className
            )}
        >
            <CloseIcon sx={{ fontSize: 35 }} />
        </button>
    );
};
