import { db } from '@/configs/firebaseConfig';
import { TechnologyType } from '@/types';
import { doc, runTransaction, writeBatch } from 'firebase/firestore';
import React from 'react';

import { OutputReordableItemType } from '../components/ReordableModal';
import { useTechnologyList } from '@/hooks/useTechnologyList';

export const getTechDocRef = (id: string) => doc(db, 'technologies', id);

export const useTechCollectionArea = () => {
    const [selectedTech, setSelectedTech] =
        React.useState<TechnologyType | null>(null);

    const [showAddTechForm, setShowAddTechForm] = React.useState(false);
    const [showReorderModal, setShowReorderModal] = React.useState(false);

    const {
        technologyList,
        setTechnologyList,
        isLoading: isTechArrayLoading,
    } = useTechnologyList();

    const removeTech = async (techId: string, techIndex: number) => {
        if (
            confirm(
                'Are you sure you want to remove this technology from your collection?'
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
                    const { id, index } = technologyList[currentIndex + 1];
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
            setTechnologyList((prev) => prev.filter((t) => t.id !== techId));
        }
    };

    const makeSelectTech = (tech: TechnologyType) => () => {
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
        const prevTechnologyArray = technologyList;
        const updatedTechnologyArray = Array(technologyList.length).fill(null);
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
        setTechnologyList(updatedTechnologyArray);
    };

    return {
        selectedTech,
        setTechnologyList,
        showAddTechForm,
        showReorderModal,
        technologyList,
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
};
