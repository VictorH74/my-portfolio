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
    const t = useTranslations("AboutMeSection");

    const loadImage = async () => {
        const docRef = doc(db, "profile", "image");
        const docData = (await getDoc(docRef)).data();

        if (!docData) {
            throw new Error("Profile image not found!");
        }

        return docData.url as string;
    };

    const { data: imgSrc, isLoading, refetch, isError } = useQuery({
        queryKey: ["profile-img"],
        queryFn: loadImage,
        enabled: !props.currentImgSrc,
        retry: false,
    });

    const finalSrc = props.currentImgSrc || imgSrc || "";

    if (!props.currentImgSrc) {
        if (isLoading) {
            return (
                <div className="w-full aspect-square grid place-items-center">
                    <Loading />
                </div>
            );
        }

        if (isError) {
            return (
                <div className="w-full aspect-square grid place-items-center text-center">
                    <div>
                        <p className="text-red-400 font-medium text-sm mb-2">
                            {t("profile_image_load_error")}
                        </p>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 duration-200"
                            onClick={() => refetch()}
                        >
                            {t("profile_image_load_error_retry")}
                        </button>
                    </div>

                </div>
            );
        }
    };

    return (
        <Image
            priority
            className={twMerge(
                "rounded-md object-cover h-auto w-full duration-200"
            )}
            height={400}
            width={400}
            src={finalSrc}
            alt="profile image"
        />
    );

}