import { ProjectType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    QueryConstraint,
    startAfter,
} from 'firebase/firestore';
import { db } from '@/configs/firebaseConfig';
import React from 'react';

export const useProjectList = () => {
    const [projectList, setProjectList] = React.useState<ProjectType[]>([]);
    const [isLoadingMoreProjects, setIsLoadingMoreProjects] =
        React.useState(false);
    const [showingMore, setShowingMore] = React.useState(false);

    const { isLoading } = useQuery({
        queryKey: ['project-list'],
        queryFn: () => getInitialProjects(),
        refetchOnWindowFocus: false,
    });

    const getMoreProjects = async () => {
        if (projectList.length === 4) {
            setIsLoadingMoreProjects(true);
            const retrievedProjects = await getProjectSnapshotsByQuery(
                startAfter(3)
            );
            setProjectList((prev) => [...prev, ...retrievedProjects]);
            setIsLoadingMoreProjects(false);
        }

        setShowingMore(true);
    };

    const getInitialProjects = async () => {
        const initialProjectList = await getProjectSnapshotsByQuery(limit(4));
        setProjectList(initialProjectList);

        return null;
    };

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
        projectList,
        isLoadingMoreProjects,
        showingMore,
        isLoading,
        getMoreProjects,
        setShowingMore,
    };
};
