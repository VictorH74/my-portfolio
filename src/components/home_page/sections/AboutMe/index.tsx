import { ProfileImage } from '@/components/shared/ProfileImage';
import { formatText } from '@/utils/functions';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';

import { ResumeActionButton } from './ResumeActionButton';

const list = [
    'Sistema Web do zero',
    'Lojas Online',
    'SaaS',
    'Landing Page',
    'Dashboard Administrativo',
    'Integrações com APIs (pagamentos, WhatsApp, SMS, Email, IA, governo)',
    'Aplicativos Mobile',
    'Tirar sua ideia do papel',
];

export const AboutMe = () => {
    const t = useTranslations('AboutMeSection');

    return (
        <section
            id="about-me"
            className="max-md:p-[5rem_0_2.5rem_0] grid place-items-center p-[13rem_0_6.5rem_0] relative bg-background"
        >
            <div className="max-lg:px-4 max-w-default">
                <div className="flex max-lg:flex-col gap-7 justify-center items-center min-lg:mx-6">
                    <div className="max-lg:w-full min-lg:pb-3 min-lg:pr-3 size-fit relative">
                        <div
                            className="max-lg:hidden w-[23.75rem] aspect-[2/3] rounded-2xl z-0 translate-3 bg-linear-[115deg,#00FC69_17%,#4EFFFF_70%,#2382FF_100%] brightness-90"
                            data-aos="fade-right"
                            data-aos-duration="800"
                            data-aos-once="true"
                        />

                        <div
                            className="absolute -top-[1.6px] -left-[1.6px] max-lg:relative"
                            data-aos="fade-right"
                            data-aos-delay={300}
                            data-aos-duration="500"
                            data-aos-once="true"
                        >
                            <ProfileImage />
                        </div>
                    </div>
                    <div className="overflow-auto w-fit text-dark-font font-medium">
                        <h2
                            data-aos="fade-down"
                            className="text-4xl"
                            data-aos-delay={200}
                            data-aos-duration="800"
                            data-aos-once="true"
                        >
                            Victor H. Leal
                        </h2>
                        <div
                            className={twMerge('space-y-2 mt-3')}
                            data-aos="zoom-in"
                            data-aos-delay={400}
                            data-aos-duration="500"
                            data-aos-once="true"
                        >
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: formatText(t('first_paragraph')),
                                }}
                            />
                            <div>
                                <h3
                                    className="text-lg font-semibold"
                                    dangerouslySetInnerHTML={{
                                        __html: formatText(
                                            t('soluction_example_list_Heading')
                                        ),
                                    }}
                                />
                                <ul className="list-disc space-y-1 pl-5">
                                    {(
                                        (JSON.parse(
                                            t('soluction_example_list')
                                        ) as string[]) || []
                                    ).map((str, i) => (
                                        <li key={i} className="pl-1">
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: formatText(str),
                                                }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <p
                                dangerouslySetInnerHTML={{
                                    __html: formatText(t('last_paragraph')),
                                }}
                            />

                            <div>
                                <h3
                                    className="text-lg font-semibold"
                                    dangerouslySetInnerHTML={{
                                        __html: formatText(
                                            t('differentials_heading')
                                        ),
                                    }}
                                />
                                <ul className="flex flex-row gap-2 flex-wrap">
                                    {(
                                        (JSON.parse(
                                            t('differentials')
                                        ) as string[]) || []
                                    ).map((str, i) => (
                                        <li key={i} className="bg-secondary-black/60 py-2 px-3 rounded-lg">
                                            <p className='text-white text-sm font-semibold'
                                                dangerouslySetInnerHTML={{
                                                    __html: formatText(str),
                                                }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <ResumeActionButton />
            </div>
        </section>
    );
};
