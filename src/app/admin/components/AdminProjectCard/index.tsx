"use client"
import { ProjectAdminType, TechIcons } from "@/types";
import Image from "next/image";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import React from "react";
import { createPortal } from "react-dom";
import ProjectCardHover from "./components/ProjectCardHover"
import { CreateUpdateProjectModal } from "../modals";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/configs/firebaseConfig";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function AdminProjectCard(props: ProjectAdminType) {
    const sliderRef = React.useRef<HTMLDivElement>(null)
    const [cardHover, setCardHover] = React.useState(false)
    const [onUpdateProject, setOnUpdateProject] = React.useState(false)
    const [techSrcList, setTechSrcList] = React.useState<string[]>([])

    React.useEffect(() => {
        const techstr = localStorage.getItem("techs")
        if (techstr) {
            const techObj: Record<string, string> = {};
            (JSON.parse(techstr) as TechIcons[]).forEach(t => {
                techObj[t.id] = t.src;
            })

            setTechSrcList(props.technologies.map(tid => techObj[tid]))
        };

        if (sliderRef.current) {
            const slider = sliderRef.current

            setTimeout(function moveSlide() {
                const max = slider.scrollWidth - slider.clientWidth;
                const left = slider.clientWidth;

                if (max === slider.scrollLeft)
                    slider.scrollTo({ left: 0, behavior: 'smooth' })
                else
                    slider.scrollBy({ left, behavior: 'smooth' })

                setTimeout(moveSlide, 2000)
            }, 2000)

        }
    }, [])

    const openEditModal = () => setOnUpdateProject(true)

    const removeProject = async () => {
        const docRef = doc(db, "projects", props.id)
        try {
            const onRemoveScreenshots = props.screenshots;
            onRemoveScreenshots.forEach(s => {
                const storage = getStorage();
                const desertRef = ref(storage, `project-images/${s.name}`);
                deleteObject(desertRef)
            })
            await deleteDoc(docRef)
        } catch (e) {
            console.log(e)
            alert("Error")
        }
    }

    return (
        <>
            <div className="relative w-[300px] h-96 shadow-lg bg-gray-200 dark:bg-[#3f3f3f] shrink-0 grow-0 rounded-md flex flex-col overflow-hidden"
                onMouseOver={() => setCardHover(true)}
                onMouseLeave={() => setCardHover(false)}
            >
                <ProjectCardHover show={cardHover} editFunc={openEditModal} removeFunc={removeProject} />

                <div ref={sliderRef} className="w-[300px] h-[310px] overflow-hidden flex flex-nowrap text-center" id="slider">
                    {
                        props.screenshots.map((img, i) => (
                            <div key={i} className="space-y-4 flex-none w-full flex flex-col items-center justify-center">
                                <Image width={300} height={113} src={img.url} className="rounded-b-md h-full w-auto" alt="project screenshot" />
                            </div>
                        ))
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
                        {techSrcList.map((src, i) => (
                            <Image height={20} width={20} key={i} className="w-[20px] h-[20px]" src={src} alt="technologie icon" />
                        ))}
                    </div>
                    {props.createdAt && (<p className="text-sm font-semibold">Created at: {props.createdAt} </p>)}
                    {props.updatedAt && (<p className="text-sm font-semibold">Updated at: {props.updatedAt} </p>)}
                </div>

            </div>

            {onUpdateProject && createPortal(
                <CreateUpdateProjectModal project={{ ...props }} onClose={() => setOnUpdateProject(false)} />, document.body
            )}
        </>
    )
}