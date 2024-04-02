import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

interface ProjectCardHoverProps {
    show: boolean;
    editFunc(): void;
    removeFunc(): void;
}

export default function ProjectCardHover(props: ProjectCardHoverProps) {
    return (
        <div className="absolute inset-0 bg-black/70 grid place-items-center duration-200"
            style={{ opacity: props.show ? 1 : 0 }}
        >
            <div className="flex gap-3">
                <button onClick={props.editFunc} ><VisibilityIcon sx={{ fontSize: 35 }} /></button>
                <button onClick={props.removeFunc} ><DeleteIcon sx={{ fontSize: 32 }} /></button>
            </div>
        </div>
    )
}