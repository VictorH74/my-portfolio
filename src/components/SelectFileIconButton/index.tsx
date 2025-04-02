import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { iconButtonClassName } from '../IconButton';
import { MuiIconType } from '@/types';
import { twMerge } from 'tailwind-merge';

interface SelectFileIconButtonProps {
    multiple?: boolean;
    accept?: string;
    onChange(_: FileList | null): void;
    icon?: MuiIconType;
    iconFontSize?: number;
    className?: string;
}

export const SelectFileIconButton = React.forwardRef<
    HTMLInputElement,
    SelectFileIconButtonProps
>(function SelectFileIconButton(
    { onChange, icon, iconFontSize, className, ...props },
    ref
) {
    const btnId = React.useId();
    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        const files = fileInput.files;

        onChange(files);
    };

    const Icon = icon || EditIcon;

    return (
        <div className={twMerge(iconButtonClassName, className)}>
            <label
                htmlFor={btnId}
                className="cursor-pointer size-full grid place-items-center"
            >
                <Icon
                    sx={{
                        fontSize: iconFontSize || 27,
                    }}
                />
            </label>
            <input
                ref={ref}
                {...props}
                id={btnId}
                onChange={handleSelectFile}
                className="absolute pointer-events-none opacity-0 border-[3px] rounded-md"
                type="file"
            />
        </div>
    );
});
