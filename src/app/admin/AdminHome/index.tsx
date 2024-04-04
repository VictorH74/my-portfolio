"use client"
import React from "react"
import { auth } from "@/configs/firebaseConfig"
import AdminProjectCard from "../components/AdminProjectCard"
import Skeleton from '@mui/material/Skeleton';
import { createPortal } from "react-dom"
import useAdminHome, { AdminHomeProps } from "./useAdminHome"
import CreateUpdateProjectModal from "../components/CreateUpdateProjectModal";
import ReordableModal from "../components/ReordableModal";

export default function AdminHome(props: AdminHomeProps) {
    const hook = useAdminHome(props)

    return (
        <div className="w-screen h-screen">
            <main className="w-full mx-auto max-w-[1400px]" >
                <div className="rounded-md p-3 text-center my-3 bg-gray-200 dark:bg-[#3f3f3f]">
                    <span className="font-semibold">Admin:</span> <span>{auth.currentUser?.email}</span>
                </div>

                <div className="w-full p-4">
                    <div className="">
                        <span><button className="p-2 bg-green-300 rounded-md text-gray-600 font-semibold mx-2" onClick={() => hook.setOnCreateProject(true)}>Criar</button></span>
                        <span><button className="p-2 bg-green-300 rounded-md text-gray-600 font-semibold " onClick={() => hook.setOnReorderProject(true)}>Reorder</button></span>
                    </div>
                    <div className="py-3 w-auto flex flex-row overflow-x-auto gap-4 justify-centers">
                        {hook.projects.length > 0 ? hook.projects.map(p => (
                            <AdminProjectCard key={p.id} {...p} />
                        )) : <CardSkeleton amount={5} />}
                    </div>
                </div>
            </main>

            {hook.onCreateProject && createPortal(
                <CreateUpdateProjectModal projectIndex={hook.projects.length} onClose={() => hook.setOnCreateProject(false)} />, document.body
            )}

            {hook.onReorderProject && createPortal(
                <ReordableModal onSubmit={hook.reorderedProjects} items={hook.projects.map(({ title, id }) => ({ id, value: title }))} onClose={() => hook.setOnReorderProject(false)} />, document.body
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