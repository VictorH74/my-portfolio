import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';

export const AboutMe = () => {
    const t = useTranslations('AboutMeSection');

    return (
        <section
            id="about-me"
            className="grid place-items-center py-52 relative bg-white"
        >
            <div className="max-w-default">
                <div className="flex gap-5 justify-center items-center">
                    <div className="size-[380px] aspect-square bg-[#2e2e2e] rounded-2xl"></div>
                    <div className="overflow-auto w-fit text-[#444444] font-medium">
                        <h2 className="text-4xl">Victor Leal</h2>
                        <h3 className="text-2xl">{t('career')}</h3>
                        <div className={twMerge('space-y-2 mt-3')}>
                            <p>{t('paragraph_1')}</p>
                            <p>{t('paragraph_2')}</p>
                            <p>{t('paragraph_3')}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-10 items-center mt-7">
                    <div className="w-full h-[3px] bg-[#2e2e2e]" />
                    <button
                        data-aos="zoom-in"
                        className="w-fit shrink-0 px-8 py-5 rounded-full uppercase bg-[#2e2e2e] text-white font-medium"
                    >
                        {t('download_resume_btn')}
                    </button>
                    <div className="w-full h-[3px] bg-[#2e2e2e]" />
                </div>
            </div>
        </section>
    );
};
