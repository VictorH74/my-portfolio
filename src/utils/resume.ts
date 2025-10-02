'use client';

import { profileService } from '@/di/container';

export const resumeFileName = 'VICTOR HUGO LEAL.pdf';
export const downloadResume = async () => {
    const blob = await profileService.getResume();

    if (!blob) return alert('Erro ao baixar currículo');

    const fileURL = window.URL.createObjectURL(blob);
    const alink = document.createElement('a');
    alink.href = fileURL;
    alink.download = resumeFileName;
    alink.click();
};
