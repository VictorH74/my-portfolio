'use client';
import { useTheme } from '@/hooks/UseTheme';
import { downloadResume } from '@/utils/resume';
import { useTranslations } from 'next-intl';
import React from 'react';

import useHamburger from './useHamburger';
import { navlinkArray } from '../useHeader';

interface Props {
    downloadResumeBtnInnerText: string;
}

const Hamburger = (props: Props) => {
    const navLabelT = useTranslations('nav_link_label');
    const liItemRef = React.useRef(null);
    const { themeColor } = useTheme();

    const hook = useHamburger();

    return (
        <div id="hamburger">
            <div
                className="cursor-pointer h-7 w-8 grid gap-[7px]"
                onClick={hook.toggle}
            >
                {/* TODO: improve className */}
                {Array(3)
                    .fill(undefined)
                    .map((_, i) => (
                        <span
                            key={i}
                            className={`h-1 w-full rounded-xl bg-[var(--theme-color)] ${
                                [0, 2].includes(i)
                                    ? 'origin-left duration-300'
                                    : 'duration-150'
                            } ${
                                hook.show
                                    ? i === 0
                                        ? 'rotate-45'
                                        : i === 1
                                        ? 'scale-0'
                                        : '-rotate-45'
                                    : ''
                            }`}
                        ></span>
                    ))}
            </div>
            <div className="fixed top-24 -right-5 pointer-events-none">
                <ul className="nav-ul">
                    {navlinkArray.map((link, i) => {
                        const last = i == navlinkArray.length - 1;
                        return (
                            <li
                                id={`li-${link}`}
                                className={`li-item select-none rounded-tl-xl rounded-bl-xl pointer-events-auto z-10 cursor-pointer text-sm p-3 my-4 duration-150 ${
                                    hook.show
                                        ? 'translate-x-0'
                                        : 'translate-x-[101%]'
                                }`}
                                style={{
                                    transitionDelay: `${i || 0}00ms`,
                                    background: last
                                        ? 'linear-gradient(30deg, rgba(181, 22, 212, 1) 20%, rgba(77, 77, 205, 1) 100%)'
                                        : themeColor.color,
                                }}
                                key={i}
                                ref={liItemRef}
                                onClick={
                                    last
                                        ? downloadResume
                                        : () => window.location.replace(link)
                                }
                            >
                                {last
                                    ? props.downloadResumeBtnInnerText
                                    : navLabelT(link)}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default React.memo(Hamburger);
