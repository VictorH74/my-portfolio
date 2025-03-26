import { BtnAttrType, MuiIconType } from '@/types';
import { twMerge } from 'tailwind-merge';

interface IconButtonProps extends BtnAttrType {
    Icon: MuiIconType;
}

export const iconButtonClassName =
    'rounded-full p-2 hover:scale-110 duration-200 bg-gray-300 hover:bg-[#2382FF] hover:text-white';

export function IconButton({ Icon, className, ...btnAtr }: IconButtonProps) {
    return (
        <button className={twMerge(iconButtonClassName, className)} {...btnAtr}>
            <Icon sx={{ fontSize: 27 }} />
        </button>
    );
}
