import {
  AuthContainer,
  AuthTitle,
  AviaoImageContainer,
  Button,
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
import { useAuth } from "@/app/(authContext)/authContext";

interface TouristSpot {
  id: number;
  name: string;
  rating: number;
  description: string;
  imageUrl: string[];
}

export async function fetchTouristSpots() {
  const res = await fetch("/api/touristSpots");

  if (!res.ok) {
    throw new Error("Failed to fetch tourist spots");
  }

  const data = await res.json();
  if (!data || !Array.isArray(data)) {
    throw new Error("Invalid data format");
  }

  return data;
}

export default function TravelHighlights() {
  const { isAuthenticated, logout, username } = useAuth();
  const [touristSpot, setTouristSpot] = useState<TouristSpot[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSearch = async () => {
    try {
      const results = await fetchTouristSpots();
      setTouristSpot(results || []);
      console.log("tourist spot:", results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    if (touristSpot && touristSpot.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % touristSpot.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [touristSpot]);

  const getImageUrl = () => {
    const spot = touristSpot[currentIndex];
    if (!spot || !spot.imageUrl?.length) {
      return "/caminho/para/imagem-padrao.jpg";
    }

    const photoReference = spot.imageUrl;
    const imageUrls = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`;

    return imageUrls;
  };

  return (
    <PageContainer>
      <AviaoImageContainer>
        <Image src={aviao} alt="" priority />
        {isAuthenticated ? (
          <AuthContainer>
            {" "}
            <AuthTitle>Bem-vindo, {username} ♥︎.</AuthTitle>
            <Button type="button" onClick={logout}>Clique para logout.</Button>
          </AuthContainer>
        ) : (
          <Title>Planeje sua próxima viagem.</Title>
        )}
      </AviaoImageContainer>

      <TravelsContainer>
        {touristSpot.length > 0 ? (
          <TouristSpotContainer>
            <TouristSpotImg>
              <Image
                src={getImageUrl()}
                alt={touristSpot[currentIndex].name}
                width={600}
                height={400}
                style={{
                  borderRadius: "3%",
                }}
                priority
              />
            </TouristSpotImg>
            <TouristSpotName>{touristSpot[currentIndex].name}</TouristSpotName>
            <TouristSpotDescription>
              {touristSpot[currentIndex].description}
            </TouristSpotDescription>
          </TouristSpotContainer>
        ) : (
          <p>Carregando...</p>
        )}
      </TravelsContainer>

      <MundoImageContainer>
        {isAuthenticated ? (
          <></>
        ) : (
          <SubTitle>Descubra novos destinos!</SubTitle>
        )}

        <Image src={mundo} alt="" priority />
      </MundoImageContainer>
    </PageContainer>
  );
}
