import { IconButton } from '@/components/IconButton';
import { SelectFileIconButton } from '@/components/SelectFileIconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from 'next/image';
import React from 'react';

interface ProjectScreenshotListProps {
    projectScreenshotUrls: string[];
    makeReplaceScreenshot(
        _screenshotIndex: number
    ): (_: FileList | null) => void;
    makeRemoveScreenshot(_screenshotIndex: number): () => void;
}

export const ProjectScreenshotList = (props: ProjectScreenshotListProps) => {
    return (
        props.projectScreenshotUrls.length > 0 && (
            <div className="flex gap-2 overflow-x-scroll scrollbar pb-3">
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
                                    onChange={props.makeReplaceScreenshot(
                                        index
                                    )}
                                    accept=".webp,.png,.jpg,.jpeg"
                                />

                                <IconButton
                                    Icon={RemoveIcon}
                                    onClick={props.makeRemoveScreenshot(index)}
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
