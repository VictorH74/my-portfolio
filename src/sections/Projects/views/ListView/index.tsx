import React from "react";
import ProjectCard from "./components/ProjectCard";
import { useTheme } from "@/hooks/UseTheme";
import { Project } from "../..";

interface Props {
  projectArray: Project[];
  showMoreOnText: string
  showMoreOffText: string
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
          style.backgroundColor = themeColor;
        }}
        onMouseLeave={(e) => {
          const { style } = e.currentTarget;
          style.color = themeColor;
          style.backgroundColor = "transparent";
        }}
        style={{ border: "2px solid " + themeColor, color: themeColor }}
        className="uppercase px-4 py-3 inline-block mt-12 relative overflow-hidden border-2 text-md font-medium rounded-md duration-150 font-[inherit]"
        onClick={() => setShowMore(!showMore)}
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
