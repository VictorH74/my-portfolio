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

    const [imgScaleIncrement, setImgScaleIncrement] = React.useState(0.5);
    const [imgSizeProp, setImgSizeProp] = React.useState<
        | {
              styleProp: string;
              value: number | string;
          }
        | undefined
    >();

    const [cropArea, setCropArea] = React.useState<CropAreaType | undefined>();
    const [onDrag, setOnDrag] = React.useState(false);
    const [lastMousePos, setLastMousePos] = React.useState({ left: 0, top: 0 });

    const [previewImgSrc, setPreviewImgSrc] = React.useState<string | null>(
        null
    );

    React.useEffect(() => {
        if (!!cropArea) loadPreviewImg();
        const cropBoxEl = cropBoxRef.current;

        if (!cropBoxEl) return;

        const cropBoxSize = cropBoxEl.getBoundingClientRect().width;
        setImgSizeProp((prev) =>
            prev ? { ...prev, value: getImgSize(cropBoxSize) } : undefined
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cropArea, imgScaleIncrement]);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setImgScaleIncrement((newValue as number) / 100);
    };

    const getImgSize = (cropBoxSize: number) =>
        cropBoxSize + cropBoxSize * imgScaleIncrement;
    const setup = () => {
        const imgEl = imgRef.current;
        const cropAreaEl = cropAreaRef.current;
        const cropBoxEl = cropBoxRef.current;

        if (!imgEl || !cropAreaEl || !cropBoxEl) return;

        const cropAreaRect = cropAreaEl.getBoundingClientRect();

        const cropBoxSize = cropBoxEl.getBoundingClientRect().width;
        const cropBoxLeft = cropAreaRect.width / 2 - cropBoxSize / 2;

        cropBoxEl.style.left = cropBoxLeft + 'px';

        const maskXPos = cropBoxSize + (cropAreaRect.width - cropBoxSize) / 2;
        maskWestRef.current!.style.right = maskXPos + 'px';
        maskEastRef.current!.style.left = maskXPos + 'px';

        if (imgEl.naturalHeight >= imgEl.naturalWidth) {
            setImgSizeProp({
                styleProp: 'width',
                value: getImgSize(cropBoxSize) + 'px',
            });
            imgEl.style.height = 'auto';
            imgEl.style.maxHeight = 'none';
            imgEl.style.top = '0px'; // TODO: improve center precision
            imgEl.style.left = cropBoxLeft + 'px';
        } else {
            imgEl.style.width = 'auto';
            setImgSizeProp({
                styleProp: 'height',
                value: getImgSize(cropBoxSize) + 'px',
            });
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

    const getMedian: (_a: number, _b: number, _c: number) => number = (
        ...numbers
    ) => {
        const total = numbers.reduce((total, num) => total + num, 0);
        return total - Math.max(...numbers) - Math.min(...numbers);
    };

    const applyImageCrop = () => {
        const imgEl = imgRef.current;
        const cropBoxEl = cropBoxRef.current;
        if (!imgEl || !cropBoxEl) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const imgRect = imgEl.getBoundingClientRect();
        const imgElLeft = imgRect.left;
        const imgElTop = imgRect.top;

        const cropBoxRect = cropBoxEl.getBoundingClientRect();
        const cropBoxLeft = cropBoxRect.left;
        const cropBoxTop = cropBoxRect.top;

        const { naturalHeight, naturalWidth } = imgEl;

        canvas.width = cropBoxRect.width;
        canvas.height = cropBoxRect.height;

        const relativeCBElLeft = cropBoxLeft - imgElLeft;
        const relativeCBElTop = cropBoxTop - imgElTop;

        // Calcula o deslocamento na imagem original (dx, dy)
        const dx = (relativeCBElLeft / imgRect.width) * naturalWidth;
        const dy = (relativeCBElTop / imgRect.height) * naturalHeight;

        // Calcula o tamanho da área de recorte na imagem original (sWidth, sHeight)
        const sWidth = (cropBoxRect.width / imgRect.width) * naturalWidth;
        const sHeight = (cropBoxRect.height / imgRect.height) * naturalHeight;

        // Desenha a imagem no canvas com base no recorte calculado
        ctx.drawImage(
            imgEl,
            dx,
            dy,
            sWidth,
            sHeight,
            0,
            0,
            canvas.width,
            canvas.height
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
        imgSizeProp,
        maskEastRef,
        cropBoxRef,
        imgScaleIncrement,
        cropAreaRef,
        handleDragEnd,
        handleDragStart,
        onDraggableMove,
        handleSliderChange,
        handleSave,
        setup,
    };
}
