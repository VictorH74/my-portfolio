import {
    CreateProjectType,
    ProjectType,
    UpdateProjectType,
} from '@/types/project';
import {
    CreateTechnologyType,
    TechnologyType,
    UpdateTechnologyType,
} from '@/types/technology';

export interface IApi {
    generateProjectId(): string;
    createProject(data: CreateProjectType): Promise<void>;
    getProjectList(
        countLimit: number | null,
        jumpCount?: number
    ): Promise<ProjectType[]>;
    getProjectListStream(
        onChange: (projectList: ProjectType[]) => void
    ): () => void;
    updateProject(
        id: ProjectType['id'], 
        data: UpdateProjectType
    ): Promise<void>;
    deleteProject(
        id: ProjectType['id'],
        projectIndex: ProjectType['index'],
        currentProjectList: ProjectType[]
    ): Promise<void>;
    uploadScreenshot(
        file: File,
        projectId: ProjectType['id'],
        projectTitle: ProjectType['title']
    ): Promise<string | null>;
    deleteScreenshots(filePaths: string[]): Promise<void>;

    createTechnology(data: CreateTechnologyType): Promise<TechnologyType>;
    getTechnologyList(): Promise<TechnologyType[]>;
    updateTechnology(
        id: TechnologyType['id'],
        data: UpdateTechnologyType
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
    getProfileImg(): Promise<string>;

    updateResume(file: File): Promise<void>;
    getResume(): Promise<Blob | null>;
}
