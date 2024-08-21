"use client"
import ModalContainer from "@/components/ModalContainer"
import useCreateUpdateModal, { CreateUpdateProjectModalProps } from "./useCreateUpdateProjectModal"
import Image from "next/image";
import TextArea from "@/components/TextArea";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { twMerge } from "tailwind-merge";
import { useTheme } from "@/hooks/UseTheme";
import RemoveIcon from '@mui/icons-material/Remove';
import ReorderIcon from '@mui/icons-material/Reorder';
import ReordableModal from "../ReordableModal";
import { createPortal } from "react-dom";

export default function CreateUpdateProjectModal(props: CreateUpdateProjectModalProps) {
    const hook = useCreateUpdateModal(props);
    const { themeColor } = useTheme();

    return (
        <>
            <ModalContainer>
                <div className="bg-gray-200 dark:bg-[#3f3f3f] w-full max-w-[1000px] rounded-md p-3 animate-scale">
                    <div className="text-right py-2">
                        <button onClick={props.onClose} ><CloseIcon /></button>
                    </div>

                    <form onSubmit={hook.handleSubmit}>
                        <div className={twMerge("flex flex-row bg-black/20 py-2 min-h-[200px]", hook.projectScreenshots.length > 0 ? "" : "justify-center")}>
                            <div className="flex flex-col justify-evenly px-2">
                                <div className="relative">
                                    <label htmlFor="upload-img" className="px-6 cursor-pointer"><AddPhotoAlternateIcon sx={{ fontSize: 35 }} /></label>
                                    <input onChange={hook.handleSelectChange} className="absolute pointer-events-none opacity-0" multiple type="file" accept=".webp,.png,.jpg,.jpeg" name="" id="upload-img" />
                                </div>
                                <button
                                    onClick={() => hook.setOnReorderScreenshots(true)}
                                    type="button"
                                >
                                    <ReorderIcon sx={{ fontSize: 35 }} />
                                </button>
                            </div>

                            {hook.projectScreenshotUrls.length > 0 && (
                                <div className="flex gap-2 overflow-auto">
                                    {
                                        hook.projectScreenshotUrls.map((url, i) => (
                                            <div key={i} className="relative shrink-0 group/img-container">
                                                <Image
                                                    className="rounded-md w-auto h-[183px]"
                                                    width={300} height={113}
                                                    src={url} alt="project screenshot"
                                                    onClick={() => {
                                                        hook.setProjectScreenshots(prev => {
                                                            if (props.project && !(prev[i] instanceof File) && typeof prev[i] === "object" && Object.hasOwn(prev[i], "url")) {
                                                                hook.setOnRemoveScreenshotNames(rPrev => [...rPrev, prev[i].name])
                                                            }
                                                            return prev.filter((_, index) => i !== index)
                                                        }
                                                        )
                                                    }}
                                                />
                                                <div className="absolute inset-0 grid place-items-center opacity-0 group-hover/img-container:opacity-100 duration-200">
                                                    <div className="flex gap-2 items-center justify-center">
                                                        <div className="bg-gray-200 dark:bg-[#3f3f3f] rounded-full p-2">
                                                            <label htmlFor="upload-replace-img" className="cursor-pointer"><EditIcon sx={{ fontSize: 27 }} /></label>
                                                            <input onChange={hook.replaceScreenshot(i)} className="absolute pointer-events-none opacity-0 border-[3px] rounded-md" type="file" accept=".webp,.png,.jpg,.jpeg" name="" id="upload-replace-img" />
                                                        </div>
                                                        <button
                                                            className="bg-gray-200 dark:bg-[#3f3f3f] rounded-full p-2"
                                                            onClick={hook.removeScreenshot(i)}
                                                            type="button"
                                                        >
                                                            <RemoveIcon sx={{ fontSize: 27 }} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>
                            )}
                        </div>

                        {/* Diviser */}
                        <div className="h-[2px] w-full bg-slate-300 my-6" />

                        <div className="flex flex-col gap-3">
                            <div>
                                <label htmlFor="title">Title:</label>
                                <TextArea required id="title" className="w-full" value={hook.project.title || ""} placeholder="New title" onChange={v => hook.updateProjectProps("title", v)} />
                            </div>

                            <div>
                                <p>Description:</p>
                                <div className="flex items-center gap-2 mb-2">
                                    <label className="font-semibold text-sm uppercase" htmlFor="descriptionPT">pt</label>
                                    <TextArea required id="descriptionPT" className="w-full" value={hook.project.description?.PT || ""} placeholder="New description (PT)" onChange={value => hook.updateDescription("PT", value)} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="font-semibold text-sm uppercase" htmlFor="descriptionEN">en</label>
                                    <TextArea required id="descriptionEN" className="w-full" value={hook.project.description?.EN || ""} placeholder="New description (EN)" onChange={value => hook.updateDescription("EN", value)} />
                                </div>
                            </div>

                            {[
                                { id: "deployUrl", label: "Deploy URL" },
                                { id: "repositoryUrl", label: "Repository URL" },
                                { id: "videoUrl", label: "Video Demo URL" },
                            ].map(obj => (
                                <div key={obj.id}>
                                    <label htmlFor={obj.id}>{obj.label}:</label>
                                    <input id={obj.id} className="shadow-lg bg-[#444444] p-2 rounded-md outline-blue-500 autofill:none resize-none overflow-hidden w-full" value={hook.project?.[obj.id as keyof typeof hook.project] as string || ""} placeholder={`New ${obj.label}`} onChange={e => hook.updateProjectProps(obj.id as keyof typeof hook.project, e.currentTarget.value || "")} />
                                </div>
                            ))}

                            <div>
                                <label htmlFor="technologies">Technologies:</label>

                                {/* Technologie list */}
                                {
                                    hook.project.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-1">
                                            {hook.project.technologies.map(tech => (
                                                <p onClick={() => {
                                                    const technologies = (hook.project.technologies || []).filter((t, i) => t !== tech)
                                                    hook.setProject(prev => ({ ...prev, technologies }))
                                                }} className="bg-gray-800 p-2 rounded-xl hover:bg-red-400 select-none" key={tech}>{tech}</p>
                                            ))}
                                        </div>
                                    )
                                }

                                <div className="relative w-full">
                                    <span ref={hook.wordSufixSpanRef} style={{ opacity: hook.trieSufix !== undefined ? 1 : 0 }} className="absolute inset-y-0 pointer-events-none py-2 text-gray-400" >
                                        {hook.trieSufix}<span className="ml-1 border rounded-sm py-[2px] px-1 border-gray-400 text-sm font-semibold">Tab</span>
                                    </span>
                                    <input
                                        ref={hook.techInputRef}
                                        autoComplete="off"
                                        id="technologies"
                                        className="shadow-lg bg-[#444444] p-2 rounded-md outline-blue-500 resize-none overflow-hidden w-full"
                                        value={hook.technologieValue}
                                        placeholder="New technologie"
                                        onKeyDown={e => {
                                            if (e.code === "Tab") {
                                                const technologies = hook.project.technologies || []

                                                if (hook.trieSufix !== undefined) {
                                                    const newValue = hook.technologieValue + hook.trieSufix
                                                    if (technologies.includes(newValue)) return
                                                    hook.setProject(prev => ({ ...prev, technologies: [...technologies, newValue.toLowerCase()] }))
                                                    hook.setTechnologieValue("")
                                                    hook.setTrieSufix(undefined)
                                                    e.preventDefault()
                                                }
                                            }
                                        }}
                                        onChange={e => {
                                            const value = e.currentTarget.value; // value.length <= 20 ? value : 
                                            if (value.length <= 20) hook.setTechnologieValue(e.currentTarget.value)
                                        }}
                                    />
                                </div>
                            </div>

                            <button style={{ backgroundColor: themeColor.color }} disabled={hook.isSubmitting} type="submit" className="hover:brightness-105 duration-250 font-semibold p-2 rounded-md mt-4">
                                {props.project ? hook.isSubmitting ? "Updating..." : "Update" : hook.isSubmitting ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </form>

                </div>


            </ModalContainer>
            {hook.onReorderScreenshots && createPortal(
                <ReordableModal
                    onSubmit={hook.reorderScreenshots}
                    items={hook.projectScreenshots.map(({ name }, index) => ({ id: String(index), value: name }))}
                    onClose={() => hook.setOnReorderScreenshots(false)}>
                    {
                        (item, index) => (
                            <div
                                key={item.id}
                                className="flex justify-between p-2 items-center"
                            >
                                <p className="truncate">{item.value}</p>
                                <Image
                                    width={300} height={113}
                                    className="rounded-md w-auto h-[70px]"
                                    alt="screeshot"
                                    src={hook.projectScreenshotUrls[Number(item.id)]}
                                />
                            </div>
                        )
                    }

                </ReordableModal>
                , document.body
            )}
        </>
    )
}