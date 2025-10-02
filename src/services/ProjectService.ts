import { IApi } from '@/api/IApi';
import { ProjectType } from '@/types/project';

export class ProjectService {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    generateId(): string {
        return this.api.generateProjectId();
    }

    async createProject(
        data: Omit<ProjectType, 'id' | 'createdAt' | 'updatedAt' | 'index'> &
            Partial<Pick<ProjectType, 'id'>>
    ): Promise<void> {
        return this.api.createProject(data);
    }

    getProjectListStream(
        onChange: (projectList: ProjectType[]) => void
    ): () => void {
        return this.api.getProjectListStream(onChange);
    }

    async getProjectList(
        countLimit: number | null = null,
        jumpCount?: number
    ): Promise<ProjectType[]> {
        return this.api.getProjectList(countLimit, jumpCount);
    }

    async updateProject(
        id: string,
        data: Partial<Omit<ProjectType, 'id' | 'updatedAt' | 'createdAt'>>
    ): Promise<void> {
        return this.api.updateProject(id, data);
    }

    async deleteProject(
        id: string,
        projectIndex: ProjectType['index'],
        currentProjectList: ProjectType[]
    ): Promise<void> {
        return this.api.deleteProject(id, projectIndex, currentProjectList);
    }

    async uploadScreenshot(
        file: File,
        projectId: ProjectType['id']
    ): Promise<string | null> {
        return this.api.uploadScreenshot(file, projectId);
    }

    async deleteScreenshots(filePaths: string[]): Promise<void> {
        return this.api.deleteScreenshots(filePaths);
    }
}
