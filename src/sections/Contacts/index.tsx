"use client";
import React from "react";
import useLanguage from "@/hooks/UseLanguage";
import { useTheme } from "@/hooks/UseTheme";
import { contactsSection } from "@/utils/translations";
import ContactLinks from "@/components/LinkList";

const Contacts = () => {
  const [time, setTime] = React.useState(0);
  const [reachedBottom, setReachedBottom] = React.useState(false);
  const { themeColor } = useTheme();
  const endOfPageRef = React.useRef(null);
  const lang = useLanguage();
  const translate = contactsSection[lang];

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (!reachedBottom) {
        setTime(time + 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time, reachedBottom]);

  React.useEffect(() => {
    if (endOfPageRef?.current) {
      const { offsetTop } = endOfPageRef.current;
      if (window.innerHeight + window.scrollY >= offsetTop) {
        setReachedBottom(true);
      }
    }
  }, [time, endOfPageRef]);

  function formatTime(time: number) {
    if (time < 60) {
      return time + " " + translate.seconds;
    } else {
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      return (
        minutes +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds) +
        " " +
        translate.minutes
      );
    }
  }

  return (
    <div className="bg-[#00000035] text-center pb-10 m-0 mt-10 rounded-tl-3xl rounded-tr-3xl">
      <section className="min-h-[auto]" id="contacts">
        <div
          className={`mt-12 mb-10 duration-300 select-none ${
            reachedBottom ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <h1 style={{ color: themeColor }} className="text-3xl">
            THANKS FOR SCROLLING!
          </h1>
          <p className="mt-7 secondary-font-color">
            {translate.time}: {formatTime(time)}
          </p>
        </div>

        <div className="mt-4">
        <ContactLinks center />
        </div>
      </section>
      <div style={{ backgroundColor: themeColor }} className="h-[2px] mb-3" />
      <footer className="mt-4">
        {" "}
        <p className="secondary-font-color">
          &copy; {translate.footerParagraph}
        </p>{" "}
      </footer>
      <div ref={endOfPageRef} />
    </div>
  );
};

export default Contacts;
