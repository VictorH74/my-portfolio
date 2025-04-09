import {
    iconButtonClassName,
    iconButtonHoverClassName,
} from '@/components/IconButton';
import {
    OutputReordableItemType,
    ReordableModal,
} from '../../../../../components/ReordableModal';
import { ScreenshotType } from '@/types';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Image from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ReorderListBtn } from '../../../../../components/ReorderListBtn';

interface ProjectScreenshotListActionsProps {
    projectScreenshotUrls: string[];
    onSelectChange(_: React.ChangeEvent<HTMLInputElement>): void;
    onReorderScreenshots(_items: OutputReordableItemType[]): Promise<void>;
    projectScreenshots: (File | ScreenshotType)[];
}

export const ProjectScreenshotListActions = (
    props: ProjectScreenshotListActionsProps
) => {
    const [onReorderScreenshots, setOnReorderScreenshots] =
        React.useState(false);

    return (
        <div className="flex px-2 w-fit items-center justify-center gap-3 mb-4">
            <h2 className="text-gray-600 text-xl">Screenshot list</h2>
            <label
                className={twMerge(
                    'relative',
                    iconButtonClassName,
                    iconButtonHoverClassName,
                    'rounded-md'
                )}
            >
                <AddPhotoAlternateIcon sx={{ fontSize: 27 }} />
                <input
                    onChange={props.onSelectChange}
                    className="absolute pointer-events-none opacity-0"
                    multiple
                    type="file"
                    accept=".webp,.png,.jpg,.jpeg"
                    name=""
                />
            </label>
            {props.projectScreenshotUrls.length > 1 && (
                <ReorderListBtn
                    onClick={() => setOnReorderScreenshots(true)}
                    className={twMerge('rounded-md', iconButtonHoverClassName)}
                />
            )}

            {onReorderScreenshots && (
                <ReordableModal
                    onSubmit={props.onReorderScreenshots}
                    items={props.projectScreenshots.map(({ name }, index) => ({
                        id: String(index),
                        value: name,
                    }))}
                    onClose={() => setOnReorderScreenshots(false)}
                >
                    {(item) => (
                        <div
                            key={item.id}
                            className="flex justify-between p-2 items-center"
                        >
                            <p className="truncate">{item.value}</p>
                            <Image
                                width={300}
                                height={113}
                                className="rounded-md w-auto h-[70px]"
                                alt="screeshot"
                                src={
                                    props.projectScreenshotUrls[Number(item.id)]
                                }
                            />
                        </div>
                    )}
                </ReordableModal>
            )}
        </div>
    );
};
