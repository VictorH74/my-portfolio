'use client';
import { Loading } from '@/components/Loading';
import { ProfileImage } from '@/components/ProfileImage';
import { SelectFileIconButton } from '@/components/SelectFileIconButton';
import { profileService } from '@/di/container';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { EditImageModal } from './EditImageModal';

export const ProfileImageContainer = () => {
    const [submitting, setSubmitting] = React.useState(false);
    const [currentImgSrc, setCurrentImgSrc] = React.useState<string | null>(
        null
    );
    const [toUpdateImageSrc, setToUpdateImageSrc] = React.useState<
        string | null
    >(null);
    const selectFileRef = React.useRef<HTMLInputElement>(null);

    const handleSelectImg = (files: FileList | null) => {
        if (!files) return;
        const img = files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setToUpdateImageSrc(reader.result as string);
        };

        reader.readAsDataURL(img);
    };

    const saveImg = async (imgBlob: Blob) => {
        setSubmitting(true);

        const url = await profileService.updateProfileImg(imgBlob)

        setCurrentImgSrc(url);
        setSubmitting(false);
    };
    const cancelImgEditing = async () => {
        selectFileRef.current!.value = '';
        setToUpdateImageSrc(null);
    };

    return (
        <div className="relative bg-secondary-black">
            <ProfileImage currentImgSrc={currentImgSrc} />
            <div
                className={twMerge(
                    'absolute inset-0 opacity-0 hover:opacity-100 bg-black/80 rounded-md duration-200 grid place-items-center',
                    submitting && 'opacity-100'
                )}
            >
                {submitting ? (
                    <Loading />
                ) : (
                    <SelectFileIconButton
                        ref={selectFileRef}
                        accept=".webp,.png,.jpg,.jpeg"
                        onChange={handleSelectImg}
                    />
                )}
            </div>

            {!!toUpdateImageSrc && (
                <EditImageModal
                    imageSrc={toUpdateImageSrc}
                    saveFunc={saveImg}
                    cancelFunc={cancelImgEditing}
                />
            )}
        </div>
    );
};
