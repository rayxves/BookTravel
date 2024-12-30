import { colors } from "@/app/global.styles";
import { styled } from "styled-components";

export const Container = styled.div`
  flex-direction: column;
  width: fit-content;
  min-width: 22rem;
  height: auto;
  background: ${colors.lightGray};
  padding: 2.5rem 3rem;
  gap: 1rem;
  box-shadow: 6px 6px 8px 5px rgba(1, 1, 1, 0.5);
  border-radius: 7px;
  z-index: 12;
  position: absolute;
  top: 30%;
  left: 50%;
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
  height: 10%;
  color: ${colors.darkGray};
  border-bottom: 1px solid black;
  padding: 0.2rem 0;
`;
export const Form = styled.div`
  width: 100%;
  height: auto;

  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  gap: 0.2rem;
`;

export const Label = styled.label`
  height: 2.6rem;
  color: ${colors.darkGray};
  display: flex;
  align-items: end;
  padding-top: 0.5rem;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  font-size: 1.3rem;
`;

export const Textarea = styled.textarea`
  height: 5.5rem;
  padding: 1rem;
  border: none;
  box-shadow: 0 0 2px ${colors.lightGreen}, 0 0 3px ${colors.darkGreen},
    0 0 5px ${colors.mediumGreen};
  border-radius: 3px;
  background: #dbdbcc;
  color: ${colors.darkGray};
  font-size: 1rem;
  &:focus {
    outline: none;
    box-shadow: 0 0 4px ${colors.lightGreen}, 0 0 6px ${colors.darkGreen},
      0 0 10px ${colors.mediumGreen};
    transition: 0.2s ease-in-out;
  }
  &::placeholder {
    font-family: "Inter", sans-serif;
  }
`;

export const ButtonContainer = styled.div`
  height: auto;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  padding-top: 2rem;
`;

export const CancelButton = styled.button`
  height: 2.5rem;
  background: #ff4c4c;
  cursor: pointer;
  border: none;
  width: 40%;
  border-radius: 0.5rem;
  color: ${colors.black};
  font-size: 1rem;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  box-shadow: 1px 1px 1px 1px rgba(1, 1, 1, 0.2);

  &:hover {
    border: 1px solid ${colors.black};
  }
`;

export const SaveButton = styled.button`
  height: 2.5rem;
  background: ${colors.lightGreen};
  cursor: pointer;
  border: none;
  box-shadow: 1px 1px 1px 1px rgba(1, 1, 1, 0.2);
  width: 40%;
  border-radius: 0.5rem;
  color: ${colors.darkGray};
  font-weight: 500;
  font-family: "Inter", sans-serif;
  font-size: 1rem;

  &:hover {
    border: 1px solid ${colors.darkGreen};
  }
`;
