import { ProjectType } from '@/types';
import {
    Api,
    DataParamType,
    DataType,
    ReturnArrayDataType,
    ReturnDataType,
} from './api';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/configs/firebaseConfig';

export class FirebaseApi implements Api {
    async get<T extends DataType>(
        dataType: T
    ): Promise<ReturnArrayDataType<T>> {
        switch (dataType) {
            case 'projects':
                const projectsCol = collection(db, 'projects');
                const projectSnapshot = await getDocs(projectsCol);
                const projectList = projectSnapshot.docs.map((doc) =>
                    doc.data()
                );
                return projectList as ProjectType[];
            // temp
            // return new Promise<ProjectType[]>((resolve) => resolve([]))
            default:
                return new Promise<any[]>((resolve) => resolve([]));
        }
    }
    delete<T extends DataType>(dataType: T, id: string): Promise<void> {
        switch (dataType) {
            case 'projects':
                // ...
                // temp
                return new Promise((resolve) => resolve());
            default:
                return new Promise((resolve) => resolve());
        }
    }
    async put<T extends DataType>(
        dataType: T,
        id: string,
        data: DataParamType<T>
    ): Promise<ReturnDataType<T>> {
        switch (dataType) {
            case 'projects':
                // ...
                // temp
                console.log(data);
                const docRef = doc(db, 'projects', id);

                await updateDoc(docRef, data);

                return new Promise<ProjectType>((resolve) =>
                    resolve({
                        description: { EN: 'hello', PT: 'Ola' },
                        technologies: [],
                        title: '',
                        screenshots: [],
                        id: '',
                        index: 0,
                    })
                );
            default:
                return new Promise<any>((resolve) => resolve({}));
        }
    }
    post<T extends DataType>(
        dataType: T,
        data: DataParamType<T>
    ): Promise<ReturnDataType<T>> {
        switch (dataType) {
            case 'projects':
                // ...
                // temp
                return new Promise<ProjectType>((resolve) =>
                    resolve({
                        description: { EN: 'hello', PT: 'Ola' },
                        technologies: [],
                        title: '',
                        screenshots: [],
                        id: '',
                        index: 0,
                    })
                );
            default:
                return new Promise<any>((resolve) => resolve({}));
        }
    }
}
