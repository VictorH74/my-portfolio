import { Api } from '@/apis/api';
import { ProjectType } from '@/types';

export class ProjectRepository {
    private api;

    constructor(api: Api) {
        this.api = api;
    }

    getProjects = () => this.api.get('projects');
    removeProject = (id: string) => this.api.delete('projects', id);
    updateProject = (id: string, data: Partial<ProjectType>) =>
        this.api.put('projects', id, data);
    updateCreateProject = (data: ProjectType) =>
        this.api.post('projects', data);
}
