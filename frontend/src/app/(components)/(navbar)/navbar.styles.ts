import { colors } from "@/app/global.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const NavbarContainer = styled.div`
  margin: 0;
  width: 100%;
  height: 5rem;
  background: ${colors.lightGray};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Logo = styled.div`
  width: 12rem;
  height: 5rem;
  img {
    object-fit: cover;
    width: 12rem;
    height: 5rem;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    height: 4.65rem;
    img {
      object-fit: cover;
      height: 4.65rem;
    }
  }
`;

export const UserIcon = styled(FontAwesomeIcon)`
  color: ${colors.black};
  font-size: 1.5rem;
  padding: 1.75rem 1.4rem;
  width: 3.5rem;
  &:hover {
    color: ${colors.gray};
  }

  @media (min-width: 868px) {
    display: none;
  }
`;

export const MenuIcon = styled(FontAwesomeIcon)`
  color: ${colors.black};
  font-size: 1.5rem;
  padding: 1.75rem 1.4rem;
  width: 3.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:hover {
    color: ${colors.gray};
  }
`;

export const AccountLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3.3rem;
  margin-right: 3rem;
  max-width: fit-content;
  height: 5rem;

  a {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.3;
    padding: 0.3rem;
    height: 3.25rem;
    width: 6rem;
    border: 1px solid ${colors.black};
    border-radius: 8px;
    background-color: transparent;
    color: ${colors.black};
    text-decoration: none;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: ${colors.mostLightGray};

    }
  }

  @media (max-width: 867px) {
    display: none;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-right: 3rem;
  max-width: fit-content;
  height: 5rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 3.25rem;
    width: 7.5rem;

    background-color: transparent;
    color: ${colors.black};
    text-decoration: none;

    &:hover {
      color: ${colors.darkGray};
      opacity: 0.6;
    }
  }

  @media (max-width: 867px) {
    display: none;
  }
`;

export const Button = styled.button`
  background: transparent;
  border: none;
  padding: 1.75rem 1.4rem;
  width: 3.5rem;
  height: 5rem;
  position: relative;
`;
