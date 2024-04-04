import { db } from "@/configs/firebaseConfig"
import { ProjectAdminType, TechIcons } from "@/types"
import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, getStorage, ref } from "firebase/storage"
import React from "react"

export default function useAdminProjectCard(props: ProjectAdminType) {
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

    return ({
        sliderRef,
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