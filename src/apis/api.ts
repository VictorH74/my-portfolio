import { ProjectAdminType } from "@/types";

export type DataType = "projects" | "technologies"

export type ReturnArrayDataType<T> = T extends "projects" ? ProjectAdminType[] : any[];
// type ReturnArrayDataType<T extends DataType> = T extends "projects" ? ProjectAdminType[] : any[];

export type ReturnDataType<T> = T extends "projects" ? ProjectAdminType : any;
export type DataParamType<T> = T extends "projects" ? ProjectAdminType | Partial<ProjectAdminType> : any;

export interface Api {
    get<T extends DataType>(dataType: T): Promise<ReturnArrayDataType<T>>;
    delete<T extends DataType>(dataType: T, id: string): Promise<void>;
    put<T extends DataType>(dataType: T, id: string, data: DataParamType<T>): Promise<ReturnDataType<T>>;
    post<T extends DataType>(dataType: T, data: DataParamType<T>): Promise<ReturnDataType<T>>;
}