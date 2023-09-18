/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import useWindowSize from "@/hooks/UseWindowsSize";
import { downloadResume } from "@/utils/resume";
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
  const [wrapperDisplay, setWrapperDisplay] = React.useState("hidden");
  const [wrappedLI, setWrappedLI] = React.useState("");
  const [wrapperDimensions, setWrapperDimensions] = React.useState({
    width: 0,
    height: 0,
    left: 0,
  });
  const downloadResumeBtnRef = React.useRef(null);
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
    if (downloadResumeBtnRef?.current) {
      setTimeout(() => {
        moveWrapperToDownloadBtn();
        setWrapperDisplay("block");
      }, 800);
    }
  }, [downloadResumeBtnRef]);

  React.useEffect(() => {
    if (size[0] <= 1100) return;
    moveWrapperToDownloadBtn();
  }, [size]);

  // background da navbar
  const handleScroll = React.useCallback(() => {
    let pageY = window.scrollY;

    setScrollUp(pageY <= 40);
  }, []);

  const changeWrapperPosition = (li: HTMLElement, wrappedLI: string) => {
    const { width, height } = li.closest("li")?.getBoundingClientRect() || {
      width: 0,
      height: 0,
    };
    setWrappedLI(wrappedLI);
    setWrapperDimensions({
      width,
      height,
      left: li.offsetLeft,
    });
  };

  const handleMouseOver = React.useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const li = e?.currentTarget;
      changeWrapperPosition(li, li.id);
    },
    []
  );

  const moveWrapperToDownloadBtn = React.useCallback(() => {
    if (!downloadResumeBtnRef?.current) return;
    changeWrapperPosition(downloadResumeBtnRef.current, "li-download-btn");
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
          uppercase
          ${scrollUp ? "bg-transparent" : "bg-[#00000055]"}
        `}
      >
        <h1
          className={`grow text-4xl shrink-0 basis-auto  z-[9910] select-none`}
        >
          <span
            className={scrollUp ? "primary-font-color" : "text-custom-white"}
          >
            &lt;
          </span>{" "}
          <span
            className={`line-through  ${raleway.className}`}
            style={{ color: themeColor }}
          >
            vh
          </span>{" "}
          <span
            className={scrollUp ? "primary-font-color" : "text-custom-white"}
          >
            /&gt;
          </span>
        </h1>
        {size[0] > 1100 ? (
          <>
            <div
              className={`${wrapperDisplay} absolute rounded-[20px] duration-200 pointer-events-none z-[3]`}
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
                        ? wrappedLI === "li-" + data.to
                          ? "text-[#ececec]"
                          : "primary-font-color"
                        : "text-[#ececec]"
                    }
                  `}
                      id={`li-${data.to}`}
                      key={i}
                      onClick={
                        last
                          ? downloadResume
                          : () => window.location.replace(`#${data.to || ""}`)
                      }
                      onMouseOver={handleMouseOver}
                    >
                      {last ? (
                        <button
                          className="uppercase p-[10px] rounded-[20px]"
                          ref={downloadResumeBtnRef}
                          onClick={downloadResume}
                        >
                          {translate.downloadResumeBtnInnerText}
                        </button>
                      ) : (
                        data.label
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </>
        ) : (
          <Hamburger
            navData={navDataArray}
            downloadResumeBtnInnerText={translate.downloadResumeBtnInnerText}
          />
        )}
      </div>
    </header>
  );
};

export default React.memo(Header);
