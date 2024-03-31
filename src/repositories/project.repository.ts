import { Api } from "@/apis/api";
import { ProjectAdminType } from "@/types";

export class ProjectRepository {
    private api;

    constructor (api: Api) {
        this.api = api;
    }    

    getProjects = () => this.api.get('projects');
    removeProject = (id: string) => this.api.delete('projects', id);
    updateProject = (id: string, data: Partial<ProjectAdminType>) => this.api.put('projects', id, data);
    updateCreateProject = (data: ProjectAdminType) => this.api.post('projects', data)
}