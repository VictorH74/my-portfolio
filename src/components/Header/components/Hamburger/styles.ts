import styled from "styled-components";

export const NavListMobile = styled.div`
  display: none;
  position: fixed;
  top: 100px;
  right: -20px;
  pointer-events: none;

  & ul {
    overflow: hidden;
  }

  @media (max-width: 1023px) {
    display: block;
  }
`;

export const HamburgerContainer = styled.div`
  position: relative;
  display: none;
  @media (max-width: 1023px) {
    display: block;
  }
`;

export const LiItem = styled.li`
  border-radius: 10px 0 0 10px;
  pointer-events: all;
  z-index: 1;
  cursor: pointer;
  font-size: 0.8rem;
  list-style: none;
  text-transform: uppercase;
  padding: 10px 20px 10px 30px;
  margin: 20px 0;
  translate: 101% 0;
  transition: 200ms;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  &.opened-li {
    translate: 0 0;
  }

  &:last-child {
    background: linear-gradient(
      30deg,
      rgba(181, 22, 212, 1) 20%,
      rgba(77, 77, 205, 1) 100%
    );
  }
`;

export const Lines = styled.div`
  height: 26px;
  width: 32px;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .line {
    display: block;
    height: 4px;
    width: 100%;
    border-radius: 10px;
    background: var(--mainColor);
    &:nth-child(1) {
      transform-origin: 0% 0%;
      transition: transform 0.4s ease-in-out;
    }
    &:nth-child(2) {
      transition: transform 0.2s ease-in-out;
    }
    &:nth-child(3) {
      transform-origin: 0% 100%;
      transition: transform 0.4s ease-in-out;
    }
  }
`;

export const ToggleBtn = styled.div`
  display: block;
  cursor: pointer;
  border: none;
  height: 26px;
  width: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .line {
    display: block;
    height: 4px;
    width: 100%;
    border-radius: 10px;
    &:nth-child(1) {
      transform-origin: 0% 0%;
      transition: transform 0.4s ease-in-out;
    }
    &:nth-child(2) {
      transition: transform 0.2s ease-in-out;
    }
    &:nth-child(3) {
      transform-origin: 0% 100%;
      transition: transform 0.4s ease-in-out;
    }
  }

  & .line-40deg {
    transform: rotate(45deg);
  }

  & .line--40deg {
    transform: rotate(-45deg);
  }

  & .line-0-scale-y {
    transform: scaleY(0);
  }

  &:checked ~ .lines .line:nth-child(1) {
    transform: rotate(45deg);
  }

  &:checked ~ .lines .line:nth-child(2) {
    transform: scaleY(0);
  }

  &:checked ~ .lines .line:nth-child(3) {
    transform: rotate(-45deg);
  }
`;
