'use client';

import { getBlob, getStorage, ref } from 'firebase/storage';

export const resumeFileName = 'VICTOR HUGO ALMEIDA.pdf';

export const getResume = async () => {
    const storage = getStorage();
    return getBlob(ref(storage, 'my-cv/' + resumeFileName));
};

export const downloadResume = async () => {
    try {
        const blob = await getResume();

        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = resumeFileName;
        alink.click();
    } catch (e) {
        alert('Erro ao baixar currículo');
        console.error(e);
    }
};
