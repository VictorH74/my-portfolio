/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from 'react';
import useWindowSize from '@/hooks/UseWindowsSize';
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

const useHeader = () => {
    const [showBgAnimation, setShowBgAnimation] = React.useState(true);
    const [scrollUp, setScrollUp] = React.useState(true);
    const [showWrapper, setShowWrapper] = React.useState(false);
    const [wrappedLI, setWrappedLI] = React.useState('');
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

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
    };
};

export default useHeader;
