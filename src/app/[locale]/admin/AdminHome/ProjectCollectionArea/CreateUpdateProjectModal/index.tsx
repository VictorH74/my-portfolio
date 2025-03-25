'use client';
import { Divider } from '@/components/Divider';
import { ModalContainer } from '@/components/ModalContainer';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { ProjectDescriptionFieldList } from './ProjectDescriptionFieldList';
import { ProjectScreenshotList } from './ProjectScreenshotList';
import { ProjectScreenshotListActions } from './ProjectScreenshotListActions';
import { ProjectTechList } from './ProjectTechList';
import { ProjectTechValueField } from './ProjectTechValueField';
import { ProjectUrlFields } from './ProjectUrlFields';
import {
    useCreateUpdateProjectModal,
    CreateUpdateProjectModalProps,
} from './useCreateUpdateProjectModal';

export const CreateUpdateProjectModal = (
    props: CreateUpdateProjectModalProps
) => {
    const hook = useCreateUpdateProjectModal(props);

    return (
        <>
            <ModalContainer onClose={props.onClose}>
                <div
                    className="bg-gray-200 w-full max-w-[1000px] rounded-md p-3 animate-scale"
                    onMouseDown={(e) => {
                        e.stopPropagation();
                    }}
                    onMouseUp={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="text-right py-2">
                        <button onClick={props.onClose}>
                            <CloseIcon />
                        </button>
                    </div>

                    <form onSubmit={hook.handleSubmit}>
                        <div
                            className={twMerge(
                                'flex flex-row bg-black/20 py-2 min-h-[200px]',
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
                                replaceScreenshotFunc={hook.replaceScreenshot}
                                removeScreenshotFunc={hook.removeScreenshot}
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
                                className="hover:brightness-105 duration-250 font-semibold p-2 rounded-md mt-4 bg-gray-500 text-white"
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
