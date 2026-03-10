import { PositionT } from '@/types/generic';
import { isMobilePortrait } from '@/utils/functions';
import React from 'react';

import { generateLightballs, Lightball } from './Lightball';

type ProgressToFinalPosDataT = { finalPosPercent: PositionT, xIncrement: number, yIncrement: number, speed: number }

export const useAnimatedBackground = () => {
    const progressToFinalPosDataRef = React.useRef<ProgressToFinalPosDataT | null>(null);
    const currentPosRef = React.useRef<PositionT>({ x: 0, y: 0 });
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const workerRef = React.useRef<Worker | null>(null);
    const canvasCtxRef = React.useRef<CanvasRenderingContext2D>(null);
    const lightballListRef = React.useRef<Lightball[]>(null);

    const [isLoadImg, setIsLoadImg] = React.useState(false);

    React.useEffect(() => {
        if (!canvasRef.current || !isLoadImg) return;
        const controller = new AbortController();
        canvasCtxRef.current = canvasRef.current.getContext('2d');

        const handleMouseMove = (e: MouseEvent) => {
            const canvas = canvasRef.current;
            const worker = workerRef.current;
            if (!canvas || !worker) return;

            worker.postMessage([{ x: e.clientX, y: e.clientY }, currentPosRef.current, { width: canvas.width, height: canvas.height }]);
        };

        const buildLightballs = () => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            lightballListRef.current = generateLightballs(
                canvas.width,
                canvas.height,
                window.outerWidth,
                window.outerHeight,
                computeValue
            );
        };

        const updateLightballsPos = (pos: PositionT) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const canvasCtx = canvasCtxRef.current;
            const lightballList = lightballListRef.current;

            if (
                !canvasCtx ||
                !canvas ||
                !lightballList
            )
                return;

            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            lightballList.forEach((l) => {
                l.update(pos);
                l.draw(canvasCtx, computeValue(30));
            });

            if (isMobilePortrait()) return;
        };

        buildLightballs();
        updateLightballsPos(currentPosRef.current);

        if (isMobilePortrait()) return

        if (window.Worker) {
            workerRef.current = new Worker(new URL("bgWorker.ts", import.meta.url), { type: "module" });

            workerRef.current.onmessage = (e) => {
                progressToFinalPosDataRef.current = e.data as ProgressToFinalPosDataT;
            };
        }

        const loop = () => {
            const progressToFinalPosData = progressToFinalPosDataRef.current
            const { x: currentPosX, y: currentPosY } = currentPosRef.current

            if (
                !progressToFinalPosData
            ) {
                requestAnimationFrame(loop);
                return
            }

            const { xIncrement, yIncrement, finalPosPercent } = progressToFinalPosData
            currentPosRef.current = { x: currentPosX + xIncrement, y: currentPosY + yIncrement }

            updateLightballsPos(currentPosRef.current);
            if ((xIncrement < 0 && finalPosPercent.x > currentPosX) || (xIncrement > 0 && finalPosPercent.x < currentPosX))
                progressToFinalPosDataRef.current = null

            requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);

        window.addEventListener('pointermove', handleMouseMove, {
            signal: controller.signal,
        });

        window.addEventListener('resize', buildLightballs, {
            signal: controller.signal,
        });

        return () => {
            workerRef.current?.terminate()
            controller.abort()
        }

    }, [isLoadImg]);

    const computeValue = (v: number) => {
        const bgImgWidth = 2560;
        const values_factor = window.outerWidth / bgImgWidth;

        return v * values_factor;
    };

    return {
        canvasRef,
        isLoadImg,
        setIsLoadImg,
    };
};
