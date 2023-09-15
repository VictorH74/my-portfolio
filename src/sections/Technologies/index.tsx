"use client";
import useTechnologies from "@/hooks/UseTechnologies";
import Image from "next/image";
import { Noto_Sans } from "next/font/google";
import useLanguage from "@/hooks/UseLanguage";

const notoSans = Noto_Sans({ weight: "400", subsets: ["latin"] });

const translations = {
  "pt-BR": {
    title: "Tecnologias",
  },
  en: {
    title: "Technologies",
  },
};

const Technologies = () => {
  const { technologieData } = useTechnologies();
  const lang = useLanguage()

  const translate = translations[lang]

  return (
    <div id="technologies" className="pt-24 text-center">
      <h1 className={`section-title mb-12 ${notoSans.className}`}>
        {translate.title}
      </h1>
      <div className="flex flex-wrap justify-center gap-3 px-4">
        {technologieData &&
          technologieData.map(
            (icon) =>
              !icon.hidden && (
                <div
                  key={icon.id}
                  className="shadow-xl flex flex-col items-center justify-center gap-2 max-sm:w-[100px] sm:w-[200px] sm:min-w-[200px] aspect-square select-none duration-200"
                  data-aos="flip-left"
                  data-aos-duration="1000"
                  data-aos-once="true"
                >
                  <Image
                    height={50}
                    width={50}
                    className="h-2/5 w-auto "
                    src={icon.src}
                    alt="icon"
                  />
                  <div className="tech-name ">
                    <p className="primary-font-color" translate="no">{icon.name}</p>
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default Technologies;
