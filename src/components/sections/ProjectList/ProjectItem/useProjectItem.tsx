import React from 'react';

export const useProjectItem = () => {
    const [videoVisibility, setVideoVisibility] = React.useState(false);

    React.useEffect(() => {
        document.body.style.overflow = videoVisibility ? 'hidden' : 'auto';
    }, [videoVisibility]);

    const showVideo = () => setVideoVisibility(true);

    const hiddenVideo = () => setVideoVisibility(false);

    return {
        videoVisibility,
        setVideoVisibility,
        showVideo,
        hiddenVideo,
    };
};
