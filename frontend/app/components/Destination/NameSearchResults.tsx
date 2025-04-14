import FilterNavigation from "./FilterNavigation";
import TouristSpots from "./TouristSpots";

export default function NameSearchResults({
  spots,
  searchText,
  showFilter,
  toggleFilter,
}) {
  return (
    <div className="w-full min-h-screen pt-5 bg-blue-100">
      <div className="w-full flex items-start justify-start pl-5 h-fit">
        <div className="w-5/6 sm:w-1/2 relative flex items-start justify-start">
          <button
            className="w-fit h-fit flex px-3 py-1.5 gap-2 items-center justify-center rounded-t-md bg-gray-100 shadow-md font-inter font-semibold cursor-pointer"
            onClick={toggleFilter}
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
              isLocationSearch={false}
              handleShowFilter={toggleFilter}
            />
          )}
        </div>
      </div>
      <TouristSpots touristSpots={spots} />
    </div>
  );
}
