import { Slider } from "@/components/shared/Slider"
import { ScreenshotType } from "@/types/project"
import { twMerge } from "tailwind-merge"

interface MobileViewerProps {
    className?: string
    screenClassName?: string
    images: ScreenshotType[]
}

export const MobileViewer = (props: MobileViewerProps) => {
  return (
   <div className={twMerge("w-[30%]  rounded-4xl relative  aspect-[9/20]  slide-container bg-secondary-black p-4 shadow-[0px_0_0.625rem_#ffffffaa_inset]", props.className)}>
     <div className={twMerge("rounded-3xl relative size-full overflow-hidden", props.screenClassName)}>
        <div className="absolute inset-x-0 z-20">
            <div className="aspect-[8/1] w-[40%] rounded-b-2xl bg-secondary-black mx-auto"></div>
        </div>
        <Slider images={props.images} />
     </div>
   </div>
  )
}