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

    React.useEffect(() => {
        loadPreviewImg();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cropArea]);

    const getImgElRemainingHeight = () => {
        const imgElHeight = imgRef.current!.getBoundingClientRect().height;
        const cAElHeight = cropAreaRef.current!.getBoundingClientRect().height;
        return imgElHeight - cAElHeight;
    };

    const getImgElRemainingWidth = () => {
        const imgElWidth = imgRef.current!.getBoundingClientRect().width;
        const cAElWidth = cropAreaRef.current!.getBoundingClientRect().width;
        return imgElWidth - cAElWidth;
    };

    const moveMaskByDirection = (
        d: DirectionType,
        newValue: number,
        containerDimention: readonly [number, number]
    ) => {
        const containerMeasure =
            containerDimention[['top', 'bottom'].includes(d) ? 1 : 0];

        const value = `${(newValue / containerMeasure) * 100}%`;
        const revertedValue = `${
            ((containerMeasure - newValue) / containerMeasure) * 100
        }%`;

        const action: {
            [_K in DirectionType]: () => void;
        } = {
            left: () => {
                maskWestRef.current!.style.right = revertedValue;
            },
            top: () => {
                maskNorthRef.current!.style.bottom = revertedValue;
                maskWestRef.current!.style.top = value;
                maskEastRef.current!.style.top = value;
            },
            right: () => {
                maskEastRef.current!.style.left = revertedValue;
            },
            bottom: () => {
                maskSouthRef.current!.style.top = revertedValue;
                maskWestRef.current!.style.bottom = value;
                maskEastRef.current!.style.bottom = value;
            },
        };

        action[d]();
    };

    const handleDragStart = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (onDrag || !imgRef.current) return;
        const { left, top } = imgRef.current.getBoundingClientRect();
        const { clientX, clientY } = e;
        setLastMousePos({
            left: clientX - left,
            top: clientY - top,
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
        if (!onDrag) return;

        const cropAreaEl = cropAreaRef.current;
        const imgEl = imgRef.current;

        if (!cropAreaEl || !imgEl) return;

        const {
            top: cATop,
            left: cALeft,
            height: cAHeight,
            width: cAWidth,
        } = cropAreaEl.getBoundingClientRect();

        const {
            top: imgTop,
            left: imgLeft,
            height: imgHeight,
            width: imgWidth,
        } = imgEl.getBoundingClientRect();

        const { clientX, clientY } = e;
        const xFactor = clientX - imgLeft - lastMousePos.left;
        const yFactor = clientY - imgTop - lastMousePos.top;

        const relativeCATop = cATop - imgTop;
        const relativeCABottom = imgHeight - (relativeCATop + cAHeight);
        const relativeCALeft = cALeft - imgLeft;
        const relativeCARight = imgWidth - (relativeCALeft + cAWidth);

        const getPositiveInt = (num: number) => Math.max(0, num);
        let newTop = getPositiveInt(relativeCATop + yFactor);
        let newBottom = getPositiveInt(relativeCABottom - yFactor);
        let newLeft = getPositiveInt(relativeCALeft + xFactor);
        let newRight = getPositiveInt(relativeCARight - xFactor);

        if (newTop == 0) newBottom = getImgElRemainingHeight();
        else if (newBottom == 0) newTop = getImgElRemainingHeight();

        if (newLeft == 0) newRight = getImgElRemainingWidth();
        else if (newRight == 0) newLeft = getImgElRemainingWidth();

        const toStrPercent = (num1: number) => `${num1 * 100}%`;
        cropAreaEl.style.top = toStrPercent(newTop / imgHeight);
        cropAreaEl.style.bottom = toStrPercent(newBottom / imgHeight);
        cropAreaEl.style.left = toStrPercent(newLeft / imgWidth);
        cropAreaEl.style.right = toStrPercent(newRight / imgWidth);

        const dimensions = [imgWidth, imgHeight] as const;
        moveMaskByDirection('top', newTop, dimensions);
        moveMaskByDirection('bottom', newBottom, dimensions);
        moveMaskByDirection('left', newLeft, dimensions);
        moveMaskByDirection('right', newRight, dimensions);

        setLastMousePos({
            left: clientX - imgLeft,
            top: clientY - imgTop,
        });
    };

    const setupCropArea = () => {
        const cropAreaEl = cropAreaRef.current;
        const imgEl = imgRef.current;
        const maskNorthEl = maskNorthRef.current;
        const maskEastEl = maskEastRef.current;
        const maskWestEl = maskWestRef.current;
        const maskSouthEl = maskSouthRef.current;

        if (
            !cropAreaEl ||
            !imgEl ||
            !maskNorthEl ||
            !maskEastEl ||
            !maskWestEl ||
            !maskSouthEl
        )
            return;

        const { height, width } = imgEl.getBoundingClientRect();
        const minSize = Math.min(height, width);

        const getCAIntPercent = (size: number) =>
            ((size - minSize) / 2 / size) * 100;
        const cAElYIntPercent = getCAIntPercent(height);
        const cAElXIntPercent = getCAIntPercent(width);

        const toPercentStr = (value: number) => `${value}%`;

        const cAElYStyle = toPercentStr(cAElYIntPercent);
        const cAElXStyle = toPercentStr(cAElXIntPercent);

        cropAreaEl.style.top = cAElYStyle;
        cropAreaEl.style.bottom = cAElYStyle;

        cropAreaEl.style.left = cAElXStyle;
        cropAreaEl.style.right = cAElXStyle;

        maskNorthEl.style.bottom = toPercentStr(100 - cAElYIntPercent);
        maskEastEl.style.left = toPercentStr(100 - cAElXIntPercent);
        maskWestEl.style.right = toPercentStr(100 - cAElXIntPercent);
        maskSouthEl.style.top = toPercentStr(100 - cAElYIntPercent);

        maskWestEl.style.top = cAElYStyle;
        maskWestEl.style.bottom = cAElYStyle;

        maskEastEl.style.top = cAElYStyle;
        maskEastEl.style.bottom = cAElYStyle;

        loadPreviewImg();
    };

    const applyImageCrop = () => {
        const imgEl = imgRef.current;
        const cropAreaEl = cropAreaRef.current;
        if (!imgEl || !cropAreaEl) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const {
            height: imgElHeight,
            width: imgElWidth,
            left: imgElLeft,
            top: imgElTop,
        } = imgEl.getBoundingClientRect();

        const {
            left: cAElLeft,
            top: cAElTop,
            width: cAElWidth,
        } = cropAreaEl.getBoundingClientRect();

        const { naturalHeight, naturalWidth } = imgEl;
        const imgMinSize = Math.min(naturalHeight, naturalWidth);

        canvas.width = imgMinSize;
        canvas.height = imgMinSize;

        const imgElMinSize = Math.min(imgElHeight, imgElWidth);

        const relativeCAElLeft = cAElLeft - imgElLeft;

        const dx =
            (relativeCAElLeft / getImgElRemainingWidth()) *
                (imgEl.naturalWidth - imgMinSize) || 0;

        const relativeCropAreaElTop = cAElTop - imgElTop;
        const dy =
            (relativeCropAreaElTop / getImgElRemainingHeight()) *
                (imgEl.naturalHeight - imgMinSize) || 0;

        const cAElWidthPercent = cAElWidth / imgElMinSize;

        ctx.drawImage(
            imgEl,
            dx,
            dy,
            imgMinSize * cAElWidthPercent,
            imgMinSize * cAElWidthPercent,
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
