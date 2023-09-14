import Loading from "@/components/Loading";
import useTranslate from "@/hooks/UseTranslate";
import { useState, useRef, memo } from "react";
import ProjectCard, { Project } from "./components/ProjectCard";
import { useQuery } from "react-query";

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
  const [showMore, setShowMore] = useState(false);
  const containerRef = useRef(null);
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

  const translate = useTranslate(translations);

  return (
    <section ref={containerRef} id="projects" className="py-24 px-0 text-center">
      {!isLoading && data ? (
        <>
          <h1 className="title mb-12">{translate("title")}</h1>
          <div className="flex flex-col md:gap-20 gap-7">
            {data
              .filter((_, i) => i < 3 || showMore)
              .map((project, i) => (
                <ProjectCard key={i} project={project} index={i} />
              ))}
          </div>
          <button
          className="uppercase px-4 py-3 inline-block m-5 mt-12 relative overflow-hidden border-2 border-[#4e54fd] text-md font-medium rounded-md text-[#4e54fd] duration-150 font-[inherit] hover:text-white hover:bg-[#4e54fd]"
            onClick={() => setShowMore(!showMore)}
            children={
              showMore ? translate("showMoreOn") : translate("showMoreOff")
            }
          />
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default memo(Projects);
