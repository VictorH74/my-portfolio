import { profileService } from '@/di/container';
import React from 'react';

export const useResumeCV = () => {
    const [resumeBlob, setResumeBlob] = React.useState<Blob | undefined>();
    const [showPdfViewer, setShowPdfViewer] = React.useState(false);
    const [loadingResume, setLoadingResume] = React.useState(true);

    const resumeUrl = React.useMemo(() => {
        if (!resumeBlob) return undefined;
        return window.URL.createObjectURL(resumeBlob);
    }, [resumeBlob]);

    React.useEffect(() => {
        (async () => {
            try {
                const blob = await profileService.getResume();
                if (!blob) {
                    alert('No resume found');
                    return;
                }
                setResumeBlob(blob);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingResume(false);
            }
        })();
    }, []);

    const handleShowPdfViewer = () => {
        setShowPdfViewer(true);
    };

    const handleClosePdfViewer = () => {
        setShowPdfViewer(false);
    };

    const handleSelectChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLoadingResume(true);
        const fileInput = e.target;
        const files = fileInput.files;

        if (!files) return;

        const file = files[0];
        const blob = new Blob([file], { type: file.type });

        await profileService.updateResume(file);

        setResumeBlob(blob);
        setLoadingResume(false);

    };

    return {
        loadingResume,
        resumeBlob,
        handleShowPdfViewer,
        handleSelectChange,
        showPdfViewer,
        handleClosePdfViewer,
        resumeUrl,
    };
};
