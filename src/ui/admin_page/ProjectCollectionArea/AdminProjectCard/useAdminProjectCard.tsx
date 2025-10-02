import { projectService } from '@/di/container';
import { useAdminProjectList } from '@/hooks/useAdminProjectList';
import { ProjectType } from '@/types/project';
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
                // TODO: test if this works
                await Promise.all([
                    projectService.deleteProject(props.id, props.index, projects),
                    projectService.deleteScreenshots(props.screenshots.map(s => `${props.id}/${s.name}`))
                ])
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
