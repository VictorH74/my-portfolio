import React from 'react';

export const useProjectItem = () => {
    const [videoVisibility, setVideoVisibility] = React.useState(false);
    const [videoIsLoading, setVideoIsLoading] = React.useState(true);

    React.useEffect(() => {
        document.body.style.overflow = videoVisibility ? 'hidden' : 'auto';
    }, [videoVisibility]);

    const showVideo = () => setVideoVisibility(true);

    const hiddenVideo = () => {
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
        videoVisibility,
        setVideoVisibility,
        showVideo,
        hiddenVideo,
        videoIsLoading,
        setVideoIsLoading,
        computedUrl,
    };
};
