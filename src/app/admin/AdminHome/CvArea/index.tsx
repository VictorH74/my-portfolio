"use client"
import { getResume, resumeFileName } from '@/utils/resume';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import React from 'react';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { createPortal } from 'react-dom';
import { Worker } from '@react-pdf-viewer/core';
import PdfViewer from './component/PdfViewer';
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function CvArea() {
    const [resumeBlob, setResumeBlob] = React.useState<Blob | undefined>()
    const [showPdfViewer, setShowPdfViewer] = React.useState(false)
    const [loadingResume, setLoadingResume] = React.useState(true)

    const resumeUrl = React.useMemo(() => {
        if (!resumeBlob) return undefined;
        return window.URL.createObjectURL(resumeBlob)
    }, [resumeBlob])

    React.useEffect(() => {
        (async () => {
            const blob = await getResume()
            setResumeBlob(blob)
            setLoadingResume(false)
        })()
    }, [])

    const handleShowPdfViewer = () => {
        setShowPdfViewer(true)
    }

    const handleClosePdfViewer = () => {
        setShowPdfViewer(false)
    }

    const handleSelectChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoadingResume(true)
        const fileInput = e.target;
        const files = fileInput.files

        if (!files) return

        const file = files[0]

        const storage = getStorage();
        const storageRef = ref(storage, 'my-cv/' + resumeFileName)

        const blob = new Blob([file], { type: file.type });

        uploadBytes(storageRef, blob).then((snapshot) => {
            setResumeBlob(blob)
            setLoadingResume(false)
        });
    }

    if (!loadingResume && !resumeBlob) return <p>undefined resume blob</p>

    return (
        <div>
            <h1 className="text-2xl mb-2">Resume CV</h1>

            <div className="rounded-md bg-gray-200 dark:bg-[#3f3f3f] max-w-[500px] p-2 flex items-center gap-2 relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" className="h-10 w-10 flex-shrink-0" width="36" height="36"><rect width="36" height="36" rx="6" fill="#FF5588"></rect><path d="M19.6663 9.66663H12.9997C12.5576 9.66663 12.1337 9.84222 11.8212 10.1548C11.5086 10.4673 11.333 10.8913 11.333 11.3333V24.6666C11.333 25.1087 11.5086 25.5326 11.8212 25.8451C12.1337 26.1577 12.5576 26.3333 12.9997 26.3333H22.9997C23.4417 26.3333 23.8656 26.1577 24.1782 25.8451C24.4907 25.5326 24.6663 25.1087 24.6663 24.6666V14.6666L19.6663 9.66663Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path><path d="M19.667 9.66663V14.6666H24.667" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21.3337 18.8334H14.667" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21.3337 22.1666H14.667" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.3337 15.5H15.5003H14.667" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                {
                    loadingResume ? (<p className='font-semibold'>Loading...</p>)
                        : !resumeBlob ? (<p>undefined resume blob</p>)
                            : (
                                <>
                                    <div className="flex flex-col grow">
                                        <p>{resumeFileName}</p>
                                        <p className="text-sm text-gray-400 font-semibold">PDF <div className='size-1 bg-gray-400 inline-block rounded-full m-[2px]' /> {Math.round(resumeBlob!.size / 1024)}KB</p>
                                    </div>
                                    <div className='space-x-1'>
                                        <button onClick={handleShowPdfViewer}>
                                            <VisibilityIcon sx={{ fontSize: 30 }} />
                                        </button>
                                        <label className='cursor-pointer' htmlFor='load-pdf'>
                                            <ChangeCircleIcon sx={{ fontSize: 30 }} />
                                        </label>
                                    </div>
                                </>
                            )
                }
            </div>


            <input type="file" id='load-pdf' accept='.pdf' className='absolute pointer-events-none opacity-0' onChange={handleSelectChange} />

            {
                showPdfViewer && createPortal(
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <PdfViewer onClose={handleClosePdfViewer} fileUrl={resumeUrl!} />
                    </Worker>,
                    document.body
                )
            }
        </div>
    )
}