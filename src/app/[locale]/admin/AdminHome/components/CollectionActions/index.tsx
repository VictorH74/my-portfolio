import AddIcon from '@mui/icons-material/Add';
import ReorderIcon from '@mui/icons-material/Reorder';

import Button from '../Button';

interface CollectionActionsProps {
    collectionName: string;
    addFunc(): void;
    reorderFunc(): void;
}

export const headingClassName = 'text-3xl mr-3 text-gray-700 font-medium';

export const CollectionActions = (props: CollectionActionsProps) => {
    return (
        <div className="flex gap-2 items-center mb-2">
            <h1 className={headingClassName}>{props.collectionName}</h1>
            <Button onClick={props.addFunc}>
                <AddIcon />
            </Button>
            <Button onClick={props.reorderFunc}>
                <ReorderIcon />
            </Button>
        </div>
    );
};
