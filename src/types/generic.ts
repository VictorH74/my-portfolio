import { LANGUAGES } from '@/utils/server-constants';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type MuiIconType = OverridableComponent<
    SvgIconTypeMap<object, 'svg'>
> & {
    muiName: string;
};

export type ProfileContactsType = {
    email: string;
    github_url: string;
    linkedin_url: string;
    phone: string;
};

export type BtnAttrType = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type LangType = (typeof LANGUAGES)[number];

export type StreamEvent = 'onChange'; /* | 'onDelete' | 'onAdd'; */
