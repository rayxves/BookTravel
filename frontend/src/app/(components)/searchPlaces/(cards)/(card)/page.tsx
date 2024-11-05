import {
  Link,
  CardContainer,
  Titulo,
  Description,
  Button,
  ImageContainer,
  Rating,
} from "./card.styles";
import Image from "next/image";

interface Place {
  id: string;
  name: string;
  description: string;
  rating: number | null; // Permitir que a avaliação seja nula
  imageUrl: string | null; // Permitir que a imagem seja nula
}

interface Props {
  place: Place;
}

export default function Card({ place }: Props) {
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
      {place.rating && <Rating>Avaliação: {place.rating}</Rating>}{" "}
      <Link href={`/places/${place.id}`}>
        <Button>Add aos Favoritos</Button>
      </Link>
    </CardContainer>
  );
}
