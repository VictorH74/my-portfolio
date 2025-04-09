'use client';
import { ViewResumeBtn } from '@/components/ViewResumeBtn';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Hamburger } from './Hamburger';
import { anchorLinkHref, useHeader } from './useHeader';

export const Header = () => {
    const t = useTranslations('Header');
    const hook = useHeader();

    return (
        <div
            ref={hook.headerRef}
            className={twMerge(
                'w-full fixed h-[6rem] py-6x min-md:py-10x min-[75rem]:py-4x min-[121rem]:py-10x text-center z-50 duration-300 grid place-items-center capitalize',
                hook.isInHeroSection
                    ? 'bg-primary-black/55 backdrop-blur-md'
                    : 'bg-primary-black shadow-lg'
            )}
            style={{
                top: hook.showHeader
                    ? 0
                    : (hook.headerRef.current?.getBoundingClientRect().height ||
                          0) * -1,
            }}
        >
            <div className="max-w-default w-full px-10 mx-auto justify-between flex items-center">
                <Link href={'/admin'}>
                    <Image
                        src="/me-logo-v2.svg"
                        alt="logo"
                        width={50}
                        height={50}
                        style={{ width: '51px', height: 'auto' }}
                    />
                </Link>
                <nav className="max-lg:hidden">
                    <ul className="text-[#a7b3c5] font-medium flex gap-3 duration-500 items-center">
                        {anchorLinkHref.map((href) => (
                            <li
                                key={href}
                                className="overflow-hidden h-[3rem] relative"
                            >
                                <Link
                                    href={href}
                                    className={twMerge(
                                        'grid hover:-translate-y-[48%] duration-500 p-3 space-y-5'
                                    )}
                                >
                                    <span>{t('nav_link_label_' + href)}</span>
                                    <span className="text-white font-semibold">
                                        {t('nav_link_label_' + href)}
                                    </span>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <ViewResumeBtn />
                        </li>
                    </ul>
                </nav>
                <Hamburger />
            </div>

            <ul
                id="scrolled-project-name-list-container"
                className="absolute left-7 top-[calc(100%+10px)] flex gap-3 flex-wrap p-1"
            ></ul>
        </div>
    );
};
