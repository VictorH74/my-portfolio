/* eslint-disable react-hooks/exhaustive-deps */
import { ProjectAdminType, ProjectScreenshotType, TechIcons } from "@/types"
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import React, { FormEvent, useRef } from "react";
import TextArea from "@/components/TextArea";
import { doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { db } from "@/configs/firebaseConfig";
import { Trie } from "@/utils/trie";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { twMerge } from "tailwind-merge";

const ModalContainer: React.FC<{ children: React.ReactElement }> = ({ children }) => (<div className="absolute inset-0 bg-black/70 grid place-items-center">
    {children}
</div>)

interface CreateUpdateProjectModalProps {
    project?: ProjectAdminType;
    onClose(): void
}

export const CreateUpdateProjectModal: React.FC<CreateUpdateProjectModalProps> = (props) => {
    const [project, setProject] = React.useState<Omit<ProjectAdminType, "id"> & { id?: string }>({ description: { EN: "", PT: "" }, screenshots: [], technologies: [], title: "" });
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
    const handleSubmit = async (e: FormEvent) => {
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
                    } else ({
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

                await addDoc(collection(db, "projects"), { ...project, screenshots, createdAt: new Date().toISOString() });
            }
            props.onClose();
        } catch (e) {
            console.error(e)
            alert("Error")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <ModalContainer>
            <div className="bg-gray-200 dark:bg-[#3f3f3f] w-full max-w-[1000px] rounded-md p-3 animate-scale">
                <div className="text-right py-2">
                    <button onClick={props.onClose} ><CloseIcon /></button>
                </div>

                <form onSubmit={handleSubmit} className="">
                    <div className={twMerge("flex flex-row bg-black/20 py-2 min-h-[200px]", projectScreenshots.length > 0 ? "" : "justify-center")}>
                        <div className="flex flex-col justify-evenly px-2">
                            <div className="relative">
                                <label htmlFor="upload-img" className="px-6 cursor-pointer"><AddPhotoAlternateIcon sx={{ fontSize: 35 }} /></label>
                                <input onChange={handleSelectChange} className="absolute pointer-events-none opacity-0" type="file" accept=".webp" name="" id="upload-img" />
                            </div>
                        </div>

                        {projectScreenshots.length > 0 && (
                            <div className="flex gap-2 overflow-auto">
                                {
                                    projectScreenshots.map((img, i) => (
                                        <Image key={i} width={300} height={113} onClick={() => {
                                            setProjectScreenshots(prev => {
                                                if (props.project && !(prev[i] instanceof File) && typeof prev[i] === "object" && Object.hasOwn(prev[i], "url")) {
                                                    setOnRemoveScreenshotNames(rPrev => [...rPrev, prev[i].name])
                                                }
                                                return prev.filter((_, index) => i !== index)
                                            }
                                            )
                                        }} src={img instanceof File ? URL.createObjectURL(img) : img.url} className="rounded-md w-auto h-[183px]" alt="project screenshot" />

                                    ))
                                }
                            </div>
                        )}
                    </div>

                    {/* Diviser */}
                    <div className="h-[2px] w-full bg-slate-300 my-6" />

                    <div className="flex flex-col gap-3">
                        <div>
                            <label htmlFor="title">Title:</label>
                            <TextArea id="title" className="w-full" value={project?.title || ""} placeholder="New title" onChange={v => updateProjectProps("title", v)} />
                        </div>

                        <div>
                            <p>Description:</p>
                            <div className="flex items-center gap-2 mb-2">
                                <label className="font-semibold text-sm uppercase" htmlFor="descriptionPT">pt</label>
                                <TextArea id="descriptionPT" className="w-full" value={project?.description?.PT || ""} placeholder="New description (PT)" onChange={value => updateDescription("PT", value)} />
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="font-semibold text-sm uppercase" htmlFor="descriptionEN">en</label>
                                <TextArea id="descriptionEN" className="w-full" value={project?.description?.EN || ""} placeholder="New description (EN)" onChange={value => updateDescription("EN", value)} />
                            </div>
                        </div>

                        {[
                            { id: "deployUrl", label: "Deploy URL" },
                            { id: "repositoryUrl", label: "Repository URL" },
                            { id: "videoUrl", label: "Video Demo URL" },
                        ].map(obj => (
                            <div key={obj.id}>
                                <label htmlFor={obj.id}>{obj.label}:</label>
                                <input id={obj.id} className="shadow-lg bg-[#444444] p-2 rounded-md outline-blue-500 autofill:none resize-none overflow-hidden w-full" value={project?.[obj.id as keyof typeof project] as string || ""} placeholder={`New ${obj.label}`} onChange={e => updateProjectProps(obj.id as keyof typeof project, e.currentTarget.value || "")} />
                            </div>
                        ))}

                        <div>
                            <label htmlFor="technologies">Technologies:</label>

                            {/* Technologie list */}
                            {
                                project.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-1">
                                        {project.technologies.map(tech => (
                                            <p onClick={() => {
                                                const technologies = (project.technologies || []).filter((t, i) => t !== tech)
                                                setProject(prev => ({ ...prev, technologies }))
                                            }} className="bg-gray-800 p-2 rounded-xl hover:bg-red-400 select-none" key={tech}>{tech}</p>
                                        ))}
                                    </div>
                                )
                            }

                            <div className="relative w-full">
                                <span ref={wordSufixSpanRef} style={{ opacity: trieSufix !== undefined ? 1 : 0 }} className="absolute inset-y-0 pointer-events-none py-2 text-gray-400" >
                                    {trieSufix}<span className="ml-1 border rounded-sm py-[2px] px-1 border-gray-400 text-sm font-semibold">Tab</span>
                                </span>
                                <input
                                    ref={techInputRef}
                                    autoComplete="off"
                                    id="technologies"
                                    className="shadow-lg bg-[#444444] p-2 rounded-md outline-blue-500 resize-none overflow-hidden w-full"
                                    value={technologieValue}
                                    placeholder="New technologie"
                                    onKeyDown={e => {
                                        if (e.code === "Tab") {
                                            const technologies = project.technologies || []

                                            if (trieSufix !== undefined) {
                                                const newValue = technologieValue + trieSufix
                                                if (technologies.includes(newValue)) return
                                                setProject(prev => ({ ...prev, technologies: [...technologies, newValue.toLowerCase()] }))
                                                setTechnologieValue("")
                                                setTrieSufix(undefined)
                                                e.preventDefault()
                                            }
                                        }
                                    }}
                                    onChange={e => {
                                        const value = e.currentTarget.value; // value.length <= 20 ? value : 
                                        if (value.length <= 20) setTechnologieValue(e.currentTarget.value)
                                    }}
                                />
                            </div>
                        </div>

                        <button disabled={isSubmitting} type="submit" className="hover:brightness-105 duration-250 bg-green-300 text-gray-600 font-semibold p-2 rounded-md mt-4">
                            {props.project ? isSubmitting ? "Updating..." : "Update" : isSubmitting ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </ModalContainer>
    )
}
