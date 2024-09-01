import React from "react";
import useLanguage from "@/hooks/UseLanguage";
import useTechnologies from "@/hooks/UseTechnologies";
import { useTheme } from "@/hooks/UseTheme";
import { projectItem } from "@/utils/translations";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Loading from "@/components/Loading";
import Image from "next/image";
import { Carousel } from "react-bootstrap";
import { ProjectType } from "@/types";

export default function ProjectCard(props: {
  project: ProjectType;
  index: number;
}) {
  const { technologyArray } = useTechnologies();
  const [video, setShowVideo] = React.useState(false);

  const [loadingImg, setLoadingImg] = React.useState(true);
  const id = React.useId();
  const lang = useLanguage();
  const { themeColor } = useTheme();
  const translate = projectItem(props.project.description)[lang];

  const icons = props.project.technologies.map((name) =>
    technologyArray.find((icon) => icon.id === name)
  );

  const showVideo = () => setShowVideo(true);

  const hiddenVideo = () => setShowVideo(false);

  return (
    <>
      {video && (
        <div
          className="grid place-items-center fixed inset-0 bg-[#00000070] z-[9999]"
          onClick={hiddenVideo}
        >
          <iframe
            className="w-[1000px] aspect-video bg-transparent max-lg:w-full"
            title="project video"
            src={props.project.videoUrl}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      {!!props.project.videoUrl && (
        <div
          onMouseOver={() => {
            const playIcon = document.getElementById(`play-icon-${id}`);
            if (playIcon === null) return;
            playIcon.style.transition = "300ms";
            playIcon.style.opacity = "1";
            playIcon.style.fontSize = "100px";
          }}
          onMouseLeave={() => {
            const playIcon = document.getElementById(`play-icon-${id}`);
            if (playIcon === null) return;
            playIcon.style.opacity = "0.6";
            playIcon.style.fontSize = "0";
          }}
          className="absolute bg-transparent inset-y-0 inset-x-[15%] duration-200 grid place-items-center cursor-pointer z-10 hover:bg-[#11170]"
          onClick={showVideo}
        >
          <PlayArrowIcon
            id={`play-icon-${id}`}
            className="duration-300"
            sx={{ fontSize: 0, opacity: 0.6 }}
          />
        </div>
      )}
      <Image
          loading="lazy"
          placeholder="empty"
          height={700}
          width={1000}
          className="h-auto w-full"
          src={props.project.screenshots[0].url}
          alt="Project image"
        />
      <div
        className={`absolute inset-0 bg-transparent grid place-items-center ${
          loadingImg ? "opacity-100" : "opacity-0"
        }`}
      >
        <Loading />
      </div>
      <Carousel.Caption>
        <h3>{props.project.title}</h3>
        <p>{translate.projectDescription}</p>
      </Carousel.Caption>
    </>
  );
}
