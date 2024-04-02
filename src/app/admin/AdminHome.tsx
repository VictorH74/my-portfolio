"use client"

import React from "react"
import { auth, db } from "@/configs/firebaseConfig"
import { ProjectAdminType, TechIcons } from "@/types"
import AdminProjectCard from "./components/AdminProjectCard"
import { collection, onSnapshot } from "firebase/firestore"
import Skeleton from '@mui/material/Skeleton';

interface AdminHomeProps {
    techs: TechIcons[] | undefined
}

export default function AdminHome(props: AdminHomeProps) {
    const [projects, setProjects] = React.useState<ProjectAdminType[]>([])

    React.useEffect(() => {
        if (props.techs)
            localStorage.setItem("techs", JSON.stringify(props.techs))

        const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const projectData = { ...change.doc.data(), id: change.doc.id } as ProjectAdminType

                if (change.type === "added") {
                    setProjects(prev => [
                        ...prev, projectData
                    ])
                }
                if (change.type === "modified") {
                    setProjects(prev =>
                        prev.map(p => p.id === projectData.id ? projectData : p)
                    )
                }
                if (change.type === "removed") {
                    setProjects(prev =>
                        prev.filter(p => p.id !== projectData.id)
                    )
                }
            });
        });

        return () => { unsubscribe() }
    }, [])

    // TODO: Display icons: View and Remove when hover project
    // TODO: 

    return (
        <div className="w-screen h-screen">
            <main className="w-full mx-auto max-w-[1400px]" >
                <div className="rounded-md p-3 text-center my-3 bg-gray-200 dark:bg-[#3f3f3f]">
                    Admin: <span>{auth.currentUser?.email}</span>
                </div>

                <div className="w-full p-4 border-2x border-red-300">
                    <div className="border-2">
                        Projects
                        <span><button>Criar</button></span>
                    </div>
                    <div className="py-3 w-full flex flex-row overflow-x-auto gap-4 border-2 border-purple-300">
                        {projects.length > 0 ? projects.map(p => (
                            <AdminProjectCard key={p.id} {...p} />
                        )) : <CardSkeleton amount={5} />}
                    </div>
                </div>
            </main>

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