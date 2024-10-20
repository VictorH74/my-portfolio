'use client';
import { TechnologyLiItem } from '@/components/TechnologyLiItem';
import { useGlobalTechnologies } from '@/hooks/useGlobalTechnologies';
import { Noto_Sans } from 'next/font/google';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const notoSans = Noto_Sans({ weight: '400', subsets: ['latin'] });

export const Technologies = () => {
    const { technologyArray, empty: emptyTechArray } = useGlobalTechnologies();
    const t = useTranslations('Technologies_Section');

    return (
        <section
            id="technologies"
            className="home-section pt-24 text-center section px-0"
        >
            <h1 className={`section-title mb-12 ${notoSans.className}`}>
                {t('title')}
            </h1>
            <ul className="flex flex-wrap justify-center gap-3">
                {emptyTechArray ? (
                    <p className="text-red-400">
                        {t('empty_technologies_msg')}
                    </p>
                ) : (
                    technologyArray.map(
                        (icon) =>
                            !icon.hidden && (
                                <TechnologyLiItem
                                    key={icon.id}
                                    data-aos="flip-left"
                                    data-aos-duration="1000"
                                    data-aos-once="true"
                                >
                                    <Image
                                        loading="lazy"
                                        placeholder="empty"
                                        height={50}
                                        width={50}
                                        className="h-2/5 w-auto"
                                        src={icon.src}
                                        alt="icon"
                                    />
                                    <div className="tech-name ">
                                        <p
                                            className="primary-font-color"
                                            translate="no"
                                        >
                                            {icon.name}
                                        </p>
                                    </div>
                                </TechnologyLiItem>
                            )
                    )
                )}
            </ul>
        </section>
    );
};
