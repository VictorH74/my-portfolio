'use client';
import Loading from '@/components/Loading';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useTranslations } from 'next-intl';
import React from 'react';

import useProjects from './useProjects';
import CarouselView from './views/Carousel';
import ListView from './views/ListView';

const viewBtnClass = 'text-custom-gray-light dark:text-[#a1a1aa]';
const viewBtnActiveClass = 'text-[#303030] dark:text-[#ececec]';

export default function Projects() {
    const hook = useProjects();

    const t = useTranslations('Projects_Section');

    return (
        <section
            ref={hook.containerRef}
            id="projects"
            className="home-section pt-24 px-0 text-center"
        >
            {!hook.isLoading && hook.projects ? (
                <>
                    <div className="mb-12 relative">
                        <h1 className="section-title">{t('title')}</h1>
                        {process.env.NODE_ENV === 'development' && (
                            <div className="absolute right-5 inset-y-0 px-2 flex gap-2">
                                <button onClick={() => hook.setView(1)}>
                                    <ViewCarouselIcon
                                        className={
                                            hook.view === 1
                                                ? viewBtnActiveClass
                                                : viewBtnClass
                                        }
                                        sx={{ fontSize: 40 }}
                                    />
                                </button>
                                <button onClick={() => hook.setView(2)}>
                                    <ViewListIcon
                                        className={
                                            hook.view === 2
                                                ? viewBtnActiveClass
                                                : viewBtnClass
                                        }
                                        sx={{ fontSize: 40 }}
                                    />
                                </button>
                            </div>
                        )}
                    </div>

                    {hook.view === 1 && (
                        <CarouselView projectArray={hook.projects} />
                    )}
                    {hook.view === 2 && (
                        <ListView
                            projectArray={hook.projects}
                            showMoreOnText={t('show_more_on')}
                            showMoreOffText={t('show_more_off')}
                            fetchMoreProjectsFunc={hook.fetchMoreProjects}
                            isLoadingMoreProjects={hook.isLoadingMoreProjects}
                        />
                    )}
                </>
            ) : (
                <div className="mt-[25%] grid place-items-center">
                    <Loading />
                </div>
            )}
        </section>
    );
}
