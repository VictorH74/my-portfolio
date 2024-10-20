'use client';
import { ThemeColorType } from '@/types';
import { THEME_COLOR_KEY, THEME_COLORS } from '@/utils/constants';
import React from 'react';

interface AppContextInterface {
    themeColor: ThemeColorType;
    setThemeColor: (_e: ThemeColorType) => void;
}

export const ThemeContext = React.createContext<AppContextInterface>({
    themeColor: THEME_COLORS[1],
    setThemeColor: () => {},
});

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
    const [themeColor, setThemeColorState] = React.useState<ThemeColorType>(
        THEME_COLORS[1]
    );

    React.useEffect(() => {
        let recoveredColor = localStorage.getItem(THEME_COLOR_KEY);
        setThemeColorState(
            !recoveredColor || recoveredColor.startsWith('#')
                ? THEME_COLORS[1]
                : JSON.parse(recoveredColor)
        );
    }, []);

    const setThemeColor = (color: ThemeColorType) => {
        localStorage.setItem(THEME_COLOR_KEY, JSON.stringify(color));
        setThemeColorState(color);
    };

    React.useEffect(() => {
        if (!themeColor) return;

        document.documentElement.style.setProperty(
            '--theme-color',
            themeColor.color
        );

        const setFavicon = async (svgUrl: string, newColor: string) => {
            // Fetch the original SVG content
            const faviconUrl = new URL(svgUrl, window.location.origin);
            const response = await fetch(faviconUrl.href, {
                cache: 'no-store',
            });
            const svgText = await response.text();

            // Create a new DOMParser to parse the SVG text and manipulate it
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.documentElement;

            // Modify the `fill` property of the SVG circle child
            svgElement
                .getElementsByTagName('circle')[0]
                .setAttribute('fill', newColor);

            // Serialize the modified SVG back into a string
            const updatedSvg = new XMLSerializer().serializeToString(
                svgElement
            );

            // Convert the updated SVG string to a blob
            const blob = new Blob([updatedSvg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);

            // Create or update the favicon link element
            let link: HTMLLinkElement | null =
                document.querySelector("link[rel*='icon']");
            if (!link) {
                link = document.createElement('link');
                link.type = 'image/svg+xml';
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
            }

            // Set the new favicon href
            link.href = url;

            // Cleanup: Revoke the blob URL when it's no longer needed
            return () => {
                URL.revokeObjectURL(url);
            };
        };

        // Use the function to change the favicon
        setFavicon('icons/favicon.svg', themeColor.color);
    }, [themeColor]);

    // if (!themeColor) return null;

    return (
        <ThemeContext.Provider
            value={{
                themeColor: themeColor!,
                setThemeColor,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
