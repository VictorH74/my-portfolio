'use client';
import React from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

import { useModalContainer } from './useModalContainer';

export const ModalContainer: React.FC<{
    children: React.ReactElement<HTMLElement>;
    className?: string;
    onClose?: () => void;
}> = ({ children, className, onClose }) => {
    useModalContainer();

    const childrenWithClassName = React.cloneElement(children, {
        className: twMerge(children.props.className, 'animate-fade-in-scale'),
    });

    return createPortal(
        <div
            onClick={onClose}
            className={twMerge(
                'fixed inset-0 bg-black/70 grid place-items-center overflow-auto z-100',
                className
            )}
        >
            <div
                className="contents"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {childrenWithClassName}
            </div>
        </div>,
        document.body
    );
};
