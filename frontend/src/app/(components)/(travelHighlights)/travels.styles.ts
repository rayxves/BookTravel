import { colors } from "@/app/global.styles";
import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`;

export const TravelsContainer = styled.div`
  background-color: ${colors.gray};
  width: 80vw;
  height: 60vh;
  border-radius: 16px;
  box-shadow: 4px 4px 15px rgba(1, 1, 1, 1);

  @media (min-width: 868px) {
    width: 70vw;
  }
`;

export const AviaoImageContainer = styled.div`
  display: block;
  height: 10rem;

  img {
    padding-left: 1.5rem;
    transform: rotate(-5deg);
    width: 11rem;
    height: 5.5rem;
    transition: transform 2s ease-in-out;
  }

  img:hover {
    animation: flyAndReturn 3s ease-in-out infinite;
  }

  @media (min-width: 868px) {
    display: flex;
    align-items: end;

    img {
      position: absolute;
      left: 3rem;
      top: 4rem;
      transform: rotate(-6deg);
      width: 20rem;
      height: 10rem;
    }
  }

  @keyframes flyAndReturn {
    50% {
      transform: rotate(5deg) translate(0, 0);
    }
    50% {
      transform: rotate(8deg) translate(15px, -15px);
    }
      100% {
      transform: rotate(-13deg) translate(0, 0);
    }
  }
`;
export const Title = styled.p`
  display: flex;
  align-items: center;
  justify-content: end;
  padding-bottom: 1rem;
  padding-right: 2rem;
  height: 4rem;
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${colors.lightGray};

  @media (min-width: 560px) {
    padding-bottom: 1.2rem;
    padding-right: 3rem;
    font-size: 1.4rem;
  }

  @media (min-width: 868px) {
    align-items: end;
    padding-bottom: 1rem;
    padding-right: 8rem;
    font-size: 1.6rem;
  }
`;

export const MundoImageContainer = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;
  height: 10rem;

  img {
    justify-content: end;
    width: 9rem;
    height: 18rem;
  }

  @media (min-width: 868px) {
    display: flex;
    align-items: start;
    img {
      position: absolute;
      right: -1rem;
      bottom: 0.5rem;
      transform: rotate(-6deg);
      width: 20rem;
      height: 14rem;
    }
  }
`;

export const SubTitle = styled.p`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 5rem;
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  padding-left: 2rem;
  padding-top: 1rem;
  font-weight: 500;
  color: ${colors.lightGray};

  @media (min-width: 560px) {
    padding-top: 1.2rem;
    padding-left: 3rem;
    font-size: 1.4rem;
  }

  @media (min-width: 868px) {
    align-items: start;
    padding-top: 1.6rem;
    padding-left: 8rem;
    font-size: 1.6rem;
  }
`;
