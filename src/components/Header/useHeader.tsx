import React from 'react';

export const useHeader = () => {
    const [prevScrollTop, setPrevScrollTop] = React.useState(0);
    const [showHeader, setShowHeader] = React.useState(true);
    const [isInHeroSection, setIsInHeroSection] = React.useState(true);

    const headerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!headerRef.current) return;

        const controller = new AbortController();

        document.addEventListener('scroll', handleScroll, {
            signal: controller.signal,
        });

        return () => {
            controller.abort();
        };
    });

    const handleScroll = () => {
        const currentScrollTop = window.scrollY;

        if (currentScrollTop < prevScrollTop && !showHeader)
            setShowHeader(true);
        else if (currentScrollTop > prevScrollTop && showHeader)
            setShowHeader(false);

        setPrevScrollTop(currentScrollTop);

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
