import { IconButton } from '@/components/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import { twMerge } from 'tailwind-merge';

interface ProjectCardHoverProps {
    show: boolean;
    editFunc(): void;
    removeFunc(): void;
}

export const ProjectCardHover = (props: ProjectCardHoverProps) => {
    return (
        <div
            className={twMerge(
                'absolute inset-0 bg-black/70 grid place-items-center duration-200 opacity-0',
                props.show && 'opacity-100'
            )}
        >
            <div className="flex gap-3">
                <IconButton
                    Icon={EditIcon}
                    onClick={props.editFunc}
                    type="button"
                />
                <IconButton
                    Icon={RemoveIcon}
                    onClick={props.removeFunc}
                    type="button"
                />
            </div>
        </div>
    );
};
