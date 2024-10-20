import { ReordableModal } from '@/app/[locale]/admin/AdminHome/ReordableModal';
import { ScreenshotType } from '@/types';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ReorderIcon from '@mui/icons-material/Reorder';
import Image from 'next/image';
import React from 'react';

interface ProjectScreenshotListActionsProps {
    projectScreenshotUrls: string[];
    onSelectChange(_: React.ChangeEvent<HTMLInputElement>): void;
    onReorderScreenshots(
        _items: ReordableModal.OutputReordableItemType[]
    ): Promise<void>;
    projectScreenshots: (File | ScreenshotType)[];
}

export const ProjectScreenshotListActions = (
    props: ProjectScreenshotListActionsProps
) => {
    const [onReorderScreenshots, setOnReorderScreenshots] =
        React.useState(false);

    return (
        <div className="flex flex-col justify-evenly px-2">
            <div className="relative">
                <label htmlFor="upload-img" className="px-6 cursor-pointer">
                    <AddPhotoAlternateIcon sx={{ fontSize: 35 }} />
                </label>
                <input
                    onChange={props.onSelectChange}
                    className="absolute pointer-events-none opacity-0"
                    multiple
                    type="file"
                    accept=".webp,.png,.jpg,.jpeg"
                    name=""
                    id="upload-img"
                />
            </div>
            {props.projectScreenshotUrls.length > 1 && (
                <button
                    onClick={() => setOnReorderScreenshots(true)}
                    type="button"
                >
                    <ReorderIcon sx={{ fontSize: 35 }} />
                </button>
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
