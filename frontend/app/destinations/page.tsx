"use client";
import { useState } from "react";
import TouristSpotsSlider from "../components/Destination/TouristSpotsSlider";
import Searchbar from "../components/Searchbar";
import { popularTouristSpots } from "../data/popularTouristSpots";
import { travelHighlights } from "../data/travelHighlights";
import { filterByName } from "@/api/filters";
import FavError from "../components/Favorites/FavError";
import TouristSpots from "../components/Destination/TouristSpots";
import { getTouristSpotsByName } from "@/api/touristSpots";
export default function Destinations() {
  const [touristSpots, setTouristSpots] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchText, setSearchText] = useState<string>("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setSearchText(event.target.value);
  }

  async function fetchTouristSpotsByName(name: string) {
    try {
      const response = await getTouristSpotsByName(name);

      if (response.length === 0) {
        setErrorMessage("No tourist spots found.");
        return;
      }

      setTouristSpots(response);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  }

  async function fetchTouristSpotsByFilter(
    name,
    type?,
    rating?,
    minPrice?,
    maxPrice?
  ) {
    try {
      if (name === undefined || name === null || name === "") {
        setErrorMessage("Please enter a place name on searchbar.");
        return;
      }
      if (type === undefined || type === null || type === "") {
        console.log(rating);
        setErrorMessage("Please select a place type to filter.");
        return;
      }
      const response = await filterByName(
        name,
        type,
        rating,
        minPrice,
        maxPrice
      );

      if (response.length === 0) {
        setErrorMessage("No tourist spots found.");
        return;
      }

      setTouristSpots(response);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  }
  return (
    <>
      {touristSpots.length > 0 ? (
        <div className="w-full bg-gray-300">
          <Searchbar
            fetchTouristSpotsByName={fetchTouristSpotsByName}
            handleInputChange={handleInputChange}
          />{" "}
          <div className="w-full pt-5">
            {" "}
            <TouristSpots
              touristSpots={touristSpots}
              searchText={searchText}
              fetchTouristSpots={fetchTouristSpotsByFilter}
            />
          </div>{" "}
        </div>
      ) : errorMessage !== "" ? (
        <div className="w-full h-full items-center flex flex-col  bg-gray-50 ">
          <Searchbar
            fetchTouristSpotsByName={fetchTouristSpotsByName}
            handleInputChange={handleInputChange}
          />
          <FavError error={errorMessage} />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col  bg-gray-50 ">
          <Searchbar
            fetchTouristSpotsByName={fetchTouristSpotsByName}
            handleInputChange={handleInputChange}
          />
          <div className="flex flex-col items-center justify-center border-t-2 border-gray-950 pt-10 pb-8 gap-14 bg-gray-50">
            <div className="w-full gap-4 h-full flex flex-col items-center justify-center">
              {" "}
              <h1 className=" w-5/6 xl:w-4/6 pb-4 text-gray-950 text-xl font-inter font-semibold">
                Find popular destinations
              </h1>{" "}
              <TouristSpotsSlider touristSpots={travelHighlights} />
            </div>
            <div className="w-full gap-4 h-full flex flex-col items-center justify-center">
              <h1 className=" w-5/6 xl:w-4/6 pb-4 text-gray-950 text-xl font-inter font-semibold">
                Seek the best experiences
              </h1>
              <TouristSpotsSlider touristSpots={popularTouristSpots} />
            </div>
          </div>
          <div className="w-full h-full flex items-center justify-center pt-6">
            {" "}
            <div className="flex flex-col h-full w-[90%] xl:w-4/6 items-center justify-center font-inter p-5  gap-3">
              {" "}
              <h1 className="font-semibold text-xl">
                Explore the World Around You{" "}
              </h1>
              <p className="text-md md:text-lg">
                Explore a wide range of places to visit around the world. With
                our app, you can search for any location, save your favorites,
                and leave comments for future reference. Whether you&apos;re
                interested in local landmarks, hidden gems, or popular spots,
                you&apos;ll be able to find, track, and share your experiences.
                Start discovering and building your personal collection today!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
