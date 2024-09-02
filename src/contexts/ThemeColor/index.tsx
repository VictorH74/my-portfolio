'use client';
import { THEME_COLOR_KEY, THEME_COLORS } from '@/utils/constants';
import React from 'react';

interface AppContextInterface {
    themeColor: (typeof THEME_COLORS)[0];
    setThemeColor: (e: (typeof THEME_COLORS)[0]) => void;
}

interface Props {
    children: React.ReactNode;
}

export const ThemeContext = React.createContext<AppContextInterface>({
    themeColor: THEME_COLORS[1],
    setThemeColor: () => {},
});

export const ThemeProvider: React.FC<Props> = ({ children }) => {
    const [themeColor, setThemeColorState] = React.useState<
        (typeof THEME_COLORS)[0]
    >(THEME_COLORS[1]);

    const setThemeColor = (color: (typeof THEME_COLORS)[0]) => {
        localStorage.setItem(THEME_COLOR_KEY, JSON.stringify(color));
        setThemeColorState(color);
    };

    const values: AppContextInterface = {
        themeColor,
        setThemeColor,
    };

    React.useEffect(() => {
        let recoveredColor = localStorage.getItem(THEME_COLOR_KEY);
        if (!recoveredColor) return;

        if (recoveredColor.startsWith('#')) {
            setThemeColorState(THEME_COLORS[1]);
        } else {
            setThemeColorState(JSON.parse(recoveredColor));
        }
    }, []);

    React.useEffect(() => {
        document.documentElement.style.setProperty(
            '--theme-color',
            themeColor.color
        );
    }, [themeColor]);

    return (
        <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
    );
};
