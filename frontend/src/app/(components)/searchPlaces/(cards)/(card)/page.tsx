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

  const addFavTouristSpots = async () => {
    if (!token) return null;

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

      if (touristSpotResponse.status !== 201) {
        setSuccess("Não foi possível adicionar o local como favorito.");
        return null;
      }

      const favoriteResponse = await axios.post(
        "http://localhost:5020/api/favorite/add",
        `"${place.name}"`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(favoriteResponse);

      if (favoriteResponse.status === 201 || favoriteResponse.status === 200) {
        setSuccess("Adicionado aos favoritos com sucesso!");
        return favoriteResponse.status;
      } else {
        setSuccess("Falha ao adicionar aos favoritos.");
        return null;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(`Erro na resposta: ${error.response.status}`);
        } else if (error.request) {
          console.error("Sem resposta do servidor.");
        } else {
          console.error(`Erro na requisição: ${error.message}`);
        }
      } else {
        console.error("Erro inesperado:", error);
      }

      return null;
    }
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
      <Button onClick={() => addFavTouristSpots()}>Add aos Favoritos</Button>
      {success}
    </CardContainer>
  );
}
