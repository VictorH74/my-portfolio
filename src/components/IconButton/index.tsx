import { BtnAttrType, MuiIconType } from '@/types';
import { twMerge } from 'tailwind-merge';

interface IconButtonProps extends BtnAttrType {
    Icon: MuiIconType;
    iconSize?: number;
}

export const iconButtonClassName =
    'rounded-full p-1 hover:scale-110 duration-200 bg-gray-300 hover:bg-[#2382FF] hover:text-white';

export function IconButton({
    Icon,
    iconSize,
    className,
    ...btnAtr
}: IconButtonProps) {
    return (
        <button className={twMerge(iconButtonClassName, className)} {...btnAtr}>
            <Icon sx={{ fontSize: iconSize || 24 }} />
        </button>
    );
}
