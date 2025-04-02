'use client';
import React from 'react';

const getwindowSize = (): WindowSizeType => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    return [w, h];
};

type WindowSizeType = [number, number];

/**
 *
 * @returns [ width, height ]
 */
export const useWindowResize = () => {
    const [size, setSize] = React.useState<WindowSizeType>(getwindowSize());

    React.useEffect(() => {
        const controler = new AbortController();

        window.addEventListener(
            'resize',
            () => {
                setSize(getwindowSize());
            },
            { signal: controler.signal }
        );

        return () => controler.abort();
    }, []);

    return size;
};
