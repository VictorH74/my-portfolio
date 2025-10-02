import { ScreenshotType } from '@/types/project';
import React from 'react';

export interface SliderProps {
    images: ScreenshotType[];
}

type PositionType = {
    x: number;
    y: number;
};

export const useSlider = (props: SliderProps) => {
    const sliderContainerRef = React.useRef<HTMLUListElement>(null);

    const [currentFileIndex, setCurrentFileIndex] = React.useState<number>(0);

    const [startPos, setStartPos] = React.useState<PositionType | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);

    React.useEffect(() => {
        if (!sliderContainerRef.current) return;

        const sliderContainer = sliderContainerRef.current;
        const left = sliderContainer.clientWidth * currentFileIndex;

        sliderContainer.scrollTo({ left, behavior: 'smooth' });
    }, [currentFileIndex]);

    const changeCurrentFileIndex = (index: number) =>
        setCurrentFileIndex(index);

    const previousSlide = () => {
        if (currentFileIndex == 0)
            return setCurrentFileIndex(props.images.length - 1);
        setCurrentFileIndex((prev) => prev - 1);
    };

    const nextSlide = () => {
        if (currentFileIndex + 1 >= props.images.length)
            return setCurrentFileIndex(0);
        setCurrentFileIndex((prev) => prev + 1);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const { clientX, clientY } = e.touches[0];
        setStartPos({ x: clientX, y: clientY });
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || startPos === null) return;
        const currentXPos = e.touches[0].clientX;
        const currentYPos = e.touches[0].clientY;
        const xDiff = startPos.x - currentXPos;
        const yDiff = startPos.y - currentYPos;

        const longYMoviment = yDiff < 30 && yDiff > -30;
        if (longYMoviment && xDiff > 50) {
            nextSlide();
            setIsDragging(false);
        } else if (longYMoviment && xDiff < -50) {
            previousSlide();
            setIsDragging(false);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setStartPos(null);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        setStartPos({ x: clientX, y: clientY });
        setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || startPos === null) return;
        const xDiff = startPos.x - e.clientX;
        const yDiff = startPos.y - e.clientY;

        const longYMoviment = yDiff < 30 && yDiff > -30;

        if (longYMoviment && xDiff > 50) {
            nextSlide();
            setIsDragging(false);
        } else if (longYMoviment && xDiff < -50) {
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
};
