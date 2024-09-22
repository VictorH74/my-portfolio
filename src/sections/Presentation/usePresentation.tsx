import useWindowSize from '@/hooks/UseWindowsSize';
import React, { useRef } from 'react';

export default function usePresentation() {
    const sectionRef = useRef<HTMLElement>(null);
    const timeOutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const [svgTextWidth, setSvgTextWidth] = React.useState('');
    const [svgTextHeight, setSvgTextHeight] = React.useState('');
    const [svgTextYPos, setSvgTextYPos] = React.useState(20);
    const [svgTextXPos, setSvgTextXPos] = React.useState(35);
    const [width] = useWindowSize();

    React.useEffect(() => {
        if (width > 1024) {
            setSvgTextWidth('830px');
            setSvgTextHeight('40px');
            setSvgTextYPos(20);
            setSvgTextXPos(30);
        } else if (width > 640) {
            setSvgTextWidth('625px');
            setSvgTextHeight('30px');
            setSvgTextYPos(15);
            setSvgTextXPos(25);
        } else {
            setSvgTextWidth('350px');
            setSvgTextHeight('25px');
            setSvgTextYPos(8);
            setSvgTextXPos(30);
        }
    }, [width]);

    const rotateElementText = (el: HTMLElement) => {
        const rotateTotal = 3;
        if (timeOutRef.current) clearTimeout(timeOutRef.current);
        const rotate = (
            increaseMS: number,
            increasedDeg: number,
            rotateNumber: number,
            delay: number
        ) => {
            if (rotateNumber <= rotateTotal) {
                el.style.transitionDuration = `${increaseMS}ms`; // 300 - 900
                el.style.transform = `rotateX(${increasedDeg}deg)`;
                timeOutRef.current = setTimeout(
                    rotate,
                    delay,
                    increaseMS + 300,
                    increasedDeg + 180,
                    rotateNumber + 1,
                    delay + 150
                );
                return;
            }
            timeOutRef.current = setTimeout(() => {
                el.style.transitionDuration = '0ms';
                el.style.transform = 'rotateX(0deg)';
            }, 200);
        };
        rotate(300, 180, 0, 200);
    };

    return {
        rotateElementText,
        sectionRef,
        svgTextWidth,
        svgTextHeight,
        svgTextYPos,
        svgTextXPos,
    };
}
