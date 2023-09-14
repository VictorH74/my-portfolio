import useTranslate from "@/hooks/UseTranslate";
import { downloadCv } from "@/utils/cv";
import { navData } from "../../data";
import { ToggleBtn, HamburgerContainer, LiItem, NavListMobile } from "./styles";
import { useEffect, useRef, useState } from "react";

const translations = {
  "pt-BR": {
    navData: navData.navDataPtBR,
    downloadCvBtnInnerText: "baixar currículo",
  },
  en: {
    navData: navData.navDataEN,
    downloadCvBtnInnerText: "download cv",
  },
};

const Hamburger = () => {
  const translate = useTranslate(translations);
  const liItemRef = useRef(null);
  const [show, setShow] = useState(false);

  const data: { label: string; to: string }[] = translate("navData") as {
    label: string;
    to: string;
  }[];

  const toggle = () => {
    setShow((prev) => !prev);
  };

  useEffect(() => {
    const liElements = document.getElementsByClassName("li-item");
    const hamburgerBtnLine1 = document.getElementById("hamburger-btn-line-1");
    const hamburgerBtnLine2 = document.getElementById("hamburger-btn-line-2");
    const hamburgerBtnLine3 = document.getElementById("hamburger-btn-line-3");

    if (show) {
      for (const element of liElements) {
        element.classList.add("opened-li");
      }
      hamburgerBtnLine1?.classList.add("line-40deg");
      hamburgerBtnLine2?.classList.add("line-0-scale-y");
      hamburgerBtnLine3?.classList.add("line--40deg");
    } else {
      for (const element of liElements) {
        element.classList.remove("opened-li");
      }
      hamburgerBtnLine1?.classList.remove("line-40deg");
      hamburgerBtnLine2?.classList.remove("line-0-scale-y");
      hamburgerBtnLine3?.classList.remove("line--40deg");
    }
  }, [show]);

  return (
    <HamburgerContainer>
      <ToggleBtn id="hamburger-btn" onClick={toggle}>
        {Array(3)
          .fill(undefined)
          .map((_, i) => (
            <span
              key={i}
              id={`hamburger-btn-line-${i + 1}`}
              className={`line`}
            ></span>
          ))}
      </ToggleBtn>
      <NavListMobile className="nav-list">
        <ul className="nav-ul">
          {data.map((data, i) => (
            <LiItem
              className="li-item"
              delay={`${i}00ms`}
              key={i}
              ref={liItemRef}
              onClick={() => window.location.replace(`#${data.to || ""}`)}
            >
              {data.label}
            </LiItem>
          ))}
          <LiItem
            ref={liItemRef}
            delay={`${data.length}00ms`}
            onClick={downloadCv}
            className="li-item"
          >
            {translate("downloadCvBtnInnerText")}
          </LiItem>
        </ul>
      </NavListMobile>
    </HamburgerContainer>
  );
};

export default Hamburger;
