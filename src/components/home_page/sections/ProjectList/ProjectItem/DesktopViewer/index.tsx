import { Slider } from '@/components/shared/Slider';
import { ScreenshotType } from '@/types/project';
import { twMerge } from 'tailwind-merge';

interface DesktopViewerProps {
    className?: string;
    images: ScreenshotType[];
}

export const DesktopViewer = (props: DesktopViewerProps) => {
    return (
        <div
            className={twMerge('min-lg:w-4/5 h-auto relative', props.className)}
        >
            <div className="w-[88%] mx-auto min-lg:rounded-t-xl relative  aspect-[16/9.5]  shadow-xl slide-container bg-secondary-black p-[0.7%]">
                <div className="size-full aspect-video w-full h-auto rounded-t-md relative overflow-hidden">
                    <div className="absolute inset-x-0 z-20">
                        <div className="aspect-[11/1] w-[12%] rounded-b-2xl bg-secondary-black mx-auto"></div>
                    </div>
                    <Slider images={props.images} />
                </div>
            </div>
            <div className="bg-[#D9D9D9] aspect-[28/1] -inset-x-[8%] bottom-0 rounded-t-md rounded-b-3xl shadow-[0px_-0.625rem_0.625rem_#00000087_inset]">
                <div className="aspect-[25/2.5] w-[15%] mx-auto rounded-b-3xl bg-red-300s shadow-[0px_-0.25rem_0.25rem_#00000087_inset,0px_0.25rem_0.25rem_#00000087]"></div>
            </div>
        </div>
    );
};
