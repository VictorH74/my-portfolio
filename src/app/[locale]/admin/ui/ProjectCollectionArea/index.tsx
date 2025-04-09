'use client';
import { Divider } from '@/components/Divider';
import { db } from '@/configs/firebaseConfig';
import { useAdminProjectList } from '@/hooks/useAdminProjectList';
import { doc, writeBatch } from 'firebase/firestore';
import React from 'react';

import { useDraggable } from 'react-use-draggable-scroll';

import { AdminProjectCard } from './AdminProjectCard';
import { CardSkeletonCollection } from './CardSkeletonCollection';
import { CreateUpdateProjectModal } from './CreateUpdateProjectModal';
import { AdminProjectWarnings } from './ProjectWarnings';
import { CollectionActions } from '../../components/CollectionActions';
import {
    OutputReordableItemType,
    ReordableModal,
} from '../../components/ReordableModal';

export const ProjectCollectionArea = () => {
    const [onCreateProject, setOnCreateProject] = React.useState(false);
    const [onReorderProject, setOnReorderProject] = React.useState(false);
    const { projects } = useAdminProjectList();

    const horizontalScrollRef = React.useRef<HTMLUListElement>(
        null
    ) as React.MutableRefObject<HTMLUListElement>;

    const { events } = useDraggable(horizontalScrollRef, {
        applyRubberBandEffect: true,
    });

    const reorderedProjects = async (items: OutputReordableItemType[]) => {
        const batch = writeBatch(db);

        items.forEach((item, currentIndex) => {
            if (currentIndex !== item.prevIndex) {
                const reorderedProjectId = projects[item.prevIndex].id;
                const docRef = doc(db, 'projects', reorderedProjectId);
                batch.update(docRef, { index: currentIndex });
            }
        });

        await batch.commit();
    };

    return (
        <>
            <section>
                <CollectionActions
                    collectionName="Projects"
                    addFunc={() => setOnCreateProject(true)}
                    reorderFunc={() => setOnReorderProject(true)}
                />
                <AdminProjectWarnings projects={projects} />

                <Divider />

                <ul
                    className="p-4 w-auto flex flex-row gap-7 justify-centers overflow-x-scroll scrollbar"
                    {...events}
                    ref={horizontalScrollRef}
                >
                    {projects.length > 0 ? (
                        projects.map((p) => (
                            <AdminProjectCard key={p.id} {...p} />
                        ))
                    ) : (
                        <CardSkeletonCollection amount={5} />
                    )}
                </ul>

                <form action="">
                    <input placeholder="" type="text" />
                </form>
            </section>
            {onCreateProject && (
                <CreateUpdateProjectModal
                    projectIndex={projects.length}
                    onClose={() => setOnCreateProject(false)}
                />
            )}

            {onReorderProject && (
                <ReordableModal
                    onSubmit={reorderedProjects}
                    items={projects.map(({ title, id }) => ({
                        id,
                        value: title,
                    }))}
                    onClose={() => setOnReorderProject(false)}
                >
                    {(item, index) => (
                        <div key={item.id} className="p-2">
                            {index} - {item.value}
                        </div>
                    )}
                </ReordableModal>
            )}
        </>
    );
};
