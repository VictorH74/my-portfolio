import React from 'react';
import useTimer, { TimerProps } from './useTimer';

export default function Timer(props: TimerProps) {
    const hook = useTimer(props);

    return (
        <p className="mt-7 text-custom-white">
            {hook.t('time')}: {hook.formatTime()}
        </p>
    );
}
