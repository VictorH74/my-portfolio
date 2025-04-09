'use client';
import { useTranslations } from 'next-intl';
import { useDownloadResumeBtn } from './useDownloadResumeBtn';
import { downloadResume } from '@/utils/resume';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
    className?: string;
}

export const DownloadResumeBtn: React.FC<Props> = (props) => {
    const t = useTranslations('DownloadResumeBtn');
    const hook = useDownloadResumeBtn();

    return (
        <div
            onClick={
                hook.isLoading || hook.isError ? undefined : downloadResume
            }
            className={twMerge(
                'bg-secondary-black shrink-0 py-2 px-8 rounded-md text-white relative cursor-pointer w-[13rem]',
                props.className
            )}
        >
            <div className="button-wrapper">
                <div className="text top-0 flex items-center justify-center">
                    {hook.isLoading ? t('downloadingLabel') : t('label')}
                </div>
            </div>
        </div>
    );
};
