import { useFrozenFunction } from '@/hooks/useFrozenFunction';
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

    const { func: updateHeaderVisibility } = useFrozenFunction(
        () => {
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

            return false;
        },
        200,
        false
    );

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    return {
        showHeader,
        headerRef,
        isInHeroSection,
    };
};

export default useHeader;
