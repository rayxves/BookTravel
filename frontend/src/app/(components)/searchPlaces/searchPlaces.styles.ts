import { colors } from "@/app/global.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const SearchPageContainer = styled.div`
  background: ${colors.darkGray};
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 1rem;
  margin-top: 0.1rem;

  box-shadow: 0px 4px 0px rgba(1, 1, 1, 0.2);
  width: 100%;
  height: 22%;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  width: 60%;
  max-width: 650px;
  height: 2rem;
  background: ${colors.lightGray};
  border-radius: 1rem;

  @media (min-width: 868px) {
    height: 2.5rem;
  }
`;

export const SearchBar = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  padding: 1rem;
`;

export const SearchIcon = styled(FontAwesomeIcon)`
  width: 2rem;
  margin: 0.5rem;
  color: ${colors.darkGray};
  cursor: pointer;
`;

export const SearchDescription = styled.p`
  display: flex;
  justify-content: center;
  align-items: end;
  color: ${colors.lightGray};
  font-family: "Inter", sans-serif;
  width: 100%;
  height: 3rem;
  padding: 1rem;
  margin-top: 0.5rem;

  @media (min-width: 868px) {
    font-size: 1.1rem;
  }
`;

export const ResponsiveImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 70%;

  .small-screen {
    object-fit: cover;
    display: block;
  }

  .large-screen {
    display: none;
  }

  @media (min-width: 768px) {
    .small-screen {
      display: none;
    }
    .large-screen {
      object-fit: cover;
      display: block;
    }
  }
`;
