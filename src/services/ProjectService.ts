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

    async updateProject(id: ProjectType['id'], data: UpdateProjectType) {
        return this.api.updateProject(id, data);
    }

    async deleteProject(
        id: string,
        projectIndex: ProjectType['index'],
        currentProjectList: ProjectType[]
    ) {
        return this.api.deleteProject(id, projectIndex, currentProjectList);
    }

    async uploadImage(
        file: File,
        projectId: ProjectType['id'],
        projectTitle: ProjectType['title'],
        fileName: string
    ) {
        return this.api.uploadImage(
            file,
            projectId,
            projectTitle,
            fileName
        );
    }

    async deleteImage(filePaths: string[]) {
        return this.api.deleteImage(filePaths);
    }
}
