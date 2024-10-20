import { useTranslations } from 'next-intl';
import React from 'react';

export const useTimer = () => {
    const [time, setTime] = React.useState(0);
    const t = useTranslations('contacts_section_timer');
    const [reachedBottom, setReachedBottom] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollTop =
                (document.documentElement &&
                    document.documentElement.scrollTop) ||
                document.body.scrollTop;
            const scrollHeight =
                (document.documentElement &&
                    document.documentElement.scrollHeight) ||
                document.body.scrollHeight;
            const clientHeight =
                document.documentElement.clientHeight || window.innerHeight;
            const scrolledToBottom =
                Math.ceil(scrollTop + clientHeight) >= scrollHeight - 50;

            if (scrolledToBottom) {
                setReachedBottom(true);
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            if (!reachedBottom) {
                setTime(time + 1);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [time, reachedBottom]);

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
        reachedBottom,
        t,
    };
};
