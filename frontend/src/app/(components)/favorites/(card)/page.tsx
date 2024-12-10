import Image from "next/image";
import {
  Button,
  CardContainer,
  Description,
  Rating,
  Titulo,
  ImageContainer,
} from "./favCard.styles";

interface Place {
  id: string;
  name: string;
  description: string;
  rating: number | null;
  photoUrls: string[] | null;
  placeType: [] | null;
}

interface Props {
  place: Place;
  parentName?: string;
  onDelete: (name: string, type: string) => void;
}

export default function FavCard({ place, onDelete }: Props) {
  const imageUrl = place.photoUrls
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photoUrls}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`
    : null;

  const type = place.placeType ? "touristSpot" : "placeType";

  return (
    <CardContainer>
      <ImageContainer>
        {imageUrl ? (
          <Image
            src={imageUrl}
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
      {place.rating ? (
        <Rating>Avaliação: {place.rating}</Rating>
      ) : (
        <Rating></Rating>
      )}

      <Button
        onClick={() => {
          console.log("Clique detectado no botão!");
          onDelete(place.name, type);
        }}
      >
        Remover Favorito
      </Button>
    </CardContainer>
  );
}
