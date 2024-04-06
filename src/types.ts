type Language = "en" | "pt-BR"
type TranslationLang = Record<Language, Record<string, any>>

type ProjectType = {
    index: number;
    id: string;
    title: string;
    screenshots: ProjectScreenshotType[];
    description: { PT: string; EN: string };
    technologies: string[];
    deployUrl?: string;
    repositoryUrl?: string;
    videoUrl?: string;
    createdAt?: string; // ISO String Date
    updatedAt?: string; // ISO String Date
}

export type ProjectScreenshotType = {
    name: string;
    url: string;
}

type TechIcons = {
    id: string;
    name: string;
    src: string;
    hidden?: boolean;
}

export type { Language, TranslationLang, ProjectType, TechIcons }
