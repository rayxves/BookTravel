import { useState } from "react";
import TypeFilter from "./TypeFilter";
import RatingFilter from "./RatingFilter";
import PriceFilter from "./PriceFilter";

interface Props {
  name: string;
  fetchTouristSpots: (name, type?, rating?, minPrice?, maxPrice?) => void;
}

export default function FilterNavigation({ name, fetchTouristSpots }: Props) {
  const [showTypes, setShowTypes] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceFilterFrom, setPriceFilterFrom] = useState(0);
  const [priceFilterTo, setPriceFilterTo] = useState(0);

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

  function handlePriceFilter(minPrice: number, maxPrice: number) {
    setPriceFilterFrom(minPrice);
    setPriceFilterTo(maxPrice);
  }

  return (
    <div className="font-inter z-10 text-gray-800 text-sm absolute top-[101%] left-0 w-5/6 sm:w-4/6 lg:w-1/2 h-fit flex items-start rounded-b-md flex-col p-2 py-3 bg-gray-300 shadow-lg gap-2">
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
          onClick={() =>
            fetchTouristSpots(
              name,
              typeFilter,
              ratingFilter,
              priceFilterFrom,
              priceFilterTo
            )
          }
          className="bg-[var(--hunter-green)] cursor-pointer text-white p-2 rounded-md hover:bg-green-700 transition"
        >
          Set Filters
        </button>{" "}
      </div>
    </div>
  );
}
