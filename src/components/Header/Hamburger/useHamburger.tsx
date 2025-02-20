import React from 'react';

export const bgColors = ['bg-[#0aff70]', 'bg-[#46e2e2]', 'bg-[#1e74e4]'];

export const delayFactor = 100;

export const useHamburger = () => {
    const [visibleHumburgerNav, setVisibleHumburgerNav] = React.useState(false);
    const closeNavBtnRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        if (!closeNavBtnRef.current) return;
        setTimeout(() => {
            closeNavBtnRef.current!.style.opacity = '100%';
        }, 500);
    });

    const show = () => setVisibleHumburgerNav(true);
    const hide = () => {
        closeNavBtnRef.current!.style.opacity = '0';

        const els = document.getElementsByClassName('animation-el');

        for (let i = 0; i < els.length; i++) {
            const el = els[i];
            (el as HTMLElement).style.animationDelay =
                (bgColors.length - i) * delayFactor + 'ms';
            el.classList.add('animate-fade-right-out');
        }

        setTimeout(() => {
            setVisibleHumburgerNav(false);
        }, 800);
    };

    return {
        show,
        hide,
        visibleHumburgerNav,
        closeNavBtnRef,
    };
};
