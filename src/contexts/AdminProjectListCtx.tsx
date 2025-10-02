'use client';
import { projectService } from '@/di/container';
import { ProjectType } from '@/types/project';
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
        const unsubscribe = projectService.getProjectListStream(setProjects);
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
