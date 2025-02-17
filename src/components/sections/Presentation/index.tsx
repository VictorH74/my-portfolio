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
                'w-full h-[95vh] bg-primary-black grid place-items-center sticky top-0 -z-10 overflow-hidden max-[768px]:bg-[url(/background-small.webp)] max-[1440px]:bg-[url(/background-medium.webp)] max-[1441px]:bg-[url(/background-large.webp)] min-[1441px]:bg-[url(/background-larger.webp)]',
                sectionFont.className
            )}
        >
            <div className="text-white grid gap-7 font-semibold">
                <h2
                    data-aos="fade-up"
                    data-aos-once="true"
                    data-aos-duration="1000"
                    className="max-sm:text-3xl min-[87.5rem]:text-7xl text-5xl"
                >
                    {' '}
                    {t('hello')}
                </h2>
                <h1
                    data-aos="fade-up"
                    data-aos-once="true"
                    data-aos-delay="200"
                    data-aos-duration="1000"
                    className="max-sm:text-4xl min-[87.5rem]:text-8xl text-6xl"
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
                    className="max-sm:text-3xl min-[87.5rem]:text-7xl text-5xl"
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
                                    className="motion-safe:animate-bounce max-sm:size-10 size-12 min-[87.5rem]:size-14"
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
