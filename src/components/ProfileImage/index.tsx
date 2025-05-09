'use client';
import { Loading } from '@/components/Loading';
import { db } from '@/configs/firebaseConfig';
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ProfileImageProps {
    currentImgSrc?: string | null;
}

export const ProfileImage: React.FC<ProfileImageProps> = (props) => {
    const t = useTranslations('AboutMeSection');
    const { data: imgSrc, isLoading } = useQuery({
        queryKey: ['profile-img'],
        queryFn: () => loadImage(),
    });

    const loadImage = async () => {
        const docRef = doc(db, 'profile', 'image');
        const docData = (await getDoc(docRef)).data();
        if (!docData) {
            // not found
            console.error('erro trying loading profile image!');
            return;
        }

        return docData.url as string;
    };

    if (isLoading && !props.currentImgSrc)
        return (
            <div className="w-full aspect-square grid place-items-center">
                <Loading />
            </div>
        );

    if (!imgSrc && !props.currentImgSrc)
        return (
            <div className="size-full grid place-items-center">
                <p className="text-red-400 font-medium text-sm">
                    {t('profile_image_load_error')}
                    {/* TODO: retry button */}
                </p>
            </div>
        );

    return (
        <Image
            priority
            className={twMerge(
                'rounded-md object-cover h-auto w-full duration-200'
            )}
            height={300}
            width={300}
            src={props.currentImgSrc || imgSrc || ''}
            alt="profile image"
        />
    );
};
