'use client';
import Image from 'next/image';
import React from 'react';
import { generateLightballs, Lightball } from './Lightball';

export const Background = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const canvasCtxRef = React.useRef<CanvasRenderingContext2D>(null);
    const mousePosRef = React.useRef<{ x: number; y: number }>(null);
    const lightballListRef = React.useRef<Lightball[]>(null);

    const [isLoadImg, setIsLoadImg] = React.useState(false);

    React.useEffect(() => {
        if (!canvasRef.current || !isLoadImg) return;
        canvasCtxRef.current = canvasRef.current.getContext('2d');

        updateCanvas();

        window.addEventListener('mousemove', mouseMoveListener);

        window.addEventListener('resize', updateCanvas);

        update();

        return () => {
            window.removeEventListener('mousemove', mouseMoveListener);
            window.removeEventListener('resize', updateCanvas);
        };
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

        requestAnimationFrame(update);
    };

    return (
        <div className="absolute inset-0 grid place-items-center">
            <canvas ref={canvasRef} className="bg-[#141414]" />
            <Image
                fill
                className="absolute w-screen h-screen object-cover inset-0"
                alt="background image"
                src="/bg.png"
                loading="lazy"
                onLoad={() => {
                    setIsLoadImg(true);
                }}
            />
        </div>
    );
};
