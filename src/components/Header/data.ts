import { TranslationLang } from "@/types";

const NAV_LIST_ITEM_IDS = ["", "about-me", "skills", "experience", "projects", "contact-me", "contacts", "download-btn"] as const

type NavListItemType = { label: string, to: typeof NAV_LIST_ITEM_IDS[number]; }

type NavTranslationsType = {
  showBgAnimation: string,
  switchThemeColor: string,
  downloadResumeBtnInnerText: string,
  data: NavListItemType[]
}

export const navTranslations: TranslationLang<NavTranslationsType> = {
  "pt-BR": {
    downloadResumeBtnInnerText: "baixar currículo",
    showBgAnimation: "Animação de fundo",
    switchThemeColor: "Alternar cor do tema",
    data: [
      { label: "Boas-vindas", to: "" },
      { label: "Sobre mim", to: "about-me" },
      { label: "Habilidades", to: "skills" },
      { label: "Experiência", to: "experience" },
      { label: "Projetos", to: "projects" },
      { label: "Fale Comigo", to: "contact-me" },
      { label: "Contatos", to: "contacts" },
      { label: "DownloadResume", to: "download-btn" },
    ],
  },
  en: {
    downloadResumeBtnInnerText: "download resume",
    showBgAnimation: "Background animation",
    switchThemeColor: "Switch theme color",
    data: [
      { label: "Welcome", to: "" },
      { label: "About Me", to: "about-me" },
      { label: "Skills", to: "skills" },
      { label: "Experience", to: "experience" },
      { label: "Projects", to: "projects" },
      { label: "Contact Me", to: "contact-me" },
      { label: "Contacts", to: "contacts" },
      { label: "DownloadResume", to: "download-btn" },
    ],
  },
};

