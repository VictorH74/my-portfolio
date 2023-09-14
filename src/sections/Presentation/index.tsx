import useTranslate from "@/hooks/UseTranslate";
import { Inner, PresentationSection } from "./styles";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Loading from "@/components/Loading";


const translations = {
    "pt-BR": {
        hello: "Olá!",
        iAm: "Eu sou Victor Almeida",
        a: ["Um", "Desenvolvedor", "Full-Stack", "Junior"],
        text_3: "Um Desenvolvedor de Software Júnior",
        text_4: "@ FullStack"
    },
    "en": {
        hello: "Hello!",
        iAm: "I'm Victor Almeida",
        a: ["A", "Full-Stack", "Developer", "Junior"],
        text_3: "A Software Engineer Junior",
        text_4: "@ FullStack"
    },
}

const Presentation = () => {
    const translate = useTranslate(translations)

    return (
        <PresentationSection>
            <Inner>
                <h2>{translate("hello")}</h2>
                <h1 className="emphasy">{translate("iAm")}</h1>
                <h2>{translate("text_3")}</h2>
                <h2 translate="no">{translate("text_4")}</h2>
            </Inner>
            <KeyboardDoubleArrowDownIcon className="down-icon" sx={{fontSize: 50, color: "var(--mainColor)"}} />
        </PresentationSection>
    )
}

export default Presentation;