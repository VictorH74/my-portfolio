'use client';
import ModalContainer from '@/components/ModalContainer';
import useCreateUpdateModal, {
    CreateUpdateProjectModalProps,
} from './useCreateUpdateProjectModal';
import Image from 'next/image';
import TextArea from '@/components/TextArea';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { twMerge } from 'tailwind-merge';
import ReorderIcon from '@mui/icons-material/Reorder';
import ReordableModal from '@/app/[locale]/admin/AdminHome/ReordableModal';
import ProjectTechList from './ProjectTechList';
import ProjectScreenshotList from './ProjectScreenshotList';
import { LANGUAGES } from '@/utils/server-constants';
import ProjectDescriptionField from './ProjectDescriptionField';

export default function CreateUpdateProjectModal(
    props: CreateUpdateProjectModalProps
) {
    const hook = useCreateUpdateModal(props);

    const removeScreenshot = React.useCallback(
        (index: number) => {
            hook.setProjectScreenshots((prev) => {
                if (
                    props.project &&
                    !(prev[index] instanceof File) &&
                    typeof prev[index] === 'object' &&
                    Object.hasOwn(prev[index], 'url')
                ) {
                    hook.setOnRemoveScreenshotNames((rPrev) => [
                        ...rPrev,
                        prev[index].name,
                    ]);
                }
                return prev.filter((_, index) => index !== index);
            });
        },
        [hook, props.project]
    );

    const removeTechByName = React.useCallback(
        (techName: string) => {
            const technologies = (hook.project.technologies || []).filter(
                (t) => t !== techName
            );
            hook.setProject((prev) => ({
                ...prev,
                technologies,
            }));
        },
        [hook]
    );

    return (
        <>
            <ModalContainer>
                <div className="bg-gray-200 dark:bg-[#3f3f3f] w-full max-w-[1000px] rounded-md p-3 animate-scale">
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
                            <div className="flex flex-col justify-evenly px-2">
                                <div className="relative">
                                    <label
                                        htmlFor="upload-img"
                                        className="px-6 cursor-pointer"
                                    >
                                        <AddPhotoAlternateIcon
                                            sx={{ fontSize: 35 }}
                                        />
                                    </label>
                                    <input
                                        onChange={hook.handleSelectChange}
                                        className="absolute pointer-events-none opacity-0"
                                        multiple
                                        type="file"
                                        accept=".webp,.png,.jpg,.jpeg"
                                        name=""
                                        id="upload-img"
                                    />
                                </div>
                                {hook.projectScreenshotUrls.length > 1 && (
                                    <button
                                        onClick={() =>
                                            hook.setOnReorderScreenshots(true)
                                        }
                                        type="button"
                                    >
                                        <ReorderIcon sx={{ fontSize: 35 }} />
                                    </button>
                                )}
                            </div>

                            <ProjectScreenshotList
                                projectScreenshotUrls={
                                    hook.projectScreenshotUrls
                                }
                                replaceScreenshotFunc={hook.replaceScreenshot}
                                removeScreenshotFunc={hook.removeScreenshot}
                                onScreenshotClick={removeScreenshot}
                            />
                        </div>

                        {/* TODO: implement diviser component */}
                        {/* Diviser */}
                        <div className="h-[2px] w-full bg-slate-300 my-6" />

                        <div className="flex flex-col gap-3">
                            <div>
                                <label htmlFor="title">Title:</label>
                                <TextArea
                                    required
                                    id="title"
                                    className="w-full"
                                    value={hook.project.title || ''}
                                    placeholder="New title"
                                    onChange={(v) =>
                                        hook.updateProjectProps('title', v)
                                    }
                                />
                            </div>

                            {/* TODO: implement component to below */}
                            <div>
                                <p>Description:</p>
                                {LANGUAGES.map((lang) => (
                                    <ProjectDescriptionField
                                        key={lang}
                                        lang={lang}
                                        onChange={(value) =>
                                            hook.updateDescription(lang, value)
                                        }
                                        value={
                                            hook.project.description?.[lang] ??
                                            ''
                                        }
                                    />
                                ))}
                            </div>

                            {[
                                { id: 'deployUrl', label: 'Deploy URL' },
                                {
                                    id: 'repositoryUrl',
                                    label: 'Repository URL',
                                },
                                { id: 'videoUrl', label: 'Video Demo URL' },
                            ].map((obj) => (
                                <div key={obj.id}>
                                    <label htmlFor={obj.id}>{obj.label}:</label>
                                    <input
                                        id={obj.id}
                                        className="shadow-lg bg-[#444444] p-2 rounded-md outline-blue-500 autofill:none resize-none overflow-hidden w-full"
                                        type="url"
                                        value={
                                            (hook.project?.[
                                                obj.id as keyof typeof hook.project
                                            ] as string) || ''
                                        }
                                        placeholder={`New ${obj.label}`}
                                        onChange={(e) =>
                                            hook.updateProjectProps(
                                                obj.id as keyof typeof hook.project,
                                                e.currentTarget.value || ''
                                            )
                                        }
                                    />
                                </div>
                            ))}

                            <div>
                                <label htmlFor="technologies">
                                    Technologies:
                                </label>

                                <ProjectTechList
                                    techArray={hook.project.technologies}
                                    onRemoveTechItem={removeTechByName}
                                />

                                <div className="relative w-full">
                                    <span
                                        ref={hook.wordSufixSpanRef}
                                        className={twMerge(
                                            'absolute inset-y-0 pointer-events-none py-2 text-gray-400 opacity-0',
                                            !!hook.trieSufix && 'opacity-100'
                                        )}
                                    >
                                        {hook.trieSufix}
                                        <span className="ml-1 border rounded-sm py-[2px] px-1 border-gray-400 text-sm font-semibold">
                                            Tab
                                        </span>
                                    </span>
                                    <input
                                        ref={hook.techInputRef}
                                        autoComplete="off"
                                        id="technologies"
                                        className="shadow-lg bg-[#444444] p-2 rounded-md outline-blue-500 resize-none overflow-hidden w-full"
                                        value={hook.technologieValue}
                                        placeholder="New technologie"
                                        disabled={hook.emptyTechArray}
                                        onKeyDown={(e) => {
                                            if (e.code === 'Tab') {
                                                const technologies =
                                                    hook.project.technologies ||
                                                    [];

                                                if (
                                                    hook.trieSufix !== undefined
                                                ) {
                                                    const newValue =
                                                        hook.technologieValue +
                                                        hook.trieSufix;
                                                    if (
                                                        technologies.includes(
                                                            newValue
                                                        )
                                                    )
                                                        return;
                                                    hook.setProject((prev) => ({
                                                        ...prev,
                                                        technologies: [
                                                            ...technologies,
                                                            newValue.toLowerCase(),
                                                        ],
                                                    }));
                                                    hook.setTechnologieValue(
                                                        ''
                                                    );
                                                    hook.setTrieSufix(
                                                        undefined
                                                    );
                                                    e.preventDefault();
                                                }
                                            }
                                        }}
                                        onChange={(e) => {
                                            const value = e.currentTarget.value;
                                            if (value.length <= 20)
                                                hook.setTechnologieValue(
                                                    e.currentTarget.value
                                                );
                                        }}
                                    />
                                </div>
                            </div>

                            <button
                                disabled={hook.isSubmitting}
                                type="submit"
                                className="hover:brightness-105 duration-250 font-semibold p-2 rounded-md mt-4 bg-[var(--theme-color)]"
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
            {hook.onReorderScreenshots && (
                <ReordableModal
                    onSubmit={hook.reorderScreenshots}
                    items={hook.projectScreenshots.map(({ name }, index) => ({
                        id: String(index),
                        value: name,
                    }))}
                    onClose={() => hook.setOnReorderScreenshots(false)}
                >
                    {(item) => (
                        <div
                            key={item.id}
                            className="flex justify-between p-2 items-center"
                        >
                            <p className="truncate">{item.value}</p>
                            <Image
                                width={300}
                                height={113}
                                className="rounded-md w-auto h-[70px]"
                                alt="screeshot"
                                src={
                                    hook.projectScreenshotUrls[Number(item.id)]
                                }
                            />
                        </div>
                    )}
                </ReordableModal>
            )}
        </>
    );
}
