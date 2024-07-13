"use client"

import { getBlob, getStorage, ref } from "firebase/storage";

export const fileName = 'VICTOR HUGO ALMEIDA.pdf'

export const downloadResume = async () => {
    const storage = getStorage();
    try {
        const blob = await getBlob(ref(storage, 'my-cv/' + fileName));

        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement('a')
        alink.href = fileURL;
        alink.download = fileName;
        alink.click();
    } catch (e) {
        alert("Erro ao baixar currículo")
        console.error(e)
    }
}
