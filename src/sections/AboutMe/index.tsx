"use client";
import MeJPG from "@/assets/me.jpg";
import { aboutMeData } from "./data";
import { downloadCv } from "@/utils/cv";
import Image from "next/image";
import { Noto_Sans } from "next/font/google";
import { BtnContainer, DownloadCvBtn, Line } from "./styles";
import useLanguage from "@/hooks/UseLanguage";
import { useTheme } from "@/hooks/UseTheme";

const notoSans400 = Noto_Sans({ weight: "400", subsets: ["latin"] });
const notoSans300 = Noto_Sans({ weight: "300", subsets: ["latin"] });

const translations = {
  "pt-BR": {
    title: "Me conheça",
    aboutMeData: aboutMeData.PT,
    downloadCvText: "Baixar Currículo",
    cvSizeText: "Tamanho",
  },
  en: {
    title: "About Me",
    aboutMeData: aboutMeData.EN,
    downloadCvText: "Download CV",
    cvSizeText: "Size",
  },
};

const AboutMe = () => {
  const lang = useLanguage();
  const translate = translations[lang];
  const { themeColor } = useTheme();

  const data: { name: string; about: string[] } = translate.aboutMeData as {
    name: string;
    about: string[];
  };

  return (
    <section id="about-me" className="pt-24">
      <h1
        className={`section-title mb-12 ${notoSans400.className} max-md:text-center`}
      >
        {translate.title}
      </h1>
      <div className="flex flex-col lg:flex-row">
        <div
          className="grow shrink basis-96"
          data-aos-once="true"
          data-aos="fade-up-right"
          data-aos-duration="1000"
        >
          <div className="paragraphs max-w-[800px] grid gap-4">
            {data.about.map((p, i) => (
              <p className={`md:text-lg ${notoSans300.className} primary-font-color`} key={i}>
                {p}
              </p>
            ))}
          </div>
        </div>
        <div
          className="img-container grow-0 shrink-0 basis-auto m-auto max-md:my-5 max-md:w-fit"
          data-aos="zoom-in"
          data-aos-once="true"
          data-aos-delay="300"
          data-aos-duration="400"
        >
          <Image
            className="
              rounded-full 
              object-cover 
              max-md:h-auto 
              max-md:w-full 
              max-md:max-w-[300px]
            "
            style={{
              boxShadow: "3px 3px 2px " + themeColor
            }}
            width={300}
            height={300}
            src={MeJPG}
            alt="me"
          />
        </div>
      </div>

      <BtnContainer>
        <Line className="btn-container-line" style={{backgroundColor: themeColor}} />
        <DownloadCvBtn
          onClick={downloadCv}
          data-tooltip={`${translate.cvSizeText}: 66 KB`}
          style={{backgroundColor: themeColor}}
        >
          <div className="button-wrapper">
            <div className="text">{translate.downloadCvText}</div>
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="2em"
                height="2em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                ></path>
              </svg>
            </span>
          </div>
        </DownloadCvBtn >
        <Line className="btn-container-line" style={{backgroundColor: themeColor}} />
      </BtnContainer>
    </section>
  );
};

export default AboutMe;
