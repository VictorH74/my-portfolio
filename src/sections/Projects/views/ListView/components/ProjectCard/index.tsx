'use client';
import React from 'react';
import LinkIcon from '@mui/icons-material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from 'next/image';
import useProjectCard from './useProjectCard';
import { ProjectType } from '@/types';
import Slider from '@/components/Slider';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useTranslations } from 'next-intl';

interface Props {
    index: number;
    project: ProjectType;
}

const randomVideoUrl =
    'https://player.vimeo.com/video/723658039?h=57b6d0ac88&color=ffffff&byline=0&portrait=0';

const ProjectCard: React.FC<Props> = ({ index, project }) => {
    const hook = useProjectCard(project);
    const t = useTranslations('project_card');

    const odd = index % 2 !== 0;
    const oddScreen1024 = odd && window.innerWidth > 1024;

    return (
        <div>
            {hook.video && (
                <div
                    className="grid place-items-center fixed inset-0 bg-[#00000070] z-[9999]"
                    onClick={hook.hiddenVideo}
                >
                    <iframe
                        className="w-[1000px] aspect-video bg-transparent max-lg:w-full"
                        title="project video"
                        src={project.videoUrl || randomVideoUrl}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )}
            <div
                className={`relative flex flex-col flex-wrap justify-between my-0 mx-[7%] ${
                    oddScreen1024 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                }`}
                data-aos="flip-up"
                data-aos-duration="600"
                data-aos-once="true"
            >
                <div className="relative overflow-hidden lg:w-1/2 rounded-xl w-full shadow-xl">
                    <Slider images={project.screenshots} />
                </div>

                <div
                    className={`w-full py-4 ${
                        oddScreen1024 ? 'text-end' : 'text-start'
                    } lg:w-[47%] py-5 px-7`}
                >
                    <h1
                        className={` text-xl ${
                            oddScreen1024 ? 'before:right-0' : 'before:left-0'
                        } primary-font-color`}
                    >
                        {project.title}
                    </h1>
                    <h2 className="mb-4 text-sm min-[700px]:text-base primary-font-color">
                        {
                            project.description[
                                t(
                                    'description_lang_prop'
                                ) as keyof typeof project.description
                            ]
                        }
                    </h2>

                    {project.videoUrl && (
                        <>
                            <button
                                onClick={hook.showVideo}
                                className="relative text-[var(--theme-color)]"
                            >
                                <p className="inline-block text-sm min-[700px]:text-lg">
                                    {t('play_video_demo_text')}
                                    &nbsp;&nbsp;
                                    <PlayCircleFilledIcon />
                                </p>
                            </button>
                            <br />
                        </>
                    )}

                    {project.deployUrl && (
                        <Link
                            color={hook.themeColor.color}
                            href={project.deployUrl}
                        >
                            {t('production_link_text')}&nbsp;&nbsp;
                            <LinkIcon />
                        </Link>
                    )}

                    {project.deployUrl && project.repositoryUrl && <br />}

                    {project.repositoryUrl && (
                        <Link
                            color={hook.themeColor.color}
                            href={project.repositoryUrl}
                        >
                            {t('repo_link_text')}&nbsp;&nbsp;
                            <GitHubIcon />
                        </Link>
                    )}

                    <div>
                        <h3 className="text-xl mt-2 primary-font-color">
                            {t('tech_list_title')}
                        </h3>
                        {!!hook.icons ? (
                            <ul
                                className={`flex w-max gap-2 ${
                                    oddScreen1024 && 'float-right'
                                } pt-1`}
                            >
                                {hook.icons.map(
                                    (icon) =>
                                        icon && (
                                            <li key={icon.id}>
                                                <Image
                                                    loading="lazy"
                                                    placeholder="empty"
                                                    height={25}
                                                    width={25}
                                                    src={icon.src}
                                                    alt={`${icon.id} icon`}
                                                />
                                            </li>
                                        )
                                )}
                            </ul>
                        ) : (
                            <p className="text-sm text-red-500 font-semibold">
                                {t('empty_tech_list_msg')}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Link: React.FC<{
    children: React.ReactNode[];
    href?: string;
    color: string;
    onClick?: () => void;
}> = (props) => (
    <a
        href={props.href}
        style={{ color: props.color }}
        className="relative"
        target="_blank"
        rel="noreferrer"
    >
        <p className="inline-block text-sm min-[700px]:text-lg">
            {props.children}
        </p>
    </a>
);

export default React.memo(ProjectCard);
