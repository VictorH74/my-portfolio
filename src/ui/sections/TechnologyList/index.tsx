'use client';
import { useTechnologyList } from '@/hooks/useTechnologyList';
import { useTranslations } from 'next-intl';
import { TechnologyCard } from './TechnologyCard';
import { Loading } from '@/components/Loading';

export const TechnologyList = () => {
    const t = useTranslations('TechnologyListSection');
    const { technologyList, isLoading, isError, refetch } = useTechnologyList();

    return (
        <section
            id="technologies"
            className="max-md:py-[2.5rem] grid place-items-center py-[6.5rem] bg-background max-sm:text-sm px-3"
        >
            <div className="max-w-default">
                <h2 className="max-md:mb-10 text-dark-font text-3xl font-semibold text-center mb-20 uppercase">
                    {t('section_title')}
                </h2>

                {isError ? (
                    <button
                        className="text-red-400 font-medium py-2 px-6 w-full text-center cursor-pointer"
                        onClick={async () => await refetch()}
                    >
                        Error trying loading technologies! Retry
                    </button>
                ) : isLoading ? (
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
