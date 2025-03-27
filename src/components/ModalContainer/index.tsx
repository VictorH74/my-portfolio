'use client';
import React from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

import { useModalContainer } from './useModalContainer';

export const ModalContainer: React.FC<{
    children: React.ReactElement;
    className?: string;
    onClose?: () => void;
}> = ({ children, className, onClose }) => {
    useModalContainer();

    return createPortal(
        <div
            onClick={onClose}
            className={twMerge(
                'fixed inset-0 bg-black/70 grid place-items-center overflow-auto z-100',
                className
            )}
        >
            <div
                className="size-auto contents"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {children}
            </div>
        </div>,
        document.body
    );
};
