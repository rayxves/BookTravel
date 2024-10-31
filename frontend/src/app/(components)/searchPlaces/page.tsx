"use client";

import Image from "next/image";
import placesImg from "../../assets/placesimg.png";
import bsPlacesImg from "../../assets/bsPlacesimg.png";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../(navbar)/page";
import {
  InputContainer,
  ResponsiveImageContainer,
  SearchBar,
  SearchContainer,
  SearchDescription,
  SearchIcon,
  SearchPageContainer,
} from "./searchPlaces.styles";
import Cards from "./(cards)/page";

export default function SearchPlaces() {
  return (
    <>
      <SearchPageContainer>
        <Navbar />
        <SearchContainer>
          <InputContainer>
            <SearchBar placeholder="Search" />
            <SearchIcon icon={faSearch} />
          </InputContainer>
          <SearchDescription>
            Pesquise por lugares e pontos turísticos{" "}
          </SearchDescription>
        </SearchContainer>
        <ResponsiveImageContainer>
          <Image src={placesImg} alt="Small Screen" className="small-screen" />
          <Image
            src={bsPlacesImg}
            alt="Large Screen"
            className="large-screen"
          />
            <Cards />
        </ResponsiveImageContainer>
      
      </SearchPageContainer>
    </>
  );
}
