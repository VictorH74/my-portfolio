import React from 'react';

export interface EditImageModalProps {
    imageSrc: string;
    saveFunc(_img: Blob): void;
    cancelFunc(): void;
}

const DIRECTION = ['left', 'top'] as const;

type CropAreaType = Record<(typeof DIRECTION)[number], number>;

export default function useEditImageModal(props: EditImageModalProps) {
    const cropAreaRef = React.useRef<HTMLDivElement>(null);
    const imgRef = React.useRef<HTMLImageElement>(null);
    const cropBoxRef = React.useRef<HTMLDivElement>(null);

    const maskWestRef = React.useRef<HTMLDivElement>(null);
    const maskEastRef = React.useRef<HTMLDivElement>(null);

    const [cropArea, setCropArea] = React.useState<CropAreaType | undefined>();
    const [onDrag, setOnDrag] = React.useState(false);
    const [lastMousePos, setLastMousePos] = React.useState({ left: 0, top: 0 });

    const [previewImgSrc, setPreviewImgSrc] = React.useState<string | null>(
        null
    );

    React.useEffect(() => {
        if (!!cropArea) loadPreviewImg();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cropArea]);

    const setup = () => {
        const imgEl = imgRef.current;
        const cropAreaEl = cropAreaRef.current;
        const cropBoxEl = cropBoxRef.current;

        if (!imgEl || !cropAreaEl || !cropBoxEl) return;

        const cropAreaRect = cropAreaEl.getBoundingClientRect();

        const cropBoxWidth = cropBoxEl.getBoundingClientRect().width;
        const cropBoxLeft = cropAreaRect.width / 2 - cropBoxWidth / 2;

        cropBoxEl.style.left = cropBoxLeft + 'px';
        // TODO: setup masks
        const maskXPos = cropBoxWidth + (cropAreaRect.width - cropBoxWidth) / 2;
        maskWestRef.current!.style.right = maskXPos + 'px';
        maskEastRef.current!.style.left = maskXPos + 'px';

        if (imgEl.naturalHeight >= imgEl.naturalWidth) {
            // const imgElHeight = imgEl.getBoundingClientRect().height;
            imgEl.style.width = cropBoxWidth + 'px';
            imgEl.style.height = 'auto';
            imgEl.style.maxHeight = 'none';
            imgEl.style.top = '0px'; // TODO: improve center precision
            imgEl.style.left = cropBoxLeft + 'px';
        } else {
            // const imgElWidth = imgEl.getBoundingClientRect().width;
            imgEl.style.width = 'auto';
            imgEl.style.height = '100%';
            imgEl.style.maxWidth = 'none';
            imgEl.style.left = '0px'; // TODO: improve center precision
        }

        loadPreviewImg();
    };

    const handleDragStart = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (onDrag || !imgRef.current) return;
        const { clientX, clientY } = e;

        setLastMousePos({
            left: clientX,
            top: clientY,
        });
        setOnDrag(true);
        document.body.style.cursor = 'grabbing';
    };

    const handleDragEnd = () => {
        if (!onDrag) return;
        setOnDrag(false);
        document.body.style.cursor = 'default';
        const img = imgRef.current!;

        const { left, top } = img.getBoundingClientRect();
        setCropArea({ left, top } as CropAreaType);
    };

    const onDraggableMove = (e: React.MouseEvent) => {
        if (!onDrag) return;

        const imgEl = imgRef.current;
        const cropAreaEl = cropAreaRef.current;
        const cropBoxEl = cropBoxRef.current;

        if (!imgEl || !cropAreaEl || !cropBoxEl) return;

        const imgRect = imgEl.getBoundingClientRect();
        const cropAreaRect = cropAreaEl.getBoundingClientRect();
        const cropBoxRect = cropBoxEl.getBoundingClientRect();

        const imgTop = imgRect.top - cropAreaRect.top;
        const imgLeft = imgRect.left - cropAreaRect.left;

        const { clientX, clientY } = e;
        const yFactor = clientY - lastMousePos.top;
        const xFactor = clientX - lastMousePos.left;

        const relativeCropBoxTop = cropBoxRect.top - cropAreaRect.top;
        const relativeCropBoxLeft = cropBoxRect.left - cropAreaRect.left;

        const newTop = getMedian(
            relativeCropBoxTop,
            imgTop + yFactor,
            relativeCropBoxTop - imgRect.height + cropBoxRect.height
        );
        const newLeft = getMedian(
            relativeCropBoxLeft,
            imgLeft + xFactor,
            relativeCropBoxLeft - imgRect.width + cropBoxRect.width
        );

        imgEl.style.top = newTop + 'px';
        imgEl.style.left = newLeft + 'px';

        setLastMousePos({
            left: clientX,
            top: clientY,
        });
    };

    const getMedian = (a: number, b: number, c: number): number => {
        const numbers: [number, number, number] = [a, b, c];
        const total = a + b + c;
        return total - Math.max(...numbers) - Math.min(...numbers);
    };

    const getImgElRemainingHeight = () => {
        const imgElHeight = imgRef.current!.getBoundingClientRect().height;
        const cBElHeight = cropBoxRef.current!.getBoundingClientRect().height;
        return imgElHeight - cBElHeight;
    };

    const getImgElRemainingWidth = () => {
        const imgElWidth = imgRef.current!.getBoundingClientRect().width;
        const cBElWidth = cropBoxRef.current!.getBoundingClientRect().width;
        return imgElWidth - cBElWidth;
    };

    const applyImageCrop = () => {
        const imgEl = imgRef.current;
        const cropBoxEl = cropBoxRef.current;
        if (!imgEl || !cropBoxEl) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const imgRect = imgEl.getBoundingClientRect();
        const imgElHeight = imgRect.height;
        const imgElWidth = imgRect.width;
        const imgElLeft = imgRect.left;
        const imgElTop = imgRect.top;

        const cropBoxRect = cropBoxEl.getBoundingClientRect();
        const cropBoxLeft = cropBoxRect.left;
        const cropBoxTop = cropBoxRect.top;
        const cropBoxWidth = cropBoxRect.width;

        const { naturalHeight, naturalWidth } = imgEl;
        const imgMinSize = Math.min(naturalHeight, naturalWidth);

        canvas.width = imgMinSize;
        canvas.height = imgMinSize;

        const imgElMinSize = Math.min(imgElHeight, imgElWidth);

        const relativeCBElLeft = cropBoxLeft - imgElLeft;

        const dx =
            (relativeCBElLeft / getImgElRemainingWidth()) *
                (imgEl.naturalWidth - imgMinSize) || 0;

        const relativeCropAreaElTop = cropBoxTop - imgElTop;
        const dy =
            (relativeCropAreaElTop / getImgElRemainingHeight()) *
                (imgEl.naturalHeight - imgMinSize) || 0;

        const cAElWidthPercent = cropBoxWidth / imgElMinSize;

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
        maskWestRef,
        maskEastRef,
        cropBoxRef,
        cropAreaRef,
        handleDragEnd,
        handleDragStart,
        onDraggableMove,
        handleSave,
        setup,
    };
}
