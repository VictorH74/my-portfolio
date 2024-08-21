/* eslint-disable react-hooks/exhaustive-deps */
import { db } from "@/configs/firebaseConfig";
import { ProjectType, TechIcons } from "@/types";
import { collection, doc, onSnapshot, orderBy, query, writeBatch } from "firebase/firestore";
import React from "react";
import { OutputReordableItemType, ReordableItemType } from "./ReordableModal";
import useAdminProjects from "@/hooks/useAdminProjects";

export interface AdminHomeProps {
    techs: TechIcons[] | undefined
}

export default function useAdminHome(props: AdminHomeProps) {
    const [onCreateProject, setOnCreateProject] = React.useState(false)
    const [onReorderProject, setOnReorderProject] = React.useState(false)
    const { projects } = useAdminProjects()

    React.useEffect(() => {
        if (props.techs)
            localStorage.setItem("techs", JSON.stringify(props.techs))
    }, [])

    const reorderedProjects = async (items: OutputReordableItemType[]) => {
        const batch = writeBatch(db);

        items.forEach((item, currentIndex) => {
            if (currentIndex !== item.prevIndex) {
                const reorderedProjectId = projects[item.prevIndex].id
                const docRef = doc(db, "projects", reorderedProjectId);
                batch.update(docRef, { "index": currentIndex });
            }
        })

        await batch.commit()
    }

    return ({
        projects,
        onCreateProject,
        setOnCreateProject,
        onReorderProject,
        setOnReorderProject,
        reorderedProjects,
    })
}