import React from "react";
import useLanguage from "@/hooks/UseLanguage";
import { useTheme } from "@/hooks/UseTheme";
import { contactsSection } from "@/utils/translations";

export default function useContacts() {
    const [time, setTime] = React.useState(0);
    const [reachedBottom, setReachedBottom] = React.useState(false);
    const { themeColor } = useTheme();
    const endOfPageRef = React.useRef(null);
    const lang = useLanguage();
    const translate = contactsSection[lang];

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            if (!reachedBottom) {
                setTime(time + 1);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [time, reachedBottom]);

    React.useEffect(() => {
        if (endOfPageRef?.current) {
            const { offsetTop } = endOfPageRef.current;
            if (window.innerHeight + window.scrollY >= offsetTop) {
                setReachedBottom(true);
            }
        }
    }, [time, endOfPageRef]);

    function formatTime() {
        if (time < 60) {
            return time + " " + translate.seconds;
        } else {
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;
            return (
                minutes +
                ":" +
                (seconds < 10 ? "0" + seconds : seconds) +
                " " +
                translate.minutes
            );
        }
    }

    return ({
        reachedBottom,
        themeColor,
        translate,
        formatTime,
        endOfPageRef,
    })
}