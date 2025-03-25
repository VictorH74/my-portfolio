import React from 'react';

interface ButtonProps {
    onClick(): void;
    children: React.ReactElement;
}

export default function Button(props: ButtonProps) {
    return (
        <button
            className="p-2 rounded-md hover:scale-105 duration-200 bg-gray-300"
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}
