import { colors } from "@/app/global.styles";
import { styled } from "styled-components";

export const CardContainer = styled.div`
  width: 80%;
  height: 65%;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);

  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  display: flex;

  flex-direction: column;
  gap: 0.5rem;
  margin: 0.5rem;
  width: 90%;
  max-width: 400px;
  height: 90%;

  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  box-shadow: 4px 6px 15px rgba(1, 1, 1, 1);
`;

export const Titulo = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  padding: 2rem 0rem;
  border-bottom: 1px solid black;
  font-size: 1.8rem;
  font-weight: 700;
`;

export const Description = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.6rem;
  padding: 1rem;
  height: 5rem;
  font-family: "Noto Sans", sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
`;

export const Button = styled.button`

  margin: auto;
  border: none;
  background: ${colors.green};

  border-radius: 5px;
  width: 35%;
  height: 2.5rem;

  font-family: "Roboto", sans-serif;
  font-weight: 600;
  transition: 0.2s ease;

  &:hover {
    background-color: ${colors.mediumGreen};
  }
`;
