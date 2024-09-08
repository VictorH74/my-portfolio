'use client';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const ModalContainer: React.FC<{
    children: React.ReactElement;
    className?: string;
}> = ({ children, className }) => {
    React.useEffect(() => {
        const paddingRight =
            window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${paddingRight}px`;
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, []);

    return (
        <div
            className={twMerge(
                'fixed inset-0 bg-black/70 grid place-items-center overflow-auto',
                className
            )}
        >
            {children}
        </div>
    );
};

export default ModalContainer;
