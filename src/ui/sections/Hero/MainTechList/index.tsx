'use client';

import { useGlobalTechnologyList } from '@/hooks/useGlobalTechnologyList';
import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';

const iconSize = 50;

export const MainTechList = () => {
    const { technologyList, isLoading } = useGlobalTechnologyList();

    if (isLoading)
        return (
            <div className="flex gap-7 ml-2 pt-3 max-md:h-12 h-14 min-[87.5rem]:h-16 max-sm:h-10">
                <Fallback />
            </div>
        );

    return (
        <>
            <div className="flex gap-7 ml-2 pt-3 h-12">
                {technologyList
                    .filter((icon) => icon.isMain)
                    .map((icon, i) => (
                        <Image
                            key={icon.id}
                            height={iconSize}
                            width={iconSize}
                            alt={icon.name + ' icon'}
                            src={icon.src}
                            className="motion-safe:animate-bounce max-md:size-10 size-12 min-[87.5rem]:size-14 max-sm:size-8"
                            style={{
                                animationDelay: i * 100 + 'ms',
                            }}
                        />
                    ))}
            </div>
        </>
    );
};

const Fallback = () =>
    Array(5)
        .fill(null)
        .map((_, i) => (
            <Skeleton
                key={i}
                height="100%"
                className="max-md:size-10 size-12 min-[87.5rem]:size-14 max-sm:size-8"
                variant="circular"
                sx={{ backgroundColor: '#ececec24' }}
            />
        ));
