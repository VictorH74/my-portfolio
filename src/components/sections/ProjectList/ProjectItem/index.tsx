import { Slider } from '@/components/Slider';
import { ProjectType } from '@/types';
import { PROJECT_GRADIENT_COLORS } from '@/utils/constants';
import { getProjectGradient } from '@/utils/function';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
// import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

export const ProjectItem: React.FC<ProjectType & React.PropsWithChildren> = (
    project
) => {
    const isOddIndex = project.index % 2 === 0;
    const t = useTranslations('ProjectListSection');

    return (
        <li
            className={twMerge(
                'w-full flex text-[#444444]',
                isOddIndex ? 'flex-row' : 'flex-row-reverse'
            )}
        >
            <div
                className=" w-full h-[85vh] grid place-items-center"
                style={{
                    background:
                        PROJECT_GRADIENT_COLORS[
                            getProjectGradient(project.index)
                        ],
                }}
            >
                <div className="relative overflow-hidden rounded-xl w-4/5 aspect-video  shadow-xl">
                    <Slider images={project.screenshots} />
                </div>
            </div>
            <div className="w-full relative overflow-hidden grid place-items-center">
                <div
                    className={twMerge(
                        'z-10 w-4/5 grid gap-4 max-w-[35rem]',
                        isOddIndex ? 'place-items-start' : 'place-items-end'
                    )}
                    data-aos={isOddIndex ? 'fade-right' : 'fade-left'}
                    data-aos-delay="300"
                    data-aos-duration="900"
                >
                    <h1 className="text-4xl font-medium w-full">
                        {project.title}
                    </h1>
                    <p className="">
                        {
                            project.description[
                                t(
                                    'project_description_lang'
                                ) as keyof typeof project.description
                            ]
                        }
                    </p>

                    <div className="contents">
                        {project.deployUrl && (
                            <Link
                                href={project.deployUrl}
                                className="w-full flex gap-3 items-center font-medium"
                            >
                                Demo Url
                                <LinkIcon />
                            </Link>
                        )}
                        {project.repositoryUrl && (
                            <Link
                                href={project.repositoryUrl}
                                className="w-full flex gap-3 items-center font-medium"
                            >
                                Repository Url
                                <GitHubIcon />
                            </Link>
                        )}
                    </div>

                    {project.children}
                </div>
                <p className="text-[115vh] leading-[85vh] absolute left-1/2 -translate-x-1/2 m-0 p-0 uppercase text-white text-shadow font-medium">
                    {project.title[0]}
                </p>
            </div>
        </li>
    );
};
