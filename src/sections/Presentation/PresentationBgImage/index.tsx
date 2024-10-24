'use client';
import { useTheme } from '@/hooks/UseTheme';
import { isDarkMode } from '@/utils/functions';
import Image from 'next/image';
import React from 'react';

export const PresentationBgImage = () => {
    const { themeColor } = useTheme();
    const [svgImg, setSvgImg] = React.useState('');

    React.useEffect(() => {
        (async () => {
            const svgUrl = new URL(
                'images/presentation-bg.svg',
                window.location.origin
            );
            const res = await fetch(svgUrl.href, {
                cache: 'no-store',
            });
            const svgText = await res.text();

            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.documentElement;

            const opacity50ColoredElsIndex = [0, 13, 5];
            const opacity70ColoredElsIndex = [4, 6, 8];
            const coloredElsIndex = [1, 2];

            for (let i = 0; i < svgElement.children.length; i++) {
                const el = svgElement.children[i];
                if (coloredElsIndex.includes(i)) {
                    el.setAttribute('fill', themeColor.color);
                    el.setAttribute('fill-opacity', '0.60');
                } else if (opacity50ColoredElsIndex.includes(i)) {
                    el.setAttribute('fill', themeColor.color);
                    el.setAttribute('fill-opacity', '0.20');
                } else if (opacity70ColoredElsIndex.includes(i)) {
                    el.setAttribute('fill', themeColor.color);
                    el.setAttribute('fill-opacity', '0.40');
                } else {
                    el.setAttribute('fill', isDarkMode() ? '#fff' : '#000');
                    el.setAttribute('fill-opacity', '0.07');
                }
            }

            // ...

            const updatedSvgText = new XMLSerializer().serializeToString(
                svgElement
            );

            const blob = new Blob([updatedSvgText], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);

            setSvgImg(url);
        })();
    }, [themeColor]);

    return (
        <Image
            width={10}
            height={10}
            src={svgImg}
            alt="Background image"
            className="h-[123%] w-auto absolute inset-0 object-cover mx-auto"
            loading="lazy"
        />
    );
};
