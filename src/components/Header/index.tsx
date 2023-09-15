/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import useWindowSize from "@/hooks/UseWindowsSize";
import { downloadCv } from "@/utils/cv";
import Hamburger from "./components/Hamburger";
import { navTranslations } from "./data";
import { Noto_Sans, Raleway } from "next/font/google";
import useLanguage from "@/hooks/UseLanguage";
import { useTheme } from "@/hooks/UseTheme";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  style: "italic",
  weight: "300",
});
const notoSans = Noto_Sans({ weight: "400", subsets: ["latin"] });

const Header: React.FC = () => {
  const [scrollUp, setScrollUp] = React.useState(true);
  const [wapperDisplay, setWapperDisplay] = React.useState("hidden");
  const [wapperIn, setWapperIn] = React.useState("");
  const [wrapperDimensions, setWrapperDimensions] = React.useState({
    width: 0,
    height: 0,
    left: 0,
  });
  const downloadCvBtnRef = React.useRef(null);
  const size = useWindowSize();
  const { themeColor } = useTheme();
  const lang = useLanguage();
  const translate = navTranslations[lang];
  const navDataArray = translate.data as { label: string; to: string }[];

  React.useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    if (downloadCvBtnRef?.current) {
      setTimeout(() => {
        moveWrapperToDownloadBtn();
        setWapperDisplay("block");
      }, 800);
    }
  }, [downloadCvBtnRef]);

  React.useEffect(() => {
    moveWrapperToDownloadBtn();
  }, [size]);

  // background da navbar
  const handleScroll = React.useCallback(() => {
    let pageY = window.pageYOffset;

    setScrollUp(pageY <= 40);
  }, []);

  const getLiBoundingClientRect = (li: HTMLElement) => {
    const { width, height } = li.closest("li")?.getBoundingClientRect() || {
      width: 0,
      height: 0,
    };
    return { width, height };
  };

  const handleMouseOver = React.useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const li = e?.currentTarget;

      if (li) {
        console.log(li.id);
        setWapperIn(li.id);
        setWrapperDimensions({
          ...getLiBoundingClientRect(li),
          left: li.offsetLeft,
        });
      }
    },
    []
  );

  const moveWrapperToDownloadBtn = React.useCallback(() => {
    if (!downloadCvBtnRef?.current) return;
    let li = downloadCvBtnRef.current as HTMLElement;

    setWrapperDimensions({
      ...getLiBoundingClientRect(li),
      left: li.offsetLeft,
    });
    setWapperIn("li-download-btn");
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-10">
      <div
        className={`
          m-auto
          py-3
          px-5
          rounded-2xl
          backdrop-blur-[8px]
          flex
          items-center
          h-fit
          duration-300
          ${scrollUp ? "bg-transparent" : "bg-[#00000055]"}
        `}
      >
        <h1
          style={{ color: themeColor }}
          className={`grow text-4xl shrink-0 basis-auto line-through z-[9910] select-none ${raleway.className}`}
        >
          VH
        </h1>
        <div
          className={`${wapperDisplay} absolute rounded-[20px] duration-200 pointer-events-none z-[3]`}
          style={{ ...wrapperDimensions, backgroundColor: themeColor }}
        />
        <nav
          className="max-lg:hidden z-[4]"
          onMouseOut={moveWrapperToDownloadBtn}
        >
          <ul className="flex flex-wrap items-center py-1">
            {navDataArray.map((data, i) => {
              const last = i === navDataArray.length - 1;
              return (
                <li
                  className={`
                    cursor-pointer 
                    list-none 
                    ${last ? "p-0" : "p-[10px]"}
                    italic
                    text-sm
                    uppercase 
                    select-none
                    duration-150
                    ${notoSans.className}
                    ${
                      scrollUp
                        ? wapperIn === "li-" + data.to
                          ? "text-[#ececec]"
                          : "primary-font-color"
                        : "text-[#ececec]"
                    }
                  `}
                  id={`li-${data.to}`}
                  key={i}
                  onClick={
                    last
                      ? downloadCv
                      : () => window.location.replace(`#${data.to || ""}`)
                  }
                  onMouseOver={handleMouseOver}
                >
                  {last ? (
                    <button
                      className="uppercase p-[10px] rounded-[20px]"
                      ref={downloadCvBtnRef}
                      onClick={downloadCv}
                    >
                      {translate.downloadCvBtnInnerText}
                    </button>
                  ) : (
                    data.label
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <Hamburger
          navData={navDataArray}
          downloadCvBtnInnerText={translate.downloadCvBtnInnerText}
        />
      </div>
    </header>
  );
};

export default React.memo(Header);
