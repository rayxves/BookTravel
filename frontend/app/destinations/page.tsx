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
  const {
    filterNearbySpots,
    nearbyErrorMessage,
    categoryNearbySpots,
    locationError,
  } = useNearbySpotsContext();
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (touristSpots.length > 0 && !mode) {
      setMode("name");
    }
  }, [touristSpots, mode, setMode]);

  const handleShowFilter = () => setShowFilter((prev) => !prev);

  const renderContent = () => {
    const hasError = errorMessage || nearbyErrorMessage || locationError;
    const hasNameData = touristSpots.length > 0 && mode === "name";
    const hasNearbyFilterData =
      filterNearbySpots.length > 0 && mode === "location";
    const hasNearbyData = Object.keys(categoryNearbySpots).length > 0;

    if (mode === "name") {
      if (hasError && !hasNameData) {
        return (
          <div className="w-full h-full flex pt-10 items-start justify-center bg-gray-100">
            <FavError error={errorMessage} />
          </div>
        );
      }
      if (hasNameData) {
        return (
          <NameSearchResults
            spots={touristSpots}
            searchText={searchText}
            showFilter={showFilter}
            toggleFilter={handleShowFilter}
          />
        );
      }
      return <DefaultDestinationContent />;
    }

    if (mode === "location") {
      if (hasNearbyFilterData) {
        return (
          <LocationSearchResults
            spots={filterNearbySpots}
            showFilter={showFilter}
            toggleFilter={handleShowFilter}
          />
        );
      }
      if (hasNearbyData) {
        return <DefaultDestinationContent />;
      }
      if (hasError) {
        return (
          <div className="w-full h-full flex pt-10 items-start justify-center bg-gray-100">
            <FavError error={nearbyErrorMessage || locationError} />
          </div>
        );
      }
      return <DefaultDestinationContent />;
    }

    if (hasNearbyData) {
      return <DefaultDestinationContent />;
    }
    if (hasError) {
      return (
        <div className="w-full h-full flex pt-10 items-start justify-center bg-gray-100">
          <FavError error={nearbyErrorMessage || locationError} />
        </div>
      );
    }
    return <DefaultDestinationContent />;
  };

  return (
    <>
      <div className="w-ful">
        <Searchbar handleInputChange={handleInputChange} />
      </div>
      {renderContent()}
    </>
  );
}
