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

export const StyledIcon = styled(FontAwesomeIcon)`
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

export const AccountLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
  margin-right: 3rem;
  max-width: fit-content;
  height: 5rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.2;
    height: 3.25rem;
    width: 6rem;
    padding: 1rem;
    border: 1px solid ${colors.black};
    border-radius: 5px;
    background-color: transparent;
    color: ${colors.black};
    text-decoration: none;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: ${colors.slaterGray};
      opacity: 0.6;
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
