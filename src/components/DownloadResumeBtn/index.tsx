import { useTranslations } from 'next-intl';
import './style.css';
import { useDownloadResumeBtn } from './useDownloadResumeBtn';
import { downloadResume } from '@/utils/resume';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
    tooltipDirection?: 'top' | 'bottom';
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
            data-tooltip={`${t('resume_size')}: ${
                hook.isLoading
                    ? 'Loading...'
                    : hook.formatSizeToKB(hook.pdfMetadata?.size || 0) + 'KB'
            }`}
            data-tooltip-direction={props.tooltipDirection || 'top'}
            className={twMerge(
                'download-resume-btn bg-secondary-black shrink-0 px-8 rounded-md text-white relative cursor-pointer w-[13rem]',
                props.className
            )}
        >
            <div className="button-wrapper">
                <div className="text top-0 flex items-center justify-center">
                    {t('label')}
                </div>
                <span className="icon text-white top-full flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        width="2em"
                        height="2em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                        ></path>
                    </svg>
                </span>
            </div>
        </div>
    );
};
