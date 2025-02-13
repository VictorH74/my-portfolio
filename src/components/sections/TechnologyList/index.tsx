'use client';
import { useTechnologyList } from '@/hooks/useTechnologyList';
import { useTranslations } from 'next-intl';
import { TechnologyCard } from './TechnologyCard';

export const TechnologyList = () => {
    const t = useTranslations('TechnologyListSection');
    const { technologyList } = useTechnologyList();

    return (
        <section
            id="technologies"
            className="grid place-items-center pb-52 bg-white"
        >
            <div className="max-w-default">
                <h2 className="text-[#444444] text-3xl font-semibold text-center mb-20 uppercase">
                    {t('section_title')}
                </h2>
                <div className="flex justify-center gap-6 flex-wrap">
                    {technologyList.map((techIcon) => {
                        return (
                            <TechnologyCard key={techIcon.id} {...techIcon} />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
