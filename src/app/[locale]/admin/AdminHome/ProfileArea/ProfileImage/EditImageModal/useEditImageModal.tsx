import { DirectionType } from '@/types';
import React from 'react';

export interface EditImageModalProps {
    imageSrc: string;
    saveFunc(_img: Blob): void;
    cancelFunc(): void;
}

const DIRECTION = ['left', 'top', 'right', 'bottom'] as const;

type CropAreaType = Record<(typeof DIRECTION)[number], `${string}%`>;

export default function useEditImageModal(props: EditImageModalProps) {
    const imgRef = React.useRef<HTMLImageElement>(null);
    const cropAreaRef = React.useRef<HTMLDivElement>(null);

    const maskWestRef = React.useRef<HTMLDivElement>(null);
    const maskNorthRef = React.useRef<HTMLDivElement>(null);
    const maskEastRef = React.useRef<HTMLDivElement>(null);
    const maskSouthRef = React.useRef<HTMLDivElement>(null);

    const [cropArea, setCropArea] = React.useState<CropAreaType>({
        left: '0%',
        top: '0%',
        right: '0%',
        bottom: '0%',
    });
    const [onDrag, setOnDrag] = React.useState(false);
    const [lastMousePos, setLastMousePos] = React.useState({ left: 0, top: 0 });

    const [previewImgSrc, setPreviewImgSrc] = React.useState<string | null>(
        null
    );

    const percentStrToNumber = (percent: `${string}%`) => {
        return parseFloat(percent.replace('%', ''));
    };

    React.useEffect(() => {
        loadPreviewImg();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cropArea]);

    const moveMaskByDirection = (
        d: DirectionType,
        newValue: number,
        containerDimention: [number, number]
    ) => {
        const containerMeasure =
            containerDimention[['top', 'bottom'].includes(d) ? 1 : 0];

        const value = `${(newValue / containerMeasure) * 100}%`;
        const revertedValue = `${
            ((containerMeasure - newValue) / containerMeasure) * 100
        }%`;

        switch (d) {
            case 'left':
                maskWestRef.current!.style.right = revertedValue;
                break;
            case 'top':
                maskNorthRef.current!.style.bottom = revertedValue;
                maskWestRef.current!.style.top = value;
                maskEastRef.current!.style.top = value;
                break;
            case 'right':
                maskEastRef.current!.style.left = revertedValue;
                break;
            case 'bottom':
                maskSouthRef.current!.style.top = revertedValue;
                maskWestRef.current!.style.bottom = value;
                maskEastRef.current!.style.bottom = value;
                break;
        }
    };

    const handleDragStart = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (onDrag) return;
        const imgRect = imgRef.current!.getBoundingClientRect();
        setLastMousePos({
            left: e.clientX - imgRect.left,
            top: e.clientY - imgRect.top,
        });
        setOnDrag(true);
        document.body.style.cursor = 'grabbing';
    };

    const handleDragEnd = () => {
        if (!onDrag) return;
        setOnDrag(false);
        document.body.style.cursor = 'default';
        const cropArea = cropAreaRef.current!;

        const { left, top, right, bottom } = cropArea.style;
        setCropArea({ left, top, right, bottom } as CropAreaType);
    };

    const onDraggableMove = (e: React.MouseEvent) => {
        if (onDrag) {
            const [cropAreaEl, imgEl] = [cropAreaRef.current!, imgRef.current!];
            const cropAreaRect = cropAreaEl.getBoundingClientRect();
            const imgRect = imgEl.getBoundingClientRect();

            const xFactor = e.clientX - imgRect.left - lastMousePos.left;
            const yFactor = e.clientY - imgRect.top - lastMousePos.top;

            // previous resizable box diretions values
            const top = cropAreaRect.top - imgRect.top;
            const bottom = imgRect.height - (top + cropAreaRect.height);
            const left = cropAreaRect.left - imgRect.left;
            const right = imgRect.width - (left + cropAreaRect.width);

            // new resizable box diretions values
            const newLeft = left + xFactor;
            const newRight = right - xFactor;
            const newTop = top + yFactor;
            const newBottom = bottom - yFactor;

            const getWidthLimitRestPercent = () => {
                const restPercent =
                    (imgRect.width - cropAreaRect.width) / imgRect.width;
                return restPercent * 100 + '%';
            };

            // X position border constraints
            if (newLeft < 0) {
                cropAreaEl.style.left = '0%';
                cropAreaEl.style.right = getWidthLimitRestPercent();
            } else if (newRight < 0) {
                cropAreaEl.style.right = '0%';
                cropAreaEl.style.left = getWidthLimitRestPercent();
            } else {
                cropAreaEl.style.left = `${(newLeft / imgRect.width) * 100}%`;
                cropAreaEl.style.right = `${(newRight / imgRect.width) * 100}%`;

                moveMaskByDirection('left', newLeft, [
                    imgRect.width,
                    imgRect.height,
                ]);
                moveMaskByDirection('right', newRight, [
                    imgRect.width,
                    imgRect.height,
                ]);
            }

            const getHeightLimitRestPercent = () => {
                const restPercent =
                    (imgRect.height - cropAreaRect.height) / imgRect.height;
                return restPercent * 100 + '%';
            };

            // Y position border constraints
            if (newTop < 0) {
                cropAreaEl.style.top = '0%';
                cropAreaEl.style.bottom = getHeightLimitRestPercent();
            } else if (newBottom < 0) {
                cropAreaEl.style.bottom = '0%';
                cropAreaEl.style.top = getHeightLimitRestPercent();
                // if (props.onBottomLimit) props.onBottomLimit();
            } else {
                cropAreaEl.style.top = `${(newTop / imgRect.height) * 100}%`;
                cropAreaEl.style.bottom = `${
                    (newBottom / imgRect.height) * 100
                }%`;

                moveMaskByDirection('top', newTop, [
                    imgRect.width,
                    imgRect.height,
                ]);
                moveMaskByDirection('bottom', newBottom, [
                    imgRect.width,
                    imgRect.height,
                ]);
            }

            setLastMousePos({
                left: e.clientX - imgRect.left,
                top: e.clientY - imgRect.top,
            });
        }
    };

    const setupCropArea = () => {
        if (!cropAreaRef.current) return;

        const cropAreaEl = cropAreaRef.current;
        const img = imgRef.current!;

        const { height, width } = img.getBoundingClientRect();
        const minSize = Math.min(height, width);

        const cropAreaYIntPercent = ((height - minSize) / 2 / height) * 100;
        const cropAreaXIntPercent = ((width - minSize) / 2 / width) * 100;

        const cropAreaYStyle = (cropAreaYIntPercent + '%') as `${string}%`;
        const cropAreaXStyle = (cropAreaXIntPercent + '%') as `${string}%`;

        cropAreaEl.style.top = cropAreaYStyle;
        cropAreaEl.style.bottom = cropAreaYStyle;

        cropAreaEl.style.left = cropAreaXStyle;
        cropAreaEl.style.right = cropAreaXStyle;

        maskNorthRef.current!.style.bottom =
            100 - percentStrToNumber(cropAreaYStyle) + '%';
        maskEastRef.current!.style.left =
            100 - percentStrToNumber(cropAreaXStyle) + '%';
        maskWestRef.current!.style.right =
            100 - percentStrToNumber(cropAreaXStyle) + '%';
        maskSouthRef.current!.style.top =
            100 - percentStrToNumber(cropAreaYStyle) + '%';

        maskWestRef.current!.style.top = cropAreaYStyle;
        maskWestRef.current!.style.bottom = cropAreaYStyle;

        maskEastRef.current!.style.top = cropAreaYStyle;
        maskEastRef.current!.style.bottom = cropAreaYStyle;

        loadPreviewImg();
    };

    const applyImageCrop = () => {
        const imageEl = imgRef.current!;
        const cropAreaEl = cropAreaRef.current!;
        const canvas = document.createElement('canvas');

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const {
            height: imgElHeight,
            width: imgElWidth,
            left: imgElLeft,
            top: imgElTop,
        } = imageEl.getBoundingClientRect();

        const {
            left: cropAreaElLeft,
            top: cropAreaElTop,
            height: cropAreaElHeight,
            width: cropAreaElWidth,
        } = cropAreaEl.getBoundingClientRect();

        const imgMinSize = Math.min(
            imageEl.naturalHeight,
            imageEl.naturalWidth
        );

        canvas.width = imgMinSize;
        canvas.height = imgMinSize;

        const imgElMinSize = Math.min(imgElHeight, imgElWidth);

        const remainingWidth = imgElWidth - cropAreaElWidth;
        const relativeCropAreaElLeft = cropAreaElLeft - imgElLeft;

        const dx =
            (relativeCropAreaElLeft / remainingWidth) *
                (imageEl.naturalWidth - imgMinSize) || 0;

        const remainingHeight = imgElHeight - cropAreaElHeight;
        const relativeCropAreaElTop = cropAreaElTop - imgElTop;
        const dy =
            (relativeCropAreaElTop / remainingHeight) *
                (imageEl.naturalHeight - imgMinSize) || 0;

        const cropAreaElWidthPercent = cropAreaElWidth / imgElMinSize;

        ctx.drawImage(
            imageEl,
            dx,
            dy,
            imgMinSize * cropAreaElWidthPercent,
            imgMinSize * cropAreaElWidthPercent,
            0,
            0,
            imgMinSize,
            imgMinSize
        );

        return canvas;
    };

    const loadPreviewImg = () => {
        const mimeType = imgRef.current?.src.split(';')[0].split(':')[1];
        setPreviewImgSrc(applyImageCrop()!.toDataURL(mimeType));
    };

    const handleSave = () => {
        applyImageCrop()!.toBlob((blob) => {
            if (!blob) return;
            props.saveFunc(blob);
        });

        props.cancelFunc();
    };

    return {
        previewImgSrc,
        imgRef,
        setupCropArea,
        maskWestRef,
        maskNorthRef,
        maskEastRef,
        maskSouthRef,
        cropAreaRef,
        handleDragEnd,
        handleDragStart,
        onDraggableMove,
        handleSave,
    };
}
