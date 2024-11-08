import { colors } from "@/app/global.styles";
import { styled } from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  margin: 0.5rem;

  width: 100%;
  max-width: 25rem;
  min-height: 31rem;
  padding: 1.2rem;

  background: rgba(255, 255, 255, 0.25);
  border-radius: 1rem;
  box-shadow: 4px 6px 15px rgba(1, 1, 1, 1);

  max-height: 400px;
  overflow: hidden;

  &:hover {
    scale: 1.03;
    box-shadow: 0px 4px 8px rgba(36, 66, 47, 1);
  }

`;

export const ImageContainer = styled.div`
  width: fit-content;
  max-width: 18.7rem;
  max-height: 200px;
  overflow: hidden;
  border-radius: 0.5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const Titulo = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid black;
  font-size: 1.8rem;
  font-weight: 700;
`;

export const Description = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.1rem;
  padding: 0.5rem;
  height: 5rem;
  font-family: "Noto Sans", sans-serif;
  font-size: 1rem;
  font-weight: 500;
`;

export const Rating = styled.p`
  font-size: 1rem;
  font-weight: 600;
  height: 2rem;
  margin-left: 0.5rem;
  padding: 0.3rem;
`;

export const Button = styled.button`
  border: none;
  background: ${colors.green};
  padding: 0.3rem;

  border-radius: 5px;
  width: 100%;
  height: 2.5rem;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  transition: 0.2s ease;

  &:hover {
    background-color: ${colors.mediumGreen};
  }
`;

export const Link = styled.a`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: ${colors.green};
  border-radius: 5px;
  width: 35%;
  height: 2.5rem;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  transition: 0.2s ease;
`;
