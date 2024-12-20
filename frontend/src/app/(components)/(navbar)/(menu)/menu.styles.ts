import { colors } from "@/app/global.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const MenuContainer = styled.nav`
  position: fixed;
  z-index: 12;
  top: 4.4rem;
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background: ${colors.mediumGreen};
  width: auto;
  height: auto;
  padding: 0.5rem 0;

  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: translateX(-100%);
  opacity: 0;

  &.visible {
    transform: translateX(0);
    opacity: 1;
  }

  @media (min-width: 867px) {
    max-height: 45vh;
  }
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  max-width: fit-content;
  height: 25%;
  gap: 1rem;

  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 1rem 1rem 1rem 0;
    font-family: "Roboto", sans-serif;
    font-size: 1.2rem;
    font-weight: 500;
    color: ${colors.black};
    text-decoration: none;
    transition: color 0.2s ease-in;

    &:hover {
      outline: none;
      color: ${colors.lightGreen};

      font-weight: 600;
    }
  }

  @media (min-width: 867px) {
    gap: 0.5rem;
    a {
      font-size: 1.2rem;
    }
  }
`;

export const MenuIcons = styled(FontAwesomeIcon)`
  color: ${colors.black};
  width: 2rem;
  margin-left: 0.5rem;

  &:hover {
    color: ${colors.lightGreen};
  }
`;
