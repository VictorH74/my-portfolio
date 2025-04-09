import { IconButton } from '@/components/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { twMerge } from 'tailwind-merge';

import { ReorderListBtn } from '../ReorderListBtn';

interface CollectionActionsProps {
    collectionName: string;
    addFunc(): void;
    reorderFunc(): void;
}

export const headingClassName = 'text-3xl mr-3 text-gray-700 font-medium';
const iconBtnClassName =
    'rounded-md hover:scale-100 bg-[#2382FF] text-white hover:scale-110';

export const CollectionActions = (props: CollectionActionsProps) => {
    return (
        <div className="flex gap-2 items-center mb-2">
            <h1 className={headingClassName}>{props.collectionName}</h1>
            <IconButton
                onClick={props.addFunc}
                Icon={AddIcon}
                className={twMerge(iconBtnClassName)}
            />
            <ReorderListBtn
                onClick={props.reorderFunc}
                className={twMerge(iconBtnClassName)}
            />
        </div>
    );
};
