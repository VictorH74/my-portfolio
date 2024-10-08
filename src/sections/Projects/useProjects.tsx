import { db } from '@/configs/firebaseConfig';
import { ProjectType } from '@/types';
import {
    QueryConstraint,
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from 'firebase/firestore';
import React from 'react';
import { useQuery } from 'react-query';

export default function useProjects() {
    const [view, setView] = React.useState(2);
    const containerRef = React.useRef(null);
    const [projects, setProjects] = React.useState<ProjectType[]>([]);

    const { isLoading } = useQuery('projects', {
        queryFn: async () => {
            setProjects(await getProjectSnapshotsByQuery(limit(3)));
        },
        refetchOnWindowFocus: false,
    });

    const fetchMoreProjects = React.useCallback(async () => {
        const retrievedProjects = await getProjectSnapshotsByQuery(
            startAfter(2)
        );
        setProjects((prev) => [...prev, ...retrievedProjects]);
    }, []);

    const getProjectSnapshotsByQuery = async (
        ...queryConstraints: QueryConstraint[]
    ) => {
        const collectionRef = collection(db, 'projects');
        const q = query(collectionRef, orderBy('index'), ...queryConstraints);
        const snapshot = await getDocs(q);
        const tempProjects: ProjectType[] = [];
        snapshot.docs.forEach((doc) =>
            tempProjects.push({ ...doc.data(), id: doc.id } as ProjectType)
        );
        return tempProjects;
    };

    return {
        view,
        containerRef,
        projects,
        isLoading,
        fetchMoreProjects,
        setView,
    };
}
