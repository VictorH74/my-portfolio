'use client';
import { useTheme } from '@/hooks/UseTheme';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import React from 'react';
import usePresentation from './usePresentation';
import useGlobalTechnologies from '@/hooks/useGlobalTechnologies';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import { useTranslations } from 'next-intl';

export default function Presentation() {
    const hook = usePresentation();
    const t = useTranslations('Presentation_Section');
    const { themeColor } = useTheme();
    const { technologyArray, isLoading, empty, error } =
        useGlobalTechnologies();

    return (
        <section
            className={`home-section h-[100vh] relative select-none`}
            ref={hook.sectionRef}
        >
            <div className="h-full grid place-items-center -translate-y-5">
                <div className="text-center">
                    <h2 className="sm:text-2xl primary-font-color font-semibold tracking-widest">
                        {t('i_am')}
                    </h2>

                    {((name: string) => (
                        <>
                            <h1
                                onClick={(e) =>
                                    hook.rotateElementText(e.currentTarget)
                                }
                                className="text-4xl sm:text-7xl lg:text-8xl font-bold tracking-widest text-[var(--theme-color)]"
                            >
                                {name}
                            </h1>

                            <div className="grid place-items-center">
                                <svg
                                    width={hook.svgTextWidth}
                                    height={hook.svgTextHeight}
                                >
                                    <text
                                        x={hook.svgTextXPos}
                                        y={hook.svgTextYPos}
                                        fill="none"
                                        className="text-4xl sm:text-7xl lg:text-8xl tracking-widest"
                                        stroke={themeColor.color}
                                        strokeWidth="2"
                                        fontWeight="bold"
                                    >
                                        {name}
                                    </text>
                                </svg>
                            </div>
                        </>
                    ))('Victor Almeida')}

                    <h2 className="sm:text-2xl primary-font-color mb-4 font-semibold tracking-widest">
                        {t('text_3')}
                        <span className="ml-2 text-[var(--theme-color)]">
                            @FullStack
                        </span>{' '}
                        {t('with')}
                    </h2>

                    <div className="flex flex-row gap-4 items-center">
                        <div className="h-[2px] grow bg-[var(--theme-color)]" />
                        {isLoading ? (
                            Array(5)
                                .fill(null)
                                .map((_, i) => (
                                    <Skeleton
                                        key={i}
                                        variant="circular"
                                        width={45}
                                        height={45}
                                        sx={{
                                            backgroundColor: '#4e4e4e',
                                        }}
                                    />
                                ))
                        ) : empty ? (
                            <p className="font-semibold text-custom-gray-light">
                                {t('empty_tech_list_text')}
                            </p>
                        ) : error ? (
                            <p className="font-semibold text-red-500">
                                {t('tech_list_error_text')}
                            </p>
                        ) : (
                            technologyArray
                                .filter((s) => s.isMain)
                                .map((t) => (
                                    <Image
                                        src={t.src}
                                        alt="technology icon"
                                        key={t.name}
                                        width={45}
                                        height={45}
                                    />
                                ))
                        )}
                        <div className="h-[2px] grow bg-[var(--theme-color)]" />
                    </div>
                </div>
            </div>
            <button
                name="scroll to next section button"
                onClick={() => {
                    const height = hook.sectionRef.current?.offsetHeight;
                    if (!height) return;
                    window.scrollTo({ top: height, behavior: 'smooth' });
                }}
            >
                <KeyboardDoubleArrowDownIcon
                    className="absolute left-1/2 bottom-12 -translate-x-1/2 animate-double-arrow-bounce"
                    sx={{ fontSize: 50, color: themeColor.color }}
                />
            </button>
        </section>
    );
}
