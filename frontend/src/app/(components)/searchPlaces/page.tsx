"use client";

import Image from "next/image";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Navbar from "../(navbar)/page";
import {
  ErrorMessage,
  InputContainer,
  ResponsiveImageContainer,
  SearchBar,
  SearchContainer,
  SearchDescription,
  SearchIcon,
  SearchPageContainer,
} from "./searchPlaces.styles";
import placesImg from "../../assets/placesimg.png";
import bsPlacesImg from "../../assets/bsPlacesimg.png";
import Cards from "./(cards)/page";

export async function fetchPlaces(query: string) {
  const res = await fetch(
    `/api/fetchPlaces?query=${encodeURIComponent(query)}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch places");
  }

  return res.json();
}

export default function SearchPlaces() {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearch = async () => {
    if (query.trim() === "") return;

    setIsSearching(true);
    setErrorMessage(null);
    try {
      const results = await fetchPlaces(query);
      setPlaces(results);
    } catch (error: any) {
      setErrorMessage(error.message);
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <SearchPageContainer>
      <Navbar />
      <SearchContainer>
        <InputContainer>
          <SearchBar
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            value={query}
          />
          <SearchIcon icon={faSearch} onClick={handleSearch} />
        </InputContainer>
        <SearchDescription>
          Pesquise por lugares e pontos turísticos
        </SearchDescription>
      </SearchContainer>
      <ResponsiveImageContainer>
        <Image src={placesImg} alt="Small Screen" className="small-screen" />
        <Image src={bsPlacesImg} alt="Large Screen" className="large-screen" />
        <Cards isSearching={isSearching} results={places} />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}{" "}
      </ResponsiveImageContainer>
    </SearchPageContainer>
  );
}
