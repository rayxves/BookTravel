import { colors } from "@/app/global.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const NavbarContainer = styled.div`
  margin: 0;
  width: 100%;
  height: 5rem;
  background: ${colors.mediumGreen};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Logo = styled.div`
  width: 15rem;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &:hover {
    color: ${colors.lightGreen};
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
    color: ${colors.lightGreen};
  }
`;

export const AccountLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  margin-right: 3.2rem;
  width: 16rem;
  height: 5rem;

  a {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 1.05rem;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 2.65rem;
    width: 100%;
    border: 2px solid ${colors.black};
    border-radius: 10px;
    background-color: transparent;
    color: ${colors.darkGray};
    text-decoration: none;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      color: ${colors.black};
      background-color: ${colors.lightGreen};
    }
  }

  @media (max-width: 867px) {
    display: none;
  }
`;

export const IconLink = styled.a`
  position: relative;

  font-size: 1.5rem;
  padding: 1.75rem 1.4rem;
  width: 3.5rem;
  height: 5rem;

  @media (min-width: 868px) {
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
