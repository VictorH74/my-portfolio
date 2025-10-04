import { IApi } from '@/types/api';
import {
    CreateTechnologyType,
    TechnologyType,
    UpdateTechnologyType,
} from '@/types/technology';

export class TechnologieService {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async createTechnology(data: CreateTechnologyType) {
        return this.api.createTechnology(data);
    }

    async getTechnologyList() {
        return this.api.getTechnologyList();
    }

    async updateTechnology(id: string, data: UpdateTechnologyType) {
        return this.api.updateTechnology(id, data);
    }

    async uploadTechIcon(file: File, fileName: string) {
        return this.api.uploadTechIcon(file, fileName);
    }

    async deleteTechnology(
        tech: Pick<TechnologyType, 'id' | 'index' | 'src' | 'name'>,
        currentTechList: TechnologyType[]
    ) {
        return this.api.deleteTechnology(tech, currentTechList);
    }

    async reorderTechnologies(
        listOfUpdatedTech: Pick<TechnologyType, 'id' | 'index'>[]
    ) {
        return this.api.reorderTechnologies(listOfUpdatedTech);
    }
}
