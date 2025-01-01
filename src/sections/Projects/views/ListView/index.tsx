import { ProjectType } from '@/types';
import React from 'react';

import { LoadMoreBtn } from './LoadMoreBtn';
import { ProjectCard } from './ProjectCard';

interface Props {
    projectArray: ProjectType[];
    showMoreOnText: string;
    showMoreOffText: string;
    fetchMoreProjectsFunc(): Promise<void>;
    isLoadingMoreProjects: boolean;
}

export const ListView = (props: Props) => {
    const [showMore, setShowMore] = React.useState(false);
    return (
        <>
            <div className="flex flex-col md:gap-20 gap-7">
                {props.projectArray
                    .filter((_, i) => i < 5 || showMore)
                    .map((project, i) => (
                        <ProjectCard key={i} project={project} index={i} />
                    ))}
            </div>
            <LoadMoreBtn
                isLoadingMoreProjects={props.isLoadingMoreProjects}
                onClick={async () => {
                    if (!showMore && !(props.projectArray.length > 5)) {
                        await props.fetchMoreProjectsFunc();
                    }
                    setShowMore(!showMore);
                }}
            >
                {showMore ? props.showMoreOnText : props.showMoreOffText}
            </LoadMoreBtn>
        </>
    );
};
