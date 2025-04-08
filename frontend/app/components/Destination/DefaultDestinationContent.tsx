import TouristSpotsSlider from "./TouristSpotsSlider";
import { travelHighlights } from "../../data/travelHighlights";
import { popularTouristSpots } from "../../data/popularTouristSpots";
import { useNearbySpotsContext } from "@/context/NearbySpotsContext";
import { useState } from "react";
import FilterNavigation from "./FilterNavigation";

export default function DefaultDestinationContent() {
  const { categoryNearbySpots } = useNearbySpotsContext();
  const [showFilter, setShowFilter] = useState(false);

  function handleShowFilter() {
    setShowFilter(!showFilter);
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      <div className="flex flex-col items-start justify-center border-t-2 border-gray-950 py-5  gap-5 bg-gray-50">
        {Object.keys(categoryNearbySpots).length > 0 ? (
          <>
            <div className="w-5/6 sm:w-1/2 relative flex items-start justify-start pl-3">
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
                Nearby filter
              </button>
              {showFilter && (
                <FilterNavigation name="" isLocationSearch={true} />
              )}
            </div>
            {Object.entries(categoryNearbySpots).map(([category, spots]) => (
              <div
                key={category}
                className="w-full gap-4 h-full flex flex-col items-center"
              >
                <h1 className="w-5/6 xl:w-4/6 pb-4 text-gray-950 text-xl font-inter font-semibold">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h1>

                <TouristSpotsSlider touristSpots={spots} />
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="w-full gap-4 h-full flex flex-col items-center">
              <h1 className="w-5/6 xl:w-4/6 pb-4 text-gray-950 text-xl font-inter font-semibold">
                Find popular destinations
              </h1>
              <TouristSpotsSlider touristSpots={travelHighlights} />
            </div>
            <div className="w-full gap-4 h-full flex flex-col items-center">
              <h1 className="w-5/6 xl:w-4/6 pb-4 text-gray-950 text-xl font-inter font-semibold">
                Seek the best experiences
              </h1>
              <TouristSpotsSlider touristSpots={popularTouristSpots} />
            </div>
          </>
        )}
      </div>
      <div className="w-full h-full flex items-center justify-center pt-6">
        <div className="flex flex-col h-full w-[90%] xl:w-4/6 items-center font-inter p-5 gap-3">
          <h1 className="font-semibold text-xl">
            Explore the World Around You
          </h1>
          <p className="text-md md:text-lg">
            Explore a wide range of places to visit around the world. With our
            app, you can search for any location, save your favorites, and leave
            comments for future reference. Whether you&apos;re interested in
            local landmarks, hidden gems, or popular spots, you&apos;ll be able
            to find, track, and share your experiences. Start discovering and
            building your personal collection today!
          </p>
        </div>
      </div>
    </div>
  );
}
