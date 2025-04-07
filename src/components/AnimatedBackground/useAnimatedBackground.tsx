import React from 'react';
import { generateLightballs, Lightball } from './Lightball';
import { isMobilePortrait } from '@/utils/functions';

export const useAnimatedBackground = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const canvasCtxRef = React.useRef<CanvasRenderingContext2D>(null);
    const mousePosRef = React.useRef<{ x: number; y: number }>(null);
    const lightballListRef = React.useRef<Lightball[]>(null);

    const [isLoadImg, setIsLoadImg] = React.useState(false);

    React.useEffect(() => {
        if (!canvasRef.current || !isLoadImg) return;
        const controller = new AbortController();
        canvasCtxRef.current = canvasRef.current.getContext('2d');

        updateCanvas();

        window.addEventListener('mousemove', mouseMoveListener, {
            signal: controller.signal,
        });
        window.addEventListener('resize', updateCanvas, {
            signal: controller.signal,
        });

        update();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadImg]);

    const mouseMoveListener = (e: MouseEvent) => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;

        const mousePositionPercent = {
            x: e.clientX / canvas.width,
            y: e.clientY / canvas.height,
        };

        mousePosRef.current = mousePositionPercent;
    };

    const updateCanvas = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        lightballListRef.current = generateLightballs(
            canvas.width,
            canvas.height,
            window.outerWidth,
            window.outerHeight
        );
    };

    const update = () => {
        if (
            !canvasCtxRef.current ||
            !canvasRef.current ||
            !lightballListRef.current
        )
            return;

        const canvasCtx = canvasCtxRef.current;
        const canvas = canvasRef.current;
        const lightballList = lightballListRef.current;

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        lightballList.forEach((l) => {
            l.update(mousePosRef.current || { x: 0, y: 0 });
            l.draw(canvasCtx);
        });

        if (isMobilePortrait()) return;

        requestAnimationFrame(update);
    };

    return {
        canvasRef,
        isLoadImg,
        setIsLoadImg,
    };
};
