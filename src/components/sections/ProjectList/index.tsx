'use client';

import React from 'react';
import { ProjectItem } from './ProjectItem';
import { useTranslations } from 'next-intl';

import Image from 'next/image';
import { useProjectList } from './useProjectList';

export const ProjectList = () => {
    const t = useTranslations('ProjectListSection');
    const hook = useProjectList();

    return (
        <section id="projects" className="bg-white z-30">
            <h2 className="text-dark-font text-3xl font-semibold text-center mb-20 uppercase">
                {t('section_title')}
            </h2>

            <div
                style={{
                    timelineScope: Array(hook.projectList.length)
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
                        {(hook.showingMore
                            ? hook.projectList
                            : hook.projectList.slice(0, 4)
                        ).map((projectData, i) => (
                            <ProjectItem
                                key={projectData.id}
                                index={i}
                                project={projectData}
                            >
                                {!!hook.iconMap && (
                                    <div className="w-full max-w-[35rem] space-y-2">
                                        <h3 className="text-2xl font-medium">
                                            {t('technology_list_title')}:
                                        </h3>
                                        <ul className="flex gap-4">
                                            {projectData.technologies.map(
                                                (techIconStr) => {
                                                    const techIcon =
                                                        hook.iconMap![
                                                            techIconStr
                                                        ];
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

                {hook.projectList.length &&
                    Array(
                        (hook.showingMore
                            ? hook.projectList
                            : hook.projectList.slice(0, 4)
                        ).length - 1
                    )
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

                <button
                    className="h-28 w-full  uppercase bg-secondary-black text-white font-medium hover:brightness-125 duration-300 hover:cursor-pointer"
                    onClick={
                        hook.showingMore
                            ? () => hook.setShowingMore(false)
                            : hook.getMoreProjects
                    }
                    disabled={hook.isLoadingMoreProjects || hook.isLoading}
                >
                    {hook.showingMore ? t('show_less_btn') : t('show_more_btn')}
                </button>
            </div>
        </section>
    );
};
