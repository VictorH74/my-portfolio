'use client';
import React from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

import { useModalContainer } from './useModalContainer';

export const ModalContainer: React.FC<{
    children: React.ReactElement;
    className?: string;
}> = ({ children, className }) => {
    useModalContainer();

    return createPortal(
        <div
            className={twMerge(
                'fixed inset-0 bg-black/70 grid place-items-center overflow-auto',
                className
            )}
        >
            {children}
        </div>,
        document.body
    );
};
