import useLanguage from '@/hooks/UseLanguage';
import { timer } from '@/utils/translations';
import React from 'react';

interface TimerProps {
    reachedBottom: boolean;
}

export default function Timer(props: TimerProps) {
    const [time, setTime] = React.useState(0);
    const lang = useLanguage();
    const translate = timer[lang];

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            if (!props.reachedBottom) {
                setTime(time + 1);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [time, props.reachedBottom]);

    function formatTime() {
        if (time < 60) {
            return time + ' ' + translate.seconds;
        } else {
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;
            return (
                minutes +
                ':' +
                (seconds < 10 ? '0' + seconds : seconds) +
                ' ' +
                translate.minutes
            );
        }
    }

    return (
        <p className="mt-7 text-custom-white">
            {translate.time}: {formatTime()}
        </p>
    );
}
