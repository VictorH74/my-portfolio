import React from "react";
import ProjectCard from "./components/ProjectCard";
import { useTheme } from "@/hooks/UseTheme";
import { ProjectType } from "@/types";

interface Props {
  projectArray: ProjectType[];
  showMoreOnText: string
  showMoreOffText: string
  fetchMoreProjectsFunc(): Promise<void>
}

export default function ListView(props: Props) {
  const [showMore, setShowMore] = React.useState(false);
  const { themeColor } = useTheme();
  return (
    <>
      <div className="flex flex-col md:gap-20 gap-7">
        {props.projectArray
          .filter((_, i) => i < 3 || showMore)
          .map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
      </div>
      <button
        onMouseOver={(e) => {
          const { style } = e.currentTarget;
          style.color = "white";
          style.backgroundColor = themeColor.color;
        }}
        onMouseLeave={(e) => {
          const { style } = e.currentTarget;
          style.color = themeColor.color;
          style.backgroundColor = "transparent";
        }}
        style={{ border: "2px solid " + themeColor.color, color: themeColor.color }}
        className="uppercase px-4 py-3 inline-block mt-12 relative overflow-hidden border-2 text-md dark:font-medium rounded-md duration-150 font-[inherit] font-semibold"
        onClick={async () => {
          if (!showMore && !(props.projectArray.length > 3)) {
            await props.fetchMoreProjectsFunc()
          }
          setShowMore(!showMore)
        }
        }
      >
        {showMore ? props.showMoreOnText : props.showMoreOffText}
      </button>
    </>
  );

  return (
    <>
      {props.projectArray
        .filter((_, i) => i < 3 || showMore)
        .map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
    </>
  );
}
