import { ProjectType } from '@/types/project';
import { TechnologyType } from '@/types/technology';

export interface IApi {
    generateProjectId(): string;
    createProject(
        data: Omit<ProjectType, 'id' | 'createdAt' | 'updatedAt' | 'index'> &
            Partial<Pick<ProjectType, 'id'>>
    ): Promise<void>;
    getProjectList(
        countLimit: number | null,
        jumpCount?: number
    ): Promise<ProjectType[]>;
    getProjectListStream(
        onChange: (projectList: ProjectType[]) => void
    ): () => void;
    updateProject(
        id: ProjectType['id'],
        data: Partial<Omit<ProjectType, 'id' | 'updatedAt' | 'createdAt'>>
    ): Promise<void>;
    deleteProject(
        id: ProjectType['id'],
        projectIndex: ProjectType['index'],
        currentProjectList: ProjectType[]
    ): Promise<void>;
    uploadScreenshot(
        file: File,
        projectId: ProjectType['id']
    ): Promise<string | null>;
    deleteScreenshots(filePaths: string[]): Promise<void>;

    createTechnology(
        data: Omit<TechnologyType, 'index'>
    ): Promise<TechnologyType>;
    getTechnologyList(): Promise<TechnologyType[]>;
    updateTechnology(
        id: TechnologyType['id'],
        data: Partial<Omit<TechnologyType, 'id'>>
    ): Promise<void>;
    uploadTechIcon(file: File, fileName: string): Promise<string | null>;
    deleteTechnology(
        tech: Pick<TechnologyType, 'id' | 'index' | 'src' | 'name'>,
        currentTechList: TechnologyType[]
    ): Promise<void>;
    reorderTechnologies(
        listOfUpdatedTech: Pick<TechnologyType, 'id' | 'index'>[]
    ): Promise<void>;

    updateProfileImg(img: Blob): Promise<string>;
    getProfileImg(): string;

    updateResume(file: File): Promise<void>;
    getResume(): Promise<Blob | null>;
}
