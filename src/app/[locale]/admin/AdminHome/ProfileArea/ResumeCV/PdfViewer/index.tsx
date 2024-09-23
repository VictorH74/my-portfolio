// Import the main component
import ModalContainer from '@/components/ModalContainer';
import CloseIcon from '@mui/icons-material/Close';
import { Viewer, Worker } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

interface PdfViewerProps {
    fileUrl: string;
    onClose(): void;
}

export default function PdfViewer(props: PdfViewerProps) {
    return (
        <ModalContainer className="block">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <div className="max-w-[1000px] overflow-auto m-auto">
                    <button
                        className="fixed top-3 right-5 p-5"
                        onClick={props.onClose}
                    >
                        <CloseIcon />
                    </button>
                    <Viewer fileUrl={props.fileUrl} />
                </div>
            </Worker>
        </ModalContainer>
    );
}
