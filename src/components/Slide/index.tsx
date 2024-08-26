/* eslint-disable jsx-a11y/alt-text */
import { ProjectScreenshotType } from "@/types";
import Image, { ImageProps } from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";
import Loading from "../Loading";
import { useTheme } from "@/hooks/UseTheme";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface SlideProps {
    images: ProjectScreenshotType[]
}

export default function Slide(props: SlideProps) {
    const sliderContainerRef = React.useRef<HTMLUListElement>(null);
    const { themeColor } = useTheme();

    const [currentFileIndex, setCurrentFileIndex] = React.useState<number>(0);

    React.useEffect(() => {
        if (!sliderContainerRef.current) return

        const sliderContainer = sliderContainerRef.current
        const left = sliderContainer.clientWidth * currentFileIndex

        sliderContainer.scrollTo({ left, behavior: 'smooth' })
    }, [currentFileIndex]);

    const changeCurrentFileIndex = (index: number) => setCurrentFileIndex(index)

    const previousSlide = React.useCallback(() => {
        if (currentFileIndex == 0) return setCurrentFileIndex(props.images.length - 1);
        setCurrentFileIndex(prev => prev - 1)
    }, [currentFileIndex, props.images.length])

    const nextSlide = React.useCallback(() => {
        if (currentFileIndex + 1 >= props.images.length) return setCurrentFileIndex(0);
        setCurrentFileIndex(prev => prev + 1)
    }, [currentFileIndex, props.images])

    return (
        <div className="relative">
            <ul
                ref={sliderContainerRef}
                className="flex w-full overflow-hidden group/container"
            >
                {props.images.map((file, index) => {
                    return (
                        <li
                            key={index}
                            className="w-full flex-shrink-0"
                        >
                            <SlideImage
                                width={780}
                                height={300}
                                src={file.url}
                                alt={file.name}
                            />
                        </li>
                    )
                })}
                {props.images.length > 1 && (
                    <span
                        className="absolute bottom-0 py-2 inset-x-0 flex justify-center"
                    >
                        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/50 duration-200 group-hover/container:opacity-100 opacity-0" />
                        {props.images.map((_, i) => (
                            <button key={i}
                                className="p-1 group/btn z-10"
                                onClick={() => changeCurrentFileIndex(i)}
                                type="button"
                            >
                                <div
                                    className="size-3 rounded-full duration-200 group-hover/btn:scale-150"
                                    style={{
                                        backgroundColor: currentFileIndex == i ? themeColor.color : "#d6d6d6"
                                    }}
                                />
                            </button>
                        ))}
                    </span>
                )}
                {props.images.length > 1 && [
                    { label: "prev", Icon: NavigateBeforeIcon, onClick: previousSlide, className: "left-0", },
                    { label: "next", Icon: NavigateNextIcon, onClick: nextSlide, className: "right-0", },
                ].map(btn => (
                    <button
                        key={btn.label}
                        onClick={btn.onClick}
                        className={twMerge("absolute inset-y-0 p-4 opacity-0 group-hover/container:opacity-100 duration-200 hover:scale-150", btn.className)}
                    >
                        <btn.Icon sx={{ fontSize: 40, color: themeColor.color }} />
                    </button>
                ))}

            </ul>
        </div>
    )
}


const SlideImage: React.FC<Omit<ImageProps, "className" | "onLoad" | "loading">> = (props) => {
    const [loadingImg, setLoadingImg] = React.useState(true)

    return (
        <div className="size-full relative">
            <Image
                {...props}
                className="h-full w-auto"
                onLoad={() => setLoadingImg(false)}
                loading="lazy"
            />
            <div
                className={`absolute object-cover inset-0 bg-transparent grid place-items-center ${loadingImg ? "opacity-100" : "opacity-0"
                    }`}
            >
                <Loading />
            </div>
        </div>
    )
}