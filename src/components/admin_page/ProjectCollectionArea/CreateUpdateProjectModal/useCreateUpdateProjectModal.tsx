import { projectService } from '@/di/container';
import { useGlobalTechnologyList } from '@/hooks/useGlobalTechnologyList';
import { getProjectImgFolderName } from '@/lib/firebase/client';
import { LangType } from '@/types/generic';
import {
    CreateUpdateProjectType,
    ProjectType,
    ScreenshotType,
} from '@/types/project';
import { FirebaseError } from 'firebase/app';
import React from 'react';

import { OutputReordableItemType } from '../../ReordableModal';

const UrlProps = ['deployUrl', 'repositoryUrl', 'videoUrl'] as const;

type ImageDeviceT = 'desktop' | 'mobile';

export interface CreateUpdateProjectModalProps {
    project?: ProjectType;
    projectIndex?: number;
    onClose(): void;
}

export const useCreateUpdateProjectModal = (
    props: CreateUpdateProjectModalProps
) => {
    const [project, setProject] = React.useState<CreateUpdateProjectType>({
        description: { en: '', 'pt-br': '' },
        desktopImages: [],
        mobileImages: [],
        technologies: [],
        title: '',
    });
    const [onRemoveImageNames, setOnRemoveImageNames] = React.useState<
        Record<ImageDeviceT, string[]>
    >({
        desktop: [],
        mobile: [],
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    // const [projectScreenshots, setProjectScreenshots] = React.useState<
    //     Array<ScreenshotType | File>
    // >([]);
    const [projectDesktopImages, setProjectDesktopImages] = React.useState<
        Array<ScreenshotType | File>
    >([]);
    const [projectMobileImages, setProjectMobileImages] = React.useState<
        Array<ScreenshotType | File>
    >([]);
    const [onReorderTechList, setOnReorderTechList] = React.useState(false);

    const projectScreenshotUrls = React.useMemo<string[]>(
        () =>
            projectDesktopImages.map((img) =>
                img instanceof File ? URL.createObjectURL(img) : img.url
            ),
        [projectDesktopImages]
    );

    const { technologyList } = useGlobalTechnologyList();

    React.useEffect(() => {
        if (props.project) {
            setProjectDesktopImages([...props.project.desktopImages]);
            setProjectMobileImages([...props.project.mobileImages]);
            setProject({
                ...props.project,
                description: {
                    en: props.project.description.en!.replaceAll('<br>', '\n'),
                    'pt-br': props.project.description['pt-br']!.replaceAll(
                        '<br>',
                        '\n'
                    ),
                },
            });
        }
    }, [props.project, technologyList]);

    const updateTechList = (list: ProjectType['technologies']) => {
        setProject((prev) => ({ ...prev, technologies: list }));
    };

    const updateProjectProps = (prop: keyof ProjectType, value: string) =>
        setProject((prev) => ({ ...prev, [prop]: value }));

    const updateDescription = (lang: LangType, value: string) => {
        const prevDesc = project?.description;
        setProject((prev) => ({
            ...prev,
            description: { ...prevDesc, [lang]: value },
        }));
    };

    const isUpdatedDescription = (
        oldDesc: ProjectType['description'],
        newDesc: ProjectType['description']
    ) => {
        const toStr = (v: object) => Object.values(v).join('');
        return toStr(oldDesc) !== toStr(newDesc);
    };

    // TODO: validate field data with react-form
    const validateProjectFieldData = (
        projectRest: Omit<
            typeof project,
            'desktopImages' | 'mobileImages' | 'screenshots'
        >
    ) => {
        const propProject = props.project!;

        const validatedData: Record<string, object | string> = {};

        Object.entries(projectRest).forEach(([currentKey, currentValue]) => {
            if (typeof currentValue === 'string') {
                const prevValue = propProject[currentKey as keyof ProjectType];
                if (currentValue !== prevValue) {
                    validatedData[currentKey] = currentValue;
                }
            } else if (typeof currentValue !== 'number')
                (
                    ({
                        description: () => {
                            if (
                                isUpdatedDescription(
                                    projectRest.description,
                                    propProject.description
                                )
                            ) {
                                const value =
                                    currentValue as ProjectType['description'];

                                const formatDescription = (str: string) =>
                                    str.replaceAll('\n', '<br>');

                                validatedData['description'] = {
                                    en: formatDescription(value.en!),
                                    'pt-br': formatDescription(value['pt-br']!),
                                };
                            }
                        },
                        technologies: () => {
                            if (
                                projectRest.technologies.join('') !==
                                propProject.technologies.join('')
                            )
                                validatedData['technologies'] = currentValue;
                        },
                    }) as Record<string, () => void>
                )[currentKey]();
        });

        return validatedData;
    };

    const updateImages = async (
        images: (ScreenshotType | File)[],
        projectId: ProjectType['id'],
        projectTitle: ProjectType['title'],
        imageDevice: ImageDeviceT
    ) => {
        const updatedImages = [...images];
        const promises: Promise<void>[] = [];

        images.forEach((img, i) => {
            if (img instanceof File) {
                promises.push(
                    (async () => {
                        const imageName = imageDevice.concat(
                            `_${projectTitle.replaceAll(' ', '_')}-${i}`
                        );

                        const url = await projectService.uploadImage(
                            img,
                            projectId,
                            projectTitle,
                            imageName
                        );
                        if (!url) throw 'Error on upload image';

                        updatedImages[i] = {
                            url,
                            name: imageName,
                        };
                    })()
                );
            }
        });

        await Promise.all(promises);

        // remove deleted desktopImages or mobileImages from storage
        if (onRemoveImageNames[imageDevice].length > 0 && props.project?.id) {
            const updatedImageNames = updatedImages.map((s) => s.name);

            const { id, title } = props.project;

            const deletableImagePathnames = onRemoveImageNames[
                imageDevice
            ].reduce<string[]>((list, currName) => {
                if (!updatedImageNames.includes(currName)) {
                    list.push(
                        `${getProjectImgFolderName(id, title)}/${currName}`
                    );
                }
                return list;
            }, []);

            projectService.deleteImage(deletableImagePathnames);
        }
        // console.log(updatedScreenshots)
        return updatedImages as ScreenshotType[];
    };

    const handleSelectDesktopImages = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const fileInput = e.target;
        const files = fileInput.files;
        if (files)
            setProjectDesktopImages((prev) => [...prev, ...Array.from(files)]);
    };

    const handleSelectMobileImages = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const fileInput = e.target;
        const files = fileInput.files;
        if (files)
            setProjectMobileImages((prev) => [...prev, ...Array.from(files)]);
    };

    const makeReplaceDesktopImage =
        (imageIndex: number) => (files: FileList | null) => {
            if (files)
                setProjectDesktopImages((prev) =>
                    prev.map((s, i) => {
                        if (i == imageIndex) {
                            return files[0];
                        }
                        return s;
                    })
                );
        };
    const makeReplaceMobileImage =
        (imageIndex: number) => (files: FileList | null) => {
            if (files)
                setProjectMobileImages((prev) =>
                    prev.map((s, i) => {
                        if (i == imageIndex) {
                            return files[0];
                        }
                        return s;
                    })
                );
        };

    const makeRemoveDesktopImage = (imageIndex: number) => () => {
        const onRemoveScreenshot = projectDesktopImages[imageIndex];
        if (!(onRemoveScreenshot instanceof File))
            setOnRemoveImageNames((prev) => ({
                ...prev,
                desktop: [...prev.desktop, onRemoveScreenshot.name],
            }));

        setProjectDesktopImages((prev) =>
            prev.filter((_, i) => i != imageIndex)
        );
    };

    const makeRemoveMobileImage = (imageIndex: number) => () => {
        const onRemoveScreenshot = projectDesktopImages[imageIndex];
        if (!(onRemoveScreenshot instanceof File))
            setOnRemoveImageNames((prev) => ({
                ...prev,
                mobile: [...prev.mobile, onRemoveScreenshot.name],
            }));

        setProjectMobileImages((prev) =>
            prev.filter((_, i) => i != imageIndex)
        );
    };

    const updateProject = async (
        prevProjectData: ProjectType,
        rest: Omit<
            ProjectType,
            'id' | 'index' | 'desktopImages' | 'mobileImages'
        > & {
            id?: string;
        }
    ) => {
        const validatedProjectData = validateProjectFieldData(rest);

        // if project desktopImages has changed
        let projectDesktopImagesHasChanged: boolean | undefined = false;
        if (projectDesktopImages.length > 0)
            projectDesktopImagesHasChanged = (() => {
                const prevImages = prevProjectData.desktopImages;

                if (prevImages.length !== projectDesktopImages.length)
                    return true;

                let changed;
                for (let i = 0; i < projectDesktopImages.length; i++) {
                    const s = projectDesktopImages[i];

                    const isRecentFile = s instanceof File;
                    if (isRecentFile || s.url !== prevImages[i].url) {
                        changed = true;
                        break;
                    }
                }

                return changed;
            })();

        // if project mobileImages has changed
        let projectMobileImagesHasChanged: boolean | undefined = false;
        if (projectMobileImages.length > 0)
            projectMobileImagesHasChanged = (() => {
                const prevImages = prevProjectData.mobileImages;

                if (prevImages.length !== projectMobileImages.length)
                    return true;

                let changed;
                for (let i = 0; i < projectMobileImages.length; i++) {
                    const s = projectMobileImages[i];

                    const isRecentFile = s instanceof File;
                    if (isRecentFile || s.url !== prevImages[i].url) {
                        changed = true;
                        break;
                    }
                }

                return changed;
            })();

        await Promise.all([
            (async () => {
                if (projectDesktopImagesHasChanged)
                    validatedProjectData.desktopImages = await updateImages(
                        projectDesktopImages,
                        prevProjectData.id,
                        prevProjectData.title,
                        'desktop'
                    );
            })(),
            (async () => {
                if (projectMobileImagesHasChanged)
                    validatedProjectData.mobileImages = await updateImages(
                        projectMobileImages,
                        prevProjectData.id,
                        prevProjectData.title,
                        'mobile'
                    );
            })(),
        ]);

        const notProjectDataChanged =
            Object.values(validatedProjectData).length === 0;
        if (notProjectDataChanged) return;

        // console.log({ ...validatedProjectData, updatedAt: new Date().toISOString() })

        await projectService.updateProject(
            prevProjectData.id,
            validatedProjectData
        );
    };

    const createProject = async () => {
        const { title, description, technologies } = project;

        UrlProps.forEach((key) => {
            const urlValue = project[key];
            if (urlValue) new URL(urlValue);
        });

        // Check empty values
        const { en } = description;
        if (
            !title ||
            !en ||
            technologies.length === 0 ||
            projectDesktopImages.length === 0
        ) {
            alert(
                'Required: A new project must contain at least one screenshot and technologie'
            );
            return;
        }

        const futureProjectId = projectService.generateId();

        const [desktopImages, mobileImages] = await Promise.all([
            updateImages(
                projectDesktopImages,
                futureProjectId,
                project.title,
                'desktop'
            ),
            updateImages(
                projectDesktopImages,
                futureProjectId,
                project.title,
                'mobile'
            ),
        ]);

        await projectService.createProject({
            ...project,
            id: futureProjectId,
            desktopImages,
            mobileImages,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const {
            desktopImages: _,
            mobileImages: __,
            screenshots: ___,
            ...rest
        } = project;
        const propProject = props.project;

        try {
            if (propProject) {
                await updateProject(propProject, rest);
            } else {
                await createProject();
            }
            props.onClose();
        } catch (e) {
            if (e instanceof FirebaseError) {
                alert(e.message);
            }
            console.error(e);
            console.log(e instanceof FirebaseError);
            alert(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    const reorderDesktopImages = async (items: OutputReordableItemType[]) => {
        setProjectDesktopImages((prev) =>
            items.map((item) => prev[item.prevIndex])
        );
    };

    const reorderMobileImages = async (items: OutputReordableItemType[]) => {
        setProjectMobileImages((prev) =>
            items.map((item) => prev[item.prevIndex])
        );
    };

    const removeTechByName = React.useCallback(
        (techName: string) => {
            const technologies = (project.technologies || []).filter(
                (t) => t !== techName
            );
            setProject((prev) => ({
                ...prev,
                technologies,
            }));
        },
        [project.technologies]
    );

    return {
        handleSubmit,
        projectScreenshots: projectDesktopImages,
        handleSelectDesktopImages,
        handleSelectMobileImages,
        makeReplaceDesktopImage,
        makeReplaceMobileImage,
        makeRemoveDesktopImage,
        makeRemoveMobileImage,
        updateProjectProps,
        updateDescription,
        onReorderTechList,
        setOnReorderTechList,
        project,
        updateTechList,
        setProject,
        isSubmitting,
        projectScreenshotUrls,
        reorderDesktopImages,
        reorderMobileImages,
        removeTechByName,
    };
};
