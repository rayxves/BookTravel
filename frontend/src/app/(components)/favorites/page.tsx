"use client";

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
import { useEffect, useState } from "react";
import { useAuth } from "@/app/(authContext)/authContext";
import Card from "../searchPlaces/(cards)/(card)/page";
import axios from "axios";

interface FavoritesPlaces {
  id: number;
  name: string;
  rating: number;
  description: string;
  photoUrls: string[];
}

async function fetchFavoritesPlaces() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }

  const response = await axios.get("/api/getFavorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export default function Favorites() {
  const { token } = useAuth();
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<FavoritesPlaces[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!isAuthenticated) {
      setError("Você precisa estar logado para acessar seus favoritos.");
      return;
    }

    try {
      setError(null);
      const results = await fetchFavoritesPlaces();

      setFavorites(results.map((item) => item.touristSpot) || null);
    } catch (error: any) {
      setError(error.message);
      setFavorites([]);
    }
  };

  useEffect(() => {
    localStorage.setItem("token", `${token}`);
    handleSearch();
  }, []);

  return (
    <>
      <Navbar />
      {isAuthenticated ? (
        <>
          {error ? (
            <FavContainer>
              <MessageContainer>
                <Message>{error}</Message>
              </MessageContainer>
            </FavContainer>
          ) : favorites.length > 0 ? (
            <>
              {favorites.map((place) => {
                // Geração da URL da imagem fora do JSX para evitar problemas
                const imageUrl = place.photoUrls
                  ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photoUrls[0]}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`
                  : null;

                return (
                  <div key={place.id} style={{ marginBottom: "20px" }}>
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
                    <h3>{place.name}</h3>
                    <p>{place.description}</p>
                    {place.rating && <p>Avaliação: {place.rating}</p>}
                    <button>Remover Favorito</button>
                  </div>
                );
              })}
              {/* Testar a renderização do estado favorites */}
              <div>json favs: {JSON.stringify(favorites, null, 2)}</div>
            </>
          ) : (
            <FavContainer>
              <MessageContainer>
                <Message>
                  Nada por aqui... que tal explorar e adicionar seus lugares
                  favoritos?
                </Message>
                <Link href="./searchPlaces">Buscar destinos</Link>
              </MessageContainer>
              <ImageContainer>
                <Image
                  src={favImg}
                  alt=""
                  style={{ objectFit: "contain" }}
                  priority
                />
              </ImageContainer>
            </FavContainer>
          )}
        </>
      ) : (
        <FavContainer>
          <MessageContainer>
            <Message>
              Você não está logado. Que tal fazer Login para acessar seus
              favoritos?
            </Message>
            <Link href="./login">Login</Link>
          </MessageContainer>
          <ImageContainer>
            <Image
              src={favImg}
              alt=""
              style={{ objectFit: "contain" }}
              priority
            />
          </ImageContainer>
        </FavContainer>
      )}
    </>
  );
}
