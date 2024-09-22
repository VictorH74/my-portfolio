/* eslint-disable react-hooks/exhaustive-deps */
import { db } from '@/configs/firebaseConfig';
import useGlobalTechnologies from '@/hooks/useGlobalTechnologies';
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

import { ReordableModal } from '../../ReordableModal';

const UrlProps = ['deployUrl', 'repositoryUrl', 'videoUrl'] as const;

export interface CreateUpdateProjectModalProps {
    project?: ProjectType;
    projectIndex?: number;
    onClose(): void;
}

export default function useCreateUpdateProjectModal(
    props: CreateUpdateProjectModalProps
) {
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

    const projectScreenshotUrls = React.useMemo<string[]>(
        () =>
            projectScreenshots.map((img) =>
                img instanceof File ? URL.createObjectURL(img) : img.url
            ),
        [projectScreenshots]
    );

    const { technologyArray } = useGlobalTechnologies();

    React.useEffect(() => {
        if (props.project) {
            setProjectScreenshots([...props.project.screenshots]);
            setProject({ ...props.project });
        }
    }, [technologyArray]);

    const updateProjectProps = (prop: keyof ProjectType, value: string) =>
        setProject((prev) => ({ ...prev, [prop]: value }));

    const updateDescription = (lang: LangType, value: string) => {
        const prevDesc = project?.description!;
        setProject((prev) => ({
            ...prev,
            description: { ...prevDesc, [lang]: value },
        }));
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
                                Object.values(projectRest.description).join(
                                    ''
                                ) !==
                                Object.values(propProject.description).join('')
                            )
                                validatedData[currentKey] = currentValue;
                        },
                        technologies: () => {
                            if (
                                projectRest.technologies.join('') !==
                                propProject.technologies.join('')
                            )
                                validatedData[currentKey] = currentValue;
                        },
                    }) as Record<string, () => void>
                )[currentKey]();
        });

        return validatedData;
    };

    const uploadScreenshots = async () => {
        let updatedScreenshots = [...projectScreenshots];
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
                            const finalImg = await (
                                await fetch('api/images', {
                                    body: img,
                                    method: 'POST',
                                })
                            ).arrayBuffer();
                            const snap = await uploadBytes(
                                storageRef,
                                finalImg,
                                { contentType: 'image/webp' }
                            );
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

    const replaceScreenshot =
        (screenshotIndex: number) => (files: FileList | null) => {
            if (files)
                setProjectScreenshots((prev) =>
                    prev.map((s, i) => (i == screenshotIndex ? files[0] : s))
                );
        };

    const removeScreenshot = (screenshotIndex: number) => () => {
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
        const { screenshots: _screenshots, ...rest } = project;
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

    const reorderScreenshots = async (
        items: ReordableModal.OutputReordableItemType[]
    ) => {
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
        replaceScreenshot,
        removeScreenshot,
        updateProjectProps,
        updateDescription,
        project,
        setProject,
        isSubmitting,
        projectScreenshotUrls,
        reorderScreenshots,
        removeTechByName,
    };
}
