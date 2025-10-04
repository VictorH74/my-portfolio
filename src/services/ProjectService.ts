import { IApi } from '@/types/api';
import {
    CreateProjectType,
    ProjectType,
    UpdateProjectType,
} from '@/types/project';

export class ProjectService {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    generateId() {
        return this.api.generateProjectId();
    }

    async createProject(data: CreateProjectType) {
        return this.api.createProject(data);
    }

    getProjectListStream(onChange: (projectList: ProjectType[]) => void) {
        return this.api.getProjectListStream(onChange);
    }

    async getProjectList(countLimit: number | null = null, jumpCount?: number) {
        return this.api.getProjectList(countLimit, jumpCount);
    }

    async updateProject(id: string, data: UpdateProjectType) {
        return this.api.updateProject(id, data);
    }

    async deleteProject(
        id: string,
        projectIndex: ProjectType['index'],
        currentProjectList: ProjectType[]
    ) {
        return this.api.deleteProject(id, projectIndex, currentProjectList);
    }

    async uploadScreenshot(file: File, projectId: ProjectType['id']) {
        return this.api.uploadScreenshot(file, projectId);
    }

    async deleteScreenshots(filePaths: string[]) {
        return this.api.deleteScreenshots(filePaths);
    }
}
