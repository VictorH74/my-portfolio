/* eslint-disable react-hooks/exhaustive-deps */
import { db } from '@/configs/firebaseConfig';
import { useGlobalTechnologyList } from '@/hooks/useGlobalTechnologyList';
import {
    CreateUpdateProjectType,
    LangType,
    ProjectType,
    ScreenshotType,
} from '@/types';
import { FirebaseError } from 'firebase/app';
import {
    addDoc,
    collection,
    doc,
    runTransaction,
    updateDoc,
} from 'firebase/firestore';
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from 'firebase/storage';
import React from 'react';

import { OutputReordableItemType } from '../../components/ReordableModal';

const UrlProps = ['deployUrl', 'repositoryUrl', 'videoUrl'] as const;

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
        screenshots: [],
        technologies: [],
        title: '',
    });
    const [onRemoveScreenshotNames, setOnRemoveScreenshotNames] =
        React.useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [projectScreenshots, setProjectScreenshots] = React.useState<
        Array<ScreenshotType | File>
    >([]);
    const [onReorderTechList, setOnReorderTechList] = React.useState(false);

    const projectScreenshotUrls = React.useMemo<string[]>(
        () =>
            projectScreenshots.map((img) =>
                img instanceof File ? URL.createObjectURL(img) : img.url
            ),
        [projectScreenshots]
    );

    const { technologyList } = useGlobalTechnologyList();

    React.useEffect(() => {
        if (props.project) {
            setProjectScreenshots([...props.project.screenshots]);
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
    }, [technologyList]);

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
        projectRest: Omit<typeof project, 'screenshots'>
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

    const uploadScreenshots = async () => {
        const updatedScreenshots = [...projectScreenshots];
        const promises: Promise<void>[] = [];

        projectScreenshots.forEach((img, i) => {
            if (img instanceof File) {
                promises.push(
                    new Promise(async (resolve, reject) => {
                        const storage = getStorage();
                        const finalFileName = img.name
                            .split('.')
                            .slice(0, -1)
                            .join('.');
                        const storageRef = ref(
                            storage,
                            `project-images/${finalFileName}`
                        );
                        try {
                            // await formatScreenshot(img)

                            const snap = await uploadBytes(storageRef, img, {
                                contentType: 'image/webp',
                            });
                            const url = await getDownloadURL(snap.ref);
                            updatedScreenshots[i] = {
                                url,
                                name: snap.metadata.name,
                            };
                            resolve();
                        } catch (e) {
                            reject(e);
                        }
                    })
                );
            }
        });

        await Promise.all(promises);

        // remove deleted screenshots from storage
        if (onRemoveScreenshotNames.length > 0) {
            const updatedScreenshotNames = updatedScreenshots.map(
                (s) => s.name
            );
            const storage = getStorage();
            onRemoveScreenshotNames.forEach((imgName) => {
                if (!updatedScreenshotNames.includes(imgName)) {
                    const desertRef = ref(storage, `project-images/${imgName}`);
                    deleteObject(desertRef);
                }
            });
        }
        // console.log(updatedScreenshots)
        return updatedScreenshots;
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        const files = fileInput.files;
        if (files)
            setProjectScreenshots((prev) => [...prev, ...Array.from(files)]);
    };

    const makeReplaceScreenshot =
        (screenshotIndex: number) => (files: FileList | null) => {
            if (files)
                setProjectScreenshots((prev) =>
                    prev.map((s, i) => {
                        if (i == screenshotIndex) {
                            return files[0];
                        }
                        return s;
                    })
                );
        };

    const makeRemoveScreenshot = (screenshotIndex: number) => () => {
        const onRemoveScreenshot = projectScreenshots[screenshotIndex];
        if (!(onRemoveScreenshot instanceof File)) {
            setOnRemoveScreenshotNames((prev) => [
                ...prev,
                onRemoveScreenshot.name,
            ]);
        }
        setProjectScreenshots((prev) =>
            prev.filter((_, i) => i != screenshotIndex)
        );
    };

    const updateProject = async (
        prevProjectData: ProjectType,
        rest: Omit<ProjectType, 'id' | 'index' | 'screenshots'> & {
            id?: string;
        }
    ) => {
        const validatedProjectData = validateProjectFieldData(rest);

        // if project screenshots has changed
        if (projectScreenshots.length === 0) return;
        const prevScreenshots = prevProjectData.screenshots;
        let projectScreenshotsHasChanged = false;
        for (let i = 0; i < projectScreenshots.length; i++) {
            const s = projectScreenshots[i];
            if (
                s instanceof File ||
                i >= prevScreenshots.length ||
                s.url !== prevScreenshots[i].url
            ) {
                projectScreenshotsHasChanged = true;
                break;
            }
        }

        if (projectScreenshotsHasChanged)
            validatedProjectData.screenshots = await uploadScreenshots();

        const notProjectDataChanged =
            Object.values(validatedProjectData).length === 0;
        if (notProjectDataChanged) return;

        const docRef = doc(db, 'projects', prevProjectData.id);

        // console.log({ ...validatedProjectData, updatedAt: new Date().toISOString() })

        await updateDoc(docRef, {
            ...validatedProjectData,
            updatedAt: new Date().toISOString(),
        });
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
            projectScreenshots.length === 0
        ) {
            alert(
                'Required: A new project must contain at least one screenshot and technologie'
            );
            return;
        }

        const screenshots = await uploadScreenshots();

        const collectionSizeRef = doc(db, 'counts', 'projects');
        await runTransaction(db, async (transaction) => {
            const collectionCount = await transaction.get(collectionSizeRef);
            if (!collectionCount.exists()) {
                throw 'Document does not exist!';
            }

            const collectionSize = collectionCount.data().total as number;
            await addDoc(collection(db, 'projects'), {
                ...project,
                index: collectionSize,
                screenshots,
                createdAt: new Date().toISOString(),
            });
            transaction.update(collectionSizeRef, {
                total: collectionSize + 1,
            });
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { screenshots: _, ...rest } = project;
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

    const reorderScreenshots = async (items: OutputReordableItemType[]) => {
        setProjectScreenshots((prev) =>
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
        projectScreenshots,
        handleSelectChange,
        makeReplaceScreenshot,
        makeRemoveScreenshot,
        updateProjectProps,
        updateDescription,
        onReorderTechList,
        setOnReorderTechList,
        project,
        updateTechList,
        setProject,
        isSubmitting,
        projectScreenshotUrls,
        reorderScreenshots,
        removeTechByName,
    };
};
