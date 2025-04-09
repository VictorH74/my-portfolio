'use client';
import './style.css';
import { Loading } from '@/components/Loading';
import { useTechnologyIconMap } from '@/hooks/useTechnologyIconMap';
import { isMobilePortrait } from '@/utils/functions';
import { useTranslations } from 'next-intl';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { ProjectItem } from './ProjectItem';
import { ProjectTechList } from './ProjectTechListContent';
import { ScrolledProjectTitleList } from './ScrolledProjectTitleList';
import { useProjectList } from './useProjectList';

export const techItemImgWidth = 25;
export const techListGap = 8;

export const ProjectList = () => {
    const t = useTranslations('ProjectListSection');
    const hook = useProjectList();
    const iconMap = useTechnologyIconMap();

    return (
        <section
            id="projects"
            className="max-md:pt-[2.5rem] max-md:pb-5 bg-background z-30 pt-[6.5rem] max-lg:pb-52 max-lg:overflow-hidden"
        >
            <h2 className="max-md:mb-10 text-dark-font text-3xl font-semibold text-center mb-20 uppercase">
                {t('section_title')}
            </h2>

            {hook.isError ? (
                // TODO: individual component
                <button
                    className="text-red-400 font-medium py-2 px-6 w-full text-center pb-16 cursor-pointer"
                    onClick={async () => await hook.refetch()}
                >
                    Error trying loading projects! Retry
                </button>
            ) : hook.isLoading ? (
                <div>
                    <Loading />
                </div>
            ) : (
                <>
                    <ul className="max-lg:divide-secondary-black max-lg:mb-5 max-lg:space-y-10 relative">
                        {(hook.showingMore
                            ? hook.projectList
                            : hook.projectList.slice(0, 4)
                        ).map((projectData, i) => (
                            <ProjectItem
                                key={projectData.id}
                                index={i}
                                project={projectData}
                            >
                                {!!iconMap && (
                                    <div className="w-full max-w-[35rem] space-y-2">
                                        <h3 className="text-2xl font-medium">
                                            {t('technology_list_title')}:
                                        </h3>
                                        <ProjectTechList
                                            iconMap={iconMap}
                                            techList={projectData.technologies}
                                        />
                                    </div>
                                )}
                            </ProjectItem>
                        ))}
                    </ul>
                    <button
                        className="max-md:shadow-[0_4px_8px_#686868] max-lg:px-16 max-lg:rounded-md max-lg:ml-[50%] max-lg:-translate-x-1/2 max-md:w-full min-lg:h-28 min-lg:w-full h-20 uppercase bg-secondary-black text-background hover:brightness-125 duration-300 hover:cursor-pointer overflow-hidden relative"
                        onClick={
                            hook.showingMore
                                ? () => hook.setShowingMore(false)
                                : hook.getMoreProjects
                        }
                        disabled={hook.isLoadingMoreProjects}
                    >
                        <p
                            className={twMerge(
                                'font-semibold',
                                hook.isLoadingMoreProjects && 'opacity-0'
                            )}
                        >
                            {hook.showingMore
                                ? t('show_less_btn')
                                : t('show_more_btn')}
                        </p>

                        {hook.isLoadingMoreProjects && (
                            <div className="size-fit absolute top-1/2 left-1/2 -translate-1/2">
                                <Loading size={60} />
                            </div>
                        )}
                    </button>

                    {!isMobilePortrait() && hook.projectList.length > 0 && (
                        <ScrolledProjectTitleList
                            projectListRef={hook.projectListRef}
                        />
                    )}
                </>
            )}
        </section>
    );
};
