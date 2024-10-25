import { colors } from "@/app/global.styles";
import styled from "styled-components";

export const MenuContainer = styled.nav`
  border-radius: 8px;
  background: ${colors.lightGray};
  max-width: fit-content;
  height: 40%;
`;

export const MenuItem = styled.li`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  a {
    padding: 2rem 2.2rem 0 0;
    font-family: "Roboto", sans-serif;
    text-decoration: none;
  }
`;
