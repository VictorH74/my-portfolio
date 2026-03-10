import { technologieService } from '@/di/container';
import { useGlobalTechnologyList } from '@/hooks/useGlobalTechnologyList';
import { TechnologyType } from '@/types/technology';
import React from 'react';

import { OutputReordableItemType } from '../components/ReordableModal';

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
    } = useGlobalTechnologyList();

    const selectOnRemoveTech = (tech: TechnologyType) => {
        setSelectedOnRemoveTech(tech);
    };

    const removeTech = async (cb?: () => Promise<void>) => {
        if (!selectedOnRemoveTech) return;

        setRemovingTech(true);

        try {
            if (cb) await cb();

            await technologieService.deleteTechnology(selectedOnRemoveTech, technologyList);
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

        const prevTechnologyArray = technologyList;
        const reordedTechnologyArray = Array(technologyList.length).fill(null);
        const listOfUpdatedTech: Pick<TechnologyType, 'id' | 'index'>[] = [];

        items.forEach((item, currentIndex) => {
            const updatedIndexProp = { index: currentIndex };
            reordedTechnologyArray[currentIndex] = {
                ...prevTechnologyArray[item.prevIndex],
                ...updatedIndexProp,
            };
            if (currentIndex !== item.prevIndex) {
                listOfUpdatedTech.push({ id: item.id, index: currentIndex })
            }
        });

        await technologieService.reorderTechnologies(listOfUpdatedTech);

        setTechnologyList(reordedTechnologyArray);
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
