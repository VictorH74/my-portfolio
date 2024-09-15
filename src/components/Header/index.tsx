'use client';
import React from 'react';
import { downloadResume } from '@/utils/resume';
import Hamburger from './Hamburger';
import { Raleway } from 'next/font/google';
import useHeader, { navlinkArray } from './useHeader';
import NavListItem from './NavListItem';
import SettingsMenu from './SettingsMenu';
import NavItemWapper from './NavItemWapper';
import { useTheme } from '@/hooks/UseTheme';
import MenuItem from '@mui/material/MenuItem';
import SwitchThemeColorBtn from '../SwitchThemeColorBtn';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createPortal } from 'react-dom';
import SwitchBgAnimation from './SwitchBgAnimation';
import { twMerge } from 'tailwind-merge';
import useWindowSize from '@/hooks/UseWindowsSize';
import { useTranslations } from 'next-intl';

const BackgroundAnimation = React.lazy(
    () => import('@/components/BackgroundAnimation')
);

const raleway = Raleway({
    subsets: ['latin'],
    display: 'swap',
    style: 'italic',
    weight: '300',
});

const Header: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    const [isClient, setIsClient] = React.useState(false);
    const shadowLogoRef = React.useRef<HTMLSpanElement>(null);
    const logoRef = React.useRef<HTMLSpanElement>(null);
    const size = useWindowSize();
    const t = useTranslations('Header');
    const navLabelT = useTranslations('nav_link_label');

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    React.useEffect(() => {
        if (isLoading || !shadowLogoRef.current || !logoRef.current) return;
        const { top, left } = shadowLogoRef.current!.getBoundingClientRect();
        logoRef.current!.style.top = top + 'px';
        logoRef.current!.style.left = left + 'px';
        logoRef.current!.style.fontSize = '2.25rem';
        logoRef.current!.style.lineHeight = '2.5rem';
        logoRef.current!.style.transform = 'translate(0)';
    }, [isClient, size, isLoading]);

    const hook = useHeader();
    const { themeColor } = useTheme();

    if (!isClient) return null;

    return (
        <>
            <span
                ref={logoRef}
                className={twMerge(
                    'line-through text-[var(--theme-color)] fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-9xl uppercase z-[9999] duration-300',
                    raleway.className,
                    isLoading && 'animate-pulse'
                )}
            >
                vh
            </span>
            <header className="fixed top-0 inset-x-0 z-10">
                <div
                    className={twMerge(
                        'm-auto py-2 px-5 rounded-full backdrop-blur-[8px] flex items-center h-fit duration-300 uppercase bg-[#cccccce5] dark:bg-[#383838e5] shadow-xl',
                        hook.scrollUp && 'bg-transparent dark:bg-transparent',
                        isLoading && 'opacity-0'
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
                            ref={shadowLogoRef}
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
};

export default React.memo(Header);
