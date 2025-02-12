import { ProjectType } from '@/types';
import { PROJECT_GRADIENT_COLORS } from '@/utils/constants';
import { getProjectGradient } from '@/utils/function';
import { twMerge } from 'tailwind-merge';

export const ProjectItem: React.FC<ProjectType> = (project) => {
    return (
        <li
            className={twMerge(
                'w-full flex',
                project.index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            )}
        >
            <div
                className=" w-full h-[85vh]"
                style={{
                    backgroundColor:
                        PROJECT_GRADIENT_COLORS[
                            getProjectGradient(project.index)
                        ][0],
                }}
            ></div>
            <div className="w-full relative overflow-hidden grid place-items-center">
                <div className="z-10 w-4/5">
                    <h1 className="text-4xl font-medium">{project.title}</h1>
                    <p className="">{project.description.en}</p>
                </div>
                <p className="text-[115vh] leading-[85vh] absolute left-1/2 -translate-x-1/2 m-0 p-0 uppercase text-white text-shadow font-medium">
                    {project.title[0]}
                </p>
            </div>
        </li>
    );
};
