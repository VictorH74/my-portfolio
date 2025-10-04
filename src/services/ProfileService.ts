import { IApi } from '@/types/api';

export class ProfileService {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async updateProfileImg(img: Blob) {
        const url = await this.api.updateProfileImg(img);
        return url;
    }

    async getProfileImg() {
        return this.api.getProfileImg();
    }

    async updateResume(file: File) {
        return this.api.updateResume(file);
    }

    async getResume() {
        return this.api.getResume();
    }
}
