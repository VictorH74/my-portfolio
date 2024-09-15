import { useTranslations } from 'next-intl';
import React from 'react';

interface TimerProps {
    reachedBottom: boolean;
}

export default function Timer(props: TimerProps) {
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

    return (
        <p className="mt-7 text-custom-white">
            {t('time')}: {formatTime()}
        </p>
    );
}
