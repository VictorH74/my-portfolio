import { ProjectType } from '@/types';
import { PROJECT_GRADIENT_COLORS } from '@/utils/constants';
import { getProjectGradient } from '@/utils/function';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export const ProjectItem: React.FC<ProjectType & React.PropsWithChildren> = (
    project
) => {
    const isOddIndex = project.index % 2 === 0;

    return (
        <li
            className={twMerge(
                'w-full flex text-[#444444]',
                isOddIndex ? 'flex-row' : 'flex-row-reverse'
            )}
        >
            <div
                className=" w-full h-[85vh]"
                style={{
                    background:
                        PROJECT_GRADIENT_COLORS[
                            getProjectGradient(project.index)
                        ],
                }}
            ></div>
            <div className="w-full relative overflow-hidden grid place-items-center">
                <div
                    className={twMerge(
                        'z-10 w-4/5 grid space-y-4',
                        isOddIndex ? 'place-items-start' : 'place-items-end'
                    )}
                >
                    <h1 className="text-4xl font-medium w-full max-w-[35rem]">
                        {project.title}
                    </h1>
                    <p className="max-w-[35rem]">{project.description.en}</p>
                    {project.children}
                </div>
                <p className="text-[115vh] leading-[85vh] absolute left-1/2 -translate-x-1/2 m-0 p-0 uppercase text-white text-shadow font-medium">
                    {project.title[0]}
                </p>
            </div>
        </li>
    );
};
