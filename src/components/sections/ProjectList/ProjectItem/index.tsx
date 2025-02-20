import { Slider } from '@/components/Slider';
import { ProjectType } from '@/types';
import { PROJECT_GRADIENT_COLORS } from '@/utils/constants';
import { getProjectGradient } from '@/utils/functions';
import { useTranslations } from 'next-intl';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import { useWindowResize } from '@/hooks/useWindowResize';
import { ProjectItemLink } from './ProjectItemLink';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useProjectItem } from './useProjectItem';
import { createPortal } from 'react-dom';

const aosPackProps: Record<string, string> = {
    'data-aos': 'zoom-in',
    'data-aos-delay': '300',
    'data-aos-duration': '600',
    'data-aos-once': 'true',
};

const randomVideoUrl =
    'https://player.vimeo.com/video/723658039?h=57b6d0ac88&color=ffffff&byline=0&portrait=0';

export const ProjectItem: React.FC<
    React.PropsWithChildren & { index: number; project: ProjectType }
> = (props) => {
    const isOddIndex = props.index % 2 === 0;
    const t = useTranslations('ProjectListSection');
    const [windowWidth] = useWindowResize();
    const hook = useProjectItem();

    return (
        <li className="max-lg:static max-lg:px-4 min-lg:h-screen sticky top-0">
            <article
                className={twMerge(
                    'max-lg:flex-col max-lg:gap-5 size-full flex text-dark-font bg-white',
                    isOddIndex ? 'flex-row' : 'flex-row-reverse'
                )}
            >
                <div
                    className={twMerge(
                        'max-lg:rounded-xl max-lg:shadow-[0_0.5rem_1rem_#00000055] size-full grid place-items-center overflow-hidden z-20',
                        windowWidth > 1024 &&
                            PROJECT_GRADIENT_COLORS[
                                getProjectGradient(props.index)
                            ]
                    )}
                >
                    <div className="min-lg:w-4/5 min-lg:overflow-hidden min-lg:rounded-xl relative  aspect-video  shadow-xl slide-container">
                        <Slider images={props.project.screenshots} />
                    </div>
                </div>
                <div className="w-full relative overflow-hiddens grid place-items-center">
                    <div
                        className={twMerge(
                            'z-10 w-full grid gap-4 p-4 max-w-[35rem] opacity-0 project-content',
                            isOddIndex
                                ? '-translate-x-full'
                                : 'translate-x-full'
                        )}
                        {...(windowWidth < 1024 ? aosPackProps : {})}
                    >
                        <h1 className="text-3xl font-medium w-full">
                            {props.project.title}
                        </h1>
                        <p className="">
                            {
                                props.project.description[
                                    t(
                                        'project_description_lang'
                                    ) as keyof typeof props.project.description
                                ]
                            }
                        </p>

                        <div className="">
                            {props.project.videoUrl && (
                                <button
                                    className="w-full flex gap-3 items-center font-medium p-2 cursor-pointer"
                                    onClick={hook.showVideo}
                                >
                                    {t('project_video_url')}
                                    <PlayCircleFilledIcon />
                                </button>
                            )}
                            {props.project.deployUrl && (
                                <ProjectItemLink href={props.project.deployUrl}>
                                    {t('project_demo_url')}
                                    <LinkIcon />
                                </ProjectItemLink>
                            )}
                            {props.project.repositoryUrl && (
                                <ProjectItemLink
                                    href={props.project.repositoryUrl}
                                >
                                    {t('project_repo_url')}
                                    <GitHubIcon />
                                </ProjectItemLink>
                            )}
                        </div>

                        {props.children}
                    </div>
                    <div className="absolute inset-0 overflow-hidden">
                        <p className="max-lg:hidden text-[115vh] leading-[85vh] absolute top-1/2 left-1/2 -translate-1/2 m-0 p-0 uppercase text-white text-shadow pointer-events-none">
                            {props.project.title[0]}
                        </p>
                    </div>
                </div>
            </article>

            {hook.videoVisibility &&
                createPortal(
                    <div
                        className="grid place-items-center fixed inset-0 bg-[#00000070] z-[9999]"
                        onClick={hook.hiddenVideo}
                    >
                        <div
                            data-tip-content={t('project_video_container_tip')}
                            className="size-fit relative after:absolute after:top-[calc(100%+2rem)] after:left-[50%] after:-translate-x-1/2 after:content-[attr(data-tip-content)] after:bg-secondary-black after:text-white after:text-xl after:font-medium after:p-[0.5rem_1rem]"
                        >
                            <iframe
                                className="w-[1000px] aspect-video bg-transparent max-lg:w-full"
                                title="project video"
                                src={props.project.videoUrl || randomVideoUrl}
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>,
                    document.getElementById('portal-destination') ||
                        document.body
                )}
        </li>
    );
};
