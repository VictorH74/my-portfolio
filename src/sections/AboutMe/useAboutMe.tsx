import { resumeFileName } from '@/utils/resume';
import { getMetadata, getStorage, ref } from 'firebase/storage';
import React from 'react';
import { useQuery } from 'react-query';

export default function useAboutMe() {
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const { data: pdfMetadata, isLoading } = useQuery({
        queryFn: () => loadPdfMetadata(),
        onError: (e) => {
            alert('Erro ao baixar metadata de cv!');
            console.error(e);
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    const formatSizeToKB = (size: number) => Math.round(size / 1024);

    const loadPdfMetadata = async () => {
        const storage = getStorage();
        const pdfRef = ref(storage, 'my-cv/' + resumeFileName);

        return getMetadata(pdfRef);
    };

    return {
        isClient,
        formatSizeToKB,
        pdfMetadata,
        isLoading,
    };
}
