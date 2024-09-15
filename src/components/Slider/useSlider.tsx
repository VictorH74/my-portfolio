import { ScreenshotType } from '@/types';
import React from 'react';

export interface SliderProps {
    images: ScreenshotType[];
}

export default function useSlider(props: SliderProps) {
    const sliderContainerRef = React.useRef<HTMLUListElement>(null);

    const [currentFileIndex, setCurrentFileIndex] = React.useState<number>(0);

    // Variáveis de controle de arraste
    const [startPos, setStartPos] = React.useState<number | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);

    React.useEffect(() => {
        if (!sliderContainerRef.current) return;

        const sliderContainer = sliderContainerRef.current;
        const left = sliderContainer.clientWidth * currentFileIndex;

        sliderContainer.scrollTo({ left, behavior: 'smooth' });
    }, [currentFileIndex]);

    const changeCurrentFileIndex = (index: number) =>
        setCurrentFileIndex(index);

    const previousSlide = React.useCallback(() => {
        if (currentFileIndex == 0)
            return setCurrentFileIndex(props.images.length - 1);
        setCurrentFileIndex((prev) => prev - 1);
    }, [currentFileIndex, props.images.length]);

    const nextSlide = React.useCallback(() => {
        if (currentFileIndex + 1 >= props.images.length)
            return setCurrentFileIndex(0);
        setCurrentFileIndex((prev) => prev + 1);
    }, [currentFileIndex, props.images]);

    // Funções de arraste (drag/swipe)
    const handleTouchStart = (e: React.TouchEvent) => {
        setStartPos(e.touches[0].clientX);
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || startPos === null) return;
        const currentPos = e.touches[0].clientX;
        const diff = startPos - currentPos;
        if (diff > 65) {
            nextSlide();
            setIsDragging(false);
        } else if (diff < -65) {
            previousSlide();
            setIsDragging(false);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setStartPos(null);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setStartPos(e.clientX);
        setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || startPos === null) return;
        const diff = startPos - e.clientX;
        if (diff > 65) {
            nextSlide();
            setIsDragging(false);
        } else if (diff < -65) {
            previousSlide();
            setIsDragging(false);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setStartPos(null);
    };

    return {
        sliderContainerRef,
        currentFileIndex,
        startPos,
        isDragging,
        changeCurrentFileIndex,
        previousSlide,
        nextSlide,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    };
}
