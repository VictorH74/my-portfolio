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

export const ProjectItem: React.FC<
    React.PropsWithChildren & { index: number; project: ProjectType }
> = (props) => {
    const isOddIndex = props.index % 2 === 0;
    const t = useTranslations('ProjectListSection');

    return (
        <article
            className={twMerge(
                'absolute inset-0 h-full flex text-[#444444] bg-white',
                isOddIndex ? 'flex-row' : 'flex-row-reverse'
            )}
            style={{
                animationTimeline:
                    props.index < 2
                        ? '--scroller-2'
                        : '--scroller-' + (props.index + 1),
            }}
        >
            <div
                className="size-full grid place-items-center overflow-hidden"
                style={{
                    background:
                        PROJECT_GRADIENT_COLORS[
                            getProjectGradient(props.index)
                        ],
                }}
            >
                <div className="relative overflow-hidden rounded-xl w-4/5 aspect-video  shadow-xl slide-container">
                    <Slider images={props.project.screenshots} />
                </div>
            </div>
            <div className="w-full relative overflow-hidden grid place-items-center">
                <div
                    className={twMerge(
                        'z-10 w-4/5 grid gap-4 max-w-[35rem] project-content',
                        isOddIndex ? 'place-items-start' : 'place-items-end'
                    )}
                    style={
                        {
                            animationTimeline:
                                props.index < 2
                                    ? '--scroller-2'
                                    : '--scroller-' + (props.index + 1),
                            '--content-origin': isOddIndex
                                ? '-100% 0'
                                : '100% 0',
                            animationRange:
                                props.index === 0
                                    ? 'entry -180% entry 20%'
                                    : 'entry 50% entry 150%',
                        } as React.CSSProperties
                    }
                >
                    <h1 className="text-4xl font-medium w-full">
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

                    <div className="contents">
                        {props.project.deployUrl && (
                            <Link
                                href={props.project.deployUrl}
                                className="w-full flex gap-3 items-center font-medium"
                            >
                                Demo Url
                                <LinkIcon />
                            </Link>
                        )}
                        {props.project.repositoryUrl && (
                            <Link
                                href={props.project.repositoryUrl}
                                className="w-full flex gap-3 items-center font-medium"
                            >
                                Repository Url
                                <GitHubIcon />
                            </Link>
                        )}
                    </div>

                    {props.children}
                </div>
                <p className="text-[115vh] leading-[85vh] absolute left-1/2 -translate-x-1/2 m-0 p-0 uppercase text-white text-shadow font-medium">
                    {props.project.title[0]}
                </p>
            </div>
        </article>
    );
};
