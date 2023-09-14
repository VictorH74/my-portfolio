import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  height: 45px;
`;

export const Point = styled.div`
  width: 15px;
  height: 15px;
  background-color: var(--mainColor);
  border-radius: 50%;

  animation-name: move;
  animation-duration: 700ms;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  &:nth-child(2) {
    animation-delay: 200ms;
  }
  &:nth-child(3) {
    animation-delay: 400ms;
  }

  @keyframes move {
    from {
        transform: translateY(-50%);
    } to {
        transform: translateY(50%);
    }
  }

`;
