import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type Language = 'en' | 'pt-BR';
export type TranslationLang<T> = Record<Language, T>;

export type ProjectType = {
    index: number;
    id: string;
    title: string;
    screenshots: ScreenshotType[];
    description: { PT: string; EN: string };
    technologies: string[];
    deployUrl?: string;
    repositoryUrl?: string;
    videoUrl?: string;
    createdAt?: string; // ISO String Date
    updatedAt?: string; // ISO String Date
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
