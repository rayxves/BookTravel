"use client";

import { colors } from "@/app/global.styles";
import styled from "styled-components";

export const AboutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  padding-bottom: 2rem;
  background: ${colors.darkGray};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: auto;
  min-height: 100vh;
  padding: 1.5rem;
  font-family: Inter, sans-serif;
  background: ${colors.darkGray};

  overflow-y: auto;
  position: relative;
  flex-grow: 1;
`;

export const Header = styled.h1`
  padding: 1.2rem;
  width: 100%;
  height: auto;
  color: ${colors.lightGray};
  border-bottom: 1px solid ${colors.lightGray};
  text-align: center;
  margin-bottom: 1.2rem;
`;

export const SubHeader = styled.h2`
  width: 100%;
  height: auto;
  color: ${colors.lightGray};
  margin: 1.2rem 0;
`;

export const Paragraph = styled.p`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 1rem 0;
  color: ${colors.lightGray};
  font-size: 0.9rem;
  line-height: 1.1;

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

  place-items: center;
  height: 100%;
  width: 100%;
  padding: 1rem;
  flex-grow: 1;
  @media (min-width: 560px) {
    gap: 1.5rem;
  }

  @media (min-width: 1124px) {
    flex-direction: row;
    gap: 2rem;
    height: 10rem;
  }
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  box-shadow: 4px 4px 4px rgba(1, 1, 1, 1);
  padding: 1.5rem;
  padding: 1.3rem;
  height: 100%;
  width: 100%;
  color: ${colors.lightGray};
  font-size: 0.9rem;
  line-height: 1.2;

  @media (min-width: 560px) {
    font-size: 1rem;
  }
  @media (min-width: 887px) {
    font-size: 1.2rem;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  width: 50%;
  height: auto;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const FooterContainer = styled.div`
  padding-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  flex-grow: 1;

  @media (min-width: 878px) {
    padding-bottom: 1rem;
  }
`;
