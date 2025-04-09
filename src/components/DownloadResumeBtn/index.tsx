'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { useDownloadResumeBtn } from './useDownloadResumeBtn';

interface Props {
    className?: string;
}

export const DownloadResumeBtn: React.FC<Props> = (props) => {
    const t = useTranslations('DownloadResumeBtn');
    const hook = useDownloadResumeBtn();

    return (
        <button
            onClick={hook.handleClick}
            disabled={hook.isLoading}
            className={twMerge(
                'bg-secondary-black shrink-0 py-4 px-8 rounded-md text-white relative cursor-pointer',
                props.className
            )}
        >
            {hook.isLoading ? t('downloadingLabel') : t('label')}
        </button>
    );
};
