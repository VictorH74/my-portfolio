import ModalContainer from '@/components/ModalContainer';
import Image from 'next/image';
import React from 'react';
import useEditImageModal, { EditImageModalProps } from './useEditImageModal';

export default function EditImageModal(props: EditImageModalProps) {
    const hook = useEditImageModal(props);

    return (
        <ModalContainer className="bg-transparent backdrop-blur-md">
            <div className="size-auto bg-custom-gray-light rounded-md w-auto relative shadow-md">
                {hook.previewImgSrc && (
                    <Image
                        alt="preview image"
                        src={hook.previewImgSrc}
                        width={200}
                        height={200}
                        className="select-none max-w-[200px] max-h-[200px] size-fit pointer-events-none fixed bottom-3 left-3 rounded-md shadow-md"
                        loading="lazy"
                    />
                )}
                <div className="w-[1400px] max-[1400px]:w-[98vw] max-h-[80vh] grid place-items-center">
                    <div className="relative size-fit">
                        <Image
                            ref={hook.imgRef}
                            alt="editable image"
                            src={props.imageSrc}
                            width={100}
                            height={100}
                            className="size-fit max-h-[80vh] select-none pointer-events-none"
                            onLoad={hook.setupCropArea}
                        />
                        <div
                            ref={hook.maskWestRef}
                            className="absolute pointer-events-none left-0 bg-[#00000094]"
                        />
                        <div
                            ref={hook.maskNorthRef}
                            className="absolute pointer-events-none top-0 inset-x-0 bg-[#00000094]"
                        />
                        <div
                            ref={hook.maskEastRef}
                            className="absolute pointer-events-none right-0 bg-[#00000094]"
                        />
                        <div
                            ref={hook.maskSouthRef}
                            className="absolute pointer-events-none bottom-0 inset-x-0 bg-[#00000094]"
                        />
                        <div
                            ref={hook.cropAreaRef}
                            className="absolute outline outline-1 outline-gray-300 cursor-move"
                            onMouseUp={hook.handleDragEnd}
                            onMouseLeave={hook.handleDragEnd}
                            onMouseDown={hook.handleDragStart}
                            onMouseMove={hook.onDraggableMove}
                        ></div>
                    </div>
                </div>
                <div className="text-center py-4 space-x-2 bg-zinc-800">
                    <button
                        className="py-2 px-10 bg-[var(--theme-color)] rounded-md hover:brightness-110 duration-200"
                        onClick={hook.handleSave}
                    >
                        Save
                    </button>
                    <button
                        className="py-2 px-10 bg-custom-gray-light rounded-md hover:brightness-110 duration-200"
                        onClick={props.cancelFunc}
                    >
                        Close
                    </button>
                </div>
            </div>
        </ModalContainer>
    );
}
