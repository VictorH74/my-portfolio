import styled from "styled-components";

interface WrapperProps {
    top: number;
    left: number;
    height: number;
    width: number;
}

interface HeaderContentProps {
    scrollUp: boolean;
}

export const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
`;

export const HeaderContent = styled.div`
    background-color: ${({ scrollUp }: HeaderContentProps) => scrollUp ? "transparent" : "#00000055"};
    backdrop-filter: blur(8px);
    padding: 10px 10px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    height: fit-content;
    transition: 280ms;

    & h1 {
        flex: 1 0 auto;
        font-family: 'Raleway', sans-serif;
        color: var(--mainColor);
        text-decoration: line-through;
        user-select: none;
        translate: 0 4px;
    }

    & nav {
        @media (max-width: 900px) {
            display: none;
        }
        z-index: 4;
    }

    & nav ul { 
        display: flex; 
        flex-wrap: wrap; 
        align-items: center;
        margin: 0;
        padding: 0;
    }

    & nav ul li {
        cursor: pointer;
        list-style: none;
        padding: 10px;
        font-family: 'Noto Sans', sans-serif;
        font-size: 1rem;
        font-weight: bold;
        transition: 200ms;
        text-transform: uppercase;
        user-select: none;
    }
    
    & nav ul li, .download-cv-btn {
        color: var(--fontColor_2);
    }    

    & nav ul li:hover { color: white; }

    & .btn-li {
        padding: 0;
    }

    & .download-cv-btn{
        text-transform: uppercase;
        border: none;
        padding: 10px;
        border-radius: 20px;
    }
`;

export const Wrapper = styled.div`
    display: ${({ display }: { display: string }) => display};
    position: absolute;
    background-color: var(--mainColor);
    border-radius: 20px;
    transition: 190ms;
    pointer-events: none;
    z-index: 3;
`;

