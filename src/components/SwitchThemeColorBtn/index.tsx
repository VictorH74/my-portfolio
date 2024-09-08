import { useTheme } from '@/hooks/UseTheme';
import React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { THEME_COLORS } from '@/utils/constants';

const colors = THEME_COLORS;

export default function SwitchThemeColorBtn() {
    const { themeColor, setThemeColor } = useTheme();
    const [sliderValue, setSliderValue] = React.useState(0);

    const handleChange = (_: Event, value: number | number[]) => {
        setThemeColor(colors[(value as number) - 1]);
    };

    React.useEffect(() => {
        colors.forEach((c, i) => {
            if (themeColor.color === c.color) setSliderValue(i + 1);
        });
    }, [themeColor]);

    return (
        <div className="fixeda bottom-10a left-4a">
            <Box width={170}>
                <Slider
                    sx={{
                        color: '#000',
                        '& .MuiSlider-thumb': {
                            backgroundColor: themeColor.color,
                        },
                    }}
                    marks={true}
                    min={1}
                    max={colors.length}
                    track={false}
                    value={sliderValue}
                    onChange={handleChange}
                />
            </Box>
        </div>
    );
}
