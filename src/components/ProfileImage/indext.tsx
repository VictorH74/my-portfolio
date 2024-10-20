import { db } from '@/configs/firebaseConfig';
import Skeleton from '@mui/material/Skeleton';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ProfileImageProps {
    className?: string;
    currentImgSrc?: string | null;
}

export const ProfileImage = (props: ProfileImageProps) => {
    const [currentImgSrc, setCurrentImgSrc] = React.useState<string | null>(
        null
    );

    React.useEffect(() => {
        if (!props.currentImgSrc) {
            loadImage();
            return;
        }
        setCurrentImgSrc(props.currentImgSrc);
    }, [props.currentImgSrc]);

    const loadImage = async () => {
        const docRef = doc(db, 'profile', 'image');
        const docData = (await getDoc(docRef)).data();
        if (!docData) {
            // not found
            alert('erro trying loading profile image!');
            return;
        }
        setCurrentImgSrc(docData.url);
    };

    if (!currentImgSrc)
        return (
            <Skeleton
                sx={{
                    backgroundColor: '#5a5a5a',
                }}
                height={355}
                width={355}
                variant="rectangular"
                animation="wave"
            />
        );

    return (
        <Image
            loading="lazy"
            placeholder="empty"
            className={twMerge(
                'rounded-md object-cover h-auto w-full duration-200 bg-[var(--theme-color)]',
                props.className
            )}
            height={300}
            width={300}
            src={currentImgSrc}
            alt="me"
        />
    );
};
