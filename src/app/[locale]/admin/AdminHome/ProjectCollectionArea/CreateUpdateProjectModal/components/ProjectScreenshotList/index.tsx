import { IconButton } from '@/components/IconButton';
import { SelectFileIconButton } from '@/components/SelectFileIconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from 'next/image';
import React from 'react';
// import { useDraggable } from 'react-use-draggable-scroll';

interface ProjectScreenshotListProps {
    projectScreenshotUrls: string[];
    replaceScreenshotFunc(
        _screenshotIndex: number
    ): (_: FileList | null) => void;
    removeScreenshotFunc(_screenshotIndex: number): () => void;
}

export const ProjectScreenshotList = (props: ProjectScreenshotListProps) => {
    // const ProjectScreenshotListHorizontalScrollRef =
    //     React.useRef<HTMLDivElement>(
    //         null
    //     ) as React.MutableRefObject<HTMLDivElement>;

    // const { events } = useDraggable(ProjectScreenshotListHorizontalScrollRef, {
    //     applyRubberBandEffect: true,
    // });

    return (
        props.projectScreenshotUrls.length > 0 && (
            <div
                className="flex gap-2 overflow-x-scroll scrollbar pb-3"
                // {...events}
                // ref={ProjectScreenshotListHorizontalScrollRef}
            >
                {props.projectScreenshotUrls.map((url, index) => (
                    <div
                        key={index}
                        className="relative shrink-0 group/img-container"
                    >
                        <Image
                            className="rounded-md w-auto h-[183px]"
                            width={300}
                            height={113}
                            src={url}
                            alt="project screenshot"
                        />
                        <div className="absolute inset-0 grid place-items-center opacity-0 group-hover/img-container:opacity-100 duration-200 ">
                            <div className="flex gap-2 items-center justify-center">
                                <SelectFileIconButton
                                    onChange={props.replaceScreenshotFunc(
                                        index
                                    )}
                                    accept=".webp,.png,.jpg,.jpeg"
                                    name=""
                                    id="upload-replace-img"
                                />

                                <IconButton
                                    Icon={RemoveIcon}
                                    onClick={props.removeScreenshotFunc(index)}
                                    type="button"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    );
};
