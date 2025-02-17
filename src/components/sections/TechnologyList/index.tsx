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
            className="max-md:pb-20 grid place-items-center pb-52 bg-white max-sm:text-sm px-3"
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
                    <div className="max-sm:gap-2 flex justify-center gap-6 flex-wrap">
                        {technologyList.map((techIcon) => {
                            return (
                                <TechnologyCard
                                    key={techIcon.id}
                                    {...techIcon}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};
