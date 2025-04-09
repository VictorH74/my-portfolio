'use client';
import { useQuery } from '@tanstack/react-query';
import { getMetadata, getStorage, ref } from 'firebase/storage';

export const resumeFileName = 'VICTOR HUGO LEAL.pdf';

const loadPdfMetadata = async () => {
    const storage = getStorage();
    const pdfRef = ref(storage, 'my-cv/' + resumeFileName);

    return await getMetadata(pdfRef);
};

export const useDownloadResumeBtn = () => {
    const {
        data: pdfMetadata,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['cv-pdf-metadata'],
        queryFn: loadPdfMetadata,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const formatSizeToKB = (size: number) => Math.round(size / 1024);

    return {
        isError,
        formatSizeToKB,
        pdfMetadata,
        isLoading,
    };
};
