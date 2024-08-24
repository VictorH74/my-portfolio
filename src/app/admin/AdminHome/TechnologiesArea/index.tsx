"use client"
import { useTheme } from "@/hooks/UseTheme";
import { twMerge } from "tailwind-merge";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import React from "react";

type FieldType = {
    placeholder: string
    name: string
    className: string
    type?: string
    pattern: string
    value: string
    onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export default function TechnologiesArea() {
    const [urlValue, setUrlValue] = React.useState("")
    const [idValue, setIdValue] = React.useState("")
    const [nameValue, setNameValue] = React.useState("")

    const { themeColor } = useTheme()

    const resetFields = () => {
        setUrlValue("")
        setIdValue("")
        setNameValue("")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newTech = {
            url: urlValue,
            id: idValue,
            name: nameValue,
        }
        // TODO: include 'hidden' boolean prop
        // TODO: save newTech on firebase
    }

    return (
        <div className="mb-5">
            <h1 className="text-2xl mb-2">Technologies</h1>
            <form className="flex flex-row" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-2 grow">
                    {([
                        { placeholder: "URL", name: "iconUrl", type: "url", className: "col-span-2", pattern: "https?://.+", value: urlValue, onChange: (e) => setUrlValue(e.currentTarget.value) },
                        { placeholder: "ID", name: "iconId", className: "grid", pattern: "[a-z]*", value: idValue, onChange: (e) => setIdValue(e.currentTarget.value) },
                        { placeholder: "NAME", name: "iconName", className: "grid", value: nameValue, onChange: (e) => setNameValue(e.currentTarget.value) },
                    ] as FieldType[]).map(({ className, ...ipt }) => (
                        <input key={ipt.name} {...ipt} className={twMerge("border-2 p-2 rounded-md", className)} onFocus={e => e.target.select()} required />
                    ))}
                </div>
                <div className="max-w-[200px] w-full grosw-0 px-2 grid grid-rows-2 gap-2">
                    <button className="p-2 rounded-md w-full bg-gray-200 dark:bg-[#3f3f3f]" type="button" onClick={resetFields} >Reset <RestartAltIcon /></button>
                    <button style={{ backgroundColor: themeColor.color }} className="p-2 rounded-md w-full" >Save <SaveAltIcon /></button>
                </div>
            </form>
        </div>
    )
}