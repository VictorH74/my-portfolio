/* eslint-disable react-hooks/exhaustive-deps */
import { db } from "@/configs/firebaseConfig";
import { ProjectAdminType, TechIcons } from "@/types";
import { collection, doc, onSnapshot, orderBy, query, writeBatch } from "firebase/firestore";
import React from "react";
import { ReordableItemType } from "../components/ReordableModal";

export interface AdminHomeProps {
    techs: TechIcons[] | undefined
}

export default function useAdminHome(props: AdminHomeProps) {
    const [projects, setProjects] = React.useState<ProjectAdminType[]>([])
    const [onCreateProject, setOnCreateProject] = React.useState(false)
    const [onReorderProject, setOnReorderProject] = React.useState(false)

    React.useEffect(() => {
        if (props.techs)
            localStorage.setItem("techs", JSON.stringify(props.techs))

        const docsRef = collection(db, "projects")
        const q = query(docsRef, orderBy("index", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            
            const retrivedProjects: ProjectAdminType[] = [];
            snapshot.forEach((doc) => {
                retrivedProjects.push({...doc.data(), id: doc.id} as ProjectAdminType);
            });
            setProjects(retrivedProjects)
           
            // snapshot.docChanges().forEach((change) => {
            //     const projectData = { ...change.doc.data(), id: change.doc.id } as ProjectAdminType
            //     ({
            //         "added": () => {
            //             setProjects(prev => [
            //                 ...prev, projectData
            //             ]);
            //         },
            //         "modified": () => {
            //             setProjects(prev => prev.map(p => p.id === projectData.id ? projectData : p)
            //             );
            //         },
            //         "removed": () => {
            //             setProjects(prev => prev.filter(p => p.id !== projectData.id)
            //             );
            //         },
            //     })[change.type]();
            // });
        });

        return () => { unsubscribe() }
    }, [])

    const reorderedProjects = async (items: ReordableItemType[]) => {
        const itemsObj: Record<string, { value: string, currentIndex: number }> = {}

        for (let currentIndex = 0; currentIndex < items.length; currentIndex++) {
            const { id, value } = items[currentIndex]
            itemsObj[id] = { value, currentIndex }
        }

        // console.log(itemsObj)

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
        setProjects,
        onCreateProject,
        setOnCreateProject,
        onReorderProject,
        setOnReorderProject,
        reorderedProjects,
    })
}