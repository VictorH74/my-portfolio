import React from 'react';
import { twMerge } from 'tailwind-merge';
import './style.css';

const defaultContainerBaseWidth = 79;
// const defaultParticleSize = (defaultContainerBaseWidth / 3) * 1.07;

const particleSideClassName = {
    0: 'bg-[#00FC69]',
    1: 'bg-[#2382FF]',
    2: 'bg-[#4EFFFF]',
};

export const Loading: React.FC<{ size?: number }> = ({
    size = defaultContainerBaseWidth,
}) => {
    const particleSize = (size / 3) * 1.07;

    return (
        <ul
            style={{
                width: size,
                height: (Math.sqrt(3) / 2) * size,
            }}
            className="relative loading m-auto"
        >
            {Array(3)
                .fill(null)
                .map((_, i) => (
                    <li
                        key={i}
                        style={{
                            width: particleSize,
                        }}
                        className={twMerge(
                            'aspect-square rounded-full absolute',
                            particleSideClassName[
                                i as keyof typeof particleSideClassName
                            ]
                        )}
                    />
                ))}
        </ul>
    );
};
