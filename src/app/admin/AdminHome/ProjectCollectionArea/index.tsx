'use client';
import React from 'react';
import AdminProjectCard from './AdminProjectCard';
import CollectionActions from '../CollectionActions';
import AdminProjectWarnings from './ProjectWarnings';
import CardSkeletonCollection from './CardSkeletonCollection';
import useAdminProjects from '@/hooks/useAdminProjects';
import CreateUpdateProjectModal from './CreateUpdateProjectModal';
import ReordableModal, { OutputReordableItemType } from '../ReordableModal';
import { doc, writeBatch } from 'firebase/firestore';
import { db } from '@/configs/firebaseConfig';

export default function ProjectCollectionArea() {
    const [onCreateProject, setOnCreateProject] = React.useState(false);
    const [onReorderProject, setOnReorderProject] = React.useState(false);
    const { projects } = useAdminProjects();

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
                <AdminProjectWarnings projects={projects} />

                <div className="h-[2px] my-6 bg-[var(--theme-color)]"></div>

                <CollectionActions
                    collectionName="Projects"
                    addFunc={() => setOnCreateProject(true)}
                    reorderFunc={() => setOnReorderProject(true)}
                />

                <div className="py-3 w-auto flex flex-row overflow-x-auto gap-4 justify-centers">
                    {projects.length > 0 ? (
                        projects.map((p) => (
                            <AdminProjectCard key={p.id} {...p} />
                        ))
                    ) : (
                        <CardSkeletonCollection amount={5} />
                    )}
                </div>

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
}
