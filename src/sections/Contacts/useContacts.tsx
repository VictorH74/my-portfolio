import React from 'react';

export const useContacts = () => {
    const endOfPageRef = React.useRef(null);

    return {
        endOfPageRef,
    };
};
