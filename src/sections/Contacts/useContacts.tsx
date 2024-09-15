import React from 'react';

export default function useContacts() {
    const endOfPageRef = React.useRef(null);

    return {
        endOfPageRef,
    };
}
