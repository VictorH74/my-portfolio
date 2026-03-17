import { OutputReordableItemType, ReordableModal } from '@/components/admin_page/ReordableModal';
import { ReorderListBtn } from '@/components/admin_page/ReorderListBtn';
import {
    iconButtonClassName,
    iconButtonHoverClassName,
} from '@/components/shared/IconButton';
import { ScreenshotType } from '@/types/project';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Image from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ProjectScreenshotListActionsProps {
    imageUrls: string[];
    onSelectChange(_: React.ChangeEvent<HTMLInputElement>): void;
    onReorderImages(_items: OutputReordableItemType[]): Promise<void>;
    images: (File | ScreenshotType)[];
    children: string
}

export const ProjectScreenshotListActions = (
    props: ProjectScreenshotListActionsProps
) => {
    const [onReorderScreenshots, setOnReorderScreenshots] =
        React.useState(false);

    return (
        <div className="flex px-2 w-fit items-center justify-center gap-3 mb-4">
            <h2 className="text-gray-600 text-xl">{props.children}</h2>
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
            {props.imageUrls.length > 1 && (
                <ReorderListBtn
                    onClick={() => setOnReorderScreenshots(true)}
                    className={twMerge('rounded-md', iconButtonHoverClassName)}
                />
            )}

            {onReorderScreenshots && (
                <ReordableModal
                    onSubmit={props.onReorderImages}
                    items={props.images.map(({ name }, index) => ({
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
                                    props.imageUrls[Number(item.id)]
                                }
                            />
                        </div>
                    )}
                </ReordableModal>
            )}
        </div>
    );
};
