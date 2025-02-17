import {
  AuthContainer,
  AviaoImageContainer,
  MundoImageContainer,
  PageContainer,
  SubTitle,
  Title,
  TouristSpotContainer,
  TouristSpotDescription,
  TouristSpotImg,
  TouristSpotName,
  TravelsContainer,
} from "./travels.styles";
import aviao from "../../assets/aviao.png";
import mundo from "../../assets/mundo.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/authContext/authContext";
import { touristSpots } from "../../data/touristSpot";

export default function TravelHighlights() {
  const { isAuthenticated, username } = useAuth();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const interval = setInterval(() => {
      if (isMounted) {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex >= touristSpots.length ? 0 : nextIndex;
        });
      }
    }, 4000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const currentSpot = touristSpots[currentIndex];

  return (
    <PageContainer>
      <AviaoImageContainer>
        <Image src={aviao} alt="" priority />
        {isAuthenticated && username ? (
          <AuthContainer>
            {" "}
            <Title>Bem-vindo, {username} ♥︎.</Title>
          </AuthContainer>
        ) : (
          <Title>Planeje sua próxima viagem.</Title>
        )}
      </AviaoImageContainer>

      <TravelsContainer>
        <TouristSpotContainer>
          <TouristSpotImg>
            <Image
              src={currentSpot.photoUrls[0]}
              alt={currentSpot.name}
              width={600}
              height={400}
              style={{
                borderRadius: "3%",
              }}
              priority
            />
          </TouristSpotImg>
          <TouristSpotName>{currentSpot.name}</TouristSpotName>
          <TouristSpotDescription>
            {currentSpot.description}
          </TouristSpotDescription>
        </TouristSpotContainer>
      </TravelsContainer>

      <MundoImageContainer>
        <SubTitle>Descubra novos destinos!</SubTitle>

        <Image src={mundo} alt="" priority />
      </MundoImageContainer>
    </PageContainer>
  );
}
