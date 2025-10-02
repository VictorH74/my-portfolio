import { TechnologyType } from '@/types/technology';
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
                'cube tech-item-card',
                cubeSide[randomNumber] + '-rotation-cube'
            )}
            data-rotate-side={cubeSide[randomNumber]}
        >
            <div className="cube-side front bg-secondary-black shadow-lg grid place-items-center">
                <Image
                    loading="lazy"
                    placeholder="empty"
                    height={50}
                    width={50}
                    src={techIcon.src}
                    alt={techIcon.name + ' icon'}
                    className="h-2/5 w-auto pointer-events-none select-none"
                />
            </div>
            <div
                className={twMerge(
                    'cube-side bg-[#6d6d6d] grid place-items-center',
                    cubeSide[randomNumber]
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
                <p className="select-none text-center font-medium">
                    {techIcon.name}
                </p>
            </div>
        </li>
    );
};
