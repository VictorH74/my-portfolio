import React from 'react';

export interface SettingsMenuProps extends React.PropsWithChildren {
    onClose(): void;
}

export const useSettingsMenu = (props: SettingsMenuProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setTimeout(props.onClose, 310);
    };

    return {
        anchorEl,
        open,
        handleClick,
        handleClose,
    };
};
