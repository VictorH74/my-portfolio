'use client';

import { DownloadResumeBtn } from '@/components/DownloadResumeBtn';
import { ViewResumeBtn } from '@/components/ViewResumeBtn';
import { isMobilePortrait } from '@/utils/functions';

export const ResumeActionButton = () => {
    return (
        <div className="flex flex-row gap-10 items-center mt-7">
            <hr className="w-full h-[0.188rem] bg-secondary-black" />
            {isMobilePortrait() ? (
                <DownloadResumeBtn className="uppercase" />
            ) : (
                <ViewResumeBtn className="uppercase" />
            )}

            <hr className="w-full h-[0.188rem] bg-secondary-black" />
        </div>
    );
};
