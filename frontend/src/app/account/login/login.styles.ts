"use client";

import styled from "styled-components";
import { colors } from "@/app/global.styles";

export const AccountContainer = styled.div`
  background: ${colors.darkGray};

  display: flex;

  align-items: start;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

export const FormContainer = styled.div`
  width: 60%;
  margin-top: 3rem;
  height: auto;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    155deg,
    rgba(0, 0, 0, 0.2) 2%,
    rgba(57, 91, 70, 1) 35%,
    rgba(25, 49, 34, 0.6) 75%
  );
  box-shadow: 10px 10px 4px rgba(1, 1, 1, 0.4);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  border-radius: 0.5rem;

  @media (min-width: 800px) {
    width: 50%;
  }

  @media (min-width: 1124px) {
    padding: 2rem;
    width: 30%;
  }
`;

export const Title = styled.h1`
  color: ${colors.lightGray};
  border-bottom: 1px solid black;
  padding: 1rem;
  padding-left: 1rem;
  font-weight: 600;
  font-family: "Inter", sans-serif;
  font-size: 2rem;
  height: 4.4rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 80%;
  width: 100%;
  gap: 0.3rem;
  padding: 0.5rem;
`;

export const Label = styled.label`
  height: 4rem;
  color: ${colors.lightGray};
  display: flex;
  align-items: end;
  padding-bottom: 0.6rem;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
`;

export const Input = styled.input`
  height: 2.6rem;
  padding: 1rem;
  border: 1px solid ${colors.black};
  border-radius: 8px;
  background: ${colors.darkGray};
  color: ${colors.lightGray};
  font-size: 1rem;
  &:focus {
    border-color: ${colors.lightGray};
    outline: none;
  }
  &::placeholder {
    background-color: ${colors.darkGray};
    opacity: 1;
  }
`;

export const Button = styled.button`
  height: 3rem;
  margin: auto;
  margin-top: 2rem;
  cursor: pointer;

  width: 30%;
  border-radius: 0.5rem;
  background: ${colors.darkGreen};

  color: ${colors.lightGray};
  font-weight: 500;
  font-family: "Inter", sans-serif;
  font-size: 1rem;

  &:hover {
    border: 1px solid ${colors.lightGray};
  }

  @media (min-width: 500px) {
    width: 35%;
  }
`;
export const TextContainer = styled.div`
  display: flex;

  height: 1.7rem;
  width: 100%;
  align-items: end;
  justify-content: center;
  gap: 0.2rem;

  a {
    display: flex;

    width: fit-content;
    height: 1.3rem;
    text-decoration: none;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    font-size: 0.8rem;
    color: ${colors.lightGreen};

    &:hover {
      opacity: 0.7;
    }
  }

  @media (min-width: 667px) {
    gap: 0.5rem;

    a {
      font-size: 1rem;
    }
  }
`;
export const Text = styled.p`
  color: ${colors.lightGray};
  width: fit-content;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  font-size: 0.8rem;
  height: 1.3rem;

  @media (min-width: 667px) {
    font-size: 1rem;
  }
`;
