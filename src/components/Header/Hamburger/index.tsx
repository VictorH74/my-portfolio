import { useTranslations } from 'next-intl';
import React from 'react';
import { useHamburger } from './useHamburger';
import { twMerge } from 'tailwind-merge';
import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import { anchorLinks } from '../useHeader';
import Link from 'next/link';

const bgColors = ['bg-[#00FC69]', 'bg-[#4EFFFF]', 'bg-[#2382FF]'];

export const Hamburger = () => {
    const t = useTranslations('Header');

    const hook = useHamburger();

    return (
        <div id="hamburger" className="min-lg:hidden">
            <div
                className="cursor-pointer h-7 w-8 grid gap-[0.438rem]"
                onClick={hook.show}
            >
                {/* TODO: improve className */}
                {Array(3)
                    .fill(undefined)
                    .map((_, i) => (
                        <span
                            key={i}
                            className={twMerge(
                                'h-[0.188rem] w-full rounded-xl bg-white',
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
                                    'absolute inset-0 left-full animate-fade-right',
                                    bgColor
                                )}
                                style={{
                                    animationDelay: i * 70 + 'ms',
                                }}
                            ></div>
                        ))}
                        <div
                            className="bg-white absolute inset-0 animate-fade-right left-full"
                            style={{
                                animationDelay: bgColors.length * 70 + 'ms',
                            }}
                        >
                            <div className="w-full p-5 flex flex-row-reverse">
                                <button onClick={hook.hide}>
                                    <CloseIcon
                                        sx={{
                                            fontSize: 60,
                                        }}
                                    />
                                </button>
                            </div>
                            <nav className="size-full grid place-items-center">
                                <ul className="flex flex-col gap-2 w-full h-fit">
                                    {anchorLinks.map((anchor) => (
                                        <li
                                            key={anchor.href}
                                            className="contents"
                                        >
                                            <Link
                                                href={anchor.href}
                                                className="p-5 font-bold text-dark-font text-3xl  w-full text-center"
                                                onClick={hook.hide}
                                            >
                                                {t(
                                                    'nav_link_label_' +
                                                        anchor.href
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>,
                    document.getElementById('portal-destination')!
                )}
        </div>
    );
};
