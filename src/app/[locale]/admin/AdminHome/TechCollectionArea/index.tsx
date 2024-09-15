'use client';
import { twMerge } from 'tailwind-merge';
import React from 'react';
import { TechnologieType } from '@/types';
import { doc, runTransaction, writeBatch } from 'firebase/firestore';
import { db } from '@/configs/firebaseConfig';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import GradeIcon from '@mui/icons-material/Grade';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useGlobalTechnologies from '@/hooks/useGlobalTechnologies';
import { IconButton } from '@/components/IconButton';
import CollectionActions from '../CollectionActions';
import ReordableModal, { OutputReordableItemType } from '../ReordableModal';

const AddTechFormModal = React.lazy(() => import('./AddTechFormModal'));

export const getTechDocRef = (id: string) => doc(db, 'technologies', id);

export default function TechnologiesArea() {
    const [selectedTech, setSelectedTech] =
        React.useState<TechnologieType | null>(null);

    const [showAddTechForm, setShowAddTechForm] = React.useState(false);
    const [showReorderModal, setShowReorderModal] = React.useState(false);

    const { technologyArray, setTechnologyArray } = useGlobalTechnologies();

    const removeTech = async (techId: string, techIndex: number) => {
        if (
            confirm(
                'Are you sure you want to remove this technologie from your collection?'
            )
        ) {
            const docRef = getTechDocRef(techId);
            const collectionCountRef = doc(db, 'counts', 'projects');

            await runTransaction(db, async (transaction) => {
                const collectionCount = await transaction.get(
                    collectionCountRef
                );
                if (!collectionCount.exists()) {
                    throw 'Document does not exist!';
                }

                const total = (collectionCount.data().total as number) - 1;

                for (
                    let currentIndex = techIndex;
                    currentIndex < total;
                    currentIndex++
                ) {
                    const { id, index } = technologyArray[currentIndex + 1];
                    if (index !== currentIndex + 1)
                        throw new Error(
                            `Technology index is incorrect. index: ${index}, currentIndex: ${currentIndex}`
                        );
                    const currentTechRef = getTechDocRef(id);
                    transaction.update(currentTechRef, { index: currentIndex });
                }

                transaction.delete(docRef);

                transaction.update(collectionCountRef, { total });
            });

            setTechnologyArray((prev) => prev.filter((t) => t.id !== techId));
        }
    };

    const makeSelectTech = (tech: TechnologieType) => () => {
        setSelectedTech(tech);
        setShowAddTechForm(true);
    };

    const makeRemoveFunc = (id: string, index: number) => () =>
        removeTech(id, index);

    const toggleAddTechFormVisibillity = () =>
        setShowAddTechForm((prev) => !prev);

    const toggleReorderModalVisibillity = () =>
        setShowReorderModal((prev) => !prev);

    const reorderTechs = async (items: OutputReordableItemType[]) => {
        const batch = writeBatch(db);

        const prevTechnologyArray = technologyArray;
        const updatedTechnologyArray = Array(technologyArray.length).fill(null);

        items.forEach((item, currentIndex) => {
            const updatedIndexProp = { index: currentIndex };
            updatedTechnologyArray[currentIndex] = {
                ...prevTechnologyArray[item.prevIndex],
                ...updatedIndexProp,
            };

            if (currentIndex !== item.prevIndex) {
                const docRef = getTechDocRef(item.id);
                batch.update(docRef, updatedIndexProp);
            }
        });

        await batch.commit();
        setTechnologyArray(updatedTechnologyArray);
    };

    return (
        <section>
            <CollectionActions
                collectionName="Technologies"
                addFunc={toggleAddTechFormVisibillity}
                reorderFunc={toggleReorderModalVisibillity}
            />

            {showAddTechForm && (
                <React.Suspense
                    fallback={
                        <span className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 py-2 w-full max-w-[400px] mx-2 text-center rounded-md bg-custom-gray-light">
                            Loading...
                        </span>
                    }
                >
                    <AddTechFormModal
                        selectedTech={selectedTech}
                        setTechnologyArray={setTechnologyArray}
                        resetFieldsCallback={() => setSelectedTech(null)}
                        onClose={() => {
                            if (!!selectedTech) setSelectedTech(null);
                            setShowAddTechForm(false);
                        }}
                    />
                </React.Suspense>
            )}

            <ul className="flex flex-wrap justify-center gap-3 mt-5">
                {/* TODO: implement component to empty tech array */}
                {technologyArray.map((icon) => (
                    <li
                        key={icon.id}
                        className={twMerge(
                            'shadow-xl flex flex-col items-center justify-center gap-2 max-sm:w-[70px] sm:w-[170px] sm:min-w-[170px] aspect-square select-none duration-200 backdrop-blur-md relative rounded-md',
                            selectedTech?.index == icon.index &&
                                'outline outline-[var(--theme-color)]'
                        )}
                        data-aos="flip-left"
                        data-aos-duration="1000"
                        data-aos-once="true"
                    >
                        <div className="absolute inset-0 bg-black/50 duration-200 opacity-0 hover:opacity-100 flex gap-2 items-center justify-center">
                            <IconButton
                                Icon={EditIcon}
                                onClick={makeSelectTech(icon)}
                                type="button"
                            />
                            <IconButton
                                Icon={RemoveIcon}
                                onClick={makeRemoveFunc(icon.id, icon.index)}
                                type="button"
                                disabled={!!selectedTech}
                            />
                        </div>

                        {icon.isMain && icon.hidden ? (
                            <>
                                <GradeIcon className="absolute top-3 right-3 text-[var(--theme-color)] pointer-events-none" />
                                <VisibilityOffIcon className="absolute top-10 right-3 text-gray-500 pointer-events-none" />
                            </>
                        ) : icon.isMain ? (
                            <GradeIcon className="absolute top-3 right-3 text-[var(--theme-color)] pointer-events-none" />
                        ) : (
                            icon.hidden && (
                                <VisibilityOffIcon className="absolute top-3 right-3 text-gray-500 dark:text-[#3f3f3f] pointer-events-none" />
                            )
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
                ))}
            </ul>

            {showReorderModal && (
                <ReordableModal
                    onSubmit={reorderTechs}
                    items={technologyArray.map(({ id, name, src }) => ({
                        id,
                        value: JSON.stringify({ name, src }),
                    }))}
                    onClose={() => setShowReorderModal(false)}
                >
                    {(item, index) => (
                        <div
                            key={item.id}
                            className="p-2 flex justify-between items-center"
                        >
                            <p>
                                {index} - {JSON.parse(item.value).name}
                            </p>
                            <Image
                                height={0}
                                width={0}
                                className="rounded-md w-auto h-[40px]"
                                alt="technology icon url"
                                src={JSON.parse(item.value).src}
                            />
                        </div>
                    )}
                </ReordableModal>
            )}
        </section>
    );
}
