import { ProjectAdminType } from "@/types";
import { Api, DataParamType, DataType, ReturnArrayDataType, ReturnDataType } from "./api"
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/configs/firebaseConfig";

export class FirebaseApi implements Api {
    async get<T extends DataType>(dataType: T): Promise<ReturnArrayDataType<T>> {
        switch (dataType) {
            case "projects":
                const projectsCol = collection(db, 'projects');
                const projectSnapshot = await getDocs(projectsCol);
                const projectList = projectSnapshot.docs.map(doc => doc.data());
                return projectList as ProjectAdminType[];
                // temp
                // return new Promise<ProjectAdminType[]>((resolve) => resolve([]))
            default:
                return new Promise<any[]>((resolve) => resolve([]))
        }
    }
    delete<T extends DataType>(dataType: T, id: string): Promise<void> {
        switch (dataType) {
            case "projects":
                // ...
                // temp
                return new Promise((resolve) => resolve())
            default:
                return new Promise((resolve) => resolve())
        }
    }
    put<T extends DataType>(dataType: T, id: string, data: DataParamType<T>): Promise<ReturnDataType<T>> {
        switch (dataType) {
            case "projects":
                // ...
                // temp
                return new Promise<ProjectAdminType>((resolve) => resolve({ description: { EN: "hello", PT: "Ola" }, technologies: [], title: "", screenshots: [], id: ""}))
            default:
                return new Promise<any>((resolve) => resolve({}))
        }
    }
    post<T extends DataType>(dataType: T, data: DataParamType<T>): Promise<ReturnDataType<T>> {
        switch (dataType) {
            case "projects":
                // ...
                // temp
                return new Promise<ProjectAdminType>((resolve) => resolve({ description: { EN: "hello", PT: "Ola" }, technologies: [], title: "", screenshots: [], id: ""}))
            default:
                return new Promise<any>((resolve) => resolve({}))
        }
    }
}