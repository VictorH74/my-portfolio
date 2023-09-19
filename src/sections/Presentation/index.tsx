"use client";
import useLanguage from "@/hooks/UseLanguage";
import { useTheme } from "@/hooks/UseTheme";
import { presentationSection } from "@/utils/translations";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Noto_Sans } from "next/font/google";
import React, { useRef } from "react";
import ContactLinks from "@/components/LinkList";

const notoSans = Noto_Sans({ weight: "400", subsets: ["latin"] });

const textLeading =
  "sm:leading-[4rem] leading-[3rem] max-[430px]:leading-[2.1rem]";

const Presentation = () => {
  const lang = useLanguage();
  const translate = presentationSection[lang];
  const ref = useRef<HTMLElement>(null);
  const { themeColor } = useTheme();

  const presentationData = (values: any[]) => {
    return values.map((v, i) => {
      if (i === 1) {
        return (
          <h1
            key={i}
            style={{ color: themeColor }}
            className={`emphasy max-sm:my-2 uppercase text-5xl ${textLeading} max-sm:text-5xl max-[430px]:text-[2.2rem] ${notoSans.className} `}
          >
            {v}
          </h1>
        );
      }
      return (
        <h2
          key={i}
          className={`mr-2 text-4xl max-sm:my-2 max-sm:text-[2.5rem] uppercase ${textLeading} max-[430px]:text-[1.7rem] primary-font-color ${notoSans.className} `}
        >
          {v}
        </h2>
      );
    });
  };

  return (
    <section className={`h-[85vh] mt-[15vh] relative`} ref={ref}>
      <div className="mt-[7%]">
        {presentationData([
          translate.hello,
          translate.iAm,
          translate.text_3,
          translate.text_4,
        ])}
        <ContactLinks />
      </div>
      <button
        onClick={() => {
          const height = ref.current?.offsetHeight;
          if (!height) return;
          window.scrollTo({ top: height, behavior: "smooth" });
        }}
      >
        <KeyboardDoubleArrowDownIcon
          className="absolute left-1/2 bottom-12 -translate-x-1/2 animate-double-arrow-bounce"
          sx={{ fontSize: 50, color: themeColor }}
        />
      </button>
    </section>
  );
};

export default Presentation;
