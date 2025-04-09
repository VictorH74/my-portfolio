import { getResume } from '@/utils/resume';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const resumeFileName = 'VICTOR HUGO LEAL.pdf';

export const useViewResumeBtn = () => {
    const [showPdfViewer, setShowPdfViewer] = React.useState(false);
    const {
        refetch,
        isError,
        isLoading,
        data: resumeBlob,
    } = useQuery({
        queryKey: ['resume-pdf'],
        queryFn: async () => {
            const blob = await getResume();
            return blob;
        },
        enabled: false,
        staleTime: 7000,
    });

    const resumeUrl = React.useMemo(() => {
        if (!resumeBlob) return undefined;
        return window.URL.createObjectURL(resumeBlob);
    }, [resumeBlob]);

    const formatSizeToKB = (size: number) => Math.round(size / 1024);

    const downloadAndViewResume = async () => {
        try {
            await refetch();
            setShowPdfViewer(true);
        } catch (e) {
            console.error(e);
            alert('error trying loading resume pdf file');
        }
    };

    const handleClosePdfViewer = () => {
        setShowPdfViewer(false);
    };

    return {
        isError,
        formatSizeToKB,
        isLoading,
        downloadAndViewResume,
        showPdfViewer,
        setShowPdfViewer,
        handleClosePdfViewer,
        resumeUrl,
    };
};
