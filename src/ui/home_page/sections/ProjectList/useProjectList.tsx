import { projectService } from '@/di/container';
import { ProjectType } from '@/types/project';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const useProjectList = () => {
    const [projectList, setProjectList] = React.useState<ProjectType[]>([]);
    const [isLoadingMoreProjects, setIsLoadingMoreProjects] =
        React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [showingMore, setShowingMore] = React.useState(false);

    const projectListRef = React.useRef<typeof projectList>(projectList);

    const getInitialProjects = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading
            throw 'error test';

            const initialProjectList = await projectService.getProjectList(4);
            setProjectList(initialProjectList);

            return null;
        } catch (err) {
            console.error(err);
            setIsError(true);
        }
    };

    const { isLoading, refetch } = useQuery({
        queryKey: ['project-list'],
        queryFn: () => getInitialProjects(),
        refetchOnWindowFocus: false,
        retry: false,
        enabled: projectList.length === 0,
    });

    React.useEffect(() => {
        projectListRef.current = projectList;
    }, [projectList]);

    const getMoreProjects = async () => {
        if (projectList.length === 4) {
            setIsLoadingMoreProjects(true);
            const retrievedProjects = await projectService.getProjectList(null, 3);
            setProjectList((prev) => [...prev, ...retrievedProjects]);
            setIsLoadingMoreProjects(false);
        }

        setShowingMore(true);
    };

    return {
        projectList,
        isLoadingMoreProjects,
        showingMore,
        isLoading,
        refetch,
        projectListRef,
        isError,
        getMoreProjects,
        setShowingMore,
    };
};
