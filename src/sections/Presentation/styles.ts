import styled from "styled-components";

export const PresentationSection = styled.section`
  margin-top: 15vh;
  position: relative;
  height: 85vh;
  font-family: "Nunito", sans-serif;

  & h1 {
    &.emphasy {
      color: var(--mainColor);
    }
  }

  & h2 {
    margin-right: 10px;
  }

  & .down-icon {
    position: absolute;
    left: 50%;
    bottom: 50px;
    translate: -50% 0;
    animation-name: move;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-direction: alternate;
    animation-iteration-count: infinite;

    @keyframes move {
      from {
        bottom: 60px;
      }
      to {
        bottom: 40px;
      }
    }
  }
`;

export const Inner = styled.div`
  margin-top: 7%;
  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 3rem;
  }

  @media screen and (max-width: 630px) {
    & h1 {
      font-size: 3em;
    }
    & h2 {
      font-size: 2.5em;
    }
  }

  @media screen and (max-width: 430px) {
    & h1 {
      font-size: 2.2em;
    }
    & h2 {
      font-size: 1.7em;
    }
  }
`;

export const H2 = styled.h2`
  border-left: 4px double var(--mainColor);
  padding-left: 15px;
`;
