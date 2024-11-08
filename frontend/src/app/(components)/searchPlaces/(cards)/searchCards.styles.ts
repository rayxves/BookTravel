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
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  padding: 1.3rem;
  gap: 1.3rem;
  place-items: center;
`;

export const SpinnerContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 10;
`;
