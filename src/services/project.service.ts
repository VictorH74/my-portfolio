import { ProjectRepository } from '@/repositories/project.repository';

export class ProjectService {
    private repository;

    constructor(repository: ProjectRepository) {
        this.repository = repository;
    }

    getProducts = () => this.repository.getProjects();
}
