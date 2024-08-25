"use client"
import { ProjectType } from "@/types";
import Image from "next/image";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import React from "react";
import { createPortal } from "react-dom";
import ProjectCardHover from "./ProjectCardHover"
import useAdminProjectCard from "./useAdminProjectCard";
import CreateUpdateProjectModal from "../CreateUpdateProjectModal";
import { useTheme } from "@/hooks/UseTheme";

const DateParagraph: React.FC<{label: string, isoDate: string}> = ({label, isoDate}) => <p className="text-sm font-semibold">{label} - {new Date(isoDate).toLocaleString()} </p>

export default function AdminProjectCard(props: ProjectType) {
    const hook = useAdminProjectCard(props)
    const { themeColor } = useTheme()

    return (
        <>
            <div className="relative w-[300px] h-96 shadow-lg bg-gray-200 dark:bg-[#3f3f3f] shrink-0 grow-0 rounded-md flex flex-col overflow-hidden select-none"
                onMouseOver={() => hook.setCardHover(true)}
                onMouseLeave={() => hook.setCardHover(false)}
            >
                <ProjectCardHover show={hook.cardHover} editFunc={hook.openEditModal} removeFunc={hook.removeProject} />

                <div className="w-[300px] h-[310px] overflow-hidden flex flex-nowrap text-center relative" >
                    <Image width={300} height={113} src={props.screenshots[0].url} className="rounded-b-md size-full object-cover" alt="project screenshot" />
                    {
                        props.screenshots.length > 1 && (
                            <div className="absolute right-3 bottom-3 rounded-full p-[6px] shadow-md" style={{ backgroundColor: themeColor.color }}>
                                <p className="text-sm font-semibold">
                                    +{props.screenshots.length - 1}
                                </p>
                            </div>
                        )
                    }

                </div>

                <div className="p-2 flex flex-col gap-2 h-full">
                    <h2 className="truncate text-lg font-semibold">{props.title}</h2>

                    <p className="truncate">
                        {props.description.EN}
                    </p>

                    <div className="flex flex-row gap-2">
                        {props.deployUrl && (<LinkIcon />)}
                        {props.repositoryUrl && (<GitHubIcon />)}
                        {props.videoUrl && (<PlayCircleFilledIcon />)}
                    </div>

                    {/* Diviser */}
                    <div className="bg-gray-200 w-full h-[2px] my-2" />

                    <div className="grow flex flex-wrap gap-2">
                        {hook.techSrcList.map((src, i) => (
                            <Image height={20} width={20} key={i} className="w-[20px] h-[20px]" src={src} alt="technologie icon" />
                        ))}
                    </div>

                    <div>
                        {props.createdAt && (<DateParagraph label="Created at" isoDate={props.createdAt} />)}
                        {props.updatedAt && (<DateParagraph label="Updated at" isoDate={props.updatedAt} />)}
                    </div>
                </div>

            </div>

            {hook.onUpdateProject && createPortal(
                <CreateUpdateProjectModal project={{ ...props }} onClose={() => hook.setOnUpdateProject(false)} />, document.body
            )}
        </>
    )
}