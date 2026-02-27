import { db, getProjectImgFolderName } from '@/lib/firebase/client';
import { createClient } from '@/lib/supabase/client';
import { IApi } from '@/types/api';
import {
    CreateProjectType,
    ProjectType,
    UpdateProjectType,
} from '@/types/project';
import {
    CreateTechnologyType,
    TechnologyType,
    UpdateTechnologyType,
} from '@/types/technology';
import {
    PROFILE_BUCKET_NAME,
    PROFILE_IMG_NAME,
    PROFILE_RESUME_NAME,
} from '@/utils/constants';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    QueryConstraint,
    runTransaction,
    startAfter,
    updateDoc,
    writeBatch,
} from 'firebase/firestore';
import {
    deleteObject,
    getBlob,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from 'firebase/storage';

export class FirebaseSupabaseApi implements IApi {
    #supabase = createClient();

    #getTechDocRef = (id: string) => doc(db, 'technologies', id);

    #uploadFile = async (
        file: File,
        root: 'project-images' | 'technologies' | 'profile' | 'my-cv',
        path: string
    ) => {
        const storage = getStorage();
        const storageRef = ref(storage, `${root}/${path}`);

        const snap = await uploadBytes(storageRef, file, {
            contentType: file.type,
        });
        return getDownloadURL(snap.ref);
    };

    #removeFile = async (
        root: 'project-images' | 'technologies' | 'profile' | 'my-cv',
        path: string
    ) => {
        const storage = getStorage();
        const storageRef = ref(storage, `${root}/${path}`);
        return deleteObject(storageRef);
    };

    async deleteScreenshots(filePaths: string[]) {
        await Promise.all(
            filePaths.map((p) => this.#removeFile('project-images', p))
        );
    }

    async uploadScreenshot(
        file: File,
        projectId: ProjectType['id'],
        projectTitle: ProjectType['title']
    ) {
        const finalFileName = file.name.split('.').slice(0, -1).join('.');
        return this.#uploadFile(
            file,
            'project-images',
            `${getProjectImgFolderName(projectId, projectTitle)}/${finalFileName}`
        );
    }

    generateProjectId(): string {
        return doc(collection(db, 'projects')).id;
    }

    async createProject(data: CreateProjectType) {
        const collectionSizeRef = doc(db, 'counts', 'projects');
        await runTransaction(db, async (transaction) => {
            const collectionCount = await transaction.get(collectionSizeRef);
            if (!collectionCount.exists()) {
                throw 'Document does not exist!';
            }

            const newDocRef = data.id
                ? doc(db, 'projects', data.id)
                : doc(collection(db, 'projects'));

            const collectionSize = collectionCount.data().total as number;
            transaction.set(newDocRef, {
                ...data,
                index: collectionSize,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            transaction.update(collectionSizeRef, {
                total: collectionSize + 1,
            });
        });
    }

    getProjectListStream(onChange: (projectList: ProjectType[]) => void) {
        const docsRef = collection(db, 'projects');
        const q = query(docsRef, orderBy('index', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const retrivedProjects: ProjectType[] = [];
            snapshot.forEach((doc) => {
                retrivedProjects.push({
                    ...doc.data(),
                    id: doc.id,
                } as ProjectType);
            });
            onChange(retrivedProjects);
        });

        return unsubscribe;
    }

    async getProjectList(countLimit: number | null, jumpCount?: number) {
        const collectionRef = collection(db, 'projects');
        const queryConstraints: QueryConstraint[] = [];

        if (countLimit) queryConstraints.push(limit(countLimit));
        if (jumpCount) queryConstraints.push(startAfter(jumpCount));

        const q = query(collectionRef, orderBy('index'), ...queryConstraints);
        const snapshot = await getDocs(q);
        const list: ProjectType[] = [];
        snapshot.docs.forEach((doc) =>
            list.push({ ...doc.data(), id: doc.id } as ProjectType)
        );

        return list;
    }

    async updateProject(id: ProjectType['id'], data: UpdateProjectType) {
        const docRef = doc(db, 'projects', id);

        await updateDoc(docRef, {
            ...data,
            updatedAt: new Date().toISOString(),
        });
    }

    async deleteProject(
        id: ProjectType['id'],
        projectIndex: ProjectType['index'],
        currentProjectList: ProjectType[]
    ) {
        const docRef = doc(db, 'projects', id);
        const collectionCountRef = doc(db, 'counts', 'projects');
        await runTransaction(db, async (transaction) => {
            const collectionCount = await transaction.get(collectionCountRef);
            if (!collectionCount.exists()) {
                throw 'Document does not exist!';
            }

            const total = (collectionCount.data().total as number) - 1;

            for (
                let currentIndex = projectIndex;
                currentIndex < total;
                currentIndex++
            ) {
                const { id, index } = currentProjectList[currentIndex + 1];
                if (index !== currentIndex + 1)
                    throw new Error(
                        `Project index is incorrect. index: ${index}, currentIndex: ${currentIndex}`
                    );
                const currentProjectRef = doc(db, 'projects', id);
                transaction.update(currentProjectRef, {
                    index: currentIndex,
                });
            }

            transaction.delete(docRef);
            transaction.update(collectionCountRef, { total });
        });
    }

    async createTechnology(data: CreateTechnologyType) {
        let newTech: TechnologyType | null = null;

        const collectionSizeRef = doc(db, 'counts', 'technologies');
        await runTransaction(db, async (transaction) => {
            const collectionCount = await transaction.get(collectionSizeRef);

            if (!collectionCount.exists()) {
                throw 'Document does not exist!';
            }

            const collectionSize = collectionCount.data().total as number;

            // save/update collection
            const docRef = this.#getTechDocRef(data.id);
            newTech = { ...data, index: collectionSize };
            transaction.set(docRef, newTech);

            // increment collection item total count
            transaction.update(collectionSizeRef, {
                total: collectionSize + 1,
            });
        });

        if (!newTech) throw new Error('Failed to create technology');

        return newTech;
    }

    // getTechnologyListStream() {
    //     throw new Error('Method not implemented.');
    // }

    async getTechnologyList() {
        const q = query(
            collection(db, 'technologies'),
            orderBy('index', 'asc')
        );
        const querySnapshot = await getDocs(q);

        const list: TechnologyType[] = [];
        querySnapshot.docs.forEach((doc) => {
            list.push(doc.data() as TechnologyType);
        });

        return list;
    }

    async updateTechnology(
        id: TechnologyType['id'],
        data: UpdateTechnologyType
    ) {
        const docRef = this.#getTechDocRef(id);
        await updateDoc(docRef, data);
    }

    async uploadTechIcon(file: File, fileName: string) {
        return this.#uploadFile(file, 'technologies', fileName);
    }

    async deleteTechnology(
        tech: Pick<TechnologyType, 'id' | 'index' | 'src' | 'name'>,
        currentTechList: TechnologyType[]
    ) {
        const docRef = this.#getTechDocRef(tech.id);

        const collectionCountRef = doc(db, 'counts', 'technologies');
        await runTransaction(db, async (transaction) => {
            const collectionCount = await transaction.get(collectionCountRef);
            if (!collectionCount.exists()) {
                throw 'Document does not exist!';
            }
            const total = (collectionCount.data().total as number) - 1;
            for (
                let currentIndex = tech.index;
                currentIndex < total;
                currentIndex++
            ) {
                const { id, index } = currentTechList[currentIndex + 1];
                if (index !== currentIndex + 1)
                    throw new Error(
                        `Technology index is incorrect. index: ${index}, currentIndex: ${currentIndex}`
                    );
                const currentTechRef = this.#getTechDocRef(id);
                transaction.update(currentTechRef, { index: currentIndex });
            }
            transaction.delete(docRef);
            transaction.update(collectionCountRef, { total });
        });

        if (new URL(tech.src).hostname == 'tcvoanfmxprbainwcktt.supabase.co')
            await this.#supabase.storage.from('technologies').remove([tech.id]);
        else if (new URL(tech.src).hostname == 'firebasestorage.googleapis.com')
            await this.#removeFile('technologies', tech.id);
    }

    async reorderTechnologies(
        listOfUpdatedTech: Pick<TechnologyType, 'id' | 'index'>[]
    ) {
        const batch = writeBatch(db);
        listOfUpdatedTech.forEach(({ id, index }) => {
            const docRef = this.#getTechDocRef(id);
            batch.update(docRef, { index });
        });
        await batch.commit();
    }

    async updateProfileImg(img: File) {
        const url = await this.#uploadFile(
            img,
            PROFILE_BUCKET_NAME,
            PROFILE_IMG_NAME
        );

        const docRef = doc(db, 'profile', 'image');
        await updateDoc(docRef, { url });
        return url;
    }

    async getProfileImg() {
        const docRef = doc(db, PROFILE_BUCKET_NAME, PROFILE_IMG_NAME);
        const docData = (await getDoc(docRef)).data();

        if (!docData) {
            throw new Error('Profile image not found!');
        }

        return docData.url as string;
    }

    async updateResume(file: File) {
        if (file.type !== 'application/pdf')
            throw new Error('Only PDF files are allowed');

        await this.#uploadFile(file, PROFILE_BUCKET_NAME, PROFILE_RESUME_NAME);
    }

    async getResume() {
        const storage = getStorage();
        try {
            console.log('get resume from firebase');
            return getBlob(
                ref(storage, `${PROFILE_BUCKET_NAME}/${PROFILE_RESUME_NAME}`)
            );
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}
