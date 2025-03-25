import { getResume, resumeFileName } from '@/utils/resume';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
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
                const blob = await getResume();
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

        const storage = getStorage();
        const storageRef = ref(storage, 'my-cv/' + resumeFileName);

        const blob = new Blob([file], { type: file.type });

        uploadBytes(storageRef, blob).then(() => {
            setResumeBlob(blob);
            setLoadingResume(false);
        });
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
