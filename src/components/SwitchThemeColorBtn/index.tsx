import { useTheme } from '@/hooks/UseTheme';
import React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { THEME_COLORS } from '@/utils/constants';
import { twMerge } from 'tailwind-merge';

const colors = THEME_COLORS;

interface SwitchThemeColorBtnProps {
    vertical?: boolean;
}

export default function SwitchThemeColorBtn(props: SwitchThemeColorBtnProps) {
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

    const lightTheme = window.matchMedia(
        '(prefers-color-scheme: light)'
    ).matches;

    return (
        <div className={twMerge(props.vertical && 'fixed bottom-10 left-4 ')}>
            <Box width={170}>
                <Slider
                    sx={{
                        color: props.vertical
                            ? lightTheme
                                ? '#414141b0'
                                : '#d8d8d845'
                            : '#000',
                        '& .MuiSlider-thumb': {
                            backgroundColor: themeColor.color,
                        },
                    }}
                    marks={true}
                    min={1}
                    max={colors.length}
                    orientation={props.vertical ? 'vertical' : 'horizontal'}
                    track={false}
                    value={sliderValue}
                    onChange={handleChange}
                />
            </Box>
        </div>
    );
}
