import { db } from '@/configs/firebaseConfig';
import { useAdminProjectList } from '@/hooks/useAdminProjectList';
import { ProjectType } from '@/types';
import { doc, runTransaction } from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import React from 'react';

export const useAdminProjectCard = (props: ProjectType) => {
    const [cardHover, setCardHover] = React.useState(false);
    const [onUpdateProject, setOnUpdateProject] = React.useState(false);
    const [techSrcList, setTechSrcList] = React.useState<string[]>([]);
    const { projects } = useAdminProjectList();

    const getLinkIconSx = (urlStr: string | undefined) => {
        return {
            color: urlStr ? '#1e1e1e' : '#999999',
        };
    };

    const openEditModal = () => setOnUpdateProject(true);

    const removeProject = async () => {
        if (
            confirm(
                'Are you sure you want to remove this project from your collection?'
            )
        )
            try {
                const docRef = doc(db, 'projects', props.id);
                const collectionCountRef = doc(db, 'counts', 'projects');
                await runTransaction(db, async (transaction) => {
                    const collectionCount = await transaction.get(
                        collectionCountRef
                    );
                    if (!collectionCount.exists()) {
                        throw 'Document does not exist!';
                    }

                    const total = (collectionCount.data().total as number) - 1;

                    const storage = getStorage();
                    props.screenshots.forEach((onRemoveScreenshot) => {
                        const screenshotRef = ref(
                            storage,
                            `project-images/${onRemoveScreenshot.name}`
                        );
                        deleteObject(screenshotRef);
                    });

                    for (
                        let currentIndex = props.index;
                        currentIndex < total;
                        currentIndex++
                    ) {
                        const { id, index } = projects[currentIndex + 1];
                        if (index !== currentIndex + 1)
                            throw new Error(
                                `Project index is incorrect. index: ${index}, currentIndex: ${currentIndex}`
                            );
                        const currentProjectRef = doc(db, 'projects', id);
                        transaction.update(currentProjectRef, {
                            index: currentIndex,
                        });
                    }

                    transaction.delete(docRef);
                    transaction.update(collectionCountRef, { total });
                });
            } catch (e) {
                console.error(e);
                alert('Error');
            }
    };

    return {
        cardHover,
        setCardHover,
        getLinkIconSx,
        onUpdateProject,
        setOnUpdateProject,
        techSrcList,
        setTechSrcList,
        openEditModal,
        removeProject,
    };
};
