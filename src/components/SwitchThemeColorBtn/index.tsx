import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import {
    useSwitchThemeColorBtn,
    SwitchThemeColorBtnProps,
} from './useSwitchThemeColorBtn';

export const SwitchThemeColorBtn = (props: SwitchThemeColorBtnProps) => {
    const hook = useSwitchThemeColorBtn(props);

    return (
        <div className={twMerge(props.vertical && 'fixed bottom-10 left-4 ')}>
            <Box width={170}>
                <Slider
                    sx={{
                        color: props.vertical
                            ? hook.lightTheme
                                ? '#414141b0'
                                : '#d8d8d845'
                            : '#000',
                        '& .MuiSlider-thumb': {
                            backgroundColor: hook.themeColor.color,
                        },
                    }}
                    marks={true}
                    min={1}
                    max={hook.colors.length}
                    orientation={props.vertical ? 'vertical' : 'horizontal'}
                    track={false}
                    value={hook.sliderValue}
                    onChange={hook.handleChange}
                />
            </Box>
        </div>
    );
};
