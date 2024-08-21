"use client";
import React from "react";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Image from "next/image";
import useProjectCard from "./useProjectCard";
import { ProjectType } from "@/types";
import Slide from "@/components/Slide";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

interface Props {
  index: number;
  project: ProjectType;
}

const randomVideoUrl =
  "https://player.vimeo.com/video/723658039?h=57b6d0ac88&color=ffffff&byline=0&portrait=0";

const ProjectCard: React.FC<Props> = ({ index, project }) => {
  const {
    loadingImg,
    themeColor,
    translate,
    video,
    icons,
    id,
    showVideo,
    hiddenVideo,
    setLoadingImg,
  } = useProjectCard(project);

  const odd = index % 2 !== 0;
  const oddScreen1024 = odd && window.innerWidth > 1024;
  // !odd || window.innerWidth < 900 = ROW REVERSE
  // odd && window.innerWidth > 900 = ROW

  return (
    <div>
      {video && (
        <div
          className="grid place-items-center fixed inset-0 bg-[#00000070] z-[9999]"
          onClick={hiddenVideo}
        >
          <iframe
            className="w-[1000px] aspect-video bg-transparent max-lg:w-full"
            title="project video"
            src={project.videoUrl || randomVideoUrl}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      <div
        className={`relative flex flex-col flex-wrap justify-between my-0 mx-[7%] ${oddScreen1024
          ? "lg:flex-row-reverse"
          : "lg:flex-row"
          }`}
        data-aos="flip-up"
        data-aos-duration="600"
        data-aos-once="true"
      >
        <div
          className="relative overflow-hidden lg:w-1/2 rounded-xl w-full shadow-xl"
        >
          <Slide images={project.screenshots} />
        </div>

        <div
          className={`w-full py-4 ${oddScreen1024 ? "text-end" : "text-start"
            } lg:w-[47%] py-5 px-7`}
        >
          <h1
            className={` text-xl ${oddScreen1024 ? "before:right-0" : "before:left-0"
              } primary-font-color`}
          >
            {project.title}
          </h1>
          <h2 className="mb-4 text-sm min-[700px]:text-base primary-font-color">
            {translate.projectDescription}
          </h2>

          {project.videoUrl && (
            <>
              <button
                onClick={showVideo}
                style={{ color: themeColor.color }}
                className="relative"
              >
                <p className="inline-block text-sm min-[700px]:text-lg">
                  {translate.playVideoDemoText}&nbsp;&nbsp;
                  <PlayCircleFilledIcon />
                </p>
              </button>
              <br />
            </>
          )}

          {project.deployUrl && (
            <Link color={themeColor.color} href={project.deployUrl}>
              {translate.productionLinkText}&nbsp;&nbsp;
              <LinkIcon />
            </Link>
          )}

          {project.deployUrl && project.repositoryUrl && <br />}

          {project.repositoryUrl && (
            <Link color={themeColor.color} href={project.repositoryUrl}>
              {translate.repoLinkText}&nbsp;&nbsp;
              <GitHubIcon />
            </Link>
          )}

          <div>
            <h3 className="text-xl mt-2 primary-font-color">
              {translate.skillsTitle}
            </h3>
            <ul
              className={`flex w-max gap-2 ${oddScreen1024 && "float-right"
                } pt-1`}
            >
              {icons.map(
                (icon) =>
                  icon && (
                    <li key={icon.id}>
                      <Image
                        loading="lazy"
                        placeholder="empty"
                        height={25}
                        width={25}
                        src={icon.src}
                        alt={`${icon.id} icon`}
                      />
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Link: React.FC<{
  children: React.ReactNode[];
  href?: string;
  color: string;
  onClick?: () => void
}> = (props) => (
  <a
    href={props.href}
    style={{ color: props.color }}
    className="relative"
    target="_blank"
    rel="noreferrer"
  >
    <p className="inline-block text-sm min-[700px]:text-lg">{props.children}</p>
  </a>
);

export default React.memo(ProjectCard);
