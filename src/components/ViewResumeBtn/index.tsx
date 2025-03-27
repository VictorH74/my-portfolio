import { useTranslations } from 'next-intl';
import './style.css';
import { useViewResumeBtn } from './useViewResumeBtn';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import CloseIcon from '@mui/icons-material/Close';
import { ModalContainer } from '../ModalContainer';
import Image from 'next/image';

interface Props {
    className?: string;
}

export const ViewResumeBtn: React.FC<Props> = (props) => {
    const t = useTranslations('ViewResumeBtn');
    const hook = useViewResumeBtn();

    return (
        <>
            <div
                onClick={
                    hook.isLoading || hook.isError
                        ? undefined
                        : hook.downloadAndViewResume
                }
                className={twMerge(
                    'download-resume-btn bg-secondary-black shrink-0 px-8 rounded-md text-white relative cursor-pointer w-[13rem]',
                    props.className
                )}
            >
                <div className="button-wrapper">
                    <div className="text top-0 flex items-center justify-center">
                        {hook.isLoading ? 'Loading...' : t('label')}
                    </div>
                    <span className="icon text-white top-full flex items-center justify-center">
                        <Image
                            width={30}
                            height={30}
                            src="/icons/view-icon.svg"
                            alt="view icon"
                        />
                    </span>
                </div>
            </div>
            {!hook.isLoading && hook.showPdfViewer && hook.resumeUrl && (
                <ModalContainer onClose={hook.handleClosePdfViewer}>
                    <>
                        <button
                            className="absolute right-2 top-2 text-white"
                            onClick={hook.handleClosePdfViewer}
                        >
                            {' '}
                            <CloseIcon sx={{ fontSize: 40 }} />
                        </button>
                        <object
                            data={hook.resumeUrl}
                            className="w-full max-w-[62.5rem] h-[95%]"
                            name="Victor Hugo Leal - Resume"
                        ></object>
                    </>
                </ModalContainer>
            )}
        </>
    );
};
