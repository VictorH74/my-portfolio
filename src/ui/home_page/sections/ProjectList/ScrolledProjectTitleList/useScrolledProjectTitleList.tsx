import { useFrozenFunction } from '@/hooks/useFrozenFunction';
import { ProjectType } from '@/types/project';
import React from 'react';

type ScrolledProjectTitleListItemType = Array<
    [ProjectType['id'], ProjectType['title']]
>;

export interface ScrolledProjectTitleListProps {
    projectListRef: React.RefObject<ProjectType[]>;
}

export const useScrolledProjectTitleList = (
    props: ScrolledProjectTitleListProps
) => {
    const { data: scrolledProjectTitleList, func: updateScolledProjectList } =
        useFrozenFunction<ScrolledProjectTitleListItemType>(
            () => {
                const _projectList = props.projectListRef.current;

                const _projects =
                    document.getElementsByClassName('project-item');

                const _list = [];

                for (let i = 0; i < _projects.length; i++) {
                    const nextProjectItem = _projects[i + 1];

                    if (nextProjectItem?.getBoundingClientRect().top <= 0)
                        _list.push([_projectList[i].id, _projectList[i].title]);
                }

                return _list as ScrolledProjectTitleListItemType;
            },
            100,
            []
        );

    React.useEffect(() => {
        const controller = new AbortController();

        document.addEventListener('scroll', updateScolledProjectList, {
            signal: controller.signal,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { scrolledProjectTitleList };
};
