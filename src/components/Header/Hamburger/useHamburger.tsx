import React from 'react';

export const useHamburger = () => {
    const [visibleHumburgerNav, setVisibleHumburgerNav] = React.useState(false);

    const show = () => setVisibleHumburgerNav(true);
    const hide = () => setVisibleHumburgerNav(false);

    return {
        show,
        hide,
        visibleHumburgerNav,
    };
};
