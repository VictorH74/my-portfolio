import { ProjectAdminType, TechIcons } from "@/types"
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import React, { FormEvent, useRef } from "react";
import AddIcon from '@mui/icons-material/Add';
import TextArea from "@/components/TextArea";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/configs/firebaseConfig";
import { Trie } from "@/utils/trie";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LandscapeIcon from '@mui/icons-material/Landscape';

const imagespath = "https://firebasestorage.googleapis.com/v0/b/vh-portfolio.appspot.com/o/project-images%2Fimage?alt=media"

const ModalContainer: React.FC<{ children: React.ReactElement }> = ({ children }) => (<div className="absolute inset-0 bg-black/70 grid place-items-center">
    {children}
</div>)

interface EditProjectModalProps extends ProjectAdminType {
    onClose(): void
}


export const EditProjectModal: React.FC<EditProjectModalProps> = (props) => {
    const [project, setProject] = React.useState<Partial<ProjectAdminType>>()
    const [technologieValue, setTechnologieValue] = React.useState("")
    const [projectcreenshots, setProjectcreenshots] = React.useState<Array<string | File>>([])
    const [trieSufix, setTrieSufix] = React.useState<string>()
    const trieRef = React.useRef(new Trie())
    const techInputRef = useRef<HTMLInputElement>(null)
    const wordSufixSpanRef = useRef<HTMLSpanElement>(null)

    React.useEffect(() => {
        const { onClose, screenshots, ...rest } = props
        setProjectcreenshots([...screenshots])
        setProject({ ...rest })

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
        setTrieSufix(!(project?.technologies || []).includes(technologieValue + trieResult) ? trieResult : undefined)

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

    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        const files = fileInput.files
        if (files) {
            setProjectcreenshots(prev => [...prev, ...Array.from(files)])
        }

        // const storage = getStorage();
        // const storageRef = ref(storage, `project-images/${selectedFile.name}`);

        // // 'file' comes from the Blob or File API
        // uploadBytes(storageRef, selectedFile).then((snapshot) => {
        //     console.log("snapshot.metadata", snapshot.metadata)
        //     console.log("snapshot.metadata.fullPath", snapshot.metadata.fullPath)
        //     console.log("snapshot.ref.fullPath", snapshot.ref.fullPath)
        //     console.log("snapshot.ref.name", snapshot.ref.name)
        //     console.log("snapshot.ref.toString", snapshot.ref.toString())

    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const { id, screenshots, ...rest } = project!
        let updatedScreenshots: string[] = []
        const updatedData: Record<string, object | string> = {}
        Object.entries(rest).forEach(([k, v]) => {
            if (typeof v === "string") {
                const value = rest[k as keyof typeof project]
                if (value !== props[k as keyof ProjectAdminType]) {
                    updatedData[k] = v
                }
            } else {
                ({
                    description: () => {
                        if (Object.values(rest.description!).join("") !== Object.values(props.description).join("")) {
                            updatedData[k] = v
                        }
                    },
                    technologies: () => {
                        if (rest.technologies?.join("") !== props.technologies.join("")) {
                            updatedData[k] = v
                        }
                    },
                    screenshots: () => {

                    }
                } as Record<string, () => void>)[k]()
            }
        })

        if (projectcreenshots!.join("") !== props.screenshots.join("")) {
            let tempScreenshots = [...projectcreenshots]
            projectcreenshots.forEach((img, i) => {

                if (img instanceof File) {
                    const storage = getStorage();
                    const storageRef = ref(storage, `project-images/${img.name}`);

                    uploadBytes(storageRef, img).then((snapshot) => {
                        console.log("snapshot.metadata", snapshot.metadata)
                        console.log("snapshot.metadata.fullPath", snapshot.metadata.fullPath)
                        console.log("snapshot.ref.fullPath", snapshot.ref.fullPath)
                        console.log("snapshot.ref.name", snapshot.ref.name)
                        console.log("snapshot.ref.toString", snapshot.ref.toString())
                    });

                    tempScreenshots[i] = `https://firebasestorage.googleapis.com/v0/b/vh-portfolio.appspot.com/o/project-images%2F${img.name}?alt=media`
                }
            })
            updatedData.screenshots = tempScreenshots
        }

        if (!id || Object.values(updatedData).length === 0) return;

        const docRef = doc(db, "projects", id!)

        try {
            await updateDoc(docRef, updatedData)
        } catch (e) {
            console.error(e)
            alert("Error")
        } finally {
            props.onClose();
        }

    }

    return (
        <ModalContainer>
            <div className="bg-gray-200 dark:bg-[#3f3f3f] w-full max-w-[1000px] rounded-md p-3">
                <div className="text-right">
                    <button onClick={props.onClose} ><CloseIcon /></button>
                </div>

                <form onSubmit={handleSubmit} className="">
                    <div className="flex flex-row bg-black/20 py-2">
                        <div className="flex flex-col justify-evenly px-2">
                            {/* <button type="button" onClick={() => { }} ><AddIcon sx={{ fontSize: 35 }} /></button> */}
                            <div className="relative">
                                <label htmlFor="upload-img" className="px-6 cursor-pointer"><AddPhotoAlternateIcon sx={{ fontSize: 35 }} /></label>
                                <input onChange={handleSelectChange} className="absolute pointer-events-none opacity-0" type="file" accept=".webp" name="" id="upload-img" />
                            </div>

                        </div>

                        <div className="flex gap-2 overflow-auto">
                            {
                                projectcreenshots.map((img, i) => (

                                    <Image key={i} width={300} height={113} src={img instanceof File ? URL.createObjectURL(img) : img} className="rounded-md w-auto h-[183px]" alt="project screenshot" />

                                ))
                            }
                        </div>

                    </div>

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
                            { id: "deployUrl", label: "Deploy URL", value: props.deployUrl },
                            { id: "repositoryUrl", label: "Repository URL", value: props.repositoryUrl },
                            { id: "videoUrl", label: "Video Demo URL", value: props.videoUrl },
                        ].map(obj => (
                            <div key={obj.id}>
                                <label htmlFor={obj.id}>{obj.label}:</label>
                                <input id={obj.id} className="shadow-lg bg-[#444444] p-2 rounded-md outline-blue-500 autofill:none resize-none overflow-hidden w-full" value={project?.[obj.id as keyof typeof project] as string || ""} placeholder={`New ${obj.label}`} onChange={e => updateProjectProps(obj.id as keyof typeof project, e.currentTarget.value || "")} />
                            </div>
                        ))}

                        <div>
                            <label htmlFor="technologies">Technologies:</label>

                            {/* Technologie list */}
                            <div className="flex flex-wrap gap-2 my-2">
                                {project?.technologies?.map(tech => (
                                    <p onClick={() => {
                                        const technologies = (project?.technologies || []).filter((t, i) => t !== tech)
                                        setProject(prev => ({ ...prev, technologies }))

                                    }} className="bg-gray-800 p-2 rounded-xl hover:bg-red-400 select-none" key={tech}>{tech}</p>
                                ))}
                            </div>

                            <div className="relative w-full">
                                <span ref={wordSufixSpanRef} style={{ opacity: trieSufix !== undefined ? 1 : 0 }} className="absolute inset-y-0 pointer-events-none py-2 text-gray-400" >
                                    {trieSufix}<span className="ml-1 border rounded-sm py-[2px] px-1 border-gray-400 text-sm font-semibold">Tab</span>
                                </span>
                                <input
                                    ref={techInputRef}
                                    autoComplete="off"
                                    id="technologies"
                                    className="shadow-lg bg-[#444444] p-2 rounded-md outline-blue-500 autofill:none resize-none overflow-hidden w-full"
                                    value={technologieValue}
                                    placeholder="New technologie"
                                    onKeyDown={e => {
                                        if (e.code === "Tab") {
                                            const technologies = project?.technologies || []

                                            if (trieSufix !== undefined) {
                                                const newValue = technologieValue + trieSufix
                                                if (technologies.includes(newValue)) return
                                                setProject(prev => ({ ...prev, technologies: [...technologies, newValue] }))
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

                        <button type="submit" className="hover:brightness-105 duration-250 bg-green-300 text-gray-600 font-semibold p-2 rounded-md mt-4">Update</button>

                    </div>


                </form>

            </div>
        </ModalContainer>
    )
}

const CreateProjectModal: React.FC<{ children: React.ReactElement }> = ({ children }) => (<div>
    {children}
</div>)