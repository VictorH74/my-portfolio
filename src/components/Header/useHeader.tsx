import { useRef, useEffect, useState } from 'react';

export const anchorLinkHref = [
    '#welcome',
    '#about-me',
    '#technologies',
    '#projects',
    '#contact-me',
] as const;

function isMobilePortrait() {
    if (typeof navigator === 'undefined' || typeof window === 'undefined')
        return false;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    return isMobile && window.matchMedia('(orientation: portrait)').matches;
}

export const useHeader = () => {
    const [showHeader, setShowHeader] = useState(true);
    const [isInHeroSection, setIsInHeroSection] = useState(true);
    const headerRef = useRef<HTMLDivElement>(null);

    const prevScrollTopRef = useRef(0);
    const showHeaderRef = useRef(showHeader);
    const isMobile = useRef(isMobilePortrait());

    useEffect(() => {
        showHeaderRef.current = showHeader;
    }, [showHeader]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.scrollY;

            if (
                (currentScrollTop < prevScrollTopRef.current &&
                    !showHeaderRef.current) ||
                currentScrollTop >=
                    document.body.scrollHeight - window.innerHeight
            ) {
                setShowHeader(true);
            } else if (
                currentScrollTop > prevScrollTopRef.current &&
                showHeaderRef.current
            ) {
                setShowHeader(false);
            }
            prevScrollTopRef.current = currentScrollTop;
        };

        const computeHeaderBackground = () => {
            if (!headerRef.current) return;
            const currentScrollTop = window.scrollY;
            const headerHeight =
                headerRef.current.getBoundingClientRect().height;
            if (currentScrollTop + headerHeight < window.innerHeight) {
                setIsInHeroSection(true);
            } else {
                setIsInHeroSection(false);
            }
        };

        const controller = new AbortController();
        if (!isMobile.current) {
            document.addEventListener('scroll', handleScroll, {
                signal: controller.signal,
            });
        }
        document.addEventListener('scroll', computeHeaderBackground, {
            signal: controller.signal,
        });

        return () => {
            controller.abort();
        };
    }, []);

    return {
        showHeader,
        headerRef,
        isInHeroSection,
    };
};

export default useHeader;
