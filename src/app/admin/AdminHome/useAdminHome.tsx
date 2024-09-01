/* eslint-disable react-hooks/exhaustive-deps */
import { db } from "@/configs/firebaseConfig";
import { doc, writeBatch } from "firebase/firestore";
import React from "react";
import { OutputReordableItemType } from "./ReordableModal";
import useAdminProjects from "@/hooks/useAdminProjects";

export default function useAdminHome() {
    const [onCreateProject, setOnCreateProject] = React.useState(false)
    const [onReorderProject, setOnReorderProject] = React.useState(false)
    const { projects } = useAdminProjects()

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