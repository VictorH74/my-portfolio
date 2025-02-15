'use client';

import React from 'react';
import { ProjectItem } from './ProjectItem';
import { useTranslations } from 'next-intl';

import Image from 'next/image';
import { useProjectList } from './useProjectList';

// TODO: fix error - show less project not working
export const ProjectList = () => {
    const t = useTranslations('ProjectListSection');
    const hook = useProjectList();

    return (
        <section id="projects" className="pb-52 bg-white z-30">
            <h2 className="text-[#444444] text-3xl font-semibold text-center mb-20 uppercase">
                {t('section_title')}
            </h2>

            <div
                className="scroll-animation-container"
                style={{
                    timelineScope: Array(hook.projectList.length)
                        .fill(null)
                        .map((_, i) => '--scroller-' + (i + 1))
                        .join(', '),
                }}
            >
                <div className="content min-h-screen sticky top-0  mb-16">
                    <div
                        className="scroller--1 scroller"
                        style={{
                            viewTimelineName: '--scroller-1',
                        }}
                    >
                        {hook.projectList.map((projectData, i) => (
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
                    Array(hook.projectList.length - 1)
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

                <div className="w-full grid place-items-center  bg-[#2e2e2e]">
                    <button
                        className="w-fit px-14 py-5  uppercase bg-[#2e2e2e] text-white font-medium hover:shadow-lg hover:shadow-[#969696] duration-300"
                        onClick={
                            hook.showingMore
                                ? () => hook.setShowingMore(false)
                                : hook.getMoreProjects
                        }
                        disabled={hook.isLoadingMoreProjects || hook.isLoading}
                    >
                        {hook.showingMore
                            ? t('show_less_btn')
                            : t('show_more_btn')}
                    </button>
                </div>
            </div>
        </section>
    );
};
