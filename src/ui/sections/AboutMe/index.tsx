import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { ProfileImage } from '../../../components/ProfileImage';
import { ViewResumeBtn } from '@/components/ViewResumeBtn';

export const AboutMe = () => {
    const t = useTranslations('AboutMeSection');

    return (
        <section
            id="about-me"
            className="max-md:p-[5rem_0_2.5rem_0] grid place-items-center p-[13rem_0_6.5rem_0] relative bg-background"
        >
            <div className="max-lg:px-4 max-w-default">
                <div className="flex max-lg:flex-col gap-5 justify-center items-center">
                    <div className="max-lg:w-full min-lg:pb-3 min-lg:pr-3 size-fit relative">
                        <div className="max-lg:hidden size-[23.75rem] aspect-square rounded-2xl translate-3 bg-linear-[115deg,#00FC69_17%,#4EFFFF_70%,#2382FF_100%] brightness-90"></div>
                        <div className="max-lg:w-full max-w-[31.25rem] max-lg:m-auto min-lg:absolute min-lg:top-0 min-lg:left-0 min-lg:size-[23.75rem] aspect-square rounded-2xl bg-secondary-black">
                            <ProfileImage />
                        </div>
                    </div>
                    <div className="overflow-auto w-fit text-dark-font font-medium">
                        <h2 className="text-4xl">Victor H. A. Leal</h2>
                        <h3 className="text-2xl">{t('career')}</h3>
                        <div className={twMerge('space-y-2 mt-3')}>
                            <p>{t('paragraph_1')}</p>
                            <p>{t('paragraph_2')}</p>
                            <p>{t('paragraph_3')}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-10 items-center mt-7">
                    <hr className="w-full h-[0.188rem] bg-secondary-black" />
                    <ViewResumeBtn className="uppercase" />
                    <hr className="w-full h-[0.188rem] bg-secondary-black" />
                </div>
            </div>
        </section>
    );
};
