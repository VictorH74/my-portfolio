import { createGlobalStyle } from "styled-components";

enum VARIANT {
    PRIMARY,
    SECONDARY
}
interface IProps {
    variant?: VARIANT
}

export const GlobalStyles = createGlobalStyle<IProps>`
    :root {
        ${ props => {
            switch (props.variant) {
                case VARIANT.SECONDARY:
                    return `
                    --fontColor: ${props.theme.light.text};
                    --fontColor_2: ${props.theme.light.text_2};
                    --bgColor: ${props.theme.light.bg};
                    `;
                case VARIANT.PRIMARY:
                default:
                    return `
                    --fontColor: ${props.theme.dark.text};
                    --fontColor_2: ${props.theme.dark.text_2};
                    --bgColor: ${props.theme.dark.bg};
                    `;
            }
        }}
        --mainColor: #4e54fd;
        /* --mainColor: #5559d4; */
        --mainColorTransparent: #4d4dcd50;
    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        background-color: transparent;
    }

    html, body {
        background-color: var(--bgColor);
        font-family: 'Noto Sans', sans-serif;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;

        color-scheme: light dark;
        color: var(--fontColor);
        
        transition: 250ms;
        overflow-x: hidden;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
    }

    a {
        color: rgba(255, 255, 255, 0.87);
    }

    button {
        user-select: none;
    }

    h1 {
        line-height: 1.1;
    }

    section {
        min-height: 65vh;
        & .section-title {
            @media (min-width: 700px) {
                font-size: 2rem;
            }
        }
    }

    section, header {
        max-width: 1300px;
        margin: auto;
        padding: 20px;
        /* border: 1px solid purple; */
    }

    ::-webkit-scrollbar {
        background-color: transparent;
        width: 10px;
    }

    ::-webkit-scrollbar-thumb{
        background-color: var(--mainColor);
        border-radius: 5px;
    }

    /* @media (prefers-color-scheme: dark) {
        :root {
            color: #213547;
            background-color: #ffffff;
        }
        a:hover {
            color: #747bff;
        }
        button {
            background-color: #f9f9f9;
        }
    } */
`;