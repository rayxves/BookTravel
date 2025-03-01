import styled, { createGlobalStyle } from "styled-components";

export const colors = {
  black: "black",
  mediumGreen: "#395B46",
  green: "#24422F",
  darkGray: "rgba(17, 17, 17, 6.67)",
  gray: "#1B1B1B",
  slaterGray: "#788AA3",
  paynesGray: "#666A86",
  lightGray: "#BDBDBD",
  lightGreen: "#548568",
  white: "#FFFFF",
  darkGreen: "#13271b",
};

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.google.com/share?selection.family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900|Noto+Sans:ital,wght@0,100..900;1,100..900|Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900');
`;

export const InicialPageContainer = styled.div`
  background: ${colors.darkGray};
  margin: 0;
  display: flex;
  flex-direction: column;
`;
