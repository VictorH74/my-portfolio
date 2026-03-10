import { ScreenshotType } from '@/types/project';
import { DesktopViewer } from '../DesktopViewer';
import { MobileViewer } from '../MobileViewer';

interface DeviceViewerProps {
    desktopImages: ScreenshotType[];
    mobileImages: ScreenshotType[];
}

export const DeviceViewer = (props: DeviceViewerProps) => {
    return (
        <div className="min-lg:w-[70%] aspect-video h-auto relative pr-[4%]">
            <DesktopViewer
                images={props.desktopImages}
                className="min-lg:w-[100%]"
            />
            <MobileViewer
                images={props.mobileImages}
                className="absolute h-auto w-[22%] top-[20%] right-0 p-[1%] rounded-[1.25rem]"
                screenClassName="rounded-[0.938rem]"
            />
        </div>
    );
};
