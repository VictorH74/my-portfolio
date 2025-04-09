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
        {label}: {new Date(isoDate).toLocaleString()}{' '}
    </p>
);

export const AdminProjectCard = (props: ProjectType) => {
    const hook = useAdminProjectCard(props);

    return (
        <>
            <li
                className="relative w-[300px] h-96 bg-gray-300 shrink-0 grow-0 rounded-md flex flex-col overflow-hidden select-none shadow-[0_3px_15px_#a7a7a7]"
                onMouseOver={() => hook.setCardHover(true)}
                onMouseLeave={() => hook.setCardHover(false)}
            >
                <div className="w-[300px] h-[310px] overflow-hidden flex flex-nowrap text-center relative">
                    <Image
                        fill
                        sizes="300px"
                        src={props.screenshots[0].url}
                        className="rounded-b-md w-full h-auto object-cover"
                        alt="project screenshot"
                    />
                    {props.screenshots.length > 1 && (
                        <p className="absolute right-3 bottom-3 rounded-full size-7 text-sm font-semibold grid place-items-center bg-gray-500 text-white">
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
                        <LinkIcon sx={hook.getLinkIconSx(props.deployUrl)} />
                        <GitHubIcon
                            sx={hook.getLinkIconSx(props.repositoryUrl)}
                        />
                        <PlayCircleFilledIcon
                            sx={hook.getLinkIconSx(props.videoUrl)}
                        />
                    </div>

                    <Divider className="my-2 primary-bg-color" />

                    <div className="grow flex flex-wrap gap-2">
                        {/* {hook.techSrcList.map((src, i) => (
                            <Image
                                height={20}
                                width={20}
                                key={i}
                                src={src}
                                alt="technology icon"
                            />
                        ))} */}
                    </div>

                    <div>
                        {props.createdAt && (
                            <DateParagraph
                                label="Created"
                                isoDate={props.createdAt}
                            />
                        )}
                        {props.updatedAt && (
                            <DateParagraph
                                label="Updated"
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
