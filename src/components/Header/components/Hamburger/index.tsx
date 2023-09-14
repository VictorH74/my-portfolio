"use client";
import { downloadCv } from "@/utils/cv";
import { ToggleBtn, HamburgerContainer, LiItem, NavListMobile } from "./styles";
import React from "react";

interface Props {
  navData: {
    label: string;
    to: string;
  }[];
  downloadCvBtnInnerText: string;
}

const Hamburger = (props: Props) => {
  const [show, setShow] = React.useState(false);
  const liItemRef = React.useRef(null);

  const toggle = React.useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  React.useEffect(() => {
    const liElements = document.getElementsByClassName("li-item");
    const hamburgerBtnLine1 = document.getElementById("hamburger-btn-line-1");
    const hamburgerBtnLine2 = document.getElementById("hamburger-btn-line-2");
    const hamburgerBtnLine3 = document.getElementById("hamburger-btn-line-3");

    if (show) {
      for (let i = 0; i < liElements.length; i++) {
        liElements[i].classList.add("opened-li");
      }

      hamburgerBtnLine1?.classList.add("line-40deg");
      hamburgerBtnLine2?.classList.add("line-0-scale-y");
      hamburgerBtnLine3?.classList.add("line--40deg");
    } else {
      for (let i = 0; i < liElements.length; i++) {
        liElements[i].classList.remove("opened-li");
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
          {props.navData.map((data, i) => {
            const last = i === props.navData.length - 1;
            return (
              <LiItem
                className="li-item"
                style={{
                  display: document.body.offsetWidth > 1023 ? "none" : "block",
                  transitionDelay: `${i || 0}00ms`,
                }}
                key={i}
                ref={liItemRef}
                onClick={
                  last
                    ? downloadCv
                    : () => window.location.replace(`#${data.to || ""}`)
                }
              >
                {last ? props.downloadCvBtnInnerText : data.label}
              </LiItem>
            );
          })}
        </ul>
      </NavListMobile>
    </HamburgerContainer>
  );
};

export default React.memo(Hamburger);
