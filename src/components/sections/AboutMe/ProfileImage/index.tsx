import { Loading } from '@/components/Loading';
import { db } from '@/configs/firebaseConfig';
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export const ProfileImage = () => {
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

    if (isLoading)
        return (
            <div className="size-full grid place-items-center">
                <Loading size={100} />
            </div>
        );

    if (!imgSrc)
        return (
            <div className="size-full grid place-items-center">
                <p className="text-red-400 font-medium text-sm">
                    {t('profile_image_load_error')}
                </p>
            </div>
        );

    return (
        <Image
            loading="lazy"
            className={twMerge(
                'rounded-md object-cover h-auto w-full duration-200'
            )}
            height={300}
            width={300}
            src={imgSrc}
            alt="profile image"
        />
    );
};
