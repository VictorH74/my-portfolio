import { DownloadResumeBtn } from '@/components/DownloadResumeBtn';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

import { bgColors, delayFactor, useHamburger } from './useHamburger';
import { anchorLinkHref } from '../useHeader';

import './style.css';

export const Hamburger = () => {
    const t = useTranslations('Header');

    const hook = useHamburger();

    return (
        <div id="hamburger" className="min-lg:hidden">
            <div
                className="cursor-pointer h-7 w-8 grid gap-[0.438rem]"
                onClick={hook.show}
            >
                {Array(3)
                    .fill(undefined)
                    .map((_, i) => (
                        <span
                            key={i}
                            className={twMerge(
                                'h-[0.188rem] w-full rounded-xl bg-background',
                                [0, 2].includes(i)
                                    ? "origin-left duration-300'"
                                    : 'duration-150'
                            )}
                        ></span>
                    ))}
            </div>
            {hook.visibleHumburgerNav &&
                createPortal(
                    <div className="fixed inset-0 z-50">
                        {bgColors.map((bgColor, i) => (
                            <div
                                key={bgColor}
                                className={twMerge(
                                    'absolute inset-0 left-full animate-fade-right-in animation-el',
                                    bgColor
                                )}
                                style={{
                                    animationDelay: i * delayFactor + 'ms',
                                }}
                            ></div>
                        ))}
                        <div
                            className="bg-background absolute inset-0 animate-fade-right-in left-full animation-el"
                            style={{
                                animationDelay:
                                    bgColors.length * delayFactor + 'ms',
                            }}
                        >
                            <div className="w-full flex flex-row-reverse">
                                <button
                                    onClick={hook.hide}
                                    className={twMerge(
                                        '-translate-x-1/2 translate-y-1/2 duration-300 opacity-0'
                                    )}
                                    ref={hook.closeNavBtnRef}
                                >
                                    <CloseIcon
                                        sx={{
                                            fontSize: 60,
                                        }}
                                    />
                                </button>
                            </div>
                            <nav className="w-full h-[80vh] grid place-items-center">
                                <ul className="flex flex-col gap-2 w-full h-fit text-2xl">
                                    {anchorLinkHref.map((href) => (
                                        <li key={href} className="contents">
                                            <Link
                                                href={href}
                                                className="p-5 font-bold text-dark-font  w-full text-center truncate"
                                                onClick={hook.hide}
                                            >
                                                {t('nav_link_label_' + href)}
                                            </Link>
                                            <hr className="w-[3.125rem] h-[0.125rem] m-auto bg-dark-font" />
                                        </li>
                                    ))}
                                    <li className="my-5">
                                        <DownloadResumeBtn className="w-full text-2xl rounded-none truncate py-4" />
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>,
                    document.getElementById('portal-destination')!
                )}
        </div>
    );
};
