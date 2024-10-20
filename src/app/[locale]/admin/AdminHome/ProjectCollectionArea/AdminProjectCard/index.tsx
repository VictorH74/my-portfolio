'use client';
import { Divider } from '@/components/Divider';
import { ProjectType } from '@/types';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import Image from 'next/image';
import React from 'react';
import { createPortal } from 'react-dom';

import { ProjectCardHover } from './ProjectCardHover';
import { useAdminProjectCard } from './useAdminProjectCard';
import { CreateUpdateProjectModal } from '../CreateUpdateProjectModal';

const DateParagraph: React.FC<{ label: string; isoDate: string }> = ({
    label,
    isoDate,
}) => (
    <p className="text-sm font-semibold">
        {label} - {new Date(isoDate).toLocaleString()}{' '}
    </p>
);

export const AdminProjectCard = (props: ProjectType) => {
    const hook = useAdminProjectCard(props);

    return (
        <>
            <li
                className="relative w-[300px] h-96 shadow-lg bg-white dark:bg-[#3f3f3f] shrink-0 grow-0 rounded-md flex flex-col overflow-hidden select-none"
                onMouseOver={() => hook.setCardHover(true)}
                onMouseLeave={() => hook.setCardHover(false)}
            >
                <div className="w-[300px] h-[310px] overflow-hidden flex flex-nowrap text-center relative">
                    <Image
                        width={300}
                        height={113}
                        src={props.screenshots[0].url}
                        className="rounded-b-md object-cover size-auto"
                        alt="project screenshot"
                    />
                    {props.screenshots.length > 1 && (
                        <p className="absolute right-3 bottom-3 rounded-full size-7 text-sm font-semibold grid place-items-center bg-[var(--theme-color)]">
                            +{props.screenshots.length - 1}
                        </p>
                    )}
                </div>

                <div className="p-2 flex flex-col gap-2 h-full primary-font-color">
                    <h2 className="truncate text-lg font-semibold">
                        {props.title}
                    </h2>

                    <p className="truncate">{props.description.en}</p>

                    <div className="flex flex-row gap-2">
                        {props.deployUrl && <LinkIcon />}
                        {props.repositoryUrl && <GitHubIcon />}
                        {props.videoUrl && <PlayCircleFilledIcon />}
                    </div>

                    <Divider className="my-2 primary-bg-color" />

                    <div className="grow flex flex-wrap gap-2">
                        {hook.techSrcList.map((src, i) => (
                            <Image
                                height={20}
                                width={20}
                                key={i}
                                src={src}
                                alt="technology icon"
                            />
                        ))}
                    </div>

                    <div>
                        {props.createdAt && (
                            <DateParagraph
                                label="Created at"
                                isoDate={props.createdAt}
                            />
                        )}
                        {props.updatedAt && (
                            <DateParagraph
                                label="Updated at"
                                isoDate={props.updatedAt}
                            />
                        )}
                    </div>
                </div>

                <ProjectCardHover
                    show={hook.cardHover}
                    editFunc={hook.openEditModal}
                    removeFunc={hook.removeProject}
                />
            </li>

            {hook.onUpdateProject &&
                createPortal(
                    <CreateUpdateProjectModal
                        project={{ ...props }}
                        onClose={() => hook.setOnUpdateProject(false)}
                    />,
                    document.body
                )}
        </>
    );
};
