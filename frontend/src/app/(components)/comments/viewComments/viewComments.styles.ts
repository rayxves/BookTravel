import { colors } from "@/app/global.styles";
import { styled } from "styled-components";

export const Container = styled.div`
  width: fit-content;
  width: 85%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;

  height: 24rem;

  background: ${colors.lightGray};
  padding: 2rem 1rem;
  padding-top: 1.5rem;

  box-shadow: 6px 6px 8px 5px rgba(1, 1, 1, 0.5);
  border-radius: 7px;
  z-index: 11;
  position: absolute;
  top: 30%;
  left: 47.5%;
  transform: translate(-50%, -50%);

  @media (min-width: 567px) {
    min-width: 26rem;
  }
`;

export const Titulo = styled.h1`
  font-weight: 600;
  font-family: "Inter", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15%;
  color: ${colors.darkGray};
  border-bottom: 1px solid black;
  padding: 0.2rem 0;
  position: relative;
`;

export const ListContainer = styled.div`
  width: 100%;
  max-height: 17.6rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow-y: scroll;
  box-sizing: border-box;
`;

export const CreatedBy = styled.div`
  height: 3rem;

  align-self: start;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  color: ${colors.gray};
  padding: 1.5rem 0;
`;

export const Button = styled.button`
  z-index: 8;
  position: absolute;
  font-weight: 600;
  font-size: 1.5rem;

  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;

  background: transparent;
  color: #333;
  border: 2px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  text-align: center;

  transition: background 0.3s ease, border-color 0.3s ease;

  &:hover {
    background: #e0e0e0;
    border-color: #888;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 420px) {
    font-size: 1rem;
    width: 1.6rem;
    height: 1.6rem;
  }
`;

export const Message = styled.p`
  width: fit-content;
  height: 3rem;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  color: ${colors.gray};
  padding: 1rem;
`;
