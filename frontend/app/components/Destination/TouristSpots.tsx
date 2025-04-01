import { useState } from "react";
import FilterNavigation from "./FilterNavigation";
import TouristSpotsCards from "./TouristSpotsCards";

export default function TouristSpots({
  touristSpots,
  searchText,
  fetchTouristSpots,
}) {
  const [showFilter, setShowFilter] = useState(false);

  function handleShowFilter() {
    setShowFilter(!showFilter);
  }

  return (
    <div className="flex flex-col w-full h-full items-center justify-center cursor-pointer">
      <div className="w-full flex items-start justify-start pl-5 h-fit">
        <div className="w-5/6 sm:w-1/2 relative flex items-start justify-start">
          <button
            className="w-fit h-fit flex px-3 py-1.5 gap-2 items-center justify-center rounded-t-md bg-gray-100 shadow-md font-inter font-semibold cursor-pointer"
            onClick={handleShowFilter}
          >
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
            Add filter
          </button>
          {showFilter && (
            <FilterNavigation
              name={searchText}
              fetchTouristSpots={fetchTouristSpots}
            />
          )}
        </div>
      </div>

      <div className="w-5/6 h-full overflow-y-auto grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-12 p-5 pt-10 place-items-center">
        {touristSpots.length > 0 ? (
          <>
            {touristSpots.map((ts) => {
              return (
                <div key={ts.name}>
                  <TouristSpotsCards
                    name={ts.name}
                    photoUrls={ts.photos[0].photoReference}
                    rating={ts.rating}
                    address={ts.formatted_address}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
