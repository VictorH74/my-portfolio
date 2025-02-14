'use client';
import { useTechnologyList } from '@/hooks/useTechnologyList';
import Skeleton from '@mui/material/Skeleton';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export const Presentation = () => {
    const t = useTranslations('HeroSection');
    const { technologyList, isLoading } = useTechnologyList();

    return (
        <section
            id="presentation"
            className="w-full h-[calc(100vh-100px)] bg-custom-black grid place-items-center sticky top-0 -z-10 overflow-hidden"
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
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FC69] via-[#4EFFFF] via-[57%] to-[#2382FF]">
                        Victor Hugo Leal
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
                <div className="flex gap-7 ml-2">
                    {isLoading ? (
                        <Fallback />
                    ) : (
                        technologyList
                            .filter((icon) => icon.isMain)
                            .map((icon, i) => (
                                <Image
                                    key={icon.id}
                                    height={60}
                                    width={60}
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
                height={60}
                width={60}
                variant="circular"
                sx={{ backgroundColor: '#ececec24' }}
            />
        ));
