import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import Loading from '@/components/Loading';
import EditImageModal from './EditImageModal';
import SelectFileIconButton from '@/components/SelectFileIconButton';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/configs/firebaseConfig';

export default function ProfileImage() {
    const [submitting, setSubmitting] = React.useState(false);
    const [currentImgSrc, setCurrentImgSrc] = React.useState<string | null>(
        null
    );
    const [toUpdateImageSrc, setToUpdateImageSrc] = React.useState<
        string | null
    >(null);
    const selectFileRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        (async () => {
            const docRef = doc(db, 'profile', 'image');
            const docData = (await getDoc(docRef)).data();
            if (!docData) {
                // not found
                alert('erro trying loadin profile image!');
                return;
            }
            setCurrentImgSrc(docData.url);
        })();
    }, []);

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

        // save img file
        const storage = getStorage();
        const storageRef = ref(
            storage,
            `profile/me.${imgBlob.type.replace('image/', '')}`
        );
        const snap = await uploadBytes(storageRef, imgBlob, {
            contentType: imgBlob.type,
        });
        const url = await getDownloadURL(snap.ref);

        // saveProfileImgUrl(url)
        const imgData = {
            url: url,
        };
        const docRef = doc(db, 'profile', 'image');
        await updateDoc(docRef, imgData);

        setCurrentImgSrc(url);

        setSubmitting(false);
    };
    const cancelImgEditing = async () => {
        selectFileRef.current!.value = '';
        setToUpdateImageSrc(null);
    };

    return (
        <div className="relative">
            {!!currentImgSrc ? (
                <Image
                    loading="lazy"
                    placeholder="empty"
                    className="
              rounded-md
              object-cover 
              max-md:max-w-[300px]
              h-auto
              w-full
              duration-200
              bg-[var(--theme-color)]
            "
                    height={300}
                    width={300}
                    src={currentImgSrc}
                    alt="me"
                />
            ) : (
                <Skeleton width={300} />
            )}

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
                        id="select-profile-img"
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
}
