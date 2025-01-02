import { colors } from "@/app/global.styles";
import { styled } from "styled-components";

export const CommentItem = styled.div`
  width: 98%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: ${colors.lightGreen};
  padding: 1rem;

  border-radius: 5px;
  box-shadow: 4px 4px 6px 2px rgba(0, 0, 0, 0.2);
  min-height: min-content;
  max-height: fit-content;
  flex: 1;
`;

export const CommentContent = styled.div`
  height: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

export const StyledDate = styled.h4`
  width: fit-content;
  height: 2rem;
  display: flex;
  align-items: start;
  justify-content: start;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
`;

export const Content = styled.p`
  padding: 0.2rem 0;
  width: 100%;
  height: auto;
  flex: 1;
  display: block;

  overflow-wrap: break-word;
  white-space: normal;
  line-height: 1.1rem;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 500;
`;

export const TextareaContent = styled.textarea`
  padding: 0.5rem;
  margin: 0.3rem;
  width: 98%;

  height: auto;
  flex: 1;
  display: block;
  background: ${colors.lightGray};
  border: none;
  box-shadow: 4px 4px 6px 4px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  outline: none;
  overflow-wrap: break-word;
  white-space: normal;
  line-height: 1.05rem;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 500;

  &:hover {
    outline: none;
  }
`;

export const IconsContainer = styled.div`
  height: 1.5rem;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 30%;
    height: 100%;
    border: none;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    width: 100%;
    font-size: 1.1rem;
    color: ${colors.black};
    cursor: pointer;
    position: relative;

    transition: background 0.3s ease, border-color 0.3s ease;

    &:hover {
      color: ${colors.gray};
      border-color: #888;
    }
  }

  @media (max-width: 520px) {
    width: 30%;
    gap: 0.5rem;
  
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: inline;
  height: 2rem;
  width: 100%;
  justify-content: space-between;
`;

export const Message = styled.p`
  height: 1.5rem;
  color: ${colors.darkGray};
  font-family: "Inter", sans-serif;
`;
