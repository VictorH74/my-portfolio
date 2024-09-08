// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
import CloseIcon from '@mui/icons-material/Close';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import ModalContainer from '@/components/ModalContainer';

interface PdfViewerProps {
    fileUrl: string;
    onClose(): void;
}

export default function PdfViewer(props: PdfViewerProps) {
    return (
        <ModalContainer className="block">
            <div className="max-w-[1000px] overflow-auto m-auto">
                <button
                    className="fixed top-3 right-5 p-5"
                    onClick={props.onClose}
                >
                    <CloseIcon />
                </button>
                <Viewer fileUrl={props.fileUrl} />
            </div>
        </ModalContainer>
    );
}
