"use client";
import { colors } from "@/app/global.styles";
import { styled } from "styled-components";

export const FavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${colors.darkGray};
  width: 100%;
  height: 100vh;

`;

export const FavCardsContainer = styled.div`
  width: 100%;

  flex: 1;
  overflow-y: auto;

  background: ${colors.darkGray};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  padding: 1.3rem;

  gap: 1.3rem;
  place-items: start;
`;

export const MessageContainer = styled.div`
  padding: 2rem;
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  a {
    display: flex;
    align-items: start;
    justify-content: center;
    text-decoration: none;
    color: ${colors.lightGreen};
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 1.2rem;

    height: 50%;

    @media (min-width: 787px) {
      font-size: 1.5rem;
      height: fit-content;
      width: fit-content;
    }

    @media (min-width: 1124px) {
      font-size: 1.9rem;
      height: fit-content;
      width: fit-content;
    }
  }

  a:hover {
    opacity: 0.8;
  }
`;

export const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.lightGray};
  font-size: 1.2rem;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  text-align: center;
  width: 100%;
  height: 50%;

  @media (min-width: 787px) {
    font-size: 1.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  width: 100%;
  height: 100%;

  img {
    width: 80%;
    height: 100%;
  }

  @media (min-width: 787px) {
    img {
      width: 100%;

      margin-bottom: 2rem;
    }
  }
`;

export const Titulo = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6rem;
  padding: 0.5rem 0;
  background: ${colors.darkGray};
  border-bottom: 1px solid ${colors.black};
  font-size: 1.8rem;
  font-weight: 700;
  font-family: "Ariel", sans-serif;
  color: ${colors.lightGray};
  flex-shrink: 0;
`;
