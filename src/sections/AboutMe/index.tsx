"use client";
import Me from "@/assets/me.webp";
import Image from "next/image";
import { Noto_Sans } from "next/font/google";
import { DownloadResumeBtn } from "./styles";
import useLanguage from "@/hooks/UseLanguage";
import { useTheme } from "@/hooks/UseTheme";
import { downloadResume, fileName } from "@/utils/resume";
import { aboutMeSection } from "@/utils/translations";
import React from "react";

const notoSans400 = Noto_Sans({ weight: "400", subsets: ["latin"] });
const notoSans300 = Noto_Sans({ weight: "300", subsets: ["latin"] });

const AboutMe = () => {
  const lang = useLanguage();
  const translate = aboutMeSection[lang];
  const { themeColor } = useTheme();
  const [pdfSize, setPdfSize] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const res = await fetch(fileName);
      const blob = await res.blob();
      setPdfSize(Math.round(blob.size / 1024)); // KB
    })();
  }, []);

  const lightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;

  const paragraphFont = lightTheme ? notoSans400 : notoSans300;

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
            {translate.paragraphs.map((p, i) => (
              <p
                className={`text-base ${paragraphFont.className} primary-font-color`}
                key={i}
              >
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
            loading="lazy"
            placeholder="empty"
            className="
              rounded-e-full
              rounded-ss-full
              object-cover 
              max-md:max-w-[300px]
              h-auto
              w-full
              duration-200
            "
            style={{
              backgroundColor: themeColor,
            }}
            width={300}
            src={Me}
            alt="me"
          />
        </div>
      </div>

      <div className="flex flex-row items-center gap-5 mt-8">
        <div
          className="grow shrink basis-auto h-[2px]"
          style={{ backgroundColor: themeColor }}
        />
        <DownloadResumeBtn
          onClick={downloadResume}
          data-tooltip={`${translate.resumeSizeText}: ${pdfSize} KB`}
          style={{ backgroundColor: themeColor }}
        >
          <div className="button-wrapper">
            <div className="text text-base">
              {translate.downloadResumeBtnText}
            </div>
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
        </DownloadResumeBtn>
        <div
          className="grow shrink basis-auto h-[2px]"
          style={{ backgroundColor: themeColor }}
        />
      </div>
    </section>
  );
};

export default AboutMe;
