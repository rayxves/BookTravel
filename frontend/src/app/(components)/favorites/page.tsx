"use client";

import Navbar from "../(navbar)/page";
import {
  Container,
  FavCardsContainer,
  FavContainer,
  ImageContainer,
  Message,
  MessageContainer,
  Titulo,
} from "./favorites.styles";
import favImg from "./../../assets/nothingHere.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/(authContext)/authContext";
import axios from "axios";
import FavCard from "./(card)/page";

interface FavoritesPlaces {
  id: string;
  name: string;
  rating: number;
  description: string;
  photoUrls: string[] | null;
  placeType: [];
}

async function fetchFavoritesPlaces(token: string) {
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

async function deleteFavoritePlace(name: string, type: string, token: string) {
  if (!token) {
    throw new Error("Token not available");
  }

  const response = await axios.delete(
    "http://localhost:5020/api/favorite/delete",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        name,
        type,
      },
    }
  );

  return response.status;
}

export default function Favorites() {
  const { token, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<FavoritesPlaces[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!isAuthenticated) {
      setError("Você precisa estar logado para acessar seus favoritos.");
      return;
    }

    try {
      setError(null);

      if (!token) {
        return null;
      }
      const results = await fetchFavoritesPlaces(token);

      const formattedResults = results
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((item: any) => {
          if (item.touristSpot) {
            return {
              id: item.touristSpot.id,
              name: item.touristSpot.name,
              rating: item.touristSpot.rating,
              description: item.touristSpot.description,
              photoUrls: item.touristSpot.photoUrls[0] || null,
              placeType: item.touristSpot.placeTypes?.[0] || null,
            };
          } else if (item.placeType) {
            return {
              id: item.placeType.id,
              name: item.placeType.name,
              rating: item.placeType.rating,
              description: item.placeType.description,
              photoUrls: item.placeType.photoUrls[0] || null,
              touristSpotId: item.placeType.touristSpotId || null,
            };
          }
          return null;
        })
        .filter(Boolean);

      setFavorites(formattedResults);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      setFavorites([]);
    }
  };

  const handleDelete = async (name: string, type: string) => {
    console.log(name, type);
    if (!isAuthenticated) {
      setError("You need to be logged in to access your favorites.");
      return;
    }

    try {
      setError(null);
      if (!token) {
        return null;
      }
      const status = await deleteFavoritePlace(name, type, token);

      if (status === 200) {
        setFavorites(favorites.filter((fav) => fav.name !== name));
      } else {
        setError("Error trying to remove the favorite.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Failed to delete the favorite. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      handleSearch();
    }
  }, [token]);

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
              <Titulo>Favoritos </Titulo>
              <Container>
                <FavCardsContainer>
                  {favorites.map((place) => (
                    <FavCard
                      key={place.id}
                      place={place}
                      onDelete={(name: string, type: string) =>
                        handleDelete(name, type)
                      }
                    />
                  ))}
                </FavCardsContainer>
              </Container>
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
