import { LangType } from './generic';

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

export type CreateProjectType = Omit<
    ProjectType,
    'id' | 'createdAt' | 'updatedAt' | 'index'
> &
    Partial<Pick<ProjectType, 'id'>>;

export type UpdateProjectType = Partial<
    Omit<ProjectType, 'id' | 'updatedAt' | 'createdAt'>
>;

export type ScreenshotType = {
    name: string;
    url: string;
};

export type CreateUpdateProjectType = Omit<ProjectType, 'id' | 'index'> & {
    id?: string;
};
