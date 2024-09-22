import React from 'react';
import { twMerge } from 'tailwind-merge';

import useTimer from './useTimer';

export default function Timer() {
    const hook = useTimer();

    return (
        <div
            className={twMerge(
                'mt-12 mb-10 duration-300 select-none opacity-0 scale-50',
                hook.reachedBottom && 'opacity-100 scale-100'
            )}
        >
            <h1 className="text-3xl text-[var(--theme-color)]">
                THANKS FOR SCROLLING!
            </h1>
            <p className="mt-7 text-custom-white">
                {hook.t('time')}: {hook.formatTime()}
            </p>
        </div>
    );
}
