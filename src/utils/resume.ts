'use client';

import { getBlob, getStorage, ref } from 'firebase/storage';

export const resumeFileName = 'VICTOR HUGO LEAL.pdf';

export const getResume = async () => {
    const storage = getStorage();
    try {
        return getBlob(ref(storage, 'my-cv/' + resumeFileName));
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

export const downloadResume = async () => {
    const blob = await getResume();

    if (!blob) return alert('Erro ao baixar currículo');

    const fileURL = window.URL.createObjectURL(blob);
    const alink = document.createElement('a');
    alink.href = fileURL;
    alink.download = resumeFileName;
    alink.click();
};
