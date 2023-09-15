"use client";
import React, { memo, useId, useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import useTechnologies from "@/hooks/UseTechnologies";
import Loading from "@/components/Loading";
import Image from "next/image";
import useLanguage from "@/hooks/UseLanguage";
import { useTheme } from "@/hooks/UseTheme";

export interface Project {
  title: string;
  image?: string;
  description: { PT: string; EN: string };
  technologies: string[];
  link?: string;
  repository?: string;
  videoLink?: string;
}

interface Props {
  index: number;
  project: Project;
}

const randomImgUrl = "https://picsum.photos/600/380?random=";
const randomVideoUrl =
  "https://player.vimeo.com/video/723658039?h=57b6d0ac88&color=ffffff&byline=0&portrait=0";

const translations = (projectDescription: { PT: string; EN: string }) => ({
  "pt-BR": {
    technologiesTitle: "Tecnologias usadas",
    productionLinkText: "Projeto em produção",
    repoLinkText: "Repositório",
    projectDescription: projectDescription.PT,
  },
  en: {
    technologiesTitle: "Technologies used",
    productionLinkText: "Project in production",
    repoLinkText: "Repository",
    projectDescription: projectDescription.EN,
  },
});

const ProjectCard: React.FC<Props> = ({ index, project }) => {
  const { technologieData } = useTechnologies();
  const [video, setShowVideo] = useState(false);

  const [loadingImg, setLoadingImg] = useState(true);
  const id = useId();
  const lang = useLanguage();
  const { themeColor } = useTheme();
  const translate = translations(project.description)[lang];

  const icons = project.technologies.map((name) =>
    technologieData.find((icon) => icon.id === name)
  );

  const showVideo = () => setShowVideo(true);

  const hiddenVideo = () => setShowVideo(false);

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
            src={project.videoLink || randomVideoUrl}
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
          className={`relative overflow-hidden lg:w-1/2 rounded-xl w-full ${
            !!project.image
              ? ""
              : `after:absolute ${
                  window.navigator.language === "pt-BR"
                    ? "after:content-['Imagem-Aleatória']"
                    : "after:content-['Random-Image']"
                } after:inset-x-0 after:bottom-14 after:h-16 after:text-white after:bg-main-trasnparent-color after:z-[3] after:grid after:place-items-center`
          }`}
        >
          {!!project.videoLink && (
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
          {project.image ? (
            <iframe
              className={`w-[103%] ml-[-2%] h-[102%] aspect-[600/360] duration-300 ${
                loadingImg ? "opacity-0 pointer-events-none" : ""
              }`}
              title="project image"
              src={project.image}
              onLoad={() => setLoadingImg(false)}
              allow="autoplay"
            ></iframe>
          ) : (
            <Image
              className="h-auto w-full"
              src={randomImgUrl + index}
              alt="Project image"
              loading="lazy"
            />
          )}
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

          {project.link && (
            <Link color={themeColor} href={project.link}>
              {translate.productionLinkText}&nbsp;&nbsp;
              <LinkIcon />
            </Link>
          )}

          {project.link && project.repository && <br />}

          {project.repository && (
            <Link color={themeColor} href={project.repository}>
              {translate.repoLinkText}&nbsp;&nbsp;
              <GitHubIcon />
            </Link>
          )}

          <div>
            <h3 className="text-xl mt-2 primary-font-color">
              {translate.technologiesTitle}
            </h3>
            <ul className={`flex w-max gap-2 ${oddScreen900 && "float-right"} pt-1`}>
              {icons.map(
                (icon) =>
                  icon && (
                    <li key={icon.id}>
                      <Image
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

export default memo(ProjectCard);
