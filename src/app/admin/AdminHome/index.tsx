"use client"
import React from "react"
import { auth } from "@/configs/firebaseConfig"
import AdminProjectCard from "./AdminProjectCard"
import Skeleton from '@mui/material/Skeleton';
import { createPortal } from "react-dom"
import useAdminHome, { AdminHomeProps } from "./useAdminHome"
import ReordableModal from "./ReordableModal";
import { ThemeProvider } from "@/contexts/ThemeColor";
import Button from "./Button";
import AddIcon from '@mui/icons-material/Add';
import ReorderIcon from '@mui/icons-material/Reorder';
import AdminProjectsProvider from "@/contexts/AdminProjectsContext";
import { twMerge } from "tailwind-merge";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useTheme } from "@/hooks/UseTheme";
import CreateUpdateProjectModal from "./CreateUpdateProjectModal";
import TechnologiesArea from "./TechnologiesArea";
import CvArea from "./CvArea";

export default function AdminHome(props: AdminHomeProps) {
    return (
        <ThemeProvider>
            <AdminProjectsProvider>
                <AdminHomeChildren {...props} />
            </AdminProjectsProvider>
        </ThemeProvider>

    )
}

const AdminHomeChildren: React.FC<AdminHomeProps> = (props) => {
    const hook = useAdminHome(props)
    const { themeColor } = useTheme();

    return (
        <div className="w-screen h-screen">
            <main className="w-full mx-auto max-w-[1400px]" >
                <div className="rounded-md p-3 text-center my-3 bg-gray-200 dark:bg-[#3f3f3f]">
                    <span className="font-semibold">Admin:</span> <span>{auth.currentUser?.email}</span>
                </div>

                <div className="w-full p-4">
                    <div className="mb-2 flex gap-2">
                        {
                            (() => {
                                const counts: [number, number, number] = [0, 0, 0]
                                const projectCount = hook.projects.length

                                hook.projects.forEach(p => {
                                    if (p.deployUrl) counts[0]++
                                    if (p.videoUrl) counts[1]++
                                    if (p.repositoryUrl) counts[2]++
                                })

                                return ([[counts[0], "Deploy", LinkIcon], [counts[1], "Video", PlayCircleFilledIcon], [counts[2], "Repository", GitHubIcon],] as const).map(([count, name, Icon], i) => (
                                    <div key={i} className={twMerge("p-4 grow rounded-md text-gray-600x font-semibold text-center relative", count === 0 ? "bg-green-500" : count === projectCount ? "bg-red-500" : "bg-yellow-500")}>

                                        <h3 className="text-3xl">{projectCount - count} / {projectCount}</h3>
                                        <p><Icon className="-translate-y-[2px] mr-2" />Without {name} Url</p>
                                    </div>
                                ))
                            })()
                        }
                    </div>

                    <div style={{ backgroundColor: themeColor.color }} className="h-[2px] my-6"></div>

                    <div className="flex gap-2">
                        <Button onClick={() => hook.setOnCreateProject(true)}>
                            <AddIcon />
                        </Button>
                        <Button onClick={() => hook.setOnReorderProject(true)}>
                            <ReorderIcon />
                        </Button>
                    </div>
                    <div className="py-3 w-auto flex flex-row overflow-x-auto gap-4 justify-centers">
                        {hook.projects.length > 0 ? hook.projects.map(p => (
                            <AdminProjectCard key={p.id} {...p} />
                        )) : <CardSkeleton amount={5} />}
                    </div>

                    <div style={{ backgroundColor: themeColor.color }} className="h-[2px] my-6"></div>

                    <form action="">
                        <input placeholder="" type="text" />
                    </form>

                </div>

                <TechnologiesArea />
                
                <CvArea />
            </main>

            {hook.onCreateProject && createPortal(
                <CreateUpdateProjectModal projectIndex={hook.projects.length} onClose={() => hook.setOnCreateProject(false)} />, document.body
            )}

            {hook.onReorderProject && createPortal(
                <ReordableModal
                    onSubmit={hook.reorderedProjects}
                    items={hook.projects.map(({ title, id }) => ({ id, value: title }))}
                    onClose={() => hook.setOnReorderProject(false)}>
                    {(item, index) => (<div key={item.id} className="p-2">{index} - {item.value}</div>)}

                </ReordableModal>
                , document.body
            )}
        </div>
    )
}

const CardSkeleton: React.FC<{ amount: number }> = (props) => (
    <>
        {Array(props.amount).fill(undefined).map((_, i) => (
            <div key={i} className="relative w-[300px] h-96 shadow-lg bg-gray-200 dark:bg-[#3f3f3f] shrink-0 grow-0 rounded-md flex flex-col overflow-hidden">

                <Skeleton variant="rectangular" width={300} height={280} />
                <div className="flex flex-col h-full p-2 gap-2">
                    <Skeleton width="60%" />
                    <Skeleton />
                    <Skeleton width="50%" />
                    <div className="grow" />
                    <Skeleton width="70%" />
                    <Skeleton width="70%" />
                </div>

            </div>
        ))}
    </>
)