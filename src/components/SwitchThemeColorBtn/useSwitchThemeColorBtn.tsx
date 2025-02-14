import { useTheme } from '@/hooks/UseTheme';
import { THEME_COLORS } from '@/utils/constants';
import { isDarkMode } from '@/utils/functions';
import React from 'react';

const colors = THEME_COLORS;

export interface SwitchThemeColorBtnProps {
    vertical?: boolean;
}

export const useSwitchThemeColorBtn = (props: SwitchThemeColorBtnProps) => {
    const { themeColor, setThemeColor } = useTheme();
    const [sliderValue, setSliderValue] = React.useState(0);

    const handleChange = (_: Event, value: number | number[]) => {
        if (props.vertical) return;
        setThemeColor(colors[(value as number) - 1]);
    };

    React.useEffect(() => {
        colors.forEach((c, i) => {
            if (themeColor.color === c.color) setSliderValue(i + 1);
        });
    }, [themeColor]);

    const lightTheme = !isDarkMode();

    return {
        themeColor,
        colors,
        sliderValue,
        handleChange,
        lightTheme,
    };
};
