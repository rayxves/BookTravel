import { styled } from "styled-components";

export const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  background: transparent;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  padding: 2rem 1.5rem;
  gap: 1rem;
  place-items: center;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 10;
`;
