import React from 'react';

export const useModalContainer = () => {
    React.useEffect(() => {
        const paddingRight =
            window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${paddingRight}px`;
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, []);
};
