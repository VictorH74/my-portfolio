import { useTranslations } from 'next-intl';
import './style.css';
import { useDownloadResumeBtn } from './useDownloadResumeBtn';
import { downloadResume } from '@/utils/resume';

export const DownloadResumeBtn = () => {
    const t = useTranslations('AboutMeSection');
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
            className="download-resume-btn bg-secondary-black shrink-0 px-8 rounded-md uppercase text-white font-medium relative cursor-pointer w-[13rem]"
        >
            <div className="button-wrapper">
                <div className="text top-0 text-base flex items-center justify-center">
                    {t('download_resume_btn')}
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
