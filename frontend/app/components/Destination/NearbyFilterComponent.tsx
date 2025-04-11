"use client";
import { useNearbySpotsContext } from "@/context/NearbySpotsContext";
import { useSearchMode } from "@/context/SearchModeContext";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NearbyFilterComponent() {
  const {
    fetchTouristSpotsByLocation,
    nearbyErrorMessage,
    location,
    locationError,
    handleSetUserLocation,
  } = useNearbySpotsContext();
  const { setMode } = useSearchMode();
  const pathname = usePathname();
  const router = useRouter();

  function handleFetchPlacesByLocation() {
    setMode("location");
    handleSetUserLocation();
    if (pathname === "/") {
      router.replace("/destinations");
    }
  }

  useEffect(() => {
    if (location.lat !== 0 && location.lon !== 0) {
      fetchTouristSpotsByLocation(location.lat, location.lon);
    }
  }, [location]);

  return (
    <div className="w-full relative flex flex-col items-end gap-1">
      <button onClick={handleFetchPlacesByLocation}>
        <div className="flex items-center justify-center gap-1 bg-gray-600 text-gray-100 shadow-sm shadow-gray-300 px-2 py-1.5 rounded-md cursor-pointer hover:opacity-85">
          <p className="font-inter text-sm md:text-md">Next to me</p>
          <svg
            className="w-4 h-4 text-gray-400 "
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
              d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
            />
          </svg>
        </div>
      </button>

      <p className="text-xs text-red-700 font-inter">
        {nearbyErrorMessage ?? locationError ?? ""}
      </p>
    </div>
  );
}
