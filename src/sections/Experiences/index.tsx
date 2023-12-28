"use client"
import ExperienceCard from "./components/ExperienceCard";
import useLanguage from "@/hooks/UseLanguage";
import { experienceSection } from "@/utils/translations";

export default function Experiences() {
  const lang = useLanguage()
  const translate = experienceSection[lang]

  return (
    <section id="experience" className="pt-24 grid gap-3">
      <h1 className="section-title text-center">{translate.title}</h1>
      <div className="flex gap-10 flex-wrap flex-row w-full overflow-x-auto justify-between">
        {translate.experience.map((d) => (
          <ExperienceCard key={d.title} {...d} />
        ))}
      </div>
    </section>
  );
}
