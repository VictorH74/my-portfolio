"use client"

import { FirebaseApi } from "@/apis/firebase.api"
import { ProjectRepository } from "@/repositories/project.repository"
import { ProjectService } from "@/services/project.service"
import React from "react"
import { auth } from "@/configs/firebaseConfig"
import { ProjectAdminType } from "@/types"
import AdminProjectCard from "./components/AdminProjectCard"
import Image from "next/image"


export default function AdminHome() {
    const [projects, setProjects] = React.useState<ProjectAdminType[]>([])
    // const sliderRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        (async () => {
            // console.log("currentUser", auth.currentUser)
            const projectRepo = new ProjectRepository(new FirebaseApi())
            const projectService = new ProjectService(projectRepo)
            const retrievedProjects = await projectService.getProducts()
            // console.log(retrievedProjects)
            setProjects(retrievedProjects)
        })()

        // if (sliderRef.current) {
        //     const slider = sliderRef.current

        //     setTimeout(function moveSlide() {
        //         const max = slider.scrollWidth - slider.clientWidth;
        //         const left = slider.clientWidth;

        //         if (max === slider.scrollLeft) {
        //             slider.scrollTo({ left: 0, behavior: 'smooth' })
        //         } else {
        //             slider.scrollBy({ left, behavior: 'smooth' })
        //         }

        //         setTimeout(moveSlide, 2000)
        //     }, 2000)

        // }
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
                        {projects.map(p => (
                            <AdminProjectCard key={p.id} {...p} />
                        ))}
                    </div>

                    {/* <div ref={sliderRef} className="w-[300px] overflow-hidden flex flex-nowrap text-center" id="slider">
                    <div className="space-y-4 flex-none w-full flex flex-col items-center justify-center">
                        <Image width={300} height={113} src="https://picsum.photos/800/450" className="rounded-b-md" alt="project screenshot" />
                    </div>
                    <div className="space-y-4 flex-none w-full flex flex-col items-center justify-center">
                        <Image width={300} height={113} src="https://picsum.photos/800/450" className="rounded-b-md" alt="project screenshot" />
                    </div>
                    <div className="space-y-4 flex-none w-full flex flex-col items-center justify-center">
                        <Image width={300} height={113} src="https://picsum.photos/800/450" className="rounded-b-md" alt="project screenshot" />
                    </div>
                </div> */}

                </div>
                {/* <div className="absolute inset-0 bg-black/60" id="dialog-portal"></div> */}
            </main>

        </div>
    )
}