'use client';
import useTechnologies from '@/hooks/UseTechnologies';
import Image from 'next/image';
import { Noto_Sans } from 'next/font/google';
import { useTranslations } from 'next-intl';

const notoSans = Noto_Sans({ weight: '400', subsets: ['latin'] });

export default function Technologies() {
    const { technologyArray, empty: emptyTechArray } = useTechnologies();
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
                                <li
                                    key={icon.id}
                                    className="shadow-xl flex flex-col items-center justify-center gap-2 max-sm:w-[100px] sm:w-[200px] sm:min-w-[200px] aspect-square select-none duration-200 backdrop-blur-md"
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
                                </li>
                            )
                    )
                )}
            </ul>
        </section>
    );
}
