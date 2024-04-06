"use client";
import React from "react";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Loading from "@/components/Loading";
import Image from "next/image";
import useProjectCard from "./useProjectCard";
import { ProjectType } from "@/types";

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
  const oddScreen900 = odd && window.innerWidth > 900;
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
        className={`relative flex flex-col flex-wrap justify-between my-0 mx-[7%] ${
          odd && window.innerWidth > 1024
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
          {!!project.videoUrl && !loadingImg && (
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
              className="absolute bg-transparent inset-0 duration-200 grid place-items-center cursor-pointer z-10 hover:bg-[#11170]"
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
              className="h-auto w-full"
              src={project.screenshots[0].url}
              width={1000}
              height={780}
              alt="Project image"
              onLoad={() => setLoadingImg(false)}
              loading="lazy"
              placeholder="empty"
            />
          <div
            className={`absolute inset-0 bg-transparent grid place-items-center ${
              loadingImg ? "opacity-100" : "opacity-0"
            }`}
          >
            <Loading />
          </div>
        </div>

        <div
          className={`w-full py-4 ${
            oddScreen900 ? "text-end" : "text-start"
          } lg:w-[47%] py-5 px-7`}
        >
          <h1
            className={` text-xl ${
              oddScreen900 ? "before:right-0" : "before:left-0"
            } primary-font-color`}
          >
            {project.title}
          </h1>
          <h2 className="mb-4 text-sm min-[700px]:text-base primary-font-color">
            {translate.projectDescription}
          </h2>

          {project.deployUrl && (
            <Link color={themeColor} href={project.deployUrl}>
              {translate.productionLinkText}&nbsp;&nbsp;
              <LinkIcon />
            </Link>
          )}

          {project.deployUrl && project.repositoryUrl && <br />}

          {project.repositoryUrl && (
            <Link color={themeColor} href={project.repositoryUrl}>
              {translate.repoLinkText}&nbsp;&nbsp;
              <GitHubIcon />
            </Link>
          )}

          <div>
            <h3 className="text-xl mt-2 primary-font-color">
              {translate.skillsTitle}
            </h3>
            <ul
              className={`flex w-max gap-2 ${
                oddScreen900 && "float-right"
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
  href: string;
  color: string;
}> = (props) => (
  <a
    href={props.href}
    style={{ color: props.color }}
    className=" relative duration-150"
    target="_blank"
    rel="noreferrer"
  >
    <p className="inline-block text-sm min-[700px]:text-lg">{props.children}</p>
  </a>
);

export default React.memo(ProjectCard);
