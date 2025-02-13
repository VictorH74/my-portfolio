'use client';
import { useTechnologyList } from '@/hooks/useTechnologyList';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export const Presentation = () => {
    const t = useTranslations('HeroSection');
    const { technologyList } = useTechnologyList();

    return (
        <section
            id="presentation"
            className="w-full h-[calc(100vh-100px)] bg-custom-black grid place-items-center sticky top-0 -z-10 overflow-hidden"
        >
            <div className="text-white grid gap-7 font-semibold">
                <h2 className="text-7xl"> {t('hello')}</h2>
                <h1 className="text-8xl">
                    {' '}
                    {t('i_am')}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FC69] via-[#4EFFFF] via-[57%] to-[#2382FF]">
                        Victor Hugo Leal
                    </span>{' '}
                </h1>
                <h2 className="text-7xl">{t('a')}</h2>
                <div className="flex gap-7 ml-2">
                    {technologyList
                        .filter((icon) => icon.isMain)
                        .map((icon) => (
                            <Image
                                key={icon.id}
                                height={65}
                                width={65}
                                alt={icon.name + ' icon'}
                                src={icon.src}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
};
