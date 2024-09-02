import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface ProjectCardHoverProps {
    show: boolean;
    editFunc(): void;
    removeFunc(): void;
}

export default function ProjectCardHover(props: ProjectCardHoverProps) {
    return (
        <div
            className="absolute inset-0 bg-black/70 grid place-items-center duration-200"
            style={{ opacity: props.show ? 1 : 0 }}
        >
            <div className="flex gap-3">
                <button
                    className="border-[3px] rounded-md"
                    onClick={props.editFunc}
                >
                    <EditIcon sx={{ fontSize: 27 }} />
                </button>
                <button onClick={props.removeFunc}>
                    <DeleteIcon sx={{ fontSize: 32 }} />
                </button>
            </div>
        </div>
    );
}
