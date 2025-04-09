'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import './style.css';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { useViewResumeBtn } from './useViewResumeBtn';
import { ModalContainer } from '../ModalContainer';

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
                    'view-resume-button bg-secondary-black shrink-0 px-8 rounded-md text-white relative cursor-pointer w-[13rem]',
                    props.className
                )}
            >
                <div className="button-wrapper">
                    <div className="text top-0 flex items-center justify-center">
                        {hook.isLoading ? t('loadingLabel') : t('label')}
                    </div>
                    <span className="icon text-white top-full flex items-center justify-center">
                        <Image
                            width={30}
                            height={30}
                            style={{ width: '31px', height: 'auto' }}
                            src="/icons/view-icon.svg"
                            alt="view icon"
                        />
                    </span>
                </div>
            </div>
            {!hook.isLoading && hook.showPdfViewer && hook.resumeUrl && (
                <ModalContainer onClose={hook.handleClosePdfViewer}>
                    <object
                        data={hook.resumeUrl}
                        className="w-full max-w-[62.5rem] h-[95%]"
                        name="Victor Hugo Leal - Resume"
                    />
                </ModalContainer>
            )}
        </>
    );
};
