'use client';
import { useTechnologyList } from '@/hooks/useTechnologyList';
import { useTranslations } from 'next-intl';
import { TechnologyCard } from './TechnologyCard';
import { Loading } from '@/components/Loading';
import React from 'react';
import { useFrozenFunction } from '@/hooks/useFrozenFunction';

const rotationPauseTime = 200;

export const TechnologyList = () => {
    const techListRef = React.useRef<HTMLElement>(null);
    const t = useTranslations('TechnologyListSection');
    const { technologyList, isLoading, isError, refetch } = useTechnologyList();

    const controllerRef = React.useRef(new AbortController());
    const { func: scrollListener } = useFrozenFunction(
        (controller) => {
            if (!controller) return;

            if (
                techListRef.current!.getBoundingClientRect().top <
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
        if (!(technologyList.length > 0) || !techListRef.current) return;

        window.addEventListener('scroll', scrollListener, {
            signal: controllerRef.current.signal,
        });
    }, [scrollListener, technologyList]);

    const initCubeListRotation = () => {
        const techEls = document.getElementsByClassName('tech-item-card');
        const rowMaxItemLength = 6; // TODO: get dinamically?

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

    return (
        <section
            ref={techListRef}
            id="technologies"
            className="max-md:py-[2.5rem] grid place-items-center py-[6.5rem] bg-background max-sm:text-sm px-3"
        >
            <div className="max-w-default">
                <h2 className="max-md:mb-10 text-dark-font text-3xl font-semibold text-center mb-20 uppercase">
                    {t('section_title')}
                </h2>

                {isError ? (
                    <button
                        className="text-red-400 font-medium py-2 px-6 w-full text-center cursor-pointer"
                        onClick={async () => await refetch()}
                    >
                        Error trying loading technologies! Retry
                    </button>
                ) : isLoading ? (
                    <div className="grid place-items-center">
                        <Loading />
                    </div>
                ) : (
                    <ul className="max-sm:gap-2 flex justify-center gap-4 flex-wrap">
                        {technologyList
                            .filter((techIcon) => !techIcon.hidden)
                            .map((techIcon) => {
                                return (
                                    <TechnologyCard
                                        key={techIcon.id}
                                        {...techIcon}
                                    />
                                );
                            })}
                    </ul>
                )}
            </div>
        </section>
    );
};
