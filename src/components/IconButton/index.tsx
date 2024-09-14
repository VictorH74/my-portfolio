import { BtnAttrType, MuiIconType } from '@/types';

interface IconButtonProps extends BtnAttrType {
    Icon: MuiIconType;
}

export function IconButton({ Icon, ...btnAtr }: IconButtonProps) {
    return (
        <button
            className="bg-[var(--theme-color)] rounded-full p-2 hover:scale-110 duration-200"
            {...btnAtr}
        >
            <Icon sx={{ fontSize: 27 }} />
        </button>
    );
}

export namespace IconButton {
    export const className = '';
}
