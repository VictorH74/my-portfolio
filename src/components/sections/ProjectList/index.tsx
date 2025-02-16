'use client';

import React from 'react';
import { ProjectItem } from './ProjectItem';
import { useTranslations } from 'next-intl';
import './style.css';

import Image from 'next/image';
import { useProjectList } from './useProjectList';
import { Loading } from '@/components/Loading';
import { twMerge } from 'tailwind-merge';

export const ProjectList = () => {
    const t = useTranslations('ProjectListSection');
    const hook = useProjectList();

    return (
        <section id="projects" className="bg-white z-30">
            <h2 className="text-dark-font text-3xl font-semibold text-center mb-20 uppercase">
                {t('section_title')}
            </h2>
            <ul className="relative">
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
                                                hook.iconMap![techIconStr];
                                            return (
                                                <li key={techIcon.id}>
                                                    <Image
                                                        alt={
                                                            techIcon.name +
                                                            'icon'
                                                        }
                                                        src={techIcon.src}
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
            </ul>
            <button
                className="h-28 w-full uppercase bg-secondary-black text-white font-medium hover:brightness-125 duration-300 hover:cursor-pointer overflow-hidden relative"
                onClick={
                    hook.showingMore
                        ? () => hook.setShowingMore(false)
                        : hook.getMoreProjects
                }
                disabled={hook.isLoadingMoreProjects || hook.isLoading}
            >
                <p
                    className={twMerge(
                        (hook.isLoadingMoreProjects || hook.isLoading) &&
                            'opacity-0'
                    )}
                >
                    {hook.showingMore ? t('show_less_btn') : t('show_more_btn')}
                </p>

                {(hook.isLoadingMoreProjects || hook.isLoading) && (
                    <div className="size-fit absolute top-1/2 left-1/2 -translate-1/2">
                        <Loading size={60} />
                    </div>
                )}
            </button>
        </section>
    );
};
