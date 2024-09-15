import React from 'react';
import { useTheme } from '@/hooks/UseTheme';

export default function useContacts() {
    const [reachedBottom, setReachedBottom] = React.useState(false);
    const { themeColor } = useTheme();
    const endOfPageRef = React.useRef(null);

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

    return {
        reachedBottom,
        themeColor,
        endOfPageRef,
    };
}
