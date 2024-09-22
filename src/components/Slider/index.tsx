/* eslint-disable jsx-a11y/alt-text */
import { useTheme } from '@/hooks/UseTheme';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Image, { ImageProps } from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import useSlider, { SliderProps } from './useSlider';
import Loading from '../Loading';

export default function Slider(props: SliderProps) {
    const { themeColor } = useTheme();

    const hook = useSlider(props);

    return (
        <div
            className="relative"
            onTouchStart={hook.handleTouchStart}
            onTouchMove={hook.handleTouchMove}
            onTouchEnd={hook.handleTouchEnd}
            onMouseLeave={hook.handleMouseUp}
            onMouseDown={hook.handleMouseDown}
            onMouseMove={hook.handleMouseMove}
            onMouseUp={hook.handleMouseUp}
        >
            <ul
                ref={hook.sliderContainerRef}
                className="flex w-full overflow-hidden group/container"
            >
                {props.images.map((file, index) => {
                    return (
                        <li key={index} className="w-full flex-shrink-0">
                            <SlideImage
                                width={780}
                                height={300}
                                src={file.url}
                                alt={file.name}
                            />
                        </li>
                    );
                })}
                {props.images.length > 1 && (
                    <span className="absolute bottom-0 py-2 inset-x-0 flex justify-center">
                        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/50 duration-200 group-hover/container:opacity-100 opacity-0 max-lg:hidden" />
                        {props.images.map((_, i) => (
                            <button
                                key={i}
                                className="p-1 group/btn z-10"
                                onClick={() => hook.changeCurrentFileIndex(i)}
                                type="button"
                            >
                                <div
                                    className={twMerge(
                                        'size-3 rounded-full duration-200 group-hover/btn:scale-150 bg-[#d6d6d6]',
                                        hook.currentFileIndex == i &&
                                            'bg-[var(--theme-color)]'
                                    )}
                                />
                            </button>
                        ))}
                    </span>
                )}
                {props.images.length > 1 &&
                    [
                        {
                            label: 'prev',
                            Icon: NavigateBeforeIcon,
                            onClick: hook.previousSlide,
                            className: 'left-0',
                        },
                        {
                            label: 'next',
                            Icon: NavigateNextIcon,
                            onClick: hook.nextSlide,
                            className: 'right-0',
                        },
                    ].map((btn) => (
                        <button
                            key={btn.label}
                            onClick={btn.onClick}
                            className={twMerge(
                                'absolute inset-y-0 p-4 opacity-0 max-lg:opacity-100 group-hover/container:opacity-100 duration-200 lg:hover:scale-150',
                                btn.className
                            )}
                        >
                            <btn.Icon
                                sx={{ fontSize: 40, color: themeColor.color }}
                            />
                        </button>
                    ))}
            </ul>
        </div>
    );
}

const SlideImage: React.FC<
    Omit<ImageProps, 'className' | 'onLoad' | 'loading'>
> = (props) => {
    const [loadingImg, setLoadingImg] = React.useState(true);

    return (
        <div className="size-full relative select-none">
            <Image
                {...props}
                className="h-full w-auto"
                onLoad={() => setLoadingImg(false)}
                loading="lazy"
            />
            <div
                className={`absolute object-cover inset-0 bg-transparent grid place-items-center ${
                    loadingImg ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <Loading />
            </div>
        </div>
    );
};
