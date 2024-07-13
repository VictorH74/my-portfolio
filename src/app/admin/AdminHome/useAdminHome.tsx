/* eslint-disable react-hooks/exhaustive-deps */
import { db } from "@/configs/firebaseConfig";
import { ProjectType, TechIcons } from "@/types";
import { collection, doc, onSnapshot, orderBy, query, writeBatch } from "firebase/firestore";
import React from "react";
import { ReordableItemType } from "./ReordableModal";
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

    const reorderedProjects = async (items: ReordableItemType[]) => {
        const itemsObj: Record<string, { value: string, currentIndex: number }> = {}

        for (let currentIndex = 0; currentIndex < items.length; currentIndex++) {
            const { id, value } = items[currentIndex]
            itemsObj[id] = { value, currentIndex }
        }

        const batch = writeBatch(db);

        projects.forEach(p => {
            if (itemsObj[p.id].currentIndex !== p.index) {
                const docRef = doc(db, "projects", p.id);
                batch.update(docRef, { "index": itemsObj[p.id].currentIndex });
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