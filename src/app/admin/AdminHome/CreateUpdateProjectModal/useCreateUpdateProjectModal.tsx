/* eslint-disable react-hooks/exhaustive-deps */
import { db } from "@/configs/firebaseConfig";
import { ProjectType, ProjectScreenshotType, TechIcons } from "@/types";
import { Trie } from "@/utils/trie";
import { FirebaseError } from "firebase/app";
import { addDoc, collection, doc, runTransaction, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useRef } from "react";

const UrlKeys = ["deployUrl", "repositoryUrl", "videoUrl"] as const

export interface CreateUpdateProjectModalProps {
    project?: ProjectType;
    projectIndex?: number;
    onClose(): void;

}

export default function useCreateUpdateProjectModal(props: CreateUpdateProjectModalProps) {
    const [project, setProject] = React.useState<Omit<ProjectType, "id" | "index"> & { id?: string }>({ description: { EN: "", PT: "" }, screenshots: [], technologies: [], title: "" });
    const [technologieValue, setTechnologieValue] = React.useState("")
    const [onRemoveScreenshotNames, setOnRemoveScreenshotNames] = React.useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [projectScreenshots, setProjectScreenshots] = React.useState<Array<ProjectScreenshotType | File>>([])
    const [trieSufix, setTrieSufix] = React.useState<string>()
    const trieRef = React.useRef(new Trie())
    const techInputRef = useRef<HTMLInputElement>(null)
    const wordSufixSpanRef = useRef<HTMLSpanElement>(null)
    const projectScreenshotUrls = React.useMemo<string[]>(() => projectScreenshots.map(img => img instanceof File ? URL.createObjectURL(img) : img.url), [projectScreenshots])

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

    const updateProjectProps = (prop: keyof ProjectType, value: string) => setProject(prev => ({ ...prev, [prop]: value }))

    const updateDescription = (lang: "PT" | "EN", value: string) => {
        const prevDesc = project?.description!
        setProject(prev => ({ ...prev, description: { ...prevDesc, [lang]: value } }))
    }

    const updatedCheckedProjectData = (projectRest: Omit<typeof project, 'screenshots'>) => {
        const propProject = props.project!;

        const updatedData: Record<string, object | string> = {}
        Object.entries(projectRest).forEach(([currentKey, currentValue]) => {
            if (typeof currentValue === "string") {
                const prevValue = propProject[currentKey as keyof ProjectType]
                if (currentValue !== prevValue) {
                    updatedData[currentKey] = (UrlKeys as readonly string[]).includes(currentKey) ?
                        new URL(currentValue) : updatedData[currentKey] = currentValue
                }
            } else if (typeof currentValue !== "number") ({
                description: () => {
                    if (Object.values(projectRest.description).join("") !== Object.values(propProject.description).join(""))
                        updatedData[currentKey] = currentValue
                },
                technologies: () => {
                    if (projectRest.technologies.join("") !== propProject.technologies.join(""))
                        updatedData[currentKey] = currentValue
                }
            } as Record<string, () => void>)[currentKey]()
        })

        return updatedData
    }

    const uploadScreenshots = async () => {
        let updatedScreenshots = [...projectScreenshots]
        const promises: Promise<void>[] = []

        projectScreenshots.forEach(async (img, i) => {
            if (img instanceof File) {
                promises.push(new Promise(async (resolve, reject) => {
                    const storage = getStorage();
                    const finalFileName = img.name.split(".").slice(0, -1).join(".")
                    const storageRef = ref(storage, `project-images/${finalFileName}`);
                    try {
                        const finalImg = await ((await fetch("api/images", { body: img, method: "POST" })).arrayBuffer()) 
                        const snap = await uploadBytes(storageRef, finalImg, {contentType: "image/webp"})
                        const url = await getDownloadURL(snap.ref)
                        updatedScreenshots[i] = { url, name: snap.metadata.name }
                        resolve()
                    } catch (e) {
                        reject(e)
                    }
                }))
            }
        })
        await Promise.all(promises)

        // remove deleted screenshots from storage
        if (onRemoveScreenshotNames.length > 0) {
            const updatedScreenshotNames = updatedScreenshots.map(s => s.name)
            const storage = getStorage();
            onRemoveScreenshotNames.forEach((imgName) => {
                if (!updatedScreenshotNames.includes(imgName)) {
                    const desertRef = ref(storage, `project-images/${imgName}`);
                    deleteObject(desertRef)
                }
            })
        }
        // console.log(updatedScreenshots)
        return updatedScreenshots
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        const files = fileInput.files
        if (files) setProjectScreenshots(prev => [...prev, ...Array.from(files)])
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        const { screenshots, ...rest } = project
        const propProject = props.project;

        try {
            // Update project data if it has passed as prop. Else, create project
            if (propProject) {
                const updatedData = updatedCheckedProjectData(rest)

                // if project screenshots has changed
                if (projectScreenshots.length === 0) return;
                const prevScreenshots = propProject.screenshots
                let projectScreenshotsHasChanged = false
                for (let i = 0; i < projectScreenshots.length; i++) {
                    const s = projectScreenshots[i]
                    if (s instanceof File || i >= prevScreenshots.length || s.url !== prevScreenshots[i].url) {
                        projectScreenshotsHasChanged = true
                        break;
                    }
                }

                if (projectScreenshotsHasChanged)
                    updatedData.screenshots = await uploadScreenshots();

                const notProjectDataChanged = Object.values(updatedData).length === 0;
                if (notProjectDataChanged) return;

                const docRef = doc(db, "projects", propProject.id)

                console.log({ ...updatedData, updatedAt: new Date().toISOString() })

                await updateDoc(docRef, { ...updatedData, updatedAt: new Date().toISOString() })
            } else {
                const { title, description, technologies } = project;

                UrlKeys.forEach((key) => {
                    const urlValue = project[key]
                    if (urlValue) new URL(urlValue)
                })

                // Check empty values
                const { EN, PT } = description
                if (!title || !EN || !PT || technologies.length === 0 || projectScreenshots.length === 0) {
                    alert("Required: A new project must contain at least one screenshot and technologie");
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
                    transaction.update(collectionSizeRef, { total: collectionSize + 1 })
                })
            }
            props.onClose();
        } catch (e) {
            if (e instanceof FirebaseError) {
                alert(e.message);
            }
            console.error(e)
            console.log(e instanceof FirebaseError)
            alert(e)
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
        projectScreenshotUrls,
    })
}