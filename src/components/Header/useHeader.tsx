/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import useWindowSize from '@/hooks/UseWindowsSize';
import React from 'react';

import { WapperDimensionsType } from './NavItemWapper';

export const navlinkArray = [
    '#',
    '#about-me',
    '#technologies',
    '#projects',
    '#contact-me',
    '#contacts',
    '#download-btn',
];

export interface HeaderProps {
    isLoading: boolean;
}

const useHeader = (props: HeaderProps) => {
    const [showBgAnimation, setShowBgAnimation] = React.useState(false);
    const [scrollUp, setScrollUp] = React.useState(true);
    const [showWrapper, setShowWrapper] = React.useState(false);
    const [wrappedLI, setWrappedLI] = React.useState('');
    const [isClient, setIsClient] = React.useState(false);
    const shadowLogoRef = React.useRef<HTMLSpanElement>(null);
    const logoRef = React.useRef<HTMLSpanElement>(null);
    const [wrapperDimensions, setWrapperDimensions] =
        React.useState<WapperDimensionsType>({
            width: 0,
            height: 0,
            left: 0,
        });
    const downloadResumeBtnRef = React.useRef(null);
    const size = useWindowSize();

    React.useEffect(() => {
        document.addEventListener('scroll', handleScroll);

        setIsClient(true);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    React.useEffect(() => {
        if (props.isLoading || !shadowLogoRef.current || !logoRef.current)
            return;
        const { top, left } = shadowLogoRef.current!.getBoundingClientRect();
        logoRef.current!.style.top = top + 'px';
        logoRef.current!.style.left = left + 'px';
        logoRef.current!.style.fontSize = '2.25rem';
        logoRef.current!.style.lineHeight = '2.5rem';
        logoRef.current!.style.transform = 'translate(0)';
    }, [isClient, size, props.isLoading]);

    React.useEffect(() => {
        setTimeout(() => {
            moveWrapperToDownloadBtn();
            setShowWrapper(() => true);
        }, 100);
    }, [downloadResumeBtnRef]);

    React.useEffect(() => {
        if (size[0] <= 1100) return;
        moveWrapperToDownloadBtn();
    }, [size]);

    // background da navbar
    const handleScroll = React.useCallback(() => {
        let pageY = window.scrollY;

        setScrollUp(pageY <= 40);
    }, []);

    const changeWrapperPosition = (li: HTMLElement, wrappedLI: string) => {
        const { width, height } = li.closest('li')?.getBoundingClientRect() || {
            width: 0,
            height: 0,
        };
        setWrappedLI(wrappedLI);
        setWrapperDimensions({
            width,
            height,
            left: li.offsetLeft,
        });
    };

    const handleMouseOver = React.useCallback(
        (e: React.MouseEvent<HTMLLIElement>) => {
            const li = e?.currentTarget;
            changeWrapperPosition(li, li.id);
        },
        []
    );

    const moveWrapperToDownloadBtn = React.useCallback(() => {
        if (!downloadResumeBtnRef?.current) return;

        changeWrapperPosition(downloadResumeBtnRef.current, 'li-#download-btn');
    }, []);

    return {
        showWrapper,
        scrollUp,
        size,
        wrapperDimensions,
        moveWrapperToDownloadBtn,
        wrappedLI,
        handleMouseOver,
        downloadResumeBtnRef,
        showBgAnimation,
        setShowBgAnimation,
        isClient,
        logoRef,
        shadowLogoRef,
    };
};

export default useHeader;
