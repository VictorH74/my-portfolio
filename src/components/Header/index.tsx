import React, { useCallback, useEffect, useRef, useState } from "react";
import useWindowSize from "@/hooks/UseWindowsSize";
import { downloadCv } from "@/utils/cv";
import Hamburger from "./components/Hamburger";
import { HeaderContent, Wrapper, StyledHeader } from "./styles";
import useTranslate from "@/hooks/UseTranslate";
import { navData } from "./data";


const translations = {
    "pt-BR": {
        navData: navData.navDataPtBR,
        downloadCvBtnInnerText: "baixar currículo"
    },
    en: {
        navData: navData.navDataEN,
        downloadCvBtnInnerText: "download cv"
    }
}

const Header: React.FC = () => {
    const [scrollUp, setScrollUp] = useState(true);
    const downloadCvBtnRef = useRef(null);
    const size = useWindowSize();
    const [wrapperDimensions, setWrapperDimensions] = useState({ width: 0, height: 0, left: 0 });
    const [wapperDisplay, setWapperDisplay] = useState("none");

    const translate = useTranslate(translations)

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("scroll", handleScroll);
        }
    }, [])

    useEffect(() => {
        if (downloadCvBtnRef?.current) {
            setTimeout(() => {
                moveWrapperToDownloadBtn()
                setWapperDisplay("block")
            }, 800)
        }
    }, [downloadCvBtnRef])

    useEffect(() => {
        moveWrapperToDownloadBtn();
    }, [size]);

    // background da navbar
    const handleScroll = useCallback(() => {
        let pageY = window.pageYOffset

        setScrollUp(pageY <= 40)
    }, []);

    const handleMouseOver = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
        const li = e?.currentTarget;

        if (li) {
            const { width, height } = li.closest("li")?.getBoundingClientRect() || { width: 0, height: 0 };
            setWrapperDimensions({ width, height, left: li.offsetLeft });
        }
    }, []);

    const moveWrapperToDownloadBtn = useCallback(() => {
        if (!downloadCvBtnRef?.current) return;
        let li = downloadCvBtnRef.current as HTMLElement;

        const { width, height } = li.closest("li")?.getBoundingClientRect() || { width: 0, height: 0 };
        setWrapperDimensions({ width, height, left: li.offsetLeft });
    }, []);

    const data: { label: string, to: string }[] = translate("navData") as { label: string, to: string }[]

    return (
        <StyledHeader>
            <HeaderContent scrollUp={scrollUp}>
                <h1>VH</h1>
                <Wrapper display={wapperDisplay} style={wrapperDimensions} />
                <nav onMouseOut={moveWrapperToDownloadBtn}>
                    <ul>
                        {data.map((data, i) => (
                            <li
                                key={i}
                                onClick={() => window.location.replace(`#${data.to || ""}`)}
                                onMouseOver={handleMouseOver}
                            >{data.label}</li>
                        ))}
                        <li onMouseOver={handleMouseOver} className="btn-li" >
                            <button className="download-cv-btn" ref={downloadCvBtnRef}
                                onClick={downloadCv}
                            >{translate("downloadCvBtnInnerText")}</button>
                        </li>
                    </ul>
                </nav>
                <Hamburger />
            </HeaderContent>
        </StyledHeader>
    )
}

export default React.memo(Header)