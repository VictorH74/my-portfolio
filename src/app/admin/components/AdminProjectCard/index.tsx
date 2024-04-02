"use client"
import { ProjectAdminType } from "@/types";
import Image from "next/image";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import React from "react";
import { createPortal } from "react-dom";
import ProjectCardHover from "./components/ProjectCardHover"
import { EditProjectModal } from "../modals";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/configs/firebaseConfig";

export default function AdminProjectCard(props: ProjectAdminType) {
    const sliderRef = React.useRef<HTMLDivElement>(null)
    const [cardHover, setCardHover] = React.useState(false)
    const [editable, setEditable] = React.useState(false)

    React.useEffect(() => {
        console.log(props.screenshots)
        if (sliderRef.current) {
            const slider = sliderRef.current

            setTimeout(function moveSlide() {
                const max = slider.scrollWidth - slider.clientWidth;
                const left = slider.clientWidth;

                if (max === slider.scrollLeft) {
                    slider.scrollTo({ left: 0, behavior: 'smooth' })
                } else {
                    slider.scrollBy({ left, behavior: 'smooth' })
                }

                setTimeout(moveSlide, 2000)
            }, 2000)

        }
    }, [])

    const openEditModal = () => setEditable(true)

    const removeProject = async () => {
        const ref = doc(db, "projects", props.id)
        try {
            await deleteDoc(ref)
        } catch (e) {
            console.log(e)
            alert("Error")
        }
    }

    return (
        <>
            <div className="relative w-[300px] h-96 shadow-lg bg-gray-200 dark:bg-[#3f3f3f] shrink-0 grow-0 rounded-md flex flex-col overflow-hidden"
                onMouseOver={() => {
                    setCardHover(true)
                }}
                onMouseLeave={() => {
                    setCardHover(false)
                }}
            >
                <ProjectCardHover show={cardHover} editFunc={openEditModal} removeFunc={removeProject} />

                <div ref={sliderRef} className="w-[300px] h-[310px] overflow-hidden flex flex-nowrap text-center" id="slider">
                    {
                        props.screenshots.map((img, i) => (
                            <div key={i} className="space-y-4 flex-none w-full flex flex-col items-center justify-center">
                                <Image width={300} height={113} src={img} className="rounded-b-md h-auto w-auto" alt="project screenshot" />
                            </div>
                        ))
                    }
                </div>


                <div className="p-2 flex flex-col gap-2 h-full">

                    <h2 className="truncate text-lg font-semibold">{props.title}</h2>

                    <p className="truncate">
                        {props.description.EN}
                    </p>

                    <div className="flex flex-row gap-2 grow">
                        {
                            props.deployUrl && (<LinkIcon />)}
                        {
                            props.repositoryUrl &&
                            (<GitHubIcon />)
                        }
                        {
                            props.videoUrl && (<PlayCircleFilledIcon />)
                        }
                    </div>
                    <p>Created at: - </p>
                    <p>Updated at: - </p>

                </div>

            </div>

            {editable && createPortal(
                <EditProjectModal {...props} onClose={() => setEditable(false)} />, document.body
            )}
        </>
    )
}