type Language = "en" | "pt-BR"
type TranslationLang<T> = Record<Language, T>

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

type ProjectScreenshotType = {
    name: string;
    url: string;
}

type TechnologieType = {
    index: number;
    id: string;
    name: string;
    src: string;
    hidden?: boolean;
    isMain?: boolean;
}

type RGBType = [number, number, number]

export type { Language, TranslationLang, ProjectType, TechnologieType, ProjectScreenshotType, RGBType }
