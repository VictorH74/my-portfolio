type Language = "en" | "pt-BR"
type TranslationLang = Record<Language, Record<string, any>>
type ProjectType = {
    title: string;
    image?: string;
    description: { PT: string; EN: string };
    skills: string[];
    link?: string;
    repository?: string;
    videoLink?: string;
}

export type ProjectScreenshotType = {
    name: string;
    url: string;
}

// temp
// TODO: override ProjectType to this
// TODO: remove
// TODO: remove imported from: ProjectRepository, Api interface
type ProjectAdminType = {
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

type TechIcons = {
    id: string;
    name: string;
    src: string;
    hidden?: boolean;
}

export type { Language, TranslationLang, ProjectType, ProjectAdminType, TechIcons }
