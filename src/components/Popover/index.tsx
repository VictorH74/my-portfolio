import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import usePopOver from './usePopOver';

const PopOver: React.FC<{ children: JSX.Element; label: string }> = ({
    children,
    label,
}) => {
    const hook = usePopOver();

    return (
        <>
            <Typography
                aria-owns={hook.open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={hook.handlePopoverOpen}
                onMouseLeave={hook.handlePopoverClose}
            >
                {children}
            </Typography>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={hook.open}
                anchorEl={hook.anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={hook.handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1 }}>{label}</Typography>
            </Popover>
        </>
    );
};

export default PopOver;
