
import useTranslate from "@/hooks/UseTranslate";
import useTechnologies from "@/hooks/UseTechnologies";

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
  const translate = useTranslate(translations);

  return (
    <div id="technologies" className="pt-24 text-center">
      <h1 className="title mb-12">{translate("title")}</h1>
      <div className="flex flex-wrap justify-center gap-3 px-4">
        {technologieData &&
          technologieData.map(
            (icon) =>
              !icon.hidden && (
                  <div
                    className="shadow-xl flex flex-col items-center justify-center gap-2 max-sm:w-[100px] sm:w-[200px] sm:min-w-[200px] aspect-square select-none duration-200"
                    data-aos="flip-left"
                    data-aos-duration="1000"
                    data-aos-once="true"
                  >
                    <img className="h-2/5 w-auto " src={icon.src} alt="icon" />
                    <div className="tech-name ">
                      <p translate="no">{icon.name}</p>
                    </div>
                  </div>
              )
          )}
      </div>
    </div>
  );
};

export default Technologies;
