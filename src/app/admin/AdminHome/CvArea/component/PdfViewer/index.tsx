// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
import CloseIcon from '@mui/icons-material/Close';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

interface PdfViewerProps {
    fileUrl: string
    onClose(): void
}

export default function PdfViewer(props: PdfViewerProps) {
    return (
        <div className='fixed inset-0 overflow-auto bg-black/80'>
            <div className='max-w-[1000px] overflow-auto m-auto'>
                <button className='fixed top-3 right-5 p-5' onClick={props.onClose}>
                    <CloseIcon />
                </button>
                <Viewer fileUrl={props.fileUrl} />
            </div>
        </div>
    )
}