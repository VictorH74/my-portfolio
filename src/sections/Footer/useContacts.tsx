import React from 'react';

export const useFooter = () => {
    const endOfPageRef = React.useRef(null);

    return {
        endOfPageRef,
    };
};
