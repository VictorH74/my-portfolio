import { Loading } from '@/components/Loading';
import { ModalContainer } from '@/components/ModalContainer';
import { useAdminProjectList } from '@/hooks/useAdminProjectList';
import { TechnologyType } from '@/types';
import React from 'react';

interface RemoveTechConfirmModalProps {
    selectedOnRemoveTech: TechnologyType;
    removeTech: (cb?: () => Promise<void>) => Promise<void>;
    onClose(): void;
    removingTech: boolean;
}

export const RemoveTechConfirmModal: React.FC<RemoveTechConfirmModalProps> = (
    props
) => {
    const [projectNameList, setProjectNameList] = React.useState<string[]>([]);

    const { projects } = useAdminProjectList();

    React.useEffect(() => {
        setProjectNameList(
            projects
                .filter((p) =>
                    p.technologies.includes(props.selectedOnRemoveTech.id)
                )
                .map((p) => p.title)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateProjects = async () => {
        if (projectNameList.length > 0) {
            await fetch('api/projects/update-by-tech-id', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ techId: props.selectedOnRemoveTech.id }),
            });
        }

        props.onClose();
    };

    return (
        <ModalContainer onClose={props.onClose}>
            <div className="bg-gray-200 w-full max-w-[500px] rounded-md p-8 animate-scale text-dark-font flex flex-col gap-5 relative">
                <h2 className="text-2xl font-semibold">
                    Are you sure you want to remove this technology from your
                    collection?
                </h2>
                {projectNameList.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-yellow-900">
                            {projectNameList.length}/{projects.length} Projects
                            uses the selected technology:
                        </h3>
                        <ul>
                            {projectNameList.map((name, index) => (
                                <li key={name}>
                                    <p className="text-lg">
                                        {index + 1}. {name}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="space-x-2 text-end">
                    <button
                        className="py-3 px-6 bg-gray-300 font-semibold rounded-md hover:scale-105 duration-200 cursor-pointer"
                        onClick={props.onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="py-3 px-6 bg-red-400 text-white font-semibold rounded-md hover:scale-105 duration-200 cursor-pointer"
                        onClick={() => {
                            props.removeTech(updateProjects);
                        }}
                    >
                        Remove anyway
                    </button>
                </div>

                {props.removingTech && (
                    <div className="absolute inset-0 bg-black/30 grid place-items-center">
                        <Loading />
                    </div>
                )}
            </div>
        </ModalContainer>
    );
};
