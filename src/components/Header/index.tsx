'use client';
import React from 'react';
import { downloadResume } from '@/utils/resume';
import Hamburger from './Hamburger';
import { Raleway } from 'next/font/google';
import useHeader from './useHeader';
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

const BackgroundAnimation = React.lazy(
    () => import('@/components/BackgroundAnimation')
);

const raleway = Raleway({
    subsets: ['latin'],
    display: 'swap',
    style: 'italic',
    weight: '300',
});

const Header: React.FC = () => {
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const hook = useHeader();
    const { themeColor } = useTheme();

    if (!isClient) return null;

    return (
        <header className="fixed top-0 inset-x-0 z-10">
            <div
                className={twMerge(
                    'm-auto py-2 px-5 rounded-full backdrop-blur-[8px] flex items-center h-fit duration-300 uppercase bg-[#cccccce5] dark:bg-[#383838e5] shadow-xl',
                    hook.scrollUp && 'bg-transparent dark:bg-transparent'
                )}
            >
                <h1
                    className={`grow text-4xl shrink-0 basis-auto  z-[9910] select-none`}
                >
                    <span className={twMerge('primary-font-color')}>&lt;</span>{' '}
                    <span
                        className={twMerge(
                            'line-through text-[var(--theme-color)]',
                            raleway.className
                        )}
                    >
                        vh
                    </span>{' '}
                    <span className={twMerge('primary-font-color')}>/&gt;</span>
                </h1>
                {hook.size[0] > 1100 ? (
                    <>
                        <NavItemWapper
                            wrapperDimensions={hook.wrapperDimensions}
                            showWrapper={hook.showWrapper}
                        />
                        <nav
                            className="max-lg:hidden z-[4]"
                            onMouseOut={hook.moveWrapperToDownloadBtn}
                        >
                            <ul className="flex flex-wrap items-center py-1">
                                {hook.navDataArray.map((data, i) => {
                                    const last =
                                        i === hook.navDataArray.length - 1;
                                    return (
                                        <NavListItem
                                            onPageTop={hook.scrollUp}
                                            onFocused={
                                                hook.wrappedLI ===
                                                'li-' + data.to
                                            }
                                            className={twMerge(
                                                'p-[10px]',
                                                last && 'p-0'
                                                // notoSans.className
                                            )}
                                            id={`li-${data.to}`}
                                            key={i}
                                            onClick={
                                                last
                                                    ? downloadResume
                                                    : () =>
                                                          window.location.replace(
                                                              `#${
                                                                  data.to || ''
                                                              }`
                                                          )
                                            }
                                            onMouseOver={hook.handleMouseOver}
                                        >
                                            {last ? (
                                                <button
                                                    name="download resume button"
                                                    id="li-download-btn"
                                                    className="uppercase p-[10px] rounded-[20px]"
                                                    ref={
                                                        hook.downloadResumeBtnRef
                                                    }
                                                    onClick={downloadResume}
                                                >
                                                    {
                                                        hook.translate
                                                            .downloadResumeBtnInnerText
                                                    }
                                                </button>
                                            ) : (
                                                data.label
                                            )}
                                        </NavListItem>
                                    );
                                })}
                                <NavListItem
                                    onPageTop={hook.scrollUp}
                                    onFocused={hook.wrappedLI === 'li-settings'}
                                    id="li-settings"
                                    onMouseOver={hook.handleMouseOver}
                                >
                                    <SettingsMenu
                                        onClose={hook.moveWrapperToDownloadBtn}
                                    >
                                        <MenuItem disableTouchRipple>
                                            <label className="flex flex-col">
                                                {hook.translate.showBgAnimation}
                                                <FormControlLabel
                                                    control={
                                                        <SwitchBgAnimation
                                                            themeColor={
                                                                themeColor.color
                                                            }
                                                            sx={{ m: 1 }}
                                                            defaultChecked
                                                            onChange={(e) => {
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
                                                {
                                                    hook.translate
                                                        .switchThemeColor
                                                }
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
                        navData={hook.navDataArray}
                        downloadResumeBtnInnerText={
                            hook.translate.downloadResumeBtnInnerText
                        }
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
    );
};

export default React.memo(Header);
