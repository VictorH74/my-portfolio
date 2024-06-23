import { FormValues } from "./useContactMe";

export const fields: { name: keyof FormValues, type?: string, row?: boolean }[] = [
    { name: "name", type: "text", row: true },
    { name: "email", type: "email", row: true },
    { name: "subject", type: "text" },
    { name: "message" },
];