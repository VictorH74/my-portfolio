import { db } from '@/configs/firebaseConfig';
import { TechnologyType } from '@/types';
import { doc, runTransaction, writeBatch } from 'firebase/firestore';
import React from 'react';

import { OutputReordableItemType } from '../components/ReordableModal';
import { useTechnologyList } from '@/hooks/useTechnologyList';
import { deleteObject, getStorage, ref } from 'firebase/storage';

export const getTechDocRef = (id: string) => doc(db, 'technologies', id);

export const useTechCollectionArea = () => {
    const [selectedTech, setSelectedTech] =
        React.useState<TechnologyType | null>(null);
    const [selectedOnRemoveTech, setSelectedOnRemoveTech] =
        React.useState<TechnologyType | null>(null);

    const [showAddTechForm, setShowAddTechForm] = React.useState(false);
    const [showReorderModal, setShowReorderModal] = React.useState(false);

    const [removingTech, setRemovingTech] = React.useState(false);

    const {
        technologyList,
        setTechnologyList,
        isLoading: isTechArrayLoading,
    } = useTechnologyList();

    const selectOnRemoveTech = (tech: TechnologyType) => {
        setSelectedOnRemoveTech(tech);
    };

    const removeTech = async (cb?: () => Promise<void>) => {
        if (!selectedOnRemoveTech) return;

        setRemovingTech(true);

        try {
            const docRef = getTechDocRef(selectedOnRemoveTech.id);
            const collectionCountRef = doc(db, 'counts', 'technologies');

            if (cb) await cb();

            await runTransaction(db, async (transaction) => {
                const collectionCount = await transaction.get(
                    collectionCountRef
                );
                if (!collectionCount.exists()) {
                    throw 'Document does not exist!';
                }
                const total = (collectionCount.data().total as number) - 1;
                for (
                    let currentIndex = selectedOnRemoveTech.index;
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

            if (
                new URL(selectedOnRemoveTech.src).hostname ==
                'firebasestorage.googleapis.com'
            ) {
                const storage = getStorage();
                const screenshotRef = ref(storage, selectedOnRemoveTech.src);
                await deleteObject(screenshotRef);
            }

            setTechnologyList((prev) =>
                prev.filter((t) => t.id !== selectedOnRemoveTech.id)
            );
        } catch (e) {
            console.error(e);
        } finally {
            setSelectedOnRemoveTech(null);
            setRemovingTech(false);
        }
    };

    const selectOnSaveTech = (tech: TechnologyType) => {
        setSelectedTech(tech);
        setShowAddTechForm(true);
    };

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
        removingTech,
        selectedTech,
        selectedOnRemoveTech,
        setTechnologyList,
        setSelectedOnRemoveTech,
        showAddTechForm,
        showReorderModal,
        technologyList,
        removeTech,
        isTechArrayLoading,
        selectOnSaveTech,
        selectOnRemoveTech,
        toggleAddTechFormVisibillity,
        toggleReorderModalVisibillity,
        reorderTechs,
        setSelectedTech,
        setShowAddTechForm,
        setShowReorderModal,
    };
};
