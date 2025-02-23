import React from 'react';

export const anchorLinkHref = [
    '#welcome',
    '#about-me',
    '#technologies',
    '#projects',
    '#contact-me',
] as const;

function isMobilePortrait() {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    return isMobile && window.matchMedia('(orientation: portrait)').matches;
}

export const useHeader = () => {
    const [prevScrollTop, setPrevScrollTop] = React.useState(0);
    const [showHeader, setShowHeader] = React.useState(true);
    const [isInHeroSection, setIsInHeroSection] = React.useState(true);
    React.useState<string>('#welcome');

    const headerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!headerRef.current) return;

        const controller = handleScroll();

        return () => {
            controller.abort();
        };
    });

    const handleScroll = () => {
        const controller = new AbortController();

        if (!isMobilePortrait()) {
            document.addEventListener('scroll', computeHeaderVisivility, {
                signal: controller.signal,
            });
        }

        document.addEventListener('scroll', computeHeaderBackground, {
            signal: controller.signal,
        });

        return controller;
    };

    const computeHeaderVisivility = () => {
        const currentScrollTop = window.scrollY;

        if (
            (currentScrollTop < prevScrollTop && !showHeader) ||
            currentScrollTop >= document.body.scrollHeight - window.innerHeight
        )
            setShowHeader(true);
        else if (currentScrollTop > prevScrollTop && showHeader)
            setShowHeader(false);

        setPrevScrollTop(currentScrollTop);
    };

    const computeHeaderBackground = () => {
        const currentScrollTop = window.scrollY;

        const headerHeight = headerRef.current!.getBoundingClientRect().height;

        if (
            currentScrollTop + headerHeight < window.innerHeight &&
            !isInHeroSection
        ) {
            setIsInHeroSection(true);
        } else if (
            currentScrollTop + headerHeight > window.innerHeight &&
            isInHeroSection
        )
            setIsInHeroSection(false);
    };

    return {
        showHeader,
        headerRef,
        isInHeroSection,
    };
};
