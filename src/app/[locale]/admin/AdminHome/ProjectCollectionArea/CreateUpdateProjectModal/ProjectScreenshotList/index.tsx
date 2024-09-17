import { IconButton } from '@/components/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from 'next/image';
import React from 'react';

interface ProjectScreenshotListProps {
    projectScreenshotUrls: string[];
    replaceScreenshotFunc(
        _screenshotIndex: number
    ): (_: React.ChangeEvent<HTMLInputElement>) => void;
    removeScreenshotFunc(_screenshotIndex: number): () => void;
}

export default function ProjectScreenshotList(
    props: ProjectScreenshotListProps
) {
    return (
        props.projectScreenshotUrls.length > 0 && (
            <div className="flex gap-2 overflow-auto">
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
                                <div className={IconButton.className}>
                                    <label
                                        htmlFor="upload-replace-img"
                                        className="cursor-pointer"
                                    >
                                        <EditIcon
                                            sx={{
                                                fontSize: 27,
                                            }}
                                        />
                                    </label>
                                    <input
                                        onChange={props.replaceScreenshotFunc(
                                            index
                                        )}
                                        className="absolute pointer-events-none opacity-0 border-[3px] rounded-md"
                                        type="file"
                                        accept=".webp,.png,.jpg,.jpeg"
                                        name=""
                                        id="upload-replace-img"
                                    />
                                </div>

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
}
