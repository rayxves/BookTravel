"use client";

import { colors } from "@/app/global.styles";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  height: 100vh;
  padding: 1.5rem;
  font-family: Inter, sans-serif;
  background: ${colors.darkGray};

  overflow: scroll;
`;

export const Header = styled.h1`
  padding: 1rem;
  width: 100%;
  height: 10%;
  color: ${colors.lightGray};
  border-bottom: 1px solid ${colors.lightGray};
  text-align: center;
  margin-bottom: 1rem;
`;

export const SubHeader = styled.h2`
  width: 100%;
  height: fit-content;
  color: ${colors.lightGray};
  margin: 2rem 0;
`;

export const Paragraph = styled.p`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  padding-bottom: 1rem;
  color: ${colors.lightGray};
  font-size: 0.9rem;
  line-height: 1.3;

  @media (min-width: 560px) {
    font-size: 1.05rem;
    line-height: 1.6;
  }

  @media (min-width: 887px) {
    font-size: 1.3rem;
  }
  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style-type: disc;

  height: auto;
  width: 100%;

  @media (min-width: 560px) {
    gap: 1.5rem;
    flex-direction: row;
    width: 95%;
  }

  @media (min-width: 887px) {
    gap: 2rem;
  }
`;

export const ListItem = styled.li`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  box-shadow: 4px 4px 4px rgba(1, 1, 1, 1);
  padding: 1rem;
  padding-bottom: 1.3rem;
  height: 100%;
  width: 100%;
  color: ${colors.lightGray};
  font-size: 0.7rem;
  line-height: 1;

  @media (min-width: 560px) {
    font-size: 0.9rem;
    line-height: 1.2;
  }
  @media (min-width: 887px) {
    max-width: 450px;

    font-size: 1.1rem;
  }
  @media (min-width: 1124px) {
    max-width: 450px;

    font-size: 1.4rem;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  width: 50%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const FooterContainer = styled.div`
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 35vh;

  @media (min-width: 560px) {
    height: 40vh;
  }
  @media (min-width: 887px) {
    height: 43vh;
  }
`;
