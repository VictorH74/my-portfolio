import { TechnologyType } from '@/types';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import './style.css';

const cubeSide = {
    1: 'right',
    2: 'left',
    3: 'top',
    4: 'bottom',
};

export const TechnologyCard: React.FC<TechnologyType> = (techIcon) => {
    const randomNumber = Math.ceil(Math.random() * 4) as keyof typeof cubeSide;

    return (
        <li
            className={twMerge(
                'cube-container tech-item-card',
                cubeSide[randomNumber] + '-rotation'
            )}
            data-rotate-side={cubeSide[randomNumber]}
        >
            <div className="cube">
                <div className="bg-secondary-black shadow-lg shrink-0 text-white front">
                    <Image
                        loading="lazy"
                        placeholder="empty"
                        height={50}
                        width={50}
                        className="h-2/5 w-auto pointer-events-none select-none"
                        src={techIcon.src}
                        alt="icon"
                    />
                </div>

                {/* side */}
                <div
                    className={twMerge('bg-[#6d6d6d]', cubeSide[randomNumber])}
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
                    <p className="select-none text-center font-medium">
                        {techIcon.name}
                    </p>
                </div>
            </div>
        </li>
    );
};
