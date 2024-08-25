/* eslint-disable react-hooks/exhaustive-deps */
import { db } from "@/configs/firebaseConfig"
import useAdminProjects from "@/hooks/useAdminProjects"
import { ProjectType, TechIcons } from "@/types"
import { doc, runTransaction } from "firebase/firestore"
import { deleteObject, getStorage, ref } from "firebase/storage"
import React from "react"

export default function useAdminProjectCard(props: ProjectType) {
    const [cardHover, setCardHover] = React.useState(false)
    const [onUpdateProject, setOnUpdateProject] = React.useState(false)
    const [techSrcList, setTechSrcList] = React.useState<string[]>([])
    const { projects } = useAdminProjects()

    React.useEffect(() => {
        const techstr = localStorage.getItem("techs")
        if (techstr) {
            const techObj: Record<string, string> = {};
            (JSON.parse(techstr) as TechIcons[]).forEach(t => {
                techObj[t.id] = t.src;
            })
            setTechSrcList(props.technologies.map(tid => techObj[tid]))
        };
    }, [])

    const openEditModal = () => setOnUpdateProject(true)

    const removeProject = async () => {
        try {
            const docRef = doc(db, "projects", props.id)
            const collectionCountRef = doc(db, "counts", "projects")
            await runTransaction(db, async (transaction) => {
                const collectionCount = await transaction.get(collectionCountRef)
                if (!collectionCount.exists()) {
                    throw "Document does not exist!";
                }

                const total = collectionCount.data().total as number - 1

                const storage = getStorage();
                props.screenshots.forEach(onRemoveScreenshot => {
                    const screenshotRef = ref(storage,
                        `project-images/${onRemoveScreenshot.name}`
                    );
                    deleteObject(screenshotRef)
                })

                for (let currentIndex = props.index; currentIndex < total; currentIndex++) {
                    const { id, index } = projects[currentIndex + 1]
                    if (index !== currentIndex + 1) throw new Error(`Project index is incorrect. index: ${index}, currentIndex: ${currentIndex}`)
                    const currentProjectRef = doc(db, "projects", id)
                    transaction.update(currentProjectRef, { index: currentIndex })
                }

                transaction.delete(docRef)

                transaction.update(collectionCountRef, { total })
            })
        } catch (e) {
            console.log(e)
            alert("Error")
        }
    }

    return ({
        cardHover,
        setCardHover,
        onUpdateProject,
        setOnUpdateProject,
        techSrcList,
        setTechSrcList,
        openEditModal,
        removeProject
    })
}