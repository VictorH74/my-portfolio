import { TechnologieType } from '@/types';
import { doc, runTransaction, writeBatch } from 'firebase/firestore';
import useGlobalTechnologies from '@/hooks/useGlobalTechnologies';
import React from 'react';
import { db } from '@/configs/firebaseConfig';
import { ReordableModal } from '../ReordableModal';

export const getTechDocRef = (id: string) => doc(db, 'technologies', id);

export default function useTechnologiesArea() {
    const [selectedTech, setSelectedTech] =
        React.useState<TechnologieType | null>(null);

    const [showAddTechForm, setShowAddTechForm] = React.useState(false);
    const [showReorderModal, setShowReorderModal] = React.useState(false);

    const {
        technologyArray,
        setTechnologyArray,
        isLoading: isTechArrayLoading,
    } = useGlobalTechnologies();

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

    const reorderTechs = async (
        items: ReordableModal.OutputReordableItemType[]
    ) => {
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

    return {
        selectedTech,
        setTechnologyArray,
        showAddTechForm,
        showReorderModal,
        technologyArray,
        isTechArrayLoading,
        makeSelectTech,
        makeRemoveFunc,
        toggleAddTechFormVisibillity,
        toggleReorderModalVisibillity,
        reorderTechs,
        setSelectedTech,
        setShowAddTechForm,
        setShowReorderModal,
    };
}
