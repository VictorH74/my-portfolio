import { useFrozenFunction } from '@/hooks/useFrozenFunction';
import { useGlobalTechnologyList } from '@/hooks/useGlobalTechnologyList';
import React from 'react';

const rotationPauseTime = 200;

export const useTechnologyList = () => {
    const techListSectionRef = React.useRef<HTMLElement>(null);
    const techListRef = React.useRef<HTMLUListElement>(null);
    const controllerRef = React.useRef(new AbortController());

    const { technologyList, isLoading, isError, refetch } =
        useGlobalTechnologyList();

    const { func: scrollListener } = useFrozenFunction(
        (controller) => {
            if (!controller) return;

            if (
                techListSectionRef.current!.getBoundingClientRect().top <
                window.innerHeight / 2
            ) {
                initCubeListRotation();
                controller.abort();
            }
        },
        100,
        null,
        controllerRef.current
    );

    React.useEffect(() => {
        if (!(technologyList.length > 0) || !techListSectionRef.current) return;

        window.addEventListener('scroll', scrollListener, {
            signal: controllerRef.current.signal,
        });
    }, [scrollListener, technologyList]);

    const initCubeListRotation = () => {
        if (!techListRef.current) return;
        const techEls = document.getElementsByClassName('tech-item-card');
        const techItemWidth = techEls[0].getBoundingClientRect().width;

        const rowMaxItemLength =
            Math.round(
                techListRef.current.getBoundingClientRect().width /
                    techItemWidth
            ) - 1;

        const elIndexList = Array(techEls.length)
            .fill(null)
            .map((_, i) => i);
        const newElIndexList = [];

        let startIndex = 0;
        let endIndex = rowMaxItemLength;
        let reversed = false;
        while (startIndex < elIndexList.length) {
            if (reversed)
                newElIndexList.push(
                    ...elIndexList.slice(startIndex, endIndex).reverse()
                );
            else
                newElIndexList.push(...elIndexList.slice(startIndex, endIndex));

            reversed = !reversed;
            startIndex += rowMaxItemLength;
            endIndex += rowMaxItemLength;
        }

        if (newElIndexList.length == 0) newElIndexList.push(...elIndexList);

        newElIndexList.forEach((elIndex, i) => {
            const el = techEls[elIndex];
            const rotateClass =
                'rotate-to-' + el.getAttribute('data-rotate-side');
            setTimeout(() => {
                el.classList.add(rotateClass);
                setTimeout(() => {
                    el.classList.remove(rotateClass);
                }, rotationPauseTime + 300);
            }, i * rotationPauseTime);
        });
    };
    return {
        techListSectionRef,
        techListRef,
        technologyList,
        isLoading,
        isError,
        refetch,
    };
};
