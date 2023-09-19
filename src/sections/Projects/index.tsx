"use client";
import Loading from "@/components/Loading";
import React from "react";
import { useQuery } from "react-query";
import useLanguage from "@/hooks/UseLanguage";
import { projectsSection } from "@/utils/translations";
import ListView from "./views/ListView";
import CarouselView from "./views/Carousel";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";

export interface Project {
  title: string;
  image?: string;
  description: { PT: string; EN: string };
  skills: string[];
  link?: string;
  repository?: string;
  videoLink?: string;
}

const gistId = "d85dcf05a1f6d5e760bbcbe9d5dc614d";
const viewBtnClass = "text-custom-gray-light dark:text-[#a1a1aa]";
const viewBtnActiveClass = "text-[#303030] dark:text-[#ececec]";

const Projects = () => {
  const [view, setView] = React.useState(2);
  const containerRef = React.useRef(null);

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
  const translate = projectsSection[lang];

  return (
    <section
      ref={containerRef}
      id="projects"
      className="pt-24 px-0 text-center"
    >
      {!isLoading && data ? (
        <>
          <div className="mb-12 relative">
            <h1 className="section-title">{translate.title}</h1>
            {process.env.NODE_ENV === "development" && (
              <div className="absolute right-5 inset-y-0 px-2 flex gap-2">
                <button onClick={() => setView(1)}>
                  <ViewCarouselIcon
                    className={view === 1 ? viewBtnActiveClass : viewBtnClass}
                    sx={{ fontSize: 40 }}
                  />
                </button>
                <button onClick={() => setView(2)}>
                  <ViewListIcon
                    className={view === 2 ? viewBtnActiveClass : viewBtnClass}
                    sx={{ fontSize: 40 }}
                  />
                </button>
              </div>
            )}
          </div>

          {view === 1 && <CarouselView projectArray={data} />}
          {view === 2 && (
            <ListView
              projectArray={data}
              showMoreOnText={translate.showMoreOn}
              showMoreOffText={translate.showMoreOff}
            />
          )}
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default React.memo(Projects);
