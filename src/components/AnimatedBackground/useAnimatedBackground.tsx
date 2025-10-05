import { PositionT } from '@/types/generic';
import { isMobilePortrait } from '@/utils/functions';
import React from 'react';

import { generateLightballs, Lightball } from './Lightball';

export const useAnimatedBackground = () => {
    const posProgressionTimeout = React.useRef<NodeJS.Timeout | null>(null);
    const currentPosRef = React.useRef<PositionT>({ x: 0, y: 0 });
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const workerRef = React.useRef<Worker | null>(null);
    const canvasCtxRef = React.useRef<CanvasRenderingContext2D>(null);
    const lightballListRef = React.useRef<Lightball[]>(null);

    const [isLoadImg, setIsLoadImg] = React.useState(false);

    // TODO: try use workers
    React.useEffect(() => {
        if (!canvasRef.current || !isLoadImg || !isLoadImg) return;
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

        const progressToFinalPos = (finalPosPercent: PositionT, currentPos: PositionT, xIncrement: number, yIncrement: number, speed: number) => {
            if ((xIncrement < 0 && finalPosPercent.x > currentPos.x) || (xIncrement > 0 && finalPosPercent.x < currentPos.x))
                return

            updateLightballsPos(currentPos)
            currentPosRef.current = currentPos

            posProgressionTimeout.current = setTimeout(() => {
                progressToFinalPos(finalPosPercent, { x: currentPos.x + xIncrement, y: currentPos.y + yIncrement }, xIncrement, yIncrement, speed)
            }, speed);
        }

        buildLightballs();
        updateLightballsPos(currentPosRef.current);

        if (isMobilePortrait()) return

        if (window.Worker) {
            workerRef.current = new Worker(new URL("bgWorker.ts", import.meta.url), { type: "module" });

            workerRef.current.onmessage = (e) => {
                if (posProgressionTimeout.current)
                    clearTimeout(posProgressionTimeout.current)

                const {
                    finalPosPercent,
                    xIncrement,
                    yIncrement,
                    speed
                } = e.data as { finalPosPercent: PositionT, xIncrement: number, yIncrement: number, speed: number };

                progressToFinalPos(finalPosPercent, currentPosRef.current, xIncrement, yIncrement, speed)
            };
        }

        window.addEventListener('pointermove', handleMouseMove, {
            signal: controller.signal,
        });

        window.addEventListener('resize', buildLightballs, {
            signal: controller.signal,
        });

        return () => {
            workerRef.current?.terminate()
            controller.abort()
            if (posProgressionTimeout.current)
                clearTimeout(posProgressionTimeout.current)
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
