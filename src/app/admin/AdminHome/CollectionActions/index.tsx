import AddIcon from '@mui/icons-material/Add';
import ReorderIcon from '@mui/icons-material/Reorder';
import Button from '../Button';

interface CollectionActionsProps {
    collectionName: string;
    addFunc(): void;
    reorderFunc(): void;
}

export default function CollectionActions(props: CollectionActionsProps) {
    return (
        <div className="flex gap-2 items-center mb-2">
            <h1 className="text-2xl mr-3 primary-font-color">
                {props.collectionName}
            </h1>
            <Button onClick={props.addFunc}>
                <AddIcon />
            </Button>
            <Button onClick={props.reorderFunc}>
                <ReorderIcon />
            </Button>
        </div>
    );
}
