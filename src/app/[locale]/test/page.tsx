import { twMerge } from 'tailwind-merge';

export default function TestPage() {
    return (
        <div>
            <Loading />
        </div>
    );
}

const defaultContainerBaseWidth = 150;
const defaultParticleSize = (defaultContainerBaseWidth / 3) * 1.07;

const particleSideClassName = {
    0: 'bg-[#00FC69] top-0 left-1/2 -translate-x-1/2',
    1: 'bg-[#2382FF] bottom-0 left-0',
    2: 'bg-[#4EFFFF] bottom-0 right-0',
};

const Loading = () => {
    return (
        <div
            style={{
                width: defaultContainerBaseWidth,
                height: (Math.sqrt(3) / 2) * defaultContainerBaseWidth,
            }}
            className="relative"
        >
            {Array(3)
                .fill(null)
                .map((_, i) => (
                    <div
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
        </div>
    );
};
