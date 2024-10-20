'use client';
import { useTheme } from '@/hooks/UseTheme';
import { downloadResume } from '@/utils/resume';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import { Raleway } from 'next/font/google';
import { useTranslations } from 'next-intl';
import React from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

import Hamburger from './Hamburger';
import NavItemWapper from './NavItemWapper';
import NavListItem from './NavListItem';
import SettingsMenu from './SettingsMenu';
import SwitchBgAnimation from './SwitchBgAnimation';
import useHeader, { HeaderProps, navlinkArray } from './useHeader';
import { SwitchThemeColorBtn } from '../SwitchThemeColorBtn';

const BackgroundAnimation = React.lazy(
    () => import('@/components/BackgroundAnimation')
);

const raleway = Raleway({
    subsets: ['latin'],
    display: 'swap',
    style: 'italic',
    weight: '300',
});

export const Header: React.FC<HeaderProps> = React.memo(function Header(props) {
    const t = useTranslations('Header');
    const navLabelT = useTranslations('nav_link_label');

    const hook = useHeader(props);
    const { themeColor } = useTheme();

    if (!hook.isClient) return null;

    return (
        <>
            <span
                ref={hook.logoRef}
                className={twMerge(
                    'line-through text-[var(--theme-color)] fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-9xl uppercase z-[9999] duration-300',
                    raleway.className,
                    props.isLoading && 'animate-pulse'
                )}
            >
                vh
            </span>
            <header className="fixed top-0 inset-x-0 z-10">
                <div
                    className={twMerge(
                        'm-auto py-2 px-5 rounded-full backdrop-blur-[8px] flex items-center h-fit duration-300 uppercase bg-[#cccccce5] dark:bg-[#383838e5] shadow-xl',
                        hook.scrollUp && 'bg-transparent dark:bg-transparent',
                        props.isLoading && 'opacity-0'
                    )}
                >
                    <h1
                        className={`grow text-4xl shrink-0 basis-auto z-[9910] select-none`}
                    >
                        <span
                            className={twMerge(
                                'primary-font-color duration-300'
                            )}
                        >
                            &lt;
                        </span>{' '}
                        <span
                            ref={hook.shadowLogoRef}
                            className="opacity-0 pointer-events-none"
                        >
                            vh
                        </span>{' '}
                        <span
                            className={twMerge(
                                'primary-font-color duration-300'
                            )}
                        >
                            /&gt;
                        </span>
                    </h1>
                    {hook.size[0] > 1100 ? (
                        <>
                            <NavItemWapper
                                wrapperDimensions={hook.wrapperDimensions}
                                showWrapper={hook.showWrapper}
                            />
                            <nav
                                className={twMerge(
                                    'max-lg:hidden z-[4] duration-300'
                                )}
                                onMouseOut={hook.moveWrapperToDownloadBtn}
                            >
                                <ul className="flex flex-wrap items-center py-1">
                                    {navlinkArray.map((link, i) => {
                                        const last =
                                            i === navlinkArray.length - 1;
                                        return (
                                            <NavListItem
                                                onPageTop={hook.scrollUp}
                                                onFocused={
                                                    hook.wrappedLI ===
                                                    `li-${link}`
                                                }
                                                className={twMerge(
                                                    'p-[10px]',
                                                    last && 'p-0'
                                                    // notoSans.className
                                                )}
                                                id={`li-${link}`}
                                                key={i}
                                                onClick={
                                                    last
                                                        ? downloadResume
                                                        : () =>
                                                              window.location.replace(
                                                                  link
                                                              )
                                                }
                                                onMouseOver={
                                                    hook.handleMouseOver
                                                }
                                            >
                                                {last ? (
                                                    <button
                                                        name="download resume button"
                                                        id="li-#download-btn"
                                                        className="uppercase p-[10px] rounded-[20px]"
                                                        ref={
                                                            hook.downloadResumeBtnRef
                                                        }
                                                        onClick={downloadResume}
                                                    >
                                                        {t(
                                                            'download_resume_btn_inner_text'
                                                        )}
                                                    </button>
                                                ) : (
                                                    navLabelT(link)
                                                )}
                                            </NavListItem>
                                        );
                                    })}
                                    <NavListItem
                                        onPageTop={hook.scrollUp}
                                        onFocused={
                                            hook.wrappedLI === 'li-settings'
                                        }
                                        id="li-settings"
                                        onMouseOver={hook.handleMouseOver}
                                    >
                                        <SettingsMenu
                                            onClose={
                                                hook.moveWrapperToDownloadBtn
                                            }
                                        >
                                            <MenuItem disableTouchRipple>
                                                <label className="flex flex-col">
                                                    {t('show_bg_animation')}
                                                    <FormControlLabel
                                                        control={
                                                            <SwitchBgAnimation
                                                                themeColor={
                                                                    themeColor.color
                                                                }
                                                                sx={{ m: 1 }}
                                                                defaultChecked
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    hook.setShowBgAnimation(
                                                                        e
                                                                            .currentTarget
                                                                            .checked
                                                                    );
                                                                }}
                                                                checked={
                                                                    hook.showBgAnimation
                                                                }
                                                            />
                                                        }
                                                        label=""
                                                    />
                                                </label>
                                            </MenuItem>
                                            <MenuItem disableTouchRipple>
                                                <div className="flex flex-col">
                                                    {t('switch_theme_color')}
                                                    <SwitchThemeColorBtn />
                                                </div>
                                            </MenuItem>
                                        </SettingsMenu>
                                    </NavListItem>
                                </ul>
                            </nav>
                        </>
                    ) : (
                        <Hamburger
                            downloadResumeBtnInnerText={t(
                                'download_resume_btn_inner_text'
                            )}
                        />
                    )}
                </div>

                {hook.showBgAnimation &&
                    createPortal(
                        <React.Suspense fallback={<></>}>
                            <BackgroundAnimation />
                        </React.Suspense>,
                        document.getElementById('bg-animation') || document.body
                    )}
            </header>
        </>
    );
});
