"use client";
import { useTheme } from "@/hooks/UseTheme";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import React from "react";
import usePresentation from "./usePresentation";
import useSkills from "@/hooks/UseSkills";
import Image from "next/image";

export default function Presentation() {
  const hook = usePresentation()
  const { themeColor } = useTheme();
  const { skillData } = useSkills()


  return (
    <section className={`h-[100vh] relative select-none`} ref={hook.sectionRef}>
      <div className="h-full grid place-items-center -translate-y-5">
        <div className="text-center">

          <h2 className="sm:text-2xl primary-font-color font-semibold tracking-widest">{hook.translate.iAm}</h2>

          {((name: string) => (
            <>
              <h1 onClick={(e) => hook.rotateElementText(e.currentTarget)} className="text-4xl sm:text-7xl lg:text-8xl font-bold tracking-widest" style={{ color: themeColor.color }}>{name}</h1>

              <div className="grid place-items-center">
                <svg width={hook.svgTextWidth} height={hook.svgTextHeight}>
                  <text
                    x={hook.svgTextXPos} y={hook.svgTextYPos}
                    fill="none"
                    className="text-4xl sm:text-7xl lg:text-8xl tracking-widest"
                    stroke={themeColor.color}
                    strokeWidth="2"
                    fontWeight="bold"
                  >
                    {name}
                  </text>
                </svg>
              </div>
            </>
          ))("Victor Almeida")}

          <h2 className="sm:text-2xl primary-font-color mb-4 font-semibold tracking-widest">
            {hook.translate.text_3}
            <span className="ml-2" style={{ color: themeColor.color }} >@FullStack</span>
            {" "}{hook.translate.with}
          </h2>

          <div className="flex flex-row gap-4 items-center">
            <div
              className="h-[2px] grow"
              style={{
                backgroundColor: themeColor.color
              }}
            />
            {
              skillData.filter(s => s.isMain).map(skill => (
                <Image src={skill.src} alt="skill icon" key={skill.name} width={45} height={45} />
              )
              )
            }
            <div
              className="h-[2px] grow"
              style={{
                backgroundColor: themeColor.color
              }}
            />
          </div>

          {/* <ContactLinks center /> */}

        </div>
      </div>
      <button
        onClick={() => {
          const height = hook.sectionRef.current?.offsetHeight;
          if (!height) return;
          window.scrollTo({ top: height, behavior: "smooth" });
        }}
      >
        <KeyboardDoubleArrowDownIcon
          className="absolute left-1/2 bottom-12 -translate-x-1/2 animate-double-arrow-bounce"
          sx={{ fontSize: 50, color: themeColor.color }}
        />
      </button>
    </section>
  )
}