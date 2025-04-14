"use client";
import Searchbar from "../components/Searchbar";
import { useNameSpotsContext } from "@/context/NameSpotsContext";
import { useNearbySpotsContext } from "@/context/NearbySpotsContext";
import { useEffect, useState } from "react";
import { useSearchMode } from "@/context/SearchModeContext";
import DefaultDestinationContent from "../components/Destination/DefaultDestinationContent";
import NameSearchResults from "../components/Destination/NameSearchResults";
import LocationSearchResults from "../components/Destination/LocationSearchResults";
import FavError from "../components/Favorites/FavError";

export default function Destinations() {
  const { mode, setMode } = useSearchMode();
  const { touristSpots, errorMessage, searchText, handleInputChange } =
    useNameSpotsContext();
  const { filterNearbySpots, nearbyErrorMessage } = useNearbySpotsContext();
  const [showFilter, setShowFilter] = useState(false);


  useEffect(() => {
    if (touristSpots.length > 0 && !mode) {
      setMode("name");
    }
  }, [touristSpots, mode, setMode]);

  const handleShowFilter = () => setShowFilter((prev) => !prev);

  return (
    <>
      <div className="w-ful">
        <Searchbar handleInputChange={handleInputChange} />
      </div>

      {errorMessage || nearbyErrorMessage ? (
        <div className="w-full h-full flex pt-10 items-start justify-center bg-gray-100">
          <FavError error={errorMessage || nearbyErrorMessage} />
        </div>
      ) : mode === "name" && touristSpots.length > 0 ? (
        <NameSearchResults
          spots={touristSpots}
          searchText={searchText}
          showFilter={showFilter}
          toggleFilter={handleShowFilter}
        />
      ) : mode === "location" && filterNearbySpots.length > 0 ? (
        <LocationSearchResults
          spots={filterNearbySpots}
          showFilter={showFilter}
          toggleFilter={handleShowFilter}
        />
      ) : (
        <DefaultDestinationContent />
      )}
    </>
  );
}
