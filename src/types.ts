import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { LANGUAGES } from './utils/server-constants';

export type HandlerType =
    | 'sw'
    | 'se'
    | 'nw'
    | 'ne'
    | 'w'
    | 'e'
    | 'n'
    | 's'
    | undefined;

export type DirectionType = 'left' | 'top' | 'right' | 'bottom';

export type Directions = Record<'left' | 'top' | 'right' | 'bottom', string>;

export type DimentionType = [number, number]; // [w, h]

export type LangType = (typeof LANGUAGES)[number];

export type ProjectType = {
    index: number;
    id: string;
    title: string;
    screenshots: ScreenshotType[];
    description: Record<LangType, string | undefined>;
    technologies: string[];
    deployUrl?: string;
    repositoryUrl?: string;
    videoUrl?: string;
    createdAt?: string; // ISO String Date
    updatedAt?: string; // ISO String Date
};

export type CreateUpdateProjectType = Omit<ProjectType, 'id' | 'index'> & {
    id?: string;
};

export type ScreenshotType = {
    name: string;
    url: string;
};

export type TechnologieType = {
    index: number;
    id: string;
    name: string;
    src: string;
    hidden?: boolean;
    isMain?: boolean;
};

export type RGBType = [number, number, number];

export type MuiIconType = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
};

export type BtnAttrType = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ProfileContactsType = {
    email: string;
    github_url: string;
    linkedin_url: string;
    phone: string;
};

export type ThemeColorType = {
    RGBValues: RGBType;
    color: `rgb(${number}, ${number}, ${number})`;
};
