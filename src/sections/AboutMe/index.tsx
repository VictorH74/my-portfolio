'use client';
import { Divider } from '@/components/Divider';
import { ProfileImage } from '@/components/ProfileImage/indext';
import { poppins300, poppins400 } from '@/utils/fonts';
import { isDarkMode } from '@/utils/functions';
import { downloadResume } from '@/utils/resume';
import { useTranslations } from 'next-intl';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { DownloadResumeBtn } from './styles';
import { useAboutMe } from './useAboutMe';

export const AboutMe = () => {
    const t = useTranslations('AboutMe_Section');
    const hook = useAboutMe();

    if (!hook.isClient) return null;

    const darkTheme = isDarkMode();

    const paragraphFont = darkTheme ? poppins300 : poppins400;

    return (
        <section id="about-me" className="pt-24">
            <div className="section-inner">
                <h1 className={`section-title mb-12 max-md:text-center`}>
                    {t('title')}
                </h1>
                <div className="flex flex-col lg:flex-row">
                    <div
                        className="grow shrink basis-96"
                        data-aos-once="true"
                        data-aos="fade-up-right"
                        data-aos-duration="1000"
                    >
                        <div className="paragraphs max-w-[800px] grid gap-4">
                            {[
                                t('paragraph_1'),
                                t('paragraph_2'),
                                t('paragraph_3'),
                            ].map((p, i) => (
                                <p
                                    className={`text-base ${paragraphFont.className} primary-font-color`}
                                    key={i}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div
                        className="img-container grow-0 shrink-0 basis-auto m-auto max-md:my-5 max-md:w-fit"
                        data-aos="zoom-in"
                        data-aos-once="true"
                        data-aos-delay="300"
                        data-aos-duration="400"
                    >
                        <ProfileImage className="rounded-e-full rounded-ss-full max-lg:rounded-es-full max-lg:h-auto max-lg:w-[700px]" />
                    </div>
                </div>

                <div className="flex flex-row items-center gap-5 mt-8">
                    <Divider className="grow shrink basis-auto" />
                    <DownloadResumeBtn
                        onClick={hook.isLoading ? undefined : downloadResume}
                        data-tooltip={`${t('resume_size_text')}: ${
                            hook.isLoading
                                ? 'Loading...'
                                : hook.formatSizeToKB(
                                      hook.pdfMetadata?.size || 0
                                  ) + 'KB'
                        }`}
                        className={twMerge('bg-[var(--theme-color)]')}
                    >
                        <div className="button-wrapper">
                            <div className="text text-base">
                                {t('download_resume_btn_text')}
                            </div>
                            <span className="icon">
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
                    </DownloadResumeBtn>
                    <Divider className="grow shrink basis-auto" />
                </div>
            </div>
        </section>
    );
};
