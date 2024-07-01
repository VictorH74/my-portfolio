"use client";
import useLanguage from "@/hooks/UseLanguage";
import { useTheme } from "@/hooks/UseTheme";
import { presentationSection } from "@/utils/translations";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import React, { useRef } from "react";
import ContactLinks from "@/components/LinkList";
import useWindowSize from "@/hooks/UseWindowsSize";


const Presentation = () => {
  const lang = useLanguage();
  const translate = presentationSection[lang];
  const ref = useRef<HTMLElement>(null);
  const { themeColor } = useTheme();
  const timeOutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [svgTextWidth, setSvgTextWidth] = React.useState("700px")
  const [svgTextHeight, setSvgTextHeight] = React.useState("40px")
  const [svgTextYPos, setSvgTextYPos] = React.useState(20)
  const [svgTextXPos, setSvgTextXPos] = React.useState(35)
  const [width] = useWindowSize();

  React.useEffect(() => {
    if (width > 1024) {
      setSvgTextWidth("830px")
      setSvgTextHeight("40px")
      setSvgTextYPos(20)
      setSvgTextXPos(30)
    }
    else if (width > 640) {
      setSvgTextWidth("625px")
      setSvgTextHeight("30px")
      setSvgTextYPos(15)
      setSvgTextXPos(25)
    }
    else {
      setSvgTextWidth("350px")
      setSvgTextHeight("25px")
      setSvgTextYPos(8)
      setSvgTextXPos(30)
    }
  }, [width])

  const rotateElementText = (el: HTMLElement) => {
    const rotateTotal = 3;
    if (timeOutRef.current)
      clearTimeout(timeOutRef.current);
    const rotate = (
      increaseMS: number,
      increasedDeg: number,
      rotateNumber: number,
      delay: number
    ) => {
      if (rotateNumber <= rotateTotal) {
        el.style.transitionDuration = `${increaseMS}ms` // 300 - 900
        el.style.transform = `rotateX(${increasedDeg}deg)`
        timeOutRef.current = setTimeout(
          rotate,
          delay,
          increaseMS + 300,
          increasedDeg + 180,
          rotateNumber + 1,
          delay + 150
        )
        return;
      }
      timeOutRef.current = setTimeout(() => {
        el.style.transitionDuration = "0ms"
        el.style.transform = "rotateX(0deg)"
      }, 200)
    }
    rotate(300, 180, 0, 200)
  }

  return (
    <section className={`h-[100vh] relative select-none`} ref={ref}>
      <div className="h-full grid place-items-center -translate-y-5">
        <div className="text-center">

          <h2 className="sm:text-2xl primary-font-color font-semibold tracking-widest">{translate.iAm}</h2>

          {((name: string) => (
            <>
              <h1 onClick={(e) => rotateElementText(e.currentTarget)} className="text-4xl sm:text-7xl lg:text-8xl font-bold tracking-widest" style={{ color: themeColor.color }}>{name}</h1>

              <div className="grid place-items-center">
                <svg width={svgTextWidth} height={svgTextHeight}>
                  <text
                    x={svgTextXPos} y={svgTextYPos}
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
            {translate.text_3}
            <span className="ml-2" style={{ color: themeColor.color }} >@FullStack</span>
          </h2>

          <ContactLinks center />

        </div>
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
          sx={{ fontSize: 50, color: themeColor.color }}
        />
      </button>
    </section>
  )
}

export default Presentation;
