import { useTranslations } from 'next-intl';
import React from 'react';

export interface TimerProps {
    reachedBottom: boolean;
}

export default function useTimer(props: TimerProps) {
    const [time, setTime] = React.useState(0);
    const t = useTranslations('contacts_section_timer');

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
            return time + ' ' + t('seconds');
        } else {
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;
            return (
                minutes +
                ':' +
                (seconds < 10 ? '0' + seconds : seconds) +
                ' ' +
                t('minutes')
            );
        }
    }

    return {
        formatTime,
        t,
    };
}
