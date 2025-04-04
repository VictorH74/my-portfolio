import { IconButton } from '@/components/IconButton';
import ReorderIcon from '@mui/icons-material/Reorder';
import React from 'react';
import { twMerge } from 'tailwind-merge';
interface ReorderListBtnProps {
    onClick(): void | Promise<void>;
    className?: string;
}

export const ReorderListBtn: React.FC<ReorderListBtnProps> = (props) => {
    return (
        <IconButton
            onClick={props.onClick}
            Icon={ReorderIcon}
            className={twMerge('rounded-md', props.className)}
            type="button"
        />
    );
};
