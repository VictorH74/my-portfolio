import { twMerge } from 'tailwind-merge';

const defaultContainerBaseWidth = 150;
const defaultParticleSize = (defaultContainerBaseWidth / 3) * 1.07;

const particleSideClassName = {
    0: 'bg-[#00FC69]',
    1: 'bg-[#2382FF]',
    2: 'bg-[#4EFFFF]',
};

export const Loading = () => {
    return (
        <ul
            style={{
                width: defaultContainerBaseWidth,
                height: (Math.sqrt(3) / 2) * defaultContainerBaseWidth,
            }}
            className="relative loading"
        >
            {Array(3)
                .fill(null)
                .map((_, i) => (
                    <li
                        key={i}
                        style={{
                            width: defaultParticleSize,
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
