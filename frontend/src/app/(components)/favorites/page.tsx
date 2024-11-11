
import Navbar from "../(navbar)/page";
import {
  FavContainer,
  ImageContainer,

  Message,
  MessageContainer,
} from "./favorites.styles";
import favImg from "./../../assets/nothingHere.png";
import Image from "next/image";
import Link from "next/link";

export default function Favorites() {
  return (
    <>
      <Navbar />
      <FavContainer>
        <MessageContainer>
        <Message>
            Nada por aqui... que tal explorar e adicionar seus lugares favoritos?
            
          </Message>
          <Link href="./searchPlaces">Buscar destinos</Link>
        </MessageContainer>
        <ImageContainer>
          <Image
            src={favImg}
       
            alt=""
            style={{
              objectFit: "contain",
            }}
            priority
          />
        </ImageContainer>
      </FavContainer>
    </>
  );
}
