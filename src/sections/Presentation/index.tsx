"use client";
import useLanguage from "@/hooks/UseLanguage";
import { useTheme } from "@/hooks/UseTheme";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Noto_Sans } from "next/font/google";
import React from "react";

const notoSans = Noto_Sans({ weight: "300", subsets: ["latin"] });

const translations = {
  "pt-BR": {
    hello: "Olá!",
    iAm: "Eu sou Victor Almeida",
    a: ["Um", "Desenvolvedor", "Full-Stack", "Junior"],
    text_3: "Um Desenvolvedor de Software Júnior",
    text_4: "@ FullStack",
  },
  en: {
    hello: "Hello!",
    iAm: "I'm Victor Almeida",
    a: ["A", "Full-Stack", "Developer", "Junior"],
    text_3: "A Software Engineer Junior",
    text_4: "@ FullStack",
  },
};

const textLeading =
  "sm:leading-[4rem] leading-[3rem] max-[430px]:leading-[2.1rem]";

const Presentation = () => {
  const lang = useLanguage();
  const translate = translations[lang];
  const { themeColor } = useTheme();

  const presentationData = (values: any[]) => {
    return values.map((v, i) => {
      if (i === 1) {
        return (
          <h1
            key={i}
            style={{ color: themeColor }}
            className={`emphasy text-6xl ${textLeading} max-sm:text-5xl max-[430px]:text-[2.2rem] ${notoSans.className} `}
          >
            {v}
          </h1>
        );
      }
      return (
        <h2
          key={i}
          className={`mr-2 text-5xl max-sm:text-[2.5rem] ${textLeading} max-[430px]:text-[1.7rem] primary-font-color ${notoSans.className} `}
        >
          {v}
        </h2>
      );
    });
  };

  return (
    <section className={`h-[85vh] mt-[15vh] relative`}>
      <div className="mt-[7%]">
        {presentationData([
          translate.hello,
          translate.iAm,
          translate.text_3,
          translate.text_4,
        ])}
      </div>
      <KeyboardDoubleArrowDownIcon
        className="absolute left-1/2 bottom-12 -translate-x-1/2 animate-double-arrow-bounce"
        sx={{ fontSize: 50, color: themeColor }}
      />
    </section>
  );
};

export default Presentation;
