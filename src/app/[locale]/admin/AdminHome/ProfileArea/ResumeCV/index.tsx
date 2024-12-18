import { getResume, resumeFileName } from '@/utils/resume';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import React from 'react';

import { PdfViewer } from './PdfViewer';

export const ResumeCV = () => {
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

    return (
        <>
            <div className="rounded-md bg-white dark:bg-[#3f3f3f] max-w-[500px] max-md:max-w-full p-2 flex items-center gap-2 relative">
                <Image
                    src="/icons/fileIcon.svg"
                    alt=""
                    width={0}
                    height={0}
                    className="size-fit"
                />
                {loadingResume ? (
                    <p className="font-semibold">Loading...</p>
                ) : (
                    <>
                        <div className="flex flex-col grow">
                            {!!resumeBlob ? (
                                <>
                                    <p>{resumeFileName}</p>
                                    <div className="text-sm text-gray-400 font-semibold">
                                        PDF{' '}
                                        <div className="size-1 bg-gray-400 inline-block rounded-full m-[2px]" />{' '}
                                        {Math.round(resumeBlob!.size / 1024)}KB
                                    </div>
                                </>
                            ) : (
                                <p>Undefined</p>
                            )}
                        </div>
                        <div className="space-x-1">
                            {!!resumeBlob && (
                                <button onClick={handleShowPdfViewer}>
                                    <VisibilityIcon sx={{ fontSize: 30 }} />
                                </button>
                            )}

                            <label
                                className="cursor-pointer"
                                htmlFor="load-pdf"
                            >
                                <ChangeCircleIcon sx={{ fontSize: 30 }} />
                            </label>
                        </div>
                    </>
                )}
            </div>

            <input
                type="file"
                id="load-pdf"
                accept=".pdf"
                className="absolute pointer-events-none opacity-0 size-0"
                onChange={handleSelectChange}
            />

            {showPdfViewer && (
                <PdfViewer
                    onClose={handleClosePdfViewer}
                    fileUrl={resumeUrl!}
                />
            )}
        </>
    );
};
