import ModalContainer from '@/components/ModalContainer';
import Image from 'next/image';
import React from 'react';
import useEditImageModal, { EditImageModalProps } from './useEditImageModal';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@/components/Divider';
import Slider from '@mui/material/Slider';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export default function EditImageModal(props: EditImageModalProps) {
    const hook = useEditImageModal(props);

    return (
        <ModalContainer className="bg-black/50 backdrop-blur-[2px]">
            <div className="bg-zinc-800 rounded-lg">
                <div className="flex justify-between p-4 items-center">
                    <h1 className="text-xl font-semibold tracking-wider">
                        Edit Image
                    </h1>
                    <button onClick={props.cancelFunc}>
                        <CloseIcon />
                    </button>
                </div>
                <Divider className="m-0 mb-6 h-[1px] bg-zinc-600" />

                {/* CROP AREA */}
                <div
                    ref={hook.cropAreaRef}
                    className="bg-black w-[750px] h-[400px] overflow-hidden relative"
                    onMouseUp={hook.handleDragEnd}
                    onMouseLeave={hook.handleDragEnd}
                    onMouseDown={hook.handleDragStart}
                    onMouseMove={hook.onDraggableMove}
                >
                    {/* EDITABLE IMG */}
                    <Image
                        ref={hook.imgRef}
                        src={props.imageSrc}
                        width={0}
                        height={0}
                        alt=""
                        style={
                            hook.imgSizeProp && {
                                [hook.imgSizeProp.styleProp]:
                                    hook.imgSizeProp?.value,
                            }
                        }
                        onLoad={hook.setup}
                        className="object-contain select-none pointer-events-none absolute"
                    />

                    <div
                        ref={hook.maskWestRef}
                        className="absolute pointer-events-none left-0 inset-y-0 bg-[#00000094]"
                    />
                    <div
                        ref={hook.maskEastRef}
                        className="absolute pointer-events-none right-0 inset-y-0 bg-[#00000094]"
                    />

                    {/* CROP BOX */}
                    <div
                        className="h-full aspect-square mx-auto absolute top-0 border pointer-events-none"
                        ref={hook.cropBoxRef}
                    ></div>
                </div>
                <div className="p-3">
                    <p className="font-semibold tracking-wider">Zoom</p>
                    <div className="flex items-center gap-2">
                        <RemoveIcon sx={{ fontSize: 30 }} />
                        <Slider
                            defaultValue={0}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            onChange={hook.handleSliderChange}
                            value={hook.imgScaleIncrement * 100}
                            aria-labelledby="input-slider"
                        />
                        <AddIcon sx={{ fontSize: 30 }} />
                    </div>
                </div>
                <Divider className="m-0  h-[1px] bg-zinc-600" />
                <div className="p-4 space-x-2 text-end">
                    <button
                        className="py-2 px-10 bg-[var(--theme-color)] rounded-md hover:brightness-110 duration-200 font-semibold tracking-wider"
                        onClick={hook.handleSave}
                    >
                        Save
                    </button>
                </div>
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
            </div>
        </ModalContainer>
    );
}