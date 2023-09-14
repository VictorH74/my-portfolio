"use client"
import ExperienceCard from "./components/ExperienceCard";
import useLanguage from "@/hooks/UseLanguage";
import { experienceDataTranslation } from "./data";
import { TranslationLang } from "@/types/language";

const translations: TranslationLang = {
  "pt-BR": {
    title: "Experiências",
  },
  en: {
    title: "Experiences",
  },
};

export default function Experiences() {
  const lang = useLanguage()

  const sectionData = translations[lang]
  const experienceData = experienceDataTranslation[lang]

  return (
    <section id="experiences" className="pt-24 grid gap-3">
      <h1 className="section-title text-center">{sectionData.title}</h1>
      <div className="flex gap-10 flex-wrap flex-row w-full overflow-x-auto justify-between">
        {experienceData.map((d) => (
          <ExperienceCard key={d.title} {...d} />
        ))}
      </div>
    </section>
  );
}
