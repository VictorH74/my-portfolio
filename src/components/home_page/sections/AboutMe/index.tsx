import { ProfileImage } from '@/components/shared/ProfileImage';
import { formatText } from '@/utils/functions';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';

import { ResumeActionButton } from './ResumeActionButton';

export const AboutMe = () => {
    const t = useTranslations('AboutMeSection');

    return (
        <section
            id="about-me"
            className="max-md:p-[5rem_0_2.5rem_0] grid place-items-center p-[13rem_0_6.5rem_0] relative bg-background"
        >
            <div className="max-lg:px-4 max-w-default">
                <div className="flex max-lg:flex-col gap-5 justify-center items-center min-lg:mx-6">
                    <div className="max-lg:w-full min-lg:pb-3 min-lg:pr-3 size-fit relative">
                        <div className="max-lg:hidden w-[23.75rem] aspect-[2/3] rounded-2xl z-0 translate-3 bg-linear-[115deg,#00FC69_17%,#4EFFFF_70%,#2382FF_100%] brightness-90"></div>

                        <div className="absolute -top-[1.6px] -left-[1.6px] max-lg:relative">
                            <ProfileImage />
                        </div>
                    </div>
                    <div className="overflow-auto w-fit text-dark-font font-medium">
                        <h2 className="text-4xl">Victor H. Leal</h2>
                        <div className={twMerge('space-y-2 mt-3')}>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: formatText(t('paragraph_1')),
                                }}
                            />
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: formatText(t('paragraph_2')),
                                }}
                            />
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: formatText(t('paragraph_3')),
                                }}
                            />
                        </div>
                    </div>
                </div>
                <ResumeActionButton />
            </div>
        </section>
    );
};
