'use client';
import { useTechnologyList } from '@/hooks/useTechnologyList';
import { useTranslations } from 'next-intl';
import { TechnologyCard } from './TechnologyCard';
import { Loading } from '@/components/Loading';

export const TechnologyList = () => {
    const t = useTranslations('TechnologyListSection');
    const { technologyList, isLoading } = useTechnologyList();

    return (
        <section
            id="technologies"
            className="max-md:pb-20 grid place-items-center pb-52 bg-background max-sm:text-sm px-3"
        >
            <div className="max-w-default">
                <h2 className="max-md:mb-10 text-dark-font text-3xl font-semibold text-center mb-20 uppercase">
                    {t('section_title')}
                </h2>

                {isLoading ? (
                    <div className="grid place-items-center">
                        <Loading />
                    </div>
                ) : (
                    <ul className="max-sm:gap-2 flex justify-center gap-4 flex-wrap">
                        {technologyList
                            .filter((techIcon) => !techIcon.hidden)
                            .map((techIcon) => {
                                return (
                                    <TechnologyCard
                                        key={techIcon.id}
                                        {...techIcon}
                                    />
                                );
                            })}
                    </ul>
                )}
            </div>
        </section>
    );
};
