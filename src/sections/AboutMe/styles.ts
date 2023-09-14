import styled from "styled-components";

export const AboutMeContainer = styled.section`
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    & .paragraphs {
        max-width: 800px;
    }

    & div:nth-child(1) {
        flex: 1 1 400px;
        & p {
            font-family: 'Noto Sans', sans-serif;
            font-size: 1.1rem;
            line-height: 30px;
        }
    }

    .img-container {
        flex: 0 0 auto;
        margin: auto;
        & img {
            height: 300px;
            width: 300px;
            border-radius: 50%;
            object-fit: cover;
            box-shadow: 3px 3px 1px var(--mainColor);
        }
        @media (max-width: 750px) {
            margin: 20px auto;
            width: fit-content;
            & img {
                height: auto;
                width: 100%;
                max-width: 300px;
            }
        }
        
    }
`;

export const BtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;

    & .btn-container-line{
        flex: 1 1 auto;
        background-color: var(--mainColor);
    }
`;

export const DownloadCvBtn = styled.div`
    --width: 180px;
    --height: 55px;
    --tooltip-height: 35px;
    --tooltip-width: 130px;
    --gap-between-tooltip-to-button: calc(var(--tooltip-height) + 3px);
    --tooltip-color: #fff;
    text-transform: uppercase;
    background-color: var(--mainColor);
    border-radius: 8px;
    border: none;
    margin: 40px auto;
    transition: 200ms;
    cursor: pointer;
    width: var(--width);
    height: var(--height);
    position: relative;
    text-align: center;
    border-radius: 0.45em;

    &::before {
        position: absolute;
        content: attr(data-tooltip);
        width: var(--tooltip-width);
        height: var(--tooltip-height);
        background-color: var(--tooltip-color);
        font-size: 0.9rem;
        color: #111;
        border-radius: .25em;
        line-height: var(--tooltip-height);
        bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) + 10px);
        left: calc(50% - var(--tooltip-width) / 2);
    }

    &::after {
        position: absolute;
        content: '';
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-top-color: var(--tooltip-color);
        left: calc(50% - 10px);
        bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) - 10px);
    }

    &::after,&::before {
        opacity: 0;
        visibility: hidden;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
    }

    .text {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
    }

    .button-wrapper,.text,.icon {
        overflow: hidden;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        color: #fff;
    }

    .text {
        top: 0;
    }

    .text,.icon {
        -webkit-transition: top 0.5s;
        transition: top 0.5s;
    }

    .icon {
        color: #fff;
        top: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    &:hover {
        background: #6c18ff;
    }

    &:hover .text {
        top: -100%;
    }

    &:hover .icon {
        top: 0;
    }

    &:hover:before,&:hover:after {
        opacity: 1;
        visibility: visible;
    }

    &:hover:after {
        bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) - 20px);
    }

    &:hover:before {
        bottom: calc(var(--height) + var(--gap-between-tooltip-to-button));
    }
`;

export const EducationList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 30px;
`;

export const EducationContainer = styled.div`
    margin-top: 20px;
    & h2 {
        margin-bottom: 20px;
    }
`;

export const Line = styled.div`
    height: 2px;
    background: var(--mainColor);
    margin: 20px 0;
`;