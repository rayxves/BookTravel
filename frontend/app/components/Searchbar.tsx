"use client";
import { useState } from "react";
import "../styles/components-styles.css";
import NearbyFilterComponent from "./Destination/NearbyFilterComponent";
import { useNameSpotsContext } from "@/context/NameSpotsContext";
import { useSearchMode } from "@/context/SearchModeContext";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface Props {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Searchbar({ handleInputChange }: Props) {
  const { fetchTouristSpotsByName } = useNameSpotsContext();
  const { setMode } = useSearchMode();
  const pathname = usePathname();
  const router = useRouter();

  const [searchText, setSearchText] = useState<string>("");

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setMode("name");
    handleInputChange(event);
    setSearchText(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetchTouristSpotsByName(searchText);
    if (pathname === "/") {
      router.replace("/destinations");
    }
  }

  return (
    <div className="w-full h-4/12 pb-3 flex flex-col items-center justify-center bg-white search-container">
      <form
        className="flex items-center justify-center w-full h-3/6 p-7 pb-2"
        onSubmit={handleSubmit}
      >
        <div className="relative w-full md:w-3/5 h-fit flex bg-gray-200 hover:outline-2 hover:outline-purple-50 rounded-lg rounded-bl-0">
          <input
            type="text"
            id="simple-search"
            value={searchText}
            onChange={handleInput}
            className="hover:outline-0 focus:outline-0 text-sm  block w-full ps-5 p-3"
            placeholder="Search places..."
            required
          />
          <button
            type="submit"
            className=" p-3 text-sm font-medium cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </form>
      <div className="w-full md:w-3/5 flex items-center justify-end pr-8 md:pr-5 pb-4 gap-1">
        <NearbyFilterComponent />
      </div>
      <h1 className="w-fit h-fit font-roboto text-gray-800 text-lg  sm:text-2xl lg:text-3xl font-semibold leading-relaxed	pb-1 px-2 text-center">
        Discover & Save Your Favorite Places
      </h1>
      <p className="w-11/12 text-center font-roboto text-sm sm:text-md lg:text-lg sm:w-4/6 lg:w-3/6 text-gray-700 pb-1">
        Find amazing destinations, explore new places, and save your favorites
        with ease!
      </p>
    </div>
  );
}
