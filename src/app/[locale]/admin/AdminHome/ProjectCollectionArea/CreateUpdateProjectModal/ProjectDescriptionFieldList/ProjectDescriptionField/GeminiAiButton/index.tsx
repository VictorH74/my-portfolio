import { BtnAttrType } from '@/types';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface GeminiAiButtonProps extends Omit<BtnAttrType, 'type'> {}

export default function GeminiAiButton({
    className,
    ...btnAttrs
}: GeminiAiButtonProps) {
    return (
        <button
            type="button"
            className={twMerge(
                'py-1 px-2 rounded-md bg-custom-gray-light flex items-center gap-2 duration-150 hover:brightness-110 shadow-md',
                className
            )}
            {...btnAttrs}
        >
            <Image
                alt="gemini ai icon"
                width={20}
                height={20}
                src="/images/gemini-img.png"
            />
            <p>Improve with gemini</p>
        </button>
    );
}
