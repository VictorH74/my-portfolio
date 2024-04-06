"use client";
import Loading from "@/components/Loading";
import React from "react";
import useLanguage from "@/hooks/UseLanguage";
import { projectsSection } from "@/utils/translations";
import ListView from "./views/ListView";
import CarouselView from "./views/Carousel";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { ProjectType } from "@/types";
import { QueryConstraint, collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "@/configs/firebaseConfig";


const viewBtnClass = "text-custom-gray-light dark:text-[#a1a1aa]";
const viewBtnActiveClass = "text-[#303030] dark:text-[#ececec]";

const Projects = () => {
  const [view, setView] = React.useState(2);
  const containerRef = React.useRef(null);
  const [projects, setProjects] = React.useState<ProjectType[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    (async () => {
      setIsLoading(true)
      const retrievedProjects = await getProjectSnapshotsByQuery(limit(3))
      setProjects(retrievedProjects)
      setIsLoading(false)
    })()
  }, [])

  const fetchMoreProjects = async () => {
    const retrievedProjects = await getProjectSnapshotsByQuery(startAfter(2))
    setProjects(prev => [...prev, ...retrievedProjects])
  }

  const getProjectSnapshotsByQuery = async (...queryConstraints: QueryConstraint[]) => {
    const collectionRef = collection(db, "projects");
    const q = query(collectionRef, orderBy("index"), ...queryConstraints)
    const snapshot = await getDocs(q)
    const tempProjects: ProjectType[] = []
    snapshot.docs.forEach(doc => tempProjects.push({ ...doc.data(), id: doc.id } as ProjectType))
    return tempProjects
  }

  const lang = useLanguage();
  const translate = projectsSection[lang];

  return (
    <section
      ref={containerRef}
      id="projects"
      className="pt-24 px-0 text-center"
    >
      {!isLoading && projects ? (
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

          {view === 1 && <CarouselView projectArray={projects} />}
          {view === 2 && (
            <ListView
              projectArray={projects}
              showMoreOnText={translate.showMoreOn}
              showMoreOffText={translate.showMoreOff}
              fetchMoreProjectsFunc={fetchMoreProjects}
            />
          )}
        </>
      ) : (
        <div className="mt-[25%] grid place-items-center"><Loading /></div>
      )}
    </section>
  );
};

export default React.memo(Projects);
