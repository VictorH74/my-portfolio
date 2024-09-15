'use client';
import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import useSettingsMenu, { SettingsMenuProps } from './useSettingsMenu';

export default function SettingsMenu(props: SettingsMenuProps) {
    const hook = useSettingsMenu(props);

    return (
        <>
            <button
                name="settings menu button"
                className="uppercase p-[10px] rounded-[20px]"
                id="basic-button"
                aria-controls={hook.open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={hook.open ? 'true' : undefined}
                onClick={hook.handleClick}
            >
                <SettingsIcon />
            </button>
            <Menu
                id="basic-menu"
                anchorEl={hook.anchorEl}
                open={hook.open}
                onClose={hook.handleClose}
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
