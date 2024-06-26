"use client"
import React from "react";
import { Menu } from '@/components/mui/MuiMenu';
import NavListItem from "../NavListItem";
import SettingsIcon from '@mui/icons-material/Settings';

interface SettingsMenuProps extends React.PropsWithChildren {
    onMouseOver?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
    onClose(): void
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
        <NavListItem id="li-settings" onMouseOver={props.onMouseOver}>
            <button
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
        </NavListItem>
    );
}