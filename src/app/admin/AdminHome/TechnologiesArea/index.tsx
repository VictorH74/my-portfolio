"use client"
import { useTheme } from "@/hooks/UseTheme";
import { twMerge } from "tailwind-merge";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import React from "react";
import { TechnologieType } from "@/types";
import { collection, deleteDoc, doc, getDocs, orderBy, query, runTransaction, setDoc } from "firebase/firestore";
import { db } from "@/configs/firebaseConfig";
import Image from "next/image";
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import GradeIcon from '@mui/icons-material/Grade';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useTechnologies from "@/hooks/UseTechnologies";


type FieldType = {
    placeholder: string
    name: string
    className: string
    type?: string
    pattern: string
    value: string
    onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const getTechDocRef = (id: string) => doc(db, 'technologies', id)

export default function TechnologiesArea() {
    const [submittingForm, setSubmittingForm] = React.useState(false)

    const [indexValue, setIndexValue] = React.useState<number | undefined>()
    const [urlValue, setUrlValue] = React.useState("")
    const [idValue, setIdValue] = React.useState("")
    const [nameValue, setNameValue] = React.useState("")
    const [isHidden, setIsHidden] = React.useState(false)
    const [isMain, setIsMain] = React.useState(false)

    const { technologyArray, setTechnologyArray } = useTechnologies()

    const { themeColor } = useTheme()

    const resetFields = () => {
        if (indexValue) setIndexValue(undefined)
        if (urlValue) setUrlValue("")
        if (idValue) setIdValue("")
        if (nameValue) setNameValue("")
        if (isHidden) setIsHidden(false)
        if (isMain) setIsMain(false)
    }

    const seedFieldsWithSelectedTech = (tech: TechnologieType) => {
        setIndexValue(tech.index)
        setUrlValue(tech.src)
        setIdValue(tech.id)
        setNameValue(tech.name)
        setIsHidden(!!tech.hidden)
        setIsMain(!!tech.isMain)
    }

    const saveTech = async (techData: Omit<TechnologieType, "index">) => {
        const collectionSizeRef = doc(db, "counts", "technologies")
        await runTransaction(db, async (transaction) => {
            const collectionCount = await transaction.get(collectionSizeRef)

            if (!collectionCount.exists()) {
                throw "Document does not exist!";
            }

            const collectionSize = collectionCount.data().total as number
            const docRef = getTechDocRef(techData.id)
            const newTech = { ...techData, index: collectionSize }
            await setDoc(docRef, newTech);
            setTechnologyArray(prev => [...prev, newTech])
            transaction.update(collectionSizeRef, { total: collectionSize + 1 })
        })
    }

    const saveUpdateTech = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmittingForm(true)
        const techData: Omit<TechnologieType, "index"> = {
            src: urlValue,
            id: idValue,
            name: nameValue,
        }

        if (isHidden) techData.hidden = isHidden;
        if (isMain) techData.isMain = isMain;

        if (indexValue) {
            const docRef = getTechDocRef(techData.id)
            await setDoc(docRef, { ...techData, index: indexValue });

            setTechnologyArray(prev => prev.map(t => t.index == indexValue ? { ...t, ...techData } : t))
        } else {
            saveTech(techData)
        }

        resetFields()
        setSubmittingForm(false)
    }

    const removeTech = async (techId: string, techIndex: number) => {
        if (confirm("Are you sure you want to remove this technologie from your collection?")) {
            const docRef = getTechDocRef(techId)
            const collectionCountRef = doc(db, "counts", "projects")            

            await runTransaction(db, async (transaction) => {
                const collectionCount = await transaction.get(collectionCountRef)
                if (!collectionCount.exists()) {
                    throw "Document does not exist!";
                }

                const total = collectionCount.data().total as number - 1

                for (let currentIndex = techIndex; currentIndex < total; currentIndex++) {
                    const { id, index } = technologyArray[currentIndex + 1]
                    if (index !== currentIndex + 1) throw new Error(`Technology index is incorrect. index: ${index}, currentIndex: ${currentIndex}`)
                    const currentTechRef = getTechDocRef(id)
                    transaction.update(currentTechRef, { index: currentIndex })
                }

                transaction.delete(docRef)

                transaction.update(collectionCountRef, { total })
            })

            setTechnologyArray(prev => prev.filter(t => t.id !== techId))
        }
    }

    const makeSeedFieldsWithSelectedTech = (tech: TechnologieType) => () => seedFieldsWithSelectedTech(tech)
    const makeRemoveFunc = (id: string, index: number) => () => removeTech(id, index)

    const reorderTechs = async () => { }

    return (
        <div className="mb-5">
            <h1 className="text-2xl mb-2">Technologies</h1>
            <form className="flex flex-row" onSubmit={saveUpdateTech}>
                <div className="grid grid-cols-2 gap-2 grow">
                    {([
                        { placeholder: "URL", name: "iconUrl", type: "url", className: "col-span-2", pattern: "https?://.+", value: urlValue, onChange: (e) => setUrlValue(e.currentTarget.value) },
                        { placeholder: "ID", name: "iconId", className: "grid", pattern: "[a-z]*", value: idValue, onChange: (e) => setIdValue(e.currentTarget.value) },
                        { placeholder: "NAME", name: "iconName", className: "grid", value: nameValue, onChange: (e) => setNameValue(e.currentTarget.value) },
                    ] as FieldType[]).map(({ className, ...ipt }) => (
                        <input key={ipt.name} {...ipt} className={twMerge("border p-2 rounded-md", className)} onFocus={e => e.target.select()} required />
                    ))}
                </div>
                <div className="w-fit grosw-0 px-2 grid grid-rows-2 gap-2">
                    <CustomCheckbox value={isHidden} onToggle={newV => setIsHidden(newV)} label="Is hidden" />
                    <CustomCheckbox value={isMain} onToggle={newV => setIsMain(newV)} label="Is main" />
                </div>
                <div className="max-w-[200px] w-full grosw-0 px-2 grid grid-rows-2 gap-2">
                    <button className="p-2 rounded-md w-full bg-gray-200 dark:bg-[#3f3f3f]" type="button" onClick={resetFields} >Reset <RestartAltIcon /></button>
                    <button style={{ backgroundColor: themeColor.color }} className="p-2 rounded-md w-full" disabled={submittingForm} >Save <SaveAltIcon /></button>
                </div>
            </form>
            <ul className="flex flex-wrap justify-center gap-3 mt-5">
                {/* TODO: implement component to empty tech array */}
                {technologyArray.map(
                    (icon) => (
                        <li
                            key={icon.id}
                            className={twMerge("shadow-xl flex flex-col items-center justify-center gap-2 max-sm:w-[70px] sm:w-[170px] sm:min-w-[170px] aspect-square select-none duration-200 backdrop-blur-md relative rounded-md", indexValue == icon.index && 'outline outline-[var(--theme-color)]')}
                            data-aos="flip-left"
                            data-aos-duration="1000"
                            data-aos-once="true"
                        >
                            <div className="absolute inset-0 bg-black/50 duration-200 opacity-0 hover:opacity-100 flex gap-2 items-center justify-center">
                                <button
                                    className="bg-gray-200 dark:bg-[#3f3f3f] rounded-full p-2"
                                    type="button"
                                    onClick={makeSeedFieldsWithSelectedTech(icon)}
                                >
                                    <EditIcon sx={{ fontSize: 27 }} />
                                </button>
                                <button
                                    className="bg-gray-200 dark:bg-[#3f3f3f] rounded-full p-2"
                                    onClick={makeRemoveFunc(icon.id, icon.index)}
                                    type="button"
                                    disabled={!!indexValue}
                                >
                                    <RemoveIcon sx={{ fontSize: 27 }} />
                                </button>
                            </div>

                            {icon.isMain && icon.hidden ? (
                                <>
                                    <GradeIcon className="absolute top-3 right-3 text-[var(--theme-color)] pointer-events-none" />
                                    <VisibilityOffIcon className="absolute top-10 right-3 text-gray-200 dark:text-[#3f3f3f] pointer-events-none" />
                                </>
                            ) : icon.isMain ? (
                                <GradeIcon className="absolute top-3 right-3 text-[var(--theme-color)] pointer-events-none" />
                            ) : icon.hidden && (
                                <VisibilityOffIcon className="absolute top-3 right-3 text-gray-200 dark:text-[#3f3f3f] pointer-events-none" />
                            )}

                            <Image
                                loading="lazy"
                                placeholder="empty"
                                height={50}
                                width={50}
                                className="h-2/5 w-auto"
                                src={icon.src}
                                alt="icon"
                            />
                            <div className="tech-name ">
                                <p className="primary-font-color" translate="no">
                                    {icon.name}
                                </p>
                            </div>
                        </li>
                    )
                )}
            </ul>
        </div>
    )
}

const CustomCheckbox: React.FC<{
    value: boolean,
    onToggle(newValue: boolean): void,
    label: string
}> = (props) => {
    return (
        <button
            type="button"
            className={twMerge("p-2 rounded-md w-full font-semibold max-w-[180px] border border-white", props.value ? `bg-[var(--theme-color)]` : "bg-gray-200 dark:bg-[#3f3f3f]")}
            onClick={() => props.onToggle(!props.value)}
        >
            {props.label}
        </button>
    )
}