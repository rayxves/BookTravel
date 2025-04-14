import { useState } from "react";
import TypeFilter from "./TypeFilter";
import RatingFilter from "./RatingFilter";
import PriceFilter from "./PriceFilter";
import { useNameSpotsContext } from "@/context/NameSpotsContext";
import { useNearbySpotsContext } from "@/context/NearbySpotsContext";

interface Props {
  name: string;
  isLocationSearch: boolean;
  handleShowFilter: () => void;
}

export default function FilterNavigation({
  name,
  isLocationSearch,
  handleShowFilter,
}: Props) {
  const { fetchTouristSpotsByFilterAndName } = useNameSpotsContext();
  const { fetchTouristSpotsByFilterAndLocation, location } =
    useNearbySpotsContext();
  const [showTypes, setShowTypes] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceLevel, setPriceLevel] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  function handleShowPrice() {
    setShowPrice(!showPrice);
  }

  function handleShowRating() {
    setShowRating(!showRating);
  }

  function handleShowTypes() {
    setShowTypes(!showTypes);
  }

  function handleTypeFilter(type: string) {
    setTypeFilter(type);
  }

  function handleRatingFilter(rating: number) {
    setRatingFilter(rating);
  }

  function handlePriceFilter(priceLevel: number) {
    setPriceLevel(priceLevel);
  }

  function handleFetchPlaces() {
    if (typeFilter === undefined || typeFilter === null || typeFilter === "") {
      setErrorMessage("Please select a place type to filter.");
      return;
    }
    if (!isLocationSearch) {
      if (name === undefined || name === null || name === "") {
        setErrorMessage("Please enter a place name on searchbar.");
        return;
      }

      fetchTouristSpotsByFilterAndName(
        name,
        typeFilter,
        ratingFilter,
        priceLevel
      );
      handleShowFilter();
    } else {
      fetchTouristSpotsByFilterAndLocation(
        location.lat,
        location.lon,
        typeFilter,
        ratingFilter,
        priceLevel
      );
      handleShowFilter();
    }
  }

  return (
    <div className="font-inter z-10 text-gray-800 text-sm absolute top-[100%] w-full lg:w-4/6 h-fit flex items-start rounded-b-md flex-col px-2.5 py-3 bg-gray-100 shadow-lg gap-2">
      <div className="w-full flex items-center justify-center ">
        {" "}
        <h1 className="font-poppins text-md font-semibold">Filters</h1>
      </div>{" "}
      <div className="flex flex-col items-center rounded hover:bg-gray-400 bg-[rgba(149,147,147,0.3)] justify-between w-full border-b-2 border-gray-500 py-3 px-2 gap-2">
        {" "}
        <button
          type="button"
          onClick={handleShowTypes}
          className="flex cursor-pointer w-full items-center justify-between"
        >
          {" "}
          <h2>Type</h2>
          <svg
            className="w-5 h-5 text-gray-800 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 9-7 7-7-7"
            />
          </svg>
        </button>
        {showTypes && <TypeFilter handleTypeFilter={handleTypeFilter} />}
      </div>{" "}
      <div className="flex flex-col items-center rounded hover:bg-gray-400 bg-[rgba(149,147,147,0.3)] justify-between w-full border-b-2 border-gray-500 py-3 px-2 gap-2">
        {" "}
        <button
          type="button"
          onClick={handleShowRating}
          className="flex cursor-pointer w-full items-center justify-between"
        >
          {" "}
          <h2>Rating</h2>
          <svg
            className="w-5 h-5 text-gray-800 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 9-7 7-7-7"
            />
          </svg>
        </button>
        {showRating && <RatingFilter handleRatingFilter={handleRatingFilter} />}
      </div>{" "}
      <div className="flex flex-col items-center rounded hover:bg-gray-400 bg-[rgba(149,147,147,0.3)] justify-between w-full border-b-2 border-gray-500 py-3 px-2 gap-2">
        {" "}
        <button
          type="button"
          onClick={handleShowPrice}
          className="flex cursor-pointer w-full items-center justify-between"
        >
          {" "}
          <h2>Price</h2>
          <svg
            className="w-5 h-5 text-gray-800 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 9-7 7-7-7"
            />
          </svg>
        </button>
        {showPrice && <PriceFilter handlePriceFilter={handlePriceFilter} />}
      </div>{" "}
      <div className="w-full flex items-center justify-center">
        <button
          type="button"
          onClick={handleFetchPlaces}
          className="bg-[var(--hunter-green)] cursor-pointer text-white p-2 rounded-md hover:bg-green-700 transition"
        >
          Set Filters
        </button>{" "}
      </div>
      {errorMessage && (
        <p className="text-xs flex items-center justify-center w-full text-center font-semibold font-inter text-red-800">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
