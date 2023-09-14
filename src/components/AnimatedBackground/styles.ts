import styled from "styled-components";

interface CircleProps {
    left: () => number;
    size: number;
    duration: () => number;
    delay: () => number;
}

export const Circles = styled.ul`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
`;

export const Circle = styled.li`
    
    position: absolute;
    display: block;
    list-style: none;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 25s linear infinite;
    bottom: -150px;
    ${(props: CircleProps) => `
        left: ${props.left()}%;
        height: ${props.size}px;
        width: ${props.size}px;
        animation-delay: ${props.delay()}s;
        animation-duration: ${props.duration()}s;
    `}

    @keyframes animate {
        0%{
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 10px;
        }
        100%{
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
        }
    }
`;