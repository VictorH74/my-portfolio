import { isMobilePortrait } from '@/utils/functions';
import { useRef, useEffect, useState } from 'react';

export const anchorLinkHref = [
    '#welcome',
    '#about-me',
    '#technologies',
    '#projects',
    '#contact-me',
] as const;

export const useHeader = () => {
    const [isInHeroSection, setIsInHeroSection] = useState(true);
    const [showHeader, setShowHeader] = useState(true);
    const headerRef = useRef<HTMLDivElement>(null);

    const prevScrollTopRef = useRef(0);
    const showHeaderRef = useRef(true);
    const isMobile = useRef(isMobilePortrait());

    useEffect(() => {
        showHeaderRef.current = showHeader;
    }, [showHeader]);

    useEffect(() => {
        const controller = new AbortController();
        if (!isMobile.current) {
            document.addEventListener('scroll', updateHeaderVisibility, {
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

    const computeHeaderBackground = () => {
        if (!headerRef.current) return;
        const currentScrollTop = window.scrollY;
        const headerHeight = headerRef.current.getBoundingClientRect().height;
        if (currentScrollTop + headerHeight < window.innerHeight) {
            setIsInHeroSection(true);
        } else {
            setIsInHeroSection(false);
        }
    };

    const updateHeaderVisibility = () => {
        const currentScrollTop = window.scrollY;

        if (
            (currentScrollTop < prevScrollTopRef.current &&
                !showHeaderRef.current) ||
            currentScrollTop >= document.body.scrollHeight - window.innerHeight
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

    return {
        showHeader,
        headerRef,
        isInHeroSection,
    };
};

export default useHeader;
