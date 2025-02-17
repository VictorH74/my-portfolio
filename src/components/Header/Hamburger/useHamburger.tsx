import React from 'react';

export const bgColors = ['bg-[#00FC69]', 'bg-[#4EFFFF]', 'bg-[#2382FF]'];

export const useHamburger = () => {
    const [visibleHumburgerNav, setVisibleHumburgerNav] = React.useState(false);

    const show = () => setVisibleHumburgerNav(true);
    const hide = () => {
        const els = document.getElementsByClassName('animation-el');

        for (let i = 0; i < els.length; i++) {
            const el = els[i];
            (el as HTMLElement).style.animationDelay =
                (bgColors.length - i) * 70 + 'ms';
            el.classList.add('animate-fade-right-out');
        }

        setTimeout(() => {
            setVisibleHumburgerNav(false);
        }, 500);
    };

    return {
        show,
        hide,
        visibleHumburgerNav,
    };
};
