import { useAuth } from "@/app/(authContext)/authContext";
import {
  CardContainer,
  Titulo,
  Description,
  Button,
  ImageContainer,
  Rating,
} from "./card.styles";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";

interface Place {
  id: string;
  name: string;
  description: string;
  rating: number | null;
  imageUrl: string | null;
}

interface Props {
  place: Place;
}

export default function Card({ place }: Props) {
  const [success, setSuccess] = useState("");
  const { token } = useAuth();

  const addTouristSpot = async () => {
    if (!token) {
      setSuccess("Você precisa estar logado para adicionar um local.");
      return null;
    }

    try {
      const touristSpotResponse = await axios.post(
        "http://localhost:5020/api/tourist-spot/add",
        {
          name: place.name,
          description: place.description,
          rating: place.rating,
          photoUrls: [place.imageUrl],
        }
      );

      if (touristSpotResponse.status === 400) {
        setSuccess("O local já existe.");
        return null;
      }

      if (touristSpotResponse.status !== 201) {
        setSuccess("Não foi possível adicionar o local.");
        return null;
      }

      return touristSpotResponse;
    } catch (error: any) {
      handleError(error);
      return null;
    }
  };

  const addToFavorites = async () => {
    if (!token) return null;

    try {
      const normalizedPlaceName = place.name.trim().toLowerCase();

      const favoriteResponse = await axios.post(
        "http://localhost:5020/api/favorite/add",
        normalizedPlaceName,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (favoriteResponse.status === 204 || favoriteResponse.status === 201) {
        setSuccess("Adicionado aos favoritos com sucesso!");
        return favoriteResponse.status;
      } else {
        setSuccess("Falha ao adicionar aos favoritos.");
        return null;
      }
    } catch (error: any) {
      handleError(error);
      return null;
    }
  };

  const handleError = (error: any) => {
    if (error.status == 400) {
      return;
    }
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(error.response.status);
        console.error(error.response.data);
      } else if (error.request) {
        console.error("Sem resposta do servidor.");
      } else {
        console.error(error.message);
      }
    } else {
      console.error("Erro inesperado:", error);
    }
  };

  const addFavTouristSpots = async () => {
    await addTouristSpot();

    const favoriteResponse = await addToFavorites();
    return favoriteResponse;
  };

  return (
    <CardContainer className="favCard">
      <ImageContainer>
        {place.imageUrl ? (
          <Image
            src={place.imageUrl}
            alt={place.name}
            width={300}
            height={200}
            style={{ objectFit: "contain" }}
            priority
          />
        ) : (
          <p>Imagem indisponível</p>
        )}
      </ImageContainer>
      <Titulo>{place.name}</Titulo>
      <Description>{place.description}</Description>
      {place.rating && <Rating>Avaliação: {place.rating}</Rating>}
      <Button onClick={addFavTouristSpots}>Add aos Favoritos</Button>
      {success}
    </CardContainer>
  );
}
