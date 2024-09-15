import React from 'react';

export default function useHamburger() {
    const [show, setShow] = React.useState(false);
    // const liItemRef = React.useRef(null);

    const toggle = React.useCallback(() => {
        setShow((prev) => !prev);
    }, []);

    return {
        toggle,
        show,
    };
}
