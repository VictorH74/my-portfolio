/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@/hooks/UseTheme';
import { useWindowSize } from '@/hooks/UseWindowsSize';
import React from 'react';

import { Hexagon } from './classes';

export const useBackgroundAnimation = () => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const centerRef = React.useRef<HTMLSpanElement | null>(null);
    const debouncedFunction = React.useRef<ReturnType<
        typeof setTimeout
    > | null>(null);

    const [hexState, stHexState] = React.useState<Hexagon[]>([]);

    const { themeColor } = useTheme();

    const [w, h] = useWindowSize();
    React.useEffect(() => {
        if (w < 700) return;
        const generateHexagons = () => {
            if (!canvasRef.current || !centerRef.current) return;
            const canvas = canvasRef.current;

            const { right, left, top, bottom } =
                centerRef.current.getBoundingClientRect();

            canvas.width = w;
            canvas.height = h;
            const canvasCtx = canvas.getContext('2d');

            if (!canvasCtx) return;

            const hexagons: Hexagon[] = [];

            Array(Math.round(w / 150))
                .fill(null)
                .forEach(() => {
                    hexagons.push(
                        new Hexagon(
                            canvas.width,
                            canvas.height,
                            canvasCtx,
                            { right, left, top, bottom },
                            themeColor.RGBValues
                        )
                    );
                });

            stHexState(hexagons);

            const update = () => {
                canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
                hexagons.forEach((hex) => {
                    hex.draw();
                });
                requestAnimationFrame(update);
            };

            update();
        };

        const debounce = (func: () => void, delay: number) => {
            if (debouncedFunction.current) {
                clearTimeout(debouncedFunction.current);
            }

            debouncedFunction.current = setTimeout(func, delay);
        };

        debounce(generateHexagons, 600);
    }, [w]);

    React.useEffect(() => {
        hexState.forEach((hex) => {
            hex.RGBValues = themeColor.RGBValues;
        });
    }, [themeColor]);

    return {
        centerRef,
        canvasRef,
    };
};
