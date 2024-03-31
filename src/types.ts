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

// temp
// TODO: override ProjectType to this
// TODO: remove
// TODO: remove imported from: ProjectRepository, Api interface
type ProjectAdminType = {
    id: string;
    title: string;
    screenshots: string[];
    description: { PT: string; EN: string };
    technologies: string[];
    deployUrl?: string;
    repositoryUrl?: string;
    videoUrl?: string;
}

export type { Language, TranslationLang, ProjectType, ProjectAdminType }
