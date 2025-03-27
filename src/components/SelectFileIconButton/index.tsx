import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { iconButtonClassName } from '../IconButton';

interface SelectFileIconButtonProps {
    multiple?: boolean;
    accept: string;
    onChange(_: FileList | null): void;
}

export const SelectFileIconButton = React.forwardRef<
    HTMLInputElement,
    SelectFileIconButtonProps
>(function SelectFileIconButton({ onChange, ...props }, ref) {
    const btnId = React.useId();
    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        const files = fileInput.files;

        onChange(files);
    };

    return (
        <div className={iconButtonClassName}>
            <label htmlFor={btnId} className="cursor-pointer">
                <EditIcon
                    sx={{
                        fontSize: 27,
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
