'use client';
import Image from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { useAnimatedBackground } from './useAnimatedBackground';

export const AnimatedBackground = () => {
    const hook = useAnimatedBackground();

    // TODO: perform bg image

    return (
        <div className="absolute inset-0 grid place-items-center bg-[#141414]">
            <canvas
                ref={hook.canvasRef}
                className={twMerge(
                    'bg-[#161616] opacity-0',
                    hook.isLoadImg && 'opacity-100'
                )}
            />
            <Image
                fill
                priority
                className="absolute w-screen h-screen object-cover inset-0"
                alt="background image"
                src="/images/hero/bg.png"
                onLoad={() => {
                    hook.setIsLoadImg(true);
                }}
            />
        </div>
    );
};
