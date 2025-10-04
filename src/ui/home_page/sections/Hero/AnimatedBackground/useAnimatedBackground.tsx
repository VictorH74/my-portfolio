import { PositionT } from '@/types/generic';
import { isMobilePortrait } from '@/utils/functions';
import React from 'react';

import { generateLightballs, Lightball } from './Lightball';

export const useAnimatedBackground = () => {
    const posProgressionTimeout = React.useRef<NodeJS.Timeout | null>(null);
    const currentPosRef = React.useRef<PositionT>({ x: 0, y: 0 });
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const canvasCtxRef = React.useRef<CanvasRenderingContext2D>(null);
    const lightballListRef = React.useRef<Lightball[]>(null);

    const [isLoadImg, setIsLoadImg] = React.useState(false);

    React.useEffect(() => {
        if (!canvasRef.current || !isLoadImg) return;
        const controller = new AbortController();
        canvasCtxRef.current = canvasRef.current.getContext('2d');

        const handleMouseMove = (e: MouseEvent) => {
            if (posProgressionTimeout.current)
                clearTimeout(posProgressionTimeout.current)

            const canvas = canvasRef.current;
            if (!canvas) return;

            const { x: currXPercent, y: currYPercent }: PositionT = currentPosRef.current
            const { x: finalXPercent, y: finalYPercent } = {
                x: e.clientX / canvas.width,
                y: e.clientY / canvas.height,
            };

            const xDistance = finalXPercent < currXPercent ? currXPercent - finalXPercent : finalXPercent - currXPercent
            const yDistance = finalYPercent < currYPercent ? currYPercent - finalYPercent : finalYPercent - currYPercent
            const hypotenuse = Math.sqrt(xDistance ** 2 + yDistance ** 2)
            const speed = 1 / hypotenuse

            finalPosProgression({ x: finalXPercent, y: finalYPercent }, { x: currXPercent, y: currYPercent }, xDistance / 100 * (finalXPercent < currXPercent ? -1 : 1), yDistance / 100 * (finalYPercent < currYPercent ? -1 : 1), speed)
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

        const finalPosProgression = (finalpos: PositionT, currentPos: PositionT, xIncrement: number, yIncrement: number, speed: number) => {
            if ((xIncrement < 0 && finalpos.x > currentPos.x) || (xIncrement > 0 && finalpos.x < currentPos.x))
                return

            updateLightballsPos(currentPos)
            currentPosRef.current = currentPos

            posProgressionTimeout.current = setTimeout(() => {
                finalPosProgression(finalpos, { x: currentPos.x + xIncrement, y: currentPos.y + yIncrement }, xIncrement, yIncrement, speed)
            }, speed);
        }

        buildLightballs();
        updateLightballsPos(currentPosRef.current);

        window.addEventListener('mousemove', handleMouseMove, {
            signal: controller.signal,
        });
        window.addEventListener('resize', buildLightballs, {
            signal: controller.signal,
        });

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
