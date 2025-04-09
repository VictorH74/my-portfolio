'use client';
import { ModalContainer } from '@/components/ModalContainer';
import { resumeFileName } from '@/utils/resume';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Image from 'next/image';
import React from 'react';

// import { PdfViewer } from './PdfViewer';
import { useResumeCV } from './useResumeCV';

export const ResumeCV = () => {
    const hook = useResumeCV();

    return (
        <>
            <div className="rounded-md bg-gray-300 max-w-[500px] max-md:max-w-full p-2 flex items-center gap-2 relative">
                <Image
                    src="/icons/fileIcon.svg"
                    alt=""
                    width={0}
                    height={0}
                    className="size-fit"
                />
                {hook.loadingResume ? (
                    <p className="font-semibold">Loading...</p>
                ) : (
                    <>
                        <div className="flex flex-col grow">
                            {!!hook.resumeBlob ? (
                                <>
                                    <p>{resumeFileName}</p>
                                    <div className="text-sm text-gray-600 font-semibold">
                                        PDF{' '}
                                        <div className="size-1 bg-gray-400 inline-block rounded-full m-[2px]" />{' '}
                                        {Math.round(
                                            hook.resumeBlob!.size / 1024
                                        )}
                                        KB
                                    </div>
                                </>
                            ) : (
                                <p>Undefined</p>
                            )}
                        </div>
                        <div className="space-x-1">
                            {!!hook.resumeBlob && (
                                <button onClick={hook.handleShowPdfViewer}>
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
                onChange={hook.handleSelectChange}
            />

            {hook.showPdfViewer && (
                <ModalContainer onClose={hook.handleClosePdfViewer}>
                    <div>
                        <button
                            className="absolute right-2 top-2 text-white"
                            onClick={hook.handleClosePdfViewer}
                        >
                            {' '}
                            <CloseIcon sx={{ fontSize: 40 }} />
                        </button>
                        <object
                            data={hook.resumeUrl}
                            width="1000"
                            height="1000"
                        ></object>
                    </div>
                </ModalContainer>
            )}
        </>
    );
};
