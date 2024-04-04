"use client";
import React from "react";
import { downloadResume } from "@/utils/resume";
import Hamburger from "./components/Hamburger";
import { Noto_Sans, Raleway } from "next/font/google";
import useHeader from "./useHeader";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  style: "italic",
  weight: "300",
});
const notoSans = Noto_Sans({ weight: "400", subsets: ["latin"] });

const Header: React.FC = () => {
  const hook = useHeader();

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
          ${hook.scrollUp ? "bg-transparent" : "bg-[#00000055]"}
        `}
      >
        <h1
          className={`grow text-4xl shrink-0 basis-auto  z-[9910] select-none`}
        >
          <span
            className={hook.scrollUp ? "primary-font-color" : "text-custom-white"}
          >
            &lt;
          </span>{" "}
          <span
            className={`line-through  ${raleway.className}`}
            style={{ color: hook.themeColor }}
          >
            vh
          </span>{" "}
          <span
            className={hook.scrollUp ? "primary-font-color" : "text-custom-white"}
          >
            /&gt;
          </span>
        </h1>
        {hook.size[0] > 1100 ? (
          <>
            <div
              className={`absolute rounded-[20px] duration-200 pointer-events-none z-[3]`}
              style={{
                ...hook.wrapperDimensions,
                backgroundColor: hook.themeColor,
                display: hook.wrapperDisplay || "none",
              }}
            />
            <nav
              className="max-lg:hidden z-[4]"
              onMouseOut={hook.moveWrapperToDownloadBtn}
            >
              <ul className="flex flex-wrap items-center py-1">
                {hook.navDataArray.map((data, i) => {
                  const last = i === hook.navDataArray.length - 1;
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
                      hook.scrollUp
                        ? hook.wrappedLI === "li-" + data.to
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
                      onMouseOver={hook.handleMouseOver}
                    >
                      {last ? (
                        <button
                          className="uppercase p-[10px] rounded-[20px]"
                          ref={hook.downloadResumeBtnRef}
                          onClick={downloadResume}
                        >
                          {hook.translate.downloadResumeBtnInnerText}
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
            navData={hook.navDataArray}
            downloadResumeBtnInnerText={hook.translate.downloadResumeBtnInnerText}
          />
        )}
      </div>
    </header>
  );
};

export default React.memo(Header);
