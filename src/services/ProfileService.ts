import { IApi } from '@/types/api';

export class ProfileService {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async updateProfileImg(img: Blob): Promise<string> {
        console.log('updating profile img...');
        const url = await this.api.updateProfileImg(img);
        console.log(url);
        return url;
    }

    async getProfileImg(): Promise<string> {
        return this.api.getProfileImg();
    }

    async updateResume(file: File): Promise<void> {
        return this.api.updateResume(file);
    }

    async getResume(): Promise<Blob | null> {
        return this.api.getResume();
    }
}
