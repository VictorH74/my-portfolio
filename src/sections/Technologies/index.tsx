'use client';
import { TechnologyLiItem } from '@/components/TechnologyLiItem';
import { useGlobalTechnologies } from '@/hooks/useGlobalTechnologies';
import { poppins400 } from '@/utils/fonts';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';

import { TechListBgImage } from './TechListBgImage';

export const Technologies = () => {
    const { technologyArray, empty: emptyTechArray } = useGlobalTechnologies();
    const t = useTranslations('Technologies_Section');

    return (
        <section
            id="technologies"
            className="pt-24 text-center section px-0 relative"
        >
            <TechListBgImage />
            <div className="section-inner">
                <h1 className={`section-title mb-12 ${poppins400.className}`}>
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
                                                className={twMerge(
                                                    'primary-font-color',
                                                    poppins400.className
                                                )}
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
            </div>
        </section>
    );
};
