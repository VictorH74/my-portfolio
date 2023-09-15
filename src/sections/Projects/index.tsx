"use client";
import Loading from "@/components/Loading";
import React from "react";
import ProjectCard, { Project } from "./components/ProjectCard";
import { useQuery } from "react-query";
import useLanguage from "@/hooks/UseLanguage";
import { useTheme } from "@/hooks/UseTheme";

const translations = {
  "pt-BR": {
    title: "Veja meus projetos!",
    showMoreOn: "mostrar menos",
    showMoreOff: "mostrar tudo",
  },
  en: {
    title: "See my projects!",
    showMoreOn: "show less",
    showMoreOff: "show all",
  },
};

const gistId = "d85dcf05a1f6d5e760bbcbe9d5dc614d";

const Projects = () => {
  const [showMore, setShowMore] = React.useState(false);
  const containerRef = React.useRef(null);
  const { themeColor } = useTheme();
  const { isLoading, data } = useQuery({
    queryKey: ["projectsData"],
    queryFn: () =>
      fetch(`https://api.github.com/gists/${gistId}`)
        .then((results) => {
          return results.json();
        })
        .then((data) => {
          const content = data.files["projects.json"].content;
          return JSON.parse(content) as Project[];
        }),
  });
  const lang = useLanguage();

  const translate = translations[lang];

  return (
    <section
      ref={containerRef}
      id="projects"
      className="pt-24 px-0 text-center"
    >
      {!isLoading && data ? (
        <>
          <h1 className="section-title mb-12">{translate.title}</h1>
          <div className="flex flex-col md:gap-20 gap-7">
            {data
              .filter((_, i) => i < 3 || showMore)
              .map((project, i) => (
                <ProjectCard key={i} project={project} index={i} />
              ))}
          </div>
          <button
            onMouseOver={(e) => {
              const { style } = e.currentTarget;
              style.color = "white";
              style.backgroundColor = themeColor;
            }}
            onMouseLeave={(e) => {
              const { style } = e.currentTarget;
              style.color = themeColor;
              style.backgroundColor = "transparent";
            }}
            style={{ border: "2px solid " + themeColor, color: themeColor }}
            className="uppercase px-4 py-3 inline-block m-5 mt-12 relative overflow-hidden border-2 text-md font-medium rounded-md duration-150 font-[inherit]"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? translate.showMoreOn : translate.showMoreOff}
          </button>
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default React.memo(Projects);
