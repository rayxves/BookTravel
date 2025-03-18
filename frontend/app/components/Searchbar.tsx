"use client";
import { useState } from "react";
import "../styles/components-styles.css";
import NearbyFilterComponent from "./NearbyFilterComponent";
import FilterNavigation from "./FilterNavigation";
export default function Searchbar() {
  const [filter, setFilter] = useState<boolean>(false);
  const [filterButton, setFilterButton] = useState("");

  function handleToggleFilter(filterButton: string) {
    setFilterButton(filterButton);
    setFilter(!filter);
  }
  return (
    <div className="w-full h-4/12 pb-3 flex flex-col items-center justify-center bg-white search-container">
      <form className="flex items-center justify-center w-full h-3/6 p-7 pb-2">
        <div className="relative w-full md:w-3/5 h-fit flex bg-gray-200 hover:outline-2 hover:outline-purple-50 rounded-lg rounded-bl-0">
          <button onClick={() => handleToggleFilter("Filters")}>
            <div className=" text-gray-700 bg-gray-300 relative flex items-center justify-center gap-1  px-2  rounded-tl-md cursor-pointer hover:opacity-85 h-full">
              {" "}
              <p className="font-inter text-sm md:text-md"> Filter</p>
              <svg
                className="w-4 h-4 text-gray-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5.05 3C3.291 3 2.352 5.024 3.51 6.317l5.422 6.059v4.874c0 .472.227.917.613 1.2l3.069 2.25c1.01.742 2.454.036 2.454-1.2v-7.124l5.422-6.059C21.647 5.024 20.708 3 18.95 3H5.05Z" />
              </svg>
            </div>
          </button>
          <input
            type="text"
            id="simple-search"
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
          {filter ? <FilterNavigation filterButton={filterButton} /> : null}

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
