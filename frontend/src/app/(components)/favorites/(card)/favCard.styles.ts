import { colors } from "@/app/global.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

export const CardContainer = styled.div<{ createComment: boolean }>`
  opacity: ${(props) => (props.createComment ? 0.3 : 1)};
  transition: opacity 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0, 5rem;
  margin: 0rem;
  width: 90%;
  max-width: 24rem;
  height: 30rem;
  padding: 1.2rem;

  background: rgba(255, 255, 255, 0.25);
  border-radius: 1rem;
  box-shadow: 4px 6px 15px rgba(1, 1, 1, 1);

  &:hover {
    scale: 1.03;
    box-shadow: 0px 4px 8px rgba(36, 66, 47, 1);
  }
`;

export const ImageContainer = styled.div`
  width: fit-content;
  max-width: 18.7rem;
  max-height: 11rem;
  overflow: hidden;
  border-radius: 0.5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 0.5rem;
  }
`;

export const Titulo = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid black;
  font-size: 1.6rem;
  font-weight: 700;
  @media (max-width: 878px and min-width: 560px) {
    margin-bottom: 0.2rem;
    height: 4rem;
    font-size: 1.6rem;
  }
`;

export const Description = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1rem;
  padding: 0.5rem;
  height: fit-content;
  font-family: "Noto Sans", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;

  @media (max-width: 978px and min-width: 560px) {
    font-size: 0.8rem;
  }
`;

export const Rating = styled.p`
  font-size: 1rem;
  font-weight: 600;
  height: 2rem;
  margin-left: 0.5rem;
  padding: 0.3rem;
`;

export const Button = styled.button`
  pointer-events: auto;
  z-index: 10;

  border: none;
  background: ${colors.green};
  padding: 0.3rem;
  cursor: pointer;
  border-radius: 5px;
  width: 60%;
  height: 3rem;
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

export const IconsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
  align-items: start;
  justify-content: space-between;
  gap: 2rem;
`;

export const EditIcon = styled.div`
  display: flex;
  justify-content: start;
  width: 50%;
  position: relative;
  height: 2rem;

  button {
    background: transparent;
    border: none;
    position: absolute;
    width: 50%;
    height: 2rem;
    cursor: pointer;
  }
`;
export const ViewIcon = styled.div`
  display: flex;
  justify-content: end;
  width: 50%;
  position: relative;
  height: 2rem;

  button {
    background: transparent;
    border: none;
    position: absolute;
    width: 50%;
    height: 2rem;
    cursor: pointer;
  }
`;

export const MenuIcons = styled(FontAwesomeIcon)`
  color: ${colors.black};
  width: fit-content;
  margin-left: 0.5rem;
`;
