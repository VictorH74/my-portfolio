'use client';
import React from 'react';

export const useWindowResize = () => {
    const [size, setSize] = React.useState<[number, number]>([0, 0]);

    React.useEffect(() => {
        const controler = new AbortController();

        window.addEventListener(
            'resize',
            () => {
                const w = window.innerWidth;
                const h = window.innerHeight;

                setSize([w, h]);
            },
            { signal: controler.signal }
        );

        return () => controler.abort();
    });

    return size;
};
