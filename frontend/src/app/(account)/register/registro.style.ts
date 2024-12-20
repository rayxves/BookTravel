"use client";

import styled from "styled-components";
import { colors } from "@/app/global.styles";

export const AccountContainer = styled.div`
  background: ${colors.darkGray};

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

export const FormContainer = styled.div`
  width: 75%;
  height: fit-content;
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
  gap: 2rem;
  border-radius: 0.5rem;

  @media (min-width: 700px) {
    width: 55%;
  }

  @media (min-width: 1024px) {
    width: 30%;
  }
`;

export const Title = styled.h1`
  color: ${colors.lightGray};
  border-bottom: 1px solid black;
  padding: 0.4rem;
  padding-left: 1rem;
  font-weight: 600;
  font-family: "Inter", sans-serif;
  font-size: 2rem;
  height: 3.4rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  gap: 0.2rem;
  padding: 0.5rem;
`;

export const Label = styled.label`
  height: 2.2rem;
  color: ${colors.lightGray};
  display: flex;
  align-items: end;
  padding-bottom: 0.5rem;
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
`;

export const Button = styled.button`
  height: 2.5rem;
  margin: auto;
  margin-top: 2rem;
  cursor: pointer;

  width: 35%;
  border-radius: 0.5rem;
  background: ${colors.darkGreen};

  color: ${colors.lightGray};
  font-weight: 500;
  font-family: "Inter", sans-serif;
  font-size: 1rem;

  &:hover {
    border: 1px solid ${colors.lightGray};
  }
`;

export const TextContainer = styled.div`
  display: flex;

  height: 1.3rem;
  width: 100%;
  align-items: end;
  justify-content: center;
  gap: 0.5rem;

  a {
    display: flex;

    width: fit-content;
    height: 1.3rem;
    text-decoration: none;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    color: ${colors.lightGreen};

    &:hover {
      opacity: 0.7;
    }
  }
`;
export const Text = styled.p`
  color: ${colors.lightGray};
  width: fit-content;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  height: 1.3rem;
`;
