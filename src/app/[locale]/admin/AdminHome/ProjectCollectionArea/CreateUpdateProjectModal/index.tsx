'use client';
import { Divider } from '@/components/Divider';
import { ModalContainer } from '@/components/ModalContainer';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { ProjectDescriptionFieldList } from './components/ProjectDescriptionFieldList';
import { ProjectScreenshotList } from './components/ProjectScreenshotList';
import { ProjectScreenshotListActions } from './components/ProjectScreenshotListActions';
import { ProjectTechList } from './components/ProjectTechList';
import { ProjectTechValueField } from './components/ProjectTechValueField';
import { ProjectUrlFields } from './components/ProjectUrlFields';
import {
    useCreateUpdateProjectModal,
    CreateUpdateProjectModalProps,
} from './useCreateUpdateProjectModal';
import { CloseButton } from '../../components/CloseButton';

export const CreateUpdateProjectModal = (
    props: CreateUpdateProjectModalProps
) => {
    const hook = useCreateUpdateProjectModal(props);

    return (
        <>
            <ModalContainer onClose={props.onClose}>
                <div
                    className="bg-gray-200 w-full max-w-[900px] rounded-md px-6 pb-8 pt-2 animate-scale"
                    onMouseDown={(e) => {
                        e.stopPropagation();
                    }}
                    onMouseUp={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="text-right py-2">
                        <CloseButton onClick={props.onClose} />
                    </div>

                    <form onSubmit={hook.handleSubmit}>
                        <div
                            className={twMerge(
                                'py-2 min-h-[200px]',
                                hook.projectScreenshots.length > 0
                                    ? ''
                                    : 'justify-center'
                            )}
                        >
                            <ProjectScreenshotListActions
                                onReorderScreenshots={hook.reorderScreenshots}
                                onSelectChange={hook.handleSelectChange}
                                projectScreenshotUrls={
                                    hook.projectScreenshotUrls
                                }
                                projectScreenshots={hook.projectScreenshots}
                            />

                            <ProjectScreenshotList
                                projectScreenshotUrls={
                                    hook.projectScreenshotUrls
                                }
                                makeReplaceScreenshot={
                                    hook.makeReplaceScreenshot
                                }
                                makeRemoveScreenshot={hook.makeRemoveScreenshot}
                            />
                        </div>

                        <Divider className="bg-slate-300" />

                        <div className="flex flex-col gap-3">
                            <div>
                                <label htmlFor="title">Title:</label>
                                <textarea
                                    autoFocus
                                    required
                                    id="title"
                                    className="w-full field-sizing-content bg-gray-300 p-2"
                                    value={hook.project.title || ''}
                                    placeholder="New title"
                                    onChange={(e) => {
                                        hook.updateProjectProps(
                                            'title',
                                            e.currentTarget.value
                                        );
                                    }}
                                />
                            </div>

                            <div>
                                <p>Description:</p>
                                <ProjectDescriptionFieldList
                                    projectDescription={
                                        hook.project.description
                                    }
                                    onFieldChange={hook.updateDescription}
                                />
                            </div>

                            <div className="space-y-4">
                                <ProjectUrlFields
                                    value={(urlProp) =>
                                        hook.project?.[urlProp] ?? ''
                                    }
                                    onChange={hook.updateProjectProps}
                                />
                            </div>

                            <div>
                                <label htmlFor="technologies">
                                    Technologies:
                                </label>

                                <ProjectTechList
                                    techArray={hook.project.technologies}
                                    onRemoveTechItem={hook.removeTechByName}
                                />

                                <ProjectTechValueField
                                    projectTechnologies={
                                        hook.project.technologies
                                    }
                                    onFoundValue={(technologies) =>
                                        hook.setProject((prev) => ({
                                            ...prev,
                                            technologies,
                                        }))
                                    }
                                />
                            </div>

                            <button
                                disabled={hook.isSubmitting}
                                type="submit"
                                className="hover:brightness-105 duration-250 font-semibold p-2 rounded-md mt-4 bg-[#2382FF] text-white"
                            >
                                {props.project
                                    ? hook.isSubmitting
                                        ? 'Updating...'
                                        : 'Update'
                                    : hook.isSubmitting
                                    ? 'Creating...'
                                    : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </ModalContainer>
        </>
    );
};
