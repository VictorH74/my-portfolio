import { BtnAttrType, MuiIconType } from '@/types/generic';
import { twMerge } from 'tailwind-merge';

interface IconButtonProps extends BtnAttrType {
    Icon: MuiIconType;
    iconSize?: number;
}

export const iconButtonClassName = 'rounded-full p-1 bg-gray-300 duration-200';

export const iconButtonHoverClassName =
    'hover:scale-110 hover:bg-[#2382FF] hover:text-white';

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
