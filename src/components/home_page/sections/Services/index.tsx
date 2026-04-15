import { useTranslations } from 'next-intl';
import React from 'react';

const cardDataList = [
    {
        icon: '🌐',
        title: 'Web App',
        description: 'Systems, CRMs, dashboards',
    },
    {
        icon: '📱',
        title: 'Mobile App',
        description: 'React Native + Expo',
    },
    {
        icon: '🔗',
        title: 'API & Backend',
        description: {
            en: 'Node.js, REST, integrations',
            pt: 'Node.js, REST, integrações',
        },
    },
    {
        icon: '🛒',
        title: 'E-commerce',
        description: {
            en: 'Digital payments, Firebase, Google Maps',
            pt: 'Pagamentos digitais, firebase, google maps',
        },
    },
    {
        icon: '💲',
        title: 'Landing Page',
        description: {
            en: 'Fast, responsive, SEO-ready',
            pt: 'Rápido, responsivo, Otimizado para SEO',
        },
    },
    {
        icon: '🔧',
        title: {
            en: 'Maintenance',
            pt: 'Manutenção',
        },
        description: {
            en: 'Bug fixes, improvements',
            pt: 'Correções de bugs, melhorias',
        },
    },
];

export const Services = () => {
    const t = useTranslations('ServicesSection');

    return (
        <section
            id="about-me"
            className="max-md:p-[5rem_0_2.5rem_0] grid place-items-center p-[6rem_0_6.5rem_0] relative bg-background"
        >
            <div className="max-w-default w-full">
                <div className="mb-14 text-center">
                    <h2 data-aos="fade-up" data-aos-delay={100} data-aos-once="true" className="text-dark-font text-3xl font-semibold uppercase">
                        {t('section_title')}
                    </h2>
                    <h3 data-aos="fade-up" data-aos-delay={300} data-aos-once="true" className="text-dark-font/70 text-2xl font-semibold">
                        {t('subtitle')}
                    </h3>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {cardDataList.map((card, i) => {
                        const title =
                            typeof card.title === 'string'
                                ? card.title
                                : card.title[
                                      t(
                                          'listItemLang'
                                      ) as keyof typeof card.title
                                  ];

                        const description =
                            typeof card.description === 'string'
                                ? card.description
                                : card.description[
                                      t(
                                          'listItemLang'
                                      ) as keyof typeof card.description
                                  ];

                        return (
                            <div
                                key={title}
                                data-aos="flip-up"
                                data-aos-once="true"
                                data-aos-delay={(i + 1 ) * 50}
                                data-aos-duration="500"
                                className="flex flex-col gap-1 border border-zinc-300 rounded-xl bg-secondary-black px-4 py-8 shadow-md"
                            >
                                <h2 className="text-2xl mb-4">{card.icon}</h2>
                                <h4 className="text-white/90 font-semibold">
                                    {title}
                                </h4>
                                <p className="text-white/70">{description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
