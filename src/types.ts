import { LANGUAGES } from './utils/server-constants';

export type TechnologType = {
    index: number;
    id: string;
    name: string;
    src: string;
    hidden?: boolean;
    isMain?: boolean;
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

export type ScreenshotType = {
    name: string;
    url: string;
};

export type LangType = (typeof LANGUAGES)[number];
