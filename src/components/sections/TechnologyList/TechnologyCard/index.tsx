import { TechnologType } from '@/types';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

const cubeSide = {
    1: 'right',
    2: 'left',
    3: 'top',
    4: 'bottom',
};

export const TechnologyCard: React.FC<TechnologType> = (techIcon) => {
    const randomNumber = Math.ceil(Math.random() * 4);

    return (
        <div
            className={twMerge(
                'cube-container',
                'cube-side-rotation-' + randomNumber
            )}
        >
            <div className="cube">
                <div className="bg-[#2e2e2e] shadow-lg shrink-0 text-white front">
                    <Image
                        loading="lazy"
                        placeholder="empty"
                        height={50}
                        width={50}
                        className="h-2/5 w-auto"
                        src={techIcon.src}
                        alt="icon"
                    />
                </div>

                <div
                    className={twMerge(
                        'bg-[#6d6d6d]',
                        cubeSide[randomNumber as keyof typeof cubeSide]
                    )}
                    style={
                        techIcon.color
                            ? {
                                  backgroundColor: techIcon.color.background,
                                  color: techIcon.color.heading,
                              }
                            : {
                                  backgroundColor: '#6d6d6d',
                                  color: '#FFF',
                              }
                    }
                >
                    {techIcon.name}
                </div>
            </div>
        </div>
    );
};
