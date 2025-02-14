'use client';
import { ProjectType, TechnologType } from '@/types';
import React from 'react';
import { ProjectItem } from './ProjectItem';
import { useTranslations } from 'next-intl';
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
import { useTechnologyList } from '@/hooks/useTechnologyList';
import Image from 'next/image';

// TODO: fix error - show less project not working
export const ProjectList = () => {
    const t = useTranslations('ProjectListSection');
    const [projectList, setProjectList] = React.useState<ProjectType[]>([]);
    const [isLoadingMoreProjects, setIsLoadingMoreProjects] =
        React.useState(false);
    const [showingMore, setShowingMore] = React.useState(false);
    const { isEmpty, technologyList } = useTechnologyList();

    const { isLoading } = useQuery({
        queryKey: ['project-list'],
        queryFn: () => getInitialProjects(),
        refetchOnWindowFocus: false,
    });

    const iconMap = React.useMemo(() => {
        if (isEmpty) return undefined;
        const map: Record<TechnologType['name'], TechnologType> = {};
        technologyList.map((icon) => {
            map[icon.id] = icon;
        });
        return map;
    }, [isEmpty, technologyList]);

    const getMoreProjects = React.useCallback(async () => {
        if (projectList.length === 4) {
            setIsLoadingMoreProjects(true);
            const retrievedProjects = await getProjectSnapshotsByQuery(
                startAfter(3)
            );
            setProjectList((prev) => [...prev, ...retrievedProjects]);
            setIsLoadingMoreProjects(false);
        }

        setShowingMore(true);
    }, [projectList]);

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

    return (
        <section id="projects" className="pb-52 bg-white z-30">
            <h2 className="text-[#444444] text-3xl font-semibold text-center mb-20 uppercase">
                {t('section_title')}
            </h2>

            <div
                className="scroll-animation-container"
                style={{
                    timelineScope: Array(projectList.length)
                        .fill(null)
                        .map((_, i) => '--scroller-' + (i + 1))
                        .join(', '),
                }}
            >
                <div className="content min-h-screen sticky top-0  mb-28">
                    <div
                        className="scroller--1 scroller"
                        style={{
                            viewTimelineName: '--scroller-1',
                        }}
                    >
                        {projectList.map((projectData) => (
                            <ProjectItem key={projectData.id} {...projectData}>
                                {!!iconMap && (
                                    <div className="w-full max-w-[35rem] space-y-2">
                                        <h3 className="text-2xl font-medium">
                                            {t('technology_list_title')}:
                                        </h3>
                                        <ul className="flex gap-4">
                                            {projectData.technologies.map(
                                                (techIconStr) => {
                                                    const techIcon =
                                                        iconMap[techIconStr];
                                                    return (
                                                        <li key={techIcon.id}>
                                                            <Image
                                                                alt={
                                                                    techIcon.name +
                                                                    'icon'
                                                                }
                                                                src={
                                                                    techIcon.src
                                                                }
                                                                height={25}
                                                                width={25}
                                                            />
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </ProjectItem>
                        ))}
                    </div>
                </div>

                {projectList.length &&
                    Array(projectList.length - 1)
                        .fill(null)
                        .map((_, i) => (
                            <div
                                key={i}
                                className={'scroller scroller--' + (i + 2)}
                                style={{
                                    viewTimelineName: '--scroller-' + (i + 2),
                                }}
                            ></div>
                        ))}

                <div className="w-full grid place-items-center mt-10">
                    <button
                        className="w-fit shrink-0 px-14 py-5  uppercase bg-[#2e2e2e] text-white font-medium hover:shadow-lg hover:shadow-[#969696] duration-300"
                        onClick={
                            showingMore
                                ? () => setShowingMore(false)
                                : getMoreProjects
                        }
                        disabled={isLoadingMoreProjects || isLoading}
                    >
                        {showingMore ? t('show_less_btn') : t('show_more_btn')}
                    </button>
                </div>
            </div>
        </section>
    );
};
