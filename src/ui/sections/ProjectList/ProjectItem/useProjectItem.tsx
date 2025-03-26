import React from 'react';

export const useProjectItem = () => {
    const [videoVisibility, setVideoVisibility] = React.useState(false);
    const [videoIsLoading, setVideoIsLoading] = React.useState(true);

    const videoContainerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        document.body.style.overflow = videoVisibility ? 'hidden' : 'auto';
    }, [videoVisibility]);

    const showVideo = () => setVideoVisibility(true);

    const hiddenVideo = () => {
        videoContainerRef.current!.style.opacity = '0';
        setTimeout(() => {
            setVideoVisibility(false);
        }, 300);
    };

    const computedUrl = (urlStr: string) => {
        const url = new URL(urlStr);

        if (!url.searchParams.has('muted')) url.searchParams.set('muted', '1');

        return url.toString();
    };

    return {
        videoContainerRef,
        videoVisibility,
        setVideoVisibility,
        showVideo,
        hiddenVideo,
        videoIsLoading,
        setVideoIsLoading,
        computedUrl,
    };
};
