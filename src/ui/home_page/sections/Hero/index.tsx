import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Orbitron } from 'next/font/google';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';

import { MainTechList } from './MainTechList';

const sectionFont = Orbitron({ weight: '400', subsets: ['latin'] });

export const Hero = () => {
    const t = useTranslations('HeroSection');

    return (
        <section
            className={twMerge(
                'px-3 w-full h-[95vh] bg-primary-black grid place-items-center sticky top-0 -z-10 overflow-hidden',
                sectionFont.className
            )}
        >
            <AnimatedBackground />

            <div className="text-background grid gap-7 font-semibold">
                <h2
                    data-aos="fade-up"
                    data-aos-once="true"
                    data-aos-duration="1000"
                    className="max-sm:text-xl max-md:text-3xl min-[87.5rem]:text-7xl text-5xl"
                >
                    {' '}
                    {t('hello')}
                </h2>
                <h1
                    data-aos="fade-up"
                    data-aos-once="true"
                    data-aos-delay="200"
                    data-aos-duration="1000"
                    className="max-[21.8rem]:text-2xl max-sm:text-3xl max-md:text-4xl min-[87.5rem]:text-8xl text-6xl"
                >
                    {' '}
                    {t('i_am')}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00FC69] via-[#4EFFFF] via-57% to-[#2382FF]">
                        Victor H. Leal
                    </span>{' '}
                </h1>
                <h2
                    data-aos="fade-up"
                    data-aos-once="true"
                    data-aos-delay="400"
                    data-aos-duration="1000"
                    className="max-sm:text-xl max-md:text-3xl min-[87.5rem]:text-7xl text-5xl"
                >
                    {t('a')}
                </h2>
                <MainTechList />
            </div>
        </section>
    );
};
