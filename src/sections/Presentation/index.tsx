"use client";
import useLanguage from "@/hooks/UseLanguage";
import { useTheme } from "@/hooks/UseTheme";
import { presentationSection } from "@/utils/translations";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Noto_Sans } from "next/font/google";
import React, { useRef } from "react";
import ContactLinks from "@/components/LinkList";
import useWindowSize from "@/hooks/UseWindowsSize";


const notoSans = Noto_Sans({ weight: "400", subsets: ["latin"] });

const textLeading =
  "sm:leading-[4rem] leading-[3rem] max-[430px]:leading-[2.1rem]";

const Presentation = () => {
  const lang = useLanguage();
  const translate = presentationSection[lang];
  const ref = useRef<HTMLElement>(null);
  const { themeColor } = useTheme();
  const timeOutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [svgTextWidth, setSvgTextWidth] = React.useState(700)
  const [svgTextYPos, setSvgTextYPos] = React.useState(20)
  const [svgTextXPos, setSvgTextXPos] = React.useState(35)
  const [width] = useWindowSize();

  React.useEffect(() => {
    if (width > 1024) {
      setSvgTextWidth(830)
      setSvgTextYPos(20)
      setSvgTextXPos(30)
    }
    else if (width > 640) {
      setSvgTextWidth(625)
      setSvgTextYPos(15)
      setSvgTextXPos(25)
    }
    else {
      setSvgTextWidth(450)
      setSvgTextYPos(10)
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
    <section className={`h-[85vh] mt-[15vh] relative select-none`} ref={ref}>
      <div className="h-full grid place-items-center -translate-y-5">
        <div className="text-center">

          <h2 className="text-2xl text-custom-white font-semibold tracking-widest">{translate.iAm}</h2>

          {((name: string) => (
            <>
              <h1 onClick={(e) => rotateElementText(e.currentTarget)} className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-widest" style={{ color: themeColor }}>{name}</h1>

              <div className="grid place-items-center">
                <svg width={`${svgTextWidth}px`} height="50px">
                  <text
                    x={svgTextXPos} y={svgTextYPos}
                    fill="none"
                    className="text-5xl sm:text-7xl lg:text-8xl tracking-widest"
                    stroke={themeColor}
                    stroke-width="2"
                    font-weight="bold"
                  >
                    {name}
                  </text>
                </svg>
              </div>
            </>
          ))("Victor Almeida")}

          <h2 className="text-2xl text-custom-white mb-4 font-semibold tracking-widest">
            {translate.text_3}
            <span className="ml-2" style={{ color: themeColor }} >@FullStack</span>
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
          sx={{ fontSize: 50, color: themeColor }}
        />
      </button>
    </section>
  )
}

export default Presentation;
