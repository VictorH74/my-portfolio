'use client';
import Loading from '@/components/Loading';
import React from 'react';
import ListView from './views/ListView';
import CarouselView from './views/Carousel';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { ProjectType } from '@/types';
import {
    QueryConstraint,
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from 'firebase/firestore';
import { db } from '@/configs/firebaseConfig';
import { useQuery } from 'react-query';
import { useTranslations } from 'next-intl';

const viewBtnClass = 'text-custom-gray-light dark:text-[#a1a1aa]';
const viewBtnActiveClass = 'text-[#303030] dark:text-[#ececec]';

export default function Projects() {
    const [view, setView] = React.useState(2);
    const containerRef = React.useRef(null);
    const [projects, setProjects] = React.useState<ProjectType[]>([]);

    const { isLoading } = useQuery('projects', {
        queryFn: async () => {
            setProjects(await getProjectSnapshotsByQuery(limit(3)));
        },
        refetchOnWindowFocus: false,
    });

    const fetchMoreProjects = async () => {
        const retrievedProjects = await getProjectSnapshotsByQuery(
            startAfter(2)
        );
        setProjects((prev) => [...prev, ...retrievedProjects]);
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

    const t = useTranslations('Projects_Section');

    return (
        <section
            ref={containerRef}
            id="projects"
            className="home-section pt-24 px-0 text-center"
        >
            {!isLoading && projects ? (
                <>
                    <div className="mb-12 relative">
                        <h1 className="section-title">{t('title')}</h1>
                        {process.env.NODE_ENV === 'development' && (
                            <div className="absolute right-5 inset-y-0 px-2 flex gap-2">
                                <button onClick={() => setView(1)}>
                                    <ViewCarouselIcon
                                        className={
                                            view === 1
                                                ? viewBtnActiveClass
                                                : viewBtnClass
                                        }
                                        sx={{ fontSize: 40 }}
                                    />
                                </button>
                                <button onClick={() => setView(2)}>
                                    <ViewListIcon
                                        className={
                                            view === 2
                                                ? viewBtnActiveClass
                                                : viewBtnClass
                                        }
                                        sx={{ fontSize: 40 }}
                                    />
                                </button>
                            </div>
                        )}
                    </div>

                    {view === 1 && <CarouselView projectArray={projects} />}
                    {view === 2 && (
                        <ListView
                            projectArray={projects}
                            showMoreOnText={t('show_more_on')}
                            showMoreOffText={t('show_more_off')}
                            fetchMoreProjectsFunc={fetchMoreProjects}
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
