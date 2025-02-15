'use client';
import { useTechnologyList } from '@/hooks/useTechnologyList';
import Skeleton from '@mui/material/Skeleton';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Orbitron } from 'next/font/google';
import { twMerge } from 'tailwind-merge';

const sectionFont = Orbitron({ weight: '400', subsets: ['latin'] });
const iconSize = 50;

export const Presentation = () => {
    const t = useTranslations('HeroSection');
    const { technologyList, isLoading } = useTechnologyList();

    return (
        <section
            id="presentation"
            className={twMerge(
                'w-full h-[calc(100vh-4rem)] bg-custom-black grid place-items-center sticky top-0 -z-10 overflow-hidden',
                sectionFont.className
            )}
        >
            <div className="text-white grid gap-7 font-semibold">
                <h2
                    data-aos="fade-up"
                    data-aos-once="true"
                    data-aos-duration="1000"
                    className="text-7xl"
                >
                    {' '}
                    {t('hello')}
                </h2>
                <h1
                    data-aos="fade-up"
                    data-aos-once="true"
                    data-aos-delay="200"
                    data-aos-duration="1000"
                    className="text-8xl"
                >
                    {' '}
                    {t('i_am')}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00FC69] via-[#4EFFFF] via-57% to-[#2382FF]">
                        Victor Leal
                    </span>{' '}
                </h1>
                <h2
                    data-aos="fade-up"
                    data-aos-once="true"
                    data-aos-delay="400"
                    data-aos-duration="1000"
                    className="text-7xl"
                >
                    {t('a')}
                </h2>
                <div className="flex gap-7 ml-2 pt-3">
                    {isLoading ? (
                        <Fallback />
                    ) : (
                        technologyList
                            .filter((icon) => icon.isMain)
                            .map((icon, i) => (
                                <Image
                                    key={icon.id}
                                    height={iconSize}
                                    width={iconSize}
                                    alt={icon.name + ' icon'}
                                    src={icon.src}
                                    className="animate-bounce"
                                    style={{
                                        animationDelay: i * 100 + 'ms',
                                    }}
                                />
                            ))
                    )}
                </div>
            </div>
        </section>
    );
};

const Fallback = () =>
    Array(5)
        .fill(null)
        .map((_, i) => (
            <Skeleton
                key={i}
                height={iconSize}
                width={iconSize}
                variant="circular"
                sx={{ backgroundColor: '#ececec24' }}
            />
        ));
