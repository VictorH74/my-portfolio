import useTranslate from "@/hooks/UseTranslate";
import { useState, useEffect, useRef } from "react";
import { contactIcons } from "./data";

const translations = {
  "pt-BR": {
    time: "Tempo decorrido",
    footerParagraph: "criado por Victor Almeida em 2022",
    seconds: "segundos",
    minutes: "minutos",
  },
  en: {
    time: "Elapsed time",
    footerParagraph: "create by Victor Almeida in 2022",
    seconds: "seconds",
    minutes: "minutes",
  },
};

const Contacts = () => {
  const translate = useTranslate(translations);
  const [reachedBottom, setReachedBottom] = useState(false);
  const [time, setTime] = useState(0);
  const endOfPageRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!reachedBottom) {
        setTime(time + 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time, reachedBottom]);

  useEffect(() => {
    if (endOfPageRef?.current) {
      const { offsetTop } = endOfPageRef.current;
      if (window.innerHeight + window.scrollY >= offsetTop) {
        setReachedBottom(true);
      }
    }
  }, [time, endOfPageRef]);

  function formatTime(time: number) {
    if (time < 60) {
      return time + " " + translate("seconds");
    } else {
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      return (
        minutes +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds) +
        " " +
        translate("minutes")
      );
    }
  }

  return (
    <div className="bg-[#00000035] text-center pb-10 m-0">
      <section className="min-h-[auto]" id="contacts">
        <div
          className={`mt-12 mb-24 duration-300 ${
            reachedBottom ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <h1 className="text-main-color">THANKS FOR SCROLLING!</h1>
          <p className="mt-7">
            {translate("time")}: {formatTime(time)}
          </p>
        </div>
        <div className="min-w-[240px] mx-auto mb-2 flex flex-wrap gap-4 justify-center">
          {[
            {
              flip: "flip-left",
              delay: "0",
              borderClass: "border-[#d93f21]",
              imgSrc: contactIcons[0].icon,
              imgAlt: contactIcons[0].alt,
              label: "victorh.almeida7@gmail.com",
              href: contactIcons[0].link,
            },
            {
              flip: "flip-right",
              delay: "300",
              borderClass: "border-[#019041]",
              imgSrc: contactIcons[1].icon,
              imgAlt: contactIcons[1].alt,
              label: "+55 (86) 9.9548-3472",
              href: contactIcons[1].link,
            },
          ].map((i) => (
            <a
              data-aos={i.flip}
              data-aos-once="true"
              data-aos-delay={i.delay}
              className={`border-[1px] ${i.borderClass} w-60 py-2 no-underline text-xs flex items-center justify-center gap-1 rounded-md hover:text-white`}
              href={i.href}
            >
              <span>
                <img className="h-6 w-6" src={i.imgSrc} alt={i.imgAlt} />
              </span>
              &nbsp;{i.label}
            </a>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-4">
          {contactIcons.map((ic, i) => (
            <a key={i} href={ic.link}>
              <img className="w-[25px] h-[25px]" src={ic.icon} alt={ic.alt} />
            </a>
          ))}
        </div>
      </section>
      <div className="h-[2px] bg-[#4e54fd] mb-3" />
      <footer>
        {" "}
        <p>&copy; {translate("footerParagraph")}</p>{" "}
      </footer>
      <div ref={endOfPageRef} />
    </div>
  );
};

export default Contacts;
