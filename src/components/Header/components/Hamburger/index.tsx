"use client";
import { downloadResume } from "@/utils/resume";
import React from "react";
import { useTheme } from "@/hooks/UseTheme";

interface Props {
  navData: {
    label: string;
    to: string;
  }[];
  downloadResumeBtnInnerText: string;
}

const Hamburger = (props: Props) => {
  const [show, setShow] = React.useState(false);
  const liItemRef = React.useRef(null);
  const { themeColor } = useTheme();

  const toggle = React.useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  return (
    <div>
      <div className="cursor-pointer h-7 w-8 grid gap-[7px]" onClick={toggle}>
        {Array(3)
          .fill(undefined)
          .map((_, i) => (
            <span
              key={i}
              style={{ backgroundColor: themeColor.color }}
              className={`h-1 w-full rounded-xl ${
                [0, 2].includes(i) ? "origin-left duration-300" : "duration-150"
              } ${
                show
                  ? i === 0
                    ? "rotate-45"
                    : i === 1
                    ? "scale-0"
                    : "-rotate-45"
                  : ""
              }`}
            ></span>
          ))}
      </div>
      <div className="fixed top-24 -right-5 pointer-events-none">
        <ul className="nav-ul">
          {props.navData.map((data, i) => {
            const last = i === props.navData.length - 1;
            return (
              <li
                className={`li-item select-none rounded-tl-xl rounded-bl-xl pointer-events-auto z-10 cursor-pointer text-sm p-3 my-4 duration-150 ${
                  show ? "translate-x-0" : "translate-x-[101%]"
                }`}
                style={{
                  transitionDelay: `${i || 0}00ms`,
                  background: last
                    ? "linear-gradient(30deg, rgba(181, 22, 212, 1) 20%, rgba(77, 77, 205, 1) 100%)"
                    : themeColor.color,
                }}
                key={i}
                ref={liItemRef}
                onClick={
                  last
                    ? downloadResume
                    : () => window.location.replace(`#${data.to || ""}`)
                }
              >
                {last ? props.downloadResumeBtnInnerText : data.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default React.memo(Hamburger);
