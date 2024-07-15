"use client"
import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';

interface SettingsMenuProps extends React.PropsWithChildren {
    onClose(): void;
}

export default function SettingsMenu(props: SettingsMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setTimeout(props.onClose, 310)
    };

    return (
        <>
            <button
                name="settings menu button"
                className="uppercase p-[10px] rounded-[20px]"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <SettingsIcon />
            </button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}

                disableScrollLock
            >
                {props.children}
            </Menu>
        </>
    );
}