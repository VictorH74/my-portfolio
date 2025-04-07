import { OverridableComponent } from '@mui/material/OverridableComponent';
import { LANGUAGES } from './utils/server-constants';
import { SvgIconTypeMap } from '@mui/material';

export type TechnologyType = {
    index: number;
    id: string;
    name: string;
    src: string;
    hidden?: boolean;
    isMain?: boolean;
    color?: {
        background: string;
        heading: string;
    };
};

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

export type LangType = (typeof LANGUAGES)[number];

export type BtnAttrType = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;
