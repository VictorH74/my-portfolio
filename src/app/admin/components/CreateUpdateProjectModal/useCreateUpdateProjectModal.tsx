/* eslint-disable react-hooks/exhaustive-deps */
import { db } from "@/configs/firebaseConfig";
import { ProjectAdminType, ProjectScreenshotType, TechIcons } from "@/types";
import { Trie } from "@/utils/trie";
import { addDoc, collection, doc, getDoc, getDocs, increment, runTransaction, updateDoc, writeBatch } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useRef } from "react";

export interface CreateUpdateProjectModalProps {
    project?: ProjectAdminType;
    projectIndex?: number;
    onClose(): void;

}

export default function useCreateUpdateProjectModal(props: CreateUpdateProjectModalProps) {
    const [project, setProject] = React.useState<Omit<ProjectAdminType, "id" | "index"> & { id?: string }>({ description: { EN: "", PT: "" }, screenshots: [], technologies: [], title: "" });
    const [technologieValue, setTechnologieValue] = React.useState("")
    const [onRemoveScreenshotNames, setOnRemoveScreenshotNames] = React.useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [projectScreenshots, setProjectScreenshots] = React.useState<Array<ProjectScreenshotType | File>>([])
    const [trieSufix, setTrieSufix] = React.useState<string>()
    const trieRef = React.useRef(new Trie())
    const techInputRef = useRef<HTMLInputElement>(null)
    const wordSufixSpanRef = useRef<HTMLSpanElement>(null)

    React.useEffect(() => {
        if (props.project) {
            setProjectScreenshots([...props.project.screenshots])
            setProject({ ...props.project })
        }

        const techstr = localStorage.getItem("techs")
        if (!techstr) return;
        const techNames = (JSON.parse(techstr) as TechIcons[]).map((t) => t.id)
        trieRef.current.insert(techNames)
    }, [])

    React.useEffect(() => {
        if (!technologieValue) {
            setTrieSufix(undefined)
            return;
        }

        const currenValue = technologieValue.toLowerCase()
        const trieResult = trieRef.current?.findFirstByPrefix(currenValue)
        setTrieSufix(!(project.technologies || []).includes(technologieValue + trieResult) ? trieResult : undefined)

        updateWordSufixSpanPosition()
    }, [technologieValue])

    const updateWordSufixSpanPosition = () => {
        if (!techInputRef.current || !wordSufixSpanRef.current) return

        const tempSpan = document.createElement('span');
        tempSpan.style.font = window.getComputedStyle(techInputRef.current).font;
        tempSpan.textContent = techInputRef.current.value;
        document.body.appendChild(tempSpan);

        const textWidth = tempSpan.getBoundingClientRect().width;
        wordSufixSpanRef.current.style.left = textWidth + 8 + "px"

        document.body.removeChild(tempSpan);
    }

    const updateProjectProps = (prop: keyof ProjectAdminType, value: string) => setProject(prev => ({ ...prev, [prop]: value }))

    const updateDescription = (lang: "PT" | "EN", value: string) => {
        const prevDesc = project?.description!
        setProject(prev => ({ ...prev, description: { ...prevDesc, [lang]: value } }))
    }

    const uploadScreenshots = async () => {
        let tempScreenshots = [...projectScreenshots]

        const promises: Promise<void>[] = []
        projectScreenshots.forEach(async (img, i) => {
            if (img instanceof File) {
                promises.push(new Promise(async (res, rej) => {
                    const storage = getStorage();
                    const storageRef = ref(storage, `project-images/${img.name}`);

                    try {
                        const snap = await uploadBytes(storageRef, img)
                        const url = await getDownloadURL(snap.ref)
                        tempScreenshots[i] = { url, name: snap.metadata.name }
                    } catch (e) {
                        rej(e)
                    }
                    res()
                }))
            }
        })

        await Promise.all(promises)
        return tempScreenshots
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        const files = fileInput.files
        if (files) setProjectScreenshots(prev => [...prev, ...Array.from(files)])
    };

    // TODO: validade url props
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        const { screenshots, ...rest } = project
        const { project: propProject } = props;

        try {
            // Update project data if it has passed as prop. Else, create project
            if (propProject) {
                const updatedData: Record<string, object | string> = {}
                Object.entries(rest).forEach(([k, v]) => {
                    if (typeof v === "string") {
                        const value = rest[k as keyof typeof rest]
                        if (value !== propProject[k as keyof ProjectAdminType]) updatedData[k] = v
                    } else if (typeof v !== "number") ({
                        description: () => {
                            if (Object.values(rest.description).join("") !== Object.values(propProject.description).join(""))
                                updatedData[k] = v
                        },
                        technologies: () => {
                            if (rest.technologies.join("") !== propProject.technologies.join(""))
                                updatedData[k] = v
                        }
                    } as Record<string, () => void>)[k]()
                })

                // if project screenshots has changed
                if (projectScreenshots.join("") !== propProject.screenshots.join(""))
                    updatedData.screenshots = await uploadScreenshots();

                // remove deleted screenshots from storage
                onRemoveScreenshotNames.forEach((imgName) => {
                    const storage = getStorage();
                    const desertRef = ref(storage, `project-images/${imgName}`);
                    deleteObject(desertRef)
                })

                if (Object.values(updatedData).length === 0) return;
                const docRef = doc(db, "projects", propProject.id)

                await updateDoc(docRef, { ...updatedData, updatedAt: new Date().toISOString() })
            } else {
                const { title, description, technologies } = project;

                // Check empty values
                const { EN, PT } = description
                if (!title || !EN || !PT || technologies.length === 0 || projectScreenshots.length === 0) {
                    alert("Required data: Title, Description, Technologies and Must contain at least one screenshot");
                    return;
                };
                const screenshots = await uploadScreenshots()

                const collectionSizeRef = doc(db, "counts", "projects")

                await runTransaction(db, async (transaction) => {
                    const collectionCount = await transaction.get(collectionSizeRef)
                    if (!collectionCount.exists()) {
                        throw "Document does not exist!";
                    }

                    const collectionSize = collectionCount.data().total as number

                    await addDoc(collection(db, "projects"), { ...project, index: collectionSize, screenshots, createdAt: new Date().toISOString() });
                    transaction.update(collectionSizeRef, {total: collectionSize + 1})
                })
            }
            props.onClose();
        } catch (e) {
            console.error(e)
            alert("Error")
        } finally {
            setIsSubmitting(false)
        }
    }

    return ({
        handleSubmit,
        projectScreenshots,
        handleSelectChange,
        setProjectScreenshots,
        setOnRemoveScreenshotNames,
        updateProjectProps,
        updateDescription,
        project,
        setProject,
        wordSufixSpanRef,
        trieSufix,
        techInputRef,
        setTechnologieValue,
        technologieValue,
        setTrieSufix,
        isSubmitting,
    })
}