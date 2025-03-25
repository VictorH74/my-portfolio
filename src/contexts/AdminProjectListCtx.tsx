'use client';
import { db } from '@/configs/firebaseConfig';
import { ProjectType } from '@/types';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React from 'react';

interface AdminProjectsProps {
    projects: ProjectType[];
}

export const adminProjectListCtx =
    React.createContext<AdminProjectsProps | null>(null);

export const AdminProjectListProvider = ({
    children,
}: {
    children: React.ReactElement;
}) => {
    const [projects, setProjects] = React.useState<ProjectType[]>([]);

    React.useEffect(() => {
        const docsRef = collection(db, 'projects');
        const q = query(docsRef, orderBy('index', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const retrivedProjects: ProjectType[] = [];
            snapshot.forEach((doc) => {
                retrivedProjects.push({
                    ...doc.data(),
                    id: doc.id,
                } as ProjectType);
            });
            setProjects(retrivedProjects);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <adminProjectListCtx.Provider value={{ projects }}>
            {children}
        </adminProjectListCtx.Provider>
    );
};
