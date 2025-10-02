import { IApi } from '@/types/api';
import { TechnologyType } from '@/types/technology';

export class TechnologieService {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async createTechnology(
        data: Omit<TechnologyType, 'index'>
    ): Promise<TechnologyType> {
        return this.api.createTechnology(data);
    }

    async getTechnologyList(): Promise<TechnologyType[]> {
        return this.api.getTechnologyList();
    }

    async updateTechnology(
        id: string,
        data: Partial<Omit<TechnologyType, 'id'>>
    ): Promise<void> {
        return this.api.updateTechnology(id, data);
    }

    async uploadTechIcon(file: File, fileName: string): Promise<string | null> {
        return this.api.uploadTechIcon(file, fileName);
    }

    async deleteTechnology(
        tech: Pick<TechnologyType, 'id' | 'index' | 'src' | 'name'>,
        currentTechList: TechnologyType[]
    ): Promise<void> {
        return this.api.deleteTechnology(tech, currentTechList);
    }

    async reorderTechnologies(
        listOfUpdatedTech: Pick<TechnologyType, 'id' | 'index'>[]
    ): Promise<void> {
        return this.api.reorderTechnologies(listOfUpdatedTech);
    }
}
