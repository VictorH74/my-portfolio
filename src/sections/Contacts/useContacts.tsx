import React from 'react';
import useLanguage from '@/hooks/UseLanguage';
import { useTheme } from '@/hooks/UseTheme';
import { contactsSection } from '@/utils/translations';

export default function useContacts() {
    const [reachedBottom, setReachedBottom] = React.useState(false);
    const { themeColor } = useTheme();
    const endOfPageRef = React.useRef(null);
    const lang = useLanguage();
    const translate = contactsSection[lang];

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
        translate,
        endOfPageRef,
    };
}
