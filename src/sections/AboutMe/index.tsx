import { AboutMeContainer, BtnContainer, Content, DownloadCvBtn, Line } from "./styles";
import MeJPG from "@/assets/me.jpg"
import { aboutMeData } from "./data";
import { downloadCv } from "@/utils/cv";
import useTranslate from "@/hooks/UseTranslate";

const translations = {
    "pt-BR": {
        title: "Me conheça",
        aboutMeData: aboutMeData.PT,
        downloadCvText: "Baixar Currículo",
        cvSizeText: "Tamanho"
    },
    "en": {
        title: "About Me",
        aboutMeData: aboutMeData.EN,
        downloadCvText: "Download CV",
        cvSizeText: "Size"
    },
}

const AboutMe = () => {
    const translate = useTranslate(translations)

    // const data = translate("aboutMeData")

    const data: { name: string, about: string[] } = translate("aboutMeData") as { name: string, about: string[] }

    return (
        <section className="pt-24" id="about-me">
            <h1 className="section-title mb-12">{translate("title")}</h1>
            <Content>
                <div data-aos-once="true" data-aos="fade-up-right" data-aos-duration="1000" >
                    <div className="paragraphs">
                        {data.about.map((p, i) => <p key={i}>{p}</p>)}
                    </div>

                </div>
                <div className="img-container" data-aos="zoom-in" data-aos-once="true" data-aos-delay="300" data-aos-duration="400" >
                    <img src={MeJPG} alt="" />
                </div>
            </Content>
            <BtnContainer>
                <Line className="btn-container-line" />
                <DownloadCvBtn onClick={downloadCv} data-tooltip={`${translate("cvSizeText")}: 63kb`} >
                    <div className="button-wrapper">
                        <div className="text">{translate("downloadCvText")}</div>
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path></svg>
                        </span>
                    </div>
                </DownloadCvBtn>
                <Line className="btn-container-line" />
            </BtnContainer>
        </section>
    )
}

export default AboutMe;