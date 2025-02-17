'use client';
import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';

interface CopyableContentBtnProps {
    content: string;
    formatContent?: (content: string) => string;
}

export const CopyableContentBtn: React.FC<CopyableContentBtnProps> = ({
    content,
    formatContent,
}) => {
    const [copySuccess, setCopySuccess] = React.useState(false);

    React.useEffect(() => {
        if (!copySuccess) return;
        setTimeout(() => setCopySuccess(false), 2000);
    }, [copySuccess]);

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(formatContent ? formatContent(content) : content)
            .then(() => {
                setCopySuccess(true);
            })
            .catch(() => {
                alert('Failed to copy text 🫤');
            });
    };

    return (
        <button
            className="py-4 w-full bg-secondary-black rounded-md text-white shadow-[0.25rem_0.25rem_0.5rem_#00000050] cursor-pointer bg-custom-gray-dark p-2 hover:brightness-110 text-center duration-150 max-sm:col-span-2 backdrop-blur-md flex flex-row items-center gap-4 justify-center"
            type="button"
            onClick={copyToClipboard}
            disabled={copySuccess}
        >
            <p>{content}</p>

            {copySuccess ? (
                <DoneIcon className="text-green-300" />
            ) : (
                <ContentCopyIcon />
            )}
        </button>
    );
};
