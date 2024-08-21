"use client"
import { useTheme } from "@/hooks/UseTheme";
import { twMerge } from "tailwind-merge";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import React from "react";

export default function TechnologiesArea() {
    const formRef = React.useRef<HTMLFormElement>(null)
    const {themeColor} = useTheme()

    const resetFields = () => {
        
    }

    return (
        <div className="mb-5">
            <h1 className="text-2xl mb-2">Technologies</h1>
            <form ref={formRef} action="" className="flex flex-row">
                <div className="grid grid-cols-2 gap-2 grow">
                    {[
                        { placeholder: "URL", name: "iconUrl", className: "col-span-2", pattern: "https?://.+" },
                        { placeholder: "ID", name: "iconId", className: "grid", pattern: "[a-z]*" },
                        { placeholder: "NAME", name: "iconName", className: "grid" },
                    ].map(({ className, ...ipt }) => (
                        <input key={ipt.name} type="text" {...ipt} className={twMerge("border-2 p-2 rounded-md", className)} onFocus={e => e.target.select()} required />
                    ))}
                </div>
                <div className="max-w-[200px] w-full grosw-0 px-2 grid grid-rows-2 gap-2">
                    <button className="p-2 rounded-md w-full bg-gray-200 dark:bg-[#3f3f3f]" type="button" >Reset <RestartAltIcon /></button>
                    <button style={{backgroundColor: themeColor.color}} className="p-2 rounded-md w-full" >Save <SaveAltIcon /></button>
                </div>
            </form>
        </div>
    )
}